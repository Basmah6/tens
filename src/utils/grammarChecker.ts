import { IRREGULAR_VERBS_DATA, IrregularVerbItem } from '../data/irregularVerbsData';

export interface SpontaneousFormattingInfo {
  hasCasualSpelling: boolean;
  detectedItems: string[];
  politeTipAr: string;
}

export interface GrammarEvaluationResult {
  isCorrect: boolean;
  tenseMatch: boolean;
  score: number;
  detectedTense: string;
  targetStructure?: string;
  breakdown: {
    subject: string;
    auxiliary: string;
    mainVerb: string;
    objectComplement: string;
    timeMarker: string;
  };
  svoStatus?: {
    hasSubject: boolean;
    hasVerb: boolean;
    hasObjectComplement: boolean;
    isOrderValid: boolean;
    summaryAr: string;
  };
  agreementStatus?: {
    isValid: boolean;
    subjectTypeAr: string;
    ruleAppliedAr: string;
    detailsAr: string;
  };
  targetStructureStatus?: {
    isMatched: boolean;
    expectedFormula: string;
    detailsAr: string;
  };
  explanationAr: string;
  corrections: string[];
  suggestionsAr: string[];
  naturalAlternative: string;
  spontaneousFormatting?: SpontaneousFormattingInfo;
  source?: string;
}

export const DEFAULT_TARGET_STRUCTURES: Record<string, string> = {
  present_simple: 'Subject + V1 (+s/es with singular) + Object/Complement',
  present_continuous: 'Subject + am/is/are + Verb-ing + Object/Complement',
  present_perfect: 'Subject + have/has + V3 (Past Participle) + Object/Complement',
  present_perfect_continuous: 'Subject + have/has + been + Verb-ing + Object/Complement',
  past_simple: 'Subject + V2 (Past form) + Object/Complement',
  past_continuous: 'Subject + was/were + Verb-ing + Object/Complement',
  past_perfect: 'Subject + had + V3 (Past Participle) + Object/Complement',
  past_perfect_continuous: 'Subject + had + been + Verb-ing + Object/Complement',
  future_simple: 'Subject + will + V1 (Base form) + Object/Complement',
  future_continuous: 'Subject + will + be + Verb-ing + Object/Complement',
  future_perfect: 'Subject + will + have + V3 + Object/Complement',
  future_perfect_continuous: 'Subject + will + have + been + Verb-ing + Object/Complement',
};

export function getSubjectTypeArabic(category: SubjectCategory, subjectText: string): string {
  switch (category) {
    case '1st_sing':
      return `أنا (I)`;
    case '3rd_sing':
      return `مفرد: هو / هي / اسم شخص (${subjectText})`;
    case 'plural':
      return `جمع: نحن / هم / اسم جمع (${subjectText})`;
    case '2nd':
      return `أنت / أنتم (You)`;
    default:
      return subjectText;
  }
}

// Subject Person & Number types
export type SubjectCategory = '1st_sing' | '2nd' | '3rd_sing' | 'plural';

// Pre-index irregular verbs for instantaneous O(1) lookups
const irregularByBase = new Map<string, IrregularVerbItem>();
const irregularByPast = new Map<string, IrregularVerbItem>();
const irregularByV3 = new Map<string, IrregularVerbItem>();

for (const v of IRREGULAR_VERBS_DATA) {
  irregularByBase.set(v.base.toLowerCase(), v);
  irregularByPast.set(v.past.toLowerCase(), v);
  irregularByV3.set(v.pastParticiple.toLowerCase(), v);
}

// Common time expressions to detect and isolate cleanly
const TIME_MARKERS = [
  'every day', 'every morning', 'every week', 'every month', 'every year', 'every sunday', 'every night',
  'always', 'usually', 'often', 'sometimes', 'rarely', 'seldom', 'never', 'normally', 'regularly',
  'right now', 'at the moment', 'currently', 'today', 'this week', 'this month', 'these days', 'now',
  'yesterday morning', 'yesterday evening', 'yesterday', 'last night', 'last week', 'last month', 'last year',
  'two days ago', 'three days ago', 'an hour ago', 'a week ago', 'years ago', 'in the past', 'in 2020', 'in 2010',
  'while', 'when', 'at 5 pm', 'at 8 o\'clock', 'all day', 'all night', 'all morning',
  'already', 'just', 'yet', 'ever', 'so far', 'recently', 'lately', 'since 2015', 'since yesterday', 'since morning',
  'for two hours', 'for 3 years', 'for a long time', 'for years', 'for 10 years',
  'tomorrow morning', 'tomorrow night', 'tomorrow', 'next week', 'next month', 'next year', 'next monday',
  'soon', 'in the future', 'by tomorrow', 'by next year', 'by 5 o\'clock', 'by the time', 'by next month'
];

// Subject Pronouns
const SUBJECT_PRONOUNS: Record<string, SubjectCategory> = {
  i: '1st_sing',
  you: '2nd',
  he: '3rd_sing',
  she: '3rd_sing',
  it: '3rd_sing',
  we: 'plural',
  they: 'plural'
};

// Known Plural Irregular Nouns
const KNOWN_PLURAL_NOUNS = new Set([
  'people', 'children', 'men', 'women', 'feet', 'teeth', 'mice', 'geese', 'police', 'students', 'teachers',
  'boys', 'girls', 'friends', 'parents', 'doctors', 'workers', 'dogs', 'cats', 'cars', 'books'
]);

// Indefinite Singular Pronouns
const INDEFINITE_SINGULAR = new Set([
  'everyone', 'everybody', 'someone', 'somebody', 'no one', 'nobody', 'anyone', 'anybody', 'each'
]);

// Common Auxiliary Tokens
const AUX_TOKENS = new Set([
  'am', 'is', 'are', 'was', 'were',
  'have', 'has', 'had',
  'do', 'does', 'did', "don't", "doesn't", "didn't",
  'will', "won't", "'ll", 'would', 'can', 'could', 'should', 'shall', 'must', 'may', 'might',
  'been', 'being', 'going'
]);

// Clean word of surrounding punctuation
function cleanToken(word: string): string {
  return word.replace(/^[^a-zA-Z0-9']+|[^a-zA-Z0-9']+$/g, '');
}

// Convert base verb to 3rd person singular present (e.g. play -> plays, watch -> watches, study -> studies)
export function get3rdPersonSingularVerb(baseVerb: string): string {
  const b = baseVerb.toLowerCase();
  if (b === 'have') return 'has';
  if (b === 'be') return 'is';
  if (b === 'do') return 'does';
  if (b === 'go') return 'goes';

  if (b.endsWith('ch') || b.endsWith('sh') || b.endsWith('ss') || b.endsWith('x') || b.endsWith('zz') || b.endsWith('o')) {
    return b + 'es';
  }
  if (b.endsWith('y') && !/[aeiou]y$/.test(b) && b.length > 1) {
    return b.slice(0, -1) + 'ies';
  }
  return b + 's';
}

// Convert base verb to base form if it has 's' or 'es' or 'ies'
export function getBaseVerbFrom3rdPerson(verb: string): string {
  const v = verb.toLowerCase();
  if (v === 'has') return 'have';
  if (v === 'is') return 'be';
  if (v === 'does') return 'do';
  if (v === 'goes') return 'go';

  if (v.endsWith('ies') && v.length > 3) {
    return v.slice(0, -3) + 'y';
  }
  if (v.endsWith('es')) {
    const withoutEs = v.slice(0, -2);
    if (withoutEs.endsWith('ch') || withoutEs.endsWith('sh') || withoutEs.endsWith('ss') || withoutEs.endsWith('x') || withoutEs.endsWith('z')) {
      return withoutEs;
    }
  }
  if (v.endsWith('s') && !v.endsWith('ss') && v.length > 2) {
    return v.slice(0, -1);
  }
  return v;
}

// Get V2 (Past Simple form)
export function getVerbPastV2(baseVerb: string): string {
  const b = baseVerb.toLowerCase();
  const irr = irregularByBase.get(b);
  if (irr) return irr.past;

  if (b === 'be') return 'was/were';
  if (b.endsWith('e')) return b + 'd';
  if (b.endsWith('y') && !/[aeiou]y$/.test(b) && b.length > 1) return b.slice(0, -1) + 'ied';
  if (b.length >= 3 && !/[aeiouy]/.test(b[b.length - 1]) && /[aeiou]/.test(b[b.length - 2]) && !/[aeiou]/.test(b[b.length - 3]) && !['w', 'x', 'y'].includes(b[b.length - 1])) {
    return b + b[b.length - 1] + 'ed';
  }
  return b + 'ed';
}

// Get V3 (Past Participle form)
export function getVerbParticipleV3(baseVerb: string): string {
  const b = baseVerb.toLowerCase();
  const irr = irregularByBase.get(b);
  if (irr) return irr.pastParticiple;
  return getVerbPastV2(b);
}

// Get V-ing form
export function getVerbIngForm(baseVerb: string): string {
  const b = baseVerb.toLowerCase();
  if (b === 'be') return 'being';
  if (b === 'die') return 'dying';
  if (b === 'lie') return 'lying';
  if (b === 'tie') return 'tying';
  if (b.endsWith('ee')) return b + 'ing';
  if (b.endsWith('e') && b.length > 2) return b.slice(0, -1) + 'ing';
  if (b.length >= 3 && !/[aeiouy]/.test(b[b.length - 1]) && /[aeiou]/.test(b[b.length - 2]) && !/[aeiou]/.test(b[b.length - 3]) && !['w', 'x', 'y'].includes(b[b.length - 1])) {
    return b + b[b.length - 1] + 'ing';
  }
  return b + 'ing';
}

