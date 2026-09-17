import React, { useState, useMemo } from 'react';
import { Table, Sparkles, Volume2, ArrowRight, Layers, HelpCircle, Check, RefreshCw, BookOpen, Users, ArrowLeft, CheckCircle2, Shuffle, Search, HelpCircle as QuestionIcon } from 'lucide-react';
import { TenseData, SVOStructure } from '../types';
import { playEnglishAudio } from '../utils/audio';
import { getWhStructureForTense, ALL_WH_QUESTIONS_LIST, WhQuestionItem } from '../utils/whStructureHelper';
import {
  buildSvoSentence,
  getComplementsForVerb,
  getSubjectAr,
  SentenceFormMode,
  SubjectItem,
  TimeItem,
  SemanticComplement
} from '../utils/sentenceEngine';

interface LessonSVOProps {
  tense: TenseData;
  onCompleteLesson: () => void;
  onNextLesson: () => void;
}

const WH_WORDS_LIST = ALL_WH_QUESTIONS_LIST.map(item => ({
  en: item.en,
  ar: item.ar,
  desc: item.usageAr,
  category: item.category
}));

const getWhArabicMeaning = (wh: string) => {
  const found = ALL_WH_QUESTIONS_LIST.find(i => i.en.toLowerCase() === wh.toLowerCase().trim());
  if (found) return found.ar;
  return 'أداة استفهام';
};

const getRowWhWord = (row: any) => {
  if (!row) return null;
  if (row.whWord) return row.whWord;
  const match = (row.fullSentence || '').match(/^(What|Where|When|Why|How long|How many|How much|How often|How|Who|Which|Whom|Whose)\b/i);
  if (match) return match[1];
  if (row.verbFormNote && row.verbFormNote.includes('أداة الاستفهام:')) {
    const parts = row.verbFormNote.split('أداة الاستفهام:');
    if (parts[1]) return parts[1].trim();
  }
  return null;
};

