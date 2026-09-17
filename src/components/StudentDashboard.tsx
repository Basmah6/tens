import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  X,
  GraduationCap,
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Calendar as CalendarIcon,
  Flame,
  Award,
  ChevronRight,
  ChevronLeft,
  Check,
  Trash2,
  Copy,
  TrendingUp,
  Edit3
} from 'lucide-react';
import { TenseData, UserOverallProgress } from '../types';

interface StudentDashboardProps {
  isOpen?: boolean;
  onClose: () => void;
  progress: UserOverallProgress;
  allTenses: TenseData[];
  onSelectTense: (tenseId: string) => void;
}

// LocalStorage Keys
const STORAGE_STUDY_LOGS = 'etqan_student_study_logs_v1';
const STORAGE_DAILY_NOTES = 'etqan_student_daily_notes_v1';

// Helper: Format date as YYYY-MM-DD in local time
const getLocalDateString = (date: Date = new Date()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Play a pleasant 2-tone chime using Web Audio API
const playCompletionChime = () => {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Tone 1: E5 (659.25 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.12, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.7);

    // Tone 2: A5 (880 Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.22);
    gain2.gain.setValueAtTime(0.15, now + 0.22);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.1);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.22);
    osc2.stop(now + 1.1);
  } catch (e) {
    console.warn('Audio chime warning:', e);
  }
};

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onClose,
  progress,
  allTenses,
  onSelectTense,
}) => {
  // 3 Primary, high-utility tabs: 'progress' | 'pomodoro' | 'calendar'
  const [activeTab, setActiveTab] = useState<'progress' | 'pomodoro' | 'calendar'>('progress');
  const dashboardScrollRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to top when active tab changes
  useEffect(() => {
    if (dashboardScrollRef.current) {
      dashboardScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  // Today string
  const todayStr = useMemo(() => getLocalDateString(), []);
  const [selectedDateStr, setSelectedDateStr] = useState<string>(todayStr);

  // Calendar month view
  const [currentCalendarDate, setCurrentCalendarDate] = useState<Date>(new Date());

  // ----------------------------------------------------
  // 1. Persistence: Study Logs & Daily Notes
  // ----------------------------------------------------
  const [studyLogs, setStudyLogs] = useState<Record<string, { minutes: number; sessions: number; manual?: boolean }>>(() => {
    try {
      const data = localStorage.getItem(STORAGE_STUDY_LOGS);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  });

  const [dailyNotes, setDailyNotes] = useState<Record<string, string>>(() => {
    try {
      const data = localStorage.getItem(STORAGE_DAILY_NOTES);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  });

  const [saveToast, setSaveToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_STUDY_LOGS, JSON.stringify(studyLogs));
    } catch (e) {
      console.warn('Failed to save study logs', e);
    }
  }, [studyLogs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_DAILY_NOTES, JSON.stringify(dailyNotes));
    } catch (e) {
      console.warn('Failed to save daily notes', e);
    }
  }, [dailyNotes]);

  // ----------------------------------------------------
  // 2. Pomodoro Timer State
  // ----------------------------------------------------
  const POMODORO_PRESETS = [
    { label: '25 دقيقة (بومودورو)', minutes: 25, type: 'study' as const },
    { label: '50 دقيقة (تركيز عميق)', minutes: 50, type: 'study' as const },
    { label: '15 دقيقة (مراجعة سريعة)', minutes: 15, type: 'study' as const },
    { label: '5 دقائق (استراحة)', minutes: 5, type: 'break' as const },
  ];

  const [timerDurationMinutes, setTimerDurationMinutes] = useState<number>(25);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerType, setTimerType] = useState<'study' | 'break'>('study');
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSecondsLeft(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            playCompletionChime();
            setShowCelebration(true);

            if (timerType === 'study') {
              const sessionMins = timerDurationMinutes;
              setStudyLogs(prevLogs => {
                const todayLog = prevLogs[todayStr] || { minutes: 0, sessions: 0 };
                return {
                  ...prevLogs,
                  [todayStr]: {
                    minutes: todayLog.minutes + sessionMins,
                    sessions: todayLog.sessions + 1,
                  },
                };
              });
            }

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, timerType, timerDurationMinutes, todayStr]);

  const handleStartTimer = () => setIsTimerRunning(true);
  const handlePauseTimer = () => setIsTimerRunning(false);
  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSecondsLeft(timerDurationMinutes * 60);
    setShowCelebration(false);
  };

  const handleSelectPreset = (minutes: number, type: 'study' | 'break') => {
    setIsTimerRunning(false);
    setTimerDurationMinutes(minutes);
    setTimerSecondsLeft(minutes * 60);
    setTimerType(type);
    setShowCelebration(false);
  };

  const handleAddMinutes = (extra: number) => {
    setTimerSecondsLeft(prev => prev + extra * 60);
  };

  const timerMinutesDisplay = String(Math.floor(timerSecondsLeft / 60)).padStart(2, '0');
  const timerSecondsDisplay = String(timerSecondsLeft % 60).padStart(2, '0');
  const timerProgressPercent = Math.min(
    100,
    Math.round(((timerDurationMinutes * 60 - timerSecondsLeft) / (timerDurationMinutes * 60)) * 100)
  );

  // ----------------------------------------------------
  // 3. Curriculum Statistics
  // ----------------------------------------------------
  const progressStats = useMemo(() => {
    let completedLessonsCount = 0;
    let passedExamsCount = 0;
    const totalPossibleLessons = allTenses.length * 7; // 7 units per tense

    allTenses.forEach(tense => {
      const tProg = progress[tense.id];
      if (tProg) {
        completedLessonsCount += tProg.completedLessons?.length || 0;
        if (tProg.examPassed) passedExamsCount += 1;
      }
    });

    const percent = Math.min(100, Math.round((completedLessonsCount / totalPossibleLessons) * 100));

    return {
      completedLessonsCount,
      totalPossibleLessons,
      percent,
      passedExamsCount,
    };
  }, [allTenses, progress]);

  // ----------------------------------------------------
  // 4. Study Streak & Total Minutes
  // ----------------------------------------------------
  const { totalFocusMinutes, currentStreakDays } = useMemo(() => {
    let totalMins = 0;
    (Object.values(studyLogs) as { minutes?: number; sessions?: number; manual?: boolean }[]).forEach(log => {
      totalMins += log?.minutes || 0;
    });

    let streak = 0;
    const checkDate = new Date();

    for (let i = 0; i < 60; i++) {
      const dStr = getLocalDateString(checkDate);
      const log = studyLogs[dStr];
      const hasStudied = !!(log && (log.minutes > 0 || log.manual));

      if (i === 0 && !hasStudied) {
        checkDate.setDate(checkDate.getDate() - 1);
        continue;
      }

      if (hasStudied) {
        streak += 1;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return { totalFocusMinutes: totalMins, currentStreakDays: streak };
  }, [studyLogs]);

  // ----------------------------------------------------
  // 5. Calendar Generation
  // ----------------------------------------------------
  const calendarYear = currentCalendarDate.getFullYear();
  const calendarMonth = currentCalendarDate.getMonth();

  const monthNamesArabic = [
    'يناير (January)', 'فبراير (February)', 'مارس (March)', 'أبريل (April)',
    'مايو (May)', 'يونيو (June)', 'يوليو (July)', 'أغسطس (August)',
    'سبتمبر (September)', 'أكتوبر (October)', 'نوفمبر (November)', 'ديسمبر (December)'
  ];

  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(calendarYear, calendarMonth, 1).getDay();
    const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

    const days: ({
      dayNumber: number;
      dateStr: string;
      isToday: boolean;
      studied: boolean;
      minutes: number;
      hasNote: boolean;
    } | null)[] = [];

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const mStr = String(calendarMonth + 1).padStart(2, '0');
      const dStr = String(d).padStart(2, '0');
      const fullDateStr = `${calendarYear}-${mStr}-${dStr}`;

      const log = studyLogs[fullDateStr];
      const studied = !!(log && (log.minutes > 0 || log.manual));
      const minutes = log?.minutes || 0;
      const noteContent = dailyNotes[fullDateStr]?.trim() || '';

      days.push({
        dayNumber: d,
        dateStr: fullDateStr,
        isToday: fullDateStr === todayStr,
        studied,
        minutes,
        hasNote: !!noteContent,
      });
    }

    return days;
  }, [calendarYear, calendarMonth, studyLogs, dailyNotes, todayStr]);

  const handlePrevMonth = () => {
    setCurrentCalendarDate(new Date(calendarYear, calendarMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentCalendarDate(new Date(calendarYear, calendarMonth + 1, 1));
  };

  const handleToggleManualStudy = (dateStr: string) => {
    setStudyLogs(prev => {
      const current = prev[dateStr];
      if (current && (current.manual || current.minutes > 0)) {
        const { [dateStr]: _, ...rest } = prev;
        return rest;
      } else {
        return {
          ...prev,
          [dateStr]: {
            minutes: 25,
            sessions: 1,
            manual: true,
          },
        };
      }
    });
  };

  // ----------------------------------------------------
  // 6. Notes Handlers
  // ----------------------------------------------------
  const activeNoteText = dailyNotes[selectedDateStr] || '';

  const handleNoteChange = (text: string) => {
    setDailyNotes(prev => ({ ...prev, [selectedDateStr]: text }));
  };

  const handleDeleteNote = (date: string) => {
    setDailyNotes(prev => {
      const updated = { ...prev };
      delete updated[date];
      return updated;
    });
    setSaveToast(`تم حذف ملاحظة يوم (${date})`);
    setTimeout(() => setSaveToast(null), 2500);
  };

  const handleInsertNoteTemplate = (prefix: string) => {
    const current = dailyNotes[selectedDateStr] || '';
    const updated = current ? `${current}\n${prefix} ` : `${prefix} `;
    handleNoteChange(updated);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5"
      dir="rtl"
    >
      <div
        className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col text-slate-900 shadow-2xl overflow-hidden animate-fadeIn"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#214ecf] flex items-center justify-center border border-blue-200/80 shadow-[0_2px_0_0_#dbeafe]">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 font-arabic">
                  مساحة الطالب ولوحة الإنجاز الأكاديمي
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200/80">
                  <Flame className="w-3 h-3 text-[#ea9835]" />
                  <span>{currentStreakDays} أيام متتالية</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-arabic mt-0.5">
                متابعة إتقان الأزمنة الـ 12، ومؤقت المذاكرة المركز، والتقويم والملاحظات
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition cursor-pointer border border-slate-200/60"
            title="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Focused, Practical Navigation Tabs */}
        <div className="px-5 py-2.5 bg-slate-50/90 border-b border-slate-200/80 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'progress'
                  ? 'bg-[#214ecf] text-white shadow-[0_2px_0_0_#153696]'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 shadow-[0_1px_0_0_#e2e8f0]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>الإنجاز والأزمنة ({progressStats.percent}%)</span>
            </button>

            <button
              onClick={() => setActiveTab('pomodoro')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'pomodoro'
                  ? 'bg-[#214ecf] text-white shadow-[0_2px_0_0_#153696]'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 shadow-[0_1px_0_0_#e2e8f0]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>مؤقت المذاكرة (Pomodoro)</span>
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'calendar'
                  ? 'bg-[#214ecf] text-white shadow-[0_2px_0_0_#153696]'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 shadow-[0_1px_0_0_#e2e8f0]'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>التقويم والملاحظات</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs text-slate-500 font-arabic">
            <span>مجموع دقائق التركيز: <strong className="text-slate-800 font-mono">{totalFocusMinutes} د</strong></span>
          </div>
        </div>

        {/* Main Content Area */}
        <div ref={dashboardScrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAFBFD] space-y-5">
          {/* ======================================================== */}
          {/* TAB 1: ACADEMIC PROGRESS & 12 TENSES                     */}
          {/* ======================================================== */}
          {activeTab === 'progress' && (
            <div className="space-y-5">
              {/* 4 Clean Metric Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 space-y-1 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-arabic font-medium">نسبة الإنجاز الكلية</span>
                    <TrendingUp className="w-4 h-4 text-[#214ecf]" />
                  </div>
                  <div className="text-2xl font-black text-slate-900 font-mono">
                    {progressStats.percent}%
                  </div>
                  <div className="text-[11px] text-slate-500 font-arabic">
                    {progressStats.completedLessonsCount} من أصل {progressStats.totalPossibleLessons} وحدة دراسية
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 space-y-1 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-arabic font-medium">الأزمنة المتقنة</span>
                    <Award className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-black text-emerald-700 font-mono">
                    {progressStats.passedExamsCount} <span className="text-xs text-slate-500 font-normal">/ 12</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-arabic">
                    تم اجتياز الاختبار النهائي بنجاح
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 space-y-1 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-arabic font-medium">جلسات المذاكرة</span>
                    <Clock className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="text-2xl font-black text-slate-900 font-mono">
                    {totalFocusMinutes} <span className="text-xs text-slate-500 font-normal">دقيقة</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-arabic">
                    جلسات مركزة مسجلة بالمؤقت
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 space-y-1 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-arabic font-medium">سلسلة الالتزام</span>
                    <Flame className="w-4 h-4 text-[#ea9835]" />
                  </div>
                  <div className="text-2xl font-black text-[#ea9835] font-mono">
                    {currentStreakDays} <span className="text-xs text-slate-500 font-normal">أيام</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-arabic">
                    استمرارية يومية دون انقطاع
                  </div>
                </div>
              </div>

              {/* Progress Bar & Filter Bar */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 font-arabic">مؤشر التقدم العام في منهج الأزمنة الـ 12:</span>
                    <span className="font-mono font-bold text-[#214ecf] text-sm">{progressStats.percent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/60">
                    <div
                      className="h-full bg-gradient-to-r from-[#214ecf] to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${progressStats.percent}%` }}
                    />
                  </div>
                </div>

                {/* 12 Tenses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                  {allTenses.map(tense => {
                    const tProg = progress[tense.id];
                    const completedCount = tProg?.completedLessons?.length || 0;
                    const isExamPassed = !!tProg?.examPassed;
                    const score = tProg?.examScore;

                    let catBadge = 'bg-emerald-50 text-emerald-800 border-emerald-200/80';
                    let catLabel = 'حاضر';
                    if (tense.category === 'past') {
                      catBadge = 'bg-amber-50 text-amber-900 border-amber-200/80';
                      catLabel = 'ماضي';
                    } else if (tense.category === 'future') {
                      catBadge = 'bg-indigo-50 text-indigo-800 border-indigo-200/80';
                      catLabel = 'مستقبل';
                    }

                    return (
                      <div
                        key={tense.id}
                        className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-3.5 space-y-2.5 hover:border-slate-300 hover:bg-white transition shadow-xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${catBadge}`}>
                              {catLabel}
                            </span>
                            {isExamPassed ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>متقن {score ? `(${score}%)` : ''}</span>
                              </span>
                            ) : (
                              <span className="text-[11px] font-mono text-slate-500">
                                {completedCount}/7 وحدات
                              </span>
                            )}
                          </div>

                          <h4 className="text-sm font-bold text-slate-900 font-arabic">
                            {tense.nameAr}
                          </h4>
                          <span className="text-xs text-slate-500 font-mono block" dir="ltr">
                            {tense.nameEn}
                          </span>
                        </div>

                        <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                          <div className="flex items-center justify-between text-[11px] text-slate-500 font-arabic">
                            <span>نسبة الإنجاز</span>
                            <span className="font-mono font-bold text-slate-700">
                              {Math.round((completedCount / 7) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${isExamPassed ? 'bg-emerald-500' : 'bg-[#214ecf]'}`}
                              style={{ width: `${(completedCount / 7) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: POMODORO FOCUS TIMER                              */}
          {/* ======================================================== */}
          {activeTab === 'pomodoro' && (
            <div className="max-w-xl mx-auto space-y-5 py-2 text-center">
              {/* Celebration Banner if finished */}
              {showCelebration && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-900 animate-scaleUp space-y-1">
                  <div className="flex items-center justify-center gap-2 font-bold text-sm font-arabic">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>أحسنت يا بطل! اكتملت جلسة التركيز بنجاح وتم تسجيلها في تقويمك.</span>
                  </div>
                  <p className="text-xs text-emerald-700 font-arabic">
                    خذ استراحة قصيرة مدتها 5 دقائق لإنعاش ذاكرتك قبل بدء الجلسة التالية.
                  </p>
                </div>
              )}

              {/* Minimalist, Serene Circular Timer */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="relative w-56 h-56 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="43"
                      className="text-slate-100 stroke-current"
                      strokeWidth="5"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="43"
                      className={`${
                        timerType === 'study' ? 'text-[#214ecf]' : 'text-emerald-500'
                      } stroke-current transition-all duration-1000`}
                      strokeWidth="5"
                      strokeDasharray={270}
                      strokeDashoffset={270 - (270 * timerProgressPercent) / 100}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        timerType === 'study'
                          ? 'bg-blue-50 text-[#214ecf] border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {timerType === 'study' ? 'جلسة تركيز' : 'وقت الاستراحة'}
                    </span>

                    <div className="font-mono text-5xl font-black text-slate-900 tracking-wider" dir="ltr">
                      {timerMinutesDisplay}:{timerSecondsDisplay}
                    </div>

                    <span className="text-xs text-slate-400 font-arabic font-medium">
                      {timerDurationMinutes} دقيقة • {timerProgressPercent}% منجز
                    </span>
                  </div>
                </div>

                {/* Main Action Buttons */}
                <div className="flex items-center justify-center gap-3">
                  {!isTimerRunning ? (
                    <button
                      onClick={handleStartTimer}
                      className="px-8 py-3 rounded-xl bg-[#214ecf] hover:bg-[#1a3eb0] text-white font-bold text-sm transition-all duration-150 flex items-center gap-2 shadow-[0_3px_0_0_#153696] active:translate-y-[2px] active:shadow-none cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>ابدأ المذاكرة</span>
                    </button>
                  ) : (
                    <button
                      onClick={handlePauseTimer}
                      className="px-8 py-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-sm transition-all duration-150 flex items-center gap-2 shadow-[0_3px_0_0_#fed7aa] active:translate-y-[2px] active:shadow-none cursor-pointer"
                    >
                      <Pause className="w-4 h-4" />
                      <span>إيقاف مؤقت</span>
                    </button>
                  )}

                  <button
                    onClick={handleResetTimer}
                    className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition cursor-pointer border border-slate-200/80 shadow-[0_2px_0_0_#e2e8f0] active:translate-y-[1.5px] active:shadow-none"
                    title="إعادة تعيين"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleAddMinutes(5)}
                    className="px-3.5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer border border-slate-200/80 shadow-[0_2px_0_0_#e2e8f0] active:translate-y-[1.5px] active:shadow-none"
                    title="إضافة 5 دقائق"
                  >
                    +5 د
                  </button>
                </div>

                {/* Clean Presets Grid */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <span className="text-xs text-slate-400 font-bold block font-arabic text-right">
                    الأنماط الزمنية الجاهزة:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {POMODORO_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectPreset(preset.minutes, preset.type)}
                        className={`p-2.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                          timerDurationMinutes === preset.minutes && timerType === preset.type
                            ? 'bg-blue-50 border-blue-300 text-[#214ecf] shadow-xs'
                            : 'bg-white border-slate-200/80 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="font-mono text-sm block">{preset.minutes}m</span>
                        <span className="font-arabic text-[11px] block mt-0.5">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tally */}
              <div className="text-xs text-slate-500 font-arabic flex items-center justify-center gap-4">
                <span>جلسات اليوم المكتملة: <strong className="text-slate-900 font-mono">{studyLogs[todayStr]?.sessions || 0}</strong></span>
                <span>•</span>
                <span>دقائق المذاكرة لليوم: <strong className="text-[#214ecf] font-mono">{studyLogs[todayStr]?.minutes || 0} دقيقة</strong></span>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: CALENDAR & DAILY NOTES (UNIFIED & PRACTICAL)      */}
          {/* ======================================================== */}
          {activeTab === 'calendar' && (
            <div className="space-y-4">
              {/* Top Month Header Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevMonth}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer border border-slate-200"
                    title="الشهر السابق"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 font-arabic min-w-[170px] text-center">
                    {monthNamesArabic[calendarMonth]} {calendarYear}
                  </h3>

                  <button
                    onClick={handleNextMonth}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer border border-slate-200"
                    title="الشهر القادم"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs font-arabic">
                  <span className="text-slate-500">اليوم المختار:</span>
                  <span className="font-mono font-bold text-[#214ecf] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200/60" dir="ltr">
                    {selectedDateStr} {selectedDateStr === todayStr ? '(اليوم)' : ''}
                  </span>
                  {selectedDateStr !== todayStr && (
                    <button
                      onClick={() => setSelectedDateStr(todayStr)}
                      className="text-xs text-[#214ecf] hover:underline font-bold"
                    >
                      العودة لليوم
                    </button>
                  )}
                </div>
              </div>

              {/* Two-Pane Layout: Calendar (left/7 cols) + Notes Editor (right/5 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                {/* Monthly Calendar View */}
                <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-4 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-1 border-b border-slate-100">
                    <span className="font-arabic">اختر أي يوم لتدوين وقراءة ملاحظاته مباشرة:</span>
                    <div className="flex items-center gap-3 text-[11px]">
                      <span className="flex items-center gap-1 text-amber-700">
                        <Flame className="w-3 h-3 text-[#ea9835]" /> مذاكرة
                      </span>
                      <span className="flex items-center gap-1 text-blue-700">
                        <Edit3 className="w-3 h-3 text-[#214ecf]" /> ملاحظة
                      </span>
                    </div>
                  </div>

                  {/* Day Names */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 font-arabic pb-1">
                    <span>أحد</span>
                    <span>إثنين</span>
                    <span>ثلاثاء</span>
                    <span>أربعاء</span>
                    <span>خميس</span>
                    <span>جمعة</span>
                    <span>سبت</span>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1.5">
                    {calendarDays.map((cell, idx) => {
                      if (!cell) {
                        return <div key={idx} className="h-14 sm:h-16 rounded-xl bg-slate-50/50" />;
                      }

                      const isSelected = cell.dateStr === selectedDateStr;

                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedDateStr(cell.dateStr)}
                          className={`h-14 sm:h-16 p-1.5 rounded-xl transition flex flex-col justify-between text-right cursor-pointer border relative text-xs ${
                            isSelected
                              ? 'bg-blue-50 border-[#214ecf] ring-2 ring-[#214ecf]/30 text-[#214ecf] shadow-xs'
                              : cell.isToday
                              ? 'bg-amber-50/40 border-amber-300 text-slate-800'
                              : cell.studied
                              ? 'bg-amber-50/60 border-amber-200 text-amber-900 hover:bg-amber-100/60'
                              : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className={`text-xs font-bold font-mono ${cell.isToday ? 'text-[#214ecf] font-black' : ''}`}>
                              {cell.dayNumber}
                            </span>
                            {cell.studied && (
                              <Flame className="w-3 h-3 text-[#ea9835] fill-[#ea9835]" />
                            )}
                          </div>

                          <div className="flex items-center justify-between w-full mt-auto">
                            {cell.hasNote ? (
                              <span className="w-2 h-2 rounded-full bg-[#214ecf]" title="توجد ملاحظات لهذا اليوم" />
                            ) : (
                              <span />
                            )}
                            {cell.minutes > 0 && (
                              <span className="text-[9px] font-mono font-bold text-amber-700">{cell.minutes}m</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Integrated Direct Note Editor */}
                <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-4 space-y-3 shadow-xs flex flex-col">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#214ecf] flex items-center justify-center border border-blue-200/60">
                        <Edit3 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 font-arabic">
                        ملاحظات ({selectedDateStr})
                      </span>
                    </div>

                    <button
                      onClick={() => handleToggleManualStudy(selectedDateStr)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold font-arabic transition cursor-pointer flex items-center gap-1 border ${
                        studyLogs[selectedDateStr]
                          ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
                      }`}
                      title="تسجيل أو إلغاء علامة الدراسة لهذا اليوم"
                    >
                      <Flame className="w-3 h-3 text-[#ea9835]" />
                      <span>{studyLogs[selectedDateStr] ? 'يوم دراسة ✓' : 'تسجيل كيوم دراسة'}</span>
                    </button>
                  </div>

                  {/* Fast Template Tags */}
                  <div className="flex flex-wrap gap-1 text-[11px]">
                    <button
                      onClick={() => handleInsertNoteTemplate('💡 قاعدة ذهبية:')}
                      className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer font-arabic"
                    >
                      💡 قاعدة
                    </button>
                    <button
                      onClick={() => handleInsertNoteTemplate('⚠️ خطأ شائع:')}
                      className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer font-arabic"
                    >
                      ⚠️ خطأ
                    </button>
                    <button
                      onClick={() => handleInsertNoteTemplate('❓ سؤال للمراجعة:')}
                      className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer font-arabic"
                    >
                      ❓ سؤال
                    </button>
                    <button
                      onClick={() => handleInsertNoteTemplate('📝 جملة نموذجية:')}
                      className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer font-arabic"
                    >
                      📝 جملة
                    </button>
                  </div>

                  {/* Notes Textarea */}
                  <textarea
                    value={activeNoteText}
                    onChange={e => handleNoteChange(e.target.value)}
                    placeholder="اكتب ملاحظاتك، القواعد التي تريد تذكرها، أو أية أسئلة لهذا اليوم... يتم الحفظ تلقائياً في جهازك."
                    className="w-full min-h-[170px] bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-[#214ecf]/30 font-arabic leading-relaxed resize-none placeholder:text-slate-400"
                  />

                  {/* Action Bar */}
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                    <span className="text-[11px] text-emerald-600 font-bold font-arabic">
                      محفوظ تلقائياً ✓
                    </span>

                    <div className="flex items-center gap-2">
                      {activeNoteText && (
                        <>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(activeNoteText);
                              setSaveToast('تم نسخ الملاحظة للحافظة ✓');
                              setTimeout(() => setSaveToast(null), 2000);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1 cursor-pointer text-xs"
                          >
                            <Copy className="w-3 h-3" />
                            <span>نسخ</span>
                          </button>

                          <button
                            onClick={() => handleDeleteNote(selectedDateStr)}
                            className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition flex items-center gap-1 cursor-pointer text-xs"
                            title="حذف ملاحظة هذا اليوم"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>حذف</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating Toast Notification */}
        {saveToast && (
          <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-60 bg-emerald-700 text-white px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold font-arabic animate-fadeIn border border-emerald-500">
            <Check className="w-3.5 h-3.5" />
            <span>{saveToast}</span>
          </div>
        )}

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0 text-xs text-slate-500 font-arabic">
          <span>يتم حفظ تقدمك وجلساتك وملاحظاتك تلقائياً في متصفحك.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold transition cursor-pointer shadow-xs"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