// Determine if a verb is in base form, s-form, past V2, V3, or ing
export function identifyVerbForm(word: string): {
  form: 'base' | 's_form' | 'past_v2' | 'v3' | 'v_ing' | 'unknown';
  baseCandidate: string;
  isIrregular: boolean;
} {
  const w = word.toLowerCase();

  // Check V-ing
  if (w.endsWith('ing') && w.length > 3) {
    let base = w.slice(0, -3);
    if (w === 'dying') base = 'die';
    else if (w === 'lying') base = 'lie';
    else if (w === 'being') base = 'be';
    else if (base.length > 2 && base[base.length - 1] === base[base.length - 2]) {
      base = base.slice(0, -1);
    }
    return { form: 'v_ing', baseCandidate: base, isIrregular: false };
  }

  // Check irregular lookup
  if (irregularByPast.has(w) && irregularByV3.has(w)) {
    const item = irregularByPast.get(w)!;
    return { form: 'past_v2', baseCandidate: item.base, isIrregular: true };
  }
  if (irregularByV3.has(w)) {
    const item = irregularByV3.get(w)!;
    return { form: 'v3', baseCandidate: item.base, isIrregular: true };
  }
  if (irregularByPast.has(w)) {
    const item = irregularByPast.get(w)!;
    return { form: 'past_v2', baseCandidate: item.base, isIrregular: true };
  }
  if (irregularByBase.has(w)) {
    return { form: 'base', baseCandidate: w, isIrregular: true };
  }

  // Regular -ed
  if (w.endsWith('ed') && w.length > 3) {
    let base = w.slice(0, -2);
    if (w.endsWith('ied') && w.length > 4) base = w.slice(0, -3) + 'y';
    else if (base.endsWith('e')) base = base.slice(0, -1);
    return { form: 'past_v2', baseCandidate: base, isIrregular: false };
  }

  // 3rd person singular -s/-es/-ies
  if ((w.endsWith('s') && !w.endsWith('ss') && w.length > 2) || w.endsWith('es') || w.endsWith('ies') || w === 'has') {
    return { form: 's_form', baseCandidate: getBaseVerbFrom3rdPerson(w), isIrregular: false };
  }

  return { form: 'base', baseCandidate: w, isIrregular: false };
}

