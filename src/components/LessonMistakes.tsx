import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, Lightbulb, ArrowRight, Volume2, ShieldAlert, BookOpen } from 'lucide-react';
import { TenseData } from '../types';
import { playEnglishAudio } from '../utils/audio';

interface LessonMistakesProps {
  tense: TenseData;
  onCompleteLesson: () => void;
  onNextLesson: () => void;
}

export const LessonMistakes: React.FC<LessonMistakesProps> = ({
  tense,
  onCompleteLesson,
  onNextLesson,
}) => {
  const mistakesData = tense.mistakesLesson;

  return (
    <div className="space-y-6 animate-fadeIn" dir="rtl">
      
      {/* Header Banner */}
      <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1.5 h-full bg-rose-500"></div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-400/30 mb-3">
          <ShieldAlert className="w-3.5 h-3.5" />
          الدرس 3: أبرز وأهم الأخطاء الشائعة وطرق تجنبها
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white">
          تجنب أخطاء الطلاب المتكررة في زمن ({tense.nameAr})
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl">
          {mistakesData.introAr}
        </p>
      </div>

      {/* Comprehensive Verb Conjugation & Spelling Rules Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>جدول تصاريف الأفعال وقواعد الإملاء (Spelling &amp; Verb Forms)</span>
            </h3>
            <p className="text-xs text-slate-500 font-bold mt-1">
              جدول توضيحي شامل لقواعد إضافات وتصاريف الأفعال عند اقترانها مع الضمائر المختلفة.
            </p>
          </div>
          <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
            الوحدة: {tense.nameAr}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-emerald-50 border-2 border-emerald-200 p-4.5 rounded-2xl space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xl font-black text-emerald-700 bg-emerald-200 px-3 py-1 rounded-xl" dir="ltr">+ s</span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">القاعدة العامة</span>
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm">مع معظم الأفعال العادية</h4>
            <p className="text-xs text-slate-600 leading-relaxed">تضاف حرف الـ s فقط بآخر معظم الأفعال الشائعة.</p>
            <div className="text-xs font-mono text-slate-800 pt-1 border-t border-emerald-200" dir="ltr">
              work ➔ <strong className="text-emerald-700">works</strong> | play ➔ <strong className="text-emerald-700">plays</strong>
            </div>
          </div>

          <div className="bg-rose-50 border-2 border-rose-200 p-4.5 rounded-2xl space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xl font-black text-rose-700 bg-rose-200 px-3 py-1 rounded-xl" dir="ltr">+ es</span>
              <span className="text-xs font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full">نهايات محددة</span>
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm" dir="ltr">ch, sh, ss, x, z, o</h4>
            <p className="text-xs text-slate-600 leading-relaxed">تضاف es لمنع صعوبة التقاء الحروف الساكنة الصوتية.</p>
            <div className="text-xs font-mono text-slate-800 pt-1 border-t border-rose-200" dir="ltr">
              watch ➔ <strong className="text-rose-700">watches</strong> | go ➔ <strong className="text-rose-700">goes</strong>
            </div>
          </div>

          <div className="bg-indigo-50 border-2 border-indigo-200 p-4.5 rounded-2xl space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xl font-black text-indigo-700 bg-indigo-200 px-3 py-1 rounded-xl" dir="ltr">+ ies</span>
              <span className="text-xs font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-full">حذف الـ Y</span>
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm">حرف ساكن + Y</h4>
            <p className="text-xs text-slate-600 leading-relaxed">نحذف حرف الـ y تماماً ونضع مكانه ies.</p>
            <div className="text-xs font-mono text-slate-800 pt-1 border-t border-indigo-200" dir="ltr">
              study ➔ <strong className="text-indigo-700">studies</strong> | fly ➔ <strong className="text-indigo-700">flies</strong>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
          <table className="w-full text-right text-xs sm:text-sm">
            <thead className="bg-slate-900 text-white font-bold">
              <tr>
                <th className="p-3.5 text-center w-28">الإضافة</th>
                <th className="p-3.5 text-right">الشرط والقاعدة (Rule)</th>
                <th className="p-3.5 text-left" dir="ltr">تحول الفعل + النطق الصوت</th>
                <th className="p-3.5 text-right">جمل وملاحظات تذكيرية</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4 text-center align-top">
                  <span className="font-mono font-black text-base text-emerald-700 bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-xl inline-block" dir="ltr">
                    + s
                  </span>
                </td>
                <td className="p-4 align-top">
                  <span className="font-bold text-slate-900 block">١) القاعدة العامة (معظم الأفعال):</span>
                  <span className="text-xs text-emerald-800 font-bold block mt-1">تضاف حرف الـ s فقط لآخر معظم الأفعال الشائعة</span>
                </td>
                <td className="p-4 align-top text-left space-y-2 font-mono" dir="ltr">
                  <div className="flex items-center justify-between gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-900">work ➔ <strong className="text-emerald-600">works</strong></span>
                    <button onClick={() => playEnglishAudio('work. works.')} className="p-1 text-slate-500 hover:text-indigo-600 cursor-pointer" title="استمع">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-900">eat ➔ <strong className="text-emerald-600">eats</strong></span>
                    <button onClick={() => playEnglishAudio('eat. eats.')} className="p-1 text-slate-500 hover:text-indigo-600 cursor-pointer" title="استمع">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-900">speak ➔ <strong className="text-emerald-600">speaks</strong></span>
                    <button onClick={() => playEnglishAudio('speak. speaks.')} className="p-1 text-slate-500 hover:text-indigo-600 cursor-pointer" title="استمع">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="p-4 align-top text-xs leading-relaxed text-slate-700">
                  القاعدة العادية الافتراضية الأكثر شيوعاً بنسبة 85% من أفعال اللغة الإنجليزية.
                </td>
              </tr>

              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4 text-center align-top">
                  <span className="font-mono font-black text-base text-rose-700 bg-rose-100 border border-rose-300 px-3 py-1.5 rounded-xl inline-block" dir="ltr">
                    + es
                  </span>
                </td>
                <td className="p-4 align-top">
                  <span className="font-bold text-slate-900 block">٢) إذا انتهى الفعل بـ:</span>
                  <span className="font-mono font-black text-rose-700 text-sm bg-rose-50 px-2 py-0.5 rounded border border-rose-200 inline-block mt-1" dir="ltr">
                    ch, sh, ss, x, z, o
                  </span>
                </td>
                <td className="p-4 align-top text-left space-y-2 font-mono" dir="ltr">
                  <div className="flex items-center justify-between gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-900">watch ➔ <strong className="text-rose-600">watches</strong></span>
                    <button onClick={() => playEnglishAudio('watch. watches.')} className="p-1 text-slate-500 hover:text-indigo-600 cursor-pointer" title="استمع">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-900">wash ➔ <strong className="text-rose-600">washes</strong></span>
                    <button onClick={() => playEnglishAudio('wash. washes.')} className="p-1 text-slate-500 hover:text-indigo-600 cursor-pointer" title="استمع">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-900">fix ➔ <strong className="text-rose-600">fixes</strong></span>
                    <button onClick={() => playEnglishAudio('fix. fixes.')} className="p-1 text-slate-500 hover:text-indigo-600 cursor-pointer" title="استمع">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-900">go / do ➔ <strong className="text-rose-600">goes / does</strong></span>
                    <button onClick={() => playEnglishAudio('go. goes. do. does.')} className="p-1 text-slate-500 hover:text-indigo-600 cursor-pointer" title="استمع">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="p-4 align-top text-xs leading-relaxed text-slate-700">
                  نضيف <code className="font-bold text-rose-700 bg-rose-50 px-1 rounded">es</code> حتى يسهل نطق الكلمة بدلاً من التقاء أصوات صفيرية متتالية.
                </td>
              </tr>

              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4 text-center align-top">
                  <span className="font-mono font-black text-base text-indigo-700 bg-indigo-100 border border-indigo-300 px-3 py-1.5 rounded-xl inline-block" dir="ltr">
                    + ies
                  </span>
                </td>
                <td className="p-4 align-top">
                  <span className="font-bold text-slate-900 block">٣) إذا انتهى بـ Y وقبله حرف ساكن:</span>
                  <span className="text-xs text-indigo-800 font-bold block mt-1">Consonant + Y ➔ نحذف Y ونضيف IES</span>
                </td>
                <td className="p-4 align-top text-left space-y-2 font-mono" dir="ltr">
                  <div className="flex items-center justify-between gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-900">stud<span className="text-rose-500 line-through">y</span> ➔ <strong className="text-indigo-600">studies</strong></span>
                    <button onClick={() => playEnglishAudio('study. studies.')} className="p-1 text-slate-500 hover:text-indigo-600 cursor-pointer" title="استمع">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-900">fl<span className="text-rose-500 line-through">y</span> ➔ <strong className="text-indigo-600">flies</strong></span>
                    <button onClick={() => playEnglishAudio('fly. flies.')} className="p-1 text-slate-500 hover:text-indigo-600 cursor-pointer" title="استمع">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-900">carr<span className="text-rose-500 line-through">y</span> ➔ <strong className="text-indigo-600">carries</strong></span>
                    <button onClick={() => playEnglishAudio('carry. carries.')} className="p-1 text-slate-500 hover:text-indigo-600 cursor-pointer" title="استمع">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="p-3 align-top">
                  <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-3.5 space-y-1.5 font-arabic">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs">
                      <span className="text-amber-600">✦</span>
                      <span>ملاحظة هامة:</span>
                    </div>
                    <p className="text-xs text-amber-950 leading-relaxed">
                      إذا سبق حرف الـ Y حرف متحرك (a, e, i, o, u) <strong>لا نحذف الـ Y</strong> بل نطبق قاعدة الـ <code className="font-bold text-emerald-800">s</code> فقط!
                    </p>
                    <span className="font-mono font-bold text-amber-900 text-xs inline-block mt-0.5" dir="ltr">play ➔ plays | buy ➔ buys</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Side-by-Side Mistakes Cards */}
      <div className="space-y-4">
        {mistakesData.mistakes.map((m, idx) => (
          <div 
            key={m.id || idx}
            className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm hover:border-blue-300 transition overflow-hidden"
          >
            {/* Category Tag */}
            <div className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-bold font-arabic mb-3">
              📌 {m.categoryAr}
            </div>

            {/* Comparison Box: Incorrect vs Correct */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              
              {/* ❌ The Mistake */}
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-3.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 mb-1.5">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>الخطأ الشائع (Don't say):</span>
                  </div>
                  <p className="text-base font-bold text-rose-950 font-sans tracking-wide text-left line-through opacity-80" dir="ltr">
                    "{m.incorrect}"
                  </p>
                </div>
                <div className="mt-2 text-xs text-rose-700 font-arabic">
                  ⚠️ غير صحيح نحوياً
                </div>
              </div>

              {/* ✅ The Correction */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>الصواب (Say this):</span>
                    </div>
                    <button
                      onClick={() => playEnglishAudio(m.correct)}
                      className="p-1 px-2 rounded-md bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-semibold inline-flex items-center gap-1 transition"
                      title="استمع للنطق الصحيح"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>نطق</span>
                    </button>
                  </div>
                  <p className="text-base font-bold text-emerald-950 font-sans tracking-wide text-left" dir="ltr">
                    "{m.correct}"
                  </p>
                </div>
                <div className="mt-2 text-xs text-emerald-700 font-arabic font-medium">
                  ✨ الصياغة النموذجية السليمة
                </div>
              </div>

            </div>

            {/* Explanation & Reason */}
            <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs sm:text-sm">
              <div className="text-slate-700 leading-relaxed">
                <strong>لماذا هذا خطأ؟</strong> {m.reasonAr}
              </div>

              {/* Golden Rule Callout */}
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

      {/* Pro Tips Box */}
      {mistakesData.proTipsAr && mistakesData.proTipsAr.length > 0 && (
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
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
        <button
          onClick={() => {
            onCompleteLesson();
            onNextLesson();
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-sm transition active:scale-95 mr-auto"
        >
          <span>إتمام الدرس والانتقال إلى التمارين التفاعلية</span>
          <ArrowRight className="w-4 h-4 rotate-180" />
        </button>
      </div>

    </div>
  );
};
