import React, { useState } from 'react';
import { Layers, Users, BookOpen, Volume2, HelpCircle, ArrowLeft, ArrowRight, Lightbulb, Check } from 'lucide-react';
import { TenseData } from '../../types';
import { playEnglishAudio } from '../../utils/audio';

interface StepSVORulesProps {
  tense: TenseData;
  onNext: () => void;
  onPrev: () => void;
}

export const StepSVORules: React.FC<StepSVORulesProps> = ({ tense, onNext, onPrev }) => {
  const svoData = tense.svoLesson;
  const [verbFilter, setVerbFilter] = useState<'all' | 'regular' | 'irregular'>('all');

  const filteredVerbs = (svoData.verbTable || []).filter((v) => {
    if (verbFilter === 'regular') return !v.isIrregular;
    if (verbFilter === 'irregular') return v.isIrregular;
    return true;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn" dir="rtl">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>قواعد التركيب الأساسية والأفعال المساعدة</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 font-arabic">
          أساسيات بناء الجملة في زمن ({tense.nameAr})
        </h2>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-arabic">
          قبل التعرف على صيغ الجمل (المثبت، المنفي، والاستفهام)، تعرف على الأفعال المساعدة المناسبة وتصنيف الفاعل وتصريف الأفعال.
        </p>

        {/* Core Rules Checklist */}
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5">
          {svoData.rulesAr.map((rule, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-arabic">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold font-mono shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Auxiliary Verb Spotlight */}
      <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-5 sm:p-6 space-y-2.5">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm sm:text-base font-arabic">
          <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>دور الفعل المساعد (Auxiliary Verb):</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-arabic">
          {svoData.auxiliaryRulesAr}
        </p>
        {svoData.goldenNotesAr && svoData.goldenNotesAr.length > 0 && (
          <div className="pt-2 border-t border-amber-200/60 space-y-1.5">
            {svoData.goldenNotesAr.map((note, nIdx) => (
              <div key={nIdx} className="text-xs text-amber-950 font-arabic flex items-start gap-2">
                <span className="text-amber-600">✦</span>
                <span>{note}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subject Classification (I / Singular / Plural - Strictly Tense Specific) */}
      {svoData.subjectClassification && (() => {
        const tid = tense.id.replace(/-/g, '_');
        const isPresentSimple = tid === 'present_simple';
        const isPresentCont = tid === 'present_continuous';
        const isPresentPerf = tid === 'present_perfect';
        const isPresentPerfCont = tid === 'present_perfect_continuous';
        const isPastSimple = tid === 'past_simple';
        const isPastCont = tid === 'past_continuous';
        const isPastPerf = tid === 'past_perfect';
        const isFutureSimple = tid === 'future_simple';

        return (
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900 font-arabic">
                <Users className="w-5 h-5 text-indigo-600" />
                <span>تصنيف الفاعل الخاص بزمن ({tense.nameAr})</span>
              </div>
              <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-200 font-arabic">
                قواعد الفاعل الدقيقة لهذا الزمن
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* 1. First-Person Pronoun Box (I) */}
              <div className="bg-indigo-50/70 border-2 border-indigo-200 rounded-xl p-4 space-y-3 shadow-2xs">
                <div className="text-xs font-bold text-indigo-900 font-arabic border-b border-indigo-200/80 pb-2 flex items-center justify-between">
                  <span>١. ضمير المتكلم (I)</span>
                  <span className="font-mono text-xs bg-indigo-200 text-indigo-900 font-black px-2.5 py-0.5 rounded-lg" dir="ltr">
                    {isPresentCont ? 'I am' : isPresentPerf ? 'I have' : isPresentPerfCont ? 'I have been' : isPastCont ? 'I was' : 'I'}
                  </span>
                </div>
                <div className="text-xs text-slate-700 font-arabic space-y-2">
                  <div className="font-bold text-indigo-950">
                    <strong>الضمير:</strong> <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-indigo-200 text-indigo-700" dir="ltr">I (أنا)</span>
                  </div>
                  <div className="text-[11px] text-indigo-950 bg-white/90 p-2.5 rounded-lg border border-indigo-100 leading-relaxed font-arabic space-y-1.5">
                    {isPresentSimple && (
                      <>
                        <div>• <strong>في الإثبات:</strong> يأخذ الفعل في <strong className="text-indigo-700 font-mono font-bold">المصدر المجرد (Base V1)</strong> بدون إضافات (مثل: <span className="font-mono font-bold" dir="ltr">I work / I study</span>).</div>
                        <div>• <strong>في النفي والسؤال:</strong> يأخذ الفعل المساعد <strong className="text-emerald-700 font-mono font-bold" dir="ltr">do / don't</strong> (مثل: <span className="font-mono font-bold" dir="ltr">I don't work / Do I work?</span>).</div>
                        <div className="text-[10px] text-amber-950 bg-amber-50/90 border border-amber-200/90 rounded-md p-1.5 font-bold font-arabic flex items-center gap-1.5">
                          <span className="text-amber-600">✦</span>
                          <span>ملاحظة خاصة: مع فعل الكينونة To Be فقط يستقل بـ <span className="font-mono" dir="ltr">(am / am not)</span>.</span>
                        </div>
                      </>
                    )}
                    {isPresentCont && (
                      <>
                        <div>• <strong>في الإثبات:</strong> يأخذ الفعل المساعد <strong className="text-indigo-700 font-mono font-bold" dir="ltr">am</strong> + الفعل مع <strong className="text-indigo-700 font-mono font-bold" dir="ltr">V-ing</strong> (مثل: <span className="font-mono font-bold" dir="ltr">I am working</span>).</div>
                        <div>• <strong>في النفي والسؤال:</strong> نستخدم <strong className="text-rose-700 font-mono font-bold" dir="ltr">am not</strong> وفي السؤال <strong className="text-indigo-700 font-mono font-bold" dir="ltr">Am I...?</strong>.</div>
                      </>
                    )}
                    {isPresentPerf && (
                      <>
                        <div>• <strong>في الإثبات:</strong> يأخذ الفعل المساعد <strong className="text-indigo-700 font-mono font-bold" dir="ltr">have</strong> + التصريف الثالث <strong className="text-indigo-700 font-mono font-bold" dir="ltr">V3</strong> (مثل: <span className="font-mono font-bold" dir="ltr">I have worked</span>).</div>
                        <div>• <strong>في النفي والسؤال:</strong> نستخدم <strong className="text-rose-700 font-mono font-bold" dir="ltr">haven't</strong> وفي السؤال <strong className="text-indigo-700 font-mono font-bold" dir="ltr">Have I...?</strong>.</div>
                      </>
                    )}
                    {isPresentPerfCont && (
                      <>
                        <div>• يأخذ <strong className="text-indigo-700 font-mono font-bold" dir="ltr">have been</strong> + الفعل مع <strong className="text-indigo-700 font-mono font-bold" dir="ltr">V-ing</strong> (مثل: <span className="font-mono font-bold" dir="ltr">I have been working</span>).</div>
                      </>
                    )}
                    {isPastSimple && (
                      <>
                        <div>• <strong>في الإثبات:</strong> يأخذ التصريف الثاني <strong className="text-indigo-700 font-mono font-bold" dir="ltr">V2</strong> (مثل: <span className="font-mono font-bold" dir="ltr">I worked / I went</span>).</div>
                        <div>• <strong>في النفي والسؤال:</strong> يأخذ <strong className="text-emerald-700 font-mono font-bold" dir="ltr">did / didn't</strong> مع المصدر المجرد.</div>
                      </>
                    )}
                    {isPastCont && (
                      <>
                        <div>• يأخذ الفعل المساعد <strong className="text-indigo-700 font-mono font-bold" dir="ltr">was</strong> + الفعل مع <strong className="text-indigo-700 font-mono font-bold" dir="ltr">V-ing</strong> (مثل: <span className="font-mono font-bold" dir="ltr">I was working</span>).</div>
                      </>
                    )}
                    {isPastPerf && (
                      <>
                        <div>• يأخذ الفعل المساعد <strong className="text-indigo-700 font-mono font-bold" dir="ltr">had</strong> + التصريف الثالث <strong className="text-indigo-700 font-mono font-bold" dir="ltr">V3</strong>.</div>
                      </>
                    )}
                    {isFutureSimple && (
                      <>
                        <div>• يأخذ الفعل المساعد <strong className="text-indigo-700 font-mono font-bold" dir="ltr">will / won't</strong> + المصدر المجرد <strong className="text-indigo-700 font-mono font-bold">Base V1</strong>.</div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* 2. Singular Subject Box */}
              <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4 space-y-3 shadow-2xs">
                <div className="text-xs font-bold text-blue-900 font-arabic border-b border-blue-200 pb-2 flex items-center justify-between">
                  <span>٢. الفاعل المفرد (Singular)</span>
                  <span className="font-mono text-xs bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded" dir="ltr">
                    He / She / It
                  </span>
                </div>
                <div className="text-xs text-slate-700 font-arabic space-y-2">
                  <div><strong>ضمائر المفرد:</strong> {svoData.subjectClassification.singularPronouns.join(' ، ')}</div>
                  <div className="text-[11px] text-blue-950 bg-white/90 p-2.5 rounded-lg border border-blue-100 leading-relaxed font-arabic space-y-1.5">
                    {isPresentSimple && (
                      <>
                        <div>• <strong>في الإثبات:</strong> يضاف للفعل الرئيسي <strong className="text-blue-700 font-mono font-bold" dir="ltr">+s / +es / +ies</strong> (مثل: <span className="font-mono font-bold" dir="ltr">He works / She watches</span>).</div>
                        <div>• <strong>في النفي والسؤال:</strong> نستخدم الفعل المساعد <strong className="text-blue-700 font-mono font-bold" dir="ltr">does / doesn't</strong> مع عودة الفعل للمصدر المجرد (مثل: <span className="font-mono font-bold" dir="ltr">He doesn't work</span>).</div>
                      </>
                    )}
                    {isPresentCont && (
                      <>
                        <div>• <strong>في الإثبات:</strong> يأخذ الفعل المساعد <strong className="text-blue-700 font-mono font-bold" dir="ltr">is</strong> + الفعل مع <strong className="text-blue-700 font-mono font-bold" dir="ltr">V-ing</strong> (مثل: <span className="font-mono font-bold" dir="ltr">He is working</span>).</div>
                        <div>• <strong>في النفي والسؤال:</strong> نستخدم <strong className="text-rose-700 font-mono font-bold" dir="ltr">isn't / is not</strong> وفي السؤال <strong className="text-blue-700 font-mono font-bold" dir="ltr">Is he...?</strong>.</div>
                      </>
                    )}
                    {isPresentPerf && (
                      <>
                        <div>• <strong>في الإثبات:</strong> يأخذ الفعل المساعد <strong className="text-blue-700 font-mono font-bold" dir="ltr">has</strong> + التصريف الثالث <strong className="text-blue-700 font-mono font-bold" dir="ltr">V3</strong> (مثل: <span className="font-mono font-bold" dir="ltr">He has worked</span>).</div>
                        <div>• <strong>في النفي والسؤال:</strong> نستخدم <strong className="text-rose-700 font-mono font-bold" dir="ltr">hasn't</strong> وفي السؤال <strong className="text-blue-700 font-mono font-bold" dir="ltr">Has he...?</strong>.</div>
                      </>
                    )}
                    {isPresentPerfCont && (
                      <>
                        <div>• يأخذ <strong className="text-blue-700 font-mono font-bold" dir="ltr">has been</strong> + الفعل مع <strong className="text-blue-700 font-mono font-bold" dir="ltr">V-ing</strong> (مثل: <span className="font-mono font-bold" dir="ltr">She has been working</span>).</div>
                      </>
                    )}
                    {isPastSimple && (
                      <>
                        <div>• <strong>في الإثبات:</strong> يأخذ التصريف الثاني <strong className="text-blue-700 font-mono font-bold" dir="ltr">V2</strong> (مثل: <span className="font-mono font-bold" dir="ltr">He worked / She went</span>).</div>
                        <div>• <strong>في النفي والسؤال:</strong> يأخذ <strong className="text-emerald-700 font-mono font-bold" dir="ltr">did / didn't</strong> مع المصدر المجرد.</div>
                      </>
                    )}
                    {isPastCont && (
                      <>
                        <div>• يأخذ الفعل المساعد <strong className="text-blue-700 font-mono font-bold" dir="ltr">was</strong> + الفعل مع <strong className="text-blue-700 font-mono font-bold" dir="ltr">V-ing</strong> (مثل: <span className="font-mono font-bold" dir="ltr">He was working</span>).</div>
                      </>
                    )}
                    {isPastPerf && (
                      <>
                        <div>• يأخذ الفعل المساعد <strong className="text-blue-700 font-mono font-bold" dir="ltr">had</strong> + التصريف الثالث <strong className="text-blue-700 font-mono font-bold" dir="ltr">V3</strong>.</div>
                      </>
                    )}
                    {isFutureSimple && (
                      <>
                        <div>• يأخذ الفعل المساعد <strong className="text-blue-700 font-mono font-bold" dir="ltr">will / won't</strong> + المصدر المجرد <strong className="text-blue-700 font-mono font-bold">Base V1</strong>.</div>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-xs text-slate-600 font-arabic">
                  <strong>أمثلة أسماء مفردة:</strong>
                  <div className="flex flex-wrap gap-1.5 mt-1.5" dir="ltr">
                    {svoData.subjectClassification.singularNouns.map((n, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-xs font-mono text-slate-800">
                        {n.en} <span className="text-[10px] text-slate-400 font-arabic">({n.ar})</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Plural & You Subject Box */}
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 space-y-3 shadow-2xs">
                <div className="text-xs font-bold text-emerald-900 font-arabic border-b border-emerald-200 pb-2 flex items-center justify-between">
                  <span>٣. الفاعل الجمع والمخاطب (Plural & You)</span>
                  <span className="font-mono text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded" dir="ltr">
                    You / We / They
                  </span>
                </div>
                <div className="text-xs text-slate-700 font-arabic space-y-2">
                  <div><strong>ضمائر الجمع والمخاطب:</strong> {svoData.subjectClassification.pluralPronouns.filter(p => !p.startsWith('I ') && p !== 'I').join(' ، ')}</div>
                  <div className="text-[11px] text-emerald-950 bg-white/90 p-2.5 rounded-lg border border-emerald-100 leading-relaxed font-arabic space-y-1.5">
                    {isPresentSimple && (
                      <>
                        <div>• <strong>في الإثبات:</strong> يأخذ الفعل في <strong className="text-emerald-700 font-mono font-bold">المصدر المجرد (Base V1)</strong> بدون إضافات (مثل: <span className="font-mono font-bold" dir="ltr">They work / We play</span>).</div>
                        <div>• <strong>في النفي والسؤال:</strong> نستخدم الفعل المساعد <strong className="text-emerald-700 font-mono font-bold" dir="ltr">do / don't</strong> (مثل: <span className="font-mono font-bold" dir="ltr">They don't work / Do they...?</span>).</div>
                      </>
                    )}
                    {isPresentCont && (
                      <>
                        <div>• <strong>في الإثبات:</strong> يأخذ الفعل المساعد <strong className="text-emerald-700 font-mono font-bold" dir="ltr">are</strong> + الفعل مع <strong className="text-emerald-700 font-mono font-bold" dir="ltr">V-ing</strong> (مثل: <span className="font-mono font-bold" dir="ltr">They are working</span>).</div>
                        <div>• <strong>في النفي والسؤال:</strong> نستخدم <strong className="text-rose-700 font-mono font-bold" dir="ltr">aren't / are not</strong> وفي السؤال <strong className="text-emerald-700 font-mono font-bold" dir="ltr">Are they...?</strong>.</div>
                      </>
                    )}
                    {isPresentPerf && (
                      <>
                        <div>• <strong>في الإثبات:</strong> يأخذ الفعل المساعد <strong className="text-emerald-700 font-mono font-bold" dir="ltr">have</strong> + التصريف الثالث <strong className="text-emerald-700 font-mono font-bold" dir="ltr">V3</strong> (مثل: <span className="font-mono font-bold" dir="ltr">They have worked</span>).</div>
                        <div>• <strong>في النفي والسؤال:</strong> نستخدم <strong className="text-rose-700 font-mono font-bold" dir="ltr">haven't</strong> وفي السؤال <strong className="text-emerald-700 font-mono font-bold" dir="ltr">Have they...?</strong>.</div>
                      </>
                    )}
                    {isPresentPerfCont && (
                      <>
                        <div>• يأخذ <strong className="text-emerald-700 font-mono font-bold" dir="ltr">have been</strong> + الفعل مع <strong className="text-emerald-700 font-mono font-bold" dir="ltr">V-ing</strong> (مثل: <span className="font-mono font-bold" dir="ltr">They have been working</span>).</div>
                      </>
                    )}
                    {isPastSimple && (
                      <>
                        <div>• <strong>في الإثبات:</strong> يأخذ التصريف الثاني <strong className="text-emerald-700 font-mono font-bold" dir="ltr">V2</strong> (مثل: <span className="font-mono font-bold" dir="ltr">They worked / We went</span>).</div>
                        <div>• <strong>في النفي والسؤال:</strong> يأخذ <strong className="text-emerald-700 font-mono font-bold" dir="ltr">did / didn't</strong> مع المصدر المجرد.</div>
                      </>
                    )}
                    {isPastCont && (
                      <>
                        <div>• يأخذ الفعل المساعد <strong className="text-emerald-700 font-mono font-bold" dir="ltr">were</strong> + الفعل مع <strong className="text-emerald-700 font-mono font-bold" dir="ltr">V-ing</strong> (مثل: <span className="font-mono font-bold" dir="ltr">They were working</span>).</div>
                      </>
                    )}
                    {isPastPerf && (
                      <>
                        <div>• يأخذ الفعل المساعد <strong className="text-emerald-700 font-mono font-bold" dir="ltr">had</strong> + التصريف الثالث <strong className="text-emerald-700 font-mono font-bold" dir="ltr">V3</strong>.</div>
                      </>
                    )}
                    {isFutureSimple && (
                      <>
                        <div>• يأخذ الفعل المساعد <strong className="text-emerald-700 font-mono font-bold" dir="ltr">will / won't</strong> + المصدر المجرد <strong className="text-emerald-700 font-mono font-bold">Base V1</strong>.</div>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-xs text-slate-600 font-arabic">
                  <strong>أمثلة أسماء جمع:</strong>
                  <div className="flex flex-wrap gap-1.5 mt-1.5" dir="ltr">
                    {svoData.subjectClassification.pluralNouns.map((n, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-xs font-mono text-slate-800">
                        {n.en} <span className="text-[10px] text-slate-400 font-arabic">({n.ar})</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Verb Conjugation Table (V1 / V2 / V3) */}
      {svoData.verbTable && svoData.verbTable.length > 0 && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900 font-arabic">
                تصريف الأفعال الشائعة لهذا الزمن (V1 - V2 - V3)
              </h3>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-arabic">
              <button
                onClick={() => setVerbFilter('all')}
                className={`px-3 py-1 rounded-lg transition ${
                  verbFilter === 'all'
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                الكل
              </button>
              <button
                onClick={() => setVerbFilter('irregular')}
                className={`px-3 py-1 rounded-lg transition ${
                  verbFilter === 'irregular'
                    ? 'bg-amber-600 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                غير منتظمة (شاذة)
              </button>
              <button
                onClick={() => setVerbFilter('regular')}
                className={`px-3 py-1 rounded-lg transition ${
                  verbFilter === 'regular'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                منتظمة (+ed)
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200" dir="ltr">
            <table className="w-full text-right border-collapse min-w-[500px]" dir="ltr">
              <thead>
                <tr className="bg-slate-100 text-slate-700 text-xs uppercase font-mono">
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left font-bold text-blue-700">V1 (Base)</th>
                  <th className="p-3 text-left font-bold text-amber-700">V2 (Past)</th>
                  <th className="p-3 text-left font-bold text-emerald-700">V3 (Past Participle)</th>
                  <th className="p-3 text-right font-arabic">المعنى العربي</th>
                  <th className="p-3 text-center">Audio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredVerbs.map((v, vIndex) => (
                  <tr key={vIndex} className="hover:bg-slate-50 transition">
                    <td className="p-3 text-left">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          v.isIrregular ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {v.isIrregular ? 'شاذ' : 'منتظم'}
                      </span>
                    </td>
                    <td className="p-3 text-left font-mono font-bold text-blue-800 text-xs sm:text-sm">
                      {v.base}
                    </td>
                    <td className="p-3 text-left font-mono font-bold text-amber-800 text-xs sm:text-sm">
                      {v.v2}
                    </td>
                    <td className="p-3 text-left font-mono font-bold text-emerald-800 text-xs sm:text-sm">
                      {v.v3}
                    </td>
                    <td className="p-3 text-right font-arabic text-slate-700">
                      {v.meaningAr}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => playEnglishAudio(`${v.base}, ${v.v2}, ${v.v3}`)}
                        className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                        title="استمع لتصريفات الفعل"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
          <span>الانتقال إلى صياغة الجملة المثبتة (+)</span>
          <ArrowLeft className="w-4 h-4 rotate-180" />
        </button>
      </div>
    </div>
  );
};
