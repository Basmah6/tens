import React from 'react';
import { Sparkles, Clock, Volume2, ArrowLeft, ArrowRight, CheckCircle2, BookOpen, Layers, Play, Tv } from 'lucide-react';
import { TenseData } from '../../types';
import { playEnglishAudio } from '../../utils/audio';

interface StepIntroProps {
  tense: TenseData;
  onNext: () => void;
  onOpenVideo?: () => void;
}

export const StepIntro: React.FC<StepIntroProps> = ({ tense, onNext, onOpenVideo }) => {
  const getCategoryBadge = () => {
    switch (tense.category) {
      case 'present':
        return { label: 'أزمنة الحاضر والمضارع (Present)', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'past':
        return { label: 'أزمنة الماضي (Past)', bg: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'future':
        return { label: 'أزمنة المستقبل (Future)', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
    }
  };

  const category = getCategoryBadge();

  // Helper to determine precise location and representation on the timeline (Left = Past, Middle = Present/NOW, Right = Future)
  const getTimelineIndicator = () => {
    switch (tense.id) {
      // --- 1. الأزمنة البسيطة (Simple Tenses) - نقطة لحظية محددة ---
      case 'past_simple':
        return {
          isRange: false,
          leftPct: 24,
          typeLabel: 'نقطة زمنية محددة في الماضي (Point)',
          preciseNoteAr: 'نقطة منتهية في الماضي (على يسار الخط) عند وقت محدد تماماً.',
        };
      case 'present_simple':
        return {
          isRange: false,
          leftPct: 50,
          typeLabel: 'نقطة زمنية محددة في الحاضر (Point)',
          preciseNoteAr: 'نقطة مركزية في الحاضر (منتصف الخط) تعبر عن الحقائق والروتين المتكرر.',
        };
      case 'future_simple':
        return {
          isRange: false,
          leftPct: 76,
          typeLabel: 'نقطة زمنية محددة في المستقبل (Point)',
          preciseNoteAr: 'نقطة متوقعة في المستقبل (على يمين الخط) عند وقت محدد قادم.',
        };

      // --- 2. الأزمنة المستمرة (Continuous Tenses) - شريط استمرار وامتداد ---
      case 'past_continuous':
        return {
          isRange: true,
          leftPct: 15,
          widthPct: 18,
          typeLabel: 'شريط استمرار في الماضي (Past Span)',
          preciseNoteAr: 'فترة استمرار محددة وقعت بالكامل في الماضي على يسار الخط الزمني.',
        };
      case 'present_continuous':
        return {
          isRange: true,
          leftPct: 41,
          widthPct: 18,
          typeLabel: 'شريط استمرار يحيط بالحاضر (Active Span)',
          preciseNoteAr: 'فترة استمرار جارية ومحيطة بلحظة الحاضر (NOW) في منتصف الخط.',
        };
      case 'future_continuous':
        return {
          isRange: true,
          leftPct: 66,
          widthPct: 18,
          typeLabel: 'شريط استمرار في المستقبل (Future Span)',
          preciseNoteAr: 'فترة استمرار ستقع أثناء وقت محدد في المستقبل على يمين الخط الزمني.',
        };

      // --- 3. الأزمنة التامة (Perfect Tenses) - شريط اكتمال أو جسر رابط ---
      case 'past_perfect':
        return {
          isRange: true,
          leftPct: 6,
          widthPct: 15,
          typeLabel: 'شريط اكتمال في الماضي الأسبق (Past Before Past)',
          preciseNoteAr: 'يبدأ ويكتمل في أقصى يسار الماضي قبل نقطة ماضية أخرى.',
        };
      case 'present_perfect':
        return {
          isRange: true,
          leftPct: 26,
          widthPct: 24,
          typeLabel: 'شريط ممتد من الماضي إلى الحاضر (Bridge to NOW)',
          preciseNoteAr: 'يبدأ في الماضي (اليسار) ويمتد جسره ليتصل مباشرة بنقطة الحاضر (NOW في المنتصف).',
        };
      case 'future_perfect':
        return {
          isRange: true,
          leftPct: 50,
          widthPct: 28,
          typeLabel: 'شريط اكتمال قبل موعد مستقبلي (Completed Span)',
          preciseNoteAr: 'ينطلق بعد الحاضر ويكتمل تماماً قبل حلول نقطة مستهدفة في المستقبل (اليمين).',
        };

      // --- 4. الأزمنة التامة المستمرة (Perfect Continuous) ---
      case 'past_perfect_continuous':
        return {
          isRange: true,
          leftPct: 5,
          widthPct: 22,
          typeLabel: 'شريط استمرار في الماضي الأسبق (Continuous Duration)',
          preciseNoteAr: 'نشاط استمر طويلاً في عمق الماضي (اليسار) حتى تقاطع مع حدث ماضٍ آخر.',
        };
      case 'present_perfect_continuous':
        return {
          isRange: true,
          leftPct: 20,
          widthPct: 34,
          typeLabel: 'شريط مستمر بدأ في الماضي وعابر للحاضر (Span to NOW)',
          preciseNoteAr: 'يبدأ في الماضي (يسار الخط) ويستمر دون انقطاع ليعبر لحظة الحاضر (المنتصف) وقد يستمر للمستقبل.',
        };
      case 'future_perfect_continuous':
        return {
          isRange: true,
          leftPct: 46,
          widthPct: 40,
          typeLabel: 'شريط استمرار تراكمي نحو المستقبل (Cumulative Span)',
          preciseNoteAr: 'استمرار تراكمي يعبر الحاضر ويتدفق نحو محطة مستقبلية على يمين الخط.',
        };

      default: {
        const isContinuousOrPerfect = tense.id.includes('continuous') || tense.id.includes('perfect');
        if (isContinuousOrPerfect) {
          const center = ((tense.timelinePoint + 3) / 6) * 100;
          return {
            isRange: true,
            leftPct: Math.max(5, center - 10),
            widthPct: 20,
            typeLabel: 'شريط امتداد زمني (Span)',
            preciseNoteAr: 'شريط يوضح فترة امتداد الزمن على المحور.',
          };
        }
        return {
          isRange: false,
          leftPct: ((tense.timelinePoint + 3) / 6) * 100,
          typeLabel: 'نقطة زمنية محددة (Point)',
          preciseNoteAr: 'نقطة تدل على موقع حدوث الفعل.',
        };
      }
    }
  };

  const timelineIndicator = getTimelineIndicator();

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn" dir="rtl">
      {/* Hero Welcome Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${category.bg}`}>
            {category.label}
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
            المستوى: {tense.level}
          </span>
        </div>

        <div className="space-y-2 mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-arabic tracking-tight">
            {tense.nameAr}
            <span className="block sm:inline sm:mr-3 text-lg sm:text-xl font-normal text-slate-500 font-sans" dir="ltr">
              ({tense.nameEn})
            </span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-arabic">
            {tense.summaryAr}
          </p>
        </div>

        {/* Short Formula Highlight */}
        <div className="rounded-xl bg-[#214ecf] border border-blue-600 p-4 sm:p-5 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-amber-300 text-xs font-bold border border-white/20 font-arabic">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>الصيغة العامة المختصرة (Master Formula)</span>
            </div>
            <div className="inline-block bg-black/20 px-3.5 py-1.5 rounded-lg border border-white/15 max-w-full overflow-x-auto">
              <div className="text-base sm:text-xl font-mono font-black text-white tracking-wide text-left whitespace-nowrap" dir="ltr">
                {tense.shortFormula}
              </div>
            </div>
          </div>
          <button
            onClick={() => playEnglishAudio(tense.nameEn)}
            className="self-start sm:self-center inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white hover:bg-blue-50 text-[#214ecf] text-xs font-bold border border-white shadow-xs transition active:scale-95 shrink-0 font-arabic"
            title="نطق اسم الزمن بالإنجليزية"
          >
            <Volume2 className="w-4 h-4 text-[#214ecf]" />
            <span>نطق الاسم</span>
          </button>
        </div>
      </div>

      {/* Timeline Visual Context */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-2 text-slate-900 font-bold font-arabic text-base">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-blue-600" />
            <span>الموقع على الخط الزمني (Timeline Position)</span>
          </div>
          <span
            className={`text-xs font-normal px-2.5 py-0.5 rounded-full border font-arabic ${
              timelineIndicator.isRange
                ? 'text-blue-700 bg-blue-50 border-blue-200'
                : 'text-slate-600 bg-slate-100 border-slate-200'
            }`}
          >
            {timelineIndicator.typeLabel}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 font-arabic leading-relaxed">
          {tense.timelineDescriptionAr}
        </p>

        {/* Visual Timeline Bar (Past on Left, Center is Present/NOW, Future on Right) */}
        <div className="pt-2 pb-1" dir="ltr">
          <div className="relative flex items-center justify-between text-xs font-bold mb-2 font-arabic select-none">
            <span className="text-left font-bold text-slate-700">
              الماضي (Past)
            </span>
            <span className="text-center font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200/70 shadow-2xs">
              الحاضر / الآن (Present / NOW)
            </span>
            <span className="text-right font-bold text-slate-700">
              المستقبل (Future)
            </span>
          </div>

          <div className="w-full h-4 bg-slate-100 rounded-full relative overflow-hidden flex border border-slate-200/80 shadow-inner">
            {/* Timeline sectors: Left is Past (0-40%), Center is Present (40-60%), Right is Future (60-100%) */}
            <div className="w-[40%] h-full border-r border-dashed border-slate-300/90 bg-slate-50/60" title="الماضي (Past)"></div>
            <div className="w-[20%] h-full border-r border-dashed border-slate-300/90 bg-blue-50/30 relative flex items-center justify-center" title="الحاضر / الآن (Present / NOW)">
              {/* NOW Vertical Marker line at exact 50% */}
              <div className="w-0.5 h-full bg-blue-400/60"></div>
            </div>
            <div className="w-[40%] h-full bg-slate-50/60" title="المستقبل (Future)"></div>

            {/* Active Tense Position Marker: Range Span or Point Marker */}
            {timelineIndicator.isRange ? (
              <div
                className="absolute top-0 bottom-0 bg-blue-600 rounded-full shadow-sm transition-all duration-500 flex items-center justify-between px-1 z-10"
                style={{
                  left: `${timelineIndicator.leftPct}%`,
                  width: `${timelineIndicator.widthPct}%`,
                }}
                title={timelineIndicator.typeLabel}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/90 shrink-0"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/90 shrink-0"></span>
              </div>
            ) : (
              <div
                className="absolute top-0 bottom-0 bg-blue-600 rounded-full shadow-sm transition-all duration-500 flex items-center justify-center z-10"
                style={{
                  left: `${timelineIndicator.leftPct}%`,
                  width: '18px',
                  transform: 'translateX(-50%)',
                }}
                title={timelineIndicator.typeLabel}
              >
                <span className="w-2 h-2 rounded-full bg-white shadow-xs"></span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lesson Map Cards */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-3">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 font-arabic flex items-center gap-2">
          <Layers className="w-4 h-4 text-slate-700" />
          <span>خريطة المحتوى التعليمي لهذه الوحدة:</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="text-xs font-bold text-blue-700 font-arabic flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>1. الاستخدامات ({tense.usageLesson.useCases.length} استخدامات)</span>
            </div>
            <p className="text-[11px] text-slate-500 font-arabic">شرح مستقل لكل حالة مع أمثلة وتدريب فوري.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="text-xs font-bold text-amber-700 font-arabic flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              <span>2. التركيب وجدول SVO</span>
            </div>
            <p className="text-[11px] text-slate-500 font-arabic">الإثبات، النفي، والاستفهام درساً بدرْس.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="text-xs font-bold text-emerald-700 font-arabic flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>3. الأخطاء والتمارين والاختبار</span>
            </div>
            <p className="text-[11px] text-slate-500 font-arabic">تصحيح الأخطاء الشائعة والتقييم النهائي.</p>
          </div>
        </div>
      </div>

      {/* Video Lesson Callout */}
      {onOpenVideo && (
        <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-arabic">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">
                شاهد فيديو شرح {tense.nameAr}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                شرح مرئي مسجل بالصوت والصورة لترسيخ فهم القاعدة والاستخدامات قبل بدء التمارين
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenVideo}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer shrink-0"
          >
            <span>مشاهدة الفيديو</span>
            <Tv className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Primary Action Button */}
      <div className="pt-2 flex items-center justify-end">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#214ecf] hover:bg-[#1a3eb0] text-white text-sm font-bold shadow-sm hover:shadow-md transition active:scale-98 font-arabic"
        >
          <span>ابدأ دراسة الاستخدام الأول</span>
          <ArrowLeft className="w-4 h-4 rotate-180" />
        </button>
      </div>
    </div>
  );
};
