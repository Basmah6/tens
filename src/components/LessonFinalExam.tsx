import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, CheckCircle, XCircle, RotateCcw, ShieldCheck, 
  Sparkles, ChevronLeft, CheckCircle2, AlertCircle, HelpCircle, 
  Edit3, ListOrdered, CheckSquare, ArrowRight, Lightbulb,
  Clock, Timer, AlertTriangle
} from 'lucide-react';
import { TenseData } from '../types';
import { generateUnitExam, ComprehensiveUnitExam, UnitExamMCQ, UnitExamReorder, UnitExamFreeWrite } from '../utils/examGenerator';
import { evaluateSentenceLocal, GrammarEvaluationResult } from '../utils/grammarChecker';
import { playEnglishAudio } from '../utils/audio';

const EXAM_DURATION_SECONDS = 30 * 60; // 30 minutes

export interface FreeQuestionGrading {
  orderScore: number; // 0 or 1 (درجة لترتيب الكلمات داخل الهيكل أو الصيغة)
  agreementScore: number; // 0 or 1 (درجة لموافقة الفعل والفاعل)
  verbConjugationScore: number; // 0 or 1 (درجة للتصريف الصحيح للفعل)
  totalScore: number; // 0 to 3
  orderFeedbackAr: string;
  agreementFeedbackAr: string;
  verbConjugationFeedbackAr: string;
}

