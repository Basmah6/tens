import React, { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, Layers, AlertTriangle, CheckCircle2, PenTool, Award, 
  ChevronRight, ArrowLeft, ArrowRight, Check, ListFilter, Sparkles,
  Tv, PlayCircle, GraduationCap, Timer, Pause, Play, Minimize2, X
} from 'lucide-react';
import { TenseData, UserTenseProgress, CommonMistake } from '../types';
import { getTenseVideos, getDefaultVideoForTense } from '../data/tenseVideos';
import { VideoGallery } from './VideoGallery';
import { StepIntro } from './steps/StepIntro';
import { StepUsageSingle } from './steps/StepUsageSingle';
import { StepKeywords } from './steps/StepKeywords';
import { StepSVORules } from './steps/StepSVORules';
import { StepSVOFormSingle } from './steps/StepSVOFormSingle';
import { StepSVOBuilder } from './steps/StepSVOBuilder';
import { StepVerbSpelling } from './steps/StepVerbSpelling';
import { StepMistakesPaged } from './steps/StepMistakesPaged';
import { StepPracticePaged } from './steps/StepPracticePaged';
import { LessonFreeWriting } from './LessonFreeWriting';
import { LessonFinalExam } from './LessonFinalExam';

interface TenseLessonProps {
  tense: TenseData;
  progress?: UserTenseProgress;
  onUpdateLessonProgress: (tenseId: string, lessonNumber: number) => void;
  onSaveFreeSentence: (tenseId: string, sentence: string, score: number, feedback: string) => void;
  onDeleteFreeSentence?: (tenseId: string, index: number) => void;
  onClearFreeSentences?: (tenseId: string) => void;
  onPassExam: (tenseId: string, score: number) => void;
  onBackToCourse: () => void;
}

export type LessonStepItem =
  | { type: 'intro'; titleAr: string; chapter: 1 }
  | { type: 'video_gallery'; titleAr: string; chapter: 1 }
  | { type: 'usage'; usageIndex: number; titleAr: string; chapter: 1 }
  | { type: 'keywords'; titleAr: string; chapter: 1 }
  | { type: 'svo_rules'; titleAr: string; chapter: 2 }
  | { type: 'svo_form'; formIndex: number; titleAr: string; chapter: 2 }
  | { type: 'svo_builder'; titleAr: string; chapter: 2 }
  | { type: 'verb_spelling'; titleAr: string; chapter: 3 }
  | { type: 'mistakes'; mistakePageIndex: number; mistakes: CommonMistake[]; totalMistakePages: number; titleAr: string; chapter: 4 }
  | { type: 'practice'; titleAr: string; chapter: 5 }
  | { type: 'free_write'; titleAr: string; chapter: 6 }
  | { type: 'final_exam'; titleAr: string; chapter: 7 };

const CHAPTER_TABS = [
  { number: 1, titleAr: 'الاستخدام والمفاتيح', icon: BookOpen, color: 'text-[#214ecf]', activeBg: 'bg-[#214ecf]' },
  { number: 2, titleAr: 'تراكيب الجمل (SVO)', icon: Layers, color: 'text-[#ea9835]', activeBg: 'bg-[#ea9835]' },
  { number: 3, titleAr: 'قواعد وتصاريف الأفعال', icon: Sparkles, color: 'text-[#2563eb]', activeBg: 'bg-[#2563eb]' },
  { number: 4, titleAr: 'الأخطاء الشائعة', icon: AlertTriangle, color: 'text-[#e06045]', activeBg: 'bg-[#e06045]' },
  { number: 5, titleAr: 'التمارين التفاعلية', icon: CheckCircle2, color: 'text-[#10b981]', activeBg: 'bg-[#10b981]' },
  { number: 6, titleAr: 'تكوين الجمل الحر', icon: PenTool, color: 'text-[#ea9835]', activeBg: 'bg-[#ea9835]' },
  { number: 7, titleAr: 'الاختبار النهائي', icon: Award, color: 'text-amber-400', activeBg: 'bg-[#0F172A]' },
];

