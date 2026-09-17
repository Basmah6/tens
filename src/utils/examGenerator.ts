import { TenseData } from '../types';
import { shuffleArray } from './quizUtils';

export interface UnitExamMCQ {
  id: string;
  type: 'mcq';
  questionEn: string;
  questionAr: string;
  options: string[];
  correctIndex: number;
  explanationAr: string;
  category: 'usage' | 'structure' | 'conjugation' | 'mistake' | 'time_marker';
}

export interface UnitExamReorder {
  id: string;
  type: 'reorder';
  instructionAr: string;
  targetSentenceEn: string;
  scrambledWords: string[];
  translationAr: string;
  formType: 'affirmative' | 'negative' | 'question';
  explanationAr: string;
}

export interface UnitExamFreeWrite {
  id: string;
  type: 'free_write';
  requiredForm: 'affirmative' | 'negative' | 'question';
  requiredFormAr: string;
  promptAr: string;
  suggestedStarter?: string;
  guidelinesAr: string;
  exampleTargetEn: string;
  exampleTargetAr: string;
}

export interface ComprehensiveUnitExam {
  tenseId: string;
  tenseNameEn: string;
  tenseNameAr: string;
  passingScorePercent: number;
  mcqQuestions: UnitExamMCQ[];        // 5 questions
  reorderQuestions: UnitExamReorder[]; // 5 questions
  freeWritePrompts: UnitExamFreeWrite[]; // 10 prompts: 5 affirmative, 3 negative, 2 questions
}

export function generateUnitExam(tense: TenseData): ComprehensiveUnitExam {
  const tid = tense.id;

  // 1. Generate 5 MCQ questions tailored to the tense with fully randomized option order
  const rawMCQQuestions: UnitExamMCQ[] = getTenseMCQs(tense);
  const mcqQuestions: UnitExamMCQ[] = rawMCQQuestions.map((q) => {
    const correctOption = q.options[q.correctIndex] ?? q.options[0];
    const shuffled = shuffleArray(q.options);
    const newCorrectIndex = shuffled.indexOf(correctOption);
    return {
      ...q,
      options: shuffled,
      correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
    };
  });

  // 2. Generate 5 Word Reordering questions
  const reorderQuestions: UnitExamReorder[] = getTenseReorders(tense);

  // 3. Generate 7 Free-Writing prompts: 3 Affirmative, 3 Negative, 1 Question
  const freeWritePrompts: UnitExamFreeWrite[] = getTenseFreeWrites(tense);

  return {
    tenseId: tense.id,
    tenseNameEn: tense.nameEn,
    tenseNameAr: tense.nameAr,
    passingScorePercent: 75,
    mcqQuestions,
    reorderQuestions,
    freeWritePrompts
  };
}

// -------------------------------------------------------------
// Helper Generators for All 12 Tenses
// -------------------------------------------------------------

