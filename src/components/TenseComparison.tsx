import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  BarChart3,
  Volume2,
  Sparkles,
  ArrowLeftRight,
  HelpCircle,
  BookOpen,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  Zap,
  Check,
  RotateCcw,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { allTenses, getTenseById, comparisonPairs, getComparisonPair } from '../data/tensesData';
import { playEnglishAudio } from '../utils/audio';

interface TenseComparisonProps {
  onClose: () => void;
  onSelectTense: (tenseId: string) => void;
}

export const TenseComparison: React.FC<TenseComparisonProps> = ({
  onClose,
  onSelectTense,
}) => {
  // Selected Tense IDs
  const [tense1Id, setTense1Id] = useState<string>('present_simple');
  const [tense2Id, setTense2Id] = useState<string>('present_continuous');
  const [activeTab, setActiveTab] = useState<'matrix' | 'quiz'>('matrix');
  const [isContentMaximized, setIsContentMaximized] = useState(false);

  // Prevent background page from scrolling while modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Quiz state for testing distinction between the two selected tenses
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });

  const tense1 = useMemo(() => getTenseById(tense1Id) || allTenses[0], [tense1Id]);
  const tense2 = useMemo(() => getTenseById(tense2Id) || allTenses[1], [tense2Id]);

  // Check if there is a curated distinction pair
  const curatedPair = useMemo(() => getComparisonPair(tense1Id, tense2Id), [tense1Id, tense2Id]);

  // Swap Tenses
  const handleSwapTenses = () => {
    const temp = tense1Id;
    setTense1Id(tense2Id);
    setTense2Id(temp);
    setQuizSelectedOption(null);
    setQuizIndex(0);
  };

  // Group all tenses by category
  const presentTensesList = useMemo(() => allTenses.filter(t => t.category === 'present'), []);
  const pastTensesList = useMemo(() => allTenses.filter(t => t.category === 'past'), []);
  const futureTensesList = useMemo(() => allTenses.filter(t => t.category === 'future'), []);

  // Quick preset list
  const quickPresets = [
    { title: 'المضارع البسيط vs المستمر', t1: 'present_simple', t2: 'present_continuous' },
    { title: 'الماضي البسيط vs المضارع التام', t1: 'past_simple', t2: 'present_perfect' },
    { title: 'الماضي البسيط vs الماضي المستمر', t1: 'past_simple', t2: 'past_continuous' },
    { title: 'الماضي البسيط vs الماضي التام', t1: 'past_simple', t2: 'past_perfect' },
    { title: 'المضارع التام vs التام المستمر', t1: 'present_perfect', t2: 'present_perfect_continuous' },
    { title: 'المستقبل البسيط vs المستمر', t1: 'future_simple', t2: 'future_continuous' },
    { title: 'المستقبل البسيط vs التام', t1: 'future_simple', t2: 'future_perfect' },
  ];

  // Prepare questions for the interactive distinction quiz
  const quizQuestions = useMemo(() => {
    const questions: {
      sentence: string;
      translationAr: string;
      contextAr: string;
      correctTenseId: string;
      explanationAr: string;
    }[] = [];

    // Collect examples from tense 1
    tense1.usageLesson.useCases.forEach(uc => {
      uc.examples.slice(0, 2).forEach(ex => {
        questions.push({
          sentence: ex.sentence,
          translationAr: ex.translationAr,
          contextAr: ex.contextAr,
          correctTenseId: tense1.id,
          explanationAr: `هذه الجملة في زمن (${tense1.nameAr}) لأنها تعبر عن: ${uc.titleAr}.`,
        });
      });
    });

    // Collect examples from tense 2
    tense2.usageLesson.useCases.forEach(uc => {
      uc.examples.slice(0, 2).forEach(ex => {
        questions.push({
          sentence: ex.sentence,
          translationAr: ex.translationAr,
          contextAr: ex.contextAr,
          correctTenseId: tense2.id,
          explanationAr: `هذه الجملة في زمن (${tense2.nameAr}) لأنها تعبر عن: ${uc.titleAr}.`,
        });
      });
    });

    // Shuffle
    return questions.sort(() => 0.5 - Math.random());
  }, [tense1, tense2]);

  const currentQuizItem = quizQuestions[quizIndex % (quizQuestions.length || 1)];

  const handleSelectQuiz = (selectedId: string) => {
    if (quizSelectedOption) return;
    setQuizSelectedOption(selectedId);
    const isCorrect = selectedId === currentQuizItem.correctTenseId;
    setQuizScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNextQuiz = () => {
    setQuizSelectedOption(null);
    setQuizIndex(prev => prev + 1);
  };

  // Helper badge color
  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'present':
        return { label: 'حاضر (Present)', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' };
      case 'past':
        return { label: 'ماضٍ (Past)', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
      case 'future':
        return { label: 'مستقبل (Future)', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
      default:
        return { label: cat, color: 'bg-slate-700 text-slate-300 border-slate-600' };
    }
  };

  const t1Badge = getCategoryBadge(tense1.category);
  const t2Badge = getCategoryBadge(tense2.category);

  return (
    <div
      className={`fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center animate-fadeIn ${
        isContentMaximized ? 'p-1 sm:p-2' : 'p-2.5 sm:p-6'
      }`}
      dir="rtl"
    >
      <div
        className={`bg-[#0B1120] border border-slate-700 flex flex-col min-h-0 text-white shadow-2xl overflow-hidden transition-all duration-300 animate-scaleUp ${
          isContentMaximized
            ? 'w-[98vw] h-[97vh] max-w-[98vw] max-h-[97vh] rounded-2xl'
            : 'w-full max-w-5xl h-[92vh] max-h-[92vh] rounded-2xl sm:rounded-3xl'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header - Hidden when content is maximized */}
        {!isContentMaximized && (
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#111C33] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-xs">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-xl font-black text-white font-arabic flex items-center gap-2">
                  <span>مختبر مقارنة الأزمنة التفاعلي</span>
                  <span className="text-xs bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-md border border-amber-400/30 hidden sm:inline">
                    قارن أي زمنين تريدهما
                  </span>
                </h2>
                <p className="text-xs text-slate-400 font-arabic mt-0.5">
                  اختر أي زمنين من القائمة للمقارنة الفورية جنباً إلى جنب واختبار الفروقات الدقيقة
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
                title="إغلاق (Esc)"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Interactive Tense Selectors Bar */}
        {!isContentMaximized && (
          <div className="p-4 sm:p-5 bg-[#0e172a] border-b border-slate-800 shrink-0 space-y-3.5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              {/* Tense 1 Selector */}
              <div className="w-full md:flex-1 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-3 space-y-1.5 focus-within:border-blue-500 transition shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-blue-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    الزمن الأول (Tense 1)
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${t1Badge.color}`}>
                    {t1Badge.label}
                  </span>
                </div>
                <select
                  value={tense1Id}
                  onChange={e => {
                    setTense1Id(e.target.value);
                    setQuizSelectedOption(null);
                    setQuizIndex(0);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/40 cursor-pointer font-arabic"
                >
                  <optgroup label="☀️ أزمنة الحاضر (المضارع)">
                    {presentTensesList.map(t => (
                      <option key={t.id} value={t.id} disabled={t.id === tense2Id}>
                        {t.nameAr} ({t.nameEn})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="⏳ أزمنة الماضي">
                    {pastTensesList.map(t => (
                      <option key={t.id} value={t.id} disabled={t.id === tense2Id}>
                        {t.nameAr} ({t.nameEn})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🚀 أزمنة المستقبل">
                    {futureTensesList.map(t => (
                      <option key={t.id} value={t.id} disabled={t.id === tense2Id}>
                        {t.nameAr} ({t.nameEn})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Swap Button */}
              <div className="shrink-0 flex items-center justify-center">
                <button
                  onClick={handleSwapTenses}
                  className="p-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition shadow-md hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1"
                  title="تبديل الزمنين (Swap)"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                  <span className="text-[11px] font-bold sm:hidden">تبديل</span>
                </button>
              </div>

              {/* Tense 2 Selector */}
              <div className="w-full md:flex-1 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-3 space-y-1.5 focus-within:border-emerald-500 transition shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    الزمن الثاني (Tense 2)
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${t2Badge.color}`}>
                    {t2Badge.label}
                  </span>
                </div>
                <select
                  value={tense2Id}
                  onChange={e => {
                    setTense2Id(e.target.value);
                    setQuizSelectedOption(null);
                    setQuizIndex(0);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/40 cursor-pointer font-arabic"
                >
                  <optgroup label="☀️ أزمنة الحاضر (المضارع)">
                    {presentTensesList.map(t => (
                      <option key={t.id} value={t.id} disabled={t.id === tense1Id}>
                        {t.nameAr} ({t.nameEn})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="⏳ أزمنة الماضي">
                    {pastTensesList.map(t => (
                      <option key={t.id} value={t.id} disabled={t.id === tense1Id}>
                        {t.nameAr} ({t.nameEn})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🚀 أزمنة المستقبل">
                    {futureTensesList.map(t => (
                      <option key={t.id} value={t.id} disabled={t.id === tense1Id}>
                        {t.nameAr} ({t.nameEn})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Quick Presets Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-thin">
              <span className="text-[11px] font-bold text-slate-400 shrink-0 pl-1 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>مقارنات جاهزة:</span>
              </span>
              {quickPresets.map((preset, idx) => {
                const isSelected =
                  (tense1Id === preset.t1 && tense2Id === preset.t2) ||
                  (tense1Id === preset.t2 && tense2Id === preset.t1);
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setTense1Id(preset.t1);
                      setTense2Id(preset.t2);
                      setQuizSelectedOption(null);
                      setQuizIndex(0);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                        : 'bg-slate-800/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700'
                    }`}
                  >
                    {preset.title}
                  </button>
                );
              })}
            </div>

            {/* Tab Navigation: Matrix vs Quiz */}
            <div className="flex items-center gap-2 pt-1 border-t border-slate-800/80">
              <button
                onClick={() => setActiveTab('matrix')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'matrix'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>جدول المقارنة التفصيلي جنباً إلى جنب</span>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'quiz'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>تحدي التمييز بين الزمنين (Interactive Quiz)</span>
              </button>
            </div>
          </div>
        )}

        {/* Content Body */}
        {activeTab === 'matrix' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 min-h-0 bg-[#070C18] overscroll-contain">
            {/* Curated or Dynamic Difference Summary */}
            <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-indigo-950/40 border border-amber-500/30 rounded-2xl p-4 sm:p-5 space-y-2 shadow-xs">
              <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-2 text-amber-300 text-xs sm:text-sm font-black font-arabic flex-wrap">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>الخلاصة الجوهرية للفرق بين الزمنين:</span>
                  {isContentMaximized && (
                    <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-2.5 py-0.5 rounded-md border border-amber-500/30">
                      {tense1.nameAr} مقابل {tense2.nameAr}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setIsContentMaximized(prev => !prev)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
                    title={isContentMaximized ? 'استعادة القوائم العلوية' : 'تكبير محتوى المقارنة بحيث يصبح المحتوى المعروض هذا الجزء'}
                  >
                    {isContentMaximized ? (
                      <>
                        <Minimize2 className="w-3.5 h-3.5" />
                        <span>استعادة القوائم</span>
                      </>
                    ) : (
                      <>
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>تكبير هذا المحتوى</span>
                      </>
                    )}
                  </button>

                  {isContentMaximized && (
                    <button
                      onClick={onClose}
                      className="w-8 h-8 rounded-xl bg-slate-800/80 hover:bg-red-500/20 hover:border-red-500/40 border border-slate-700 text-slate-400 hover:text-red-300 flex items-center justify-center transition cursor-pointer"
                      title="إغلاق (Esc)"
                      aria-label="إغلاق"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-arabic">
                {curatedPair
                  ? curatedPair.differenceSummaryAr
                  : `الفرق الأساسي يكمن في أن (${tense1.nameAr}) يُستخدم لـ ${tense1.summaryAr}، بينما (${tense2.nameAr}) يركز على ${tense2.summaryAr}.`}
              </p>
            </div>

            {/* Quick Profile Cards Side-by-Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tense 1 Profile */}
              <div className="bg-[#111B30] border border-blue-900/40 rounded-2xl p-4 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold text-blue-400">الزمن الأول</span>
                    <h4 className="text-base font-black text-white font-arabic">
                      {tense1.nameAr}
                    </h4>
                    <span className="text-xs text-slate-400 font-mono" dir="ltr">
                      {tense1.nameEn}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onSelectTense(tense1.id);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600 border border-blue-500/50 text-blue-200 hover:text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>فتح الدرس الكامل</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">الصيغة العامة والتركيب:</span>
                  <div className="font-mono text-sm font-bold text-blue-300" dir="ltr">
                    {tense1.shortFormula}
                  </div>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed font-arabic">
                  <strong className="text-white">الوظيفة الأساسية:</strong> {tense1.summaryAr}
                </div>
              </div>

              {/* Tense 2 Profile */}
              <div className="bg-[#111B30] border border-emerald-900/40 rounded-2xl p-4 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold text-emerald-400">الزمن الثاني</span>
                    <h4 className="text-base font-black text-white font-arabic">
                      {tense2.nameAr}
                    </h4>
                    <span className="text-xs text-slate-400 font-mono" dir="ltr">
                      {tense2.nameEn}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onSelectTense(tense2.id);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600 border border-emerald-500/50 text-emerald-200 hover:text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>فتح الدرس الكامل</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">الصيغة العامة والتركيب:</span>
                  <div className="font-mono text-sm font-bold text-emerald-300" dir="ltr">
                    {tense2.shortFormula}
                  </div>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed font-arabic">
                  <strong className="text-white">الوظيفة الأساسية:</strong> {tense2.summaryAr}
                </div>
              </div>
            </div>

            {/* Curated Distinctions if matched */}
            {curatedPair && (
              <div className="space-y-3">
                <h4 className="text-xs sm:text-sm font-bold text-amber-300 font-arabic flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>الفروقات الدقيقة المفصلة بحسب المعايير اللغوية:</span>
                </h4>

                {curatedPair.keyDistinctions.map((dist, dIdx) => {
                  const isNormalOrder = curatedPair.tense1Id === tense1Id;
                  const exp1 = isNormalOrder ? dist.tense1ExplanationAr : dist.tense2ExplanationAr;
                  const exp2 = isNormalOrder ? dist.tense2ExplanationAr : dist.tense1ExplanationAr;
                  const ex1 = isNormalOrder ? dist.tense1Example : dist.tense2Example;
                  const ex2 = isNormalOrder ? dist.tense2Example : dist.tense1Example;

                  return (
                    <div
                      key={dIdx}
                      className="bg-[#10192e] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xs"
                    >
                      <div className="text-xs font-bold text-amber-400 font-arabic border-b border-slate-800 pb-2 flex items-center gap-2">
                        <span>📌 {dist.criterionAr}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Tense 1 Side */}
                        <div className="bg-slate-950/80 p-4 rounded-xl border border-blue-900/30 space-y-2">
                          <div className="text-xs font-bold text-blue-400">
                            {tense1.nameAr}
                          </div>
                          <p className="text-xs text-slate-300 font-arabic leading-relaxed">
                            {exp1}
                          </p>
                          <div
                            className="bg-slate-900/90 p-2.5 rounded-lg text-xs font-mono text-blue-200 flex items-center justify-between gap-2 border border-slate-800"
                            dir="ltr"
                          >
                            <span className="font-semibold">{ex1}</span>
                            <button
                              onClick={() => playEnglishAudio(ex1)}
                              className="text-slate-400 hover:text-white p-1 rounded transition cursor-pointer"
                              title="استمع للنطق"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Tense 2 Side */}
                        <div className="bg-slate-950/80 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                          <div className="text-xs font-bold text-emerald-400">
                            {tense2.nameAr}
                          </div>
                          <p className="text-xs text-slate-300 font-arabic leading-relaxed">
                            {exp2}
                          </p>
                          <div
                            className="bg-slate-900/90 p-2.5 rounded-lg text-xs font-mono text-emerald-200 flex items-center justify-between gap-2 border border-slate-800"
                            dir="ltr"
                          >
                            <span className="font-semibold">{ex2}</span>
                            <button
                              onClick={() => playEnglishAudio(ex2)}
                              className="text-slate-400 hover:text-white p-1 rounded transition cursor-pointer"
                              title="استمع للنطق"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Systematic Comparison Points: Timeline, Signals, Negation */}
            <div className="space-y-4">
              <h4 className="text-xs sm:text-sm font-bold text-slate-300 font-arabic">
                مقارنة المعايير والقواعد التركيبية:
              </h4>

              {/* Criterion 1: Timeline Position */}
              <div className="bg-[#10192e] border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="text-xs font-bold text-slate-300 font-arabic flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>1. الموقع الزمني ودلالة الحدوث:</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-blue-900/30 space-y-1">
                    <span className="text-[11px] font-bold text-blue-400">{tense1.nameAr}:</span>
                    <p className="text-xs text-slate-300 font-arabic leading-relaxed">
                      {tense1.timelineDescriptionAr}
                    </p>
                  </div>
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-emerald-900/30 space-y-1">
                    <span className="text-[11px] font-bold text-emerald-400">{tense2.nameAr}:</span>
                    <p className="text-xs text-slate-300 font-arabic leading-relaxed">
                      {tense2.timelineDescriptionAr}
                    </p>
                  </div>
                </div>
              </div>

              {/* Criterion 2: Keywords and Time Signals */}
              <div className="bg-[#10192e] border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="text-xs font-bold text-slate-300 font-arabic flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>2. الكلمات الدالة والمفاتيح الزمنية (Signal Words):</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-blue-900/30 space-y-2">
                    <span className="text-[11px] font-bold text-blue-400">{tense1.nameAr}:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {tense1.usageLesson.keywords.slice(0, 6).map((kw, kIdx) => (
                        <span
                          key={kIdx}
                          className="px-2 py-0.5 rounded-md bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[11px] font-mono"
                          dir="ltr"
                          title={kw.meaningAr}
                        >
                          {kw.word}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-emerald-900/30 space-y-2">
                    <span className="text-[11px] font-bold text-emerald-400">{tense2.nameAr}:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {tense2.usageLesson.keywords.slice(0, 6).map((kw, kIdx) => (
                        <span
                          key={kIdx}
                          className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono"
                          dir="ltr"
                          title={kw.meaningAr}
                        >
                          {kw.word}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Criterion 3: Live Audio Examples */}
              <div className="bg-[#10192e] border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="text-xs font-bold text-slate-300 font-arabic flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <span>3. جملة تطبيقية نموذجية مع النطق:</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Tense 1 Example */}
                  {tense1.usageLesson.useCases[0]?.examples[0] && (
                    <div className="bg-slate-950/70 p-3 rounded-xl border border-blue-900/30 space-y-1.5">
                      <div className="text-[11px] font-bold text-blue-400">{tense1.nameAr}:</div>
                      <div className="font-mono text-xs text-white flex items-center justify-between" dir="ltr">
                        <span>"{tense1.usageLesson.useCases[0].examples[0].sentence}"</span>
                        <button
                          onClick={() => playEnglishAudio(tense1.usageLesson.useCases[0].examples[0].sentence)}
                          className="text-slate-400 hover:text-white p-1 transition cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-400 font-arabic">
                        {tense1.usageLesson.useCases[0].examples[0].translationAr}
                      </div>
                    </div>
                  )}

                  {/* Tense 2 Example */}
                  {tense2.usageLesson.useCases[0]?.examples[0] && (
                    <div className="bg-slate-950/70 p-3 rounded-xl border border-emerald-900/30 space-y-1.5">
                      <div className="text-[11px] font-bold text-emerald-400">{tense2.nameAr}:</div>
                      <div className="font-mono text-xs text-white flex items-center justify-between" dir="ltr">
                        <span>"{tense2.usageLesson.useCases[0].examples[0].sentence}"</span>
                        <button
                          onClick={() => playEnglishAudio(tense2.usageLesson.useCases[0].examples[0].sentence)}
                          className="text-slate-400 hover:text-white p-1 transition cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-400 font-arabic">
                        {tense2.usageLesson.useCases[0].examples[0].translationAr}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Distinction Quiz */}
        {activeTab === 'quiz' && (
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 min-h-0 bg-[#070C18] flex flex-col items-center justify-center max-w-xl mx-auto w-full space-y-5 overscroll-contain">
            <div className="flex items-center justify-between w-full text-xs font-bold text-slate-400 border-b border-slate-800 pb-3">
              <span>تحدي التمييز بين ({tense1.nameAr}) و ({tense2.nameAr})</span>
              <span className="bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full font-mono border border-amber-400/30">
                النتيجة: {quizScore.correct} / {quizScore.total}
              </span>
            </div>

            {currentQuizItem ? (
              <div className="w-full bg-[#111C33] border border-slate-700 rounded-2xl p-6 text-center space-y-4 shadow-md">
                <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
                  سؤال رقم {quizIndex + 1}
                </span>

                <div className="space-y-2 pt-2">
                  <div className="text-xs text-slate-400 font-arabic">
                    في أي زمن كُتبت هذه الجملة الإنجليزية؟
                  </div>
                  <div
                    className="text-lg sm:text-xl font-bold font-mono text-white bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between"
                    dir="ltr"
                  >
                    <span>"{currentQuizItem.sentence}"</span>
                    <button
                      onClick={() => playEnglishAudio(currentQuizItem.sentence)}
                      className="text-slate-400 hover:text-white p-1 transition cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xs font-bold text-slate-400 font-arabic">
                    المعنى: {currentQuizItem.translationAr}
                  </div>
                </div>

                {/* The Two Choice Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                  {[tense1, tense2].map(t => {
                    const isSelected = quizSelectedOption === t.id;
                    const isCorrect = t.id === currentQuizItem.correctTenseId;

                    let btnStyle =
                      'bg-slate-900 border-slate-700 text-white hover:border-amber-400 hover:bg-slate-800';

                    if (quizSelectedOption) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-600 border-emerald-500 text-white font-black shadow-md';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-600 border-rose-500 text-white font-black';
                      } else {
                        btnStyle = 'bg-slate-950 border-slate-800 text-slate-500 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={t.id}
                        disabled={!!quizSelectedOption}
                        onClick={() => handleSelectQuiz(t.id)}
                        className={`p-4 rounded-xl border-2 font-bold transition flex flex-col items-center justify-center gap-1 cursor-pointer ${btnStyle}`}
                      >
                        <span className="text-sm font-arabic">{t.nameAr}</span>
                        <span className="text-xs font-mono opacity-80" dir="ltr">
                          {t.nameEn}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback After Answering */}
                {quizSelectedOption && (
                  <div className="pt-4 border-t border-slate-800 text-xs font-arabic space-y-3">
                    <div
                      className={`p-3 rounded-xl font-bold flex items-center justify-center gap-2 ${
                        quizSelectedOption === currentQuizItem.correctTenseId
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {quizSelectedOption === currentQuizItem.correctTenseId ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>إجابة صحيحة ومتقنة!</span>
                        </>
                      ) : (
                        <span>إجابة غير صحيحة. راجع التفسير أدناه.</span>
                      )}
                    </div>

                    <p className="text-slate-300 text-xs leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                      💡 {currentQuizItem.explanationAr}
                    </p>

                    <button
                      onClick={handleNextQuiz}
                      className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-extrabold text-xs shadow-md transition cursor-pointer"
                    >
                      السؤال التالي ➔
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10 text-slate-400">
                لا توجد أسئلة كافية لهذه التوليفة.
              </div>
            )}
          </div>
        )}

        {/* Footer - Hidden when content is maximized */}
        {!isContentMaximized && (
          <div className="p-3.5 sm:p-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-[#111C33] shrink-0 text-xs text-slate-400 font-arabic">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>يمكنك تغيير أي من الزمنين في أي وقت لمشاهدة المقارنة المباشرة.</span>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition cursor-pointer"
            >
              إغلاق المقارنة
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
