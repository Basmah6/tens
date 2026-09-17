import { renderArabicSentence } from './arabicConjugator';

export interface SemanticComplement {
  en: string;
  ar: string;
}

export interface SemanticVerb {
  base: string;
  conjugated?: string;
  v2?: string;
  v3?: string;
  ving?: string;
  meaningAr: string;
  complements: SemanticComplement[];
}

export interface SubjectItem {
  text: string;
  type: 'sing' | 'plur' | 'i' | 'you';
  meaningAr: string;
}

export interface TimeItem {
  en: string;
  ar: string;
}

export type SentenceFormMode = 'affirmative' | 'negative' | 'yes_no' | 'wh_question';

export interface BuiltSentenceResult {
  fullSentence: string;
  translationAr: string;
  components: {
    whWord?: { text: string; roleAr: string };
    auxiliary?: { text: string; roleAr: string };
    subject: { text: string; roleAr: string };
    auxiliaryAfterSub?: { text: string; roleAr: string };
    verb: { text: string; roleAr: string; formNameAr: string };
    complement: { text: string; roleAr: string };
    time: { text: string; roleAr: string };
  };
  ruleExplanationAr: string;
}

/**
 * Universal default semantic complements for common verbs
 * Ensuring 100% natural, logical combinations
 */
export const VERB_COMPLEMENTS_DICTIONARY: Record<string, SemanticComplement[]> = {
  drive: [
    { en: 'a comfortable modern car', ar: 'سيارة حديثة ومريحة' },
    { en: 'to the office carefully', ar: 'إلى المكتب بحذر' },
    { en: 'along the coastal highway', ar: 'على طول الطريق الساحلي السريع' }
  ],
  speak: [
    { en: 'English fluently at meetings', ar: 'اللغة الإنجليزية بطلاقة في الاجتماعات' },
    { en: 'with the project manager', ar: 'مع مدير المشروع' },
    { en: 'three different languages', ar: 'ثلاث لغات مختلفة' }
  ],
  play: [
    { en: 'football with friends at the club', ar: 'كرة القدم مع الأصدقاء في النادي' },
    { en: 'the piano with great passion', ar: 'البيانو بشغف كبير' },
    { en: 'chess in the evening', ar: 'الشطرنج في المساء' }
  ],
  study: [
    { en: 'medicine at university', ar: 'الطب في الجامعة' },
    { en: 'for the final exams', ar: 'للاختبارات النهائية' },
    { en: 'English grammar and vocabulary', ar: 'قواعد اللغة الإنجليزية ومفرداتها' }
  ],
  drink: [
    { en: 'a cup of hot coffee', ar: 'فنجاناً من القهوة الساخنة' },
    { en: 'fresh orange juice', ar: 'عصير برتقال طازجاً' },
    { en: 'plenty of pure water', ar: 'الكثير من الماء النقي' }
  ],
  read: [
    { en: 'an inspiring scientific book', ar: 'كتاباً علمياً ملهماً' },
    { en: 'the morning international news', ar: 'الأخبار الدولية الصباحية' },
    { en: 'a captivating historical novel', ar: 'رواية تاريخية آسرة' }
  ],
  write: [
    { en: 'a comprehensive weekly report', ar: 'تقريراً أسبوعياً شاملاً' },
    { en: 'an important email to the team', ar: 'بريداً إلكترونياً مهماً للفريق' },
    { en: 'an academic research article', ar: 'مقال بحث أكاديمي' }
  ],
  build: [
    { en: 'a modern web application', ar: 'تطبيق ويب حديثاً' },
    { en: 'a scalable software system', ar: 'نظاماً برمجياً قابلاً للتوسع' },
    { en: 'a high-quality portfolio', ar: 'معرض أعمال عالي الجودة' }
  ],
  design: [
    { en: 'a user-friendly mobile interface', ar: 'واجهة هاتف سهلة الاستخدام' },
    { en: 'an innovative modern logo', ar: 'شعاراً حديثاً ومبتكراً' },
    { en: 'a creative marketing campaign', ar: 'حملة تسويقية إبداعية' }
  ],
  prepare: [
    { en: 'for the important job interview', ar: 'لمقابلة العمل المهمة' },
    { en: 'a clear presentation for clients', ar: 'عرضاً تقديمياً واضحاً للعملاء' },
    { en: 'a delicious homemade lunch', ar: 'وجبة غداء منزلية شهية' }
  ],
  code: [
    { en: 'a fast responsive web application', ar: 'تطبيق ويب سريع ومتجاوب' },
    { en: 'clean algorithms for the project', ar: 'خوارزميات نظيفة للمشروع' },
    { en: 'the backend services', ar: 'خدمات الواجهة الخلفية' }
  ],
  wait: [
    { en: 'for the morning express train', ar: 'لقطار الصباح السريع' },
    { en: 'at the airport arrival lounge', ar: 'في صالة الوصول بالمطار' },
    { en: 'patiently for the doctor', ar: 'بصبر لمقابلة الطبيب' }
  ],
  visit: [
    { en: 'the national historical museum', ar: 'المتحف التاريخي الوطني' },
    { en: 'their grandparents on the farm', ar: 'أجدادهم في المزرعة' },
    { en: 'famous landmarks across the city', ar: 'معالم شهيرة في أرجاء المدينة' }
  ],
  find: [
    { en: 'the missing office keys', ar: 'مفاتيح المكتب المفقودة' },
    { en: 'an optimal solution to the problem', ar: 'حلاً مثالياً للمشكلة' },
    { en: 'valuable information in the archive', ar: 'معلومات قيّمة في الأرشيف' }
  ],
  buy: [
    { en: 'a brand-new laptop for university', ar: 'حاسوباً محمولاً جديداً كلياً للجامعة' },
    { en: 'fresh groceries from the market', ar: 'بقالة طازجة من السوق' },
    { en: 'a meaningful gift for a close friend', ar: 'هدية قيّمة لصديق مقرب' }
  ],
  see: [
    { en: 'an informative space documentary', ar: 'فيلماً وثائقياً ثرياً عن الفضاء' },
    { en: 'the modern art gallery', ar: 'معرض الفن الحديث' },
    { en: 'a dramatic improvement in performance', ar: 'تحسناً ملحوظاً في الأداء' }
  ],
  finish: [
    { en: 'all the assigned project tasks', ar: 'جميع مهام المشروع الموكلة' },
    { en: 'the quarterly financial audit', ar: 'التدقيق المالي الربع سنوي' },
    { en: 'writing the final chapter', ar: 'كتابة الفصل الأخير' }
  ],
  complete: [
    { en: 'the advanced certification program', ar: 'برنامج الشهادة المتقدمة' },
    { en: 'the construction milestones', ar: 'مراحل البناء الأساسية' },
    { en: 'the required documentation', ar: 'المستندات والوثائق المطلوبة' }
  ],
  learn: [
    { en: 'advanced web development skills', ar: 'مهارات تطوير ويب متقدمة' },
    { en: 'how to speak Japanese', ar: 'كيفية التحدث باللغة اليابانية' },
    { en: 'effective leadership strategies', ar: 'استراتيجيات القيادة الفعالة' }
  ],
  travel: [
    { en: 'to London for an international conference', ar: 'إلى لندن لحضور مؤتمر دولي' },
    { en: 'across several European countries', ar: 'عبر عدة دول أوروبية' },
    { en: 'around the world for exploration', ar: 'حول العالم للاستكشاف' }
  ],
  fly: [
    { en: 'direct to Tokyo for business', ar: 'مباشرة إلى طوكيو في رحلة عمل' },
    { en: 'above the snow-covered mountains', ar: 'فوق الجبال المغطاة بالثلوج' },
    { en: 'to Dubai for a holiday', ar: 'إلى دبي في عطلة' }
  ],
  help: [
    { en: 'the new teammates settle in', ar: 'الزملاء الجدد على التأقلم' },
    { en: 'elderly neighbors with their groceries', ar: 'الجيران كبار السن في حمل مشترياتهم' },
    { en: 'students understand difficult topics', ar: 'الطلاب على فهم الموضوعات الصعبة' }
  ],
  call: [
    { en: 'the technical customer support', ar: 'الدعم الفني للعملاء' },
    { en: 'an emergency team meeting', ar: 'اجتماع طارئ لفريق العمل' },
    { en: 'family members to check on them', ar: 'أفراد العائلة للاطمئنان عليهم' }
  ],
  teach: [
    { en: 'computer programming to beginners', ar: 'برمجة الحاسوب للمبتدئين' },
    { en: 'applied mathematics at high school', ar: 'الرياضيات التطبيقية في الثانوية' },
    { en: 'English as a second language', ar: 'اللغة الإنجليزية كلغة ثانية' }
  ],
  work: [
    { en: 'at a leading technology company', ar: 'في شركة تقنية رائدة' },
    { en: 'on a groundbreaking research project', ar: 'في مشروع بحثي ريادي' },
    { en: 'remotely with a global team', ar: 'عن بُعد مع فريق عمل عالمي' }
  ],
  live: [
    { en: 'in this quiet peaceful neighborhood', ar: 'في هذا الحي الهادئ والجميل' },
    { en: 'in a modern metropolitan apartment', ar: 'في شقة حديثة بقلب المدينة' },
    { en: 'abroad to gain international experience', ar: 'في الخارج لاكتساب خبرة دولية' }
  ],
  leave: [
    { en: 'the office right on time', ar: 'المكتب في الوقت المحدد تماماً' },
    { en: 'the conference hall after the keynote', ar: 'قاعة المؤتمر بعد الكلمة الرئيسية' },
    { en: 'for the airport early morning', ar: 'متوجهاً إلى المطار في الصباح الباكر' }
  ],
  attend: [
    { en: 'the global climate summit', ar: 'القمة العالمية للمناخ' },
    { en: 'an intensive leadership workshop', ar: 'ورشة عمل مكثفة في القيادة' },
    { en: 'the morning team standup', ar: 'الاجتماع الصباحي السريع للفريق' }
  ],
  watch: [
    { en: 'an exciting football tournament', ar: 'بطولة كرة قدم حماسية' },
    { en: 'the live scientific broadcast', ar: 'البث العلمي المباشر' },
    { en: 'an educational documentary', ar: 'فيلماً وثائقياً تعليمياً' }
  ],
  cook: [
    { en: 'a nutritious dinner for the family', ar: 'عشاءً مغذياً لجميع أفراد العائلة' },
    { en: 'traditional Italian pasta', ar: 'معكرونة إيطالية تقليدية' },
    { en: 'fresh homemade soup', ar: 'حساءً طازجاً منزلي الصنع' }
  ]
};

