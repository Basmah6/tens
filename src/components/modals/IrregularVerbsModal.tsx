import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, Search, Volume2, Sparkles, BookOpen, HelpCircle, 
  RotateCcw, CheckCircle2, AlertCircle, ArrowLeft,
  LayoutGrid, Table, ArrowUpDown, Maximize2, Minimize2,
  Copy, Check, Info, Sparkle, BookmarkCheck
} from 'lucide-react';
import { 
  IRREGULAR_VERBS_DATA, 
  IrregularVerbItem, 
  getV2V3TenseRoleAr 
} from '../../data/irregularVerbsData';
import { playEnglishAudio } from '../../utils/audio';
import { generateChallengingOptions } from '../../utils/irregularQuizDistractors';

interface IrregularVerbsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenseId: string;
  tenseNameAr: string;
  tenseNameEn: string;
}

// Helper to compute correct V-ing (Present Participle / Gerund)
function getVingForm(base: string): string {
  const b = base.toLowerCase();
  if (b === 'die') return 'dying';
  if (b === 'lie') return 'lying';
  if (b === 'tie') return 'tying';
  if (b === 'be') return 'being';
  if (b === 'see') return 'seeing';
  if (b === 'agree') return 'agreeing';
  if (b === 'flee') return 'fleeing';
  
  const cvcDoubles: Record<string, string> = {
    cut: 'cutting',
    hit: 'hitting',
    let: 'letting',
    put: 'putting',
    run: 'running',
    set: 'setting',
    shut: 'shutting',
    sit: 'sitting',
    swim: 'swimming',
    win: 'winning',
    begin: 'beginning',
    forget: 'forgetting',
    get: 'getting',
    spin: 'spinning',
    spit: 'spitting',
    dig: 'digging',
  };
  if (cvcDoubles[b]) return cvcDoubles[b];

  if (b.endsWith('e') && !b.endsWith('ee')) {
    return b.slice(0, -1) + 'ing';
  }
  return b + 'ing';
}

// Helper to compute 3rd Person Singular Present (-s/-es)
function getThirdPersonForm(base: string): string {
  const b = base.toLowerCase();
  if (b === 'have') return 'has';
  if (b === 'be') return 'is';
  if (b === 'do') return 'does';
  if (b === 'go') return 'goes';
  if (b.endsWith('ch') || b.endsWith('sh') || b.endsWith('ss') || b.endsWith('x') || b.endsWith('zz')) {
    return b + 'es';
  }
  return b + 's';
}