function getTenseMCQs(tense: TenseData): UnitExamMCQ[] {
  const tid = tense.id;
  
  if (tid === 'present_simple') {
    return [
      {
        id: 'ps_mcq_1',
        type: 'mcq',
        questionEn: 'My sister ______ two cups of warm tea every morning.',
        questionAr: 'اختر تصريف الفعل الصحيح مع الفاعل المفرد الغائب (My sister):',
        options: ['drink', 'drinks', 'is drink', 'drinking'],
        correctIndex: 1,
        explanationAr: 'الفاعل (My sister) مفرد غائب (She)، لذلك نضيف (s) للفعل في المضارع البسيط ليصبح (drinks). استخدام (drinking) بدون فعل مساعد خطأ تماماً.',
        category: 'conjugation'
      },
      {
        id: 'ps_mcq_2',
        type: 'mcq',
        questionEn: 'Omar and Khaled ______ fast food on weekdays.',
        questionAr: 'اختر أداة النفي الصحيحة مع الفاعل الجمع في المضارع البسيط:',
        options: ["doesn't eat", "don't eat", "not eat", "aren't eat"],
        correctIndex: 1,
        explanationAr: 'الفاعل جمع (Omar and Khaled = They)، لذا نستخدم أداة النفي (don\'t) متبوعة بالمصدر (eat).',
        category: 'structure'
      },
      {
        id: 'ps_mcq_3',
        type: 'mcq',
        questionEn: 'Which sentence correctly describes a permanent scientific fact?',
        questionAr: 'أي جملة تصف حقيقة علمية عامة وثابتة في المضارع البسيط؟',
        options: [
          'Water boils at 100°C.',
          'Water is boiling at 100°C.',
          'Water boiled at 100°C.',
          'Water will boil at 100°C.'
        ],
        correctIndex: 0,
        explanationAr: 'الحقائق العلمية والكونية الثابتة تأخذ دائماً زمن المضارع البسيط (Water boils).',
        category: 'usage'
      },
      {
        id: 'ps_mcq_4',
        type: 'mcq',
        questionEn: '______ your brother live in Dubai?',
        questionAr: 'اختر الفعل المساعد المناسب لبدء السؤال مع الفاعل المفرد (your brother):',
        options: ['Do', 'Does', 'Is', 'Are'],
        correctIndex: 1,
        explanationAr: 'الفاعل (your brother) مفرد (He)، والسؤال في المضارع البسيط يبدأ بـ (Does) متبوعاً بالمصدر (live).',
        category: 'structure'
      },
      {
        id: 'ps_mcq_5',
        type: 'mcq',
        questionEn: 'Identify the grammatically correct sentence with a frequency adverb:',
        questionAr: 'اختر الجملة التي تضع ظرف التكرار (always) في موقعه الصحيح:',
        options: [
          'He always goes to the gym on Mondays.',
          'He goes always to the gym on Mondays.',
          'He goes to the gym always on Mondays.',
          'Always he goes to the gym on Mondays.'
        ],
        correctIndex: 0,
        explanationAr: 'ظروف التكرار (always, usually, often) تسبق الفعل الأساسي مباشرة (He always goes).',
        category: 'time_marker'
      }
    ];
  }

  if (tid === 'present_continuous') {
    return [
      {
        id: 'pc_mcq_1',
        type: 'mcq',
        questionEn: 'Look! The children ______ in the garden right now.',
        questionAr: 'اختر الصيغة الصحيحة للمضارع المستمر مع الجمع (The children):',
        options: ['play', 'plays', 'are playing', 'is playing'],
        correctIndex: 2,
        explanationAr: 'الفاعل جمع (The children) والحدث يحدث الآن (right now / Look!)، لذا نستخدم (are + V-ing).',
        category: 'structure'
      },
      {
        id: 'pc_mcq_2',
        type: 'mcq',
        questionEn: 'She ______ for her final exams at the moment.',
        questionAr: 'اختر صيغة النفي الصحيحة في المضارع المستمر:',
        options: ["isn't studying", "doesn't study", "not studying", "isn't study"],
        correctIndex: 0,
        explanationAr: 'النفي في المضارع المستمر يتكون من (is + not + V-ing) ليصبح (isn\'t studying).',
        category: 'structure'
      },
      {
        id: 'pc_mcq_3',
        type: 'mcq',
        questionEn: 'Why ______ that heavy jacket today?',
        questionAr: 'اختر الترتيب الصحيح للسؤال في المضارع المستمر:',
        options: ['are you wearing', 'you are wearing', 'do you wear', 'you wear'],
        correctIndex: 0,
        explanationAr: 'في السؤال نضع الفعل المساعد قبل الفاعل: (Wh-word + are + Subject + V-ing).',
        category: 'structure'
      },
      {
        id: 'pc_mcq_4',
        type: 'mcq',
        questionEn: 'Which of the following stative verbs is normally NOT used in the continuous form?',
        questionAr: 'أي من أفعال الشعور والحالة التالية لا يُستخدم عادة في صيغة الاستمرار؟',
        options: ['understand', 'run', 'cook', 'drive'],
        correctIndex: 0,
        explanationAr: 'الفعل (understand) من أفعال الإدراك والحالة (Stative Verbs) التي لا تقبل صيغة الاستمرار -ing في الإنجليزية المعيارية.',
        category: 'usage'
      },
      {
        id: 'pc_mcq_5',
        type: 'mcq',
        questionEn: 'Listen! Somebody ______ at the door.',
        questionAr: 'اختر التعبير المناسب مع كلمة التنبيه (Listen!):',
        options: ['is knocking', 'knocks', 'knocked', 'are knocking'],
        correctIndex: 0,
        explanationAr: 'كلمة التنبيه (Listen!) تدل على حدث يقع في لحظة الكلام، و(Somebody) مفرد تأخذ (is knocking).',
        category: 'time_marker'
      }
    ];
  }

  if (tid === 'past_simple') {
    return [
      {
        id: 'past_mcq_1',
        type: 'mcq',
        questionEn: 'Sarah ______ a brand new car two days ago.',
        questionAr: 'اختر التصريف الثاني (V2) الشاذ للفعل (buy):',
        options: ['buyed', 'bought', 'buys', 'was buying'],
        correctIndex: 1,
        explanationAr: 'الفعل (buy) فعل شاذ وتصريفه الثاني في الماضي البسيط هو (bought).',
        category: 'conjugation'
      },
      {
        id: 'past_mcq_2',
        type: 'mcq',
        questionEn: 'They ______ to the museum yesterday.',
        questionAr: 'اختر صيغة النفي الصحيحة في الماضي البسيط:',
        options: ["didn't go", "didn't went", "weren't go", "don't go"],
        correctIndex: 0,
        explanationAr: 'عند استخدام (didn\'t) في النفي، يعود الفعل الأساسي للمصدر المجرد (go) وليس (went).',
        category: 'structure'
      },
      {
        id: 'past_mcq_3',
        type: 'mcq',
        questionEn: '______ you finish your project last night?',
        questionAr: 'اختر الفعل المساعد المناسب لسؤال الماضي البسيط:',
        options: ['Did', 'Do', 'Were', 'Have'],
        correctIndex: 0,
        explanationAr: 'يبدأ السؤال في الماضي البسيط بالفعل المساعد (Did) لجميع الضمائر مع الفعل المجرد (finish).',
        category: 'structure'
      },
      {
        id: 'past_mcq_4',
        type: 'mcq',
        questionEn: 'Which sentence correctly describes a finished action at a specific past time?',
        questionAr: 'أي جملة تعبر عن حدث انتهى في وقت محدد في الماضي؟',
        options: [
          'I graduated from university in 2021.',
          'I graduate from university.',
          'I am graduating from university.',
          'I will graduate in 2021.'
        ],
        correctIndex: 0,
        explanationAr: 'الماضي البسيط يصف حدثاً منتهياً في وقت ماضٍ محدد (in 2021) باستخدام V2 (graduated).',
        category: 'usage'
      },
      {
        id: 'past_mcq_5',
        type: 'mcq',
        questionEn: 'Where ______ you live when you were a child?',
        questionAr: 'اختر التركيب الصحيح لسؤال Wh- في الماضي البسيط:',
        options: ['did', 'do', 'were', 'have'],
        correctIndex: 0,
        explanationAr: 'صيغة السؤال: (Where + did + you + live).',
        category: 'structure'
      }
    ];
  }

  // Fallback dynamic generator for any other tenses (future, perfect, etc.)
  return [
    {
      id: `${tid}_mcq_1`,
      type: 'mcq',
      questionEn: `Which sentence is in the correct affirmative form for (${tense.nameEn})?`,
      questionAr: `أي جملة تمثل الإثبات الصحيح لزمن (${tense.nameAr})؟`,
      options: [
        tense.usageLesson.useCases[0]?.examples[0]?.sentence || `${tense.shortFormula}`,
        'Incorrect verb formulation without proper auxiliary',
        'Misplaced time marker and wrong tense form',
        'Incompatible subject and tense markers'
      ],
      correctIndex: 0,
      explanationAr: `الصيغة الصحيحة لزمن ${tense.nameAr} تعتمد على التركيب: ${tense.shortFormula}.`,
      category: 'structure'
    },
    {
      id: `${tid}_mcq_2`,
      type: 'mcq',
      questionEn: `What is the primary auxiliary verb used in (${tense.nameEn})?`,
      questionAr: `ما هو الفعل المساعد الأساسي المستخدم في زمن (${tense.nameAr})؟`,
      options: [
        tense.svoLesson.auxiliaryRulesAr.slice(0, 40) || 'Auxiliary Verb',
        'No auxiliary needed in all forms',
        'Arbitrary modal verb',
        'Incorrect form'
      ],
      correctIndex: 0,
      explanationAr: tense.svoLesson.auxiliaryRulesAr,
      category: 'conjugation'
    },
    {
      id: `${tid}_mcq_3`,
      type: 'mcq',
      questionEn: `Which keyword is most commonly used with (${tense.nameEn})?`,
      questionAr: `أي من الكلمات الدالة التالية ترتبط مباشرة بزمن (${tense.nameAr})؟`,
      options: [
        tense.usageLesson.keywords[0]?.word || 'Time Marker',
        'yesterday (if future)',
        'tomorrow (if past)',
        'at that ancient moment'
      ],
      correctIndex: 0,
      explanationAr: `الكلمة الدالة (${tense.usageLesson.keywords[0]?.word}) تدل بوضوح على هذا الزمن وسياقه.`,
      category: 'time_marker'
    },
    {
      id: `${tid}_mcq_4`,
      type: 'mcq',
      questionEn: `Which use-case corresponds correctly to (${tense.nameEn})?`,
      questionAr: `ما هو الاستخدام الرئيسي لزمن (${tense.nameAr}) وفق الشرح؟`,
      options: [
        tense.usageLesson.useCases[0]?.titleAr || tense.summaryAr,
        'استخدام عشوائي غير مرتبط بالزمن',
        'حدث في زمن مختلف كلياً',
        'لا يوجد سياق زمني محدد'
      ],
      correctIndex: 0,
      explanationAr: tense.usageLesson.overviewAr,
      category: 'usage'
    },
    {
      id: `${tid}_mcq_5`,
      type: 'mcq',
      questionEn: `Identify the common error to avoid in (${tense.nameEn}):`,
      questionAr: `ما هو الخطأ الشائع الذي يجب تجنبه في زمن (${tense.nameAr})؟`,
      options: [
        tense.mistakesLesson.mistakes[0]?.reasonAr.slice(0, 70) || 'تجنب خلط الأفعال المساعدة',
        'استخدام الفاعل في بداية الجملة',
        'إضافة نقطة في نهاية الجملة',
        'استخدام الكلمات الدالة الصحيحة'
      ],
      correctIndex: 0,
      explanationAr: tense.mistakesLesson.mistakes[0]?.goldenRuleAr || 'انتبه لتوافق الفاعل مع الفعل وتصريفه السليم.',
      category: 'mistake'
    }
  ];
}

