import React, { useState } from 'react';
import { Key, Volume2, ArrowLeft, ArrowRight, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { TenseData } from '../../types';
import { playEnglishAudio } from '../../utils/audio';
import { shuffleArray } from '../../utils/quizUtils';

interface StepKeywordsProps {
  tense: TenseData;
  onNext: () => void;
  onPrev: () => void;
}

export const StepKeywords: React.FC<StepKeywordsProps> = ({ tense, onNext, onPrev }) => {
  const keywords = tense.usageLesson.keywords || [];
  const [selectedWordTest, setSelectedWordTest] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<boolean | null>(null);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  // Quick challenge: Which of these words is a key marker for this tense?
  const testWord = keywords[0]?.word || 'always';
  const distractors = ['yesterday evening', 'two years ago', 'next century'].filter(
    (d) => !keywords.some((k) => k.word.toLowerCase() === d.toLowerCase())
  );

  const testOptions = React.useMemo(() => {
    return shuffleArray([testWord, ...distractors.slice(0, 2)]);
  }, [testWord, distractors, tense.id, shuffleSeed]);

  const handleTestOption = (word: string) => {
    setSelectedWordTest(word);
    setTestResult(word === testWord);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn" dir="rtl">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 mb-3">
          <Key className="w-3.5 h-3.5" />
          <span>المؤشرات والكلمات الدالة (Key Signal Words)</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 font-arabic">
          المفاتيح الزمنية لزمن ({tense.nameAr})
        </h2>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-arabic">
          هذه الكلمات والعبارات الزمنية تدلك فوراً على اختيار زمن ({tense.nameAr}) سواء في اختبارات القواعد أو المحادثات اليومية.
        </p>
      </div>

      {/* Keywords Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {keywords.map((kw, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs hover:border-blue-300 transition flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-base font-bold text-blue-700 font-mono" dir="ltr">
                  {kw.word}
                </span>
                <span className="text-xs text-slate-500 font-arabic font-medium">
                  {kw.meaningAr}
                </span>
              </div>

              <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-lg border border-slate-200/70 text-left mt-2 font-sans" dir="ltr">
                "{kw.example}"
              </p>
            </div>

            <button
              onClick={() => playEnglishAudio(kw.example)}
              className="mt-3 text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 self-end font-bold font-arabic transition"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>استمع للمثال</span>
            </button>
          </div>
        ))}
      </div>

      {/* Interactive Keyword Recognition Challenge */}
      <div className="bg-[#fcded6] text-slate-900 rounded-2xl p-5 sm:p-6 border border-[#f5c2b5] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900 font-arabic flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-800" />
            <span>تدريب فوري: تحدي التعرف السريع على المفتاح الزمني</span>
          </h4>
          {selectedWordTest && (
            <button
              onClick={() => {
                setSelectedWordTest(null);
                setTestResult(null);
                setShuffleSeed((prev) => prev + 1);
              }}
              className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-arabic transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>إعادة</span>
            </button>
          )}
        </div>

        <p className="text-xs text-slate-700 font-arabic">
          أي من الكلمات التالية تعتبر من أهم الكلمات الدالة على زمن <strong className="text-slate-900">({tense.nameAr})</strong>؟
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1" dir="ltr">
          {testOptions.map((opt, idx) => {
            const isChosen = selectedWordTest === opt;
            let cls = 'bg-white hover:bg-white/85 border-[#f0b5a6] hover:border-[#e39c8a] text-slate-800 shadow-2xs';

            if (selectedWordTest !== null) {
              if (opt === testWord) {
                cls = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-xs';
              } else if (isChosen) {
                cls = 'bg-rose-50 border-rose-500 text-rose-900 shadow-xs';
              } else {
                cls = 'bg-white/40 border-rose-200/40 text-slate-400 opacity-50';
              }
            }

            return (
              <button
                key={idx}
                disabled={selectedWordTest !== null}
                onClick={() => handleTestOption(opt)}
                className={`p-3 rounded-xl border text-xs sm:text-sm font-mono font-bold transition text-center ${cls}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {selectedWordTest !== null && (
          <div
            className={`p-3.5 rounded-xl text-xs sm:text-sm font-arabic animate-fadeIn border leading-relaxed ${
              testResult
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                : 'bg-rose-50 text-rose-900 border-rose-300'
            }`}
          >
            {testResult ? (
              <span className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                رائع! كلمة ({testWord}) من الكلمات المحورية في هذا الزمن.
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <span className="font-bold text-rose-700">غير صحيح:</span>
                <span>الكلمة الدالة الصحيحة لهذا الزمن هي ({testWord}).</span>
              </span>
            )}
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
          <span>الانتقال إلى قواعد تركيب الجمل (SVO)</span>
          <ArrowLeft className="w-4 h-4 rotate-180" />
        </button>
      </div>
    </div>
  );
};