export const IrregularVerbsModal: React.FC<IrregularVerbsModalProps> = ({
  isOpen,
  onClose,
  tenseId,
  tenseNameAr,
  tenseNameEn,
}) => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'table' | 'quiz'>('table');
  
  // Window sizing & inspection states - default to auto-expanded (true) on open
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [selectedVerbId, setSelectedVerbId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Automatically expand to full size immediately after clicking to open
  useEffect(() => {
    if (isOpen) {
      setIsFullscreen(true);
    }
  }, [isOpen]);

  // Browsing & Filter controls
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [selectedPattern, setSelectedPattern] = useState<string>('all');
  const [onlyCommon, setOnlyCommon] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [sortBy, setSortBy] = useState<'alpha' | 'pattern'>('alpha');

  // Quick quiz states
  const [quizTarget, setQuizTarget] = useState<'v2' | 'v3'>(tenseId === 'past_simple' ? 'v2' : 'v3');
  const [quizFilter, setQuizFilter] = useState<'common' | 'all'>('common');
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });

  // Specific role of V2/V3 for the active tense
  const roleInfo = useMemo(() => getV2V3TenseRoleAr(tenseId), [tenseId]);

  // Which column is central to this lesson?
  const isV2Target = tenseId === 'past_simple';
  const isV3Target = tenseId === 'present_perfect' || tenseId === 'past_perfect' || tenseId === 'future_perfect';

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, onClose]);

  // Filtered & Sorted Verbs
  const filteredVerbs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    let list = IRREGULAR_VERBS_DATA.filter((item) => {
      // 1. Common only filter
      if (onlyCommon && !item.isCommon) return false;

      // 2. Pattern filter
      if (selectedPattern !== 'all' && item.pattern !== selectedPattern) return false;

      // 3. Letter filter
      if (selectedLetter !== 'ALL') {
        if (!item.base.toUpperCase().startsWith(selectedLetter)) return false;
      }

      // 4. Search query
      if (!q) return true;

      const matchEn = 
        item.base.toLowerCase().includes(q) ||
        item.past.toLowerCase().includes(q) ||
        item.pastParticiple.toLowerCase().includes(q);
      const matchAr = item.meaningAr.includes(q) || (item.notesAr && item.notesAr.includes(q));

      return matchEn || matchAr;
    });

    // Sort order
    if (sortBy === 'alpha') {
      list = [...list].sort((a, b) => a.base.localeCompare(b.base));
    }

    return list;
  }, [searchQuery, selectedLetter, selectedPattern, onlyCommon, sortBy]);

  // Active selected verb for detailed inspector
  const activeSelectedVerb = useMemo(() => {
    if (!selectedVerbId) return null;
    return IRREGULAR_VERBS_DATA.find((v) => v.id === selectedVerbId) || null;
  }, [selectedVerbId]);

  // Group verbs by first letter for easier scanning when showing all
  const groupedVerbs = useMemo(() => {
    if (sortBy !== 'alpha' || selectedLetter !== 'ALL' || searchQuery) {
      return null;
    }
    const map: Record<string, IrregularVerbItem[]> = {};
    filteredVerbs.forEach((item) => {
      const letter = item.base.charAt(0).toUpperCase();
      if (!map[letter]) map[letter] = [];
      map[letter].push(item);
    });
    return map;
  }, [filteredVerbs, sortBy, selectedLetter, searchQuery]);

  // Copy helper
  const handleCopyVerb = (item: IrregularVerbItem) => {
    const ving = getVingForm(item.base);
    const text = `V1: ${item.base} | V2: ${item.past} | V3: ${item.pastParticiple} | V-ing: ${ving} (${item.meaningAr})`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 1800);
    }
  };

  // Quick Quiz Question item - Challenging deceptive distractors
  const currentQuizItem = useMemo(() => {
    const pool =
      quizFilter === 'common'
        ? IRREGULAR_VERBS_DATA.filter((v) => v.isCommon)
        : IRREGULAR_VERBS_DATA;
    const item = pool[quizIndex % pool.length];

    const { options, correctAnswer, explanation } = generateChallengingOptions(item, quizTarget);

    return {
      verb: item,
      correctAnswer,
      options,
      explanation,
      poolLength: pool.length,
    };
  }, [quizIndex, quizTarget, quizFilter]);

  const handleSelectQuizOption = (option: string) => {
    if (quizSelectedOption) return;
    setQuizSelectedOption(option);
    const isCorrect = option === currentQuizItem.correctAnswer;
    
    if (isCorrect) {
      playEnglishAudio(currentQuizItem.correctAnswer);
      setQuizScore((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      setQuizScore((prev) => ({ correct: prev.correct, total: prev.total + 1 }));
    }
  };

  const handleNextQuizQuestion = () => {
    setQuizSelectedOption(null);
    setQuizIndex((prev) => prev + 1);
  };

  const handleResetQuiz = () => {
    setQuizSelectedOption(null);
    setQuizIndex(0);
    setQuizScore({ correct: 0, total: 0 });
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedLetter('ALL');
    setSelectedPattern('all');
    setOnlyCommon(false);
  };

  if (!isOpen) return null;

  return (
    <div
      id="irregular-verbs-modal-overlay"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs animate-fadeIn transition-all duration-200 ${
        isFullscreen ? 'p-0' : 'p-1 sm:p-3 md:p-4'
      }`}
      dir="rtl"
      onClick={onClose}
    >
      <div
        id="irregular-verbs-modal-container"
        className={`bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden transition-all duration-200 mx-auto ${
          isFullscreen
            ? 'w-full h-full max-w-none rounded-none'
            : 'w-[90vw] max-w-[1200px] h-[92vh] sm:h-[90vh] rounded-2xl sm:rounded-3xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================================= */}
        {/* 1. EXPANDED & SPACIOUS HEADER BANNER */}
        {/* ========================================================================= */}
        <div className="bg-slate-900 text-white px-5 py-4 sm:px-8 sm:py-5 border-b border-slate-800 shrink-0">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Title & Context */}
            <div className="flex items-start sm:items-center gap-3.5 min-w-0">
              <div className="p-3 rounded-2xl bg-amber-400/20 border border-amber-400/30 text-amber-300 shadow-sm shrink-0 mt-0.5 sm:mt-0">
                <Sparkles className="w-6 h-6 text-amber-400" />
              </div>
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-base sm:text-lg lg:text-xl font-black text-white font-arabic">
                    جدول الأفعال الشاذة (Irregular Verbs)
                  </h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800/90 text-amber-300 border border-slate-700 font-mono font-bold">
                    {IRREGULAR_VERBS_DATA.length} فعلاً شاملاً
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-950/70 text-blue-300 border border-blue-800/60 font-arabic hidden sm:inline">
                    مرجع القواعد الأساسي
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm text-slate-300 font-arabic pt-0.5">
                  {roleInfo.badge ? (
                    <>
                      <span className="text-amber-400 font-bold">هدف درس {tenseNameAr}:</span>
                      <span className="bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-lg border border-amber-400/30 font-bold font-mono">
                        {roleInfo.badge}
                      </span>
                      <span className="text-slate-400">• {roleInfo.textAr}</span>
                    </>
                  ) : (
                    <span className="text-slate-400">
                      مرجع شامل وتفصيلي لكافة تصاريف الأفعال غير المنتظمة مع النطق الصوتي والأمثلة والقواعد.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Header Controls (Tabs + Fullscreen + Close) */}
            <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-center">
              {/* Tab Switcher */}
              <div className="flex items-center bg-slate-800/90 p-1 rounded-2xl border border-slate-700 shadow-xs">
                <button
                  id="tab-irregular-table"
                  onClick={() => setActiveTab('table')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                    activeTab === 'table'
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>جدول التصاريف الشامل</span>
                </button>
                <button
                  id="tab-irregular-quiz"
                  onClick={() => setActiveTab('quiz')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                    activeTab === 'quiz'
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>اختبار ذاتي فوري</span>
                </button>
              </div>

              {/* Fullscreen Button */}
              <button
                id="btn-toggle-irregular-fullscreen"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer shadow-xs"
                title={isFullscreen ? 'تصغير الحجم' : 'وضع ملء الشاشة الكامل (توسيع شامل)'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                id="btn-close-irregular-modal"
                onClick={onClose}
                className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer shadow-xs"
                title="إغلاق (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. TAB 1: COMPREHENSIVE BROWSING VIEW WITH SIDE INSPECTOR */}
        {/* ========================================================================= */}
        {activeTab === 'table' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/40">
            {/* TOOLBAR & CONTROLS (EXPANDED TO FULL WIDTH) */}
            <div className="p-3 sm:p-4 bg-white border-b border-slate-200 shrink-0 space-y-2.5 shadow-2xs">
              {/* Row 1: Search + Filter toggles */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5">
                {/* Search Box */}
                <div className="relative flex-1">
                  <input
                    id="input-irregular-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن أي فعل بالإنجليزية أو المعنى بالعربية (مثال: go, went, written, كتب، يشتري، يرى...)"
                    className="w-full pr-10 pl-20 py-2.5 rounded-xl border border-slate-300 bg-slate-50/70 focus:bg-white text-slate-900 text-xs sm:text-sm font-medium focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition shadow-2xs"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-200 px-2 py-0.5 rounded-md cursor-pointer"
                    >
                      مسح
                    </button>
                  )}
                </div>

                {/* Filter Actions */}
                <div className="flex items-center gap-2 flex-wrap shrink-0">
                  {/* Common Verbs Filter */}
                  <button
                    onClick={() => setOnlyCommon(!onlyCommon)}
                    className={`px-3 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                      onlyCommon
                        ? 'bg-amber-100 text-amber-950 border-amber-300 ring-2 ring-amber-400/20'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>⭐ الأفعال الأكثر استخداماً</span>
                  </button>

                  {/* Pattern Filter Selector */}
                  <div className="flex items-center bg-slate-100 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs">
                    <span className="text-slate-500 font-bold ml-1.5">النمط:</span>
                    <select
                      value={selectedPattern}
                      onChange={(e) => setSelectedPattern(e.target.value)}
                      className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer"
                    >
                      <option value="all">كل الأنماط ({IRREGULAR_VERBS_DATA.length})</option>
                      <option value="no_change">شكل واحد لا يتغير (V1 = V2 = V3)</option>
                      <option value="v2_equals_v3">تطابق الماضي والتام (V2 = V3)</option>
                      <option value="v1_equals_v3">المصدر يطابق التام (V1 = V3)</option>
                      <option value="all_different">3 تصاريف مختلفة كلياً</option>
                    </select>
                  </div>

                  {/* View Mode: Wide Table vs Visual Cards */}
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                    <button
                      onClick={() => setViewMode('table')}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        viewMode === 'table'
                          ? 'bg-white text-slate-900 shadow-2xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                      title="عرض الجدول الشامل"
                    >
                      <Table className="w-3.5 h-3.5" />
                      <span>جدول مفصّل</span>
                    </button>
                    <button
                      onClick={() => setViewMode('cards')}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        viewMode === 'cards'
                          ? 'bg-white text-slate-900 shadow-2xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                      title="عرض شبكة البطاقات الموسعة"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span>بطاقات واسعة</span>
                    </button>
                  </div>

                  {/* Sort Mode */}
                  <button
                    onClick={() => setSortBy(sortBy === 'alpha' ? 'pattern' : 'alpha')}
                    className="px-2.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    title="تبديل الترتيب"
                  >
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                    <span>{sortBy === 'alpha' ? 'ترتيب أبجدي (A-Z)' : 'ترتيب حسب النمط'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* MAIN EXPANSIVE WORKSPACE (SPLIT VIEW WHEN VERB IS SELECTED) */}
            {/* ========================================================================= */}
            <div className="flex-1 flex overflow-hidden relative">
              {/* Primary Content (Table or Cards) */}
              <div className="flex-1 overflow-y-auto px-3 sm:px-5 pt-1.5 pb-5 space-y-4">
                {filteredVerbs.length === 0 ? (
                  <div className="text-center py-20 text-slate-500 space-y-3">
                    <Search className="w-12 h-12 mx-auto text-slate-300" />
                    <p className="font-bold text-base text-slate-700">لم يتم العثور على أفعال مطابقة لمعايير البحث.</p>
                    <p className="text-xs text-slate-400">جرب كتابة كلمة أخرى أو إعادة ضبط الفلاتر الحالية.</p>
                    <button
                      onClick={clearAllFilters}
                      className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition cursor-pointer shadow-xs"
                    >
                      إعادة ضبط كل الفلاتر
                    </button>
                  </div>
                ) : viewMode === 'cards' ? (
                  /* ========================================================================= */
                  /* EXPANDED CARDS GRID MODE */
                  /* ========================================================================= */
                  <div className="space-y-6">
                    {groupedVerbs ? (
                      Object.entries(groupedVerbs).map(([letter, items]) => (
                        <div key={letter} className="space-y-3">
                          <div className="flex items-center gap-2.5 bg-slate-100 py-2 px-3 rounded-xl border border-slate-200/90 shadow-2xs">
                            <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-mono font-black flex items-center justify-center text-sm shadow-2xs">
                              {letter}
                            </span>
                            <span className="text-xs font-bold text-slate-700 font-mono">
                              ({items.length} أفعال تبدأ بحرف {letter})
                            </span>
                            <div className="flex-1 h-px bg-slate-300"></div>
                          </div>

                          <div className={`grid gap-3.5 ${
                            activeSelectedVerb
                              ? 'grid-cols-1 sm:grid-cols-2'
                              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                          }`}>
                            {items.map((item) => (
                              <ComprehensiveVerbCard
                                key={item.id}
                                item={item}
                                isV2Target={isV2Target}
                                isV3Target={isV3Target}
                                isSelected={selectedVerbId === item.id}
                                onSelect={() => setSelectedVerbId(item.id === selectedVerbId ? null : item.id)}
                                onCopy={() => handleCopyVerb(item)}
                                isCopied={copiedId === item.id}
                              />
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className={`grid gap-3.5 ${
                        activeSelectedVerb
                          ? 'grid-cols-1 sm:grid-cols-2'
                          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                      }`}>
                        {filteredVerbs.map((item) => (
                          <ComprehensiveVerbCard
                            key={item.id}
                            item={item}
                            isV2Target={isV2Target}
                            isV3Target={isV3Target}
                            isSelected={selectedVerbId === item.id}
                            onSelect={() => setSelectedVerbId(item.id === selectedVerbId ? null : item.id)}
                            onCopy={() => handleCopyVerb(item)}
                            isCopied={copiedId === item.id}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  /* ========================================================================= */
                  /* EXPANDED COMPREHENSIVE TABLE VIEW (WIDE & RICH) */
                  /* ========================================================================= */
                  <div className="space-y-3">
                    {groupedVerbs ? (
                      Object.entries(groupedVerbs).map(([letter, items]) => (
                        <div key={letter} className="space-y-1.5">
                          <div className="flex items-center gap-2.5 bg-slate-100 py-1.5 px-3 rounded-xl border border-slate-200/90 shadow-2xs">
                            <span className="w-5 h-5 rounded-md bg-blue-600 text-white font-mono font-black flex items-center justify-center text-[11px] shadow-2xs">
                              {letter}
                            </span>
                            <span className="text-[11px] font-bold text-slate-700 font-mono">
                              {items.length} أفعال تبدأ بالحرف {letter}
                            </span>
                            <div className="flex-1 h-px bg-slate-300"></div>
                          </div>

                          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs bg-white">
                            <ComprehensiveTableView
                              items={items}
                              isV2Target={isV2Target}
                              isV3Target={isV3Target}
                              selectedVerbId={selectedVerbId}
                              onSelectVerb={(id) => setSelectedVerbId(id === selectedVerbId ? null : id)}
                              onCopyVerb={handleCopyVerb}
                              copiedId={copiedId}
                              isStickyHeader={false}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs bg-white">
                        <ComprehensiveTableView
                          items={filteredVerbs}
                          isV2Target={isV2Target}
                          isV3Target={isV3Target}
                          selectedVerbId={selectedVerbId}
                          onSelectVerb={(id) => setSelectedVerbId(id === selectedVerbId ? null : id)}
                          onCopyVerb={handleCopyVerb}
                          copiedId={copiedId}
                          isStickyHeader={true}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ========================================================================= */}
              {/* SIDE INSPECTOR PANEL (DEEP DIVE ON CLICKED VERB) */}
              {/* ========================================================================= */}
              {activeSelectedVerb && (
                <div className="absolute inset-y-0 left-0 z-30 w-full sm:w-80 lg:w-[350px] bg-white border-r border-slate-200 flex flex-col shadow-2xl animate-fadeIn 2xl:relative 2xl:shadow-none">
                  {/* Inspector Header */}
                  <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Sparkle className="w-4 h-4 text-amber-400" />
                      <span className="font-bold text-sm font-arabic">الفحص الشامل للفعل المختار</span>
                    </div>
                    <button
                      onClick={() => setSelectedVerbId(null)}
                      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                      title="إغلاق لوحة التفاصيل"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Inspector Content */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                    {/* Verb Title & Meaning */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-2xl font-black font-mono text-slate-900" dir="ltr">
                            {activeSelectedVerb.base}
                          </div>
                          <div className="text-base font-bold text-blue-600 font-arabic mt-0.5">
                            {activeSelectedVerb.meaningAr}
                          </div>
                        </div>
                        <button
                          onClick={() => handleCopyVerb(activeSelectedVerb)}
                          className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition flex items-center gap-1 cursor-pointer shadow-2xs"
                        >
                          {copiedId === activeSelectedVerb.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">تم النسخ</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>نسخ التصاريف</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
                        <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-arabic font-bold">
                          {activeSelectedVerb.patternAr}
                        </span>
                        {activeSelectedVerb.isCommon && (
                          <span className="bg-blue-100 text-blue-900 px-2 py-0.5 rounded-md font-arabic font-bold">
                            شائع جداً ⭐
                          </span>
                        )}
                      </div>
                    </div>

                    {/* All 4 Conjugation Forms */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-500 font-arabic">
                        جميع الصيغ والتصاريف الأربعة للفعل:
                      </div>

                      <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                        {/* V1 Base */}
                        <div
                          onClick={() => playEnglishAudio(activeSelectedVerb.base)}
                          className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 cursor-pointer transition"
                          dir="ltr"
                        >
                          <div className="flex items-center justify-between text-[10px] text-slate-400 font-sans">
                            <span>V1 (Infinitive)</span>
                            <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                          </div>
                          <div className="font-bold text-base text-slate-900 mt-1 truncate">
                            {activeSelectedVerb.base}
                          </div>
                        </div>

                        {/* V2 Past Simple */}
                        <div
                          onClick={() => playEnglishAudio(activeSelectedVerb.past)}
                          className={`p-3 rounded-xl border cursor-pointer transition ${
                            isV2Target
                              ? 'bg-amber-100 border-amber-300 text-amber-950 font-black ring-1 ring-amber-400/40 shadow-2xs'
                              : 'bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-900'
                          }`}
                          dir="ltr"
                        >
                          <div className="flex items-center justify-between text-[10px] font-sans">
                            <span className={isV2Target ? 'text-amber-800 font-bold' : 'text-slate-400'}>
                              V2 (Past Simple) {isV2Target && '★'}
                            </span>
                            <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                          </div>
                          <div className="font-bold text-base mt-1 truncate">
                            {activeSelectedVerb.past}
                          </div>
                        </div>

                        {/* V3 Past Participle */}
                        <div
                          onClick={() => playEnglishAudio(activeSelectedVerb.pastParticiple)}
                          className={`p-3 rounded-xl border cursor-pointer transition ${
                            isV3Target
                              ? 'bg-emerald-100 border-emerald-300 text-emerald-950 font-black ring-1 ring-emerald-400/40 shadow-2xs'
                              : 'bg-slate-50 hover:bg-emerald-50 border-slate-200 text-slate-900'
                          }`}
                          dir="ltr"
                        >
                          <div className="flex items-center justify-between text-[10px] font-sans">
                            <span className={isV3Target ? 'text-emerald-800 font-bold' : 'text-slate-400'}>
                              V3 (Past Part.) {isV3Target && '★'}
                            </span>
                            <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                          </div>
                          <div className="font-bold text-base mt-1 truncate">
                            {activeSelectedVerb.pastParticiple}
                          </div>
                        </div>

                        {/* V-ing Present Participle */}
                        <div
                          onClick={() => playEnglishAudio(getVingForm(activeSelectedVerb.base))}
                          className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200 cursor-pointer transition"
                          dir="ltr"
                        >
                          <div className="flex items-center justify-between text-[10px] text-slate-400 font-sans">
                            <span>V-ing (Continuous)</span>
                            <Volume2 className="w-3.5 h-3.5 text-purple-500" />
                          </div>
                          <div className="font-bold text-base text-slate-900 mt-1 truncate">
                            {getVingForm(activeSelectedVerb.base)}
                          </div>
                        </div>
                      </div>

                      {/* 3rd person singular tip */}
                      <div className="text-[11px] text-slate-500 bg-slate-100/80 p-2 rounded-xl flex items-center justify-between font-mono" dir="ltr">
                        <span className="text-slate-400 font-sans">3rd Person (He/She/It):</span>
                        <strong className="text-slate-800">{getThirdPersonForm(activeSelectedVerb.base)}</strong>
                      </div>
                    </div>

                    {/* Example Sentences in Context */}
                    <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-900 font-arabic">مثال عملي في سياق جملة:</span>
                        <button
                          onClick={() => playEnglishAudio(activeSelectedVerb.example)}
                          className="p-1 rounded-lg text-blue-600 hover:bg-blue-100 transition cursor-pointer"
                          title="استمع إلى الجملة بالكامل"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="font-mono text-xs sm:text-sm text-slate-900 text-left bg-white p-2.5 rounded-xl border border-blue-100" dir="ltr">
                        "{activeSelectedVerb.example}"
                      </div>
                      <div className="text-xs text-slate-600 font-arabic">
                        {activeSelectedVerb.exampleAr}
                      </div>
                    </div>

                    {/* How to use in current tense */}
                    <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 space-y-2 text-xs">
                      <span className="font-bold text-amber-900 font-arabic flex items-center gap-1.5">
                        <Info className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>تطبيق الفعل في درس {tenseNameAr}:</span>
                      </span>

                      <p className="text-slate-700 leading-relaxed font-arabic">
                        {isV2Target ? (
                          <>
                            في <strong>الماضي البسيط</strong>، استخدم التصريف الثاني مباشرة:{' '}
                            <code className="bg-white px-1.5 py-0.5 rounded border border-amber-300 font-mono font-bold text-amber-900" dir="ltr">
                              {activeSelectedVerb.past}
                            </code>{' '}
                            (مثل: <em>I {activeSelectedVerb.past} yesterday</em>).
                          </>
                        ) : isV3Target ? (
                          <>
                            في <strong>الأزمنة التامة</strong>، استخدم فعل مساعد + التصريف الثالث:{' '}
                            <code className="bg-white px-1.5 py-0.5 rounded border border-emerald-300 font-mono font-bold text-emerald-900" dir="ltr">
                              have / has + {activeSelectedVerb.pastParticiple}
                            </code>.
                          </>
                        ) : (
                          <>
                            الصيغة الأساسية لهذا الفعل هي{' '}
                            <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono font-bold" dir="ltr">
                              {activeSelectedVerb.base}
                            </code>
                            ، وصيغة الاستمرار هي{' '}
                            <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono font-bold" dir="ltr">
                              {getVingForm(activeSelectedVerb.base)}
                            </code>.
                          </>
                        )}
                      </p>
                    </div>

                    {/* Pronounce full triplet */}
                    <button
                      onClick={() =>
                        playEnglishAudio(
                          `${activeSelectedVerb.base}... ${activeSelectedVerb.past}... ${activeSelectedVerb.pastParticiple}`
                        )
                      }
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold font-arabic transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Volume2 className="w-4 h-4 text-amber-400" />
                      <span>الاستماع لتصريف الفعل بالكامل (V1 ➔ V2 ➔ V3)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Status bar */}
            <div className="px-4 py-2.5 bg-white border-t border-slate-200 shrink-0 flex items-center justify-between text-xs text-slate-500 font-arabic">
              <div className="flex items-center gap-3 flex-wrap">
                <span>
                  إجمالي الأفعال المعروضة: <strong>{filteredVerbs.length}</strong> من أصل {IRREGULAR_VERBS_DATA.length} فعلاً
                </span>
                {onlyCommon && (
                  <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 font-bold">
                    الأكثر شيوعاً فقط
                  </span>
                )}
                {selectedLetter !== 'ALL' && (
                  <span className="text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200 font-bold">
                    الحرف: {selectedLetter}
                  </span>
                )}
                <span className="text-slate-400 hidden sm:inline">
                  • انقر على أي سطر أو بطاقة لفتح الفحص الشامل للفعل بكافة صيغه
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition cursor-pointer text-xs hidden sm:inline-flex items-center gap-1"
                >
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  <span>{isFullscreen ? 'تصغير' : 'ملء الشاشة'}</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition cursor-pointer text-xs"
                >
                  إغلاق النافذة
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. TAB 2: SELF-QUIZ */}
        {/* ========================================================================= */}
        {activeTab === 'quiz' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/60">
            <div className="max-w-2xl mx-auto w-full flex flex-col items-center justify-start space-y-4">
              {/* Quiz Control & Stats Header Bar */}
              <div className="w-full flex items-center justify-between flex-wrap gap-2.5 bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200 shadow-2xs">
                {/* Target & Scope Selectors */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-600 px-1.5 font-arabic">التصريف:</span>
                    <button
                      onClick={() => {
                        setQuizTarget('v2');
                        handleResetQuiz();
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                        quizTarget === 'v2'
                          ? 'bg-amber-500 text-slate-950 font-black shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      الماضي (V2)
                    </button>
                    <button
                      onClick={() => {
                        setQuizTarget('v3');
                        handleResetQuiz();
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                        quizTarget === 'v3'
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      التام (V3)
                    </button>
                  </div>

                  {/* Pool Scope */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button
                      onClick={() => {
                        setQuizFilter('common');
                        handleResetQuiz();
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                        quizFilter === 'common'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      الأكثر شيوعاً (45)
                    </button>
                    <button
                      onClick={() => {
                        setQuizFilter('all');
                        handleResetQuiz();
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                        quizFilter === 'all'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      كافة الأفعال (150+)
                    </button>
                  </div>
                </div>

                {/* Score & Reset Controls */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-xl border border-slate-200 text-xs font-bold font-arabic">
                    <span className="text-slate-500">النتيجة:</span>
                    <span className="text-slate-900 font-mono text-sm">{quizScore.correct} / {quizScore.total}</span>
                    {quizScore.total > 0 && (
                      <span className="text-emerald-700 font-mono text-xs mr-1 bg-emerald-100 px-1.5 py-0.2 rounded font-bold">
                        {Math.round((quizScore.correct / quizScore.total) * 100)}%
                      </span>
                    )}
                  </div>

                  <button
                    onClick={handleResetQuiz}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition flex items-center gap-1 cursor-pointer text-xs font-bold font-arabic"
                    title="إعادة ضبط الاختبار"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">إعادة</span>
                  </button>
                </div>
              </div>

              {/* Question Card */}
              <div className="w-full bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 text-center space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 font-arabic">
                      السؤال رقم {quizIndex + 1}
                    </span>
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200 font-arabic flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-indigo-600" />
                      <span>تحدي إملائي وتصريفي</span>
                    </span>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg font-mono ${
                    quizTarget === 'v2' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                  }`}>
                    المطلوب: {quizTarget === 'v2' ? 'V2 Past Simple' : 'V3 Past Participle'}
                  </span>
                </div>

                <div className="space-y-1 py-1">
                  <h4 className="text-xs text-slate-500 font-arabic">
                    ما هو {quizTarget === 'v2' ? 'التصريف الثاني (V2 - Past Simple)' : 'التصريف الثالث (V3 - Past Participle)'} للفعل:
                  </h4>
                  <div className="flex items-center justify-center gap-2 pt-1">
                    <div className="text-3xl sm:text-4xl font-black font-mono text-slate-900" dir="ltr">
                      {currentQuizItem.verb.base}
                    </div>
                    <button
                      onClick={() => playEnglishAudio(currentQuizItem.verb.base)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                      title="استمع لنطق المصدر"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-sm font-bold text-blue-700 font-arabic">
                    ({currentQuizItem.verb.meaningAr})
                  </div>
                  <div className="text-xs text-slate-400 font-arabic">
                    النمط: {currentQuizItem.verb.patternAr}
                  </div>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2" dir="ltr">
                  {currentQuizItem.options.map((option, idx) => {
                    const isSelected = quizSelectedOption === option;
                    const isCorrect = option === currentQuizItem.correctAnswer;
                    
                    let btnClass = 'bg-slate-50 hover:bg-blue-50/60 border-slate-200 hover:border-blue-300 text-slate-800';
                    if (quizSelectedOption) {
                      if (isCorrect) {
                        btnClass = 'bg-emerald-500 text-white border-emerald-600 font-bold shadow-xs';
                      } else if (isSelected) {
                        btnClass = 'bg-red-500 text-white border-red-600 font-bold shadow-xs';
                      } else {
                        btnClass = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectQuizOption(option)}
                        disabled={quizSelectedOption !== null}
                        className={`p-3 rounded-xl border text-sm sm:text-base font-mono font-bold transition flex items-center justify-between cursor-pointer ${btnClass}`}
                      >
                        <span>{option}</span>
                        {quizSelectedOption && isCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                        {quizSelectedOption && isSelected && !isCorrect && <AlertCircle className="w-5 h-5 text-white" />}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback and Next */}
                {quizSelectedOption && (
                  <div className="pt-2 animate-fadeIn space-y-3">
                    <div className={`p-3.5 rounded-xl text-xs font-arabic space-y-2 text-right ${
                      quizSelectedOption === currentQuizItem.correctAnswer
                        ? 'bg-emerald-50 text-emerald-950 border border-emerald-200'
                        : 'bg-red-50 text-red-950 border border-red-200'
                    }`}>
                      <div className="font-bold flex items-center gap-1.5 text-sm">
                        {quizSelectedOption === currentQuizItem.correctAnswer ? (
                          <>
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                            <span>إجابة صحيحة وممتازة! 🎉</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4.5 h-4.5 text-red-600 shrink-0" />
                            <span>إجابة غير صحيحة. الإجابة الصحيحة هي: <strong className="font-mono text-base underline mr-1">{currentQuizItem.correctAnswer}</strong></span>
                          </>
                        )}
                      </div>

                      {/* Explanation of the distractor trap */}
                      {currentQuizItem.explanation && (
                        <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200/80 text-slate-800 text-xs leading-relaxed font-arabic">
                          <strong className="text-amber-800 ml-1">💡 تنبيه القاعدة:</strong>
                          <span>{currentQuizItem.explanation}</span>
                        </div>
                      )}

                      <div className="text-[11px] text-slate-700 font-mono bg-white/70 p-2 rounded-lg border border-slate-200/60" dir="ltr">
                        <span className="text-slate-500 font-sans">التصريفات القياسية: </span>
                        <strong>V1:</strong> {currentQuizItem.verb.base} | <strong>V2:</strong> {currentQuizItem.verb.past} | <strong>V3:</strong> {currentQuizItem.verb.pastParticiple}
                      </div>
                      {currentQuizItem.verb.example && (
                        <div className="text-[11px] text-slate-700 font-arabic pt-0.5">
                          <span className="font-bold text-slate-900">مثال في جملة: </span>
                          <span className="font-mono" dir="ltr">"{currentQuizItem.verb.example}"</span>
                          <span className="text-slate-500 block sm:inline sm:mr-1">({currentQuizItem.verb.exampleAr})</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleNextQuizQuestion}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold font-arabic transition flex items-center justify-center gap-2 mx-auto cursor-pointer shadow-xs"
                    >
                      <span>السؤال التالي</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Helpful Tips Card */}
              <div className="w-full bg-amber-50/70 border border-amber-200/70 rounded-xl p-3 sm:p-4 text-right flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-950 font-arabic space-y-0.5 leading-relaxed">
                  <span className="font-bold">نصيحة لتسهيل الحفظ:</span>
                  <p className="text-amber-900/90 text-[11px]">
                    قسّم الأفعال الشاذة إلى مجموعات حسب نمط التغيير (مثل: الأفعال التي تبقى ثابتة: cost - cost - cost، أو التي ينتهي تصريفها الثالث بـ -en: write - wrote - written). هذا يختصر وقت الحفظ بنسبة 70%!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// SUB-COMPONENT: EXPANDED COMPREHENSIVE TABLE VIEW
// =========================================================================
interface ComprehensiveTableViewProps {
  items: IrregularVerbItem[];
  isV2Target: boolean;
  isV3Target: boolean;
  selectedVerbId: string | null;
  onSelectVerb: (id: string) => void;
  onCopyVerb: (item: IrregularVerbItem) => void;
  copiedId: string | null;
  isStickyHeader?: boolean;
}

const ComprehensiveTableView: React.FC<ComprehensiveTableViewProps> = ({
  items,
  isV2Target,
  isV3Target,
  selectedVerbId,
  onSelectVerb,
  onCopyVerb,
  copiedId,
  isStickyHeader = true,
}) => {
  return (
    <table className="w-full text-right text-[11px] sm:text-xs border-collapse">
      <thead className={`bg-slate-900 text-white font-bold shadow-xs ${isStickyHeader ? 'sticky top-0 z-10' : ''}`}>
        <tr>
          <th className="py-1.5 px-2 text-center w-7 sm:w-8 text-slate-400 font-mono text-[10px] sm:text-xs">#</th>
          
          <th className="py-1.5 px-2 text-left font-mono" dir="ltr">
            <div className="text-slate-200 font-bold whitespace-nowrap text-[11px] sm:text-xs">Base (V1)</div>
            <div className="text-[9px] font-normal text-slate-400 font-arabic whitespace-nowrap">المصدر المجرد</div>
          </th>

          <th 
            className={`py-1.5 px-2 text-left font-mono transition-colors ${
              isV2Target ? 'bg-amber-500/25 text-amber-200 border-x border-amber-500/40' : 'text-slate-200'
            }`} 
            dir="ltr"
          >
            <div className="flex items-center gap-1 font-bold whitespace-nowrap text-[11px] sm:text-xs">
              <span>Past (V2)</span>
              {isV2Target && <span className="text-[8px] bg-amber-400 text-slate-950 px-1 py-0.2 rounded font-black font-sans">هدف الدرس</span>}
            </div>
            <div className="text-[9px] font-normal text-slate-400 font-arabic whitespace-nowrap">الماضي البسيط</div>
          </th>

          <th 
            className={`py-1.5 px-2 text-left font-mono transition-colors ${
              isV3Target ? 'bg-emerald-500/25 text-emerald-200 border-x border-emerald-500/40' : 'text-slate-200'
            }`} 
            dir="ltr"
          >
            <div className="flex items-center gap-1 font-bold whitespace-nowrap text-[11px] sm:text-xs">
              <span>Participle (V3)</span>
              {isV3Target && <span className="text-[8px] bg-emerald-400 text-slate-950 px-1 py-0.2 rounded font-black font-sans">هدف الدرس</span>}
            </div>
            <div className="text-[9px] font-normal text-slate-400 font-arabic whitespace-nowrap">التصريف الثالث</div>
          </th>

          <th className="py-1.5 px-2 text-right font-arabic text-slate-200">
            <div className="font-bold whitespace-nowrap text-[11px] sm:text-xs">المعنى العربي والنمط</div>
            <div className="text-[9px] font-normal text-slate-400 whitespace-nowrap">الترجمة ونوع التغيير</div>
          </th>

          <th className="py-1.5 px-2 text-right hidden lg:table-cell font-arabic text-slate-200">
            <div className="font-bold whitespace-nowrap text-[11px] sm:text-xs">مثال توضيحي للاستخدام</div>
            <div className="text-[9px] font-normal text-slate-400 whitespace-nowrap">في سياق جملة واقعية</div>
          </th>

          <th className="py-1.5 px-2 text-center w-14 sm:w-16 text-slate-200">
            <div className="font-bold whitespace-nowrap text-[11px] sm:text-xs">إجراءات</div>
            <div className="text-[9px] font-normal text-slate-400 whitespace-nowrap">استماع/نسخ</div>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200 bg-white">
        {items.map((item, idx) => {
          const isSelected = selectedVerbId === item.id;

          return (
            <tr 
              key={item.id} 
              onClick={() => onSelectVerb(item.id)}
              className={`transition-colors cursor-pointer group ${
                isSelected
                  ? 'bg-blue-50/90 ring-1 ring-blue-400/50'
                  : 'hover:bg-amber-50/40'
              }`}
            >
              <td className="py-1.5 px-2 text-center text-slate-400 font-mono text-[10px] sm:text-xs w-7 sm:w-8">
                {idx + 1}
              </td>
              
              {/* V1 Base */}
              <td className="py-1.5 px-2 font-mono font-bold text-slate-900 text-left whitespace-nowrap text-[11px] sm:text-xs" dir="ltr">
                <span 
                  onClick={(e) => {
                    e.stopPropagation();
                    playEnglishAudio(item.base);
                  }}
                  className="cursor-pointer hover:text-blue-600 hover:underline inline-flex items-center gap-1"
                  title="استمع للمصدر (V1)"
                >
                  <span>{item.base}</span>
                  <Volume2 className="w-3 h-3 text-slate-300 group-hover:text-blue-500 shrink-0" />
                </span>
              </td>

              {/* V2 Past Simple */}
              <td 
                className={`py-1.5 px-2 font-mono font-bold text-left whitespace-nowrap transition-colors text-[11px] sm:text-xs ${
                  isV2Target ? 'bg-amber-50/90 text-amber-950 border-x border-amber-200 font-black' : 'text-slate-800'
                }`} 
                dir="ltr"
              >
                <span 
                  onClick={(e) => {
                    e.stopPropagation();
                    playEnglishAudio(item.past);
                  }}
                  className="cursor-pointer hover:text-amber-700 hover:underline inline-flex items-center gap-1"
                  title="استمع للماضي (V2)"
                >
                  <span>{item.past}</span>
                  <Volume2 className="w-3 h-3 text-slate-300 group-hover:text-amber-600 shrink-0" />
                </span>
              </td>

              {/* V3 Past Participle */}
              <td 
                className={`py-1.5 px-2 font-mono font-bold text-left whitespace-nowrap transition-colors text-[11px] sm:text-xs ${
                  isV3Target ? 'bg-emerald-50/90 text-emerald-950 border-x border-emerald-200 font-black' : 'text-slate-800'
                }`} 
                dir="ltr"
              >
                <span 
                  onClick={(e) => {
                    e.stopPropagation();
                    playEnglishAudio(item.pastParticiple);
                  }}
                  className="cursor-pointer hover:text-emerald-700 hover:underline inline-flex items-center gap-1"
                  title="استمع للتصريف الثالث (V3)"
                >
                  <span>{item.pastParticiple}</span>
                  <Volume2 className="w-3 h-3 text-slate-300 group-hover:text-emerald-600 shrink-0" />
                </span>
              </td>

              {/* Meaning & Pattern */}
              <td className="py-1.5 px-2 text-slate-900 font-arabic">
                <div className="flex items-center gap-1 font-bold text-[11px] sm:text-xs">
                  <span>{item.meaningAr}</span>
                  {item.isCommon && (
                    <span className="text-[8px] sm:text-[9px] bg-amber-100 text-amber-900 px-1 py-0.2 rounded font-sans font-bold whitespace-nowrap shrink-0">
                      شائع ⭐
                    </span>
                  )}
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-500 font-normal mt-0.5 leading-tight">
                  {item.patternAr}
                </div>
              </td>

              {/* Example sentence with translation */}
              <td className="py-1.5 px-2 text-[10px] sm:text-[11px] text-slate-600 hidden lg:table-cell max-w-xs xl:max-w-md">
                <div className="font-mono text-slate-900 font-medium leading-tight" dir="ltr">{item.example}</div>
                <div className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5 font-arabic leading-tight">{item.exampleAr}</div>
              </td>

              {/* Actions */}
              <td className="py-1.5 px-2 text-center w-14 sm:w-16">
                <div className="flex items-center justify-center gap-0.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playEnglishAudio(`${item.base}, ${item.past}, ${item.pastParticiple}`);
                    }}
                    className="p-1 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition cursor-pointer"
                    title="استمع للتصاريف الثلاثة بالتتابع"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCopyVerb(item);
                    }}
                    className="p-1 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-md transition cursor-pointer"
                    title="نسخ صيغ الفعل"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// =========================================================================
// SUB-COMPONENT: COMPREHENSIVE VERB CARD
// =========================================================================
interface ComprehensiveVerbCardProps {
  item: IrregularVerbItem;
  isV2Target: boolean;
  isV3Target: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onCopy: () => void;
  isCopied: boolean;
}

const ComprehensiveVerbCard: React.FC<ComprehensiveVerbCardProps> = ({
  item,
  isV2Target,
  isV3Target,
  isSelected,
  onSelect,
  onCopy,
  isCopied,
}) => {
  const ving = getVingForm(item.base);

  return (
    <div
      onClick={onSelect}
      className={`bg-white border rounded-2xl p-4 shadow-2xs transition-all flex flex-col justify-between space-y-3 cursor-pointer ${
        isSelected
          ? 'border-blue-500 ring-2 ring-blue-400/30 shadow-md bg-blue-50/20'
          : 'border-slate-200/90 hover:border-slate-300 hover:shadow-md'
      }`}
    >
      {/* Top: Meaning, Base & Actions */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-black font-mono text-slate-900" dir="ltr">
              {item.base}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                playEnglishAudio(item.base);
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
              title="استمع للمصدر (V1)"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="text-sm font-bold text-slate-800 font-arabic mt-0.5">
            {item.meaningAr}
          </div>
        </div>

        <div className="flex items-center gap-1">
          {item.isCommon && (
            <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-sans font-bold">
              شائع ⭐
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCopy();
            }}
            className="p-1 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition cursor-pointer"
            title="نسخ صيغ الفعل"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 4 Conjugation Pill Boxes */}
      <div className="grid grid-cols-4 gap-1 text-center font-mono text-xs">
        {/* V1 */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            playEnglishAudio(item.base);
          }}
          className="bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl p-1.5 transition"
          dir="ltr"
        >
          <div className="text-[8px] text-slate-400 font-sans">V1 Base</div>
          <div className="font-bold text-slate-800 truncate mt-0.5">{item.base}</div>
        </div>

        {/* V2 */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            playEnglishAudio(item.past);
          }}
          className={`rounded-xl p-1.5 transition border ${
            isV2Target
              ? 'bg-amber-100 text-amber-950 border-amber-300 font-black ring-1 ring-amber-400/40 shadow-2xs'
              : 'bg-slate-50 hover:bg-amber-50 text-slate-800 border-slate-200'
          }`}
          dir="ltr"
        >
          <div className="text-[8px] font-sans flex items-center justify-center gap-0.5">
            <span className={isV2Target ? 'text-amber-800 font-bold' : 'text-slate-400'}>V2 Past</span>
            {isV2Target && <span className="text-amber-600">★</span>}
          </div>
          <div className="font-bold truncate mt-0.5">{item.past}</div>
        </div>

        {/* V3 */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            playEnglishAudio(item.pastParticiple);
          }}
          className={`rounded-xl p-1.5 transition border ${
            isV3Target
              ? 'bg-emerald-100 text-emerald-950 border-emerald-300 font-black ring-1 ring-emerald-400/40 shadow-2xs'
              : 'bg-slate-50 hover:bg-emerald-50 text-slate-800 border-slate-200'
          }`}
          dir="ltr"
        >
          <div className="text-[8px] font-sans flex items-center justify-center gap-0.5">
            <span className={isV3Target ? 'text-emerald-800 font-bold' : 'text-slate-400'}>V3 Part.</span>
            {isV3Target && <span className="text-emerald-600">★</span>}
          </div>
          <div className="font-bold truncate mt-0.5">{item.pastParticiple}</div>
        </div>

        {/* V-ing */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            playEnglishAudio(ving);
          }}
          className="bg-slate-50 hover:bg-purple-50 border border-slate-200 rounded-xl p-1.5 transition"
          dir="ltr"
        >
          <div className="text-[8px] text-slate-400 font-sans">V-ing</div>
          <div className="font-bold text-slate-700 truncate mt-0.5">{ving}</div>
        </div>
      </div>

      {/* Contextual Example Quote */}
      {item.example && (
        <div className="text-[11px] bg-slate-50/90 rounded-xl p-2.5 text-slate-600 border border-slate-100 space-y-1">
          <div className="font-mono text-slate-900 text-left truncate" dir="ltr">
            "{item.example}"
          </div>
          <div className="text-[10px] text-slate-500 font-arabic truncate">
            {item.exampleAr}
          </div>
        </div>
      )}

      {/* Card Footer */}
      <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 border-t border-slate-100">
        <span className="text-[10px] text-slate-400 truncate">
          {item.patternAr}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            playEnglishAudio(`${item.base}, ${item.past}, ${item.pastParticiple}`);
          }}
          className="text-blue-600 hover:text-blue-700 font-bold transition flex items-center gap-1 cursor-pointer"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>استمع للثلاثة</span>
        </button>
      </div>
    </div>
  );
};
