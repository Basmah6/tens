import React from 'react';
import { Sparkles, Map, BarChart3, Award, FileText, GraduationCap, Flame } from 'lucide-react';
import { TenseData, UserOverallProgress } from '../types';
import { ItqanLogo } from './ItqanLogo';

interface NavbarProps {
  currentTense: TenseData | null;
  onSelectTense: (tenseId: string | null) => void;
  allTenses: TenseData[];
  onOpenTimeline: () => void;
  onOpenComparison: () => void;
  onOpenAITutor?: () => void;
  onOpenCheatSheet: () => void;
  onOpenStudentDashboard?: () => void;
  onOpenIrregularVerbs?: () => void;
  progress: UserOverallProgress;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTense,
  onSelectTense,
  allTenses,
  onOpenTimeline,
  onOpenComparison,
  onOpenAITutor,
  onOpenCheatSheet,
  onOpenStudentDashboard,
  onOpenIrregularVerbs,
  progress,
}) => {
  // Calculate total completed lessons across all 12 tenses (each tense has 7 lessons/units = 84 total)
  const totalLessons = allTenses.length * 7;
  let completedCount = 0;
  let passedExamsCount = 0;

  (Object.values(progress) as (UserOverallProgress[string])[]).forEach(p => {
    if (p) {
      completedCount += p.completedLessons?.length || 0;
      if (p.examPassed) passedExamsCount += 1;
    }
  });

  const progressPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 text-[#2D3748] shadow-[0_2px_10px_-2px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand Logo & Home trigger */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => onSelectTense(null)}
            title="إتقان الإنجليزية - العودة للرئيسية"
          >
            <ItqanLogo size="md" variant="color" showSubtitle={true} />
            <div className="hidden xl:flex items-center gap-2 border-r border-slate-200 pr-3 mr-1">
              <span className="text-xs text-slate-600 font-arabic font-medium">
                دورة الأزمنة وتراكيب SVO
              </span>
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Cheat Sheet Trigger */}
            <button
              id="btn-cheat-sheet"
              onClick={onOpenCheatSheet}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-[#2D3748] border border-slate-200 shadow-[0_2px_0_0_#e2e8f0] active:translate-y-[1.5px] active:shadow-none transition-all duration-200 cursor-pointer"
              title="جدول القواعد السريع"
            >
              <FileText className="w-3.5 h-3.5 text-[#ea9835]" />
              <span className="hidden md:inline font-arabic">جدول القواعد</span>
            </button>

            {/* Timeline Map Trigger */}
            <button
              id="btn-timeline-map"
              onClick={onOpenTimeline}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-[#2D3748] border border-slate-200 shadow-[0_2px_0_0_#e2e8f0] active:translate-y-[1.5px] active:shadow-none transition-all duration-200 cursor-pointer"
              title="خريطة الأزمنة الزمنية"
            >
              <Map className="w-3.5 h-3.5 text-[#214ecf]" />
              <span className="hidden md:inline font-arabic">خريطة الأزمنة</span>
            </button>

            {/* Comparison Matrix Trigger */}
            <button
              id="btn-comparison-matrix"
              onClick={onOpenComparison}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-[#2D3748] border border-slate-200 shadow-[0_2px_0_0_#e2e8f0] active:translate-y-[1.5px] active:shadow-none transition-all duration-200 cursor-pointer"
              title="مقارنة الأزمنة المتشابهة"
            >
              <BarChart3 className="w-3.5 h-3.5 text-[#e06045]" />
              <span className="hidden md:inline font-arabic">مقارنة الأزمنة</span>
            </button>

            {/* Irregular Verbs & Quiz Trigger */}
            {onOpenIrregularVerbs && (
              <button
                id="btn-irregular-verbs"
                onClick={onOpenIrregularVerbs}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-50/80 hover:bg-amber-100/90 text-amber-900 border border-amber-200/80 shadow-[0_2px_0_0_#fed7aa] active:translate-y-[1.5px] active:shadow-none transition-all duration-200 cursor-pointer"
                title="معجم واختبار الأفعال الشاذة التفاعلي"
              >
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden xl:inline font-arabic">الأفعال الشاذة</span>
              </button>
            )}

            {/* Student Dashboard Trigger */}
            {onOpenStudentDashboard && (
              <button
                id="btn-student-dashboard"
                onClick={onOpenStudentDashboard}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50/80 hover:bg-indigo-100/90 text-[#214ecf] border border-indigo-200/80 shadow-[0_2px_0_0_#c7d2fe] active:translate-y-[1.5px] active:shadow-none transition-all duration-200 cursor-pointer"
                title="مساحة الطالب والمؤقت والتقويم"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#214ecf]" />
                <span className="font-arabic">لوحة الطالب</span>
              </button>
            )}

            {/* Progress Badge */}
            <div 
              onClick={onOpenStudentDashboard}
              className="hidden lg:flex items-center gap-2.5 pr-2 border-r border-slate-200 pl-1 cursor-pointer hover:opacity-85 transition-opacity"
              title="انقر لفتح لوحة إنجاز الطالب والمؤقت"
            >
              <div className="text-right">
                <div className="text-xs font-semibold text-slate-600 font-arabic">
                  الإنجاز: <span className="text-[#214ecf] font-mono font-bold">{progressPercent}%</span>
                </div>
                <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden mt-1 border border-slate-200/70 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
                  <div 
                    className="bg-gradient-to-r from-[#214ecf] to-[#3b82f6] h-full rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
              <div 
                className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-[#ea9835] border border-amber-200/70 shadow-[0_2px_0_0_#fed7aa]" 
                title={`اجتزت ${passedExamsCount} اختبارات من أصل 12`}
              >
                <Award className="w-4 h-4" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