export function gradeFreePrompt(
  prompt: UnitExamFreeWrite,
  evalRes: GrammarEvaluationResult,
  rawText: string
): FreeQuestionGrading {
  const clean = rawText.trim();
  if (!clean || !evalRes) {
    return {
      orderScore: 0,
      agreementScore: 0,
      verbConjugationScore: 0,
      totalScore: 0,
      orderFeedbackAr: 'لم يتم تسليم إجابة لفحص ترتيب الكلمات داخل الهيكل.',
      agreementFeedbackAr: 'لم يتم تسليم إجابة لفحص توافق الفعل والفاعل.',
      verbConjugationFeedbackAr: 'لم يتم تسليم إجابة لفحص تصريف الفعل.'
    };
  }

  // 1. درجة لترتيب الكلمات داخل الهيكل أو الصيغة (Word order & structure)
  let orderScore = 0;
  let orderFeedbackAr = '';

  const hasSubject = !!evalRes.svoStatus?.hasSubject;
  const hasVerb = !!evalRes.svoStatus?.hasVerb;
  const isOrderValid = !!evalRes.svoStatus?.isOrderValid;
  const isTargetMatched = !!evalRes.targetStructureStatus?.isMatched;

  let formMatches = true;
  if (prompt.requiredForm === 'negative') {
    const hasNegation = /\b(not|n't|never|no)\b/i.test(clean);
    if (!hasNegation) {
      formMatches = false;
      orderFeedbackAr = 'المطلوب صياغة جملة منفية (تحتوي على أداة نفي مثل not أو don\'t).';
    }
  } else if (prompt.requiredForm === 'question') {
    const isQuestionForm = clean.endsWith('?') || /^(do|does|did|is|are|am|was|were|have|has|had|will|would|can|could|should|what|where|when|why|who|how)\b/i.test(clean);
    if (!isQuestionForm) {
      formMatches = false;
      orderFeedbackAr = 'المطلوب صيغة سؤال تبدأ بفعل مساعد أو استفهام وتنتهي بعلامة (?).';
    }
  }

  if (formMatches) {
    if (hasSubject && hasVerb && (isOrderValid || isTargetMatched)) {
      orderScore = 1;
      orderFeedbackAr = 'ترتيب الكلمات سليم ومطابق لهيكل وصيغة الجملة المطلوبة ✅';
    } else {
      orderScore = 0;
      if (!hasSubject) {
        orderFeedbackAr = 'ينقص فاعل صريح في بداية الجملة لضبط ترتيب الهيكل.';
      } else if (!hasVerb) {
        orderFeedbackAr = 'ينقص فعل يوضح الحدث لاكتمال هيكل الجملة.';
      } else {
        orderFeedbackAr = 'ترتيب الكلمات داخل الهيكل غير دقيق، راجع تسلسل (فاعل ← فعل ← تكملة).';
      }
    }
  }

  // 2. درجة لموافقة الفعل والفاعل (Subject-Verb Agreement)
  let agreementScore = 0;
  let agreementFeedbackAr = '';

  if (hasSubject && hasVerb && evalRes.agreementStatus?.isValid) {
    agreementScore = 1;
    agreementFeedbackAr = evalRes.agreementStatus?.ruleAppliedAr 
      ? `الفعل متطابق مع الفاعل (${evalRes.agreementStatus.subjectTypeAr || 'المحدد'}) ✅`
      : 'الفعل متطابق تماماً مع الفاعل من حيث الإفراد والجمع ✅';
  } else {
    agreementScore = 0;
    agreementFeedbackAr = evalRes.agreementStatus?.detailsAr 
      || 'شكل الفعل لا يتوافق مع نوع الفاعل (راجع التوافق بين المفرد والجمع).';
  }

  // 3. درجة للتصريف الصحيح للفعل (Correct Verb Conjugation)
  let verbConjugationScore = 0;
  let verbConjugationFeedbackAr = '';

  const hasVerbConjugationError = evalRes.corrections.some(c => 
    c.includes('تصريف') || c.includes('صيغة الفعل') || c.includes('فعل غير منتظم') || c.includes('V3') || c.includes('V2') || c.includes('V1') || c.includes('ing')
  );

  if (hasVerb && evalRes.tenseMatch && !hasVerbConjugationError) {
    verbConjugationScore = 1;
    verbConjugationFeedbackAr = 'تصريف وصيغة الفعل صحيحة تماماً ومطابقة لزمن الدرس ✅';
  } else {
    verbConjugationScore = 0;
    if (!hasVerb) {
      verbConjugationFeedbackAr = 'لم يتم تحديد فعل لتصريفه.';
    } else {
      verbConjugationFeedbackAr = evalRes.corrections.find(c => c.includes('تصريف') || c.includes('صيغة') || c.includes('زمن'))
        || 'صيغة أو تصريف الفعل غير دقيقة بالنسبة لهذا الزمن، راجع تصريف الفعل.';
    }
  }

  const totalScore = orderScore + agreementScore + verbConjugationScore;

  return {
    orderScore,
    agreementScore,
    verbConjugationScore,
    totalScore,
    orderFeedbackAr,
    agreementFeedbackAr,
    verbConjugationFeedbackAr
  };
}

interface LessonFinalExamProps {
  tense: TenseData;
  onPassExam: (score: number) => void;
  onBackToCourse: () => void;
}

export const LessonFinalExam: React.FC<LessonFinalExamProps> = ({
  tense,
  onPassExam,
  onBackToCourse,
}) => {
  // Generate the 20-question structured comprehensive exam:
  // Part 1: 5 MCQs
  // Part 2: 5 Reorder questions
  // Part 3: 10 Free-Writing prompts (5 Affirmative, 3 Negative, 2 Questions)
  const [unitExam] = useState<ComprehensiveUnitExam>(() => generateUnitExam(tense));

  // Active exam tab / section
  const [activeSection, setActiveSection] = useState<'all' | 'mcq' | 'reorder' | 'free_write'>('all');

  // Answers State
  const [mcqAnswers, setMcqAnswers] = useState<{ [qId: string]: number }>({});
  const [reorderAnswers, setReorderAnswers] = useState<{ [qId: string]: string[] }>({});
  const [reorderPickedIndices, setReorderPickedIndices] = useState<{ [qId: string]: number[] }>({});
  const [freeWriteInputs, setFreeWriteInputs] = useState<{ [qId: string]: string }>({});
  const [submittedFreeWrite, setSubmittedFreeWrite] = useState<{ [qId: string]: boolean }>({});
  const [freeWriteEvaluations, setFreeWriteEvaluations] = useState<{ [qId: string]: GrammarEvaluationResult }>({});
  const [freeWriteScores, setFreeWriteScores] = useState<{ [qId: string]: FreeQuestionGrading }>({});
  const [isGrading, setIsGrading] = useState<boolean>(false);

  // Timer State (30 Minutes)
  const [timeLeft, setTimeLeft] = useState<number>(EXAM_DURATION_SECONDS);
  const [timeExpired, setTimeExpired] = useState<boolean>(false);

  // Submission State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [scoreDetails, setScoreDetails] = useState<{
    mcqScore: number;
    reorderScore: number;
    freeWriteScore: number;
    freeWriteTotal: number;
    freeWritePercent: number;
    totalPercent: number;
  }>({ mcqScore: 0, reorderScore: 0, freeWriteScore: 0, freeWriteTotal: 30, freeWritePercent: 0, totalPercent: 0 });

  // Ref to hold the latest state for auto-submit
  const examStateRef = useRef({
    mcqAnswers,
    reorderAnswers,
    freeWriteInputs,
    isSubmitted,
    isGrading
  });

  // Automatically scroll to top when switching exam sections or when submitted
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection, isSubmitted]);

  useEffect(() => {
    examStateRef.current = {
      mcqAnswers,
      reorderAnswers,
      freeWriteInputs,
      isSubmitted,
      isGrading
    };
  }, [mcqAnswers, reorderAnswers, freeWriteInputs, isSubmitted, isGrading]);

  // Timer Countdown Effect
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  // Handle auto-submit when time expires
  useEffect(() => {
    if (timeLeft === 0 && !isSubmitted) {
      setTimeExpired(true);
      const current = examStateRef.current;
      if (!current.isSubmitted && !current.isGrading) {
        executeExamGrading(
          current.mcqAnswers,
          current.reorderAnswers,
          current.freeWriteInputs
        );
      }
    }
  }, [timeLeft, isSubmitted]);

  const handleAutoSubmit = () => {
    const current = examStateRef.current;
    if (current.isSubmitted || current.isGrading) return;
    executeExamGrading(current.mcqAnswers, current.reorderAnswers, current.freeWriteInputs);
  };

  // MCQ Selection Handler
  const handleSelectMCQ = (qId: string, optionIdx: number) => {
    if (isSubmitted) return;
    setMcqAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  // Pick Word Chip by Index in Reorder
  const handlePickWordChip = (qId: string, chipIdx: number, scrambledWords: string[]) => {
    if (isSubmitted) return;
    setReorderPickedIndices(prev => {
      const currentIndices = prev[qId] || [];
      if (currentIndices.includes(chipIdx)) return prev;
      const nextIndices = [...currentIndices, chipIdx];
      setReorderAnswers(aPrev => ({
        ...aPrev,
        [qId]: nextIndices.map(i => scrambledWords[i])
      }));
      return { ...prev, [qId]: nextIndices };
    });
  };

  // Remove Word from Constructed Tray by Tray Index
  const handleRemoveTrayWord = (qId: string, trayIdx: number, scrambledWords: string[]) => {
    if (isSubmitted) return;
    setReorderPickedIndices(prev => {
      const currentIndices = prev[qId] || [];
      const nextIndices = currentIndices.filter((_, idx) => idx !== trayIdx);
      setReorderAnswers(aPrev => ({
        ...aPrev,
        [qId]: nextIndices.map(i => scrambledWords[i])
      }));
      return { ...prev, [qId]: nextIndices };
    });
  };

  const handleResetReorder = (qId: string) => {
    if (isSubmitted) return;
    setReorderPickedIndices(prev => ({ ...prev, [qId]: [] }));
    setReorderAnswers(prev => ({ ...prev, [qId]: [] }));
  };

  // Submit individual Free Write answer
  const handleSubmitPromptAnswer = (qId: string) => {
    if (isSubmitted) return;
    const text = freeWriteInputs[qId]?.trim();
    if (!text) return;
    setSubmittedFreeWrite(prev => ({ ...prev, [qId]: true }));
  };

  const executeExamGrading = async (
    currentMcq: { [qId: string]: number },
    currentReorder: { [qId: string]: string[] },
    currentFreeWrite: { [qId: string]: string }
  ) => {
    if (isGrading || isSubmitted) return;
    setIsGrading(true);

    // 1. Calculate MCQ score (5 questions)
    let mcqCorrect = 0;
    unitExam.mcqQuestions.forEach(q => {
      if (currentMcq[q.id] === q.correctIndex) {
        mcqCorrect++;
      }
    });
    const mcqPercent = (mcqCorrect / unitExam.mcqQuestions.length) * 100;

    // 2. Calculate Reorder score (5 questions)
    let reorderCorrect = 0;
    unitExam.reorderQuestions.forEach(q => {
      const userBuilt = (currentReorder[q.id] || []).join(' ').trim().toLowerCase().replace(/[.?!]/g, '');
      const target = q.targetSentenceEn.trim().toLowerCase().replace(/[.?!]/g, '');
      if (userBuilt === target) {
        reorderCorrect++;
      }
    });
    const reorderPercent = (reorderCorrect / unitExam.reorderQuestions.length) * 100;

    // 3. Evaluate and grade all 10 Free Write prompts simultaneously after total exam submission
    // Score breakdown per question (3 marks total):
    // 1 mark: Word order within target structure/formula
    // 1 mark: Subject-verb agreement
    // 1 mark: Correct verb conjugation
    const evaluations: { [qId: string]: GrammarEvaluationResult } = {};
    const gradings: { [qId: string]: FreeQuestionGrading } = {};
    let freeWriteEarnedMarks = 0;

    await Promise.all(
      unitExam.freeWritePrompts.map(async (prompt) => {
        const text = currentFreeWrite[prompt.id]?.trim() || '';
        if (!text) {
          const emptyEval: GrammarEvaluationResult = {
            isCorrect: false,
            tenseMatch: false,
            score: 0,
            detectedTense: 'none',
            breakdown: { subject: '-', auxiliary: '-', mainVerb: '-', objectComplement: '-', timeMarker: '-' },
            svoStatus: {
              hasSubject: false,
              hasVerb: false,
              hasObjectComplement: false,
              isOrderValid: false,
              summaryAr: 'لم يتم إدخال جملة لتحليل أركان SVO.',
            },
            agreementStatus: {
              isValid: false,
              subjectTypeAr: 'غير محدد',
              ruleAppliedAr: 'لا ينطبق لعدم وجود جملة',
              detailsAr: 'لم يتم إدخال جملة لفحص توافق الفاعل والفعل.',
            },
            targetStructureStatus: {
              isMatched: false,
              expectedFormula: '-',
              detailsAr: 'لم يتم إدخال إجابة لمطابقة الهيكل المستهدف.',
            },
            explanationAr: 'لم يتم تسليم إجابة لهذا السؤال أثناء الاختبار.',
            corrections: ['لم تتم كتابة جملة لتصحيحها.'],
            suggestionsAr: [],
            naturalAlternative: '',
          };
          evaluations[prompt.id] = emptyEval;
          gradings[prompt.id] = gradeFreePrompt(prompt, emptyEval, '');
          return;
        }

        // Evaluate directly using target structure, SVO breakdown, and subject-verb agreement
        const localRes = evaluateSentenceLocal(tense.id, text);
        evaluations[prompt.id] = localRes;
        const promptGrade = gradeFreePrompt(prompt, localRes, text);
        gradings[prompt.id] = promptGrade;
        freeWriteEarnedMarks += promptGrade.totalScore;
      })
    );

    const freeWriteTotalPossible = unitExam.freeWritePrompts.length * 3; // 30 marks total
    const freeWritePercent = Math.round((freeWriteEarnedMarks / freeWriteTotalPossible) * 100);

    // Weighted Total: 35% MCQ, 35% Reorder, 30% Free Write
    const totalWeighted = Math.round((mcqPercent * 0.35) + (reorderPercent * 0.35) + (freeWritePercent * 0.30));

    setFreeWriteEvaluations(evaluations);
    setFreeWriteScores(gradings);
    setScoreDetails({
      mcqScore: mcqCorrect,
      reorderScore: reorderCorrect,
      freeWriteScore: freeWriteEarnedMarks,
      freeWriteTotal: freeWriteTotalPossible,
      freeWritePercent,
      totalPercent: totalWeighted
    });
    setFinalScore(totalWeighted);
    setIsSubmitted(true);
    setIsGrading(false);

    if (totalWeighted >= unitExam.passingScorePercent) {
      onPassExam(totalWeighted);
      try {
        confetti({
          particleCount: 130,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
        });
      } catch (e) {
        console.log('Confetti not available:', e);
      }
    }
  };

  // Submit All Sections
  const handleSubmitExam = () => {
    executeExamGrading(mcqAnswers, reorderAnswers, freeWriteInputs);
  };

  const handleRetakeExam = () => {
    setMcqAnswers({});
    setReorderAnswers({});
    setReorderPickedIndices({});
    setFreeWriteInputs({});
    setSubmittedFreeWrite({});
    setFreeWriteEvaluations({});
    setFreeWriteScores({});
    setIsSubmitted(false);
    setIsGrading(false);
    setFinalScore(0);
    setScoreDetails({ mcqScore: 0, reorderScore: 0, freeWriteScore: 0, freeWriteTotal: 30, freeWritePercent: 0, totalPercent: 0 });
    setTimeLeft(EXAM_DURATION_SECONDS);
    setTimeExpired(false);
  };

  // Progress metrics
  const mcqDoneCount = Object.keys(mcqAnswers).length;
  const reorderDoneCount = Object.keys(reorderAnswers).filter(k => (reorderAnswers[k] || []).length > 0).length;
  const freeWriteDoneCount = Object.keys(submittedFreeWrite).filter(k => submittedFreeWrite[k] && (freeWriteInputs[k] || '').trim().length > 0).length;
  const totalCompleted = mcqDoneCount + reorderDoneCount + freeWriteDoneCount;
  const totalQuestions = unitExam.mcqQuestions.length + unitExam.reorderQuestions.length + unitExam.freeWritePrompts.length; // 5 + 5 + 10 = 20

  const isPassed = finalScore >= unitExam.passingScorePercent;

  // Format time (MM:SS)
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = timeLeft <= 300; // less than 5 minutes
  const isTimeDanger = timeLeft <= 60; // less than 1 minute

  return (
    <div className="space-y-6 animate-fadeIn" dir="rtl">
      
      {/* Header Banner */}
      <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1.5 h-full bg-amber-500"></div>
        
        {/* Top Header Row with Lesson Badge & Countdown Timer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-400/30">
            <Award className="w-3.5 h-3.5" />
            الدرس 6: الاختبار الشامل النهائي المتكامل للوحدة (20 مهمة)
          </div>

          {/* 30-Minute Timer Badge */}
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-bold shadow-xs transition-colors duration-300 ${
            isSubmitted
              ? 'bg-slate-800/80 text-slate-400 border-slate-700'
              : isTimeDanger
              ? 'bg-rose-500/30 text-rose-200 border-rose-500/60 animate-pulse'
              : isTimeCritical
              ? 'bg-amber-500/25 text-amber-200 border-amber-500/50'
              : 'bg-blue-950/70 text-blue-200 border-blue-500/40'
          }`}>
            <Clock className={`w-4 h-4 ${
              isSubmitted
                ? 'text-slate-400'
                : isTimeDanger
                ? 'text-rose-400 animate-spin'
                : isTimeCritical
                ? 'text-amber-400'
                : 'text-blue-400'
            }`} />
            <span className="font-arabic font-normal text-xs text-slate-300">
              {isSubmitted ? 'الوقت المستغرق:' : 'مؤقت الاختبار (30 دقيقة):'}
            </span>
            <span className="tracking-wider text-sm font-extrabold text-white" dir="ltr">
              {isSubmitted ? formatTimer(EXAM_DURATION_SECONDS - timeLeft) : formatTimer(timeLeft)}
            </span>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white">
          اختبار إتقان زمن ({tense.nameAr})
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl">
          تم تصميم هذا الاختبار وفق معايير التقييم الشاملة للغة الإنجليزية مع مؤقت محدد بـ <strong>30 دقيقة</strong>: 
          <strong> 5 أسئلة اختيار من متعدد</strong>، 
          <strong> 5 أسئلة ترتيب كلمات</strong>، 
          و<strong> 10 أسئلة تكوين حر</strong> (5 إثبات، 3 نفي، 2 سؤال).
        </p>

        {/* Structure Badges */}
        <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-blue-300 font-semibold">
              <CheckSquare className="w-4 h-4 text-blue-400" />
              القسم 1: الاختيارات (MCQ)
            </span>
            <span className="font-bold font-mono text-white">{mcqDoneCount}/5</span>
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <ListOrdered className="w-4 h-4 text-amber-400" />
              القسم 2: ترتيب الكلمات
            </span>
            <span className="font-bold font-mono text-white">{reorderDoneCount}/5</span>
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
              <Edit3 className="w-4 h-4 text-emerald-400" />
              القسم 3: الكتابة الحرة (5 إثبات / 3 نفي / 2 سؤال)
            </span>
            <span className="font-bold font-mono text-white">{freeWriteDoneCount}/10</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
          <span>إجمالي الأسئلة المنجزة: {totalCompleted} من {totalQuestions}</span>
          <span className="font-bold text-amber-400">نسبة الاجتياز المطلوبة: {unitExam.passingScorePercent}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2 mt-1.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 via-amber-500 to-emerald-500 h-2 transition-all duration-300"
            style={{ width: `${Math.round((totalCompleted / totalQuestions) * 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Time Expired Notice */}
      {timeExpired && isSubmitted && (
        <div className="bg-amber-500/15 border border-amber-500/50 rounded-xl p-4 text-amber-200 flex items-center gap-3 text-xs sm:text-sm animate-fadeIn">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <strong className="font-bold text-amber-300">انتهى وقت الاختبار (30 دقيقة):</strong> تم تسليم إجاباتك الحالية تلقائياً واحتساب الدرجة النهائية.
          </div>
        </div>
      )}

      {/* Result Card after Submission */}
      {isSubmitted && (
        <div className={`rounded-xl p-6 sm:p-7 border shadow-sm animate-fadeIn ${
          isPassed 
            ? 'bg-[#0F172A] border-emerald-500/60 text-white' 
            : 'bg-[#0F172A] border-rose-500/60 text-white'
        }`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-right">
            <div className="space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                {isPassed ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    تهانينا! لقد اجتزت اختبار الوحدة الشامل بنجاح
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/40">
                    تحتاج لمراجعة بعض النقاط قبل إعادة الاختبار
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {isPassed ? `تم منحك وسام إتقان (${tense.nameAr})!` : 'لم تحقق نسبة النجاح المطلوبة'}
              </h3>
              
              {/* Detailed Breakdown */}
              <div className="flex flex-wrap items-center gap-4 text-xs pt-2">
                <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  الاختيارات: <strong>{scoreDetails.mcqScore}/5</strong>
                </span>
                <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  ترتيب الكلمات: <strong>{scoreDetails.reorderScore}/5</strong>
                </span>
                <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  الكتابة الحرة: <strong>{scoreDetails.freeWriteScore}/{scoreDetails.freeWriteTotal} ({scoreDetails.freeWritePercent}%)</strong>
                </span>
              </div>
            </div>

            {/* Score Metric Circle */}
            <div className="flex flex-col items-center justify-center bg-slate-900/90 p-5 rounded-xl border border-slate-700 shrink-0 w-32 h-32">
              <span className={`text-3xl font-bold font-mono ${isPassed ? 'text-emerald-400' : 'text-rose-400'}`}>
                {finalScore}%
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-bold mt-1">
                الدرجة الإجمالية
              </span>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleRetakeExam}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة الاختبار بالكامل</span>
            </button>

            <button
              onClick={onBackToCourse}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
            >
              <span>العودة إلى خريطة الأزمنة</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Grading in progress banner */}
      {isGrading && (
        <div className="bg-blue-600 text-white p-4 rounded-xl flex items-center justify-center gap-3 font-arabic font-bold shadow-md animate-pulse">
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span>جاري تصحيح الاختبار النهائي وتقييم جميع إجاباتك... يرجى الانتظار لحظات</span>
        </div>
      )}

      {/* Navigation Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSection('all')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition shrink-0 cursor-pointer ${
            activeSection === 'all' 
              ? 'bg-[#1E293B] text-white shadow-xs' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          عرض الاختبار كاملاً (20 سؤال)
        </button>
        <button
          onClick={() => setActiveSection('mcq')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition shrink-0 cursor-pointer flex items-center gap-1.5 ${
            activeSection === 'mcq' 
              ? 'bg-blue-600 text-white shadow-xs' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <CheckSquare className="w-3.5 h-3.5" />
          <span>1. الاختيارات من متعدد (5)</span>
        </button>
        <button
          onClick={() => setActiveSection('reorder')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition shrink-0 cursor-pointer flex items-center gap-1.5 ${
            activeSection === 'reorder' 
              ? 'bg-amber-600 text-white shadow-xs' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <ListOrdered className="w-3.5 h-3.5" />
          <span>2. ترتيب الكلمات (5)</span>
        </button>
        <button
          onClick={() => setActiveSection('free_write')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition shrink-0 cursor-pointer flex items-center gap-1.5 ${
            activeSection === 'free_write' 
              ? 'bg-emerald-600 text-white shadow-xs' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>3. الكتابة الحرة (10 أسئلة • 30 درجة)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: 5 MULTIPLE CHOICE QUESTIONS */}
      {/* ========================================================================= */}
      {(activeSection === 'all' || activeSection === 'mcq') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 p-3.5 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                1
              </span>
              <div>
                <h3 className="text-sm font-bold text-blue-900">
                  القسم الأول: أسئلة الاختيار من متعدد (5 أسئلة)
                </h3>
                <p className="text-xs text-blue-700">
                  اختر الإجابة الدقيقة نحويًا لتصريف الفعل والأفعال المساعدة وسياق الاستخدام.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-800 bg-white px-2.5 py-1 rounded-md border border-blue-200">
              {mcqDoneCount}/5
            </span>
          </div>

          <div className="space-y-4">
            {unitExam.mcqQuestions.map((q, idx) => {
              const studentSelection = mcqAnswers[q.id];
              const isCorrect = studentSelection === q.correctIndex;

              return (
                <div 
                  key={q.id}
                  className={`bg-white border rounded-xl p-5 sm:p-6 shadow-sm transition ${
                    isSubmitted
                      ? isCorrect 
                        ? 'border-emerald-300 bg-emerald-50/10' 
                        : 'border-rose-300 bg-rose-50/10'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold font-mono shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="w-full">
                      <h4 className="text-base font-bold text-slate-900 font-sans tracking-wide text-left" dir="ltr">
                        {q.questionEn}
                      </h4>
                      <p className="text-xs text-slate-600 font-arabic mt-1">
                        {q.questionAr}
                      </p>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3" dir="ltr">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = studentSelection === optIdx;
                      let btnClass = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-blue-50/50 hover:border-blue-200';

                      if (isSubmitted) {
                        if (optIdx === q.correctIndex) {
                          btnClass = 'bg-emerald-600 border-emerald-600 text-white font-bold shadow-sm';
                        } else if (isSelected && !isCorrect) {
                          btnClass = 'bg-rose-600 border-rose-600 text-white font-bold';
                        } else {
                          btnClass = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
                        }
                      } else if (isSelected) {
                        btnClass = 'bg-blue-600 border-blue-600 text-white font-bold shadow-sm';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isSubmitted}
                          onClick={() => handleSelectMCQ(q.id, optIdx)}
                          className={`p-3 rounded-lg border text-xs sm:text-sm font-semibold transition text-left flex items-center justify-between cursor-pointer ${btnClass}`}
                        >
                          <span>{opt}</span>
                          {isSubmitted && optIdx === q.correctIndex && <CheckCircle className="w-4 h-4 text-white" />}
                          {isSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-white" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation after submission */}
                  {isSubmitted && (
                    <div className="mt-3.5 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-arabic bg-slate-50/80 p-3 rounded-lg border border-slate-100">
                      <p className="text-slate-800">
                        <strong className="text-slate-900">الشرح والتعليل:</strong> {q.explanationAr}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: 5 WORD REORDERING QUESTIONS */}
      {/* ========================================================================= */}
      {(activeSection === 'all' || activeSection === 'reorder') && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between bg-amber-50 border border-amber-200 p-3.5 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                2
              </span>
              <div>
                <h3 className="text-sm font-bold text-amber-900">
                  القسم الثاني: إعادة ترتيب الكلمات (5 أسئلة)
                </h3>
                <p className="text-xs text-amber-700">
                  انقر على الكلمات بالترتيب الصحيح لبناء جملة مكتملة الأركان (SVO).
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-white px-2.5 py-1 rounded-md border border-amber-200">
              {reorderDoneCount}/5
            </span>
          </div>

          <div className="space-y-4">
            {unitExam.reorderQuestions.map((ro, idx) => {
              const currentWords = reorderAnswers[ro.id] || [];
              const userBuilt = currentWords.join(' ').trim().toLowerCase().replace(/[.?!]/g, '');
              const target = ro.targetSentenceEn.trim().toLowerCase().replace(/[.?!]/g, '');
              const isCorrect = userBuilt === target;

              return (
                <div 
                  key={ro.id}
                  className={`bg-white border rounded-xl p-5 sm:p-6 shadow-sm transition ${
                    isSubmitted
                      ? isCorrect 
                        ? 'border-emerald-300 bg-emerald-50/10' 
                        : 'border-rose-300 bg-rose-50/10'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold font-mono shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800">
                            {ro.formType === 'affirmative' ? 'إثبات' : ro.formType === 'negative' ? 'نفي' : 'سؤال'}
                          </span>
                          <span className="text-xs text-slate-500 font-arabic">
                            {ro.instructionAr}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-slate-800 font-arabic">
                          المعنى المستهدف: «{ro.translationAr}»
                        </p>
                      </div>
                    </div>

                    {!isSubmitted && currentWords.length > 0 && (
                      <button
                        onClick={() => handleResetReorder(ro.id)}
                        className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer bg-rose-50 px-2 py-1 rounded"
                      >
                        <RotateCcw className="w-3 h-3" />
                        مسح
                      </button>
                    )}
                  </div>

                  {/* Sentence Constructing Box */}
                  <div className="p-3.5 rounded-lg bg-slate-900 text-white min-h-[52px] flex flex-wrap items-center gap-2 border border-slate-700" dir="ltr">
                    {(reorderPickedIndices[ro.id] || []).length === 0 ? (
                      <span className="text-xs text-slate-400 italic">
                        Click the word chips below in the correct order...
                      </span>
                    ) : (
                      (reorderPickedIndices[ro.id] || []).map((chipIdx, trayIdx) => (
                        <button
                          key={trayIdx}
                          disabled={isSubmitted}
                          onClick={() => handleRemoveTrayWord(ro.id, trayIdx, ro.scrambledWords)}
                          className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm rounded shadow-xs cursor-pointer transition hover:scale-105"
                          title="انقر لإزالة هذه الكلمة"
                        >
                          {ro.scrambledWords[chipIdx]}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Word Bank Chips */}
                  <div className="mt-3 flex flex-wrap gap-2" dir="ltr">
                    {ro.scrambledWords.map((word, wIdx) => {
                      const isPicked = (reorderPickedIndices[ro.id] || []).includes(wIdx);
                      return (
                        <button
                          key={wIdx}
                          disabled={isSubmitted || isPicked}
                          onClick={() => handlePickWordChip(ro.id, wIdx, ro.scrambledWords)}
                          className={`px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-semibold transition cursor-pointer ${
                            isPicked 
                              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-50 line-through' 
                              : 'bg-white text-slate-800 border-slate-300 hover:border-amber-500 hover:bg-amber-50/50 shadow-2xs'
                          }`}
                        >
                          {word}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation after submission */}
                  {isSubmitted && (
                    <div className="mt-3.5 pt-3 border-t border-slate-100 text-xs sm:text-sm leading-relaxed font-arabic bg-slate-50/80 p-3 rounded-lg border border-slate-100">
                      <p className="font-bold text-slate-900 mb-1" dir="ltr">
                        الجملة الصحيحة: <span className="text-emerald-700 font-mono">{ro.targetSentenceEn}</span>
                      </p>
                      <p className="text-slate-700">
                        <strong>التوضيح النحوي:</strong> {ro.explanationAr}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: 10 FREE-WRITING PROMPTS (5 Affirmative, 3 Negative, 2 Questions) */}
      {/* ========================================================================= */}
      {(activeSection === 'all' || activeSection === 'free_write') && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                3
              </span>
              <div>
                <h3 className="text-sm font-bold text-emerald-900">
                  القسم الثالث: تكوين الجمل الحر (10 أسئلة • 30 درجة)
                </h3>
                <p className="text-xs text-emerald-700">
                  توزيع درجات كل سؤال (3 درجات): 1 لترتيب الكلمات داخل الهيكل أو الصيغة، 1 لموافقة الفعل والفاعل، 1 للتصريف الصحيح للفعل.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-md border border-emerald-200">
              {freeWriteDoneCount}/10
            </span>
          </div>

          <div className="space-y-4">
            {unitExam.freeWritePrompts.map((fw, idx) => {
              const currentInput = freeWriteInputs[fw.id] || '';
              const evalRes = freeWriteEvaluations[fw.id];
              const qGrade = freeWriteScores[fw.id];
              const isAnswerSubmitted = !!submittedFreeWrite[fw.id];

              return (
                <div 
                  key={fw.id}
                  className={`bg-white border rounded-xl p-5 sm:p-6 shadow-sm transition ${
                    isSubmitted && qGrade
                      ? qGrade.totalScore === 3 
                        ? 'border-emerald-300 bg-emerald-50/10' 
                        : qGrade.totalScore > 0
                        ? 'border-amber-300 bg-amber-50/10'
                        : 'border-rose-300 bg-rose-50/10'
                      : isAnswerSubmitted
                      ? 'border-emerald-300 bg-emerald-50/5'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold font-mono shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            fw.requiredForm === 'affirmative'
                              ? 'bg-blue-100 text-blue-800'
                              : fw.requiredForm === 'negative'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {fw.requiredFormAr}
                          </span>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100/80 text-emerald-900 border border-emerald-300 font-arabic">
                            3 درجات: هيكل (1) • توافق (1) • تصريف (1)
                          </span>
                          <span className="text-xs text-slate-500 font-arabic">
                            {fw.guidelinesAr}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 font-arabic">
                          {fw.promptAr}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Free Write Input Field */}
                  <div className="space-y-2">
                    <div className="relative">
                      <input
                        type="text"
                        disabled={isSubmitted || isGrading}
                        value={currentInput}
                        onChange={(e) => setFreeWriteInputs(prev => ({ ...prev, [fw.id]: e.target.value }))}
                        placeholder="Type your complete English sentence here..."
                        className="w-full p-3 pl-10 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-slate-900 font-sans text-sm font-medium disabled:bg-slate-50 disabled:text-slate-700"
                        dir="ltr"
                      />
                      {currentInput && (
                        <button
                          type="button"
                          onClick={() => playEnglishAudio(currentInput)}
                          className="absolute left-2.5 top-2.5 p-1 rounded-md text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition cursor-pointer"
                          title="استمع للنطق"
                        >
                          <span className="text-xs">🔊</span>
                        </button>
                      )}
                    </div>

                    {/* Single Prompt Submit Answer Button */}
                    {!isSubmitted && (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs pt-1.5">
                        <div className="text-[11px] font-arabic">
                          {isAnswerSubmitted ? (
                            <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>تم تسليم الإجابة بنجاح • سيتم التصحيح والتقييم بعد تسليم الاختبار كلياً.</span>
                            </span>
                          ) : (
                            <span className="text-slate-500">
                              اكتب جملتك ثم اضغط «تسليم الإجابة» لحفظها في الاختبار.
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          disabled={!currentInput.trim() || isGrading}
                          onClick={() => handleSubmitPromptAnswer(fw.id)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs shrink-0 ${
                            isAnswerSubmitted
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                              : 'bg-slate-800 hover:bg-slate-900 text-white disabled:opacity-40 disabled:cursor-not-allowed'
                          }`}
                        >
                          {isAnswerSubmitted ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
                              <span>تم تسليم الإجابة</span>
                            </>
                          ) : (
                            <>
                              <CheckSquare className="w-3.5 h-3.5 text-slate-300" />
                              <span>تسليم الإجابة</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Evaluation Result Feedback - Shown ONLY after entire exam is submitted */}
                  {isSubmitted && evalRes && (
                    <div className={`mt-3.5 p-4 rounded-xl border text-xs sm:text-sm font-arabic ${
                      (qGrade?.totalScore ?? 0) === 3 
                        ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950' 
                        : (qGrade?.totalScore ?? 0) > 0
                        ? 'bg-amber-50/90 border-amber-300 text-amber-950'
                        : 'bg-rose-50/90 border-rose-300 text-rose-950'
                    }`}>
                      {/* 3-Point Score Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-200/80">
                        <div className="flex items-center gap-2">
                          {(qGrade?.totalScore ?? 0) === 3 ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : (qGrade?.totalScore ?? 0) > 0 ? (
                            <AlertCircle className="w-5 h-5 text-amber-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-600" />
                          )}
                          <span className="font-bold text-sm sm:text-base">
                            الدرجة المستحقة: {(qGrade?.totalScore ?? 0)} من 3 درجات
                          </span>
                        </div>

                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                          (qGrade?.totalScore ?? 0) === 3 
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                            : (qGrade?.totalScore ?? 0) > 0
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-rose-100 text-rose-800 border-rose-300'
                        }`}>
                          {(qGrade?.totalScore ?? 0) === 3 
                            ? 'درجة كاملة (3/3) ✨' 
                            : (qGrade?.totalScore ?? 0) > 0
                            ? `درجة جزئية (${qGrade?.totalScore ?? 0}/3)`
                            : '0 من 3 درجات'}
                        </span>
                      </div>

                      {/* The 3 Assessment Criteria Breakdown Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-3">
                        {/* 1. درجة ترتيب الكلمات داخل الهيكل أو الصيغة */}
                        <div className={`p-3 rounded-lg border flex flex-col justify-between ${
                          qGrade?.orderScore === 1
                            ? 'bg-white border-emerald-300 shadow-2xs'
                            : 'bg-white/80 border-rose-200'
                        }`}>
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                {qGrade?.orderScore === 1 ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                                )}
                                1. ترتيب الكلمات داخل الهيكل
                              </span>
                              <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
                                qGrade?.orderScore === 1
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-700'
                              }`}>
                                {qGrade?.orderScore ?? 0}/1
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                              {qGrade?.orderFeedbackAr}
                            </p>
                          </div>
                        </div>

                        {/* 2. درجة موافقة الفعل والفاعل */}
                        <div className={`p-3 rounded-lg border flex flex-col justify-between ${
                          qGrade?.agreementScore === 1
                            ? 'bg-white border-emerald-300 shadow-2xs'
                            : 'bg-white/80 border-rose-200'
                        }`}>
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                {qGrade?.agreementScore === 1 ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                                )}
                                2. موافقة الفعل والفاعل
                              </span>
                              <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
                                qGrade?.agreementScore === 1
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-700'
                              }`}>
                                {qGrade?.agreementScore ?? 0}/1
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                              {qGrade?.agreementFeedbackAr}
                            </p>
                          </div>
                        </div>

                        {/* 3. درجة التصريف الصحيح للفعل */}
                        <div className={`p-3 rounded-lg border flex flex-col justify-between ${
                          qGrade?.verbConjugationScore === 1
                            ? 'bg-white border-emerald-300 shadow-2xs'
                            : 'bg-white/80 border-rose-200'
                        }`}>
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                {qGrade?.verbConjugationScore === 1 ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                                )}
                                3. التصريف الصحيح للفعل
                              </span>
                              <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
                                qGrade?.verbConjugationScore === 1
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-700'
                              }`}>
                                {qGrade?.verbConjugationScore ?? 0}/1
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                              {qGrade?.verbConjugationFeedbackAr}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* General explanation if any */}
                      {evalRes.explanationAr && (
                        <p className="leading-relaxed text-slate-800 mt-2 text-xs">
                          <strong>ملاحظة عامة:</strong> {evalRes.explanationAr}
                        </p>
                      )}

                      {evalRes.spontaneousFormatting?.hasCasualSpelling && (
                        <div className="mt-2 text-xs text-sky-900 bg-sky-50 border border-sky-200 p-2.5 rounded-lg flex items-start gap-2">
                          <span className="font-bold text-sky-700 shrink-0">💡 أسلوب كتابتك:</span>
                          <span className="text-sky-800 leading-relaxed">{evalRes.spontaneousFormatting.politeTipAr}</span>
                        </div>
                      )}

                      {evalRes.corrections && evalRes.corrections.length > 0 && (
                        <div className="mt-2.5 p-2 rounded-lg bg-white/90 border border-slate-200 text-rose-700 font-semibold space-y-1">
                          {evalRes.corrections.map((c, cIdx) => (
                            <div key={cIdx} className="flex items-start gap-1.5">
                              <span className="text-rose-500 mt-0.5">•</span>
                              <span>{c}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-2.5 pt-2 border-t border-slate-200 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <strong>المثال المعياري الصحيح:</strong>{' '}
                          <span className="font-mono text-emerald-700 font-bold" dir="ltr">{fw.exampleTargetEn}</span>{' '}
                          <span className="text-slate-500">({fw.exampleTargetAr})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => playEnglishAudio(fw.exampleTargetEn)}
                          className="p-1 px-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs flex items-center gap-1 cursor-pointer transition"
                          title="استمع للمثال المعياري"
                        >
                          <span>🔊</span>
                          <span>استمع</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Explanation after final submission if empty or not evaluated */}
                  {isSubmitted && !evalRes && (
                    <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs font-arabic text-slate-700">
                      <strong>المثال المعياري الصحيح:</strong> <span className="font-mono text-emerald-700" dir="ltr">{fw.exampleTargetEn}</span> ({fw.exampleTargetAr})
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Submit Button Bar */}
      {!isSubmitted && (
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border shadow-xs">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-arabic">
            <div>
              <span>تم إنجاز </span>
              <strong className="text-blue-700 font-bold">{totalCompleted}</strong>
              <span> من أصل </span>
              <strong className="text-slate-900 font-bold">{totalQuestions}</strong>
              <span> مهمة.</span>
            </div>

            <div className={`flex items-center gap-1.5 font-mono text-xs font-bold px-2.5 py-1 rounded-md border ${
              isTimeDanger 
                ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                : isTimeCritical
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>الوقت المتبقي: {formatTimer(timeLeft)}</span>
            </div>
          </div>

          <button
            disabled={isGrading}
            onClick={handleSubmitExam}
            className="w-full sm:w-auto px-8 py-3 rounded-lg font-bold text-sm shadow-md transition active:scale-95 bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isGrading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>جاري تصحيح الاختبار واعتماد النتيجة...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>تسليم الاختبار النهائي كلياً وعرض النتيجة</span>
              </>
            )}
          </button>
        </div>
      )}

    </div>
  );
};