export const LessonSVO: React.FC<LessonSVOProps> = ({
  tense,
  onCompleteLesson,
  onNextLesson,
}) => {
  const svoData = tense.svoLesson;
  const [selectedFormIndex, setSelectedFormIndex] = useState(0);
  const [verbFilter, setVerbFilter] = useState<'all' | 'regular' | 'irregular'>('all');

  // Interactive Sentence Builder State
  const builder = svoData.builderParts;
  const [builderFormMode, setBuilderFormMode] = useState<SentenceFormMode>('affirmative');
  const [selectedWhWord, setSelectedWhWord] = useState('Where');

  // Wh- Question Encyclopedia State
  const [whCategoryFilter, setWhCategoryFilter] = useState<'all' | 'core' | 'compound'>('all');
  const [whSearchText, setWhSearchText] = useState('');

  // Ensure all 4 forms (Affirmative, Negative, Yes/No, Wh-) exist for all 12 tenses
  const allStructures = useMemo(() => {
    const list = [...svoData.structures];
    const hasWh = list.some(s => s.formType === 'wh_question');
    if (!hasWh) {
      list.push(getWhStructureForTense(tense.id));
    }
    return list;
  }, [svoData.structures, tense.id]);

  // Parse subjects with fallback
  const subjectsList: SubjectItem[] = useMemo(() => {
    if (builder?.subjects && builder.subjects.length > 0) {
      return builder.subjects.map(s => ({
        text: s.text,
        type: s.type,
        meaningAr: s.meaningAr || getSubjectAr(s.text).ar
      }));
    }
    return [
      { text: 'I', type: 'i', meaningAr: 'أنا' },
      { text: 'Sarah', type: 'sing', meaningAr: 'سارة' },
      { text: 'They', type: 'plur', meaningAr: 'هم' },
      { text: 'My brother', type: 'sing', meaningAr: 'أخي' }
    ];
  }, [builder]);

  // Parse verbs
  const verbsList = useMemo(() => {
    if (builder?.verbs && builder.verbs.length > 0) {
      return builder.verbs.map(v => ({
        base: v.base,
        conjugated: v.conjugated,
        meaningAr: v.meaningAr,
        v2: v.v2,
        v3: v.v3,
        ving: v.ving,
        complements: v.complements || getComplementsForVerb(v.base)
      }));
    }
    return [
      {
        base: 'drive',
        conjugated: 'drives',
        meaningAr: 'يقود',
        complements: getComplementsForVerb('drive')
      },
      {
        base: 'speak',
        conjugated: 'speaks',
        meaningAr: 'يتحدث',
        complements: getComplementsForVerb('speak')
      },
      {
        base: 'study',
        conjugated: 'studies',
        meaningAr: 'يدرس',
        complements: getComplementsForVerb('study')
      }
    ];
  }, [builder]);

  // Parse time phrases
  const timePhrasesList: TimeItem[] = useMemo(() => {
    const timeDictionary: Record<string, string> = {
      'every morning': 'كل صباح',
      'every day': 'كل يوم',
      'on weekends': 'في عطلات نهاية الأسبوع',
      'at night': 'ليلاً',
      'right now': 'في هذه اللحظة',
      'at the moment': 'حالياً',
      'currently': 'في الوقت الراهن',
      'this afternoon': 'بعد ظهر اليوم',
      'already': 'بالفعل',
      'recently': 'مؤخراً',
      'so far': 'حتى الآن',
      'yet': 'حتى هذه اللحظة',
      'yesterday': 'بالأمس',
      'last night': 'الليلة الماضية',
      'last weekend': 'عطلة نهاية الأسبوع الماضية',
      'two days ago': 'منذ يومين',
      'at 8 PM yesterday': 'في تمام الثامنة مساء أمس',
      'while cooking': 'أثناء الطهي',
      'before they arrived': 'قبل وصولهم',
      'by the time he called': 'بحلول الوقت الذي اتصل فيه',
      'for two hours': 'لمدة ساعتين',
      'for 40 minutes': 'لمدة 40 دقيقة',
      'since morning': 'منذ الصباح',
      'all afternoon': 'طوال فترة بعد الظهر',
      'tomorrow': 'غداً',
      'next week': 'الأسبوع القادم',
      'soon': 'قريباً',
      'this time next week': 'في مثل هذا الوقت الأسبوع القادم',
      'at 10 AM tomorrow': 'في العاشرة صباح الغد',
      'by 5 PM': 'بحلول الخامسة مساءً',
      'by next month': 'بحلول الشهر القادم',
      'by 2030': 'بحلول عام 2030',
      'for five years': 'لمدة 5 سنوات',
      'for ten years': 'لمدة 10 سنوات'
    };

    if (builder?.timePhrases && builder.timePhrases.length > 0) {
      return builder.timePhrases.map(t => {
        const text = typeof t === 'string' ? t : (t as any).text;
        const meaningAr = typeof t === 'object' && (t as any).meaningAr ? (t as any).meaningAr : (timeDictionary[text] || text);
        return { en: text, ar: meaningAr };
      });
    }
    return [
      { en: 'every day', ar: 'كل يوم' },
      { en: 'on weekends', ar: 'في عطلات نهاية الأسبوع' }
    ];
  }, [builder]);

  const [chosenSubjectIdx, setChosenSubjectIdx] = useState(0);
  const [chosenVerbIdx, setChosenVerbIdx] = useState(0);
  const [chosenComplementIdx, setChosenComplementIdx] = useState(0);
  const [chosenTimeIdx, setChosenTimeIdx] = useState(0);

  const selectedSubject = subjectsList[chosenSubjectIdx] || subjectsList[0];
  const selectedVerb = verbsList[chosenVerbIdx] || verbsList[0];
  const activeComplements = useMemo(() => {
    return selectedVerb.complements && selectedVerb.complements.length > 0
      ? selectedVerb.complements
      : getComplementsForVerb(selectedVerb.base);
  }, [selectedVerb]);

  const selectedComplement = activeComplements[chosenComplementIdx] || activeComplements[0];
  const selectedTime = timePhrasesList[chosenTimeIdx] || timePhrasesList[0];

  // Build the intelligent, grammatically accurate sentence
  const builtSentenceResult = useMemo(() => {
    return buildSvoSentence({
      tenseId: tense.id,
      subject: selectedSubject,
      verb: selectedVerb,
      complement: selectedComplement,
      timeMarker: selectedTime,
      formMode: builderFormMode,
      whWord: selectedWhWord
    });
  }, [tense.id, selectedSubject, selectedVerb, selectedComplement, selectedTime, builderFormMode, selectedWhWord]);

  // Handler for verb change to reset complement index
  const handleVerbSelect = (vIdx: number) => {
    setChosenVerbIdx(vIdx);
    setChosenComplementIdx(0);
  };

  // Randomize a sensible sentence
  const handleRandomize = () => {
    const randomSubIdx = Math.floor(Math.random() * subjectsList.length);
    const randomVerbIdx = Math.floor(Math.random() * verbsList.length);
    const v = verbsList[randomVerbIdx];
    const comps = v.complements && v.complements.length > 0 ? v.complements : getComplementsForVerb(v.base);
    const randomCompIdx = Math.floor(Math.random() * comps.length);
    const randomTimeIdx = Math.floor(Math.random() * timePhrasesList.length);
    const modes: SentenceFormMode[] = ['affirmative', 'negative', 'yes_no', 'wh_question'];
    const randomMode = modes[Math.floor(Math.random() * modes.length)];
    const randomWh = WH_WORDS_LIST[Math.floor(Math.random() * WH_WORDS_LIST.length)].en;

    setChosenSubjectIdx(randomSubIdx);
    setChosenVerbIdx(randomVerbIdx);
    setChosenComplementIdx(randomCompIdx);
    setChosenTimeIdx(randomTimeIdx);
    setBuilderFormMode(randomMode);
    setSelectedWhWord(randomWh);
  };

  const currentStructure = allStructures[selectedFormIndex] || allStructures[0];

  // Filtered Verbs in conjugation table
  const filteredVerbs = (svoData.verbTable || []).filter(v => {
    if (verbFilter === 'regular') return !v.isIrregular;
    if (verbFilter === 'irregular') return v.isIrregular;
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn" dir="rtl">
      
      {/* Header Banner */}
      <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1.5 h-full bg-blue-500"></div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30 mb-3">
          <Layers className="w-3.5 h-3.5" />
          الدرس 2: تركيب الجمل وجدول SVO + الأفعال المساعدة
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white font-arabic">
          هيكل بناء الجملة (Subject - Auxiliary - Verb - Object)
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl font-arabic">
          في اللغة الإنجليزية، يعتمد تركيب أي جملة على الترتيب الصارم لعناصرها. في هذا الدرس ستتعلم كيف توزع الفاعل، الفعل المساعد (إن وُجد)، الفعل الأساسي بالتصريف المناسب، والمفعول به.
        </p>

        {/* Core Rules List */}
        <div className="mt-4 pt-4 border-t border-slate-700 space-y-2">
          {svoData.rulesAr.map((r, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
              <span className="w-5 h-5 rounded-full bg-blue-500/30 flex items-center justify-center text-xs font-bold shrink-0 text-blue-300">
                {idx + 1}
              </span>
              <span>{r}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Auxiliary Verb Rule Spotlight */}
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
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <Users className="w-4 h-4 text-indigo-600" />
                <span className="font-arabic">تصنيف الفاعل الخاص بزمن ({tense.nameAr})</span>
              </div>
              <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200 font-arabic">
                قواعد الفاعل الدقيقة لهذا الزمن
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* 1. First-Person Pronoun Box (I) */}
              <div className="bg-indigo-50/70 border-2 border-indigo-200 rounded-lg p-3.5 space-y-2.5">
                <div className="text-xs font-bold text-indigo-900 font-arabic border-b border-indigo-200/80 pb-1.5 flex items-center justify-between">
                  <span>١. ضمير المتكلم (I)</span>
                  <span className="font-mono text-[11px] bg-indigo-200 text-indigo-900 font-black px-2 py-0.5 rounded" dir="ltr">
                    {isPresentCont ? 'I am' : isPresentPerf ? 'I have' : isPresentPerfCont ? 'I have been' : isPastCont ? 'I was' : 'I'}
                  </span>
                </div>
                <div className="text-xs text-slate-700 font-arabic space-y-1.5">
                  <div className="font-bold text-indigo-950">
                    <strong>الضمير:</strong> <span className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-indigo-200 text-indigo-700" dir="ltr">I (أنا)</span>
                  </div>
                  <div className="text-[11px] text-indigo-950 bg-white/90 p-2 rounded border border-indigo-100 leading-relaxed font-arabic space-y-1">
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
              <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-3.5 space-y-2">
                <div className="text-xs font-bold text-blue-900 font-arabic border-b border-blue-200 pb-1 flex items-center justify-between">
                  <span>٢. الفاعل المفرد (Singular)</span>
                  <span className="font-mono text-[11px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded" dir="ltr">
                    He / She / It
                  </span>
                </div>
                <div className="text-xs text-slate-700 font-arabic space-y-1.5">
                  <div><strong>ضمائر المفرد:</strong> {svoData.subjectClassification.singularPronouns.join(' ، ')}</div>
                  <div className="text-[11px] text-blue-950 bg-white/90 p-2 rounded border border-blue-100 leading-relaxed font-arabic space-y-1">
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
                      <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-xs font-mono text-slate-700">
                        {n.en} <span className="text-[10px] text-slate-400 font-arabic">({n.ar})</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Plural & You Subject Box */}
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-lg p-3.5 space-y-2">
                <div className="text-xs font-bold text-emerald-900 font-arabic border-b border-emerald-200 pb-1 flex items-center justify-between">
                  <span>٣. الفاعل الجمع والمخاطب (Plural & You)</span>
                  <span className="font-mono text-[11px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded" dir="ltr">
                    You / We / They
                  </span>
                </div>
                <div className="text-xs text-slate-700 font-arabic space-y-1.5">
                  <div><strong>ضمائر الجمع والمخاطب:</strong> {svoData.subjectClassification.pluralPronouns.filter(p => !p.startsWith('I ') && p !== 'I').join(' ، ')}</div>
                  <div className="text-[11px] text-emerald-950 bg-white/90 p-2 rounded border border-emerald-100 leading-relaxed font-arabic space-y-1">
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
                      <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-xs font-mono text-slate-700">
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

      {/* Verb Conjugation Table (V1 / V2 / V3) if present */}
      {svoData.verbTable && svoData.verbTable.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900 font-arabic">
                جدول تصريف الأفعال الأساسية المرتبطة بهذا الزمن (V1 - V2 - V3)
              </h3>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-arabic">
              <button
                onClick={() => setVerbFilter('all')}
                className={`px-2.5 py-1 rounded-md transition ${
                  verbFilter === 'all' ? 'bg-slate-800 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                الكل
              </button>
              <button
                onClick={() => setVerbFilter('irregular')}
                className={`px-2.5 py-1 rounded-md transition ${
                  verbFilter === 'irregular' ? 'bg-amber-600 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                غير منتظمة (شاذة)
              </button>
              <button
                onClick={() => setVerbFilter('regular')}
                className={`px-2.5 py-1 rounded-md transition ${
                  verbFilter === 'regular' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                منتظمة (+ed)
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse min-w-[500px]" dir="ltr">
              <thead>
                <tr className="bg-slate-100 text-slate-700 text-xs uppercase font-mono">
                  <th className="p-2.5 text-left">Verb Type</th>
                  <th className="p-2.5 text-left font-bold text-blue-700">V1 (التصريف الأول)</th>
                  <th className="p-2.5 text-left font-bold text-amber-700">V2 (التصريف الثاني)</th>
                  <th className="p-2.5 text-left font-bold text-emerald-700">V3 (التصريف الثالث)</th>
                  <th className="p-2.5 text-right font-arabic">المعنى العربي</th>
                  <th className="p-2.5 text-center">Audio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredVerbs.map((v, vIndex) => (
                  <tr key={vIndex} className="hover:bg-slate-50 transition">
                    <td className="p-2.5 text-left">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        v.isIrregular ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {v.isIrregular ? 'شاذ (Irregular)' : 'منتظم (Regular)'}
                      </span>
                    </td>
                    <td className="p-2.5 text-left font-mono font-bold text-blue-800 text-xs sm:text-sm">
                      {v.base}
                    </td>
                    <td className="p-2.5 text-left font-mono font-bold text-amber-800 text-xs sm:text-sm">
                      {v.v2}
                    </td>
                    <td className="p-2.5 text-left font-mono font-bold text-emerald-800 text-xs sm:text-sm">
                      {v.v3}
                    </td>
                    <td className="p-2.5 text-right font-arabic text-slate-700">
                      {v.meaningAr}
                    </td>
                    <td className="p-2.5 text-center">
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

      {/* SVO Form Tabs (Affirmative / Negative / Yes-No / Wh-) */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100/80 rounded-xl border border-slate-200">
          {allStructures.map((st, idx) => (
            <button
              key={st.formType + idx}
              onClick={() => setSelectedFormIndex(idx)}
              className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
                selectedFormIndex === idx
                  ? st.formType === 'wh_question'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>{st.formTitleAr}</span>
            </button>
          ))}
        </div>

        {/* Active SVO Structure Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-arabic flex items-center gap-2">
                <span>{currentStructure.formTitleAr}</span>
                {currentStructure.formType === 'wh_question' && (
                  <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold font-mono">
                    Wh- Questions
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-500 font-sans mt-0.5" dir="ltr">
                {currentStructure.formTitleEn}
              </p>
            </div>

            {/* Formula Chip */}
            <div className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold ${
              currentStructure.formType === 'wh_question'
                ? 'bg-indigo-50 border border-indigo-200 text-indigo-700'
                : 'bg-blue-50 border border-blue-200 text-blue-700'
            }`} dir="ltr">
              {currentStructure.formula}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed font-arabic">
            {currentStructure.explanationAr}
          </p>

          {/* Interactive SVO Data Table with Dedicated Wh- Question Column */}
          {(() => {
            const isWhQuestion = currentStructure.formType === 'wh_question';
            const isYesNoQuestion = currentStructure.formType === 'yes_no_question';

            return (
              <div className="overflow-x-auto rounded-lg border border-slate-200" dir="ltr">
                <table className="w-full text-left border-collapse min-w-[720px]" dir="ltr">
                  <thead>
                    <tr className="bg-[#1E293B] text-white text-xs uppercase font-semibold tracking-wider font-arabic">
                      {isWhQuestion ? (
                        <>
                          <th className="p-3 text-center rounded-tl-lg bg-indigo-950/95 text-indigo-200 border-r border-slate-700 font-bold">
                            أداة الاستفهام (Wh- Question)
                          </th>
                          <th className="p-3 text-center text-amber-300">الفعل المساعد (Auxiliary)</th>
                          <th className="p-3 text-center text-blue-300">الفاعل (Subject)</th>
                        </>
                      ) : isYesNoQuestion ? (
                        <>
                          <th className="p-3 text-center rounded-tl-lg text-amber-300">الفعل المساعد (Auxiliary)</th>
                          <th className="p-3 text-center text-blue-300">الفاعل (Subject)</th>
                        </>
                      ) : (
                        <>
                          <th className="p-3 text-center rounded-tl-lg text-blue-300">الفاعل (Subject)</th>
                          <th className="p-3 text-center text-amber-300">الفعل المساعد (Auxiliary)</th>
                        </>
                      )}
                      <th className="p-3 text-center text-emerald-300">الفعل الأساسي (Verb)</th>
                      <th className="p-3 text-center text-purple-300">المفعول/التكملة (Object)</th>
                      <th className="p-3 text-center text-amber-200">الدلالة الزمنية (Time)</th>
                      <th className="p-3 text-center rounded-tr-lg">الجملة كاملة + النطق</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {currentStructure.tableRows.map((row, rIdx) => {
                      const whWord = row.whWord || getRowWhWord(row) || (isWhQuestion ? 'Where' : '');
                      return (
                        <tr key={rIdx} className="hover:bg-blue-50/30 transition">
                          {isWhQuestion ? (
                            <>
                              <td className="p-3 text-center font-sans font-bold bg-indigo-50/60" dir="ltr">
                                <span className="px-2.5 py-1 bg-indigo-100 text-indigo-900 border border-indigo-200 rounded-md inline-flex items-center gap-1 text-xs font-bold shadow-2xs">
                                  <span>{whWord}</span>
                                  <span className="text-[10px] text-indigo-600 font-arabic font-normal">
                                    ({getWhArabicMeaning(whWord)})
                                  </span>
                                </span>
                              </td>
                              <td className="p-3 text-center font-sans font-semibold" dir="ltr">
                                <span className={`px-2 py-0.5 rounded-md inline-block text-xs font-semibold ${
                                  row.auxiliary === '-' || !row.auxiliary
                                    ? 'bg-slate-100 text-slate-400 font-mono'
                                    : 'bg-amber-100 text-amber-900'
                                }`}>
                                  {row.auxiliary || '-'}
                                </span>
                              </td>
                              <td className="p-3 text-center font-bold text-slate-800 bg-slate-50/60 font-sans" dir="ltr">
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md inline-block text-xs font-semibold">
                                  {row.subject}
                                </span>
                              </td>
                            </>
                          ) : isYesNoQuestion ? (
                            <>
                              <td className="p-3 text-center font-sans font-semibold" dir="ltr">
                                <span className={`px-2 py-0.5 rounded-md inline-block text-xs font-semibold ${
                                  row.auxiliary === '-' || !row.auxiliary
                                    ? 'bg-slate-100 text-slate-400 font-mono'
                                    : 'bg-amber-100 text-amber-900'
                                }`}>
                                  {row.auxiliary || '-'}
                                </span>
                              </td>
                              <td className="p-3 text-center font-bold text-slate-800 bg-slate-50/60 font-sans" dir="ltr">
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md inline-block text-xs font-semibold">
                                  {row.subject}
                                </span>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="p-3 text-center font-bold text-slate-800 bg-slate-50/60 font-sans" dir="ltr">
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md inline-block text-xs font-semibold">
                                  {row.subject}
                                </span>
                              </td>
                              <td className="p-3 text-center font-sans font-semibold" dir="ltr">
                                <span className={`px-2 py-0.5 rounded-md inline-block text-xs font-semibold ${
                                  row.auxiliary === '-' || !row.auxiliary
                                    ? 'bg-slate-100 text-slate-400 font-mono'
                                    : 'bg-amber-100 text-amber-900'
                                }`}>
                                  {row.auxiliary || '-'}
                                </span>
                              </td>
                            </>
                          )}
                          <td className="p-3 text-center font-bold text-emerald-700 font-sans" dir="ltr">
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded-md inline-block text-xs font-semibold">
                              {row.verb}
                            </span>
                            <div className="text-[10px] text-slate-400 font-arabic mt-0.5" dir="rtl">
                              {row.verbFormNote}
                            </div>
                          </td>
                          <td className="p-3 text-center text-slate-700 font-sans text-xs" dir="ltr">
                            {row.objectComplement}
                          </td>
                          <td className="p-3 text-center text-slate-500 font-sans text-xs" dir="ltr">
                            {row.timeMarker || '-'}
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex flex-col items-center gap-1">
                              <span className="font-bold text-slate-900 font-sans text-center text-xs sm:text-sm" dir="ltr">
                                {row.fullSentence}
                              </span>
                              <span className="text-xs text-slate-500 font-arabic text-center" dir="rtl">
                                {row.translationAr}
                              </span>
                              <button
                                onClick={() => playEnglishAudio(row.fullSentence)}
                                className="p-1 px-2 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold inline-flex items-center gap-1 mt-1 transition font-arabic"
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
            );
          })()}

          {/* Wh- Questions Complete Encyclopedia & Reference Guide */}
          {currentStructure.formType === 'wh_question' && (
            <div className="mt-8 pt-6 border-t border-slate-200" id="wh-reference-section">
              <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2 border border-indigo-500/30">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>دليل موسوعة أدوات الاستفهام الكاملة (16 أداة)</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-arabic">
                      جميع أدوات الاستفهام (Wh- Question Words) مع معانيها واستخداماتها
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 font-arabic">
                      تعرف على معاني كافة أدوات الاستفهام باللغة الإنجليزية، متى تُستخدم كل أداة، مع أمثلة ناطقة وصيغها النحوية القياسية
                    </p>
                  </div>

                  {/* Search and Category Filter */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={whSearchText}
                        onChange={(e) => setWhSearchText(e.target.value)}
                        placeholder="ابحث عن أداة أو معنى..."
                        className="w-full sm:w-48 pr-9 pl-3 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-arabic"
                      />
                    </div>
                  </div>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => setWhCategoryFilter('all')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold font-arabic transition ${
                      whCategoryFilter === 'all'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    جميع الأدوات ({ALL_WH_QUESTIONS_LIST.length})
                  </button>
                  <button
                    onClick={() => setWhCategoryFilter('core')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold font-arabic transition ${
                      whCategoryFilter === 'core'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    أدوات الاستفهام الأساسية ({ALL_WH_QUESTIONS_LIST.filter(i => i.category === 'core').length})
                  </button>
                  <button
                    onClick={() => setWhCategoryFilter('compound')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold font-arabic transition ${
                      whCategoryFilter === 'compound'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    أدوات How والمركبة ({ALL_WH_QUESTIONS_LIST.filter(i => i.category === 'compound').length})
                  </button>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ALL_WH_QUESTIONS_LIST.filter(item => {
                  if (whCategoryFilter !== 'all' && item.category !== whCategoryFilter) return false;
                  if (!whSearchText.trim()) return true;
                  const query = whSearchText.toLowerCase().trim();
                  return item.en.toLowerCase().includes(query) || item.ar.includes(query) || item.usageAr.includes(query);
                }).map((item) => (
                  <div
                    key={item.en}
                    className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-base font-bold text-indigo-900 px-2.5 py-0.5 bg-indigo-50 border border-indigo-100 rounded-md">
                            {item.en}
                          </span>
                          <button
                            onClick={() => playEnglishAudio(item.en)}
                            className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition"
                            title={`نطق ${item.en}`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-xs font-bold text-slate-800 font-arabic bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-md">
                          {item.ar}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 font-arabic leading-relaxed mb-3">
                        <span className="font-bold text-slate-700">الاستخدام: </span>
                        {item.usageAr}
                      </p>

                      <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 mb-3 text-xs">
                        <div className="text-[11px] font-bold text-slate-500 font-arabic mb-1">
                          الصيغة العامة (Formula):
                        </div>
                        <div className="font-mono text-[11px] text-slate-700" dir="ltr">
                          {item.formulaHint}
                        </div>
                      </div>

                      <div className="bg-indigo-50/50 border border-indigo-100 rounded-lg p-2.5 mb-3">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] font-bold text-indigo-700 font-arabic">مثال تطبيقي:</span>
                          <button
                            onClick={() => playEnglishAudio(item.exampleEn)}
                            className="p-0.5 rounded text-indigo-600 hover:bg-indigo-100 transition"
                            title="نطق المثال"
                          >
                            <Volume2 className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="font-medium text-slate-900 text-xs font-sans" dir="ltr">
                          {item.exampleEn}
                        </div>
                        <div className="text-xs text-slate-600 font-arabic mt-0.5" dir="rtl">
                          {item.exampleAr}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setBuilderFormMode('wh_question');
                        setSelectedWhWord(item.en);
                        const builderEl = document.getElementById('sentence-builder-playground');
                        if (builderEl) {
                          builderEl.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="w-full mt-2 py-2 px-3 rounded-lg bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 font-arabic text-xs font-bold border border-indigo-200 transition flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>جرّب تركيب جملة بهذه الأداة ({item.en})</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Advanced Interactive Sentence Builder Playground */}
      <div id="sentence-builder-playground" className="bg-[#0B132B] text-white rounded-2xl p-5 sm:p-7 border border-slate-800 shadow-lg relative overflow-hidden">
        
        {/* Glow Accent */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Lab Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-arabic flex items-center gap-2">
                <span>معمل تركيب الجمل التفاعلي الذكي</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono">
                  Smart SVO Engine
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-arabic">
                ركّب جملاً نموذجية منطقية ومتناسقة المعنى 100% مع تصريف القواعد التلقائي في زمن ({tense.nameAr})
              </p>
            </div>
          </div>

          {/* Randomize Button */}
          <button
            onClick={handleRandomize}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition active:scale-95 font-arabic"
            title="توليد جملة منطقية عشوائية"
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-400" />
            <span>🎲 جملة نموذجية عشوائية</span>
          </button>
        </div>

        {/* 1. Sentence Form Selector (Affirmative / Negative / Yes-No / Wh-) */}
        <div className="mb-4">
          <div className="text-xs font-bold text-slate-300 mb-2 font-arabic flex items-center gap-1.5">
            <span>اختر نمط الجملة المستهدفة:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            
            <button
              onClick={() => setBuilderFormMode('affirmative')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 font-arabic ${
                builderFormMode === 'affirmative'
                  ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/40'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>🟢 جملة مثبتة (+)</span>
            </button>

            <button
              onClick={() => setBuilderFormMode('negative')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 font-arabic ${
                builderFormMode === 'negative'
                  ? 'bg-rose-600 text-white shadow-md ring-2 ring-rose-400/40'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>🔴 جملة منفية (-)</span>
            </button>

            <button
              onClick={() => setBuilderFormMode('yes_no')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 font-arabic ${
                builderFormMode === 'yes_no'
                  ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-400/40'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>❓ سؤال نعم / لا (?)</span>
            </button>

            <button
              onClick={() => setBuilderFormMode('wh_question')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 font-arabic ${
                builderFormMode === 'wh_question'
                  ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400/40'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>🔍 سؤال استفساري (Wh-)</span>
            </button>

          </div>
        </div>

        {/* Wh- Question Word Selector Bar when Wh- Question Mode is Active */}
        {builderFormMode === 'wh_question' && (
          <div className="mb-5 bg-indigo-950/60 border border-indigo-800/80 rounded-xl p-3.5 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-indigo-300 font-arabic flex items-center gap-1.5">
                  <span>🔍 اختر أداة الاستفهام (Wh- Question Word):</span>
                </label>
                <span className="text-[11px] font-mono text-indigo-300/90 bg-indigo-900/60 px-2 py-0.5 rounded border border-indigo-700/50">
                  {selectedWhWord} ({getWhArabicMeaning(selectedWhWord)})
                </span>
              </div>

              {/* Quick Category filter within builder */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setWhCategoryFilter('all')}
                  className={`px-2 py-0.5 rounded text-[10px] font-arabic transition ${
                    whCategoryFilter === 'all'
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  الكل (16)
                </button>
                <button
                  onClick={() => setWhCategoryFilter('core')}
                  className={`px-2 py-0.5 rounded text-[10px] font-arabic transition ${
                    whCategoryFilter === 'core'
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  أساسية (8)
                </button>
                <button
                  onClick={() => setWhCategoryFilter('compound')}
                  className={`px-2 py-0.5 rounded text-[10px] font-arabic transition ${
                    whCategoryFilter === 'compound'
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  مركبة و How (8)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-1.5">
              {WH_WORDS_LIST.filter(item => whCategoryFilter === 'all' || item.category === whCategoryFilter).map((whItem) => (
                <button
                  key={whItem.en}
                  onClick={() => setSelectedWhWord(whItem.en)}
                  className={`p-2 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center text-center gap-0.5 ${
                    selectedWhWord === whItem.en
                      ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400/50'
                      : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                  }`}
                  title={whItem.desc}
                >
                  <span className="font-mono text-xs">{whItem.en}</span>
                  <span className="text-[10px] opacity-85 font-arabic font-normal">({whItem.ar})</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2. Interactive Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6" dir="ltr">
          
          {/* Block 1: Subject Selector */}
          <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold text-blue-400 font-mono uppercase tracking-wider">
                  1. Subject (الفاعل)
                </label>
                <span className="text-[10px] text-slate-400 font-arabic">
                  {selectedSubject.meaningAr}
                </span>
              </div>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {subjectsList.map((sub, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => setChosenSubjectIdx(sIdx)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition flex flex-col gap-0.5 ${
                      chosenSubjectIdx === sIdx
                        ? 'bg-blue-600 text-white font-bold shadow-xs'
                        : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800 border border-slate-800/60'
                    }`}
                  >
                    <span>{sub.text}</span>
                    <span className="text-[10px] opacity-75 font-arabic text-right w-full" dir="rtl">{sub.meaningAr}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Block 2: Verb Selector */}
          <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold text-emerald-400 font-mono uppercase tracking-wider">
                  2. Verb (الفعل)
                </label>
                <span className="text-[10px] text-slate-400 font-arabic">
                  {selectedVerb.meaningAr}
                </span>
              </div>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {verbsList.map((vObj, vIdx) => (
                  <button
                    key={vIdx}
                    onClick={() => handleVerbSelect(vIdx)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition flex flex-col gap-0.5 ${
                      chosenVerbIdx === vIdx
                        ? 'bg-emerald-600 text-white font-bold shadow-xs'
                        : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800 border border-slate-800/60'
                    }`}
                  >
                    <span className="font-mono">{vObj.base}</span>
                    <span className="text-[10px] opacity-75 font-arabic text-right w-full" dir="rtl">{vObj.meaningAr}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Block 3: Context-Aware Semantic Complements (No More Nonsense Combinations!) */}
          <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold text-purple-400 font-mono uppercase tracking-wider">
                  3. Object (تكملة ملائمة للفعل)
                </label>
                <span className="text-[10px] text-purple-300/80 font-mono text-[9px] bg-purple-950/60 px-1 rounded">
                  متوافق مع {selectedVerb.base}
                </span>
              </div>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {activeComplements.map((comp, cIdx) => (
                  <button
                    key={cIdx}
                    onClick={() => setChosenComplementIdx(cIdx)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition flex flex-col gap-0.5 ${
                      chosenComplementIdx === cIdx
                        ? 'bg-purple-600 text-white font-bold shadow-xs'
                        : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800 border border-slate-800/60'
                    }`}
                  >
                    <span className="truncate">{comp.en}</span>
                    <span className="text-[10px] opacity-75 font-arabic text-right truncate" dir="rtl">
                      {comp.ar}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Block 4: Time Marker Selector */}
          <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold text-amber-400 font-mono uppercase tracking-wider">
                  4. Time (الوقت والدلالة)
                </label>
                <span className="text-[10px] text-slate-400 font-arabic">
                  {selectedTime.ar}
                </span>
              </div>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {timePhrasesList.map((timeItem, tIdx) => (
                  <button
                    key={tIdx}
                    onClick={() => setChosenTimeIdx(tIdx)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition flex flex-col gap-0.5 ${
                      chosenTimeIdx === tIdx
                        ? 'bg-amber-600 text-white font-bold shadow-xs'
                        : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800 border border-slate-800/60'
                    }`}
                  >
                    <span>{timeItem.en}</span>
                    <span className="text-[10px] opacity-75 font-arabic text-right w-full" dir="rtl">{timeItem.ar}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* 3. Real-Time Assembled Sentence Card */}
        <div className="bg-slate-950/95 border border-slate-800 rounded-xl p-5 shadow-inner">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div className="space-y-2 text-right w-full" dir="rtl">
              
              {/* Structural Component Chips */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono" dir="ltr">
                {builtSentenceResult.components.whWord && (
                  <span className="px-2 py-0.5 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-700/60 font-semibold" title={builtSentenceResult.components.whWord.roleAr}>
                    Wh: {builtSentenceResult.components.whWord.text}
                  </span>
                )}
                {builtSentenceResult.components.auxiliary && (
                  <span className="px-2 py-0.5 rounded-md bg-amber-950 text-amber-300 border border-amber-700/60 font-semibold" title={builtSentenceResult.components.auxiliary.roleAr}>
                    Aux: {builtSentenceResult.components.auxiliary.text}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-md bg-blue-950 text-blue-300 border border-blue-700/60 font-semibold" title={builtSentenceResult.components.subject.roleAr}>
                  Sub: {builtSentenceResult.components.subject.text}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-700/60 font-semibold" title={builtSentenceResult.components.verb.roleAr}>
                  Verb ({builtSentenceResult.components.verb.formNameAr}): {builtSentenceResult.components.verb.text}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-purple-950 text-purple-300 border border-purple-700/60 font-semibold" title={builtSentenceResult.components.complement.roleAr}>
                  Obj: {builtSentenceResult.components.complement.text}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-amber-950 text-amber-300 border border-amber-700/60 font-semibold" title={builtSentenceResult.components.time.roleAr}>
                  Time: {builtSentenceResult.components.time.text}
                </span>
              </div>

              {/* English Sentence Display */}
              <div className="text-left font-sans font-bold text-xl sm:text-2xl text-emerald-300 tracking-wide mt-1" dir="ltr">
                "{builtSentenceResult.fullSentence}"
              </div>

              {/* Arabic Translation */}
              <div className="text-sm sm:text-base text-slate-300 font-arabic flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">الترجمة:</span>
                <span className="text-white font-medium">"{builtSentenceResult.translationAr}"</span>
              </div>

              {/* Grammar Rule in Action */}
              <div className="mt-2 pt-2 border-t border-slate-900 text-xs text-blue-300 font-arabic flex items-start gap-1.5">
                <span className="text-amber-400 shrink-0">💡</span>
                <span><strong>قاعدة التركيب المطبقة:</strong> {builtSentenceResult.ruleExplanationAr}</span>
              </div>

            </div>

            {/* Audio Pronunciation Button */}
            <div className="shrink-0 w-full md:w-auto flex md:flex-col items-center justify-end gap-2">
              <button
                onClick={() => playEnglishAudio(builtSentenceResult.fullSentence)}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-bold text-sm shadow-md transition active:scale-95 font-arabic"
              >
                <Volume2 className="w-4 h-4 text-slate-950" />
                <span>استمع لنطق جملتك</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Navigation Footer */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
        <button
          onClick={() => {
            onCompleteLesson();
            onNextLesson();
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-sm transition active:scale-95 mr-auto font-arabic"
        >
          <span>إتمام الدرس والانتقال إلى الأخطاء الشائعة</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

