import React from 'react';
import { X, Clock, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { TenseData } from '../types';

interface TenseTimelineProps {
  allTenses: TenseData[];
  onSelectTense: (tenseId: string) => void;
  onClose: () => void;
}

export const TenseTimeline: React.FC<TenseTimelineProps> = ({
  allTenses,
  onSelectTense,
  onClose,
}) => {
  const sortedTenses = [...allTenses].sort((a, b) => a.timelinePoint - b.timelinePoint);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6" dir="rtl">
      <div className="bg-[#0F172A] border border-slate-700 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col text-white shadow-xl overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-700 flex items-center justify-between bg-[#1E293B]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-arabic">
                الخط الزمني الشامل للأزمنة الإنجليزية (Timeline Spectrum)
              </h2>
              <p className="text-xs text-slate-400 font-arabic">
                تصفح موقع كل زمن من الـ 12 زمناً على الخط الزمني التفاعلي
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Timeline Visual Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-[#0B1120]">
          
          {/* Legend Banner */}
          <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-slate-800">
            <span className="flex items-center gap-1.5 text-[#ea9835] font-bold">
              <ArrowRight className="w-3.5 h-3.5 rotate-180 text-[#ea9835]" />
              الماضي (Past)
            </span>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-bold rounded-full border border-emerald-500/30">
              الحاضر (Present / Now)
            </span>
            <span className="flex items-center gap-1.5 text-indigo-300 font-bold">
              المستقبل (Future)
              <ArrowLeft className="w-3.5 h-3.5 rotate-180 text-indigo-400" />
            </span>
          </div>

          {/* Cards along the continuum */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Past Column */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#ea9835] border-b border-[#ea9835]/30 pb-1.5 flex items-center justify-between">
                <span>أزمنة الماضي (4)</span>
                <span className="w-2 h-2 rounded-full bg-[#ea9835]"></span>
              </div>
              {sortedTenses.filter(t => t.category === 'past').map(t => (
                <div
                  key={t.id}
                  onClick={() => {
                    onSelectTense(t.id);
                    onClose();
                  }}
                  className="bg-[#1E293B] hover:bg-slate-800 border border-slate-700/80 hover:border-[#ea9835]/50 rounded-xl p-3.5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 shadow-xs group"
                >
                  <div className="text-xs font-bold text-[#ea9835] mb-0.5">{t.nameAr}</div>
                  <div className="text-xs font-mono font-bold text-slate-300 mb-1.5" dir="ltr">{t.nameEn}</div>
                  <div className="text-[11px] text-slate-400 leading-relaxed font-arabic">
                    {t.timelineDescriptionAr}
                  </div>
                </div>
              ))}
            </div>

            {/* Present Column */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 border-b border-emerald-500/30 pb-1.5 flex items-center justify-between">
                <span>أزمنة المضارع (4)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              {sortedTenses.filter(t => t.category === 'present').map(t => (
                <div
                  key={t.id}
                  onClick={() => {
                    onSelectTense(t.id);
                    onClose();
                  }}
                  className="bg-[#1E293B] hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 rounded-xl p-3.5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 shadow-xs group"
                >
                  <div className="text-xs font-bold text-emerald-400 mb-0.5">{t.nameAr}</div>
                  <div className="text-xs font-mono font-bold text-slate-200 mb-1.5" dir="ltr">{t.nameEn}</div>
                  <div className="text-[11px] text-slate-400 leading-relaxed font-arabic">
                    {t.timelineDescriptionAr}
                  </div>
                </div>
              ))}
            </div>

            {/* Future Column */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-300 border-b border-indigo-500/30 pb-1.5 flex items-center justify-between">
                <span>أزمنة المستقبل (4)</span>
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              </div>
              {sortedTenses.filter(t => t.category === 'future').map(t => (
                <div
                  key={t.id}
                  onClick={() => {
                    onSelectTense(t.id);
                    onClose();
                  }}
                  className="bg-[#1E293B] hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/50 rounded-xl p-3.5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 shadow-xs group"
                >
                  <div className="text-xs font-bold text-indigo-300 mb-0.5">{t.nameAr}</div>
                  <div className="text-xs font-mono font-bold text-slate-200 mb-1.5" dir="ltr">{t.nameEn}</div>
                  <div className="text-[11px] text-slate-400 leading-relaxed font-arabic">
                    {t.timelineDescriptionAr}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-700 flex justify-end bg-[#1E293B]">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