function getTenseReorders(tense: TenseData): UnitExamReorder[] {
  const tid = tense.id;

  if (tid === 'present_simple') {
    return [
      {
        id: 'ps_ro_1',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين جملة إثبات صحيحة:',
        targetSentenceEn: 'Sarah speaks English fluently every day.',
        scrambledWords: ['fluently', 'Sarah', 'English', 'every day.', 'speaks'],
        translationAr: 'سارة تتحدث الإنجليزية بطلاقة كل يوم.',
        formType: 'affirmative',
        explanationAr: 'الترتيب: الفاعل (Sarah) + الفعل مع s (speaks) + المفعول به (English) + الحال (fluently) + الوقت (every day).'
      },
      {
        id: 'ps_ro_2',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين جملة نفي صحيحة:',
        targetSentenceEn: 'They do not drink coffee at night.',
        scrambledWords: ['at night.', 'do not', 'coffee', 'They', 'drink'],
        translationAr: 'هم لا يشربون القهوة في الليل.',
        formType: 'negative',
        explanationAr: 'الترتيب: الفاعل (They) + أداة النفي (do not) + الفعل المجرد (drink) + المفعول به (coffee) + الوقت (at night).'
      },
      {
        id: 'ps_ro_3',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين جملة إثبات بظرف تكرار:',
        targetSentenceEn: 'He always arrives at the office early.',
        scrambledWords: ['early.', 'always', 'the office', 'He', 'arrives at'],
        translationAr: 'هو دائماً يصل إلى المكتب مبكراً.',
        formType: 'affirmative',
        explanationAr: 'ظرف التكرار (always) يوضع مباشرة بين الفاعل (He) والفعل (arrives).'
      },
      {
        id: 'ps_ro_4',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين سؤال Yes/No صحيح:',
        targetSentenceEn: 'Does your father drive a red car?',
        scrambledWords: ['a red car?', 'Does', 'drive', 'your father'],
        translationAr: 'هل يقود والدك سيارة حمراء؟',
        formType: 'question',
        explanationAr: 'ترتيب السؤال: الفعل المساعد (Does) + الفاعل (your father) + المصدر (drive) + المفعول به (a red car).'
      },
      {
        id: 'ps_ro_5',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين سؤال Wh- استفهامي:',
        targetSentenceEn: 'Where do the engineers work every morning?',
        scrambledWords: ['the engineers', 'Where', 'every morning?', 'work', 'do'],
        translationAr: 'أين يعمل المهندسون كل صباح؟',
        formType: 'question',
        explanationAr: 'ترتيب سؤال Wh: الأداة (Where) + المساعد (do) + الفاعل (the engineers) + المصدر (work) + الوقت (every morning).'
      }
    ];
  }

  if (tid === 'present_continuous') {
    return [
      {
        id: 'pc_ro_1',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين جملة إثبات في المضارع المستمر:',
        targetSentenceEn: 'I am reading an interesting book right now.',
        scrambledWords: ['right now.', 'am reading', 'an interesting book', 'I'],
        translationAr: 'أنا أقرأ كتاباً ممتعاً في هذه اللحظة.',
        formType: 'affirmative',
        explanationAr: 'الترتيب: الفاعل (I) + المساعد (am) + الفعل المنتهي بـ ing (reading) + المفعول به + الوقت.'
      },
      {
        id: 'pc_ro_2',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين جملة نفي في المضارع المستمر:',
        targetSentenceEn: 'She is not watching television at the moment.',
        scrambledWords: ['watching', 'is not', 'at the moment.', 'She', 'television'],
        translationAr: 'هي لا تشاهد التلفاز في هذه اللحظة.',
        formType: 'negative',
        explanationAr: 'الترتيب: الفاعل (She) + المساعد المنفي (is not) + الفعل المنتهي بـ ing (watching) + المفعول به.'
      },
      {
        id: 'pc_ro_3',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين جملة إثبات للجمع:',
        targetSentenceEn: 'We are preparing a delicious dinner together.',
        scrambledWords: ['together.', 'a delicious dinner', 'We', 'are preparing'],
        translationAr: 'نحن نجهز عشاءً لذيذاً معاً.',
        formType: 'affirmative',
        explanationAr: 'الترتيب: الفاعل (We) + المساعد (are) + الفعل (preparing) + المفعول به.'
      },
      {
        id: 'pc_ro_4',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين سؤال Yes/No مستمر:',
        targetSentenceEn: 'Are they playing football in the garden?',
        scrambledWords: ['playing', 'in the garden?', 'Are', 'they', 'football'],
        translationAr: 'هل يلعبون كرة القدم في الحديقة؟',
        formType: 'question',
        explanationAr: 'ترتيب السؤال: المساعد (Are) + الفاعل (they) + الفعل بـ ing (playing) + المفعول به + المكان.'
      },
      {
        id: 'pc_ro_5',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين سؤال استفهامي (Wh-):',
        targetSentenceEn: 'Why is the baby crying so loudly now?',
        scrambledWords: ['so loudly now?', 'Why', 'the baby', 'is', 'crying'],
        translationAr: 'لماذا يبكي الطفل بصوت عالٍ الآن؟',
        formType: 'question',
        explanationAr: 'الترتيب: أداة الاستفهام (Why) + المساعد (is) + الفاعل (the baby) + الفعل بـ ing (crying).'
      }
    ];
  }

  if (tid === 'past_simple') {
    return [
      {
        id: 'past_ro_1',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين جملة إثبات ماضية بفعل منتظم:',
        targetSentenceEn: 'We visited our grandparents last weekend.',
        scrambledWords: ['last weekend.', 'visited', 'We', 'our grandparents'],
        translationAr: 'لقد زرنا أجدادنا في عطلة نهاية الأسبوع الماضي.',
        formType: 'affirmative',
        explanationAr: 'الترتيب: الفاعل (We) + الفعل الماضي (visited) + المفعول به + الوقت (last weekend).'
      },
      {
        id: 'past_ro_2',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين جملة نفي في الماضي البسيط:',
        targetSentenceEn: 'He did not attend the meeting yesterday.',
        scrambledWords: ['attend', 'He', 'yesterday.', 'did not', 'the meeting'],
        translationAr: 'هو لم يحضر الاجتماع بالأمس.',
        formType: 'negative',
        explanationAr: 'الترتيب: الفاعل (He) + المساعد المنفي (did not) + المصدر المجرد (attend) + المفعول به + (yesterday).'
      },
      {
        id: 'past_ro_3',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين جملة بفعل شاذ في الماضي:',
        targetSentenceEn: 'They bought a modern laptop two days ago.',
        scrambledWords: ['two days ago.', 'bought', 'They', 'a modern laptop'],
        translationAr: 'هم اشتروا حاسوباً محمولاً حديثاً منذ يومين.',
        formType: 'affirmative',
        explanationAr: 'الترتيب: الفاعل (They) + التصريف الثاني الشاذ (bought) + المفعول به + الوقت.'
      },
      {
        id: 'past_ro_4',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين سؤال Yes/No في الماضي:',
        targetSentenceEn: 'Did you finish your homework last night?',
        scrambledWords: ['your homework', 'Did', 'last night?', 'finish', 'you'],
        translationAr: 'هل أنهيت واجبك المنزلي الليلة الماضية؟',
        formType: 'question',
        explanationAr: 'ترتيب السؤال: المساعد (Did) + الفاعل (you) + المصدر (finish) + المفعول به + الوقت.'
      },
      {
        id: 'past_ro_5',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين سؤال Wh- في الماضي:',
        targetSentenceEn: 'Where did they travel last summer?',
        scrambledWords: ['travel', 'Where', 'last summer?', 'they', 'did'],
        translationAr: 'أين سافروا الصيف الماضي؟',
        formType: 'question',
        explanationAr: 'ترتيب سؤال Wh: الأداة (Where) + المساعد (did) + الفاعل (they) + المصدر (travel) + الوقت.'
      }
    ];
  }

  if (tid === 'future_simple') {
    return [
      {
        id: 'future_ro_1',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين جملة إثبات في المستقبل البسيط:',
        targetSentenceEn: 'Sarah will travel to London next month.',
        scrambledWords: ['travel to', 'Sarah', 'next month.', 'will', 'London'],
        translationAr: 'سارة ستسافر إلى لندن الشهر القادم.',
        formType: 'affirmative',
        explanationAr: 'الترتيب: الفاعل (Sarah) + المساعد (will) + المصدر (travel to) + المفعول به (London) + الوقت (next month).'
      },
      {
        id: 'future_ro_2',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين جملة نفي في المستقبل البسيط:',
        targetSentenceEn: 'They will not attend the meeting tomorrow.',
        scrambledWords: ['attend', 'They', 'the meeting', 'tomorrow.', 'will not'],
        translationAr: 'هم لن يحضروا الاجتماع غداً.',
        formType: 'negative',
        explanationAr: 'الترتيب: الفاعل (They) + النفي (will not) + المصدر (attend) + المفعول به (the meeting) + الوقت (tomorrow).'
      },
      {
        id: 'future_ro_3',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين قرار مستقبلي بضمير المتكلم (I):',
        targetSentenceEn: 'I will help you with your project tonight.',
        scrambledWords: ['with your project', 'I', 'help you', 'tonight.', 'will'],
        translationAr: 'أنا سأساعدك في مشروعك الليلة.',
        formType: 'affirmative',
        explanationAr: 'الترتيب: الفاعل (I) + المساعد (will) + الفعل والمفعول (help you) + الجار والمجرور (with your project) + الوقت (tonight).'
      },
      {
        id: 'future_ro_4',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين سؤال Yes/No في المستقبل:',
        targetSentenceEn: 'Will you join us for dinner tomorrow?',
        scrambledWords: ['for dinner', 'Will', 'join us', 'tomorrow?', 'you'],
        translationAr: 'هل ستنضم إلينا لتناول العشاء غداً؟',
        formType: 'question',
        explanationAr: 'ترتيب السؤال: المساعد (Will) + الفاعل (you) + المصدر (join us) + الغرض (for dinner) + الوقت (tomorrow).'
      },
      {
        id: 'future_ro_5',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين سؤال Wh- في المستقبل:',
        targetSentenceEn: 'Where will they stay in Dubai next week?',
        scrambledWords: ['in Dubai', 'Where', 'they', 'next week?', 'will', 'stay'],
        translationAr: 'أين سيقيمون في دبي الأسبوع القادم؟',
        formType: 'question',
        explanationAr: 'ترتيب سؤال Wh: الأداة (Where) + المساعد (will) + الفاعل (they) + المصدر (stay) + المكان (in Dubai) + الوقت (next week).'
      }
    ];
  }

  if (tid === 'present_perfect') {
    return [
      {
        id: 'pp_ro_1',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين جملة إثبات في المضارع التام:',
        targetSentenceEn: 'I have already finished my homework.',
        scrambledWords: ['already', 'have', 'my homework.', 'I', 'finished'],
        translationAr: 'لقد أنهيت واجبي المنزلي بالفعل.',
        formType: 'affirmative',
        explanationAr: 'الترتيب: الفاعل (I) + المساعد (have) + الظرف (already) + التصريف الثالث (finished) + المفعول به.'
      },
      {
        id: 'pp_ro_2',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين جملة نفي في المضارع التام:',
        targetSentenceEn: 'He has not received the package yet.',
        scrambledWords: ['not', 'He', 'yet.', 'the package', 'has', 'received'],
        translationAr: 'هو لم يستلم الطرد حتى الآن.',
        formType: 'negative',
        explanationAr: 'الترتيب: الفاعل (He) + (has not) + التصريف الثالث (received) + المفعول به + (yet).'
      },
      {
        id: 'pp_ro_3',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين جملة إثبات بتجربة سابقة:',
        targetSentenceEn: 'She has visited three different countries.',
        scrambledWords: ['visited', 'She', 'three different countries.', 'has'],
        translationAr: 'هي زارت ثلاث دول مختلفة.',
        formType: 'affirmative',
        explanationAr: 'الترتيب: الفاعل (She) + المساعد (has) + التصريف الثالث (visited) + المفعول به.'
      },
      {
        id: 'pp_ro_4',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين سؤال Yes/No في المضارع التام:',
        targetSentenceEn: 'Have you ever eaten Japanese food?',
        scrambledWords: ['eaten', 'Have', 'Japanese food?', 'ever', 'you'],
        translationAr: 'هل سبق لك أن أكلت طعاماً يابانياً؟',
        formType: 'question',
        explanationAr: 'ترتيب السؤال: (Have) + الفاعل (you) + (ever) + التصريف الثالث (eaten) + المفعول به.'
      },
      {
        id: 'pp_ro_5',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين سؤال مدة (How long):',
        targetSentenceEn: 'How long have they lived in this city?',
        scrambledWords: ['have', 'How long', 'in this city?', 'lived', 'they'],
        translationAr: 'منذ متى وهم يعيشون في هذه المدينة؟',
        formType: 'question',
        explanationAr: 'الترتيب: (How long) + (have) + الفاعل (they) + التصريف الثالث (lived) + حرف الجر والمكان.'
      }
    ];
  }

  if (tid === 'past_continuous') {
    return [
      {
        id: 'pcont_ro_1',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين جملة ماضٍ مستمر:',
        targetSentenceEn: 'I was studying when the phone rang.',
        scrambledWords: ['when the phone rang.', 'was studying', 'I'],
        translationAr: 'كنت أدرس عندما رن الهاتف.',
        formType: 'affirmative',
        explanationAr: 'الترتيب: الفاعل (I) + (was studying) + جملة الحدث القاطع (when the phone rang).'
      },
      {
        id: 'pcont_ro_2',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين جملة نفي في الماضي المستمر:',
        targetSentenceEn: 'They were not sleeping at midnight.',
        scrambledWords: ['at midnight.', 'were not', 'They', 'sleeping'],
        translationAr: 'هم لم يكونوا نائمين عند منتصف الليل.',
        formType: 'negative',
        explanationAr: 'الترتيب: الفاعل (They) + النفي (were not) + الفعل بـ ing (sleeping) + الوقت المحدد.'
      },
      {
        id: 'pcont_ro_3',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين حدثين متزامنين بـ While:',
        targetSentenceEn: 'While mom was cooking dad was reading.',
        scrambledWords: ['dad was reading.', 'While mom', 'was cooking'],
        translationAr: 'بينما كانت أمي تطبخ كان أبي يقرأ.',
        formType: 'affirmative',
        explanationAr: 'الترتيب: (While mom was cooking) + الحدث المتوازي (dad was reading).'
      },
      {
        id: 'pcont_ro_4',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين سؤال Yes/No في الماضي المستمر:',
        targetSentenceEn: 'Were you working on your report yesterday afternoon?',
        scrambledWords: ['working on', 'Were', 'yesterday afternoon?', 'you', 'your report'],
        translationAr: 'هل كنت تعمل على تقريرك بعد ظهر الأمس؟',
        formType: 'question',
        explanationAr: 'ترتيب السؤال: (Were) + الفاعل (you) + (working on) + المفعول به + الوقت.'
      },
      {
        id: 'pcont_ro_5',
        type: 'reorder',
        instructionAr: 'رتّب الكلمات لتكوين سؤال استفهامي:',
        targetSentenceEn: 'What was she doing at eight o clock?',
        scrambledWords: ['doing', 'What', 'at eight o clock?', 'was', 'she'],
        translationAr: 'ماذا كانت تفعل عند الساعة الثامنة تماماً؟',
        formType: 'question',
        explanationAr: 'الترتيب: أداة الاستفهام (What) + (was) + الفاعل (she) + (doing) + الوقت.'
      }
    ];
  }

  // Generic fallback for other tenses
  return [
    {
      id: `${tid}_ro_1`,
      type: 'reorder',
      instructionAr: `رتّب الكلمات لتكوين جملة إثبات في (${tense.nameAr}):`,
      targetSentenceEn: tense.usageLesson.useCases[0]?.examples[0]?.sentence || 'I learn English every day.',
      scrambledWords: (tense.usageLesson.useCases[0]?.examples[0]?.sentence || 'I learn English every day.').split(' ').sort(() => 0.5 - Math.random()),
      translationAr: tense.usageLesson.useCases[0]?.examples[0]?.translationAr || 'أنا أتعلم الإنجليزية كل يوم.',
      formType: 'affirmative',
      explanationAr: `الترتيب الصحيح يعتمد على هيكل ${tense.shortFormula}.`
    },
    {
      id: `${tid}_ro_2`,
      type: 'reorder',
      instructionAr: `رتّب الكلمات لتكوين جملة نفي في (${tense.nameAr}):`,
      targetSentenceEn: tense.usageLesson.useCases[0]?.examples[1]?.sentence || 'They do not forget their goals.',
      scrambledWords: (tense.usageLesson.useCases[0]?.examples[1]?.sentence || 'They do not forget their goals.').split(' ').sort(() => 0.5 - Math.random()),
      translationAr: tense.usageLesson.useCases[0]?.examples[1]?.translationAr || 'هم لا ينسون أهدافهم.',
      formType: 'negative',
      explanationAr: `استخدم أداة النفي المناسبة مع الفعل المساعد الخاص بالزمن.`
    },
    {
      id: `${tid}_ro_3`,
      type: 'reorder',
      instructionAr: `رتّب الكلمات لتكوين جملة إثبات ثانية:`,
      targetSentenceEn: tense.usageLesson.useCases[1]?.examples[0]?.sentence || 'She works diligently on her project.',
      scrambledWords: (tense.usageLesson.useCases[1]?.examples[0]?.sentence || 'She works diligently on her project.').split(' ').sort(() => 0.5 - Math.random()),
      translationAr: tense.usageLesson.useCases[1]?.examples[0]?.translationAr || 'هي تعمل باجتهاد على مشروعها.',
      formType: 'affirmative',
      explanationAr: `توافق الفاعل مع الفعل وتصريفه الصحيح.`
    },
    {
      id: `${tid}_ro_4`,
      type: 'reorder',
      instructionAr: `رتّب الكلمات لتكوين سؤال في (${tense.nameAr}):`,
      targetSentenceEn: 'Do you study hard every day?',
      scrambledWords: ['every day?', 'Do', 'hard', 'study', 'you'],
      translationAr: 'هل تدرس بجد كل يوم؟',
      formType: 'question',
      explanationAr: `يبدأ السؤال بالفعل المساعد الخاص بالزمن ثم الفاعل ثم الفعل.`
    },
    {
      id: `${tid}_ro_5`,
      type: 'reorder',
      instructionAr: `رتّب الكلمات لتكوين جملة متكاملة:`,
      targetSentenceEn: 'We practice speaking English with confidence.',
      scrambledWords: ['with confidence.', 'practice', 'English', 'We', 'speaking'],
      translationAr: 'نحن نتمرن على تحدث الإنجليزية بثقة.',
      formType: 'affirmative',
      explanationAr: `ترتيب SVO المتناسق للأركان الأساسية للجملة.`
    }
  ];
}

