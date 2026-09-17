import React, { useState, useEffect, useMemo } from 'react';
import { Volume2, Sparkles, CheckCircle2, XCircle, HelpCircle, ArrowLeft, ArrowRight, Lightbulb, RefreshCw } from 'lucide-react';
import { TenseData, TenseExample } from '../../types';
import { playEnglishAudio } from '../../utils/audio';
import { shuffleArray } from '../../utils/quizUtils';

interface StepUsageSingleProps {
  tense: TenseData;
  useCaseIndex: number;
  totalUseCases: number;
  onNext: () => void;
  onPrev: () => void;
}

export const StepUsageSingle: React.FC<StepUsageSingleProps> = ({
  tense,
  useCaseIndex,
  totalUseCases,
  onNext,
  onPrev,
}) => {
  const useCases = tense?.usageLesson?.useCases || [];
  const safeIndex = (typeof useCaseIndex === 'number' && useCaseIndex >= 0 && useCaseIndex < useCases.length) ? useCaseIndex : 0;
  const useCase = useCases[safeIndex] || {
    titleAr: 'الاستخدام الأساسي',
    descriptionAr: tense?.summaryAr || '',
    examples: [],
  };

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [quizResetKey, setQuizResetKey] = useState<number>(0);

  // Explicitly reset quiz when use case or tense changes
  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
  }, [safeIndex, tense?.id]);

  // Generate an intelligent interactive mini-quiz specifically tailored to this use case
  // The first example of the current useCase is the correct answer
  // We grab distractor examples from other use cases or tenses
  const currentExample = useCase.examples?.[0] || {
    id: 'default-ex',
    sentence: 'I study English every day.',
    translationAr: 'أنا أدرس الإنجليزية كل يوم.',
    contextAr: 'تطبيق مباشر على هذه الحالة',
    subject: 'I',
    verb: 'study',
    complement: 'English every day',
  };

  // Combine options (correct + distractors)
  const quizOptions = useMemo(() => {
    const caseTitle = useCase?.titleAr || 'هذه الحالة';
    const opts = [
      { 
        text: currentExample.sentence, 
        isCorrect: true, 
        explanation: `صحيح! هذه الجملة تعبر تماماً عن (${caseTitle}) لأنها توضح ${currentExample.contextAr || 'هذا الاستخدام بدقة'}.` 
      },
    ];

    const distractors: string[] = [];
    useCases.forEach((uc, idx) => {
      if (idx !== safeIndex && uc.examples && uc.examples.length > 0) {
        distractors.push(uc.examples[0].sentence);
      }
    });

    // Fallback generic distractors if needed
    if (distractors.length < 2) {
      const fallbackList = [
        'I am studying English right now.',
        'I was studying English yesterday afternoon.',
        'I have already studied this unit.',
        'I will have studied English by next week.',
      ];
      for (const item of fallbackList) {
        if (!distractors.includes(item) && item !== currentExample.sentence) {
          distractors.push(item);
        }
        if (distractors.length >= 2) break;
      }
    }

    distractors.slice(0, 2).forEach((otherText) => {
      opts.push({
        text: otherText,
        isCorrect: false,
        explanation: `غير دقيق لهذه الحالة تحديداً؛ هذه الجملة ترتبط بسياق زمني مختلف عن (${caseTitle}).`,
      });
    });

    // Randomize options dynamically so the correct answer is never predictable
    return shuffleArray(opts);
  }, [safeIndex, currentExample, useCases, useCase?.titleAr, quizResetKey]);

  const handleSelect = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(idx);
    setIsAnswerSubmitted(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setQuizResetKey((prev) => prev + 1);
  };

  if (!useCase) {
    return <div className="p-4 text-center text-slate-500 font-arabic">لا يوجد محتوى لهذا الاستخدام.</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn" dir="rtl">
      {/* Usage Header Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>الاستخدام {useCaseIndex + 1} من {totalUseCases}</span>
          </div>

          <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            {tense.nameEn}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 font-arabic">
          {useCase.titleAr}
        </h2>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-arabic bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          {useCase.descriptionAr}
        </p>
      </div>

      {/* Direct Application Examples */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 font-arabic flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>أمثلة تطبيقية مباشرة على هذا الاستخدام:</span>
          </h3>
          <span className="text-xs text-slate-500 font-arabic">({useCase.examples.length} أمثلة نموذجية)</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {useCase.examples.map((ex: TenseExample, idx: number) => (
            <div
              key={ex.id || idx}
              className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-5 shadow-xs hover:border-blue-300 transition group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  {/* Context Note */}
                  {ex.contextAr && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50/80 border border-amber-200/90 text-amber-900 text-xs font-bold font-arabic">
                      <span className="text-amber-600">✦</span>
                      <span>سياق الاستخدام: {ex.contextAr}</span>
                    </div>
                  )}

                  {/* English Sentence */}
                  <div className="text-base sm:text-lg font-bold text-slate-900 tracking-wide font-sans text-left" dir="ltr">
                    {ex.sentence}
                  </div>

                  {/* Arabic Translation */}
                  <div className="text-xs sm:text-sm text-slate-600 font-arabic">
                    {ex.translationAr}
                  </div>

                  {/* Sentence Elements Breakdown Chips if available */}
                  {(ex.subject || ex.verb || ex.complement) && (
                    <div className="flex flex-wrap gap-1.5 pt-2 text-[11px]" dir="ltr">
                      {ex.subject && (
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-100 font-sans">
                          Subj: <strong className="font-mono">{ex.subject}</strong>
                        </span>
                      )}
                      {ex.auxiliary && (
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-100 font-sans">
                          Aux: <strong className="font-mono">{ex.auxiliary}</strong>
                        </span>
                      )}
                      {ex.verb && (
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-100 font-sans">
                          Verb: <strong className="font-mono">{ex.verb}</strong>
                        </span>
                      )}
                      {ex.complement && (
                        <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-900 border border-purple-100 font-sans">
                          Obj: <strong className="font-mono">{ex.complement}</strong>
                        </span>
                      )}
                      {ex.timeMarker && (
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-sans">
                          Time: <strong className="font-mono">{ex.timeMarker}</strong>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Pronunciation Button */}
                <button
                  onClick={() => playEnglishAudio(ex.sentence)}
                  className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition active:scale-95 shadow-2xs font-arabic"
                  title="استمع للنطق الإنجليزي الصحيح"
                >
                  <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>استمع</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Micro-Quiz for this Specific Usage */}
      <div className="bg-[#fcded6] text-slate-900 rounded-2xl p-5 sm:p-6 border border-[#f5c2b5] shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-700" />
            <h4 className="text-sm font-bold text-slate-900 font-arabic">
              تدريب فوري: اختبر تمييزك لهذا الاستخدام ({useCase.titleAr})
            </h4>
          </div>

          {isAnswerSubmitted && (
            <button
              onClick={handleResetQuiz}
              className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-arabic transition"
            >
              <RefreshCw className="w-3 h-3" />
              <span>إعادة</span>
            </button>
          )}
        </div>

        <p className="text-xs text-slate-700 font-arabic">
          اختر الجملة التي تمثل استخدام <strong>"{useCase.titleAr}"</strong> بشكل صحيح:
        </p>

        {/* Options List */}
        <div className="space-y-2" dir="ltr">
          {quizOptions.map((opt, idx) => {
            const isSelected = selectedAnswer === idx;
            let btnClasses = 'bg-white/85 border-[#f0b5a6] text-slate-800 hover:bg-white hover:border-[#e39c8a] hover:shadow-2xs';

            if (isAnswerSubmitted) {
              if (opt.isCorrect) {
                btnClasses = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-xs';
              } else if (isSelected && !opt.isCorrect) {
                btnClasses = 'bg-rose-50 border-rose-500 text-rose-900 font-bold shadow-xs';
              } else {
                btnClasses = 'bg-white/40 border-rose-200/40 text-slate-400 opacity-50';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswerSubmitted}
                onClick={() => handleSelect(idx)}
                className={`w-full p-3 rounded-xl border text-xs sm:text-sm font-medium transition text-left flex items-center justify-between ${btnClasses}`}
              >
                <span>{opt.text}</span>
                {isAnswerSubmitted && opt.isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                {isAnswerSubmitted && isSelected && !opt.isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Feedback explanation box */}
        {isAnswerSubmitted && selectedAnswer !== null && (
          <div
            className={`p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed border animate-fadeIn font-arabic ${
              quizOptions[selectedAnswer]?.isCorrect
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                : 'bg-rose-50 text-rose-900 border-rose-300'
            }`}
            dir="rtl"
          >
            <div className="font-bold mb-1 flex items-center gap-1.5">
              {quizOptions[selectedAnswer]?.isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>أحسنت! إجابة صحيحة ومتقنة.</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>إجابة غير دقيقة.</span>
                </>
              )}
            </div>
            <p className="text-xs text-slate-700">
              {quizOptions[selectedAnswer]?.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="pt-2 flex items-center justify-between">
        <button
          onClick={onPrev}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition font-arabic"
        >
          <ArrowRight className="w-4 h-4" />
          <span>السابق</span>
        </button>

        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#214ecf] hover:bg-[#1a3eb0] text-white text-xs sm:text-sm font-bold shadow-sm transition active:scale-98 font-arabic"
        >
          <span>
            {useCaseIndex + 1 < totalUseCases
              ? `الانتقال للاستخدام التالي (${useCaseIndex + 2} من ${totalUseCases})`
              : 'الانتقال إلى الكلمات الدالة'}
          </span>
          <ArrowLeft className="w-4 h-4 rotate-180" />
        </button>
      </div>
    </div>
  );
};