// -------------------------------------------------------------
// Normalization of Spontaneous / Casual Student Writing
// Accommodates:
// 1. Informal contractions: "im", "i'm", "i m", "hes", "shes", "theyre", "youre", "dont", "cant", etc.
// 2. Capitalization: lowercase "i", lowercase start of sentence
// 3. Punctuation: missing trailing period/question mark, awkward spacing around commas/periods
// -------------------------------------------------------------
export function normalizeStudentInput(rawSentence: string): {
  normalized: string;
  formattingInfo: SpontaneousFormattingInfo;
} {
  const raw = rawSentence.trim();
  const detectedItems: string[] = [];

  // Check lowercase 'i'
  if (/\bi\b/.test(raw)) {
    detectedItems.push("كتابة الضمير (i) بحرف صغير بدلاً من (I)");
  }

  // Check lowercase sentence start
  if (/^[a-z]/.test(raw)) {
    detectedItems.push("بدء الجملة بحرف صغير (lowercase)");
  }

  // Check trailing punctuation
  if (!/[.!?]$/.test(raw) && raw.length > 0) {
    detectedItems.push("عدم وضع نقطة (.) في نهاية الجملة");
  }

  // Check informal contractions / spontaneous writing
  const checkList: { pattern: RegExp; label: string }[] = [
    { pattern: /\b(im|i\s*m)\b/i, label: "كتابة (im) بدون فاصلة عليا كاختصار لـ (I'm / I am)" },
    { pattern: /\b(ive|i\s*ve)\b/i, label: "كتابة (ive) عوضاً عن (I've / I have)" },
    { pattern: /\b(ill|i\s*ll)\b(?=\s+[a-z]+)/i, label: "كتابة (ill) عوضاً عن (I'll / I will)" },
    { pattern: /\b(id|i\s*d)\b(?=\s+[a-z]+)/i, label: "كتابة (id) عوضاً عن (I'd / I would)" },
    { pattern: /\bhes\b/i, label: "كتابة (hes) بدون فاصلة عليا لـ (he's / he is)" },
    { pattern: /\bshes\b/i, label: "كتابة (shes) بدون فاصلة عليا لـ (she's / she is)" },
    { pattern: /\bits\b(?=\s+[a-z]+)/i, label: "كتابة (its) عوضاً عن (it's / it is)" },
    { pattern: /\b(theyre|they\s*re)\b/i, label: "كتابة (theyre) عوضاً عن (they're / they are)" },
    { pattern: /\b(youre|you\s*re)\b/i, label: "كتابة (youre) عوضاً عن (you're / you are)" },
    { pattern: /\b(weve|we\s*ve)\b/i, label: "كتابة (weve) عوضاً عن (we've / we have)" },
    { pattern: /\b(theyve|they\s*ve)\b/i, label: "كتابة (theyve) عوضاً عن (they've / they have)" },
    { pattern: /\b(youve|you\s*ve)\b/i, label: "كتابة (youve) عوضاً عن (you've / you have)" },
    { pattern: /\bdont\b/i, label: "كتابة (dont) بدون فاصلة عليا لـ (don't)" },
    { pattern: /\bdoesnt\b/i, label: "كتابة (doesnt) بدون فاصلة عليا لـ (doesn't)" },
    { pattern: /\bdidnt\b/i, label: "كتابة (didnt) بدون فاصلة عليا لـ (didn't)" },
    { pattern: /\bcant\b/i, label: "كتابة (cant) بدون فاصلة عليا لـ (can't)" },
    { pattern: /\bwont\b/i, label: "كتابة (wont) بدون فاصلة عليا لـ (won't)" },
    { pattern: /\bisnt\b/i, label: "كتابة (isnt) بدون فاصلة عليا لـ (isn't)" },
    { pattern: /\barent\b/i, label: "كتابة (arent) بدون فاصلة عليا لـ (aren't)" },
    { pattern: /\bwasnt\b/i, label: "كتابة (wasnt) بدون فاصلة عليا لـ (wasn't)" },
    { pattern: /\bwerent\b/i, label: "كتابة (werent) بدون فاصلة عليا لـ (weren't)" },
    { pattern: /\bhavent\b/i, label: "كتابة (havent) بدون فاصلة عليا لـ (haven't)" },
    { pattern: /\bhasnt\b/i, label: "كتابة (hasnt) بدون فاصلة عليا لـ (hasn't)" },
    { pattern: /\bhadnt\b/i, label: "كتابة (hadnt) بدون فاصلة عليا لـ (hadn't)" },
    { pattern: /\bshouldnt\b/i, label: "كتابة (shouldnt) لـ (shouldn't)" },
    { pattern: /\bcouldnt\b/i, label: "كتابة (couldnt) لـ (couldn't)" },
    { pattern: /\bwouldnt\b/i, label: "كتابة (wouldnt) لـ (wouldn't)" },
    { pattern: /\bgonna\b/i, label: "كتابة (gonna) العامية بدلاً من (going to)" },
    { pattern: /\bwanna\b/i, label: "كتابة (wanna) العامية بدلاً من (want to)" },
  ];

  for (const item of checkList) {
    if (item.pattern.test(raw)) {
      detectedItems.push(item.label);
    }
  }

  // Create normalized sentence
  let normalized = raw;

  // 1. Spacing around punctuation
  normalized = normalized.replace(/\s+([.,?!:;])/g, '$1');
  normalized = normalized.replace(/\s+/g, ' ');

  // 2. Standalone lowercase 'i'
  normalized = normalized.replace(/\bi\b/g, 'I');

  // 3. Contractions expansion
  normalized = normalized.replace(/\b(im|i\s*m|i'm)\b/gi, 'I am');
  normalized = normalized.replace(/\b(ive|i\s*ve|i've)\b/gi, 'I have');
  normalized = normalized.replace(/\b(ill|i\s*ll|i'll)\b(?=\s+[a-z]+)/gi, 'I will');
  normalized = normalized.replace(/\b(id|i\s*d|i'd)\b(?=\s+[a-z]+)/gi, 'I would');

  // hes / he's, shes / she's, its / it's (smart participle detection)
  const v3OrBeen = '(?:been|gone|seen|done|finished|watched|eaten|played|visited|bought|arrived|studied|read|written|spoken|[a-z]+ed|[a-z]+en)';
  normalized = normalized.replace(new RegExp(`\\b(hes|he's)\\b(?=\\s+${v3OrBeen}\\b)`, 'gi'), 'he has');
  normalized = normalized.replace(new RegExp(`\\b(shes|she's)\\b(?=\\s+${v3OrBeen}\\b)`, 'gi'), 'she has');
  normalized = normalized.replace(new RegExp(`\\b(it's|its)\\b(?=\\s+${v3OrBeen}\\b)`, 'gi'), 'it has');

  normalized = normalized.replace(/\b(hes|he's)\b/gi, 'he is');
  normalized = normalized.replace(/\b(shes|she's)\b/gi, 'she is');
  normalized = normalized.replace(/\b(theyre|they\s*re|they're)\b/gi, 'they are');
  normalized = normalized.replace(/\b(youre|you\s*re|you're)\b/gi, 'you are');
  normalized = normalized.replace(/\b(weve|we\s*ve|we've)\b/gi, 'we have');
  normalized = normalized.replace(/\b(theyve|they\s*ve|they've)\b/gi, 'they have');
  normalized = normalized.replace(/\b(youve|you\s*ve|you've)\b/gi, 'you have');

  // "well" followed by common verbs e.g. "well study", "well go", "well visit"
  normalized = normalized.replace(/\bwell\b(?=\s+(?:go|play|study|visit|see|travel|watch|do|come|help|buy|work|eat|sleep|be)\b)/gi, 'we will');
  normalized = normalized.replace(/\bwe'll\b/gi, 'we will');
  normalized = normalized.replace(/\b(they'll|theyll)\b/gi, 'they will');
  normalized = normalized.replace(/\b(you'll|youll)\b/gi, 'you will');
  normalized = normalized.replace(/\bhe'll\b/gi, 'he will');
  normalized = normalized.replace(/\bshe'll\b/gi, 'she will');

  // "were" at start followed by v_ing (e.g. "were studying" typed by student meaning "we're studying")
  if (/^were\s+[a-z]+ing\b/i.test(normalized)) {
    normalized = normalized.replace(/^were\b/i, 'we are');
  }

  // It's / its followed by complement
  normalized = normalized.replace(/\bits\b(?=\s+(?:raining|snowing|cold|hot|nice|good|bad|hard|easy|a|an|the|my|very|so|[a-z]+ing)\b)/gi, 'it is');
  normalized = normalized.replace(/\bit's\b/gi, 'it is');

  // Negatives
  normalized = normalized.replace(/\bdont\b/gi, "don't");
  normalized = normalized.replace(/\bdoesnt\b/gi, "doesn't");
  normalized = normalized.replace(/\bdidnt\b/gi, "didn't");
  normalized = normalized.replace(/\bcant\b/gi, "can't");
  normalized = normalized.replace(/\bwont\b/gi, "won't");
  normalized = normalized.replace(/\bisnt\b/gi, "isn't");
  normalized = normalized.replace(/\barent\b/gi, "aren't");
  normalized = normalized.replace(/\bwasnt\b/gi, "wasn't");
  normalized = normalized.replace(/\bwerent\b/gi, "weren't");
  normalized = normalized.replace(/\bhavent\b/gi, "haven't");
  normalized = normalized.replace(/\bhasnt\b/gi, "hasn't");
  normalized = normalized.replace(/\bhadnt\b/gi, "hadn't");
  normalized = normalized.replace(/\bshouldnt\b/gi, "shouldn't");
  normalized = normalized.replace(/\bcouldnt\b/gi, "couldn't");
  normalized = normalized.replace(/\bwouldnt\b/gi, "wouldn't");

  // Informal phrases
  normalized = normalized.replace(/\bgonna\b/gi, 'going to');
  normalized = normalized.replace(/\bwanna\b/gi, 'want to');

  const hasCasualSpelling = detectedItems.length > 0;
  let politeTipAr = '';
  if (hasCasualSpelling) {
    politeTipAr = 'فهمنا أسلوب كتابتك التلقائي واعتبرناها صحيحة تماماً دون أي خصم ✅! تذكير بسيط ومفيد: اكتب أول حرف في الجملة كبيراً، واكتب الضمير (I) كبيراً دائماً، واستخدم الفاصلة العليا في الاختصارات (مثل I\'m و don\'t)، وضع نقطة (.) في نهاية الجملة.';
  }

  return {
    normalized,
    formattingInfo: {
      hasCasualSpelling,
      detectedItems,
      politeTipAr
    }
  };
}

// Comprehensive SVO & Subject-Verb Agreement Sentence Parser
export interface ParsedSVO {
  subject: string;
  subjectCategory: SubjectCategory;
  isQuestion: boolean;
  auxiliary: string;
  mainVerb: string;
  verbFormInfo: ReturnType<typeof identifyVerbForm>;
  objectComplement: string;
  timeMarker: string;
  cleanSentence: string;
  tokens: string[];
}

export function parseSVO(sentence: string): ParsedSVO {
  const normResult = normalizeStudentInput(sentence);
  const clean = normResult.normalized.trim();
  const lower = clean.toLowerCase();

  // 1. Detect time marker
  let detectedTimeMarker = '-';
  let sentenceWithoutTime = lower;

  for (const tm of TIME_MARKERS) {
    if (lower.includes(tm)) {
      detectedTimeMarker = tm;
      sentenceWithoutTime = sentenceWithoutTime.replace(tm, ' ').replace(/\s+/g, ' ').trim();
      break;
    }
  }

  const tokens = clean.split(/\s+/).map(cleanToken).filter(Boolean);
  const isQuestion = clean.endsWith('?') || /^(do|does|did|is|are|am|was|were|have|has|had|will|would|can|could|should|shall)\b/i.test(tokens[0] || '');

  let subject = '';
  let subjectCategory: SubjectCategory = '3rd_sing';
  let auxiliary = '-';
  let mainVerb = '';
  let objectComplement = '';

  let idx = 0;

  // Check if starts with Aux (Question)
  if (isQuestion && tokens.length > 1) {
    const firstWord = tokens[0].toLowerCase();
    if (AUX_TOKENS.has(firstWord) || ['am', 'is', 'are', 'was', 'were', 'have', 'has', 'had', 'will', 'do', 'does', 'did'].includes(firstWord)) {
      auxiliary = tokens[0];
      idx = 1;
    }
  }

  // Extract Subject
  if (idx < tokens.length) {
    const currentWord = tokens[idx].toLowerCase();

    // Check compound subject with 'and' e.g. "Ali and Sara" or "My brother and I"
    if (tokens.length > idx + 2 && tokens[idx + 1]?.toLowerCase() === 'and') {
      subject = `${tokens[idx]} and ${tokens[idx + 2]}`;
      subjectCategory = 'plural';
      idx += 3;
    } else if (SUBJECT_PRONOUNS[currentWord]) {
      subject = tokens[idx];
      subjectCategory = SUBJECT_PRONOUNS[currentWord];
      idx += 1;
    } else if (['the', 'a', 'an', 'my', 'your', 'his', 'her', 'our', 'their', 'this', 'that', 'these', 'those'].includes(currentWord)) {
      // Determiner + Noun phrase
      const determiner = tokens[idx];
      let nounParts = [determiner];
      idx += 1;
      while (idx < tokens.length) {
        const nextWord = tokens[idx].toLowerCase();
        // Stop if we hit an auxiliary or clear verb
        if (AUX_TOKENS.has(nextWord) || ['is', 'are', 'am', 'was', 'were', 'have', 'has', 'had', 'will', 'plays', 'watches', 'likes', 'went', 'saw', 'visited', 'bought', 'works'].includes(nextWord)) {
          break;
        }
        nounParts.push(tokens[idx]);
        idx += 1;
        if (nounParts.length >= 3) break;
      }
      subject = nounParts.join(' ');
      const lastNounWord = nounParts[nounParts.length - 1].toLowerCase();
      if (KNOWN_PLURAL_NOUNS.has(lastNounWord) || (lastNounWord.endsWith('s') && !lastNounWord.endsWith('ss'))) {
        subjectCategory = 'plural';
      } else {
        subjectCategory = '3rd_sing';
      }
    } else {
      // Single noun or name
      subject = tokens[idx];
      const sLower = subject.toLowerCase();
      if (INDEFINITE_SINGULAR.has(sLower)) {
        subjectCategory = '3rd_sing';
      } else if (KNOWN_PLURAL_NOUNS.has(sLower) || (sLower.endsWith('s') && !sLower.endsWith('ss'))) {
        subjectCategory = 'plural';
      } else {
        subjectCategory = '3rd_sing';
      }
      idx += 1;
    }
  }

  // Format subject nicely: capitalize 'I', or capitalize single-word names/pronouns
  if (subject.toLowerCase() === 'i') {
    subject = 'I';
  } else if (subject && !subject.includes(' ')) {
    subject = subject.charAt(0).toUpperCase() + subject.slice(1);
  }

  // Extract Auxiliaries (may be multiple: e.g. "will have been", "has been", "is not", "didn't")
  const auxParts: string[] = auxiliary !== '-' ? [auxiliary] : [];
  while (idx < tokens.length) {
    const w = tokens[idx].toLowerCase();
    if (
      AUX_TOKENS.has(w) ||
      w === 'not' ||
      w === "n't" ||
      w === 'been' ||
      w === 'being' ||
      (w === 'going' && tokens[idx + 1]?.toLowerCase() === 'to')
    ) {
      if (w === 'going' && tokens[idx + 1]?.toLowerCase() === 'to') {
        auxParts.push('going to');
        idx += 2;
      } else {
        auxParts.push(tokens[idx]);
        idx += 1;
      }
    } else {
      break;
    }
  }
  if (auxParts.length > 0) {
    auxiliary = auxParts.join(' ');
  }

  // Handle linking verbs (be-verb as main verb e.g. "I am a student" or "She is happy"):
  // If auxiliary is a single be-verb, and there are NO other action verbs following it:
  const isSingleBeAux = auxParts.length === 1 && ['am', 'is', 'are', 'was', 'were'].includes(auxParts[0].toLowerCase());
  if (isSingleBeAux && idx < tokens.length) {
    const nextWords = tokens.slice(idx).map(w => w.toLowerCase());
    const hasFollowingActionVerb = nextWords.some(w => {
      if (w.endsWith('ing') && w.length > 3) return true;
      if (w.endsWith('ed') && w.length > 3) return true;
      if (irregularByPast.has(w) || irregularByV3.has(w)) return true;
      if (['play', 'watch', 'study', 'work', 'go', 'visit', 'eat', 'see', 'buy'].includes(w)) return true;
      return false;
    });

    if (!hasFollowingActionVerb) {
      // The be-verb is the main verb!
      mainVerb = auxParts[0];
      auxiliary = '-';
      objectComplement = tokens.slice(idx).join(' ');
      idx = tokens.length; // all consumed into complement
    }
  }

  // Extract Main Verb if not already assigned
  if (!mainVerb && idx < tokens.length) {
    mainVerb = tokens[idx];
    idx += 1;
  }

  // Extract Object / Complement (the remainder, minus the time marker)
  if (!objectComplement && idx < tokens.length) {
    const remainingWords = tokens.slice(idx).join(' ');
    // Remove detected time marker from complement if it was in it
    let cleanComp = remainingWords;
    if (detectedTimeMarker !== '-' && cleanComp.toLowerCase().includes(detectedTimeMarker.toLowerCase())) {
      cleanComp = cleanComp.replace(new RegExp(detectedTimeMarker, 'i'), '').trim();
    }
    objectComplement = cleanComp || '-';
  } else if (!objectComplement) {
    objectComplement = '-';
  }

  const verbFormInfo = mainVerb ? identifyVerbForm(mainVerb) : { form: 'unknown' as const, baseCandidate: '', isIrregular: false };

  return {
    subject: subject || 'Subject (غير محدد)',
    subjectCategory,
    isQuestion,
    auxiliary,
    mainVerb: mainVerb || '-',
    verbFormInfo,
    objectComplement: objectComplement.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '') || '-',
    timeMarker: detectedTimeMarker,
    cleanSentence: clean,
    tokens
  };
}

// -------------------------------------------------------------
// Core Local Rule Evaluator (No external API dependency)
// Validates Target Structure + SVO Breakdown + Subject-Verb Agreement
// -------------------------------------------------------------
export function evaluateSentenceLocal(
  tenseId: string, 
  sentence: string, 
  customTargetStructure?: string
): GrammarEvaluationResult {
  const normResult = normalizeStudentInput(sentence);
  const clean = normResult.normalized.trim();
  const lower = clean.toLowerCase();
  const expectedFormula = customTargetStructure || DEFAULT_TARGET_STRUCTURES[tenseId] || tenseId;

  // Basic empty guard
  if (!clean) {
    return {
      isCorrect: false,
      tenseMatch: false,
      score: 0,
      detectedTense: tenseId,
      targetStructure: expectedFormula,
      breakdown: { subject: '-', auxiliary: '-', mainVerb: '-', objectComplement: '-', timeMarker: '-' },
      svoStatus: {
        hasSubject: false,
        hasVerb: false,
        hasObjectComplement: false,
        isOrderValid: false,
        summaryAr: 'الجملة فارغة؛ يلزم إدخال فاعل وفعل وتكملة (SVO).'
      },
      agreementStatus: {
        isValid: false,
        subjectTypeAr: 'غير محدد',
        ruleAppliedAr: 'قواعد التوافق النحوي تتطلب وجود فاعل وفعل.',
        detailsAr: 'لم يتم العثور على فاعل وفعل لفحص التوافق النحوي.'
      },
      targetStructureStatus: {
        isMatched: false,
        expectedFormula,
        detailsAr: 'يرجى كتابة جملة مطابقة للهيكل المستهدف.'
      },
      explanationAr: 'الرجاء كتابة جملة إنجليزية مكتملة الأركان لفحصها.',
      corrections: ['أدخل جملة تحتوي على فاعل وفعل ومفعول به أو تكملة.'],
      suggestionsAr: ['ابدأ بفاعل مثل: I, He, She, They متبوعاً بالفعل المناسب.'],
      naturalAlternative: '',
      spontaneousFormatting: normResult.formattingInfo,
      source: 'client_local_svo_engine'
    };
  }

  const parsed = parseSVO(clean);
  const corrections: string[] = [];
  const suggestionsAr: string[] = [];
  let isCorrect = true;
  let tenseMatch = true;
  let score = 100;
  let explanationAr = '';
  let naturalAlternative = clean;

  const { subject, subjectCategory, auxiliary, mainVerb, verbFormInfo, objectComplement, timeMarker } = parsed;
  const auxLower = auxiliary.toLowerCase();
  const verbLower = mainVerb.toLowerCase();

  let agreementValid = true;
  let agreementRuleAr = '';
  let isOrderValid = true;

  // -----------------------------------------------------------
  // 1. SVO Completeness & Word Order Check
  // -----------------------------------------------------------
  if (!subject || subject === 'Subject (غير محدد)' || parsed.tokens.length < 2) {
    isCorrect = false;
    isOrderValid = false;
    score -= 35;
    corrections.push('الجملة تفتقر إلى الفاعل (Subject). في اللغة الإنجليزية تبدأ الجملة دائماً بالفاعل (SVO: Subject + Verb + Object).');
  }

  if (!mainVerb || mainVerb === '-') {
    isCorrect = false;
    isOrderValid = false;
    score -= 40;
    corrections.push('الجملة تفتقر إلى الفعل الأساسي (Main Verb). كل جملة إنجليزية تحتاج إلى فعل يوضح الحدث.');
  }

  // Scrambled order heuristic (e.g., "I English speak")
  if (['english', 'football', 'tennis', 'coffee', 'tea', 'apple', 'book'].includes(verbLower)) {
    isCorrect = false;
    isOrderValid = false;
    score -= 25;
    corrections.push(`ترتيب أركان الجملة (SVO): لاحظ أن (${mainVerb}) مفعول به وليس فعلاً! في اللغة الإنجليزية يأتي الفعل أولاً ثم المفعول به (Subject + Verb + Object).`);
  }

  // -----------------------------------------------------------
  // 2. Tense-Specific Target Structure & Subject-Verb Agreement
  // -----------------------------------------------------------
  switch (tenseId) {
    // ---------------------------------------------------------
    // PRESENT SIMPLE: S + V1(+s/es) + O  OR  S + do/does not + V1 + O
    // ---------------------------------------------------------
    case 'present_simple': {
      agreementRuleAr = 'إذا كان الفاعل مفرداً (هو، هي، أو اسم شخص مثل He / She / Ali) نضيف (s) لآخر الفعل في الإثبات، ونستخدم (doesn\'t) في النفي. أما مع الجمع أو مع (I, You, We, They) فنكتب الفعل عادياً بدون أي إضافات، ونستخدم (don\'t).';
      const hasDo = /\bdo\b/i.test(auxLower) || /\bdon't\b/i.test(auxLower);
      const hasDoes = /\bdoes\b/i.test(auxLower) || /\bdoesn't\b/i.test(auxLower);
      const isNegative = /\bnot\b/i.test(clean) || /\b(don't|doesn't)\b/i.test(clean);

      const isMainVerbBe = ['am', 'is', 'are'].includes(verbLower);

      // Warning if student used continuous be-verb with another action verb (e.g. "I am play" or "I am playing")
      if (!isMainVerbBe && (/\b(am|is|are)\b/i.test(auxLower) || (/\b(am|is|are)\b/i.test(clean) && !isMainVerbBe))) {
        if (verbFormInfo.form === 'v_ing') {
          tenseMatch = false;
          score -= 30;
          corrections.push('الجملة في صيغة المضارع المستمر (am/is/are + verb-ing)، بينما الهيكل المطلوب هو المضارع البسيط (Present Simple: S + V1).');
        } else {
          isCorrect = false;
          score -= 25;
          corrections.push('خطأ في أفعال الكينونة: لا تستخدم (am / is / are) كفعل مساعد مع الأفعال العادية في المضارع البسيط (قل "I work" بدلاً من "I am work").');
        }
      }

      // Check be-verb agreement if be is the main verb
      if (isMainVerbBe) {
        if (subjectCategory === '1st_sing' && verbLower !== 'am') {
          isCorrect = false;
          agreementValid = false;
          score -= 20;
          corrections.push(`الضمير المتكلم (${subject}) يأخذ فعل الكينونة (am) في المضارع البسيط: قل "${subject} am ...".`);
          naturalAlternative = clean.replace(new RegExp(`\\b${mainVerb}\\b`, 'i'), 'am');
        } else if (subjectCategory === '3rd_sing' && verbLower !== 'is') {
          isCorrect = false;
          agreementValid = false;
          score -= 20;
          corrections.push(`الفاعل المفرد (${subject}) يأخذ فعل الكينونة (is) في المضارع البسيط: قل "${subject} is ...".`);
          naturalAlternative = clean.replace(new RegExp(`\\b${mainVerb}\\b`, 'i'), 'is');
        } else if ((subjectCategory === 'plural' || subjectCategory === '2nd') && verbLower !== 'are') {
          isCorrect = false;
          agreementValid = false;
          score -= 20;
          corrections.push(`الفاعل (${subject}) يأخذ فعل الكينونة (are) في المضارع البسيط: قل "${subject} are ...".`);
          naturalAlternative = clean.replace(new RegExp(`\\b${mainVerb}\\b`, 'i'), 'are');
        }
      }

      // Check Subject-Verb Agreement:
      if (subjectCategory === '3rd_sing') {
        // Singular 3rd person (he/she/it/Ali/the student)
        if (isNegative || hasDoes || hasDo) {
          if (hasDo && !hasDoes) {
            isCorrect = false;
            agreementValid = false;
            score -= 20;
            corrections.push(`توافق الفاعل مع الفعل المساعد: الفاعل المفرد الغائب (${subject}) يتطلب استخدام (doesn't / does not) وليس (don't / do not).`);
          }
          if (verbFormInfo.form === 's_form') {
            isCorrect = false;
            score -= 15;
            corrections.push(`بعد أداة النفي (doesn't)، يعود الفعل الأساسي إلى المصدر المجرد بدون (s): قل "${getBaseVerbFrom3rdPerson(mainVerb)}" بدلاً من "${mainVerb}".`);
          }
        } else {
          // Affirmative: Must end in s/es/ies or be 'has'
          if (verbFormInfo.form !== 's_form' && verbLower !== 'has' && verbLower !== 'is') {
            isCorrect = false;
            agreementValid = false;
            score -= 25;
            const correctVerb = get3rdPersonSingularVerb(verbFormInfo.baseCandidate || mainVerb);
            corrections.push(`توافق الفاعل والفعل (Subject-Verb Agreement): الفاعل مفرد غائب (${subject})، فيلزم إضافة (s/es) للفعل ليصبح "${correctVerb}" بدلاً من "${mainVerb}".`);
            naturalAlternative = clean.replace(new RegExp(`\\b${mainVerb}\\b`, 'i'), correctVerb);
          }
          if (verbLower === 'have') {
            isCorrect = false;
            agreementValid = false;
            score -= 20;
            corrections.push(`الفاعل المفرد الغائب (${subject}) يأخذ الفعل (has) بدلاً من (have).`);
            naturalAlternative = clean.replace(/\bhave\b/i, 'has');
          }
        }
      } else {
        // Plural / I / you (I, we, they, you, students)
        if (isNegative || hasDo || hasDoes) {
          if (hasDoes && !hasDo) {
            isCorrect = false;
            agreementValid = false;
            score -= 20;
            corrections.push(`توافق الفاعل مع الفعل المساعد: الفاعل الجمع أو المتكلم (${subject}) يأخذ (don't / do) وليس (doesn't / does).`);
          }
        } else {
          // Affirmative: Must be BASE form without s
          if (verbFormInfo.form === 's_form' && verbLower !== 'is' && verbLower !== 'has') {
            isCorrect = false;
            agreementValid = false;
            score -= 20;
            const baseVerb = getBaseVerbFrom3rdPerson(mainVerb);
            corrections.push(`توافق الفاعل والفعل (Subject-Verb Agreement): الفاعل جمع أو متكلم (${subject})، ويأخذ الفعل في المصدر المجرد بدون (s): قل "${baseVerb}" بدلاً من "${mainVerb}".`);
            naturalAlternative = clean.replace(new RegExp(`\\b${mainVerb}\\b`, 'i'), baseVerb);
          }
          if (verbLower === 'has') {
            isCorrect = false;
            agreementValid = false;
            score -= 20;
            corrections.push(`الفاعل (${subject}) يأخذ الفعل (have) بدلاً من (has).`);
            naturalAlternative = clean.replace(/\bhas\b/i, 'have');
          }
        }
      }

      if (isCorrect && tenseMatch) {
        explanationAr = `ممتاز جداً! حققت الهيكل المستهدف للمضارع البسيط (Subject + Verb + Complement) مع توافق نحوي تام ودقيق بين الفاعل والفعل.`;
        suggestionsAr.push('لإثراء المعنى، يمكنك إضافة ظرف تكرار (مثل: always, usually, often) أو دلالة زمنية (every morning, on Fridays).');
      } else {
        explanationAr = `تكوين المضارع البسيط يتطلب مطابقة الفاعل مع الفعل: المفرد الغائب (He/She/It) يأخذ (V + s/es)، وباقي الضمائر تأخذ المصدر المجرد (Base Form).`;
      }
      break;
    }

    // ---------------------------------------------------------
    // PRESENT CONTINUOUS: S + am/is/are + V-ing + O
    // ---------------------------------------------------------
    case 'present_continuous': {
      agreementRuleAr = 'أفعال الكينونة المساعدة: الضمير (I) يأخذ (am)، المفرد الغائب (He/She/It) يأخذ (is)، والجمع والمخاطب (We/They/You) تأخذ (are)، متبوعة بفعل ينتهي بـ (-ing).';
      const hasAm = /\b(am|'m)\b/i.test(auxLower) || /\b(am|'m)\b/i.test(clean);
      const hasIs = /\b(is|'s)\b/i.test(auxLower) || /\b(is|'s)\b/i.test(clean);
      const hasAre = /\b(are|'re)\b/i.test(auxLower) || /\b(are|'re)\b/i.test(clean);
      const hasAux = hasAm || hasIs || hasAre;

      // Subject-Verb Agreement with Be:
      if (!hasAux) {
        isCorrect = false;
        agreementValid = false;
        score -= 30;
        const requiredBe = subjectCategory === '1st_sing' ? 'am' : (subjectCategory === '3rd_sing' ? 'is' : 'are');
        corrections.push(`المضارع المستمر يتطلب وجود فعل كينونة مساعد (am / is / are) قبل الفعل. مع الفاعل (${subject}) يلزم إضافة (${requiredBe}).`);
        naturalAlternative = `${subject} ${requiredBe} ${verbFormInfo.form === 'v_ing' ? mainVerb : getVerbIngForm(verbFormInfo.baseCandidate || mainVerb)} ${objectComplement !== '-' ? objectComplement : ''}`.trim();
      } else {
        if (subjectCategory === '1st_sing' && !hasAm) {
          isCorrect = false;
          agreementValid = false;
          score -= 20;
          corrections.push(`توافق الفاعل والكينونة: الضمير (I) يأخذ دائماً (am / 'm) وليس (is / are).`);
        } else if (subjectCategory === '3rd_sing' && !hasIs) {
          isCorrect = false;
          agreementValid = false;
          score -= 20;
          corrections.push(`توافق الفاعل والكينونة: الفاعل المفرد الغائب (${subject}) يأخذ (is / 's) وليس (are / am).`);
        } else if ((subjectCategory === 'plural' || subjectCategory === '2nd') && !hasAre) {
          isCorrect = false;
          agreementValid = false;
          score -= 20;
          corrections.push(`توافق الفاعل والكينونة: الفاعل (${subject}) يأخذ (are / 're) وليس (is / am).`);
        }
      }

      // Check V-ing
      if (verbFormInfo.form !== 'v_ing') {
        tenseMatch = false;
        score -= 25;
        const ingVerb = getVerbIngForm(verbFormInfo.baseCandidate || mainVerb);
        corrections.push(`الفعل الأساسي في المضارع المستمر يجب أن ينتهي بـ (-ing): استخدم "${ingVerb}" بدلاً من "${mainVerb}".`);
        naturalAlternative = naturalAlternative.replace(new RegExp(`\\b${mainVerb}\\b`, 'i'), ingVerb);
      }

      if (isCorrect && tenseMatch) {
        explanationAr = `أحسنت! الجملة تطابق الهيكل المستهدف تماماً (Subject + am/is/are + Verb-ing) للتعبير عن حدث يقع في هذه اللحظة الراهنة.`;
        suggestionsAr.push('يمكنك استخدام كلمات دالة مثل (now, right now, at the moment) لتعزيز معنى الاستمرارية.');
      } else {
        explanationAr = `تذكر هيكل المضارع المستمر: الفاعل + (am / is / are) + الفعل منتهياً بـ (-ing) + التكملة.`;
      }
      break;
    }

    // ---------------------------------------------------------
    // PRESENT PERFECT: S + have/has + V3 + O
    // ---------------------------------------------------------
    case 'present_perfect': {
      agreementRuleAr = 'أفعال التمام المساعدة: المفرد الغائب (He/She/It) يأخذ (has)، وباقي الضمائر والجمع تأخذ (have)، متبوعاً بالتصريف الثالث (V3 Past Participle).';
      const hasHas = /\b(has|'s)\b/i.test(auxLower) || /\b(has|'s)\b/i.test(clean);
      const hasHave = /\b(have|'ve)\b/i.test(auxLower) || /\b(have|'ve)\b/i.test(clean);
      const hasAux = hasHas || hasHave;

      if (!hasAux) {
        tenseMatch = false;
        agreementValid = false;
        score -= 30;
        const reqHaveHas = subjectCategory === '3rd_sing' ? 'has' : 'have';
        corrections.push(`المضارع التام يتطلب استخدام الفعل المساعد (${reqHaveHas}) مع الفاعل (${subject}).`);
      } else {
        // Subject-Verb Agreement
        if (subjectCategory === '3rd_sing' && !hasHas) {
          isCorrect = false;
          agreementValid = false;
          score -= 20;
          corrections.push(`توافق الفاعل والفعل: الفاعل المفرد الغائب (${subject}) يأخذ الفعل المساعد (has) وليس (have).`);
          naturalAlternative = naturalAlternative.replace(/\bhave\b/i, 'has');
        } else if (subjectCategory !== '3rd_sing' && !hasHave) {
          isCorrect = false;
          agreementValid = false;
          score -= 20;
          corrections.push(`توافق الفاعل والفعل: الفاعل (${subject}) يأخذ الفعل المساعد (have) وليس (has).`);
          naturalAlternative = naturalAlternative.replace(/\bhas\b/i, 'have');
        }
      }

      // Check V3 (Past Participle)
      const isKnownV3 = irregularByV3.has(verbLower) || (verbLower.endsWith('ed') && !irregularByBase.has(verbLower));
      if (!isKnownV3 && verbFormInfo.form !== 'v3') {
        const expectedV3 = getVerbParticipleV3(verbFormInfo.baseCandidate || mainVerb);
        if (expectedV3.toLowerCase() !== verbLower) {
          isCorrect = false;
          score -= 20;
          corrections.push(`صيغة الفعل بعد have/has: يجب استخدام التصريف الثالث (V3: ${expectedV3}) بدلاً من (${mainVerb}).`);
          naturalAlternative = naturalAlternative.replace(new RegExp(`\\b${mainVerb}\\b`, 'i'), expectedV3);
        }
      }

      // Check for forbidden definite past time words with Present Perfect
      if (['yesterday', 'last night', 'last week', 'ago', 'in 2010'].some(t => lower.includes(t))) {
        score -= 15;
        corrections.push('تنبيه هام: لا نستخدم كلمات الماضي المحدد مثل (yesterday / ago) مع المضارع التام؛ بل نستخدم (already, yet, recently, since, for) أو نستخدم الماضي البسيط.');
      }

      if (isCorrect && tenseMatch) {
        explanationAr = `صياغة ممتازة في المضارع التام (Present Perfect)! ربطت بين حدث وقع في الماضي وأثره مستمر في الحاضر بهيكل (have/has + V3) السليم.`;
        suggestionsAr.push('استخدم كلمات مثل (already, just, recently, since, for) لإعطاء دقة أكبر للتوقيت.');
      } else {
        explanationAr = `تذكر صيغة المضارع التام: Subject + have / has + V3 (Past Participle).`;
      }
      break;
    }

    // ---------------------------------------------------------
    // PRESENT PERFECT CONTINUOUS: S + have/has + been + V-ing + O
    // ---------------------------------------------------------
    case 'present_perfect_continuous': {
      agreementRuleAr = 'المفرد الغائب (He/She/It) يأخذ (has been + V-ing)، وباقي الضمائر والجمع تأخذ (have been + V-ing).';
      const hasHas = /\b(has|'s)\b/i.test(auxLower) || /\b(has|'s)\b/i.test(clean);
      const hasHave = /\b(have|'ve)\b/i.test(auxLower) || /\b(have|'ve)\b/i.test(clean);
      const hasBeen = /\bbeen\b/i.test(clean);

      // Subject-Verb Agreement:
      if (subjectCategory === '3rd_sing' && !hasHas) {
        isCorrect = false;
        agreementValid = false;
        score -= 20;
        corrections.push(`توافق الفاعل مع الفعل المساعد: الفاعل المفرد (${subject}) يأخذ (has been) بدلاً من (have been).`);
      } else if (subjectCategory !== '3rd_sing' && !hasHave) {
        isCorrect = false;
        agreementValid = false;
        score -= 20;
        corrections.push(`توافق الفاعل مع الفعل المساعد: الفاعل (${subject}) يأخذ (have been) بدلاً من (has been).`);
      }

      if (!hasBeen) {
        tenseMatch = false;
        score -= 25;
        corrections.push('المضارع التام المستمر يتطلب وجود كلمة (been) بين have/has والفعل المنتهي بـ (-ing).');
      }

      if (verbFormInfo.form !== 'v_ing') {
        tenseMatch = false;
        score -= 20;
        const ingVerb = getVerbIngForm(verbFormInfo.baseCandidate || mainVerb);
        corrections.push(`الفعل في المضارع التام المستمر يجب أن ينتهي بـ (-ing): استخدم "${ingVerb}" بدلاً من "${mainVerb}".`);
      }

      if (isCorrect && tenseMatch) {
        explanationAr = `إتقان رائع! استخدمت تركيبة المضارع التام المستمر (have/has been + V-ing) بنجاح للتعبير عن نشاط بدأ في الماضي ولا يزال مستمراً.`;
        suggestionsAr.push('تكتمل روعة هذا الزمن بذكر مدة الاستمرار باستخدام (for + المدة) أو (since + نقطة البداية).');
      } else {
        explanationAr = `تذكر هيكل المضارع التام المستمر: Subject + have/has + been + Verb-ing.`;
      }
      break;
    }

    // ---------------------------------------------------------
    // PAST SIMPLE: S + V2 + O  OR  S + didn't + V1 + O
    // ---------------------------------------------------------
    case 'past_simple': {
      agreementRuleAr = 'في الماضي مع فعل الكينونة: المفرد و (I/He/She/It) يأخذ (was)، والجمع والمخاطب (We/They/You) يأخذ (were). مع باقي الأفعال يأتي التصريف الثاني (V2) للجميع، أو (didn\'t + Base) في النفي.';
      const hasDid = /\b(did|didn't)\b/i.test(clean);
      const hasWasWere = /\b(was|were)\b/i.test(clean);
      const isPastVerb = irregularByPast.has(verbLower) || verbLower.endsWith('ed') || hasWasWere;

      if (hasDid) {
        // After didn't, main verb must be BASE form
        if (verbFormInfo.form !== 'base' && verbLower !== 'be') {
          isCorrect = false;
          score -= 25;
          const baseVerb = verbFormInfo.baseCandidate || getBaseVerbFrom3rdPerson(mainVerb);
          corrections.push(`قاعدة النفي والسؤال في الماضي: بعد (didn't / did) يعود الفعل دائماً إلى المصدر المجرد بدون أي تصريف: قل "${baseVerb}" بدلاً من "${mainVerb}".`);
          naturalAlternative = clean.replace(new RegExp(`\\b${mainVerb}\\b`, 'i'), baseVerb);
        }
      } else if (hasWasWere) {
        // Agreement with was/were
        if ((subjectCategory === '1st_sing' || subjectCategory === '3rd_sing') && /\bwere\b/i.test(clean)) {
          isCorrect = false;
          agreementValid = false;
          score -= 20;
          corrections.push(`توافق الفاعل مع فعل الكينونة في الماضي: الفاعل المفرد (${subject}) يأخذ (was) وليس (were).`);
          naturalAlternative = clean.replace(/\bwere\b/i, 'was');
        } else if ((subjectCategory === 'plural' || subjectCategory === '2nd') && /\bwas\b/i.test(clean)) {
          isCorrect = false;
          agreementValid = false;
          score -= 20;
          corrections.push(`توافق الفاعل مع فعل الكينونة في الماضي: الفاعل الجمع (${subject}) يأخذ (were) وليس (was).`);
          naturalAlternative = clean.replace(/\bwas\b/i, 'were');
        }
      } else {
        // Affirmative with normal verb: MUST be V2 (Past Simple form)
        if (!isPastVerb) {
          isCorrect = false;
          score -= 25;
          const pastV2 = getVerbPastV2(verbFormInfo.baseCandidate || mainVerb);
          corrections.push(`تصريف الفعل في الماضي البسيط: يجب تحويل الفعل إلى التصريف الثاني (V2): قل "${pastV2}" بدلاً من "${mainVerb}".`);
          naturalAlternative = clean.replace(new RegExp(`\\b${mainVerb}\\b`, 'i'), pastV2);
        }
      }

      // Check if present continuous or present aux leaked in
      if (/\b(am|is|are|have|has)\b/i.test(clean)) {
        isCorrect = false;
        score -= 20;
        corrections.push('الجملة تحتوي على أفعال مساعدة في الحاضر (am/is/are/have/has) بينما المطلوب هو الماضي البسيط (Past Simple).');
      }

      if (isCorrect && tenseMatch) {
        explanationAr = `ممتاز جداً! صياغة متقنة في الماضي البسيط (Past Simple) لحدث اكتمل وانتهى في الماضي بشكل محدد.`;
        suggestionsAr.push('يمكنك إضافة ظروف ماضية لتوثيق توقيت الحدث (مثل: yesterday, last weekend, two days ago).');
      } else {
        explanationAr = `تذكر هيكل الماضي البسيط: Subject + V2 (Past form) في الإثبات، أو (Subject + didn't + V1 Base) في النفي.`;
      }
      break;
    }

    // ---------------------------------------------------------
    // PAST CONTINUOUS: S + was/were + V-ing + O
    // ---------------------------------------------------------
    case 'past_continuous': {
      agreementRuleAr = 'المفرد و (I/He/She/It) يأخذ (was + V-ing)، والجمع والمخاطب (We/They/You) يأخذ (were + V-ing).';
      const hasWas = /\b(was|wasn't)\b/i.test(clean);
      const hasWere = /\b(were|weren't)\b/i.test(clean);
      const hasAux = hasWas || hasWere;

      if (!hasAux) {
        tenseMatch = false;
        agreementValid = false;
        score -= 30;
        const reqWasWere = (subjectCategory === '1st_sing' || subjectCategory === '3rd_sing') ? 'was' : 'were';
        corrections.push(`الماضي المستمر يتطلب بالضرورة وجود فعل مساعد (was / were). مع الفاعل (${subject}) استخدم (${reqWasWere}).`);
      } else {
        // Subject-Verb Agreement:
        if ((subjectCategory === '1st_sing' || subjectCategory === '3rd_sing') && hasWere) {
          isCorrect = false;
          agreementValid = false;
          score -= 20;
          corrections.push(`توافق الفاعل والفعل: الفاعل المفرد (${subject}) يأخذ (was) وليس (were).`);
          naturalAlternative = clean.replace(/\bwere\b/i, 'was');
        } else if ((subjectCategory === 'plural' || subjectCategory === '2nd') && hasWas) {
          isCorrect = false;
          agreementValid = false;
          score -= 20;
          corrections.push(`توافق الفاعل والفعل: الفاعل (${subject}) يأخذ (were) وليس (was).`);
          naturalAlternative = clean.replace(/\bwas\b/i, 'were');
        }
      }

      // Check V-ing
      if (verbFormInfo.form !== 'v_ing') {
        tenseMatch = false;
        score -= 25;
        const ingVerb = getVerbIngForm(verbFormInfo.baseCandidate || mainVerb);
        corrections.push(`الفعل في الماضي المستمر يجب أن ينتهي بـ (-ing): قل "${ingVerb}".`);
        naturalAlternative = naturalAlternative.replace(new RegExp(`\\b${mainVerb}\\b`, 'i'), ingVerb);
      }

      if (isCorrect && tenseMatch) {
        explanationAr = `رائع! بنيت جملة صحيحة في الماضي المستمر (was/were + V-ing) تعبر عن حدث كان مستمراً في نقطة محددة في الماضي.`;
        suggestionsAr.push('الماضي المستمر غالباً ما يقترن بحدث قاطعه في الماضي البسيط باستخدام (while / when).');
      } else {
        explanationAr = `تذكر هيكل الماضي المستمر: Subject + was / were + Verb-ing.`;
      }
      break;
    }

    // ---------------------------------------------------------
    // PAST PERFECT: S + had + V3 + O
    // ---------------------------------------------------------
    case 'past_perfect': {
      agreementRuleAr = 'يستخدم الفعل المساعد (had + V3) مع جميع الضمائر المفرد والجمع بدون تمييز.';
      const hasHad = /\b(had|hadn't|'d)\b/i.test(clean);
      if (!hasHad) {
        tenseMatch = false;
        score -= 35;
        corrections.push('الماضي التام يتطلب استخدام الفعل المساعد (had).');
      }

      // Check V3 (Past Participle)
      const isKnownV3 = irregularByV3.has(verbLower) || (verbLower.endsWith('ed') && !irregularByBase.has(verbLower));
      if (!isKnownV3 && verbFormInfo.form !== 'v3') {
        const expectedV3 = getVerbParticipleV3(verbFormInfo.baseCandidate || mainVerb);
        if (expectedV3.toLowerCase() !== verbLower) {
          isCorrect = false;
          score -= 20;
          corrections.push(`التصريف بعد had: يجب استخدام التصريف الثالث (V3: ${expectedV3}) بدلاً من (${mainVerb}).`);
          naturalAlternative = naturalAlternative.replace(new RegExp(`\\b${mainVerb}\\b`, 'i'), expectedV3);
        }
      }

      if (isCorrect && tenseMatch) {
        explanationAr = `ممتاز جداً! صياغة صحيحة في الماضي التام (had + V3) لتوضيح الحدث الأسبق وقوعاً في الماضي.`;
        suggestionsAr.push('يمكنك ربط الجملة بحدث ماضٍ آخر باستخدام أدوات الربط (before, after, by the time).');
      } else {
        explanationAr = `تذكر صيغة الماضي التام: Subject + had + V3 (Past Participle).`;
      }
      break;
    }

    // ---------------------------------------------------------
    // PAST PERFECT CONTINUOUS: S + had + been + V-ing + O
    // ---------------------------------------------------------
    case 'past_perfect_continuous': {
      agreementRuleAr = 'يستخدم الفعل المساعد (had been + V-ing) مع جميع الضمائر المفرد والجمع بالتساوي.';
      const hasHad = /\b(had|hadn't|'d)\b/i.test(clean);
      const hasBeen = /\bbeen\b/i.test(clean);

      if (!hasHad) {
        tenseMatch = false;
        score -= 25;
        corrections.push('الماضي التام المستمر يتطلب استخدام (had).');
      }
      if (!hasBeen) {
        tenseMatch = false;
        score -= 25;
        corrections.push('الماضي التام المستمر يتطلب كلمة (been) بعد had.');
      }
      if (verbFormInfo.form !== 'v_ing') {
        tenseMatch = false;
        score -= 20;
        const ingVerb = getVerbIngForm(verbFormInfo.baseCandidate || mainVerb);
        corrections.push(`الفعل في الماضي التام المستمر يجب أن ينتهي بـ (-ing): قل "${ingVerb}".`);
      }

      if (isCorrect && tenseMatch) {
        explanationAr = `إتقان متقدم! صياغة سليمة للماضي التام المستمر (had been + V-ing) للتعبير عن استمرارية نشاط قبل حدث آخر في الماضي.`;
      } else {
        explanationAr = `تذكر صيغة الماضي التام المستمر: Subject + had been + Verb-ing.`;
      }
      break;
    }

    // ---------------------------------------------------------
    // FUTURE SIMPLE: S + will + V1 + O  OR  S + am/is/are going to + V1
    // ---------------------------------------------------------
    case 'future_simple': {
      agreementRuleAr = 'مع (will): يستخدم (will + الفعل المجرد Base Form) لجميع الضمائر. مع (going to): يتوافق فعل الكينونة مع الفاعل (am/is/are + going to + Base Form).';
      const hasWill = /\b(will|won't|'ll)\b/i.test(clean);
      const hasGoingTo = /\bgoing to\b/i.test(clean);

      if (!hasWill && !hasGoingTo) {
        tenseMatch = false;
        score -= 35;
        corrections.push('المستقبل البسيط يتطلب استخدام (will + الفعل المصدر) أو (am/is/are + going to + المصدر).');
      } else if (hasWill) {
        // Verb after will must be base form!
        if (verbFormInfo.form !== 'base' && verbLower !== 'be') {
          isCorrect = false;
          score -= 20;
          const baseVerb = verbFormInfo.baseCandidate || getBaseVerbFrom3rdPerson(mainVerb);
          corrections.push(`قاعدة الأفعال الناقصة: بعد (will)، يجب أن يكون الفعل دائماً في المصدر المجرد بدون أي إضافات: قل "${baseVerb}" بدلاً من "${mainVerb}".`);
          naturalAlternative = clean.replace(new RegExp(`\\b${mainVerb}\\b`, 'i'), baseVerb);
        }
      } else if (hasGoingTo) {
        // Must have am/is/are before going to
        const hasBe = /\b(am|is|are|'m|'s|'re)\b/i.test(clean);
        if (!hasBe) {
          isCorrect = false;
          agreementValid = false;
          score -= 20;
          const reqBe = subjectCategory === '1st_sing' ? 'am' : (subjectCategory === '3rd_sing' ? 'is' : 'are');
          corrections.push(`صيغة (going to) تتطلب فعل كينونة قبلها: أضف (${reqBe}) مع الفاعل (${subject}).`);
        }
      }

      if (isCorrect && tenseMatch) {
        explanationAr = `صياغة موفقة ومطابقة للهيكل المستهدف لزمن المستقبل البسيط!`;
        suggestionsAr.push('استخدم will للقرارات السريعة والوعود، واستخدم going to للخطط والنوايا المسبقة.');
      } else {
        explanationAr = `تذكر صيغة المستقبل البسيط: Subject + will + V1 (Base Form).`;
      }
      break;
    }

    // ---------------------------------------------------------
    // FUTURE CONTINUOUS: S + will + be + V-ing + O
    // ---------------------------------------------------------
    case 'future_continuous': {
      agreementRuleAr = 'يستخدم الهيكل (will be + Verb-ing) لجميع الضمائر المفرد والجمع.';
      const hasWill = /\b(will|won't|'ll)\b/i.test(clean);
      const hasBe = /\bbe\b/i.test(clean);

      if (!hasWill) {
        tenseMatch = false;
        score -= 25;
        corrections.push('المستقبل المستمر يتطلب استخدام (will).');
      }
      if (!hasBe) {
        tenseMatch = false;
        score -= 25;
        corrections.push('المستقبل المستمر يتطلب وجود كلمة (be) بعد will.');
      }
      if (verbFormInfo.form !== 'v_ing') {
        tenseMatch = false;
        score -= 20;
        const ingVerb = getVerbIngForm(verbFormInfo.baseCandidate || mainVerb);
        corrections.push(`الفعل في المستقبل المستمر يجب أن ينتهي بـ (-ing): قل "${ingVerb}".`);
      }

      if (isCorrect && tenseMatch) {
        explanationAr = `صياغة ممتازة في المستقبل المستمر (will be + V-ing) لحدث سيكون في قيد الحدوث عند وقت مستقبلي محدد.`;
      } else {
        explanationAr = `تذكر صيغة المستقبل المستمر: Subject + will be + Verb-ing.`;
      }
      break;
    }

    // ---------------------------------------------------------
    // FUTURE PERFECT: S + will + have + V3 + O
    // ---------------------------------------------------------
    case 'future_perfect': {
      agreementRuleAr = 'يستخدم الهيكل (will have + V3) لجميع الضمائر، ولا تستخدم (will has) أبداً.';
      const hasWill = /\b(will|won't|'ll)\b/i.test(clean);
      const hasHave = /\bhave\b/i.test(clean);
      const hasHas = /\bhas\b/i.test(clean);

      if (!hasWill) {
        tenseMatch = false;
        score -= 25;
        corrections.push('المستقبل التام يتطلب استخدام (will).');
      }
      if (hasHas) {
        isCorrect = false;
        agreementValid = false;
        score -= 20;
        corrections.push('بعد will نستخدم دائماً المصدر (have) حتى مع الفاعل المفرد: قل "will have" وليس "will has".');
      } else if (!hasHave) {
        tenseMatch = false;
        score -= 20;
        corrections.push('المستقبل التام يتطلب وجود (have) بعد will.');
      }

      const isKnownV3 = irregularByV3.has(verbLower) || (verbLower.endsWith('ed') && !irregularByBase.has(verbLower));
      if (!isKnownV3 && verbFormInfo.form !== 'v3') {
        const expectedV3 = getVerbParticipleV3(verbFormInfo.baseCandidate || mainVerb);
        if (expectedV3.toLowerCase() !== verbLower) {
          isCorrect = false;
          score -= 20;
          corrections.push(`التصريف في المستقبل التام: يجب استخدام التصريف الثالث (V3: ${expectedV3}).`);
        }
      }

      if (isCorrect && tenseMatch) {
        explanationAr = `إتقان متقدم! صياغة المستقبل التام (will have + V3) صحيحة تماماً لحدث سيكتمل قبل موعد مستقبلي محدد.`;
        suggestionsAr.push('استخدم عبارات مثل (by tomorrow, by next year) لتحديد موعد اكتمال الحدث.');
      } else {
        explanationAr = `تذكر صيغة المستقبل التام: Subject + will have + V3 (Past Participle).`;
      }
      break;
    }

    // ---------------------------------------------------------
    // FUTURE PERFECT CONTINUOUS: S + will + have + been + V-ing + O
    // ---------------------------------------------------------
    case 'future_perfect_continuous': {
      agreementRuleAr = 'يستخدم الهيكل (will have been + Verb-ing) لجميع الضمائر بالتساوي.';
      const hasWill = /\b(will|won't|'ll)\b/i.test(clean);
      const hasHave = /\bhave\b/i.test(clean);
      const hasBeen = /\bbeen\b/i.test(clean);

      if (!hasWill) {
        tenseMatch = false;
        score -= 25;
        corrections.push('المستقبل التام المستمر يتطلب (will).');
      }
      if (!hasHave) {
        tenseMatch = false;
        score -= 20;
        corrections.push('المستقبل التام المستمر يتطلب (have).');
      }
      if (!hasBeen) {
        tenseMatch = false;
        score -= 20;
        corrections.push('المستقبل التام المستمر يتطلب (been).');
      }
      if (verbFormInfo.form !== 'v_ing') {
        tenseMatch = false;
        score -= 20;
        const ingVerb = getVerbIngForm(verbFormInfo.baseCandidate || mainVerb);
        corrections.push(`الفعل يجب أن ينتهي بـ (-ing): قل "${ingVerb}".`);
      }

      if (isCorrect && tenseMatch) {
        explanationAr = `مستوى احترافي عالي! جملة مستقبل تام مستمر مكتملة الأركان (will have been + V-ing).`;
      } else {
        explanationAr = `تذكر صيغة المستقبل التام المستمر: Subject + will have been + Verb-ing.`;
      }
      break;
    }

    default: {
      explanationAr = `تم فحص جملتك وتحليل أركانها بنجاح.`;
      break;
    }
  }

  // Ensure final score bounds
  const finalScore = isCorrect && tenseMatch ? Math.max(score, 85) : Math.max(Math.min(score, 75), 45);

  // Capitalize first letter of alternative and end with proper punctuation
  let polishedAlt = naturalAlternative.trim();
  if (polishedAlt.length > 0) {
    // Replace standalone lowercase 'i' with 'I'
    polishedAlt = polishedAlt.replace(/\bi\b/g, 'I');
    // Ensure clean punctuation spacing
    polishedAlt = polishedAlt.replace(/\s+([.,?!:;])/g, '$1');
    // Capitalize proper nouns like languages and days of the week
    polishedAlt = polishedAlt.replace(/\b(english|arabic|french|spanish|german|italian)\b/gi, (match) => match.charAt(0).toUpperCase() + match.slice(1).toLowerCase());
    polishedAlt = polishedAlt.replace(/\b(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/gi, (match) => match.charAt(0).toUpperCase() + match.slice(1).toLowerCase());
    // Capitalize first character
    polishedAlt = polishedAlt.charAt(0).toUpperCase() + polishedAlt.slice(1);
    if (!/[.!?]$/.test(polishedAlt)) {
      polishedAlt += parsed.isQuestion ? '?' : '.';
    }
  }

  // -----------------------------------------------------------
  // 3. Synthesize Status Reports (Target Structure, Word Order, Subject-Verb Fit)
  // -----------------------------------------------------------
  const hasSubject = Boolean(subject && subject !== 'Subject (غير محدد)' && subject !== '-');
  const hasVerb = Boolean(mainVerb && mainVerb !== '-');
  const hasObjectComplement = Boolean(objectComplement && objectComplement !== '-');

  let svoSummaryAr = '';
  if (!hasSubject) {
    svoSummaryAr = 'الجملة ينقصها فاعل في البداية (حدد من قام بالحدث مثل: I, He, She, They أو اسم شخص).';
  } else if (!hasVerb) {
    svoSummaryAr = 'الجملة ينقصها فعل يوضح ماذا حدث (مثل: play, study, watch).';
  } else if (!isOrderValid) {
    svoSummaryAr = 'تنبيه بسيط في الترتيب: في الإنجليزية نبدأ دائماً بمن قام بالحدث أولاً (الفاعل)، ثم الفعل، ثم الشيء الذي فعلناه أو التكملة.';
  } else {
    svoSummaryAr = `ترتيب جملتك ممتاز ومترابط: بدأت بمن فعل (${subject}) ← ثم الفعل (${mainVerb}) ← ثم التكملة (${hasObjectComplement ? objectComplement : 'باقي الجملة'}).`;
  }

  const subjectTypeAr = getSubjectTypeArabic(subjectCategory, subject);
  let agreementDetailsAr = '';
  if (!agreementValid) {
    agreementDetailsAr = `انتبه: شكل الفعل (${mainVerb}) ${auxiliary !== '-' ? `أو الكلمة المساعدة (${auxiliary})` : ''} لا يناسب الفاعل (${subject}). راجع التلميح المبسط أعلاه لتصحيحه بسهولة.`;
  } else if (hasSubject && hasVerb) {
    agreementDetailsAr = `أحسنت! شكل الفعل (${mainVerb}) ${auxiliary !== '-' ? `والكلمة المساعدة (${auxiliary})` : ''} متناسق ومضبوط تماماً مع الفاعل (${subject}).`;
  } else {
    agreementDetailsAr = 'أكمل كتابة الفاعل والفعل معاً لنتأكد من مناسبتهما لبعض.';
  }

  const targetStructureMatched = isCorrect && tenseMatch;
  let targetDetailsAr = '';
  if (targetStructureMatched) {
    targetDetailsAr = 'رائع! جملتك مكتوبة بالصيغة الصحيحة والمضبوطة تماماً لهذا الزمن.';
  } else if (!tenseMatch) {
    targetDetailsAr = 'شكل الفعل أو الكلمة المساعدة المستخدمة يحتاج تعديلاً بسيطاً ليناسب طريقة كتابة هذا الزمن.';
  } else {
    targetDetailsAr = 'جملتك قريبة جداً من الصيغة المطلوبة مع ملاحظة بسيطة يمكنك تعديلها بسهولة.';
  }

  return {
    isCorrect,
    tenseMatch,
    score: finalScore,
    detectedTense: tenseId,
    targetStructure: expectedFormula,
    breakdown: {
      subject: parsed.subject,
      auxiliary: parsed.auxiliary,
      mainVerb: parsed.mainVerb,
      objectComplement: parsed.objectComplement,
      timeMarker: parsed.timeMarker
    },
    svoStatus: {
      hasSubject,
      hasVerb,
      hasObjectComplement,
      isOrderValid,
      summaryAr: svoSummaryAr
    },
    agreementStatus: {
      isValid: agreementValid,
      subjectTypeAr,
      ruleAppliedAr: agreementRuleAr || 'يجب أن يتطابق تصريف الفعل مع نوع الفاعل وعدده.',
      detailsAr: agreementDetailsAr
    },
    targetStructureStatus: {
      isMatched: targetStructureMatched,
      expectedFormula,
      detailsAr: targetDetailsAr
    },
    explanationAr,
    corrections,
    suggestionsAr,
    naturalAlternative: polishedAlt,
    spontaneousFormatting: normResult.formattingInfo,
    source: 'client_local_svo_engine'
  };
}