/**
 * Get guaranteed sense-making complements for any verb
 */
export function getComplementsForVerb(verbBase: string): SemanticComplement[] {
  const normalized = verbBase.trim().toLowerCase();
  if (VERB_COMPLEMENTS_DICTIONARY[normalized]) {
    return VERB_COMPLEMENTS_DICTIONARY[normalized];
  }
  // Generic fallback if not matched
  return [
    { en: 'the assigned project tasks', ar: 'مهام المشروع المحددة' },
    { en: 'with dedication and focus', ar: 'بتفانٍ وتركيز كامل' },
    { en: 'in an effective way', ar: 'بطريقة فعالة' }
  ];
}

/**
 * Helper to conjugate basic English verbs into forms
 */
export function getVerbForms(base: string, customV2?: string, customV3?: string, customVing?: string) {
  const b = base.trim().toLowerCase();

  // Present 3rd singular
  let v3rd = b + 's';
  if (b.endsWith('y') && !/[aeiou]y$/.test(b)) {
    v3rd = b.slice(0, -1) + 'ies';
  } else if (b.endsWith('ch') || b.endsWith('sh') || b.endsWith('ss') || b.endsWith('x') || b.endsWith('o')) {
    v3rd = b + 'es';
  }

  // -ing form
  let ving = customVing || (b.endsWith('e') && !b.endsWith('ee') ? b.slice(0, -1) + 'ing' : b + 'ing');
  if (b === 'run') ving = 'running';
  if (b === 'sit') ving = 'sitting';
  if (b === 'swim') ving = 'swimming';
  if (b === 'stop') ving = 'stopping';
  if (b === 'die') ving = 'dying';
  if (b === 'lie') ving = 'lying';

  // Irregulars mapping for v2 and v3
  const IRREGULARS: Record<string, [string, string]> = {
    buy: ['bought', 'bought'],
    find: ['found', 'found'],
    drive: ['drove', 'driven'],
    speak: ['spoke', 'spoken'],
    see: ['saw', 'seen'],
    read: ['read', 'read'],
    write: ['wrote', 'written'],
    teach: ['taught', 'taught'],
    learn: ['learned', 'learned'],
    drink: ['drank', 'drunk'],
    fly: ['flew', 'flown'],
    leave: ['left', 'left'],
    build: ['built', 'built'],
    come: ['came', 'come'],
    go: ['went', 'gone'],
    take: ['took', 'taken'],
    make: ['made', 'made'],
    eat: ['ate', 'eaten'],
    know: ['knew', 'known'],
    meet: ['met', 'met'],
    run: ['ran', 'run'],
    sing: ['sang', 'sung'],
    sleep: ['slept', 'slept'],
    spend: ['spent', 'spent'],
    swim: ['swam', 'swum'],
    think: ['thought', 'thought'],
    understand: ['understood', 'understood'],
    wear: ['wore', 'worn'],
    win: ['won', 'won']
  };

  let v2 = customV2 || (IRREGULARS[b] ? IRREGULARS[b][0] : b.endsWith('e') ? b + 'd' : b + 'ed');
  let v3 = customV3 || (IRREGULARS[b] ? IRREGULARS[b][1] : b.endsWith('e') ? b + 'd' : b + 'ed');

  return { base: b, v3rd, v2, v3, ving };
}

