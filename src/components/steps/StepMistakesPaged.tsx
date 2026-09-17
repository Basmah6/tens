import React, { useState } from 'react';
import { ShieldAlert, XCircle, CheckCircle, Volume2, Lightbulb, ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { TenseData, CommonMistake } from '../../types';
import { playEnglishAudio } from '../../utils/audio';
import { shuffleArray } from '../../utils/quizUtils';

interface StepMistakesPagedProps {
  tense: TenseData;
  pageIndex: number;
  totalMistakePages: number;
  mistakes: CommonMistake[];
  onNext: () => void;
  onPrev: () => void;
}

export const StepMistakesPaged: React.FC<StepMistakesPagedProps> = ({
  tense,
  pageIndex,
  totalMistakePages,
  mistakes,
  onNext,
  onPrev,
}) => {
  const mistakesData = tense.mistakesLesson;
  const isLastMistakesPage = pageIndex === totalMistakePages - 1;

  // Interactive Spot-The-Error practice state
  const [selectedCorrection, setSelectedCorrection] = useState<string | null>(null);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  const currentPrimaryMistake = mistakes[0];
  const testOptions = React.useMemo(() => {
    if (!currentPrimaryMistake) return [];
    return shuffleArray([currentPrimaryMistake.correct, currentPrimaryMistake.incorrect]);
  }, [currentPrimaryMistake?.id, currentPrimaryMistake?.correct, currentPrimaryMistake?.incorrect, pageIndex, shuffleSeed]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn" dir="rtl">
      {/* Header Banner - Focused Common Mistakes & Pitfalls */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>الوحدة 4: الأخطاء الشائعة (صفحة {pageIndex + 1} من {totalMistakePages})</span>
          </div>

          <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            Common Pitfalls
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 font-arabic">
          تجنب أخطاء الطلاب المتكررة في زمن ({tense.nameAr})
        </h2>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-arabic">
          {pageIndex === 0
            ? mistakesData.introAr
            : 'استمر في مراجعة الأخطاء الشائعة لتفاديها تماماً عند التحدث والكتابة.'}
        </p>
      </div>

      {/* Spot the Error Interactive Quick Check */}
      {currentPrimaryMistake && (
        <div className="bg-[#fcded6] text-slate-900 rounded-2xl p-5 sm:p-6 border border-[#f5c2b5] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 font-arabic flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-800" />
              <span>تدريب فوري: أي العبارتين صحيحة وسليمة نحوياً؟</span>
            </h4>
            {selectedCorrection && (
              <button
                onClick={() => {
                  setSelectedCorrection(null);
                  setShuffleSeed((prev) => prev + 1);
                }}
                className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-arabic transition cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>إعادة</span>
              </button>
            )}
          </div>

          <p className="text-xs text-slate-700 font-arabic">
            اختر الجملة التي تتفادى الخطأ الشائع وتطبق القاعدة بشكل سليم:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1" dir="ltr">
            {testOptions.map((opt, idx) => {
              const isSelected = selectedCorrection === opt;
              let cls = 'bg-white hover:bg-white/85 border-[#f0b5a6] hover:border-[#e39c8a] text-slate-800 shadow-2xs';

              if (selectedCorrection !== null) {
                if (opt === currentPrimaryMistake.correct) {
                  cls = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-xs';
                } else if (isSelected) {
                  cls = 'bg-rose-50 border-rose-500 text-rose-900 line-through font-medium shadow-xs';
                } else {
                  cls = 'bg-white/40 border-rose-200/40 text-slate-400 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={selectedCorrection !== null}
                  onClick={() => setSelectedCorrection(opt)}
                  className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition text-left flex items-center justify-between cursor-pointer ${cls}`}
                >
                  <span>{opt}</span>
                  {selectedCorrection !== null && opt === currentPrimaryMistake.correct && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {selectedCorrection !== null && isSelected && opt !== currentPrimaryMistake.correct && (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedCorrection !== null && (
            <div
              className={`p-3.5 rounded-xl text-xs sm:text-sm font-arabic animate-fadeIn border leading-relaxed ${
                selectedCorrection === currentPrimaryMistake.correct
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  : 'bg-rose-50 text-rose-900 border-rose-300'
              }`}
            >
              {selectedCorrection === currentPrimaryMistake.correct ? (
                <span className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ممتاز! لقد تفاديت الخطأ الشائع بنجاح واكتشفت الصياغة السليمة.
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <span className="font-bold text-rose-700">غير صحيح:</span>
                  <span>العبارة السليمة هي: "{currentPrimaryMistake.correct}"</span>
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mistakes Focused Cards */}
      <div className="space-y-4">
        {mistakes.map((m, idx) => (
          <div
            key={m.id || idx}
            className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 hover:border-blue-300 transition"
          >
            {/* Category Tag */}
            <div className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold font-arabic">
              📌 {m.categoryAr}
            </div>

            {/* Side-by-Side Incorrect vs Correct */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* ❌ The Mistake */}
              <div className="bg-rose-50 border border-rose-200/80 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 mb-2">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>الخطأ الشائع (Don't say):</span>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-rose-950 font-sans tracking-wide text-left line-through opacity-85" dir="ltr">
                    "{m.incorrect}"
                  </div>
                </div>
                <div className="mt-2 text-xs text-rose-700 font-arabic font-medium">
                  ⚠️ غير صحيح نحوياً
                </div>
              </div>

              {/* ✅ The Correction */}
              <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>الصواب (Say this):</span>
                    </div>
                    <button
                      onClick={() => playEnglishAudio(m.correct)}
                      className="px-2.5 py-1 rounded-md bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold inline-flex items-center gap-1 transition cursor-pointer"
                      title="استمع للنطق الصحيح"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>نطق</span>
                    </button>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-emerald-950 font-sans tracking-wide text-left" dir="ltr">
                    "{m.correct}"
                  </div>
                </div>
                <div className="mt-2 text-xs text-emerald-800 font-arabic font-medium">
                  ✨ الصياغة النموذجية السليمة
                </div>
              </div>
            </div>

            {/* Why It's Wrong & Golden Rule */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs sm:text-sm">
              <div className="text-slate-700 leading-relaxed font-arabic">
                <strong>لماذا هذا خطأ؟</strong> {m.reasonAr}
              </div>

              <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 sm:p-4.5 space-y-1.5 font-arabic">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>نصيحة وقاعدة ذهبية:</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                  {m.goldenRuleAr}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pro Tips Box (shown on last page) */}
      {isLastMistakesPage && mistakesData.proTipsAr && mistakesData.proTipsAr.length > 0 && (
        <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-5 sm:p-6 space-y-2.5">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm sm:text-base font-arabic">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" />
            <span>نصائح ذهبية لضمان الدقة وتفادي الأخطاء:</span>
          </div>
          <div className="pt-2 border-t border-amber-200/60 space-y-1.5">
            {mistakesData.proTipsAr.map((tip, tIdx) => (
              <div key={tIdx} className="text-xs sm:text-sm text-amber-950 font-arabic flex items-start gap-2">
                <span className="text-amber-600">✦</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="pt-2 flex items-center justify-between">
        <button
          onClick={onPrev}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition font-arabic cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>السابق</span>
        </button>

        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#214ecf] hover:bg-[#1a3eb0] text-white text-xs sm:text-sm font-bold shadow-sm transition active:scale-98 font-arabic cursor-pointer"
        >
          <span>
            {pageIndex + 1 < totalMistakePages
              ? `الانتقال للأخطاء التالية (${pageIndex + 2} من ${totalMistakePages})`
              : 'الانتقال إلى الوحدة 5: التمارين التفاعلية'}
          </span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