export const TenseLesson: React.FC<TenseLessonProps> = ({
  tense,
  progress,
  onUpdateLessonProgress,
  onSaveFreeSentence,
  onDeleteFreeSentence,
  onClearFreeSentences,
  onPassExam,
  onBackToCourse,
}) => {
  const useCases = tense.usageLesson.useCases || [];
  const structures = tense.svoLesson.structures || [];
  const allMistakes = tense.mistakesLesson.mistakes || [];

  // Split mistakes into chunks of 2 for focused reading
  const mistakeChunks = useMemo(() => {
    const chunks: CommonMistake[][] = [];
    for (let i = 0; i < allMistakes.length; i += 2) {
      chunks.push(allMistakes.slice(i, i + 2));
    }
    return chunks.length > 0 ? chunks : [[]];
  }, [allMistakes]);

  // Build the complete sequential steps array for this tense
  const steps: LessonStepItem[] = useMemo(() => {
    const list: LessonStepItem[] = [];

    // Step 0: Intro
    list.push({ type: 'intro', titleAr: 'نظرة عامة والخط الزمني', chapter: 1 });

    // Step 1: Video Gallery
    list.push({ type: 'video_gallery', titleAr: 'فيديوهات الشرح المرئي والتأسيس', chapter: 1 });

    // Step 1..N: Individual Usages (One single usage per screen)
    useCases.forEach((uCase, idx) => {
      list.push({
        type: 'usage',
        usageIndex: idx,
        titleAr: `الاستخدام ${idx + 1}: ${uCase.titleAr}`,
        chapter: 1,
      });
    });

    // Step Keywords
    if (tense.usageLesson.keywords && tense.usageLesson.keywords.length > 0) {
      list.push({ type: 'keywords', titleAr: 'المؤشرات والكلمات الدالة', chapter: 1 });
    }

    // Step SVO Rules & Auxiliary
    list.push({ type: 'svo_rules', titleAr: 'قواعد التركيب والأفعال المساعدة', chapter: 2 });

    // Step Individual SVO Forms (Affirmative, Negative, Yes/No, Wh-)
    structures.forEach((st, idx) => {
      list.push({
        type: 'svo_form',
        formIndex: idx,
        titleAr: `صيغة ${st.formTitleAr}`,
        chapter: 2,
      });
    });

    // Step SVO Interactive Builder
    list.push({ type: 'svo_builder', titleAr: 'معمل تركيب الجمل التفاعلي', chapter: 2 });

    // Step 12: جدول تصاريف الأفعال وقواعد الإملاء (Spelling & Verb Forms) - الوحدة 3
    list.push({ type: 'verb_spelling', titleAr: 'جدول تصاريف الأفعال وقواعد الإملاء (Spelling & Verb Forms)', chapter: 3 });

    // Step 13..: تجنب أخطاء الطلاب المتكررة (الأخطاء الشائعة - Common Pitfalls) - الوحدة 4
    mistakeChunks.forEach((chunk, pIdx) => {
      list.push({
        type: 'mistakes',
        mistakePageIndex: pIdx,
        mistakes: chunk,
        totalMistakePages: mistakeChunks.length,
        titleAr: `تجنب أخطاء الطلاب المتكررة (صفحة ${pIdx + 1} من ${mistakeChunks.length})`,
        chapter: 4,
      });
    });

    // Step Practice (Paged interactive exercises) - الوحدة 5
    list.push({ type: 'practice', titleAr: 'التمارين التفاعلية الشاملة', chapter: 5 });

    // Step Free Writing - الوحدة 6
    list.push({ type: 'free_write', titleAr: 'تكوين الجمل الحر والمدرب الذكي', chapter: 6 });

    // Step Final Exam - الوحدة 7
    list.push({ type: 'final_exam', titleAr: 'الاختبار النهائي الشامل', chapter: 7 });

    return list;
  }, [useCases, tense.usageLesson.keywords, structures, mistakeChunks]);

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [showVideoGallery, setShowVideoGallery] = useState<boolean>(false);
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  const [focusSeconds, setFocusSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  const currentStep = steps[currentStepIndex] || steps[0];
  const completedLessons = progress?.completedLessons || [];

  const currentTenseVideos = useMemo(() => {
    return tense.videos && tense.videos.length > 0 ? tense.videos : getTenseVideos(tense.id);
  }, [tense.videos, tense.id]);

  const defaultVideoUrl = useMemo(() => {
    return tense.videoUrl || (currentTenseVideos[0]?.videoUrl) || getDefaultVideoForTense(tense.id);
  }, [tense.videoUrl, currentTenseVideos, tense.id]);

  // Update progress tracking for the current chapter
  useEffect(() => {
    if (currentStep) {
      onUpdateLessonProgress(tense.id, currentStep.chapter);
    }
  }, [currentStepIndex, currentStep, tense.id, onUpdateLessonProgress]);

  // Reset step index to 0 when changing tenses
  useEffect(() => {
    setCurrentStepIndex(0);
  }, [tense.id]);

  // Automatically scroll to top of page whenever step or tense changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const focusElem = document.getElementById('lesson-focus-mode-container');
    if (focusElem) {
      focusElem.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStepIndex, tense.id]);

  // Focus mode study timer effect
  useEffect(() => {
    let interval: any = null;
    if (isFocusMode && isTimerRunning) {
      interval = setInterval(() => {
        setFocusSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFocusMode, isTimerRunning]);

  // Escape key to exit focus mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFocusMode) {
        setIsFocusMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocusMode]);

  const formatFocusTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Quick jump to first step of a chapter
  const handleJumpToChapter = (chapterNum: number) => {
    const targetIdx = steps.findIndex((s) => s.chapter === chapterNum);
    if (targetIdx !== -1) {
      setCurrentStepIndex(targetIdx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderStepContent = () => {
    switch (currentStep?.type) {
      case 'intro':
        return (
          <StepIntro 
            tense={tense} 
            onNext={goToNextStep} 
            onOpenVideo={() => {
              const vidStepIdx = steps.findIndex((s) => s.type === 'video_gallery');
              if (vidStepIdx !== -1) {
                setCurrentStepIndex(vidStepIdx);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                setShowVideoGallery(true);
              }
            }}
          />
        );
      case 'video_gallery':
        return (
          <div className="space-y-6">
            <VideoGallery
              tenseId={tense.id}
              videoUrl={defaultVideoUrl}
              tenseNameAr={tense.nameAr}
              tenseNameEn={tense.nameEn}
              isOpen={true}
            />

            {/* Step Navigation Bar */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={goToPrevStep}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition font-arabic cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>العودة للمقدمة</span>
              </button>

              <button
                onClick={goToNextStep}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#214ecf] hover:bg-[#1a3eb0] text-white text-xs sm:text-sm font-bold shadow-xs transition font-arabic cursor-pointer"
              >
                <span>متابعة إلى الاستخدام الأول</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        );
      case 'usage':
        return (
          <StepUsageSingle
            key={`usage-${tense.id}-${currentStep.usageIndex}`}
            tense={tense}
            useCaseIndex={currentStep.usageIndex}
            totalUseCases={useCases.length}
            onNext={goToNextStep}
            onPrev={goToPrevStep}
          />
        );
      case 'keywords':
        return (
          <StepKeywords key={`keywords-${tense.id}`} tense={tense} onNext={goToNextStep} onPrev={goToPrevStep} />
        );
      case 'svo_rules':
        return (
          <StepSVORules key={`svo-rules-${tense.id}`} tense={tense} onNext={goToNextStep} onPrev={goToPrevStep} />
        );
      case 'svo_form':
        return (
          <StepSVOFormSingle
            key={`svo-form-${tense.id}-${currentStep.formIndex}`}
            tense={tense}
            structure={structures[currentStep.formIndex]}
            formIndex={currentStep.formIndex}
            totalForms={structures.length}
            onNext={goToNextStep}
            onPrev={goToPrevStep}
          />
        );
      case 'svo_builder':
        return (
          <StepSVOBuilder key={`svo-builder-${tense.id}`} tense={tense} onNext={goToNextStep} onPrev={goToPrevStep} />
        );
      case 'verb_spelling':
        return (
          <StepVerbSpelling
            key={`spelling-${tense.id}`}
            tense={tense}
            onNext={goToNextStep}
            onPrev={goToPrevStep}
          />
        );
      case 'mistakes':
        return (
          <StepMistakesPaged
            key={`mistakes-${tense.id}-${currentStep.mistakePageIndex}`}
            tense={tense}
            pageIndex={currentStep.mistakePageIndex}
            totalMistakePages={currentStep.totalMistakePages}
            mistakes={currentStep.mistakes}
            onNext={goToNextStep}
            onPrev={goToPrevStep}
          />
        );
      case 'practice':
        return (
          <StepPracticePaged
            key={`practice-${tense.id}`}
            tense={tense}
            onCompleteLesson={() => onUpdateLessonProgress(tense.id, 4)}
            onNext={goToNextStep}
            onPrev={goToPrevStep}
          />
        );
      case 'free_write':
        return (
          <div className="space-y-6">
            <LessonFreeWriting
              tense={tense}
              progress={progress}
              onSaveFreeSentence={(sentence, score, feedback) =>
                onSaveFreeSentence(tense.id, sentence, score, feedback)
              }
              onDeleteFreeSentence={
                onDeleteFreeSentence
                  ? (idx) => onDeleteFreeSentence(tense.id, idx)
                  : undefined
              }
              onClearAllSentences={
                onClearFreeSentences
                  ? () => onClearFreeSentences(tense.id)
                  : undefined
              }
              onCompleteLesson={() => onUpdateLessonProgress(tense.id, 5)}
              onNextLesson={goToNextStep}
            />

            {/* Back button */}
            <div className="flex justify-start">
              <button
                onClick={goToPrevStep}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition font-arabic"
              >
                <ArrowRight className="w-4 h-4" />
                <span>العودة للتمارين</span>
              </button>
            </div>
          </div>
        );
      case 'final_exam':
        return (
          <div className="space-y-6">
            <LessonFinalExam
              tense={tense}
              onPassExam={(score) => onPassExam(tense.id, score)}
              onBackToCourse={onBackToCourse}
            />

            {/* Back button */}
            <div className="flex justify-start">
              <button
                onClick={goToPrevStep}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition font-arabic"
              >
                <ArrowRight className="w-4 h-4" />
                <span>العودة لكتابة الجمل الحرة</span>
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const progressPercent = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6" dir="rtl">
      
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.04),0_2px_6px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-arabic mb-1">
            <button 
              onClick={onBackToCourse}
              className="hover:text-[#214ecf] font-medium transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>جميع الأزمنة</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 rotate-180 text-slate-400" />
            <span className="text-slate-600 font-medium">
              {tense.category === 'present' ? 'المضارع' : tense.category === 'past' ? 'الماضي' : 'المستقبل'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B] font-arabic">
            {tense.nameAr} <span className="text-base font-normal text-slate-500 font-sans">({tense.nameEn})</span>
          </h2>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          {/* Study Mode Trigger Button */}
          <button
            id="btn-lesson-focus-mode"
            onClick={() => {
              setIsFocusMode(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer border bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 border-indigo-200/80 shadow-[0_2px_0_0_#c7d2fe] active:translate-y-[1.5px] active:shadow-none group"
            title="تفعيل وضع الدراسة للدرس (مساحة هادئة بدون مشتتات مع مؤقت دراسي)"
          >
            <GraduationCap className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
            <span className="font-arabic">وضع الدراسة</span>
          </button>

          {/* Quick Video Gallery Toggle Button */}
          <button
            onClick={() => setShowVideoGallery((prev) => !prev)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer border ${
              showVideoGallery
                ? 'bg-[#214ecf] text-white border-blue-700 shadow-[0_3px_0_0_#153696] ring-2 ring-blue-200/60 active:translate-y-[1.5px]'
                : 'bg-white hover:bg-slate-50 text-[#2D3748] border-slate-200 shadow-[0_2px_0_0_#e2e8f0] active:translate-y-[1.5px] active:shadow-none'
            }`}
            title="مشاهدة مقطع فيديو الشرح المعتمد لهذا الزمن"
          >
            <Tv className="w-4 h-4" />
            <span>فيديو الشرح</span>
          </button>

          <button
            onClick={onBackToCourse}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#2D3748] text-xs font-bold border border-slate-200 shadow-[0_2px_0_0_#e2e8f0] active:translate-y-[1.5px] active:shadow-none transition-all duration-200 cursor-pointer"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>

      {/* Dynamic Pop-down Video Gallery (when toggled from header) */}
      {showVideoGallery && currentStep?.type !== 'video_gallery' && (
        <div className="transition-all duration-300">
          <VideoGallery
            tenseId={tense.id}
            videoUrl={defaultVideoUrl}
            tenseNameAr={tense.nameAr}
            tenseNameEn={tense.nameEn}
            isOpen={showVideoGallery}
            onClose={() => setShowVideoGallery(false)}
          />
        </div>
      )}

      {/* Chapter Tabs & Global Step Progress Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.04),0_2px_6px_rgba(0,0,0,0.02)] space-y-3">
        {/* Main 7 Chapter Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {CHAPTER_TABS.map((tab) => {
            const Icon = tab.icon;
            const isCurrentChapter = currentStep?.chapter === tab.number;
            const isCompleted = completedLessons.includes(tab.number);

            let buttonStyle = 'bg-[#F8FAFC] text-[#2D3748] border-slate-200/90 hover:bg-slate-100 shadow-[0_2px_0_0_#e2e8f0]';
            if (isCurrentChapter) {
              buttonStyle = `${tab.activeBg} text-white border-transparent shadow-[0_3px_0_0_rgba(0,0,0,0.25)] ring-2 ring-indigo-200/60 font-bold`;
            } else if (isCompleted) {
              buttonStyle = 'bg-emerald-50/90 text-emerald-800 border-emerald-200/80 hover:bg-emerald-100/80 shadow-[0_2px_0_0_#a7f3d0]';
            }

            return (
              <button
                key={tab.number}
                onClick={() => handleJumpToChapter(tab.number)}
                className={`flex flex-col items-center text-center p-2.5 rounded-xl transition-all duration-200 relative border active:translate-y-[1.5px] cursor-pointer ${buttonStyle}`}
              >
                {isCompleted && !isCurrentChapter && (
                  <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-2 h-2 stroke-[3]" />
                  </div>
                )}

                <div className="flex items-center gap-1 mb-0.5">
                  <Icon className={`w-3.5 h-3.5 ${isCurrentChapter ? 'text-white' : tab.color}`} />
                  <span className={`text-[10px] font-mono ${isCurrentChapter ? 'text-white' : 'text-slate-400'}`}>
                    الوحدة {tab.number}
                  </span>
                </div>
                
                <span className="text-xs font-bold leading-tight font-arabic">
                  {tab.titleAr}
                </span>
              </button>
            );
          })}
        </div>

        {/* Granular Step Progress Bar */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-600 font-arabic">
            <span className="font-bold text-indigo-700 font-mono">الدرس {currentStepIndex + 1} من {steps.length}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-36 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/70 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
              <div
                className="bg-gradient-to-r from-blue-600 to-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono font-bold text-slate-700 text-[11px]">{progressPercent}%</span>
          </div>
        </div>
      </div>

      {/* Step View Render */}
      <div className="transition-all duration-300">
        {renderStepContent()}
      </div>

      {/* Focus Mode Full-Screen Distraction-Free Modal/Overlay */}
      {isFocusMode && (
        <div 
          id="lesson-focus-mode-container"
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-md flex flex-col text-slate-100 animate-in fade-in duration-200" 
          dir="rtl"
        >
          {/* Sticky Focus Top Bar */}
          <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3 shadow-xl flex items-center justify-between gap-4">
            {/* Right: Tense Title and Current Step */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shadow-xs">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-white font-arabic">{tense.nameAr}</h2>
                  <span className="text-xs text-slate-400 font-sans hidden md:inline">({tense.nameEn})</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-arabic">
                  <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                    <Sparkles className="w-3 h-3" />
                    <span>وضع الدراسة</span>
                  </span>
                  <span>•</span>
                  <span>الدرس {currentStepIndex + 1} من {steps.length}</span>
                </div>
              </div>
            </div>

            {/* Center: Focus Timer & Progress */}
            <div className="hidden sm:flex items-center gap-4">
              {/* Focus Timer */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs font-mono">
                <Timer className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="text-white font-bold">{formatFocusTime(focusSeconds)}</span>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="text-slate-400 hover:text-white transition p-0.5 cursor-pointer"
                  title={isTimerRunning ? "إيقاف المؤقت مؤقتاً" : "استئناف المؤقت"}
                >
                  {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-2">
                <div className="w-24 md:w-32 bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono text-slate-300">{progressPercent}%</span>
              </div>
            </div>

            {/* Left: Actions (Step Navigation & Exit) */}
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrevStep}
                disabled={currentStepIndex === 0}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300 transition cursor-pointer"
                title="الخطوة السابقة"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={goToNextStep}
                disabled={currentStepIndex === steps.length - 1}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300 transition cursor-pointer"
                title="الخطوة التالية"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>

              {/* Exit button */}
              <button
                id="btn-exit-lesson-focus"
                onClick={() => setIsFocusMode(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-arabic font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition cursor-pointer group"
                title="إنهاء وضع الدراسة (Esc)"
              >
                <Minimize2 className="w-3.5 h-3.5 group-hover:scale-90 transition-transform" />
                <span>إنهاء وضع الدراسة</span>
                <kbd className="hidden md:inline px-1 py-0.2 text-[9px] bg-slate-800/80 text-slate-400 rounded border border-slate-700 font-mono">
                  Esc
                </kbd>
              </button>
            </div>
          </div>

          {/* Focused Content Body */}
          <div className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            <div className="bg-white text-slate-800 rounded-2xl p-2 sm:p-4 shadow-2xl border border-slate-800/40">
              {renderStepContent()}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