function getTenseFreeWrites(tense: TenseData): UnitExamFreeWrite[] {
  const tid = tense.id;

  if (tid === 'present_simple') {
    return [
      // 5 Affirmative Prompts
      {
        id: 'ps_fw_aff_1',
        type: 'free_write',
        requiredForm: 'affirmative',
        requiredFormAr: 'إثبات 1 (ضمير المتكلم I)',
        promptAr: 'اكتب جملة إثبات عن روتينك الصباحي اليومي مستخدماً ضمير المتكلم (I).',
        suggestedStarter: 'I drink...',
        guidelinesAr: 'استخدم فعلاً في المصدر بدون ing (مثل: drink, eat, read, wake up) مع كلمة دالة (every morning / every day).',
        exampleTargetEn: 'I drink a cup of coffee every morning.',
        exampleTargetAr: 'أنا أشرب كوباً من القهوة كل صباح.'
      },
      {
        id: 'ps_fw_aff_2',
        type: 'free_write',
        requiredForm: 'affirmative',
        requiredFormAr: 'إثبات 2 (فاعل مفرد غائب He/She)',
        promptAr: 'اكتب جملة إثبات عن وظيفة أو عادة لشخص مفرد غائب (He / She / My brother).',
        suggestedStarter: 'My brother works...',
        guidelinesAr: 'تذكر قاعدة المفرد الغائب: أضف (s/es) لنهاية الفعل (مثل: works, teaches, drives, plays).',
        exampleTargetEn: 'My brother works at an international company.',
        exampleTargetAr: 'أخي يعمل في شركة دولية.'
      },
      {
        id: 'ps_fw_aff_3',
        type: 'free_write',
        requiredForm: 'affirmative',
        requiredFormAr: 'إثبات 3 (حقيقة علمية أو عامة)',
        promptAr: 'اكتب جملة إثبات تصف حقيقة علمية أو عامة ثابتة (مثال: عن الماء، الشمس، أو الأرض).',
        suggestedStarter: 'The sun rises...',
        guidelinesAr: 'الحقائق الثابتة تصاغ في المضارع البسيط المباشر بدون أفعال مساعدة إضافية.',
        exampleTargetEn: 'The sun rises in the east every day.',
        exampleTargetAr: 'تشرق الشمس من الشرق كل يوم.'
      },
      {
        id: 'ps_fw_aff_4',
        type: 'free_write',
        requiredForm: 'affirmative',
        requiredFormAr: 'إثبات 4 (ظرف تكرار وفاعل جمع They/We)',
        promptAr: 'اكتب جملة إثبات لفاعل جمع (They / We / The students) مع ظرف تكرار (always / usually / often).',
        suggestedStarter: 'They always play...',
        guidelinesAr: 'ضع ظرف التكرار قبل الفعل الأساسي (They always play football on Fridays).',
        exampleTargetEn: 'They always play football on Fridays.',
        exampleTargetAr: 'هم دائماً يلعبون كرة القدم في أيام الجمعة.'
      },
      {
        id: 'ps_fw_aff_5',
        type: 'free_write',
        requiredForm: 'affirmative',
        requiredFormAr: 'إثبات 5 (مهارة أو قدرة ثابتة)',
        promptAr: 'اكتب جملة إثبات تصف مهارة أو لغة يتقنها شخص (Sarah / Ali) في المضارع البسيط.',
        suggestedStarter: 'Sarah speaks...',
        guidelinesAr: 'استخدم الفاعل المفرد مع الفعل المضاف له s (speaks / knows) وظرفاً مثل (fluently / well).',
        exampleTargetEn: 'Sarah speaks three languages fluently.',
        exampleTargetAr: 'سارة تتحدث ثلاث لغات بطلاقة.'
      },

      // 3 Negative Prompts
      {
        id: 'ps_fw_neg_1',
        type: 'free_write',
        requiredForm: 'negative',
        requiredFormAr: 'نفي 1 (ضمير المتكلم I/We باستخدام don\'t)',
        promptAr: 'اكتب جملة نفي عن شيء لا تفعله أنت في عطلة نهاية الأسبوع باستخدام (I don\'t).',
        suggestedStarter: "I don't wake up...",
        guidelinesAr: 'استخدم أداة النفي (don\'t) متبوعة بالفعل في المصدر المجرد (بدون s وبدون ing).',
        exampleTargetEn: "I don't wake up early on weekends.",
        exampleTargetAr: 'أنا لا أستيقظ مبكراً في عطلات نهاية الأسبوع.'
      },
      {
        id: 'ps_fw_neg_2',
        type: 'free_write',
        requiredForm: 'negative',
        requiredFormAr: 'نفي 2 (فاعل مفرد باستخدام doesn\'t)',
        promptAr: 'اكتب جملة نفي عن شخص مفرد (Sarah / He / She) لعادة لا يمارسها باستخدام (doesn\'t).',
        suggestedStarter: "She doesn't eat...",
        guidelinesAr: 'استخدم (doesn\'t) مع الفاعل المفرد وأعد الفعل الأساسي إلى المصدر المجرد بدون s!',
        exampleTargetEn: "She doesn't eat fast food on weekdays.",
        exampleTargetAr: 'هي لا تتناول الوجبات السريعة في أيام الأسبوع.'
      },
      {
        id: 'ps_fw_neg_3',
        type: 'free_write',
        requiredForm: 'negative',
        requiredFormAr: 'نفي 3 (فاعل جمع باستخدام don\'t)',
        promptAr: 'اكتب جملة نفي عن مجموعة من الأشخاص (They / We / The students) باستخدام (don\'t).',
        suggestedStarter: "They don't watch...",
        guidelinesAr: 'استخدم (don\'t) مع ضمائر وأسماء الجمع متبوعة بفعل في المصدر ومفعول به.',
        exampleTargetEn: "They don't watch TV late at night.",
        exampleTargetAr: 'هم لا يشاهدون التلفاز في وقت متأخر من الليل.'
      },

      // 2 Question Prompts
      {
        id: 'ps_fw_q_1',
        type: 'free_write',
        requiredForm: 'question',
        requiredFormAr: 'سؤال 1 (سؤال نعم/لا - Yes/No Question)',
        promptAr: 'اكتب سؤال نعم/لا موجه لشخص تسأله عن عادته باستخدام (Do you...?) أو (Does he...?).',
        suggestedStarter: 'Do you speak...',
        guidelinesAr: 'ابدأ بـ (Do you / Does he) + المصدر المجرد + المفعول به + علامة استفهام (?).',
        exampleTargetEn: 'Do you speak English every day at work?',
        exampleTargetAr: 'هل تتحدث الإنجليزية كل يوم في العمل؟'
      },
      {
        id: 'ps_fw_q_2',
        type: 'free_write',
        requiredForm: 'question',
        requiredFormAr: 'سؤال 2 (سؤال استفهامي - Wh- Question)',
        promptAr: 'اكتب سؤالاً استفهامياً يبدأ بأداة استفهام (Where / What / When / Why) في المضارع البسيط.',
        suggestedStarter: 'Where do you...',
        guidelinesAr: 'الترتيب: (Wh-word + do/does + Subject + Base Verb + ?) مثل: Where do you live?',
        exampleTargetEn: 'Where do you work every morning?',
        exampleTargetAr: 'أين تعمل كل صباح؟'
      }
    ];
  }

  // Present Continuous
  if (tid === 'present_continuous') {
    return [
      // 5 Affirmative
      {
        id: 'pc_fw_aff_1',
        type: 'free_write',
        requiredForm: 'affirmative',
        requiredFormAr: 'إثبات 1 (ضمير المتكلم I am)',
        promptAr: 'اكتب جملة إثبات عما تفعله الآن في هذه اللحظة باستخدام (I am).',
        suggestedStarter: 'I am learning...',
        guidelinesAr: 'استخدم صيغة (I am + V-ing) مع كلمة دالة (now / right now).',
        exampleTargetEn: 'I am learning English grammar right now.',
        exampleTargetAr: 'أنا أتعلم قواعد اللغة الإنجليزية في هذه اللحظة.'
      },
      {
        id: 'pc_fw_aff_2',
        type: 'free_write',
        requiredForm: 'affirmative',
        requiredFormAr: 'إثبات 2 (فاعل مفرد He / She is)',
        promptAr: 'اكتب جملة إثبات عن شخص مفرد يقوم بعمل في هذه اللحظة (He / She / My friend).',
        suggestedStarter: 'She is reading...',
        guidelinesAr: 'استخدم (is + V-ing) مع المفعول به.',
        exampleTargetEn: 'She is reading an interesting article at the moment.',
        exampleTargetAr: 'هي تقرأ مقالاً ممتعاً في هذه اللحظة.'
      },
      {
        id: 'pc_fw_aff_3',
        type: 'free_write',
        requiredForm: 'affirmative',
        requiredFormAr: 'إثبات 3 (فاعل جمع They / We are)',
        promptAr: 'اكتب جملة إثبات لفاعل جمع (They / We) لحدث مستمر الآن.',
        suggestedStarter: 'They are preparing...',
        guidelinesAr: 'استخدم (are + V-ing) مع ظرف مكان أو وقت.',
        exampleTargetEn: 'They are preparing a delicious dinner together.',
        exampleTargetAr: 'هم يجهزون عشاءً لذيذاً معاً.'
      },
      {
        id: 'pc_fw_aff_4',
        type: 'free_write',
        requiredForm: 'affirmative',
        requiredFormAr: 'إثبات 4 (تنبيه Look! / Listen!)',
        promptAr: 'اكتب جملة إثبات تبدأ بكلمة تنبيه مثل (Look! أو Listen!) تدل على الاستمرار.',
        suggestedStarter: 'Look! The bird is...',
        guidelinesAr: 'ابدأ بـ (Look! / Listen!) متبوعة بجملة مضارع مستمر صحيحة.',
        exampleTargetEn: 'Look! The children are playing in the garden.',
        exampleTargetAr: 'انظر! الأطفال يلعبون في الحديقة.'
      },
      {
        id: 'pc_fw_aff_5',
        type: 'free_write',
        requiredForm: 'affirmative',
        requiredFormAr: 'إثبات 5 (خطة مستقبلية محددة)',
        promptAr: 'اكتب جملة مضارع مستمر تعبر عن ترتيبات مستقبلية مؤكدة (tomorrow / next week).',
        suggestedStarter: 'We are traveling...',
        guidelinesAr: 'استخدم المضارع المستمر للدلالة على موعد أو ترتيب مستقبلي مؤكد.',
        exampleTargetEn: 'We are traveling to London next week.',
        exampleTargetAr: 'نحن مسافرون إلى لندن الأسبوع القادم.'
      },

      // 3 Negative
      {
        id: 'pc_fw_neg_1',
        type: 'free_write',
        requiredForm: 'negative',
        requiredFormAr: 'نفي 1 (I am not)',
        promptAr: 'اكتب جملة نفي عما لا تفعله الآن باستخدام (I am not).',
        suggestedStarter: 'I am not watching...',
        guidelinesAr: 'استخدم (I am not + V-ing + now).',
        exampleTargetEn: 'I am not watching television right now.',
        exampleTargetAr: 'أنا لا أشاهد التلفاز في هذه اللحظة.'
      },
      {
        id: 'pc_fw_neg_2',
        type: 'free_write',
        requiredForm: 'negative',
        requiredFormAr: 'نفي 2 (He / She is not)',
        promptAr: 'اكتب جملة نفي لفاعل مفرد في المضارع المستمر باستخدام (is not / isn\'t).',
        suggestedStarter: "He isn't working...",
        guidelinesAr: 'استخدم (isn\'t + V-ing).',
        exampleTargetEn: "He isn't working on the project today.",
        exampleTargetAr: 'هو لا يعمل على المشروع اليوم.'
      },
      {
        id: 'pc_fw_neg_3',
        type: 'free_write',
        requiredForm: 'negative',
        requiredFormAr: 'نفي 3 (They / We are not)',
        promptAr: 'اكتب جملة نفي لفاعل جمع في المضارع المستمر باستخدام (are not / aren\'t).',
        suggestedStarter: "They aren't sleeping...",
        guidelinesAr: 'استخدم (aren\'t + V-ing).',
        exampleTargetEn: "They aren't sleeping at the moment.",
        exampleTargetAr: 'هم لا ينامون في هذه اللحظة.'
      },

      // 2 Questions
      {
        id: 'pc_fw_q_1',
        type: 'free_write',
        requiredForm: 'question',
        requiredFormAr: 'سؤال 1 (Yes/No Question - Are you...?)',
        promptAr: 'اكتب سؤال نعم/لا في المضارع المستمر يبدأ بـ (Are you...?) أو (Is he...?).',
        suggestedStarter: 'Are you listening...',
        guidelinesAr: 'الترتيب: (Are + you + V-ing + ?).',
        exampleTargetEn: 'Are you listening to the teacher carefully?',
        exampleTargetAr: 'هل تستمع إلى المعلم باهتمام؟'
      },
      {
        id: 'pc_fw_q_2',
        type: 'free_write',
        requiredForm: 'question',
        requiredFormAr: 'سؤال 2 (Wh- Question - What/Why are you...?)',
        promptAr: 'اكتب سؤالاً استفهامياً في المضارع المستمر يبدأ بأداة استفهام (What / Why / Where).',
        suggestedStarter: 'What are you doing...',
        guidelinesAr: 'الترتيب: (Wh-word + are/is + Subject + V-ing + ?).',
        exampleTargetEn: 'What are you doing at the moment?',
        exampleTargetAr: 'ماذا تفعل في هذه اللحظة؟'
      }
    ];
  }

  // Past Simple
  if (tid === 'past_simple') {
    return [
      // 5 Affirmative
      {
        id: 'past_fw_aff_1',
        type: 'free_write',
        requiredForm: 'affirmative',
        requiredFormAr: 'إثبات 1 (فعل منتظم -ed)',
        promptAr: 'اكتب جملة إثبات عن نشاط قمت به بالأمس مستخدماً فعلاً منتظماً ينتهي بـ (-ed).',
        suggestedStarter: 'I visited...',
        guidelinesAr: 'استخدم التصريف الثاني (V2) المنتهي بـ ed مع وقت محدد مثل (yesterday / last night).',
        exampleTargetEn: 'I visited my close friend yesterday afternoon.',
        exampleTargetAr: 'لقد زرت صديقي المقرب بعد ظهر أمس.'
      },
      {
        id: 'past_fw_aff_2',
        type: 'free_write',
        requiredForm: 'affirmative',
        requiredFormAr: 'إثبات 2 (فعل شاذ Irregular Verb)',
        promptAr: 'اكتب جملة إثبات باستخدام فعل شاذ (Irregular Verb مثل: went, bought, saw, ate, wrote).',
        suggestedStarter: 'She bought...',
        guidelinesAr: 'استخدم التصريف الثاني الشاذ للفعل بدون أفعال مساعدة في الإثبات.',
        exampleTargetEn: 'She bought a new laptop last week.',
        exampleTargetAr: 'هي اشترت حاسوباً محمولاً جديداً الأسبوع الماضي.'
      },
      {
        id: 'past_fw_aff_3',
        type: 'free_write',
        requiredForm: 'affirmative',
        requiredFormAr: 'إثبات 3 (فاعل جمع We / They)',
        promptAr: 'اكتب جملة إثبات عن حدث جماعي قمت به مع أصدقائك أو عائلتك (We / They).',
        suggestedStarter: 'We traveled...',
        guidelinesAr: 'حدد وقتاً ماضياً منتهياً مثل (last summer / 3 days ago).',
        exampleTargetEn: 'We traveled to Dubai two months ago.',
        exampleTargetAr: 'لقد سافرنا إلى دبي منذ شهرين.'
      },
      {
        id: 'past_fw_aff_4',
        type: 'free_write',
        requiredForm: 'affirmative',
        requiredFormAr: 'إثبات 4 (فعل ماضٍ منتهي بـ -ied أو مضاعف)',
        promptAr: 'اكتب جملة إثبات تحتوي على فعل ماضٍ مثل (studied / stopped / planned).',
        suggestedStarter: 'He studied...',
        guidelinesAr: 'طبق قواعد الإملاء للتصريف الثاني في الماضي البسيط.',
        exampleTargetEn: 'He studied hard for the final exam.',
        exampleTargetAr: 'هو درس باجتهاد للاختبار النهائي.'
      },
      {
        id: 'past_fw_aff_5',
        type: 'free_write',
        requiredForm: 'affirmative',
        requiredFormAr: 'إثبات 5 (سنة أو تاريخ محدد in 2020)',
        promptAr: 'اكتب جملة إثبات تصف إنجازاً أو حدثاً وقع في سنة أو تاريخ ماضٍ محدد (in 2021).',
        suggestedStarter: 'I graduated...',
        guidelinesAr: 'استخدم (in + Past Year) مع الفعل في التصريف الثاني V2.',
        exampleTargetEn: 'I graduated from university in 2021.',
        exampleTargetAr: 'تخرجت من الجامعة في عام 2021.'
      },

      // 3 Negative
      {
        id: 'past_fw_neg_1',
        type: 'free_write',
        requiredForm: 'negative',
        requiredFormAr: 'نفي 1 (I didn\'t + Base Verb)',
        promptAr: 'اكتب جملة نفي عن شيء لم تفعله بالأمس باستخدام (I didn\'t).',
        suggestedStarter: "I didn't go...",
        guidelinesAr: 'تذكر: بعد (didn\'t) يعود الفعل الأساسي للمصدر المجرد (go بدلاً من went).',
        exampleTargetEn: "I didn't go to the gym yesterday.",
        exampleTargetAr: 'أنا لم أذهب إلى النادي الرياضي بالأمس.'
      },
      {
        id: 'past_fw_neg_2',
        type: 'free_write',
        requiredForm: 'negative',
        requiredFormAr: 'نفي 2 (فاعل مفرد He/She didn\'t)',
        promptAr: 'اكتب جملة نفي لشخص مفرد (He / She / Khaled) لم يكمل عملاً في الماضي.',
        suggestedStarter: "He didn't finish...",
        guidelinesAr: 'استخدم (didn\'t) لجميع الضمائر مع المصدر المجرد.',
        exampleTargetEn: "He didn't finish the report last night.",
        exampleTargetAr: 'هو لم ينهِ التقرير الليلة الماضية.'
      },
      {
        id: 'past_fw_neg_3',
        type: 'free_write',
        requiredForm: 'negative',
        requiredFormAr: 'نفي 3 (فاعل جمع They didn\'t)',
        promptAr: 'اكتب جملة نفي لفاعل جمع (They / We) لحدث لم يحدث في الماضي.',
        suggestedStarter: "They didn't attend...",
        guidelinesAr: 'استخدم (didn\'t + verb base) مع مفعول به وظرف زمان ماضٍ.',
        exampleTargetEn: "They didn't attend the conference last Friday.",
        exampleTargetAr: 'هم لم يحضروا المؤتمر يوم الجمعة الماضي.'
      },

      // 2 Questions
      {
        id: 'past_fw_q_1',
        type: 'free_write',
        requiredForm: 'question',
        requiredFormAr: 'سؤال 1 (Yes/No Question - Did you...?)',
        promptAr: 'اكتب سؤالاً في الماضي البسيط موجه لصديقك يبدأ بـ (Did you...?).',
        suggestedStarter: 'Did you see...',
        guidelinesAr: 'ابدأ بـ (Did you + Base Verb) مع علامة استفهام (?).',
        exampleTargetEn: 'Did you see the latest movie last weekend?',
        exampleTargetAr: 'هل شاهدت أحدث فيلم في عطلة نهاية الأسبوع الماضي؟'
      },
      {
        id: 'past_fw_q_2',
        type: 'free_write',
        requiredForm: 'question',
        requiredFormAr: 'سؤال 2 (Wh- Question - Where/When did you...?)',
        promptAr: 'اكتب سؤالاً استفهامياً في الماضي البسيط يبدأ بأداة استفهام (Where / When / Why + did).',
        suggestedStarter: 'Where did you go...',
        guidelinesAr: 'الترتيب: (Wh-word + did + Subject + Base Verb + ?).',
        exampleTargetEn: 'Where did you spend your summer vacation?',
        exampleTargetAr: 'أين قضيت عطلتك الصيفية؟'
      }
    ];
  }

  // Default dynamic template for any of the 12 tenses
  return [
    // 5 Affirmative
    {
      id: `${tid}_fw_aff_1`,
      type: 'free_write',
      requiredForm: 'affirmative',
      requiredFormAr: 'إثبات 1 (ضمير المتكلم I)',
      promptAr: `اكتب جملة إثبات أولى بصيغة (${tense.nameAr}) مستخدماً ضمير المتكلم (I).`,
      suggestedStarter: 'I...',
      guidelinesAr: `طبق صيغة الإثبات: ${tense.shortFormula}`,
      exampleTargetEn: tense.usageLesson.useCases[0]?.examples[0]?.sentence || 'I master English grammar successfully.',
      exampleTargetAr: tense.usageLesson.useCases[0]?.examples[0]?.translationAr || 'أنا أتقن قواعد الإنجليزية بنجاح.'
    },
    {
      id: `${tid}_fw_aff_2`,
      type: 'free_write',
      requiredForm: 'affirmative',
      requiredFormAr: 'إثبات 2 (فاعل مفرد He / She)',
      promptAr: `اكتب جملة إثبات ثانية بصيغة (${tense.nameAr}) مع فاعل مفرد (He / She / Sarah).`,
      suggestedStarter: 'She...',
      guidelinesAr: `انتبه لتوافق الفعل المساعد وتصريف الفعل مع المفرد.`,
      exampleTargetEn: tense.usageLesson.useCases[0]?.examples[1]?.sentence || 'She achieves great progress.',
      exampleTargetAr: tense.usageLesson.useCases[0]?.examples[1]?.translationAr || 'هي تحقق تقدماً كبيراً.'
    },
    {
      id: `${tid}_fw_aff_3`,
      type: 'free_write',
      requiredForm: 'affirmative',
      requiredFormAr: 'إثبات 3 (فاعل جمع They / We)',
      promptAr: `اكتب جملة إثبات ثالثة بصيغة (${tense.nameAr}) مع فاعل جمع (They / We).`,
      suggestedStarter: 'We...',
      guidelinesAr: `استخدم كلمة دالة مناسبة لسياق الزمن: ${tense.usageLesson.keywords[0]?.word || ''}.`,
      exampleTargetEn: tense.usageLesson.useCases[1]?.examples[0]?.sentence || 'We practice English together.',
      exampleTargetAr: tense.usageLesson.useCases[1]?.examples[0]?.translationAr || 'نحن نتمرن على الإنجليزية معاً.'
    },
    {
      id: `${tid}_fw_aff_4`,
      type: 'free_write',
      requiredForm: 'affirmative',
      requiredFormAr: 'إثبات 4 (استخدام ظرف زمني محدد)',
      promptAr: `اكتب جملة إثبات رابعة بصيغة (${tense.nameAr}) مع ظرف زمني واضح يطابق سياق الزمن.`,
      suggestedStarter: 'The team...',
      guidelinesAr: `استخدم صيغة الزمن بدقة مع ظرف زمني متناسق.`,
      exampleTargetEn: 'The team completes the project on time.',
      exampleTargetAr: 'الفريق يكمل المشروع في الوقت المحدد.'
    },
    {
      id: `${tid}_fw_aff_5`,
      type: 'free_write',
      requiredForm: 'affirmative',
      requiredFormAr: 'إثبات 5 (سياق مركب وشامل)',
      promptAr: `اكتب جملة إثبات خامسة بصيغة (${tense.nameAr}) تحتوي على فاعل ومفعول به وحال أو مكان.`,
      suggestedStarter: 'Students...',
      guidelinesAr: `تأكد من اكتمال أركان الجملة SVO وتناسق الزمن.`,
      exampleTargetEn: 'Students study English with great enthusiasm.',
      exampleTargetAr: 'الطلاب يدرسون الإنجليزية بحماس كبير.'
    },

    // 3 Negative
    {
      id: `${tid}_fw_neg_1`,
      type: 'free_write',
      requiredForm: 'negative',
      requiredFormAr: 'نفي 1 (ضمير المتكلم I)',
      promptAr: `اكتب جملة نفي أولى بصيغة (${tense.nameAr}) مستخدماً ضمير المتكلم (I).`,
      suggestedStarter: 'I...',
      guidelinesAr: `أضف أداة النفي (not) إلى الفعل المساعد المناسب لهذا الزمن (${tense.svoLesson.auxiliaryRulesAr.slice(0, 30)}).`,
      exampleTargetEn: 'I do not give up on my learning goals.',
      exampleTargetAr: 'أنا لا أستسلم عن أهدافي التعليمية.'
    },
    {
      id: `${tid}_fw_neg_2`,
      type: 'free_write',
      requiredForm: 'negative',
      requiredFormAr: 'نفي 2 (فاعل مفرد He / She)',
      promptAr: `اكتب جملة نفي ثانية بصيغة (${tense.nameAr}) مع فاعل مفرد (He / She).`,
      suggestedStarter: 'He...',
      guidelinesAr: `حافظ على تصريف الفعل الأساسي السليم بعد الفعل المساعد المنفي.`,
      exampleTargetEn: 'He does not delay his daily duties.',
      exampleTargetAr: 'هو لا يؤجل واجباته اليومية.'
    },
    {
      id: `${tid}_fw_neg_3`,
      type: 'free_write',
      requiredForm: 'negative',
      requiredFormAr: 'نفي 3 (فاعل جمع They / We)',
      promptAr: `اكتب جملة نفي ثالثة بصيغة (${tense.nameAr}) مع فاعل جمع (They / We).`,
      suggestedStarter: 'They...',
      guidelinesAr: `استخدم صيغة النفي الصحيحة مع الجمع واختم الجملة بنقطة.`,
      exampleTargetEn: 'They do not ignore the lesson instructions.',
      exampleTargetAr: 'هم لا يتجاهلون تعليمات الدرس.'
    },

    // 2 Questions
    {
      id: `${tid}_fw_q_1`,
      type: 'free_write',
      requiredForm: 'question',
      requiredFormAr: 'سؤال 1 (سؤال نعم/لا Yes/No)',
      promptAr: `اكتب سؤال نعم/لا بصيغة (${tense.nameAr}) يبدأ بالفعل المساعد الخاص بالزمن.`,
      suggestedStarter: 'Do you...',
      guidelinesAr: `ابدأ بالفعل المساعد ثم الفاعل ثم الفعل، واختم بعلامة استفهام (?).`,
      exampleTargetEn: 'Do you understand the lesson clearly?',
      exampleTargetAr: 'هل تفهم الدرس بوضوح؟'
    },
    {
      id: `${tid}_fw_q_2`,
      type: 'free_write',
      requiredForm: 'question',
      requiredFormAr: 'سؤال 2 (سؤال استفهامي Wh- Question)',
      promptAr: `اكتب سؤالاً استفهامياً بصيغة (${tense.nameAr}) يبدأ بأداة استفهام (Where / When / Why / What).`,
      suggestedStarter: 'Why do you...',
      guidelinesAr: `الترتيب: أداة الاستفهام + الفعل المساعد + الفاعل + الفعل الأساسي + (?).`,
      exampleTargetEn: 'Why do you study English every day?',
      exampleTargetAr: 'لماذا تدرس الإنجليزية كل يوم؟'
    }
  ];
}
