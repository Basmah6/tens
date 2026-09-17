import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, HelpCircle, ArrowLeft, ArrowRight, BookOpen, CheckCircle2, RotateCcw, Search } from 'lucide-react';
import { TenseData, SVOStructure } from '../../types';
import { playEnglishAudio } from '../../utils/audio';
import { ALL_WH_QUESTIONS_LIST } from '../../utils/whStructureHelper';

interface StepSVOFormSingleProps {
  tense: TenseData;
  structure: SVOStructure;
  formIndex: number;
  totalForms: number;
  onNext: () => void;
  onPrev: () => void;
}

export const StepSVOFormSingle: React.FC<StepSVOFormSingleProps> = ({
  tense,
  structure: propStructure,
  formIndex,
  totalForms,
  onNext,
  onPrev,
}) => {
  const structure = propStructure || tense?.svoLesson?.structures?.[formIndex] || tense?.svoLesson?.structures?.[0] || {
    formType: 'affirmative' as const,
    formTitleAr: 'الإثبات',
    formTitleEn: 'Affirmative',
    formula: 'Subject + Verb + Object',
    tableRows: [],
    explanationAr: '',
  };

  const isWhQuestion = structure.formType === 'wh_question';
  const isYesNoQuestion = structure.formType === 'yes_no_question';
  const isNegative = structure.formType === 'negative';

  // Wh- Encyclopedia Modal State
  const [showWhEncyclopedia, setShowWhEncyclopedia] = useState(false);
  const [whSearchText, setWhSearchText] = useState('');

  // Interactive Mini Sentence Arrangement Challenge for this form
  const sampleRow = structure.tableRows?.[0] || {
    fullSentence: 'They watch TV every evening.',
    translationAr: 'هم يشاهدون التلفاز كل مساء.',
    subject: 'They',
    verb: 'watch',
    verbFormNote: 'V1',
    objectComplement: 'TV every evening',
  };

  const words = React.useMemo(() => {
    return sampleRow.fullSentence.replace(/[.?]/g, '').split(' ');
  }, [sampleRow.fullSentence]);

  const [pickedWords, setPickedWords] = useState<string[]>([]);
  const [isTestChecked, setIsTestChecked] = useState(false);

  // Reset challenge when form index or tense changes
  useEffect(() => {
    setPickedWords([]);
    setIsTestChecked(false);
  }, [formIndex, tense?.id]);

  const handleToggleWord = (word: string) => {
    if (isTestChecked) return;
    if (pickedWords.includes(word)) {
      setPickedWords((prev) => prev.filter((w) => w !== word));
    } else {
      setPickedWords((prev) => [...prev, word]);
    }
  };

  const isArrangementCorrect =
    pickedWords.join(' ').toLowerCase() ===
    sampleRow.fullSentence.replace(/[.?]/g, '').trim().toLowerCase();

  const handleResetArrangement = () => {
    setPickedWords([]);
    setIsTestChecked(false);
  };

  const getBadgeStyle = () => {
    if (isNegative) return { bg: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-600' };
    if (isYesNoQuestion) return { bg: 'bg-amber-50 text-amber-800 border-amber-200', dot: 'bg-amber-600' };
    if (isWhQuestion) return { bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', dot: 'bg-indigo-600' };
    return { bg: 'bg-emerald-50 text-emerald-800 border-emerald-200', dot: 'bg-emerald-600' };
  };

  const badge = getBadgeStyle();

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn" dir="rtl">
      {/* Header Form Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${badge.bg}`}>
            <span className={`w-2 h-2 rounded-full ${badge.dot}`}></span>
            <span>صيغة الجملة ({formIndex + 1} من {totalForms}): {structure.formTitleAr}</span>
          </div>

          {/* Formula Badge */}
          <div className="px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 text-xs font-mono font-bold tracking-wide" dir="ltr">
            {structure.formula}
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 font-arabic">
          {structure.formTitleAr} <span className="text-base font-normal text-slate-500 font-sans" dir="ltr">({structure.formTitleEn})</span>
        </h2>

        <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 sm:p-5 space-y-1.5 font-arabic">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>قاعدة وملاحظة صياغة ({structure.formTitleAr}):</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
            {structure.explanationAr}
          </p>
        </div>

        {isWhQuestion && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-600 font-arabic">
              هل تريد استعراض جميع أدوات الاستفهام ومعانيها؟
            </span>
            <button
              onClick={() => setShowWhEncyclopedia(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>موسوعة أدوات Wh- (16 أداة)</span>
            </button>
          </div>
        )}
      </div>

      {/* SVO Table for this Form */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 font-arabic flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>جدول توزيع عناصر الجملة (SVO Table):</span>
          </h3>
          <span className="text-xs text-slate-500 font-arabic">({structure.tableRows.length} نماذج مطبقة)</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200" dir="ltr">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-900 text-white text-xs uppercase font-arabic font-semibold">
                {isWhQuestion ? (
                  <>
                    <th className="p-3 text-center bg-indigo-950 text-indigo-200">Wh- Word</th>
                    <th className="p-3 text-center text-amber-300">Auxiliary</th>
                    <th className="p-3 text-center text-blue-300">Subject</th>
                  </>
                ) : isYesNoQuestion ? (
                  <>
                    <th className="p-3 text-center text-amber-300">Auxiliary</th>
                    <th className="p-3 text-center text-blue-300">Subject</th>
                  </>
                ) : (
                  <>
                    <th className="p-3 text-center text-blue-300">Subject</th>
                    <th className="p-3 text-center text-amber-300">Auxiliary</th>
                  </>
                )}
                <th className="p-3 text-center text-emerald-300">Verb</th>
                <th className="p-3 text-center text-purple-300">Object / Complement</th>
                <th className="p-3 text-center text-slate-300">Time</th>
                <th className="p-3 text-center">Full Sentence & Audio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {structure.tableRows.map((row, rIdx) => {
                const whWord = row.whWord || (isWhQuestion ? 'Where' : '');

                return (
                  <tr key={rIdx} className="hover:bg-slate-50 transition">
                    {isWhQuestion ? (
                      <>
                        <td className="p-3 text-center bg-indigo-50/50 font-bold text-indigo-900 font-sans">
                          <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 border border-indigo-200 text-xs">
                            {whWord}
                          </span>
                        </td>
                        <td className="p-3 text-center font-mono font-semibold">
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            row.auxiliary && row.auxiliary !== '-'
                              ? 'bg-amber-100 text-amber-900 font-bold'
                              : 'bg-slate-100 text-slate-400'
                          }`}>
                            {row.auxiliary || '-'}
                          </span>
                        </td>
                        <td className="p-3 text-center font-bold text-slate-800">
                          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 text-xs">
                            {row.subject}
                          </span>
                        </td>
                      </>
                    ) : isYesNoQuestion ? (
                      <>
                        <td className="p-3 text-center font-mono font-semibold">
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            row.auxiliary && row.auxiliary !== '-'
                              ? 'bg-amber-100 text-amber-900 font-bold'
                              : 'bg-slate-100 text-slate-400'
                          }`}>
                            {row.auxiliary || '-'}
                          </span>
                        </td>
                        <td className="p-3 text-center font-bold text-slate-800">
                          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 text-xs">
                            {row.subject}
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-3 text-center font-bold text-slate-800">
                          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 text-xs">
                            {row.subject}
                          </span>
                        </td>
                        <td className="p-3 text-center font-mono font-semibold">
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            row.auxiliary && row.auxiliary !== '-'
                              ? 'bg-amber-100 text-amber-900 font-bold'
                              : 'bg-slate-100 text-slate-400'
                          }`}>
                            {row.auxiliary || '-'}
                          </span>
                        </td>
                      </>
                    )}

                    <td className="p-3 text-center font-bold text-emerald-800">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 text-xs">
                        {row.verb}
                      </span>
                      {row.verbFormNote && (
                        <div className="text-[10px] text-slate-400 font-arabic mt-0.5 font-normal" dir="rtl">
                          {row.verbFormNote}
                        </div>
                      )}
                    </td>

                    <td className="p-3 text-center text-slate-700 text-xs">
                      {row.objectComplement}
                    </td>

                    <td className="p-3 text-center text-slate-500 text-xs">
                      {row.timeMarker || '-'}
                    </td>

                    <td className="p-3 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm font-sans" dir="ltr">
                          {row.fullSentence}
                        </span>
                        <span className="text-[11px] text-slate-500 font-arabic" dir="rtl">
                          {row.translationAr}
                        </span>
                        <button
                          onClick={() => playEnglishAudio(row.fullSentence)}
                          className="mt-1 px-2.5 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold inline-flex items-center gap-1 transition"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>نطق</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mini Interactive Sentence Form Builder */}
      <div className="bg-[#fcded6] text-slate-900 rounded-2xl p-5 sm:p-6 border border-[#f5c2b5] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900 font-arabic flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-800" />
            <span>تدريب فوري: ركّب كلمات هذه الجملة ({structure.formTitleAr}) بالترتيب الصحيح</span>
          </h4>
          {pickedWords.length > 0 && (
            <button
              onClick={handleResetArrangement}
              className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-arabic transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>إعادة</span>
            </button>
          )}
        </div>

        <p className="text-xs text-slate-700 font-arabic">
          المعنى المستهدف: <strong className="text-slate-900">"{sampleRow.translationAr}"</strong>
        </p>

        {/* Selected Words Tray */}
        <div className="min-h-[46px] p-2.5 bg-white/90 rounded-xl border border-[#f0b5a6] flex flex-wrap gap-2 items-center shadow-2xs" dir="ltr">
          {pickedWords.length === 0 ? (
            <span className="text-xs text-slate-400 italic">انقر على الكلمات المبعثرة بالأسفل لترتيبها هنا...</span>
          ) : (
            pickedWords.map((w, wIdx) => (
              <span
                key={wIdx}
                onClick={() => handleToggleWord(w)}
                className="px-2.5 py-1 bg-[#214ecf] hover:bg-[#1a3eb0] text-white rounded-lg text-xs font-bold cursor-pointer transition shadow-xs"
              >
                {w}
              </span>
            ))
          )}
        </div>

        {/* Scrambled words to pick */}
        <div className="flex flex-wrap gap-2 pt-1" dir="ltr">
          {[...words].sort((a, b) => (a > b ? 1 : -1)).map((w, wIdx) => {
            const isPicked = pickedWords.includes(w);
            return (
              <button
                key={wIdx}
                disabled={isTestChecked || isPicked}
                onClick={() => handleToggleWord(w)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                  isPicked
                    ? 'bg-white/40 border-[#f0b5a6]/60 text-slate-400 opacity-50 cursor-not-allowed'
                    : 'bg-white hover:bg-white/85 border-[#f0b5a6] hover:border-[#e39c8a] text-slate-800 shadow-2xs'
                }`}
              >
                {w}
              </button>
            );
          })}
        </div>

        {!isTestChecked && pickedWords.length === words.length && (
          <button
            onClick={() => setIsTestChecked(true)}
            className="mt-2 px-4 py-2 rounded-lg bg-[#214ecf] hover:bg-[#1a3eb0] text-white text-xs font-bold transition font-arabic shadow-xs"
          >
            تحقق من صحة الترتيب
          </button>
        )}

        {isTestChecked && (
          <div
            className={`p-3 rounded-xl text-xs font-arabic animate-fadeIn border ${
              isArrangementCorrect
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                : 'bg-rose-50 text-rose-900 border-rose-300'
            }`}
          >
            {isArrangementCorrect ? (
              <span className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                صياغة مثالية! الجملة مكتوبة بالترتيب الصحيح وفق قاعدة ({structure.formTitleAr}).
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <span className="font-bold text-rose-700">الترتيب غير دقيق.</span>
                <span>الجملة الصحيحة هي: "{sampleRow.fullSentence}"</span>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Wh- Encyclopedia Modal */}
      {showWhEncyclopedia && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4" dir="rtl">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
              <div>
                <h3 className="text-base font-bold font-arabic">موسوعة أدوات الاستفهام (Wh- Questions)</h3>
                <p className="text-xs text-slate-300 font-arabic mt-0.5">16 أداة استفهام مع استخداماتها وصيغها القياسية</p>
              </div>
              <button
                onClick={() => setShowWhEncyclopedia(false)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2.5 py-1 rounded bg-slate-800"
              >
                إغلاق
              </button>
            </div>

            <div className="p-4 border-b border-slate-100 bg-slate-50">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={whSearchText}
                  onChange={(e) => setWhSearchText(e.target.value)}
                  placeholder="ابحث عن أداة (e.g. Where, When, How)..."
                  className="w-full pr-9 pl-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 font-arabic focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="p-4 overflow-y-auto space-y-2.5 divide-y divide-slate-100">
              {ALL_WH_QUESTIONS_LIST.filter((i) => {
                if (!whSearchText.trim()) return true;
                const q = whSearchText.toLowerCase();
                return i.en.toLowerCase().includes(q) || i.ar.includes(q) || i.usageAr.includes(q);
              }).map((item) => (
                <div key={item.en} className="pt-2.5 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100" dir="ltr">
                        {item.en}
                      </span>
                      <span className="text-xs font-bold text-slate-800 font-arabic">{item.ar}</span>
                    </div>
                    <p className="text-xs text-slate-600 font-arabic">{item.usageAr}</p>
                    <div className="text-xs font-sans text-slate-900 font-medium" dir="ltr">
                      "{item.exampleEn}"
                    </div>
                  </div>
                  <button
                    onClick={() => playEnglishAudio(item.exampleEn)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 transition shrink-0"
                    title="استمع للمثال"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
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
          <span>
            {formIndex + 1 < totalForms
              ? `الانتقال إلى الصيغة التالية (${formIndex + 2} من ${totalForms})`
              : 'الانتقال إلى معمل تركيب الجمل الذكي'}
          </span>
          <ArrowLeft className="w-4 h-4 rotate-180" />
        </button>
      </div>
    </div>
  );
};
