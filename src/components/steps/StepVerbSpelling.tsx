import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Volume2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Info,
  RotateCcw,
  Search,
  Check,
  Headphones,
  SlidersHorizontal,
} from 'lucide-react';
import { TenseData, InteractiveSpellingVerb } from '../../types';
import { playEnglishAudio } from '../../utils/audio';
import { shuffleArray } from '../../utils/quizUtils';
import { getSpellingRulesForTense } from '../../data/tenseSpellingRules';
import {
  TENSE_LAB_CONFIG,
  TENSE_INTERACTIVE_VERBS,
  TENSE_PRACTICE_QUIZZES,
  analyzeVerbForTense,
} from '../../data/interactiveVerbLabData';
import { IrregularVerbsModal } from '../modals/IrregularVerbsModal';
import { isTenseUsingV2OrV3 } from '../../data/irregularVerbsData';

interface StepVerbSpellingProps {
  tense: TenseData;
  onNext: () => void;
  onPrev: () => void;
}

export const StepVerbSpelling: React.FC<StepVerbSpellingProps> = ({ tense, onNext, onPrev }) => {
  const spellingData = getSpellingRulesForTense(tense.id);

  // Dynamic Tense Configuration & Verbs for the Interactive Lab
  const currentLabConfig = TENSE_LAB_CONFIG[tense.id] || TENSE_LAB_CONFIG['present_simple'];
  const tenseInteractiveVerbs =
    (spellingData.interactiveVerbs && spellingData.interactiveVerbs.length > 0)
      ? spellingData.interactiveVerbs
      : TENSE_INTERACTIVE_VERBS[tense.id] || TENSE_INTERACTIVE_VERBS['present_simple'];

  const [quizShuffleKey, setQuizShuffleKey] = useState<number>(0);

  const quizQuestions = useMemo(() => {
    const rawQuestions =
      (spellingData.practiceQuiz && spellingData.practiceQuiz.length > 0)
        ? spellingData.practiceQuiz
        : TENSE_PRACTICE_QUIZZES[tense.id] || [];

    return rawQuestions.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
  }, [spellingData.practiceQuiz, tense.id, quizShuffleKey]);

  const [selectedVerb, setSelectedVerb] = useState<InteractiveSpellingVerb>(tenseInteractiveVerbs[0]);
  const [customVerbInput, setCustomVerbInput] = useState<string>('');
  const [customAnalysis, setCustomAnalysis] = useState<{
    base: string;
    conjugated: string;
    addition: string;
    rule: string;
  } | null>(null);

  // Instant Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});

  // Irregular Verbs Modal State
  const [isIrregularModalOpen, setIsIrregularModalOpen] = useState<boolean>(false);
  const tenseUsesV2OrV3 = isTenseUsingV2OrV3(tense.id);

  // Reset interactive lab state when tense changes
  useEffect(() => {
    setSelectedVerb(tenseInteractiveVerbs[0]);
    setCustomVerbInput('');
    setCustomAnalysis(null);
    setQuizAnswers({});
  }, [tense.id]);

  const handleCustomVerbCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const v = customVerbInput.trim().toLowerCase();
    if (!v) return;

    const analysis = analyzeVerbForTense(v, tense.id);
    setCustomAnalysis(analysis);
  };

  const getBadgeClasses = (type: 'emerald' | 'rose' | 'indigo' | 'amber') => {
    switch (type) {
      case 'emerald':
        return {
          box: 'bg-emerald-50 border-emerald-200',
          badge: 'bg-emerald-200 text-emerald-800',
          tag: 'bg-emerald-100 text-emerald-800',
          highlight: 'text-emerald-700',
          border: 'border-emerald-200',
        };
      case 'rose':
        return {
          box: 'bg-rose-50 border-rose-200',
          badge: 'bg-rose-200 text-rose-800',
          tag: 'bg-rose-100 text-rose-800',
          highlight: 'text-rose-700',
          border: 'border-rose-200',
        };
      case 'indigo':
        return {
          box: 'bg-indigo-50 border-indigo-200',
          badge: 'bg-indigo-200 text-indigo-800',
          tag: 'bg-indigo-100 text-indigo-800',
          highlight: 'text-indigo-700',
          border: 'border-indigo-200',
        };
      case 'amber':
      default:
        return {
          box: 'bg-amber-50 border-amber-200',
          badge: 'bg-amber-200 text-amber-900',
          tag: 'bg-amber-100 text-amber-900',
          highlight: 'text-amber-800',
          border: 'border-amber-200',
        };
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn" dir="rtl">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>الوحدة 3: قواعد وتصاريف الأفعال والإملاء</span>
          </div>

          <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            Verb Conjugation &amp; Spelling
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 font-arabic">
          {spellingData.titleAr}
        </h2>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-arabic">
          {spellingData.overviewAr}
        </p>

        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>الزمن المستهدف: <strong className="text-slate-800">{tense.nameAr} ({tense.nameEn})</strong></span>
          </div>
          <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-bold">
            شامل: إملاء + نطق صوتي + معمل تفاعلي
          </span>
        </div>
      </div>

      {/* جدول تصاريف الأفعال وقواعد الإملاء (Spelling & Verb Forms) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>{spellingData.titleAr}</span>
            </h3>
            <p className="text-xs text-slate-500 font-bold mt-1">
              {spellingData.subtitleAr}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
              الوحدة: {tense.nameAr}
            </span>
          </div>
        </div>

        {/* Rule Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {spellingData.ruleCards.map((card, idx) => {
            const styles = getBadgeClasses(card.badgeType);
            return (
              <div
                key={idx}
                className={`${styles.box} border-2 p-4.5 rounded-2xl space-y-2 shadow-2xs`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xl font-black ${styles.badge} px-3 py-1 rounded-xl`}
                    dir="ltr"
                  >
                    {card.badge}
                  </span>
                  <span className={`text-xs font-bold ${styles.tag} px-2 py-0.5 rounded-full`}>
                    قاعدة {idx + 1}
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">{card.titleAr}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{card.conditionAr}</p>
                <div
                  className={`text-xs font-mono text-slate-800 pt-1 border-t ${styles.border}`}
                  dir="ltr"
                >
                  {card.examples}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pronunciation Master Guide if available */}
        {spellingData.pronunciationGroups && spellingData.pronunciationGroups.length > 0 && (
          <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Headphones className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-sm sm:text-base">دليل النطق الصوتي الدقيق للمخارج الصوتية</h4>
              </div>
              <span className="text-xs text-amber-300 font-mono">Phonetic Rules Guide</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-arabic">
              لا تُنطق إضافات الأفعال دائماً بنفس الطريقة، بل تعتمد كلياً على نوع الصوت الأخير للفعل (صامت خفيف، أو مجهور اهتزازي، أو صفيري):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {spellingData.pronunciationGroups.map((pGroup, pIdx) => (
                <div key={pIdx} className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-black text-amber-300 bg-slate-700/80 px-2.5 py-0.5 rounded" dir="ltr">
                      {pGroup.phoneticSound}
                    </span>
                    <button
                      onClick={() => playEnglishAudio(pGroup.audioPhrase)}
                      className="p-1 text-slate-300 hover:text-amber-400 transition"
                      title="استمع للنماذج"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xs font-bold text-white">{pGroup.phoneticNameAr}</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{pGroup.ruleExplanationAr}</p>
                  <div className="pt-2 border-t border-slate-700 flex flex-wrap gap-1.5" dir="ltr">
                    {pGroup.wordPairs.map((pair, wIdx) => (
                      <span
                        key={wIdx}
                        onClick={() => playEnglishAudio(`${pair.base}. ${pair.conjugated}.`)}
                        className="text-[11px] font-mono bg-slate-700/60 hover:bg-amber-400/20 hover:text-amber-200 cursor-pointer text-slate-200 px-2 py-0.5 rounded transition"
                        title="انقر للاستماع"
                      >
                        {pair.conjugated}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Comprehensive Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
          <table className="w-full text-right text-xs sm:text-sm">
            <thead className="bg-slate-900 text-white font-bold">
              <tr>
                <th className="p-3.5 text-center w-28">الإضافة / التصريف</th>
                <th className="p-3.5 text-right">الشرط والقاعدة (Rule)</th>
                <th className="p-3.5 text-left" dir="ltr">تحول الفعل + النطق الصوتي</th>
                <th className="p-3.5 text-right">جمل وملاحظات تذكيرية</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {spellingData.tableRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 text-center align-top">
                    <span
                      className="font-mono font-black text-sm sm:text-base text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl inline-block"
                      dir="ltr"
                    >
                      {row.addition}
                    </span>
                  </td>
                  <td className="p-4 align-top">
                    <span className="font-bold text-slate-900 block">{row.ruleTitleAr}</span>
                    <span className="text-xs text-slate-600 font-medium block mt-1">
                      {row.conditionAr}
                    </span>
                  </td>
                  <td className="p-4 align-top text-left space-y-2 font-mono" dir="ltr">
                    {row.examples.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        className="flex items-center justify-between gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200"
                      >
                        <span className="text-xs font-bold text-slate-900">
                          {ex.base} ➔ <strong className="text-indigo-600">{ex.changed}</strong>
                        </span>
                        {ex.audioPhrase && (
                          <button
                            onClick={() => playEnglishAudio(ex.audioPhrase!)}
                            className="p-1 text-slate-500 hover:text-indigo-600 cursor-pointer rounded-lg hover:bg-slate-200/60 transition"
                            title="استمع للنطق الصوتي"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </td>
                  <td className="p-4 align-top text-xs leading-relaxed text-slate-700">
                    {row.noteAr}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Irregular Verbs Section if available */}
        {spellingData.irregularSection && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
              <Sparkles className="w-4.5 h-4.5 text-indigo-600 shrink-0" />
              <span>{spellingData.irregularSection.titleAr}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {spellingData.irregularSection.descriptionAr}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {spellingData.irregularSection.items.map((item, iIdx) => (
                <div
                  key={iIdx}
                  className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center justify-between font-mono text-sm" dir="ltr">
                    <span className="font-bold text-slate-700">{item.base}</span>
                    <span className="font-black text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200">
                      ➔ {item.conjugated}
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 font-arabic font-medium">
                    {item.meaningAr}
                  </div>
                  {item.noteAr && (
                    <div className="text-[11px] text-slate-500 font-arabic leading-relaxed">
                      {item.noteAr}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {tenseUsesV2OrV3 && (
              <div className="pt-2">
                <button
                  onClick={() => setIsIrregularModalOpen(true)}
                  className="w-full py-2.5 px-4 bg-white hover:bg-amber-50 border-2 border-amber-300 text-amber-900 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>فتح القائمة الموسعة للأفعال الشاذة (100+ أفعال مع النطق والبحث واختبار النفس) ➔</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* زر القائمة الموسعة للأفعال الشاذة - للأزمنة التي ليس لها قسم أفعال شاذة مخصص ولكنها تستخدم V2 أو V3 */}
        {!spellingData.irregularSection && tenseUsesV2OrV3 && (
          <div className="pt-1">
            <button
              onClick={() => setIsIrregularModalOpen(true)}
              className="w-full py-2.5 px-4 bg-white hover:bg-amber-50 border-2 border-amber-300 text-amber-900 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>فتح القائمة الموسعة للأفعال الشاذة (100+ أفعال مع النطق والبحث واختبار النفس) ➔</span>
            </button>
          </div>
        )}

        {/* Interactive Live Verb Conjugation Lab (معمل وتدريب تصريف الأفعال التفاعلي) - متكيف مع كل زمن */}
        <div className="bg-linear-to-br from-indigo-50/60 via-white to-blue-50/40 rounded-2xl border border-indigo-100 p-5 sm:p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-indigo-100/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 font-arabic">
                  معمل وتدريب تصريف الأفعال التفاعلي - {tense.nameAr}
                </h3>
                <p className="text-xs text-slate-500 font-arabic">
                  {currentLabConfig.labSubtitleAr}
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-arabic">
              تجربة تفاعلية حية
            </span>
          </div>

          {/* Quick Verb Chips */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-700 font-arabic">اختر فعلاً شائعاً للدراسة السريعة في {tense.nameAr}:</div>
            <div className="flex flex-wrap gap-2" dir="ltr">
              {tenseInteractiveVerbs.map((item, idx) => {
                const isSelected = selectedVerb.base === item.base && !customAnalysis;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedVerb(item);
                      setCustomAnalysis(null);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40'
                    }`}
                  >
                    <span>{item.base}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-sans ${isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {item.additionType}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Verb Testing Input */}
          <form onSubmit={handleCustomVerbCheck} className="flex gap-2 items-center pt-1" dir="ltr">
            <div className="relative flex-1">
              <input
                type="text"
                value={customVerbInput}
                onChange={(e) => setCustomVerbInput(e.target.value)}
                placeholder={currentLabConfig.inputPlaceholder}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 shadow-2xs"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer font-arabic shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              <span>تحليل إملائي</span>
            </button>
          </form>

          {/* Active Verb Analysis Card */}
          {customAnalysis ? (
            <div className="bg-white rounded-2xl border-2 border-indigo-200 p-5 space-y-3 shadow-2xs animate-fadeIn">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg font-arabic">
                  نتيجة التحليل للفعل المدخل ({customAnalysis.base}) في {tense.nameAr}
                </span>
                <button
                  onClick={() => {
                    setCustomAnalysis(null);
                    setCustomVerbInput('');
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-arabic cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>إغلاق</span>
                </button>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200" dir="ltr">
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Base Form</span>
                  <div className="text-lg font-mono font-bold text-slate-800">{customAnalysis.base}</div>
                </div>
                <div className="text-indigo-400 font-bold text-lg">➔</div>
                <div className="space-y-1">
                  <div className="text-xl font-mono font-black text-indigo-700">{customAnalysis.conjugated}</div>
                </div>
                <button
                  type="button"
                  onClick={() => playEnglishAudio(`${customAnalysis.base}. ${customAnalysis.conjugated}.`)}
                  className="p-2.5 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-800 flex items-center gap-1.5 transition cursor-pointer"
                  title="استمع للنطق الصوتي"
                >
                  <Volume2 className="w-4 h-4" />
                  <span className="text-xs font-bold font-arabic">استمع</span>
                </button>
              </div>

              <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-xl p-3 text-xs sm:text-sm text-indigo-950 leading-relaxed font-arabic">
                <strong>القاعدة المطبقة:</strong> {customAnalysis.rule}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-indigo-100 p-5 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between flex-wrap gap-4 bg-slate-50/80 p-4 rounded-xl border border-slate-200/80" dir="ltr">
                <div className="space-y-0.5">
                  <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Base Form</span>
                  <div className="text-base sm:text-lg font-mono font-bold text-slate-800">{selectedVerb.base}</div>
                </div>
                <div className="text-indigo-400 font-bold text-base">➔</div>
                <div className="space-y-0.5">
                  <div className="text-lg sm:text-xl font-mono font-black text-indigo-700">{selectedVerb.conjugated}</div>
                </div>
                <button
                  onClick={() => playEnglishAudio(selectedVerb.audioPhrase)}
                  className="px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center gap-1.5 transition cursor-pointer"
                  title="استمع للنطق الصوتي"
                >
                  <Volume2 className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold font-arabic">نطق الجملة</span>
                </button>
              </div>

              <div className="text-xs text-slate-700 leading-relaxed font-arabic">
                <strong className="text-indigo-900">التعليل الإملائي:</strong> {selectedVerb.ruleExplanationAr}
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1">
                <div className="text-xs font-bold text-slate-900 font-mono text-left" dir="ltr">
                  "{selectedVerb.exampleSentenceEn}"
                </div>
                <div className="text-xs text-slate-600 font-arabic font-medium">
                  {selectedVerb.exampleSentenceAr}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Standardized Amber Golden Note */}
        {spellingData.goldenSpellingNoteAr && (
          <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-5 sm:p-6 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm sm:text-base font-arabic">
              <Info className="w-5 h-5 text-amber-600 shrink-0" />
              <span>القاعدة الذهبية لتصريف وإملاء أفعال {tense.nameAr}:</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-arabic">
              {spellingData.goldenSpellingNoteAr}
            </p>
          </div>
        )}

        {/* Instant Interactive Spelling Quiz (#fcded6 Theme) */}
        {quizQuestions.length > 0 && (
          <div className="bg-[#fcded6] text-slate-900 rounded-2xl p-5 sm:p-6 border border-[#f5c2b5] shadow-xs space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-[#f0b5a6] pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-800 shrink-0" />
                <h4 className="font-bold text-sm sm:text-base text-slate-900 font-arabic">
                  تدريب فوري: اختبر مهارتك في كتابة وإملاء الأفعال
                </h4>
              </div>
              <div className="flex items-center gap-2">
                {Object.keys(quizAnswers).length > 0 && (
                  <button
                    onClick={() => {
                      setQuizAnswers({});
                      setQuizShuffleKey((prev) => prev + 1);
                    }}
                    className="text-xs text-slate-700 hover:text-slate-950 flex items-center gap-1 font-arabic transition cursor-pointer bg-white/60 hover:bg-white px-2.5 py-1 rounded-full border border-[#f0b5a6]"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>إعادة التدريب</span>
                  </button>
                )}
                <span className="text-xs font-bold text-amber-900 bg-amber-100/80 px-3 py-1 rounded-full">
                  تحدي إملائي سريع
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {quizQuestions.map((q, qIdx) => {
                const selectedOpt = quizAnswers[qIdx];
                const isAnswered = selectedOpt !== undefined;
                const isCorrect = selectedOpt === q.correctOption;

                return (
                  <div key={qIdx} className="bg-white/90 rounded-xl p-4 border border-[#f0b5a6] space-y-2.5">
                    <div className="font-bold text-xs sm:text-sm text-slate-900 font-arabic flex items-center justify-between">
                      <span>{qIdx + 1}. {q.questionAr}</span>
                      {isAnswered && (
                        <span className={`text-xs font-bold flex items-center gap-1 ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>إجابة صحيحة!</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-rose-600" />
                              <span>إجابة غير صحيحة</span>
                            </>
                          )}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" dir="ltr">
                      {q.options.map((opt, optIdx) => {
                        let btnStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';
                        if (isAnswered) {
                          if (opt === q.correctOption) {
                            btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                          } else if (opt === selectedOpt) {
                            btnStyle = 'bg-rose-100 border-rose-500 text-rose-900 line-through';
                          } else {
                            btnStyle = 'bg-slate-50 text-slate-400 border-slate-200 opacity-50';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isAnswered}
                            onClick={() => setQuizAnswers((prev) => ({ ...prev, [qIdx]: opt }))}
                            className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition flex items-center justify-center cursor-pointer ${btnStyle}`}
                          >
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className={`p-2.5 rounded-lg text-xs font-arabic ${isCorrect ? 'bg-emerald-50 text-emerald-900' : 'bg-rose-50 text-rose-900'}`}>
                        <strong>تفسير القاعدة:</strong> {q.explanationAr}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الدرس السابق</span>
        </button>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-md shadow-blue-500/20 transition cursor-pointer"
        >
          <span>الانتقال للوحدة 4: الأخطاء الشائعة</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Irregular Verbs Table Modal */}
      <IrregularVerbsModal
        isOpen={isIrregularModalOpen}
        onClose={() => setIsIrregularModalOpen(false)}
        tenseId={tense.id}
        tenseNameAr={tense.nameAr}
        tenseNameEn={tense.nameEn}
      />
    </div>
  );
};
