import React from 'react';
import { Volume2, Sparkles, Key, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { TenseData } from '../types';
import { playEnglishAudio } from '../utils/audio';

interface LessonUsageProps {
  tense: TenseData;
  onCompleteLesson: () => void;
  onNextLesson: () => void;
}

export const LessonUsage: React.FC<LessonUsageProps> = ({
  tense,
  onCompleteLesson,
  onNextLesson,
}) => {
  const usage = tense.usageLesson;

  return (
    <div className="space-y-6 animate-fadeIn" dir="rtl">
      
      {/* Header & Overview Card */}
      <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1.5 h-full bg-green-500"></div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-semibold border border-green-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            الدرس 1: الاستخدام والتفصيل والأمثلة الحية
          </div>
          <div className="text-xs font-mono px-2.5 py-1 bg-slate-800/90 rounded-md text-emerald-400 border border-slate-700">
            {tense.shortFormula}
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white">
          {usage.titleAr}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl">
          {usage.overviewAr}
        </p>

        {/* Timeline Visual Context */}
        <div className="mt-4 pt-4 border-t border-slate-700 flex items-center gap-3 text-xs sm:text-sm text-slate-300">
          <Clock className="w-4 h-4 text-blue-400 shrink-0" />
          <span><strong>المفهوم الزمني:</strong> {usage.timeConceptAr}</span>
        </div>
      </div>

      {/* Detailed Use Cases with Rich Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span className="w-2 h-5 bg-green-500 rounded-full inline-block"></span>
          حالات الاستخدام الرئيسية بالتفصيل
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {usage.useCases.map((useCase, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-blue-300 transition">
              <div className="mb-3">
                <h4 className="text-base font-bold text-slate-800 mb-1">{useCase.titleAr}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{useCase.descriptionAr}</p>
              </div>

              {/* Examples Grid */}
              <div className="space-y-3 mt-3">
                {useCase.examples.map((ex) => (
                  <div 
                    key={ex.id} 
                    className="bg-slate-50 border border-slate-200/80 rounded-lg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-blue-50/40 hover:border-blue-200 transition"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 font-arabic">
                        <span>💡 {ex.contextAr}</span>
                      </div>
                      
                      {/* English Sentence */}
                      <p className="text-base font-bold text-slate-900 tracking-wide font-sans text-left" dir="ltr">
                        {ex.sentence}
                      </p>

                      {/* Arabic Translation */}
                      <p className="text-xs sm:text-sm text-slate-600 font-arabic">
                        {ex.translationAr}
                      </p>
                    </div>

                    {/* Audio Pronunciation Button */}
                    <button
                      onClick={() => playEnglishAudio(ex.sentence)}
                      className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold transition active:scale-95 shadow-xs"
                      title="استمع للنطق الإنجليزي الصحيح"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>استمع</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Signal Words / Time Markers (الكلمات الدالة) */}
      <div className="bg-[#0F172A] text-white rounded-xl p-6 border border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Key className="w-4 h-4 text-amber-400" />
          <h3 className="text-base font-bold text-white">
            الكلمات الدالة والمؤشرات الزمنية (Key Signal Words)
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mb-4">
          هذه الكلمات تعمل بمثابة "مفاتيح سحرية" تساعدك على التعرف الفوري على زمن ({tense.nameAr}) في الاختبارات والمحادثات:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {usage.keywords.map((kw, idx) => (
            <div key={idx} className="bg-slate-800/90 border border-slate-700 rounded-lg p-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-amber-300 font-mono" dir="ltr">{kw.word}</span>
                  <span className="text-xs text-slate-300 font-arabic">{kw.meaningAr}</span>
                </div>
                <p className="text-xs text-slate-300 italic mt-2 text-left bg-slate-900/80 p-2 rounded border border-slate-700/60" dir="ltr">
                  "{kw.example}"
                </p>
              </div>
              <button 
                onClick={() => playEnglishAudio(kw.example)}
                className="mt-2.5 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 self-end font-medium"
              >
                <Volume2 className="w-3 h-3" />
                استمع للمثال
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
        <button
          onClick={() => {
            onCompleteLesson();
            onNextLesson();
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-sm transition active:scale-95 mr-auto"
        >
          <span>إتمام الدرس والانتقال إلى جدول SVO</span>
          <ArrowRight className="w-4 h-4 rotate-180" />
        </button>
      </div>

    </div>
  );
};