/**
 * Subject Arabic translation helper
 */
export function getSubjectAr(subject: string): { ar: string; pronounAr: string } {
  const s = subject.trim().toLowerCase();
  if (s === 'i') return { ar: 'أنا', pronounAr: 'أنا' };
  if (s === 'you') return { ar: 'أنت / أنتم', pronounAr: 'أنت' };
  if (s === 'he') return { ar: 'هو', pronounAr: 'هو' };
  if (s === 'she') return { ar: 'هي', pronounAr: 'هي' };
  if (s === 'it') return { ar: 'هو/هي (لغير العاقل)', pronounAr: 'هو' };
  if (s === 'we') return { ar: 'نحن', pronounAr: 'نحن' };
  if (s === 'they') return { ar: 'هم', pronounAr: 'هم' };
  if (s.includes('sarah')) return { ar: 'سارة', pronounAr: 'هي' };
  if (s.includes('brother')) return { ar: 'أخي', pronounAr: 'هو' };
  if (s.includes('engineers')) return { ar: 'المهندسون', pronounAr: 'هم' };
  if (s.includes('manager')) return { ar: 'المدير', pronounAr: 'هو' };
  if (s.includes('doctor')) return { ar: 'الطبيب', pronounAr: 'هو' };
  return { ar: subject, pronounAr: 'هو' };
}

/**
 * The Master SVO Grammar Engine
 * Builds grammatically flawless, semantically meaningful English sentences
 * with accurate Arabic translation and full breakdown.
 */
