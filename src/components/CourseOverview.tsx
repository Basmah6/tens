import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Sparkles, Award, ArrowLeft, CheckCircle2, Clock, 
  Search, Filter, PlayCircle, Check, ArrowRight, Zap, Volume2, Compass
} from 'lucide-react';
import { TenseData, UserOverallProgress } from '../types';
import { playEnglishAudio } from '../utils/audio';

interface CourseOverviewProps {
  allTenses: TenseData[];
  onSelectTense: (tenseId: string) => void;
  progress: UserOverallProgress;
}

export const CourseOverview: React.FC<CourseOverviewProps> = ({
  allTenses,
  onSelectTense,
  progress,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'present' | 'past' | 'future'>('all');
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'مبتدئ' | 'متوسط' | 'متقدم'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Overall Statistics
  let totalCompletedLessons = 0;
  let passedExamsCount = 0;
  let lastActiveTenseId: string | null = null;
  let maxCompletedInSingle = 0;

  // Level counts
  const beginnerCount = allTenses.filter(t => t.level === 'مبتدئ').length;
  const intermediateCount = allTenses.filter(t => t.level === 'متوسط').length;
  const advancedCount = allTenses.filter(t => t.level === 'متقدم').length;

  allTenses.forEach(t => {
    const p = progress[t.id];
    if (p) {
      const len = p.completedLessons?.length || 0;
      totalCompletedLessons += len;
      if (p.examPassed) passedExamsCount += 1;
      if (len > 0 && len < 7 && (!lastActiveTenseId || len >= maxCompletedInSingle)) {
        lastActiveTenseId = t.id;
        maxCompletedInSingle = len;
      }
    }
  });

  const lastActiveTense = lastActiveTenseId ? allTenses.find(t => t.id === lastActiveTenseId) : null;
  const totalCourseLessons = allTenses.length * 7; // 84 units
  const totalCoursePercent = Math.min(100, Math.round((totalCompletedLessons / totalCourseLessons) * 100));

  // Filtered Tenses
  const filteredTenses = useMemo(() => {
    return allTenses.filter(tense => {
      const matchCat = selectedCategory === 'all' || tense.category === selectedCategory;
      const matchLevel = selectedLevel === 'all' || tense.level === selectedLevel;
      const query = searchQuery.trim().toLowerCase();
      const matchSearch = !query || 
        tense.nameAr.toLowerCase().includes(query) ||
        tense.nameEn.toLowerCase().includes(query) ||
        tense.shortFormula.toLowerCase().includes(query) ||
        tense.summaryAr.toLowerCase().includes(query);
      return matchCat && matchLevel && matchSearch;
    });
  }, [allTenses, selectedCategory, selectedLevel, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" dir="rtl">
      
      {/* Master Hero Banner */}
      <div className="rounded-2xl bg-[#214ecf] border border-[#1a3eb0] p-6 sm:p-10 text-white shadow-[0_14px_30px_-6px_rgba(33,78,207,0.35),0_4px_12px_rgba(33,78,207,0.15)] relative overflow-hidden">
        {/* Subtle decorative background gradient orbs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-300/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold border border-white/25 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>إتقان English</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-[1.3] font-arabic">
            دورة إتقان أزمنة اللغة الإنجليزية (12 زمناً)
          </h1>

          <p className="text-xs sm:text-sm font-semibold text-blue-100 font-sans-en tracking-wide" dir="ltr">
            Master All 12 English Tenses — From SVO Structure to Full Fluency
          </p>

          <p className="text-blue-50 text-xs sm:text-sm md:text-base leading-[1.75] font-arabic max-w-2xl font-normal">
            دورة شاملة وتفاعلية لإتقان كافة أزمنة اللغة الإنجليزية الـ 12، وضبط تراكيب الجمل الإنجليزية (SVO)، مع شروحات دقيقة، تمارين تكوين وتصحيح ذكي، واختبارات قياس متكاملة.
          </p>

          {/* Metric Highlights */}
          <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_6px_rgba(0,0,0,0.08)]">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">12</div>
              <div className="text-[11px] text-blue-100 font-semibold mt-0.5 font-arabic">زمناً شاملاً</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_6px_rgba(0,0,0,0.08)]">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-300">72</div>
              <div className="text-[11px] text-blue-100 font-semibold mt-0.5 font-arabic">درساً وتدريباً تفاعلياً</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_6px_rgba(0,0,0,0.08)]">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-300">{passedExamsCount}/12</div>
              <div className="text-[11px] text-blue-100 font-semibold mt-0.5 font-arabic">اختبارات مجتازة</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_6px_rgba(0,0,0,0.08)]">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-200">{totalCoursePercent}%</div>
              <div className="text-[11px] text-blue-100 font-semibold mt-0.5 font-arabic">نسبة الإنجاز الكلية</div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Learning Resume Banner (if student has active in-progress tense) */}
      {lastActiveTense && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_2px_6px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#214ecf] border border-indigo-100 flex items-center justify-center shrink-0 shadow-2xs">
              <PlayCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#214ecf] font-arabic">متابعة التعلم من حيث توقفت</div>
              <h4 className="text-sm sm:text-base font-bold text-[#1E293B] font-arabic">
                {lastActiveTense.nameAr} <span className="text-xs font-mono text-slate-500">({lastActiveTense.nameEn})</span>
              </h4>
              <p className="text-xs text-slate-500 leading-normal">أنجزت {progress[lastActiveTense.id]?.completedLessons?.length || 0} من 7 وحدات</p>
            </div>
          </div>

          <button
            onClick={() => onSelectTense(lastActiveTense.id)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#214ecf] hover:bg-[#1a3eb0] text-white text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_3px_0_0_#153696,0_4px_10px_rgba(33,78,207,0.2)] active:translate-y-[2px] active:shadow-none cursor-pointer"
          >
            <span>استئناف الدرس</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Interactive Search & Multi-Filter Controls */}
      <div className="space-y-3.5 bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.04),0_2px_6px_rgba(0,0,0,0.02)]">
        
        {/* Search Input */}
        <div className="relative">
          <Compass className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن أي زمن بالاسم أو الصيغة (مثال: Past, Continuous, تام, مستمر, will)..."
            className="w-full pr-10 pl-4 py-2.5 bg-[#F8FAFC] border border-slate-200/90 rounded-xl text-xs sm:text-sm text-[#2D3748] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#214ecf]/20 focus:border-[#214ecf] focus:bg-white transition-all duration-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] font-arabic"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              مسح
            </button>
          )}
        </div>

        {/* Category & Level Filter Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          
          {/* Time Category Chips with Micro-Depth */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 active:translate-y-[1.5px] cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#1E293B] text-white shadow-[0_3px_0_0_#090d16] active:shadow-none'
                  : 'bg-slate-100 text-[#2D3748] hover:bg-slate-200/80 border border-slate-200 shadow-[0_2px_0_0_#e2e8f0] active:shadow-none'
              }`}
            >
              جميع الأزمنة (12)
            </button>

            <button
              onClick={() => setSelectedCategory('present')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 active:translate-y-[1.5px] cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'present'
                  ? 'bg-[#059669] text-white shadow-[0_3px_0_0_#047857] active:shadow-none'
                  : 'bg-emerald-50/80 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/80 shadow-[0_2px_0_0_#a7f3d0] active:shadow-none'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${selectedCategory === 'present' ? 'bg-white' : 'bg-emerald-500'}`} />
              <span>المضارع (Present - 4)</span>
            </button>

            <button
              onClick={() => setSelectedCategory('past')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 active:translate-y-[1.5px] cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'past'
                  ? 'bg-[#ea9835] text-white shadow-[0_3px_0_0_#c27b26] active:shadow-none'
                  : 'bg-amber-50/80 text-amber-900 hover:bg-amber-100 border border-amber-200/80 shadow-[0_2px_0_0_#fed7aa] active:shadow-none'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${selectedCategory === 'past' ? 'bg-white' : 'bg-[#ea9835]'}`} />
              <span>الماضي (Past - 4)</span>
            </button>

            <button
              onClick={() => setSelectedCategory('future')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 active:translate-y-[1.5px] cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'future'
                  ? 'bg-[#6366F1] text-white shadow-[0_3px_0_0_#4f46e5] active:shadow-none'
                  : 'bg-indigo-50/80 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/80 shadow-[0_2px_0_0_#c7d2fe] active:shadow-none'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${selectedCategory === 'future' ? 'bg-white' : 'bg-indigo-500'}`} />
              <span>المستقبل (Future - 4)</span>
            </button>
          </div>

          {/* Level Filter Dropdown / Buttons */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-600 font-bold hidden sm:inline flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#214ecf]" />
              المستوى:
            </span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as any)}
              className="bg-[#F8FAFC] hover:bg-slate-100 border border-slate-300 text-[#2D3748] rounded-xl px-3 py-1.5 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-[#214ecf]/20 focus:border-[#214ecf] cursor-pointer transition shadow-[0_2px_0_0_#e2e8f0]"
            >
              <option value="all">كافة المستويات ({allTenses.length})</option>
              <option value="مبتدئ">مبتدئ - A1/A2 ({beginnerCount})</option>
              <option value="متوسط">متوسط - B1/B2 ({intermediateCount})</option>
              <option value="متقدم">متقدم - C1 ({advancedCount})</option>
            </select>
          </div>

        </div>

      </div>

      {/* Tenses Grid */}
      {filteredTenses.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
          <p className="text-sm font-semibold mb-2">لم يتم العثور على أزمنة مطابقة للبحث أو الفلتر المختار</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedLevel('all');
            }}
            className="text-xs text-blue-600 hover:underline font-bold"
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTenses.map((tense) => {
            const tProg = progress[tense.id];
            const completedCount = tProg?.completedLessons?.length || 0;
            const isExamPassed = tProg?.examPassed || false;

            let categoryBadgeColor = 'bg-emerald-50/90 text-emerald-800 border-emerald-200/80';
            if (tense.category === 'past') categoryBadgeColor = 'bg-amber-50/90 text-amber-800 border-amber-200/80';
            if (tense.category === 'future') categoryBadgeColor = 'bg-indigo-50/90 text-indigo-700 border-indigo-200/80';

            let levelBadgeColor = 'bg-emerald-50/80 text-emerald-700 border-emerald-200/70';
            if (tense.level === 'متوسط') levelBadgeColor = 'bg-sky-50/80 text-sky-700 border-sky-200/70';
            if (tense.level === 'متقدم') levelBadgeColor = 'bg-purple-50/80 text-purple-700 border-purple-200/70';

            return (
              <div
                key={tense.id}
                onClick={() => onSelectTense(tense.id)}
                className="group bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.04),0_2px_6px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_35px_-6px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.03)] hover:border-slate-300 hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Card Top Pill */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold font-arabic border shadow-2xs ${categoryBadgeColor}`}>
                        {tense.category === 'present' ? 'مضارع' : tense.category === 'past' ? 'ماضي' : 'مستقبل'}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-arabic border shadow-2xs ${levelBadgeColor}`}>
                        {tense.level === 'مبتدئ' ? 'مبتدئ (A1-A2)' : tense.level === 'متوسط' ? 'متوسط (B1-B2)' : 'متقدم (C1)'}
                      </span>
                    </div>

                    {isExamPassed ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold shadow-2xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        مجتاز ({tProg?.examScore || 100}%)
                      </span>
                    ) : completedCount > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 text-[#214ecf] border border-indigo-200/80 text-[11px] font-bold shadow-2xs">
                        قيد الإنجاز
                      </span>
                    ) : null}
                  </div>

                  {/* Tense Titles */}
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#1E293B] group-hover:text-[#214ecf] transition font-arabic">
                        {tense.nameAr}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 font-sans-en tracking-normal text-left" dir="ltr">
                        {tense.nameEn}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playEnglishAudio(tense.nameEn);
                      }}
                      className="p-1.5 text-slate-400 hover:text-[#214ecf] hover:bg-indigo-50/80 rounded-lg transition-all duration-200 shrink-0 cursor-pointer"
                      title="استمع لنطق اسم الزمن"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Formula Chip */}
                  <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-2.5 text-xs font-mono font-medium text-[#2D3748] text-left my-2.5 group-hover:bg-indigo-50/30 group-hover:border-indigo-200/60 transition-colors duration-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]" dir="ltr">
                    {tense.shortFormula}
                  </div>

                  <p className="text-xs text-[#4A5568] leading-[1.7] font-arabic line-clamp-2 mb-3 font-normal">
                    {tense.summaryAr}
                  </p>
                </div>

                {/* Card Footer: Lesson Progress Bar & CTA */}
                <div className="pt-3 border-t border-slate-100">
                   <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5 font-arabic">
                    <span>الوحدات المكتملة: {completedCount} / 7</span>
                    <span className="font-mono font-bold text-[#214ecf]">{Math.round((completedCount / 7) * 100)}%</span>
                  </div>
                  
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3 border border-slate-200/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        isExamPassed ? 'bg-emerald-500' : 'bg-gradient-to-r from-[#214ecf] to-[#3b82f6]'
                      }`}
                      style={{ width: `${(completedCount / 7) * 100}%` }}
                    />
                  </div>

                  <button className="w-full py-2.5 rounded-xl bg-[#84a5f2] group-hover:bg-[#214ecf] hover:bg-[#214ecf] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_3px_0_0_#5b82df,0_4px_12px_rgba(132,165,242,0.3)] group-hover:shadow-[0_3px_0_0_#153696,0_6px_16px_rgba(33,78,207,0.35)] hover:shadow-[0_3px_0_0_#153696,0_6px_16px_rgba(33,78,207,0.35)] active:translate-y-[2px] active:shadow-none font-arabic cursor-pointer">
                    <span>فتح وحدات الدرس (7 وحدات)</span>
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

