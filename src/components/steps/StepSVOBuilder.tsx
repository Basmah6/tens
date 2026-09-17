import React, { useState, useMemo } from 'react';
import { Sparkles, Volume2, Shuffle, ArrowLeft, ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import { TenseData } from '../../types';
import { playEnglishAudio } from '../../utils/audio';
import {
  buildSvoSentence,
  getComplementsForVerb,
  getSubjectAr,
  SentenceFormMode,
  SubjectItem,
  TimeItem,
} from '../../utils/sentenceEngine';
import { ALL_WH_QUESTIONS_LIST } from '../../utils/whStructureHelper';

interface StepSVOBuilderProps {
  tense: TenseData;
  onNext: () => void;
  onPrev: () => void;
}

const WH_WORDS_LIST = ALL_WH_QUESTIONS_LIST.map((item) => ({
  en: item.en,
  ar: item.ar,
  desc: item.usageAr,
  category: item.category,
}));

export const StepSVOBuilder: React.FC<StepSVOBuilderProps> = ({ tense, onNext, onPrev }) => {
  const builder = tense.svoLesson.builderParts;
  const [builderFormMode, setBuilderFormMode] = useState<SentenceFormMode>('affirmative');
  const [selectedWhWord, setSelectedWhWord] = useState('Where');

  // Parse subjects with fallback
  const subjectsList: SubjectItem[] = useMemo(() => {
    if (builder?.subjects && builder.subjects.length > 0) {
      return builder.subjects.map((s) => ({
        text: s.text,
        type: s.type,
        meaningAr: s.meaningAr || getSubjectAr(s.text).ar,
      }));
    }
    return [
      { text: 'I', type: 'i', meaningAr: 'أنا' },
      { text: 'Sarah', type: 'sing', meaningAr: 'سارة' },
      { text: 'They', type: 'plur', meaningAr: 'هم' },
      { text: 'My brother', type: 'sing', meaningAr: 'أخي' },
    ];
  }, [builder]);

  // Parse verbs
  const verbsList = useMemo(() => {
    if (builder?.verbs && builder.verbs.length > 0) {
      return builder.verbs.map((v) => ({
        base: v.base,
        conjugated: v.conjugated,
        meaningAr: v.meaningAr,
        v2: v.v2,
        v3: v.v3,
        ving: v.ving,
        complements: v.complements || getComplementsForVerb(v.base),
      }));
    }
    return [
      {
        base: 'drive',
        conjugated: 'drives',
        meaningAr: 'يقود',
        complements: getComplementsForVerb('drive'),
      },
      {
        base: 'speak',
        conjugated: 'speaks',
        meaningAr: 'يتحدث',
        complements: getComplementsForVerb('speak'),
      },
      {
        base: 'study',
        conjugated: 'studies',
        meaningAr: 'يدرس',
        complements: getComplementsForVerb('study'),
      },
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
      'yesterday': 'بالأمس',
      'last night': 'الليلة الماضية',
      'tomorrow': 'غداً',
      'next week': 'الأسبوع القادم',
      'for two hours': 'لمدة ساعتين',
      'already': 'بالفعل',
      'recently': 'مؤخراً',
    };

    if (builder?.timePhrases && builder.timePhrases.length > 0) {
      return builder.timePhrases.map((t) => {
        const text = typeof t === 'string' ? t : (t as any).text;
        const meaningAr =
          typeof t === 'object' && (t as any).meaningAr
            ? (t as any).meaningAr
            : timeDictionary[text] || text;
        return { en: text, ar: meaningAr };
      });
    }
    return [
      { en: 'every day', ar: 'كل يوم' },
      { en: 'on weekends', ar: 'في عطلات نهاية الأسبوع' },
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

  // Build the sentence result
  const builtSentenceResult = useMemo(() => {
    return buildSvoSentence({
      tenseId: tense.id,
      subject: selectedSubject,
      verb: selectedVerb,
      complement: selectedComplement,
      timeMarker: selectedTime,
      formMode: builderFormMode,
      whWord: selectedWhWord,
    });
  }, [tense.id, selectedSubject, selectedVerb, selectedComplement, selectedTime, builderFormMode, selectedWhWord]);

  // Verb select reset
  const handleVerbSelect = (vIdx: number) => {
    setChosenVerbIdx(vIdx);
    setChosenComplementIdx(0);
  };

  // Randomizer
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

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn" dir="rtl">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>معمل تركيب الجمل التفاعلي الذكي (Smart SVO Playground)</span>
          </div>

          <button
            onClick={handleRandomize}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition font-arabic"
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-600" />
            <span>🎲 توليد جملة عشوائية</span>
          </button>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 font-arabic">
          ركّب جملك الخاصة في زمن ({tense.nameAr})
        </h2>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-arabic">
          اختر الفاعل، الفعل، المفعول به، والدلالة الزمنية لمشاهدة كيف يقوم المحرك الذكي بتصريف الفعل وإضافة الأفعال المساعدة تلقائياً بدقة 100%.
        </p>
      </div>

      {/* 1. Sentence Mode Selector */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-2.5">
        <div className="text-xs font-bold text-slate-700 font-arabic">
          1. اختر صيغة الجملة المطلوبة:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => setBuilderFormMode('affirmative')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition font-arabic ${
              builderFormMode === 'affirmative'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            🟢 جملة مثبتة (+)
          </button>

          <button
            onClick={() => setBuilderFormMode('negative')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition font-arabic ${
              builderFormMode === 'negative'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            🔴 جملة منفية (-)
          </button>

          <button
            onClick={() => setBuilderFormMode('yes_no')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition font-arabic ${
              builderFormMode === 'yes_no'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            ❓ سؤال نعم / لا (?)
          </button>

          <button
            onClick={() => setBuilderFormMode('wh_question')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition font-arabic ${
              builderFormMode === 'wh_question'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            🔎 سؤال Wh- Question
          </button>
        </div>

        {builderFormMode === 'wh_question' && (
          <div className="pt-2">
            <div className="text-[11px] font-bold text-slate-500 font-arabic mb-1">اختر أداة الاستفهام:</div>
            <div className="flex flex-wrap gap-1.5" dir="ltr">
              {['Where', 'When', 'Why', 'What', 'How', 'How often', 'Who'].map((w) => (
                <button
                  key={w}
                  onClick={() => setSelectedWhWord(w)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition ${
                    selectedWhWord === w
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. Interactive Element Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" dir="ltr">
        {/* Subject Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-2 text-right">
          <div className="text-xs font-bold text-blue-700 font-arabic flex items-center justify-between" dir="rtl">
            <span>الفاعل (Subject)</span>
            <span className="text-[10px] text-slate-400 font-mono">[{selectedSubject.type}]</span>
          </div>
          <div className="space-y-1.5" dir="rtl">
            {subjectsList.slice(0, 4).map((sub, sIdx) => (
              <button
                key={sIdx}
                onClick={() => setChosenSubjectIdx(sIdx)}
                className={`w-full p-2.5 rounded-xl text-xs font-medium transition flex flex-col items-start justify-center gap-0.5 ${
                  chosenSubjectIdx === sIdx
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                <span className="font-mono font-bold text-xs leading-tight block w-full text-left" dir="ltr">{sub.text}</span>
                <span className="text-[11px] opacity-85 font-arabic leading-tight block w-full text-right" dir="rtl">{sub.meaningAr}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Verb Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-2 text-right">
          <div className="text-xs font-bold text-emerald-700 font-arabic" dir="rtl">
            الفعل الأساسي (Verb)
          </div>
          <div className="space-y-1.5" dir="rtl">
            {verbsList.slice(0, 4).map((v, vIdx) => (
              <button
                key={vIdx}
                onClick={() => handleVerbSelect(vIdx)}
                className={`w-full p-2.5 rounded-xl text-xs font-medium transition flex flex-col items-start justify-center gap-0.5 ${
                  chosenVerbIdx === vIdx
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                <span className="font-mono font-bold text-xs leading-tight block w-full text-left" dir="ltr">{v.base}</span>
                <span className="text-[11px] opacity-85 font-arabic leading-tight block w-full text-right" dir="rtl">{v.meaningAr}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Object / Complement Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-2 text-right">
          <div className="text-xs font-bold text-purple-700 font-arabic" dir="rtl">
            المفعول / التكملة (Object)
          </div>
          <div className="space-y-1.5" dir="rtl">
            {activeComplements.slice(0, 4).map((comp, cIdx) => (
              <button
                key={cIdx}
                onClick={() => setChosenComplementIdx(cIdx)}
                className={`w-full p-2.5 rounded-xl text-xs font-medium transition flex flex-col items-start justify-center gap-0.5 ${
                  chosenComplementIdx === cIdx
                    ? 'bg-purple-600 text-white font-bold shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                <span className="font-mono text-left font-bold text-xs leading-tight block w-full" dir="ltr">{comp.en}</span>
                <span className="text-[11px] opacity-85 font-arabic leading-tight block w-full text-right" dir="rtl">{comp.ar}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Marker Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-2 text-right">
          <div className="text-xs font-bold text-amber-800 font-arabic" dir="rtl">
            الدلالة الزمنية (Time)
          </div>
          <div className="space-y-1.5" dir="rtl">
            {timePhrasesList.slice(0, 4).map((t, tIdx) => (
              <button
                key={tIdx}
                onClick={() => setChosenTimeIdx(tIdx)}
                className={`w-full p-2.5 rounded-xl text-xs font-medium transition flex flex-col items-start justify-center gap-0.5 ${
                  chosenTimeIdx === tIdx
                    ? 'bg-amber-600 text-white font-bold shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                <span className="font-mono text-left font-bold text-xs leading-tight block w-full" dir="ltr">{t.en}</span>
                <span className="text-[11px] opacity-85 font-arabic leading-tight block w-full text-right" dir="rtl">{t.ar}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generated Live Output Banner */}
      <div className="bg-[#0F172A] text-white rounded-2xl p-6 border border-slate-800 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="text-xs font-bold text-amber-300 font-arabic flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>الجملة المكونة النموذجية (Live Result):</span>
          </div>

          <button
            onClick={() => playEnglishAudio(builtSentenceResult.fullSentence)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition active:scale-95 font-arabic shadow-xs"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>نطق الجملة</span>
          </button>
        </div>

        <div className="space-y-2">
          <div className="text-lg sm:text-2xl font-bold font-sans text-emerald-400 tracking-wide text-left" dir="ltr">
            {builtSentenceResult.fullSentence}
          </div>
          <div className="text-sm text-slate-300 font-arabic">
            {builtSentenceResult.translationAr}
          </div>
        </div>

        {/* Structural Analysis Breakdown */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-2 text-xs" dir="ltr">
          {builtSentenceResult.components?.whWord && (
            <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-700">
              Wh: <strong>{builtSentenceResult.components.whWord.text}</strong>
            </span>
          )}
          {builtSentenceResult.components?.auxiliary && (
            <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-700">
              Aux: <strong>{builtSentenceResult.components.auxiliary.text}</strong>
            </span>
          )}
          {builtSentenceResult.components?.subject && (
            <span className="px-2.5 py-1 rounded bg-blue-950 text-blue-300 border border-blue-700">
              Subject: <strong>{builtSentenceResult.components.subject.text}</strong>
            </span>
          )}
          {builtSentenceResult.components?.verb && (
            <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
              Verb: <strong>{builtSentenceResult.components.verb.text}</strong>
            </span>
          )}
          {builtSentenceResult.components?.complement && (
            <span className="px-2.5 py-1 rounded bg-purple-950 text-purple-300 border border-purple-700">
              Object: <strong>{builtSentenceResult.components.complement.text}</strong>
            </span>
          )}
          {builtSentenceResult.components?.time && (
            <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Time: <strong>{builtSentenceResult.components.time.text}</strong>
            </span>
          )}
        </div>
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
          <span>الانتقال إلى الأخطاء الشائعة</span>
          <ArrowLeft className="w-4 h-4 rotate-180" />
        </button>
      </div>
    </div>
  );
};
