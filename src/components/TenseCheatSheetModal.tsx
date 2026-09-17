import React, { useState } from 'react';
import { X, FileText, Search, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';
import { allTenses } from '../data/tensesData';
import { playEnglishAudio } from '../utils/audio';

interface TenseCheatSheetModalProps {
  onSelectTense: (tenseId: string) => void;
  onClose: () => void;
}

export const TenseCheatSheetModal: React.FC<TenseCheatSheetModalProps> = ({
  onSelectTense,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = allTenses.filter(t => 
    t.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.shortFormula.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyFormula = (id: string, formula: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6" dir="rtl">
      <div className="bg-[#0F172A] border border-slate-700 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col text-white shadow-2xl overflow-hidden animate-fadeIn">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-700 flex items-center justify-between bg-[#1E293B]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-arabic">
                جدول القواعد السريع لجميع الأزمنة (All 12 Tenses Cheat Sheet)
              </h2>
              <p className="text-xs text-slate-400 font-arabic">
                مرجع سريع للهياكل وصيغ الإثبات والنفي والسؤال والكلمات الدالة
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

        {/* Search Bar */}
        <div className="p-3.5 bg-slate-900 border-b border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث بالاسم أو الهيكل (مثال: past, continuous, will, have been)..."
              className="w-full pr-10 pl-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-arabic"
            />
          </div>
        </div>

        {/* Table / Grid Container */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#0B1120] space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map(t => {
              const categoryColor = t.category === 'present' 
                ? 'border-blue-500/40 bg-blue-950/20 text-blue-300'
                : t.category === 'past'
                ? 'border-amber-500/40 bg-amber-950/20 text-amber-300'
                : 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300';

              return (
                <div 
                  key={t.id}
                  className="bg-[#1E293B] border border-slate-700 hover:border-slate-500 rounded-xl p-4 flex flex-col justify-between transition group shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${categoryColor}`}>
                        {t.category === 'present' ? 'مضارع' : t.category === 'past' ? 'ماضي' : 'مستقبل'}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {t.level}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-0.5 font-arabic">
                      {t.nameAr}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mb-2" dir="ltr">
                      {t.nameEn}
                    </p>

                    {/* Formula Box */}
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-2 flex items-center justify-between gap-2 mb-2" dir="ltr">
                      <code className="text-xs text-emerald-400 font-mono font-bold truncate">
                        {t.shortFormula}
                      </code>
                      <button
                        onClick={() => handleCopyFormula(t.id, t.shortFormula)}
                        className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 shrink-0 transition"
                        title="نسخ الصيغة"
                      >
                        {copiedId === t.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Key Words */}
                    <div className="text-[11px] text-slate-400 mb-3 font-arabic">
                      <span className="text-slate-300 font-semibold">الكلمات الدالة:</span> {t.usageLesson.keywords.slice(0, 3).map(m => m.word).join(', ')}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectTense(t.id);
                      onClose();
                    }}
                    className="w-full py-2 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <span>فتح دروس الزمن</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 border-t border-slate-700 flex items-center justify-between bg-[#1E293B] text-xs text-slate-400">
          <span>إجمالي الأزمنة: {filtered.length} من {allTenses.length}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