function rawBuildSvoSentence(params: {
  tenseId: string;
  subject: SubjectItem;
  verb: {
    base: string;
    meaningAr: string;
    v2?: string;
    v3?: string;
    ving?: string;
  };
  complement: SemanticComplement;
  timeMarker: TimeItem;
  formMode: SentenceFormMode;
  whWord?: string;
}): BuiltSentenceResult {
  const { tenseId, subject, verb, complement, timeMarker, formMode } = params;
  const wh = params.whWord || (verb.base === 'drive' || verb.base === 'travel' || verb.base === 'fly' ? 'Where' : 'Why');

  const forms = getVerbForms(verb.base, verb.v2, verb.v3, verb.ving);
  const isSingular = subject.type === 'sing';
  const isI = subject.type === 'i';
  const isPluralOrYou = subject.type === 'plur' || subject.type === 'you';

  const subText = subject.text;
  const subAr = getSubjectAr(subText).ar;
  const objEn = complement.en;
  const objAr = complement.ar;
  const timeEn = timeMarker.en;
  const timeAr = timeMarker.ar;

  let fullSentence = '';
  let translationAr = '';
  let ruleExplanationAr = '';
  let auxText = '';
  let verbUsed = '';
  let formNameAr = '';

  switch (tenseId) {
    // ----------------------------------------------------
    // 1. PRESENT SIMPLE
    // ----------------------------------------------------
    case 'present_simple': {
      if (formMode === 'affirmative') {
        verbUsed = isSingular ? forms.v3rd : forms.base;
        formNameAr = isSingular ? 'فعل مضاف له s المفرد الغائب' : 'مصدر مجرد (Base V1)';
        fullSentence = `${subText} ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `${subAr} ${verb.meaningAr} ${objAr} ${timeAr}.`;
        ruleExplanationAr = isSingular
          ? `مع الفاعل المفرد (${subText})، يضاف حرف (s/es) للفعل في جملة الإثبات.`
          : `مع الضمائر الجمع والمتكلم (${subText})، يبقى الفعل في المصدر المجرد بدون أي إضافات.`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل (Subject)' },
            verb: { text: verbUsed, roleAr: 'الفعل الأساسي (Main Verb)', formNameAr },
            complement: { text: objEn, roleAr: 'المفعول / التكملة (Complement)' },
            time: { text: timeEn, roleAr: 'الظرف الزمني (Time Marker)' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'negative') {
        auxText = isSingular ? "doesn't" : "don't";
        verbUsed = forms.base;
        fullSentence = `${subText} ${auxText} ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `${subAr} لا ${verb.meaningAr} ${objAr} ${timeAr}.`;
        ruleExplanationAr = `في النفي: نستخدم الفعل المساعد (${auxText}) ويعود الفعل فوراً إلى المصدر المجرد (${verbUsed}).`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل (Subject)' },
            auxiliary: { text: auxText, roleAr: 'الفعل المساعد المنفي (Auxiliary)' },
            verb: { text: verbUsed, roleAr: 'الفعل المجرد (Base Form)', formNameAr: 'مصدر مجرد' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة (Complement)' },
            time: { text: timeEn, roleAr: 'الظرف الزمني (Time Marker)' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'yes_no') {
        auxText = isSingular ? 'Does' : 'Do';
        verbUsed = forms.base;
        fullSentence = `${auxText} ${subText.toLowerCase() === 'i' ? 'you' : subText} ${verbUsed} ${objEn} ${timeEn}?`;
        const qSub = subText.toLowerCase() === 'i' ? 'أنت' : subAr;
        translationAr = `هل ${qSub} ${verb.meaningAr} ${objAr} ${timeAr}؟`;
        ruleExplanationAr = `في سؤال نعم/لا: نبدأ بالفعل المساعد (${auxText}) يليه الفاعل ثم الفعل في المصدر المجرد.`;
        return {
          fullSentence,
          translationAr,
          components: {
            auxiliary: { text: auxText, roleAr: 'الفعل المساعد (Auxiliary)' },
            subject: { text: subText.toLowerCase() === 'i' ? 'you' : subText, roleAr: 'الفاعل (Subject)' },
            verb: { text: verbUsed, roleAr: 'الفعل الأساسي المجرد', formNameAr: 'مصدر مجرد' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'الظرف الزمني' }
          },
          ruleExplanationAr
        };
      } else {
        auxText = isSingular ? 'does' : 'do';
        verbUsed = forms.base;
        fullSentence = `${wh} ${auxText} ${subText.toLowerCase() === 'i' ? 'you' : subText} ${verbUsed} ${objEn} ${timeEn}?`;
        const qSub = subText.toLowerCase() === 'i' ? 'أنت' : subAr;
        translationAr = `${wh === 'Why' ? 'لماذا' : 'أين'} ${qSub} ${verb.meaningAr} ${objAr} ${timeAr}؟`;
        ruleExplanationAr = `في سؤال Wh-: نضع كلمة الاستفهام (${wh}) + الفعل المساعد (${auxText}) + الفاعل + المصدر المجرد.`;
        return {
          fullSentence,
          translationAr,
          components: {
            whWord: { text: wh, roleAr: 'أداة الاستفهام (Wh- Word)' },
            auxiliary: { text: auxText, roleAr: 'الفعل المساعد (Auxiliary)' },
            subject: { text: subText.toLowerCase() === 'i' ? 'you' : subText, roleAr: 'الفاعل (Subject)' },
            verb: { text: verbUsed, roleAr: 'الفعل الأساسي المجرد', formNameAr: 'مصدر مجرد' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'الظرف الزمني' }
          },
          ruleExplanationAr
        };
      }
    }

    // ----------------------------------------------------
    // 2. PRESENT CONTINUOUS
    // ----------------------------------------------------
    case 'present_continuous': {
      const auxAff = isI ? 'am' : isSingular ? 'is' : 'are';
      const auxNeg = isI ? 'am not' : isSingular ? "isn't" : "aren't";
      verbUsed = forms.ving;

      if (formMode === 'affirmative') {
        fullSentence = `${subText} ${auxAff} ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `${subAr} ${verb.meaningAr} (حالياً/الآن) ${objAr} ${timeAr}.`;
        ruleExplanationAr = `في المضارع المستمر: نستخدم (${auxAff}) المتطابق مع الفاعل + الفعل المنتهي بـ (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل' },
            auxiliary: { text: auxAff, roleAr: 'الفعل المساعد (Be)' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'الظرف الزمني' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'negative') {
        fullSentence = `${subText} ${auxNeg} ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `${subAr} لا ${verb.meaningAr} ${objAr} ${timeAr}.`;
        ruleExplanationAr = `في النفي: نضيف not للفعل المساعد (${auxNeg}) مع بقاء الفعل بـ (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل' },
            auxiliary: { text: auxNeg, roleAr: 'الفعل المساعد المنفي' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'الظرف الزمني' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'yes_no') {
        const qAux = isI ? 'Are' : isSingular ? 'Is' : 'Are';
        const qSub = isI ? 'you' : subText;
        fullSentence = `${qAux} ${qSub} ${verbUsed} ${objEn} ${timeEn}?`;
        translationAr = `هل ${isI ? 'أنت' : subAr} ${verb.meaningAr} ${objAr} ${timeAr}؟`;
        ruleExplanationAr = `في السؤال: نقدم الفعل المساعد (${qAux}) في بداية الجملة قبل الفاعل.`;
        return {
          fullSentence,
          translationAr,
          components: {
            auxiliary: { text: qAux, roleAr: 'الفعل المساعد (Be)' },
            subject: { text: qSub, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'الظرف الزمني' }
          },
          ruleExplanationAr
        };
      } else {
        const qAux = isI ? 'are' : isSingular ? 'is' : 'are';
        const qSub = isI ? 'you' : subText;
        fullSentence = `${wh} ${qAux} ${qSub} ${verbUsed} ${objEn} ${timeEn}?`;
        translationAr = `${wh === 'Why' ? 'لماذا' : 'ماذا'} ${isI ? 'أنت' : subAr} ${verb.meaningAr} ${objAr} ${timeAr}؟`;
        ruleExplanationAr = `في سؤال Wh-: نضع أداة الاستفهام + (${qAux}) + الفاعل + الفعل المستمر (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            whWord: { text: wh, roleAr: 'أداة الاستفهام' },
            auxiliary: { text: qAux, roleAr: 'الفعل المساعد' },
            subject: { text: qSub, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'الظرف الزمني' }
          },
          ruleExplanationAr
        };
      }
    }

    // ----------------------------------------------------
    // 3. PRESENT PERFECT
    // ----------------------------------------------------
    case 'present_perfect': {
      const auxAff = isSingular ? 'has' : 'have';
      const auxNeg = isSingular ? "hasn't" : "haven't";
      verbUsed = forms.v3;

      if (formMode === 'affirmative') {
        fullSentence = `${subText} ${auxAff} ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `لقد ${verb.meaningAr} ${subAr} ${objAr} (${timeAr}).`;
        ruleExplanationAr = `في المضارع التام: نستخدم (${auxAff}) + التصريف الثالث للفعل V3 (${verbUsed}).`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل' },
            auxiliary: { text: auxAff, roleAr: 'الفعل المساعد (have/has)' },
            verb: { text: verbUsed, roleAr: 'التصريف الثالث (V3)', formNameAr: 'Past Participle V3' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'الظرف الزمني' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'negative') {
        fullSentence = `${subText} ${auxNeg} ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `لم ${verb.meaningAr} ${subAr} ${objAr} حتى الآن (${timeAr}).`;
        ruleExplanationAr = `في النفي: نستخدم (${auxNeg}) مع إبقاء الفعل في التصريف الثالث V3.`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل' },
            auxiliary: { text: auxNeg, roleAr: 'الفعل المساعد المنفي' },
            verb: { text: verbUsed, roleAr: 'التصريف الثالث (V3)', formNameAr: 'Past Participle V3' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'الظرف الزمني' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'yes_no') {
        const qAux = isI ? 'Have' : isSingular ? 'Has' : 'Have';
        const qSub = isI ? 'you' : subText;
        fullSentence = `${qAux} ${qSub} ${verbUsed} ${objEn} ${timeEn}?`;
        translationAr = `هل ${isI ? 'أنت' : subAr} ${verb.meaningAr} ${objAr} ${timeAr}؟`;
        ruleExplanationAr = `في السؤال: نبدأ بـ (${qAux}) + الفاعل + التصريف الثالث V3.`;
        return {
          fullSentence,
          translationAr,
          components: {
            auxiliary: { text: qAux, roleAr: 'الفعل المساعد' },
            subject: { text: qSub, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'التصريف الثالث (V3)', formNameAr: 'Past Participle V3' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'الظرف الزمني' }
          },
          ruleExplanationAr
        };
      } else {
        const qAux = isI ? 'have' : isSingular ? 'has' : 'have';
        const qSub = isI ? 'you' : subText;
        fullSentence = `${wh} ${qAux} ${qSub} ${verbUsed} ${objEn} ${timeEn}?`;
        translationAr = `${wh === 'Why' ? 'لماذا' : 'أين'} ${isI ? 'أنت' : subAr} ${verb.meaningAr} ${objAr}؟`;
        ruleExplanationAr = `سؤال Wh-: أداة الاستفهام + (${qAux}) + الفاعل + التصريف الثالث V3.`;
        return {
          fullSentence,
          translationAr,
          components: {
            whWord: { text: wh, roleAr: 'أداة الاستفهام' },
            auxiliary: { text: qAux, roleAr: 'الفعل المساعد' },
            subject: { text: qSub, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'التصريف الثالث (V3)', formNameAr: 'Past Participle V3' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'الظرف الزمني' }
          },
          ruleExplanationAr
        };
      }
    }

    // ----------------------------------------------------
    // 4. PRESENT PERFECT CONTINUOUS
    // ----------------------------------------------------
    case 'present_perfect_continuous': {
      const auxAff = isSingular ? 'has been' : 'have been';
      const auxNeg = isSingular ? "hasn't been" : "haven't been";
      verbUsed = forms.ving;

      if (formMode === 'affirmative') {
        fullSentence = `${subText} ${auxAff} ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `${subAr} مستمر في ${verb.meaningAr} ${objAr} ${timeAr}.`;
        ruleExplanationAr = `في المضارع التام المستمر: نستخدم (${auxAff}) + الفعل المنتهي بـ (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل' },
            auxiliary: { text: auxAff, roleAr: 'الفعل المساعد (have/has been)' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'المدة الزمنية (Duration)' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'negative') {
        fullSentence = `${subText} ${auxNeg} ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `${subAr} لم يكن مستمراً في ${verb.meaningAr} ${objAr} ${timeAr}.`;
        ruleExplanationAr = `في النفي: نضع not بعد have/has فتصبح (${auxNeg}) متبوعة بـ (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل' },
            auxiliary: { text: auxNeg, roleAr: 'الفعل المساعد المنفي' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'المدة الزمنية' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'yes_no') {
        const qAuxHead = isI ? 'Have' : isSingular ? 'Has' : 'Have';
        const qSub = isI ? 'you' : subText;
        fullSentence = `${qAuxHead} ${qSub} been ${verbUsed} ${objEn} ${timeEn}?`;
        translationAr = `هل ${isI ? 'أنت' : subAr} مستمر في ${verb.meaningAr} ${objAr} ${timeAr}؟`;
        ruleExplanationAr = `في السؤال: (${qAuxHead}) + الفاعل + been + الفعل بـ (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            auxiliary: { text: `${qAuxHead} ... been`, roleAr: 'الفعل المساعد' },
            subject: { text: qSub, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'المدة الزمنية' }
          },
          ruleExplanationAr
        };
      } else {
        const qAuxHead = isI ? 'have' : isSingular ? 'has' : 'have';
        const qSub = isI ? 'you' : subText;
        fullSentence = `How long ${qAuxHead} ${qSub} been ${verbUsed} ${objEn}?`;
        translationAr = `كم المدة التي قضاها ${isI ? 'أنت' : subAr} في ${verb.meaningAr} ${objAr}؟`;
        ruleExplanationAr = `السؤال الأشهر هنا هو (How long) + have/has + الفاعل + been + (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            whWord: { text: 'How long', roleAr: 'أداة السؤال عن المدة' },
            auxiliary: { text: `${qAuxHead} ... been`, roleAr: 'الفعل المساعد' },
            subject: { text: qSub, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'المدة الزمنية' }
          },
          ruleExplanationAr
        };
      }
    }

    // ----------------------------------------------------
    // 5. PAST SIMPLE
    // ----------------------------------------------------
    case 'past_simple': {
      if (formMode === 'affirmative') {
        verbUsed = forms.v2;
        formNameAr = 'التصريف الثاني للماضي (V2)';
        fullSentence = `${subText} ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `${subAr} ${verb.meaningAr} ${objAr} ${timeAr}.`;
        ruleExplanationAr = `في الماضي البسيط (الإثبات): نستخدم التصريف الثاني V2 مباشرة بعد الفاعل بدون أي فعل مساعد.`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'التصريف الثاني (V2)', formNameAr },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'الظرف الزمني للماضي' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'negative') {
        auxText = "didn't";
        verbUsed = forms.base;
        fullSentence = `${subText} ${auxText} ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `${subAr} لم ${verb.meaningAr} ${objAr} ${timeAr}.`;
        ruleExplanationAr = `القاعدة الذهبية: وجود didn't يسحب الماضي من الفعل الأساسي ويعيده للمصدر المجرد (${verbUsed}).`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل' },
            auxiliary: { text: auxText, roleAr: 'الفعل المساعد المنفي (didn\'t)' },
            verb: { text: verbUsed, roleAr: 'المصدر المجرد (Base V1)', formNameAr: 'مصدر مجرد' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'الظرف الزمني للماضي' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'yes_no') {
        auxText = 'Did';
        verbUsed = forms.base;
        const qSub = subText.toLowerCase() === 'i' ? 'you' : subText;
        fullSentence = `${auxText} ${qSub} ${verbUsed} ${objEn} ${timeEn}?`;
        translationAr = `هل ${subText.toLowerCase() === 'i' ? 'أنت' : subAr} ${verb.meaningAr} ${objAr} ${timeAr}؟`;
        ruleExplanationAr = `في سؤال الماضي: نبدأ بـ (Did) + الفاعل + المصدر المجرد (${verbUsed}).`;
        return {
          fullSentence,
          translationAr,
          components: {
            auxiliary: { text: auxText, roleAr: 'الفعل المساعد (Did)' },
            subject: { text: qSub, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'المصدر المجرد', formNameAr: 'مصدر مجرد' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'الظرف الزمني للماضي' }
          },
          ruleExplanationAr
        };
      } else {
        auxText = 'did';
        verbUsed = forms.base;
        const qSub = subText.toLowerCase() === 'i' ? 'you' : subText;
        fullSentence = `${wh} ${auxText} ${qSub} ${verbUsed} ${objEn} ${timeEn}?`;
        translationAr = `${wh === 'Why' ? 'لماذا' : 'أين'} ${subText.toLowerCase() === 'i' ? 'أنت' : subAr} ${verb.meaningAr} ${objAr} ${timeAr}؟`;
        ruleExplanationAr = `سؤال Wh-: أداة الاستفهام + did + الفاعل + المصدر المجرد (${verbUsed}).`;
        return {
          fullSentence,
          translationAr,
          components: {
            whWord: { text: wh, roleAr: 'أداة الاستفهام' },
            auxiliary: { text: auxText, roleAr: 'الفعل المساعد (did)' },
            subject: { text: qSub, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'المصدر المجرد', formNameAr: 'مصدر مجرد' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'الظرف الزمني للماضي' }
          },
          ruleExplanationAr
        };
      }
    }

    // ----------------------------------------------------
    // 6. PAST CONTINUOUS
    // ----------------------------------------------------
    case 'past_continuous': {
      const isWas = isI || isSingular;
      const auxAff = isWas ? 'was' : 'were';
      const auxNeg = isWas ? "wasn't" : "weren't";
      verbUsed = forms.ving;

      if (formMode === 'affirmative') {
        fullSentence = `${subText} ${auxAff} ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `كان ${subAr} ${verb.meaningAr} ${objAr} ${timeAr}.`;
        ruleExplanationAr = `في الماضي المستمر: نستخدم (${auxAff}) المتطابق مع الفاعل + الفعل المنتهي بـ (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل' },
            auxiliary: { text: auxAff, roleAr: 'فعل الكينونة للماضي (was/were)' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'التوقيت الماضي المحدد' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'negative') {
        fullSentence = `${subText} ${auxNeg} ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `لم يكن ${subAr} ${verb.meaningAr} ${objAr} ${timeAr}.`;
        ruleExplanationAr = `في النفي: نستخدم (${auxNeg}) مع بقاء الفعل بصيغة (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل' },
            auxiliary: { text: auxNeg, roleAr: 'الفعل المساعد المنفي' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'التوقيت الماضي المحدد' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'yes_no') {
        const qAux = isI ? 'Were' : isWas ? 'Was' : 'Were';
        const qSub = isI ? 'you' : subText;
        fullSentence = `${qAux} ${qSub} ${verbUsed} ${objEn} ${timeEn}?`;
        translationAr = `هل كان ${isI ? 'أنت' : subAr} ${verb.meaningAr} ${objAr} ${timeAr}؟`;
        ruleExplanationAr = `في السؤال: نبدأ بـ (${qAux}) + الفاعل + الفعل المنتهي بـ (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            auxiliary: { text: qAux, roleAr: 'الفعل المساعد' },
            subject: { text: qSub, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'التوقيت الماضي' }
          },
          ruleExplanationAr
        };
      } else {
        const qAux = isI ? 'were' : isWas ? 'was' : 'were';
        const qSub = isI ? 'you' : subText;
        fullSentence = `${wh} ${qAux} ${qSub} ${verbUsed} ${objEn} ${timeEn}?`;
        translationAr = `${wh === 'Why' ? 'لماذا' : 'ماذا'} كان ${isI ? 'أنت' : subAr} ${verb.meaningAr} ${objAr} ${timeAr}؟`;
        ruleExplanationAr = `سؤال Wh-: أداة الاستفهام + (${qAux}) + الفاعل + الفعل المنتهي بـ (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            whWord: { text: wh, roleAr: 'أداة الاستفهام' },
            auxiliary: { text: qAux, roleAr: 'الفعل المساعد' },
            subject: { text: qSub, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'التوقيت الماضي' }
          },
          ruleExplanationAr
        };
      }
    }

    // ----------------------------------------------------
    // 7. PAST PERFECT
    // ----------------------------------------------------
    case 'past_perfect': {
      const auxAff = 'had';
      const auxNeg = "hadn't";
      verbUsed = forms.v3;

      if (formMode === 'affirmative') {
        fullSentence = `${subText} ${auxAff} ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `كان ${subAr} قد ${verb.meaningAr} ${objAr} ${timeAr}.`;
        ruleExplanationAr = `في الماضي التام: نستخدم الفعل المساعد الموحد (had) لجميع الضمائر + التصريف الثالث V3 (${verbUsed}).`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل' },
            auxiliary: { text: auxAff, roleAr: 'الفعل المساعد (had)' },
            verb: { text: verbUsed, roleAr: 'التصريف الثالث (V3)', formNameAr: 'Past Participle V3' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'الظرف الزمني للماضي' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'negative') {
        fullSentence = `${subText} ${auxNeg} ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `لم يكن ${subAr} قد ${verb.meaningAr} ${objAr} ${timeAr}.`;
        ruleExplanationAr = `في النفي: نستخدم (${auxNeg}) متبوعة بالتصريف الثالث V3.`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل' },
            auxiliary: { text: auxNeg, roleAr: 'الفعل المساعد المنفي' },
            verb: { text: verbUsed, roleAr: 'التصريف الثالث (V3)', formNameAr: 'Past Participle V3' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'الظرف الزمني' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'yes_no') {
        const qSub = subText.toLowerCase() === 'i' ? 'you' : subText;
        fullSentence = `Had ${qSub} ${verbUsed} ${objEn} ${timeEn}?`;
        translationAr = `هل كان ${isI ? 'أنت' : subAr} قد ${verb.meaningAr} ${objAr} ${timeAr}؟`;
        ruleExplanationAr = `في السؤال: نبدأ بـ (Had) + الفاعل + التصريف الثالث V3.`;
        return {
          fullSentence,
          translationAr,
          components: {
            auxiliary: { text: 'Had', roleAr: 'الفعل المساعد' },
            subject: { text: qSub, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'التصريف الثالث (V3)', formNameAr: 'Past Participle V3' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'الظرف الزمني' }
          },
          ruleExplanationAr
        };
      } else {
        const qSub = subText.toLowerCase() === 'i' ? 'you' : subText;
        fullSentence = `${wh} had ${qSub} ${verbUsed} ${objEn}?`;
        translationAr = `${wh === 'Why' ? 'لماذا' : 'أين'} كان ${isI ? 'أنت' : subAr} قد ${verb.meaningAr} ${objAr}؟`;
        ruleExplanationAr = `سؤال Wh-: أداة الاستفهام + had + الفاعل + التصريف الثالث V3.`;
        return {
          fullSentence,
          translationAr,
          components: {
            whWord: { text: wh, roleAr: 'أداة الاستفهام' },
            auxiliary: { text: 'had', roleAr: 'الفعل المساعد' },
            subject: { text: qSub, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'التصريف الثالث (V3)', formNameAr: 'Past Participle V3' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'الظرف الزمني' }
          },
          ruleExplanationAr
        };
      }
    }

    // ----------------------------------------------------
    // 8. PAST PERFECT CONTINUOUS
    // ----------------------------------------------------
    case 'past_perfect_continuous': {
      const auxAff = 'had been';
      const auxNeg = "hadn't been";
      verbUsed = forms.ving;

      if (formMode === 'affirmative') {
        fullSentence = `${subText} ${auxAff} ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `كان ${subAr} مستمراً في ${verb.meaningAr} ${objAr} ${timeAr}.`;
        ruleExplanationAr = `في الماضي التام المستمر: السلسلة الثلاثية الثابتة هي (had been) + الفعل بـ (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل' },
            auxiliary: { text: auxAff, roleAr: 'الفعل المساعد (had been)' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'المدة الزمنية الماضية' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'negative') {
        fullSentence = `${subText} ${auxNeg} ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `لم يكن ${subAr} مستمراً في ${verb.meaningAr} ${objAr} ${timeAr}.`;
        ruleExplanationAr = `في النفي: نستخدم (${auxNeg}) متبوعة بالفعل المنتهي بـ (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل' },
            auxiliary: { text: auxNeg, roleAr: 'الفعل المساعد المنفي' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'المدة الزمنية' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'yes_no') {
        const qSub = subText.toLowerCase() === 'i' ? 'you' : subText;
        fullSentence = `Had ${qSub} been ${verbUsed} ${objEn} ${timeEn}?`;
        translationAr = `هل كان ${isI ? 'أنت' : subAr} مستمراً في ${verb.meaningAr} ${objAr} ${timeAr}؟`;
        ruleExplanationAr = `في السؤال: نضع Had في البداية + الفاعل + been + الفعل المنتهي بـ (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            auxiliary: { text: 'Had ... been', roleAr: 'الفعل المساعد' },
            subject: { text: qSub, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'المدة الزمنية' }
          },
          ruleExplanationAr
        };
      } else {
        const qSub = subText.toLowerCase() === 'i' ? 'you' : subText;
        fullSentence = `How long had ${qSub} been ${verbUsed} ${objEn}?`;
        translationAr = `كم المدة التي كان قد قضاها ${isI ? 'أنت' : subAr} في ${verb.meaningAr} ${objAr}؟`;
        ruleExplanationAr = `سؤال How long: (How long had) + الفاعل + been + الفعل المنتهي بـ (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            whWord: { text: 'How long', roleAr: 'أداة الاستفهام' },
            auxiliary: { text: 'had ... been', roleAr: 'الفعل المساعد' },
            subject: { text: qSub, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'المدة الزمنية' }
          },
          ruleExplanationAr
        };
      }
    }

    // ----------------------------------------------------
    // 9. FUTURE SIMPLE
    // ----------------------------------------------------
    case 'future_simple': {
      verbUsed = forms.base;

      if (formMode === 'affirmative') {
        fullSentence = `${subText} will ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `سوف ${verb.meaningAr} ${subAr} ${objAr} ${timeAr}.`;
        ruleExplanationAr = `في المستقبل البسيط: نستخدم (will) لجميع الضمائر متبوعة بالمصدر المجرد (${verbUsed}).`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل' },
            auxiliary: { text: 'will', roleAr: 'فعل المستقبل المساعد' },
            verb: { text: verbUsed, roleAr: 'المصدر المجرد (Base V1)', formNameAr: 'مصدر مجرد' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'التوقيت المستقبلي' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'negative') {
        fullSentence = `${subText} won't ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `لن ${verb.meaningAr} ${subAr} ${objAr} ${timeAr}.`;
        ruleExplanationAr = `في النفي: نستخدم الاختصار (won't = will not) متبوعاً بالمصدر المجرد (${verbUsed}).`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل' },
            auxiliary: { text: "won't", roleAr: 'الفعل المساعد المنفي (won\'t)' },
            verb: { text: verbUsed, roleAr: 'المصدر المجرد (Base V1)', formNameAr: 'مصدر مجرد' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'التوقيت المستقبلي' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'yes_no') {
        const qSub = subText.toLowerCase() === 'i' ? 'you' : subText;
        fullSentence = `Will ${qSub} ${verbUsed} ${objEn} ${timeEn}?`;
        translationAr = `هل سوف ${isI ? 'أنت' : subAr} ${verb.meaningAr} ${objAr} ${timeAr}؟`;
        ruleExplanationAr = `في السؤال: نبدأ بـ (Will) + الفاعل + المصدر المجرد (${verbUsed}).`;
        return {
          fullSentence,
          translationAr,
          components: {
            auxiliary: { text: 'Will', roleAr: 'الفعل المساعد' },
            subject: { text: qSub, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'المصدر المجرد', formNameAr: 'مصدر مجرد' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'التوقيت المستقبلي' }
          },
          ruleExplanationAr
        };
      } else {
        const qSub = subText.toLowerCase() === 'i' ? 'you' : subText;
        fullSentence = `${wh} will ${qSub} ${verbUsed} ${objEn} ${timeEn}?`;
        translationAr = `${wh === 'Why' ? 'لماذا' : 'أين'} سوف ${isI ? 'أنت' : subAr} ${verb.meaningAr} ${objAr} ${timeAr}؟`;
        ruleExplanationAr = `سؤال Wh-: أداة الاستفهام + will + الفاعل + المصدر المجرد (${verbUsed}).`;
        return {
          fullSentence,
          translationAr,
          components: {
            whWord: { text: wh, roleAr: 'أداة الاستفهام' },
            auxiliary: { text: 'will', roleAr: 'الفعل المساعد' },
            subject: { text: qSub, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'المصدر المجرد', formNameAr: 'مصدر مجرد' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'التوقيت المستقبلي' }
          },
          ruleExplanationAr
        };
      }
    }

    // ----------------------------------------------------
    // 10. FUTURE CONTINUOUS
    // ----------------------------------------------------
    case 'future_continuous': {
      verbUsed = forms.ving;

      if (formMode === 'affirmative') {
        fullSentence = `${subText} will be ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `سيكون ${subAr} في حالة ${verb.meaningAr} ${objAr} ${timeAr}.`;
        ruleExplanationAr = `في المستقبل المستمر: التركيبة الثابتة هي (will be) + الفعل المنتهي بـ (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل' },
            auxiliary: { text: 'will be', roleAr: 'الفعل المساعد (will be)' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'التوقيت المستقبلي المحدد' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'negative') {
        fullSentence = `${subText} won't be ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `لن يكون ${subAr} ${verb.meaningAr} ${objAr} ${timeAr}.`;
        ruleExplanationAr = `في النفي: نستخدم (won't be) متبوعة بالفعل المنتهي بـ (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل' },
            auxiliary: { text: "won't be", roleAr: 'الفعل المساعد المنفي' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'التوقيت المستقبلي المحدد' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'yes_no') {
        const qSub = subText.toLowerCase() === 'i' ? 'you' : subText;
        fullSentence = `Will ${qSub} be ${verbUsed} ${objEn} ${timeEn}?`;
        translationAr = `هل سيكون ${isI ? 'أنت' : subAr} ${verb.meaningAr} ${objAr} ${timeAr}؟`;
        ruleExplanationAr = `في السؤال: نبدأ بـ (Will) + الفاعل + be + الفعل المنتهي بـ (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            auxiliary: { text: 'Will ... be', roleAr: 'الفعل المساعد' },
            subject: { text: qSub, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'التوقيت المستقبلي' }
          },
          ruleExplanationAr
        };
      } else {
        const qSub = subText.toLowerCase() === 'i' ? 'you' : subText;
        fullSentence = `${wh} will ${qSub} be ${verbUsed} ${objEn} ${timeEn}?`;
        translationAr = `${wh === 'Why' ? 'لماذا' : 'أين'} سيكون ${isI ? 'أنت' : subAr} ${verb.meaningAr} ${objAr}؟`;
        ruleExplanationAr = `سؤال Wh-: أداة الاستفهام + will + الفاعل + be + الفعل المنتهي بـ (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            whWord: { text: wh, roleAr: 'أداة الاستفهام' },
            auxiliary: { text: 'will ... be', roleAr: 'الفعل المساعد' },
            subject: { text: qSub, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'التوقيت المستقبلي' }
          },
          ruleExplanationAr
        };
      }
    }

    // ----------------------------------------------------
    // 11. FUTURE PERFECT
    // ----------------------------------------------------
    case 'future_perfect': {
      verbUsed = forms.v3;

      if (formMode === 'affirmative') {
        fullSentence = `${subText} will have ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `سيكون ${subAr} قد أنهى ${verb.meaningAr} ${objAr} ${timeAr}.`;
        ruleExplanationAr = `في المستقبل التام: نستخدم (will have) لجميع الضمائر + التصريف الثالث V3 (${verbUsed}).`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل' },
            auxiliary: { text: 'will have', roleAr: 'الفعل المساعد (will have)' },
            verb: { text: verbUsed, roleAr: 'التصريف الثالث (V3)', formNameAr: 'Past Participle V3' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'الموعد النهائي (Deadline)' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'negative') {
        fullSentence = `${subText} won't have ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `لن يكون ${subAr} قد أنهى ${verb.meaningAr} ${objAr} ${timeAr}.`;
        ruleExplanationAr = `في النفي: نستخدم (won't have) متبوعة بالتصريف الثالث V3.`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل' },
            auxiliary: { text: "won't have", roleAr: 'الفعل المساعد المنفي' },
            verb: { text: verbUsed, roleAr: 'التصريف الثالث (V3)', formNameAr: 'Past Participle V3' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'الموعد النهائي' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'yes_no') {
        const qSub = subText.toLowerCase() === 'i' ? 'you' : subText;
        fullSentence = `Will ${qSub} have ${verbUsed} ${objEn} ${timeEn}?`;
        translationAr = `هل سيكون ${isI ? 'أنت' : subAr} قد أكمل ${verb.meaningAr} ${objAr} ${timeAr}؟`;
        ruleExplanationAr = `في السؤال: نبدأ بـ (Will) + الفاعل + have + التصريف الثالث V3.`;
        return {
          fullSentence,
          translationAr,
          components: {
            auxiliary: { text: 'Will ... have', roleAr: 'الفعل المساعد' },
            subject: { text: qSub, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'التصريف الثالث (V3)', formNameAr: 'Past Participle V3' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'الموعد النهائي' }
          },
          ruleExplanationAr
        };
      } else {
        const qSub = subText.toLowerCase() === 'i' ? 'you' : subText;
        fullSentence = `${wh} will ${qSub} have ${verbUsed} ${objEn}?`;
        translationAr = `${wh === 'Why' ? 'لماذا' : 'أين'} سيكون ${isI ? 'أنت' : subAr} قد أكمل ${verb.meaningAr} ${objAr}؟`;
        ruleExplanationAr = `سؤال Wh-: أداة الاستفهام + will + الفاعل + have + التصريف الثالث V3.`;
        return {
          fullSentence,
          translationAr,
          components: {
            whWord: { text: wh, roleAr: 'أداة الاستفهام' },
            auxiliary: { text: 'will ... have', roleAr: 'الفعل المساعد' },
            subject: { text: qSub, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'التصريف الثالث (V3)', formNameAr: 'Past Participle V3' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'الموعد النهائي' }
          },
          ruleExplanationAr
        };
      }
    }

    // ----------------------------------------------------
    // 12. FUTURE PERFECT CONTINUOUS
    // ----------------------------------------------------
    case 'future_perfect_continuous': {
      verbUsed = forms.ving;

      if (formMode === 'affirmative') {
        fullSentence = `${subText} will have been ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `سيكون ${subAr} قد أمضى وقتاً في ${verb.meaningAr} ${objAr} ${timeAr}.`;
        ruleExplanationAr = `في المستقبل التام المستمر: السلسلة الرباعية الثابتة هي (will have been) + الفعل بـ (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل' },
            auxiliary: { text: 'will have been', roleAr: 'الفعل المساعد (will have been)' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'المدة الزمنية التراكمية' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'negative') {
        fullSentence = `${subText} won't have been ${verbUsed} ${objEn} ${timeEn}.`;
        translationAr = `لن يكون ${subAr} قد استمر في ${verb.meaningAr} ${objAr} ${timeAr}.`;
        ruleExplanationAr = `في النفي: نستخدم (won't have been) متبوعة بالفعل المنتهي بـ (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            subject: { text: subText, roleAr: 'الفاعل' },
            auxiliary: { text: "won't have been", roleAr: 'الفعل المساعد المنفي' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'المدة الزمنية التراكمية' }
          },
          ruleExplanationAr
        };
      } else if (formMode === 'yes_no') {
        const qSub = subText.toLowerCase() === 'i' ? 'you' : subText;
        fullSentence = `Will ${qSub} have been ${verbUsed} ${objEn} ${timeEn}?`;
        translationAr = `هل سيكون ${isI ? 'أنت' : subAr} قد استمر في ${verb.meaningAr} ${objAr} ${timeAr}؟`;
        ruleExplanationAr = `في السؤال: نبدأ بـ (Will) + الفاعل + have been + الفعل بـ (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            auxiliary: { text: 'Will ... have been', roleAr: 'الفعل المساعد' },
            subject: { text: qSub, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'المدة الزمنية التراكمية' }
          },
          ruleExplanationAr
        };
      } else {
        const qSub = subText.toLowerCase() === 'i' ? 'you' : subText;
        fullSentence = `How long will ${qSub} have been ${verbUsed} ${objEn}?`;
        translationAr = `كم المدة التي سيكون ${isI ? 'أنت' : subAr} قد قضاها في ${verb.meaningAr} ${objAr}؟`;
        ruleExplanationAr = `سؤال How long: (How long will) + الفاعل + have been + الفعل بـ (-ing).`;
        return {
          fullSentence,
          translationAr,
          components: {
            whWord: { text: 'How long', roleAr: 'أداة الاستفهام' },
            auxiliary: { text: 'will ... have been', roleAr: 'الفعل المساعد' },
            subject: { text: qSub, roleAr: 'الفاعل' },
            verb: { text: verbUsed, roleAr: 'الفعل المستمر', formNameAr: 'Verb + ing' },
            complement: { text: objEn, roleAr: 'المفعول / التكملة' },
            time: { text: timeEn, roleAr: 'المدة الزمنية' }
          },
          ruleExplanationAr
        };
      }
    }

    default: {
      fullSentence = `${subText} ${verb.base} ${objEn} ${timeEn}.`;
      translationAr = `${subAr} ${verb.meaningAr} ${objAr} ${timeAr}.`;
      return {
        fullSentence,
        translationAr,
        components: {
          subject: { text: subText, roleAr: 'الفاعل' },
          verb: { text: verb.base, roleAr: 'الفعل', formNameAr: 'Base' },
          complement: { text: objEn, roleAr: 'المفعول' },
          time: { text: timeEn, roleAr: 'الظرف' }
        },
        ruleExplanationAr: 'تركيب الجملة القياسي SVO.'
      };
    }
  }
}

/**
 * Public Master SVO Sentence Builder
 * Combines English syntactic construction with 100% accurate Arabic verbal conjugation.
 */
export function buildSvoSentence(params: {
  tenseId: string;
  subject: SubjectItem;
  verb: {
    base: string;
    meaningAr: string;
    v2?: string;
    v3?: string;
    ving?: string;
  };
  complement: SemanticComplement;
  timeMarker: TimeItem;
  formMode: SentenceFormMode;
  whWord?: string;
}): BuiltSentenceResult {
  const wh = params.whWord || (params.verb.base === 'drive' || params.verb.base === 'travel' || params.verb.base === 'fly' ? 'Where' : 'Why');
  
  // Construct English AST & components
  const baseResult = rawBuildSvoSentence(params);

  // Generate 100% natural, grammatically correct Arabic translation
  const naturalArabicTranslation = renderArabicSentence({
    tenseId: params.tenseId,
    formMode: params.formMode,
    subjectText: params.subject.text,
    verbBase: params.verb.base,
    verbMeaningAr: params.verb.meaningAr,
    complementAr: params.complement.ar,
    timeAr: params.timeMarker.ar,
    whWord: wh
  });

  return {
    ...baseResult,
    translationAr: naturalArabicTranslation
  };
}

