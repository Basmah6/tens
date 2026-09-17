import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Send, 
  Volume2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Lightbulb, 
  History, 
  HelpCircle,
  Copy,
  Check,
  Trash2,
  RotateCcw,
  Clock,
  Award,
  Search,
  ChevronDown,
  ChevronUp,
  CornerDownLeft,
  Target,
  Scale,
  Layers,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { TenseData, UserTenseProgress } from '../types';
import { playEnglishAudio } from '../utils/audio';
import { evaluateSentenceLocal, GrammarEvaluationResult } from '../utils/grammarChecker';

interface LessonFreeWritingProps {
  tense: TenseData;
  progress?: UserTenseProgress;
  onSaveFreeSentence: (sentence: string, score: number, feedback: string) => void;
  onDeleteFreeSentence?: (index: number) => void;
  onClearAllSentences?: () => void;
  onCompleteLesson: () => void;
  onNextLesson: () => void;
}

export const LessonFreeWriting: React.FC<LessonFreeWritingProps> = ({
  tense,
  progress,
  onSaveFreeSentence,
  onDeleteFreeSentence,
  onClearAllSentences,
  onCompleteLesson,
  onNextLesson,
}) => {
  const freeData = tense.freeWriteLesson;
  const [inputSentence, setInputSentence] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<GrammarEvaluationResult | null>(null);

  // History interaction state
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterScore, setFilterScore] = useState<'all' | 'high' | 'needs_work'>('all');
  const [expandedFeedbackIndices, setExpandedFeedbackIndices] = useState<number[]>([]);

  const savedSentences = progress?.freeSentences || [];

  const handleUsePromptStarter = (starter: string) => {
    setInputSentence(starter);
    const textareaEl = document.getElementById('free-writing-textarea');
    if (textareaEl) {
      textareaEl.focus();
    }
  };

  const handleReuseSentence = (text: string) => {
    setInputSentence(text);
    const textareaEl = document.getElementById('free-writing-textarea');
    if (textareaEl) {
      textareaEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      textareaEl.focus();
    }
  };

  const handleCopySentence = (text: string, originalIndex: number) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedIdx(originalIndex);
      setTimeout(() => setCopiedIdx(null), 2000);
    }
  };

  const toggleFeedback = (originalIndex: number) => {
    setExpandedFeedbackIndices(prev =>
      prev.includes(originalIndex)
        ? prev.filter(i => i !== originalIndex)
        : [...prev, originalIndex]
    );
  };

  const formatSentenceDate = (isoString?: string) => {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleDateString('ar-SA', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  // Filtered and reversed list (newest first)
  const displayedHistory = useMemo(() => {
    return savedSentences
      .map((item, originalIndex) => ({ item, originalIndex }))
      .filter(({ item }) => {
        if (filterScore === 'high' && (item.score || 0) < 80) return false;
        if (filterScore === 'needs_work' && (item.score || 0) >= 80) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchSentence = (item.sentence || '').toLowerCase().includes(q);
          const matchFeedback = (item.feedback || '').toLowerCase().includes(q);
          return matchSentence || matchFeedback;
        }
        return true;
      })
      .reverse();
  }, [savedSentences, filterScore, searchQuery]);

  const stats = useMemo(() => {
    if (savedSentences.length === 0) return null;
    const total = savedSentences.length;
    const avg = Math.round(savedSentences.reduce((sum, s) => sum + (s.score || 0), 0) / total);
    const max = Math.max(...savedSentences.map(s => s.score || 0));
    const highCount = savedSentences.filter(s => (s.score || 0) >= 80).length;
    return { total, avg, max, highCount };
  }, [savedSentences]);

  const handleEvaluate = async () => {
    if (!inputSentence.trim()) return;

    setIsEvaluating(true);
    // Directly evaluate using the target structure, SVO syntax breakdown, and subject-verb agreement
    setTimeout(() => {
      const localRes = evaluateSentenceLocal(tense.id, inputSentence.trim());
      setEvaluationResult(localRes);
      onSaveFreeSentence(inputSentence.trim(), localRes.score, localRes.explanationAr);
      setIsEvaluating(false);
    }, 250);
  };

  return (
    <div className="space-y-6 animate-fadeIn" dir="rtl">
      
      {/* Header Banner */}
      <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1.5 h-full bg-violet-500"></div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-semibold border border-violet-400/30 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          الدرس 6: تكوين الجمل الحر والمدرب الذكي
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white">
          اكتب جملتك الخاصة بزمن ({tense.nameAr})
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl">
          {freeData.instructionAr}
        </p>

        {/* Structural Formula Reminder */}
        <div className="mt-4 pt-4 border-t border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-3 font-mono text-emerald-300">
            <span className="font-arabic text-slate-400">الهيكل المستهدف:</span>
            <span className="bg-slate-900/80 px-2.5 py-1 rounded border border-slate-700" dir="ltr">
              {freeData.structuralGuide}
            </span>
          </div>

          {savedSentences.length > 0 && (
            <div className="flex items-center gap-2 text-slate-300 font-arabic text-xs">
              <History className="w-3.5 h-3.5 text-amber-400" />
              <span>جمل مسجلة في سجلك: <strong className="text-amber-400 font-mono">{savedSentences.length}</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* Inspirational Prompt Cards */}
      <div className="space-y-3">
        <h3 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-2 font-arabic">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          أفكار مقترحة لكتابة جملتك (انقر لاقتباس البداية):
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {freeData.scenarios.map((sc, sIdx) => (
            <div 
              key={sIdx}
              onClick={() => handleUsePromptStarter(sc.starter)}
              className="bg-white border border-slate-200 rounded-xl p-4 cursor-pointer hover:border-blue-500 hover:shadow-xs transition group"
            >
              <h4 className="text-xs font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition">
                {sc.titleAr}
              </h4>
              <p className="text-xs text-slate-600 mb-2.5 leading-relaxed">
                {sc.promptAr}
              </p>
              <div className="text-[11px] font-mono text-blue-700 bg-blue-50 p-2 rounded-md font-bold" dir="ltr">
                "{sc.exampleTarget}"
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Free Writing Editor Sandbox */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm">
        <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2 font-arabic">
          اكتب جملتك باللغة الإنجليزية هنا:
        </label>
        
        <div className="relative">
          <textarea
            id="free-writing-textarea"
            rows={3}
            value={inputSentence}
            onChange={(e) => setInputSentence(e.target.value)}
            placeholder={`Type your custom ${tense.nameEn} sentence here... (e.g. ${freeData.scenarios[0]?.exampleTarget || ''})`}
            className="w-full p-3.5 rounded-lg border border-slate-300 text-slate-900 text-base font-sans font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition tracking-wide text-left"
            dir="ltr"
          />
        </div>

        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3">
          <button
            disabled={!inputSentence.trim() || isEvaluating}
            onClick={handleEvaluate}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-xs sm:text-sm shadow-xs transition active:scale-95 ${
              inputSentence.trim() && !isEvaluating
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isEvaluating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                <span>جاري فحص الجملة وتحليل SVO...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>فحص الجملة (مطابقة الهيكل و SVO والتوافق النحوي)</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            {inputSentence.trim() && (
              <button
                onClick={() => playEnglishAudio(inputSentence)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold transition cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                <span>استمع لنطق جملتك</span>
              </button>
            )}

            {inputSentence.trim() && (
              <button
                onClick={() => setInputSentence('')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-xs transition cursor-pointer font-arabic"
              >
                <span>مسح المربع</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* AI Grammar Evaluation Analysis Report */}
      {evaluationResult && (
        <div className="border rounded-2xl p-5 sm:p-7 shadow-md transition animate-fadeIn bg-[#0F172A] text-white border-slate-700/80 space-y-5">
          {/* Result Header & Score */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                {evaluationResult.isCorrect && evaluationResult.tenseMatch ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    جملة ممتازة ومطابقة لقواعد الزمن! (تم حفظها في سجلك)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    تحتاج الجملة إلى بعض التعديلات البسيطة (تم حفظها في سجلك)
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mt-2 text-white font-arabic">
                تقرير فحص جملتك بالتفصيل الكامل
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-arabic mt-1 leading-relaxed">
                تحليل دقيق وشامل لأركان جملتك وتوافق الفعل والفاعل والصيغة المستهدفة لـ ({tense.nameAr}).
              </p>
            </div>

            {/* Score Badge */}
            <div className="text-center bg-slate-900 px-5 py-2.5 rounded-xl border border-slate-700 shrink-0 self-start sm:self-auto">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">
                {evaluationResult.score}%
              </div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-bold mt-0.5">
                درجة الدقة
              </div>
            </div>
          </div>

          {/* التقييم النحوي العام الشامل للجملة */}
          {evaluationResult.explanationAr && (
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 sm:p-5 text-right">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-blue-300 font-arabic">
                    الخلاصة النحوية للتحليل:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-arabic break-words">
                    {evaluationResult.explanationAr}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Spontaneous / Casual Writing Notice Card (Full Details) */}
          {evaluationResult.spontaneousFormatting?.hasCasualSpelling && (
            <div className="bg-sky-950/60 border border-sky-500/40 rounded-xl p-4 text-right">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold text-sky-200 font-arabic">
                      كتابة عفوية مقبولة ✅ (بدون أي خصم درجات)
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      معالجة ذكية
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-sky-200/90 font-arabic leading-relaxed break-words">
                    {evaluationResult.spontaneousFormatting.politeTipAr}
                  </p>
                  {evaluationResult.spontaneousFormatting.detectedItems && evaluationResult.spontaneousFormatting.detectedItems.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs font-semibold text-sky-300 font-arabic">الكلمات التلقائية المكتشفة:</span>
                      {evaluationResult.spontaneousFormatting.detectedItems.map((item, iIdx) => (
                        <span key={iIdx} className="inline-flex items-center gap-1 font-mono text-xs bg-slate-900/80 px-2.5 py-1 rounded-md border border-sky-500/30 text-emerald-300 font-bold" dir="ltr">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 1. تفكيك أركان الجملة بشكل كامل وواضح (Responsive 5 Elements Breakdown) */}
          <div className="bg-slate-900/95 border border-slate-700/90 rounded-xl overflow-hidden">
            <div className="bg-slate-800/90 px-4 py-3 border-b border-slate-700 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <span className="text-xs sm:text-sm font-bold text-slate-100 font-arabic">
                  تفكيك أركان الجملة المكتوبة (SVO Elements)
                </span>
              </div>
              <span className="text-xs text-slate-400 font-arabic">
                عرض كامل لجميع عناصر الجملة بدون أي اقتطاع
              </span>
            </div>

            {/* Elements Cards Grid - Displays full text with word wrapping, never truncated */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-slate-800 p-2 sm:p-0">
              {/* 1. Subject */}
              <div className="p-3.5 flex flex-col justify-between bg-slate-900/40 hover:bg-slate-800/40 transition">
                <div>
                  <div className="text-[11px] font-bold text-blue-300 font-arabic flex items-center justify-between mb-1.5">
                    <span>1. الفاعل (Subject)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800">
                      {evaluationResult.svoStatus?.hasSubject ? 'محدد ✅' : 'ينقص فاعل ⚠️'}
                    </span>
                  </div>
                  <div className="font-mono font-bold text-white text-sm sm:text-base break-words mt-1" dir="ltr">
                    {evaluationResult.breakdown.subject || '-'}
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 font-arabic mt-2 pt-2 border-t border-slate-800/60">
                  {evaluationResult.agreementStatus?.subjectTypeAr ? `النوع: ${evaluationResult.agreementStatus.subjectTypeAr}` : 'ركن أساسي'}
                </div>
              </div>

              {/* 2. Auxiliary */}
              <div className="p-3.5 flex flex-col justify-between bg-slate-900/40 hover:bg-slate-800/40 transition">
                <div>
                  <div className="text-[11px] font-bold text-amber-300 font-arabic flex items-center justify-between mb-1.5">
                    <span>2. المساعد (Auxiliary)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800">
                      {evaluationResult.breakdown.auxiliary && evaluationResult.breakdown.auxiliary !== '-' ? 'موجود' : 'غير مطلوب'}
                    </span>
                  </div>
                  <div className="font-mono font-bold text-amber-200 text-sm sm:text-base break-words mt-1" dir="ltr">
                    {evaluationResult.breakdown.auxiliary || '-'}
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 font-arabic mt-2 pt-2 border-t border-slate-800/60">
                  فعل مساعد للزمن
                </div>
              </div>

              {/* 3. Main Verb */}
              <div className="p-3.5 flex flex-col justify-between bg-slate-900/40 hover:bg-slate-800/40 transition">
                <div>
                  <div className="text-[11px] font-bold text-emerald-300 font-arabic flex items-center justify-between mb-1.5">
                    <span>3. الفعل الأساسي (Verb)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800">
                      {evaluationResult.svoStatus?.hasVerb ? 'موجود ✅' : 'ينقص فعل ⚠️'}
                    </span>
                  </div>
                  <div className="font-mono font-bold text-emerald-300 text-sm sm:text-base break-words mt-1" dir="ltr">
                    {evaluationResult.breakdown.mainVerb || '-'}
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 font-arabic mt-2 pt-2 border-t border-slate-800/60">
                  صيغة وتصريف الفعل
                </div>
              </div>

              {/* 4. Object / Complement - Complete, Never Truncated */}
              <div className="p-3.5 flex flex-col justify-between bg-slate-900/40 hover:bg-slate-800/40 transition sm:col-span-2 lg:col-span-1">
                <div>
                  <div className="text-[11px] font-bold text-purple-300 font-arabic flex items-center justify-between mb-1.5">
                    <span>4. التكملة / المفعول</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800">
                      {evaluationResult.svoStatus?.hasObjectComplement ? 'مكتملة ✅' : '-'}
                    </span>
                  </div>
                  <div className="font-mono font-bold text-purple-200 text-sm sm:text-base break-words whitespace-normal leading-relaxed mt-1" dir="ltr">
                    {evaluationResult.breakdown.objectComplement || '-'}
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 font-arabic mt-2 pt-2 border-t border-slate-800/60">
                  بقية الجملة والتفاصيل
                </div>
              </div>

              {/* 5. Time Marker */}
              <div className="p-3.5 flex flex-col justify-between bg-slate-900/40 hover:bg-slate-800/40 transition">
                <div>
                  <div className="text-[11px] font-bold text-rose-300 font-arabic flex items-center justify-between mb-1.5">
                    <span>5. دلالة الوقت (Time)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800">
                      {evaluationResult.breakdown.timeMarker ? 'محدد' : 'اختياري'}
                    </span>
                  </div>
                  <div className="font-mono font-bold text-rose-300 text-sm sm:text-base break-words mt-1" dir="ltr">
                    {evaluationResult.breakdown.timeMarker || '-'}
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 font-arabic mt-2 pt-2 border-t border-slate-800/60">
                  الظرف الزمني إن وُجد
                </div>
              </div>
            </div>
          </div>

          {/* 2. معايير الفحص النحوي الثلاثة بتفاصيلها الكاملة */}
          <div className="bg-slate-900/95 border border-slate-700/90 rounded-xl overflow-hidden space-y-0">
            <div className="bg-slate-800/90 px-4 py-3 border-b border-slate-700 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <span className="text-xs sm:text-sm font-bold text-slate-100 font-arabic">
                  معايير التدقيق النحوي الثلاثة (شاملة ومفصلة)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400 font-arabic">الهيكل المستهدف:</span>
                <span className="text-xs font-mono font-bold text-emerald-300 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700" dir="ltr">
                  {evaluationResult.targetStructure || freeData.structuralGuide}
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-800 text-xs sm:text-sm font-arabic">
              {/* معيار 1: شكل الزمن */}
              <div className="p-4 hover:bg-slate-850/40 transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-300 border border-blue-500/40 flex items-center justify-center text-xs">1</span>
                    <span>شكل وتركيب الزمن ({tense.nameAr})</span>
                  </div>
                  <div>
                    {evaluationResult.targetStructureStatus?.isMatched ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        مطابق تماماً لصيغة الزمن
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        يحتاج إلى ضبط صيغة الزمن
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed text-xs sm:text-sm pr-7 break-words">
                  {evaluationResult.targetStructureStatus?.detailsAr || evaluationResult.explanationAr}
                </p>
              </div>

              {/* معيار 2: ترتيب الكلمات */}
              <div className="p-4 hover:bg-slate-850/40 transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-amber-600/30 text-amber-300 border border-amber-500/40 flex items-center justify-center text-xs">2</span>
                    <span>ترتيب الكلمات داخل الهيكل (SVO Order)</span>
                  </div>
                  <div>
                    {evaluationResult.svoStatus?.isOrderValid ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
                        <Check className="w-3.5 h-3.5 text-blue-400" />
                        ترتيب تسلسلي سليم
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        راجع تسلسل الكلمات
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed text-xs sm:text-sm pr-7 break-words">
                  {evaluationResult.svoStatus?.summaryAr || 'تسلسل الكلمات: الفاعل أولاً، يليه الفعل المساعد والأساسي، ثم المفعول به أو التكملة.'}
                </p>
              </div>

              {/* معيار 3: توافق الفاعل والفعل */}
              <div className="p-4 hover:bg-slate-850/40 transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 flex items-center justify-center text-xs">3</span>
                    <span>توافق الفعل مع الفاعل (Subject-Verb Agreement)</span>
                  </div>
                  <div>
                    {evaluationResult.agreementStatus?.isValid ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        متوافق نحويّاً تماماً
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        عدم تطابق بين الفاعل والفعل
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-slate-300 leading-relaxed text-xs sm:text-sm pr-7 break-words">
                  {evaluationResult.agreementStatus?.subjectTypeAr && (
                    <span className="font-semibold text-purple-300 ml-1.5">
                      [{evaluationResult.agreementStatus.subjectTypeAr}]:
                    </span>
                  )}
                  {evaluationResult.agreementStatus?.ruleAppliedAr || evaluationResult.agreementStatus?.detailsAr || 'الفعل متناسق مع نوع الفاعل من حيث الإفراد والجمع.'}
                </div>
              </div>
            </div>
          </div>

          {/* نصائح وتصويبات التعديل إن وُجدت */}
          {evaluationResult.corrections && evaluationResult.corrections.length > 0 && (
            <div className="bg-rose-950/40 border border-rose-500/40 p-4 sm:p-5 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-2 text-xs sm:text-sm text-rose-200 font-arabic flex-1">
                <span className="font-bold block text-rose-300 text-sm">
                  ملاحظات التعديل والتصويب المقترحة:
                </span>
                <div className="space-y-1.5">
                  {evaluationResult.corrections.map((corr, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2 text-rose-200 leading-relaxed break-words">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{corr}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* الصياغة النموذجية للمتحدث الأصلي والاستماع الصوتي */}
          {evaluationResult.naturalAlternative && (
            <div className="bg-slate-800/90 border border-slate-700 p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-blue-300 font-arabic">
                    💡 الصياغة النموذجية للجملة بالإنجليزية السليمة:
                  </span>
                </div>
                <p className="text-sm sm:text-base font-bold text-emerald-300 font-sans tracking-wide break-words text-left" dir="ltr">
                  "{evaluationResult.naturalAlternative}"
                </p>
              </div>
              <button
                onClick={() => playEnglishAudio(evaluationResult.naturalAlternative)}
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm shrink-0 cursor-pointer transition shadow-md flex items-center justify-center gap-2 px-4 self-start sm:self-auto"
                title="استمع للنطق الصحيح"
              >
                <Volume2 className="w-4 h-4" />
                <span className="font-arabic font-bold">استمع للنطق</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* Sentence History Section (سجل الجمل المدخلة) */}
      {/* ---------------------------------------------------- */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-4">
        {/* History Header & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center border border-amber-500/20 shadow-xs">
              <History className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 font-arabic">
                  سجل الجمل المدخلة لهذا الزمن
                </h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  {savedSentences.length} {savedSentences.length === 1 ? 'جملة' : 'جمل'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-arabic">
                أرشيف الجمل التي ألفتها مع تفاصيل التقييم وملاحظات المدرب
              </p>
            </div>
          </div>

          {/* Right Action: Clear All */}
          {savedSentences.length > 0 && onClearAllSentences && (
            <div>
              {showClearConfirm ? (
                <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg">
                  <span className="text-xs text-rose-700 font-bold font-arabic">مسح جميع الجمل؟</span>
                  <button
                    onClick={() => {
                      onClearAllSentences();
                      setShowClearConfirm(false);
                    }}
                    className="px-2.5 py-1 text-xs rounded bg-rose-600 hover:bg-rose-700 text-white font-bold transition cursor-pointer font-arabic"
                  >
                    نعم، احذف الكل
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="px-2 py-1 text-xs rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition cursor-pointer font-arabic"
                  >
                    إلغاء
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-600 transition font-arabic px-2.5 py-1.5 rounded-lg hover:bg-rose-50 cursor-pointer"
                  title="مسح سجل الجمل المدخلة لهذا الزمن"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>مسح السجل</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Statistical Summary Bar */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
              <div className="text-[11px] text-slate-500 font-arabic font-medium">إجمالي الجمل المدخلة</div>
              <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">{stats.total}</div>
            </div>
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3 text-center">
              <div className="text-[11px] text-emerald-700 font-arabic font-medium">متوسط الدقة</div>
              <div className="text-lg font-bold font-mono text-emerald-700 mt-0.5">{stats.avg}%</div>
            </div>
            <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3 text-center">
              <div className="text-[11px] text-blue-700 font-arabic font-medium">أعلى درجة تم تحقيقها</div>
              <div className="text-lg font-bold font-mono text-blue-700 mt-0.5">{stats.max}%</div>
            </div>
            <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 text-center">
              <div className="text-[11px] text-amber-800 font-arabic font-medium">جمل ممتازة (80%+)</div>
              <div className="text-lg font-bold font-mono text-amber-800 mt-0.5">{stats.highCount}</div>
            </div>
          </div>
        )}

        {/* Filter & Search Toolbar when more than 3 sentences */}
        {savedSentences.length > 3 && (
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في الجمل المدخلة أو الملاحظات..."
                className="w-full pr-8 pl-3 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-arabic"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setFilterScore('all')}
                className={`px-2.5 py-1 text-xs rounded-md font-arabic transition cursor-pointer ${
                  filterScore === 'all'
                    ? 'bg-slate-800 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                الكل ({savedSentences.length})
              </button>
              <button
                onClick={() => setFilterScore('high')}
                className={`px-2.5 py-1 text-xs rounded-md font-arabic transition cursor-pointer ${
                  filterScore === 'high'
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                ممتاز (80%+)
              </button>
              <button
                onClick={() => setFilterScore('needs_work')}
                className={`px-2.5 py-1 text-xs rounded-md font-arabic transition cursor-pointer ${
                  filterScore === 'needs_work'
                    ? 'bg-amber-600 text-white font-bold'
                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                }`}
              >
                يحتاج تدريب
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {savedSentences.length === 0 ? (
          <div className="text-center py-10 px-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/60">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <History className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 font-arabic mb-1">
              سجل الجمل فارغ حالياً
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed font-arabic">
              اكتب جملتك في المربع أعلاه واضغط على زر <strong className="text-blue-600">"فحص الجملة بواسطة المدرب الذكي"</strong>، وسيتم توثيق كل جملة تدخلها هنا مع تقييمها وملاحظاتها لمراجعتها والتدرب عليها في أي وقت.
            </p>
          </div>
        ) : displayedHistory.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-500 font-arabic bg-slate-50 rounded-lg">
            لا توجد جمل مطابقة للبحث أو الفلتر المحدد.
          </div>
        ) : (
          /* Sentences List */
          <div className="space-y-3 pt-1">
            {displayedHistory.map(({ item, originalIndex }) => {
              const score = item.score ?? 0;
              const isHigh = score >= 80;
              const isMedium = score >= 60 && score < 80;
              const isFeedbackExpanded = expandedFeedbackIndices.includes(originalIndex);

              return (
                <div
                  key={originalIndex}
                  className={`rounded-xl border p-4 transition hover:shadow-xs ${
                    isHigh
                      ? 'bg-emerald-50/20 border-emerald-200/80 hover:border-emerald-300'
                      : isMedium
                      ? 'bg-amber-50/20 border-amber-200/80 hover:border-amber-300'
                      : 'bg-rose-50/20 border-rose-200/80 hover:border-rose-300'
                  }`}
                >
                  {/* Card Top Row: Score Badge + Timestamp + Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      {/* Score Badge */}
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                          isHigh
                            ? 'bg-emerald-100 text-emerald-800'
                            : isMedium
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {isHigh ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                        )}
                        <span>{score}%</span>
                        <span className="font-arabic font-normal text-[10px] mr-1">
                          {isHigh ? 'ممتاز' : isMedium ? 'جيد' : 'يحتاج مراجعة'}
                        </span>
                      </span>

                      {/* Date/Time if available */}
                      {item.timestamp && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-arabic">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{formatSentenceDate(item.timestamp)}</span>
                        </span>
                      )}
                    </div>

                    {/* Action Buttons Toolbar */}
                    <div className="flex items-center gap-1">
                      {/* Listen audio */}
                      <button
                        onClick={() => playEnglishAudio(item.sentence)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition cursor-pointer"
                        title="استمع لنطق الجملة"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Copy sentence */}
                      <button
                        onClick={() => handleCopySentence(item.sentence, originalIndex)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition cursor-pointer relative"
                        title="نسخ الجملة"
                      >
                        {copiedIdx === originalIndex ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Reuse in textarea */}
                      <button
                        onClick={() => handleReuseSentence(item.sentence)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-arabic font-medium transition cursor-pointer"
                        title="وضع الجملة في مربع التحرير للتعديل أو إعادة الفحص"
                      >
                        <CornerDownLeft className="w-3 h-3" />
                        <span className="hidden sm:inline">تعديل</span>
                      </button>

                      {/* Delete sentence */}
                      {onDeleteFreeSentence && (
                        <button
                          onClick={() => onDeleteFreeSentence(originalIndex)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="حذف الجملة من السجل"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Sentence Text */}
                  <div className="py-2.5">
                    <p className="text-sm sm:text-base font-semibold text-slate-900 font-sans tracking-wide text-left select-text" dir="ltr">
                      "{item.sentence}"
                    </p>
                  </div>

                  {/* AI Feedback Snippet / Full Details */}
                  {item.feedback && (
                    <div className="pt-2.5 border-t border-slate-100">
                      <div
                        onClick={() => toggleFeedback(originalIndex)}
                        className="flex items-center justify-between text-xs text-slate-600 hover:text-slate-900 cursor-pointer font-arabic transition select-none mb-1.5"
                      >
                        <span className="font-semibold flex items-center gap-1 text-slate-800">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>تقييم وملاحظات المدرب الذكي:</span>
                        </span>
                        <span className="text-[11px] font-bold text-blue-600 flex items-center gap-0.5">
                          <span>{isFeedbackExpanded ? 'طي التفاصيل' : 'عرض كامل التفاصيل'}</span>
                          {isFeedbackExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </span>
                      </div>

                      {/* Feedback content - fully readable */}
                      <div className={`text-xs text-slate-700 bg-slate-50/80 rounded-lg p-3 border border-slate-200/80 leading-relaxed font-arabic ${
                        isFeedbackExpanded ? 'animate-fadeIn' : ''
                      }`}>
                        {item.feedback}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
        <button
          onClick={() => {
            onCompleteLesson();
            onNextLesson();
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-sm transition active:scale-95 mr-auto cursor-pointer"
        >
          <span>إتمام الدرس والانتقال إلى الاختبار النهائي للوحدة</span>
          <ArrowRight className="w-4 h-4 rotate-180" />
        </button>
      </div>

    </div>
  );
};

