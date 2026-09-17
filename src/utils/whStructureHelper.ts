import { SVOStructure } from '../types';

export interface WhQuestionItem {
  en: string;
  ar: string;
  category: 'core' | 'compound';
  usageAr: string;
  formulaHint: string;
  exampleEn: string;
  exampleAr: string;
}

export const ALL_WH_QUESTIONS_LIST: WhQuestionItem[] = [
  {
    en: 'What',
    ar: 'ماذا / ما',
    category: 'core',
    usageAr: 'للسؤال عن الأشياء، المعلومات، الأفعال والأنشطة، والأمور غير العاقلة.',
    formulaHint: 'What + Aux + Subject + Verb + Complement?',
    exampleEn: 'What do you study every evening?',
    exampleAr: 'ماذا تدرس كل مساء؟'
  },
  {
    en: 'Where',
    ar: 'أين / إلى أين',
    category: 'core',
    usageAr: 'للسؤال عن الأماكن، المواقع الجغرافية، الاتجاهات، والوجهات.',
    formulaHint: 'Where + Aux + Subject + Verb?',
    exampleEn: 'Where does she live now?',
    exampleAr: 'أين تعيش هي الآن؟'
  },
  {
    en: 'When',
    ar: 'متى',
    category: 'core',
    usageAr: 'للسؤال عن الزمان، التوقيت، المواعيد، وفترة وقوع الحدث.',
    formulaHint: 'When + Aux + Subject + Verb?',
    exampleEn: 'When will the meeting start?',
    exampleAr: 'متى سيبدأ الاجتماع؟'
  },
  {
    en: 'Why',
    ar: 'لماذا / لأي سبب',
    category: 'core',
    usageAr: 'للسؤال عن الأسباب، العلل، والدوافع وراء الفعل (يُجاب عنها غالباً بـ Because / To).',
    formulaHint: 'Why + Aux + Subject + Verb + Object?',
    exampleEn: 'Why are they studying so hard?',
    exampleAr: 'لماذا يدرسون بجد واجتهاد؟'
  },
  {
    en: 'Who',
    ar: 'مَن (للفاعل العاقل)',
    category: 'core',
    usageAr: 'للسؤال عن هوية الأشخاص والفاعل العاقل (من قام بالفعل).',
    formulaHint: 'Who + Verb... ? أو Who + Aux + Subject + Verb?',
    exampleEn: 'Who is speaking on the stage right now?',
    exampleAr: 'مَن يتحدث على المسرح في هذه اللحظة؟'
  },
  {
    en: 'Whom',
    ar: 'مَن (للمفعول به العاقل)',
    category: 'core',
    usageAr: 'للسؤال عن المفعول به العاقل (الشخص الذي وقع عليه الفعل في السياق الرسمي).',
    formulaHint: 'Whom + Aux + Subject + Verb?',
    exampleEn: 'Whom did you invite to the annual conference?',
    exampleAr: 'مَن دعوتَ إلى المؤتمر السنوي؟'
  },
  {
    en: 'Whose',
    ar: 'لِمَن / مِلك مَن',
    category: 'core',
    usageAr: 'للسؤال عن الملكية والتبعية (لمن تعود ملكية هذا الشيء أو العقار).',
    formulaHint: 'Whose + Noun + Aux + Subject + Verb?',
    exampleEn: 'Whose project did they select for the prize?',
    exampleAr: 'مشروع مَن اختاروا للجائزة؟'
  },
  {
    en: 'Which',
    ar: 'أيّ / أيهما',
    category: 'core',
    usageAr: 'للاختيار والمفاضلة والتمييز بين مجموعة خيارات محددة ومعروفة.',
    formulaHint: 'Which + Noun + Aux + Subject + Verb?',
    exampleEn: 'Which design do you prefer for our app?',
    exampleAr: 'أي تصميم تفضل لتطبيقنا؟'
  },
  {
    en: 'How',
    ar: 'كيف / بأي طريقة',
    category: 'compound',
    usageAr: 'للسؤال عن الكيفية، الطريقة، الحال، أو وسيلة إنجاز الشيء.',
    formulaHint: 'How + Aux + Subject + Verb?',
    exampleEn: 'How do you solve complex programming problems?',
    exampleAr: 'كيف تحل المسائل البرمجية المعقدة؟'
  },
  {
    en: 'How long',
    ar: 'كم المدة / كم استغرق',
    category: 'compound',
    usageAr: 'للسؤال عن الفترة الزمنية واستغراق الوقت والمدة المستمرة.',
    formulaHint: 'How long + Aux + Subject + Verb?',
    exampleEn: 'How long have you lived in this city?',
    exampleAr: 'كم المدة التي عشت فيها في هذه المدينة؟'
  },
  {
    en: 'How often',
    ar: 'كم مرة / كم معدل التكرار',
    category: 'compound',
    usageAr: 'للسؤال عن وتيرة ومعدل وتكرار حدوث الفعل أو ممارسة العادة.',
    formulaHint: 'How often + Aux + Subject + Verb?',
    exampleEn: 'How often do you practice speaking English?',
    exampleAr: 'كم مرة تمارس التحدث بالإنجليزية؟'
  },
  {
    en: 'How many',
    ar: 'كم عدد',
    category: 'compound',
    usageAr: 'للسؤال عن العدد والكميات المعدودة (يتبعها اسم جمع معدود Countable Noun).',
    formulaHint: 'How many + Plural Noun + Aux + Subject + Verb?',
    exampleEn: 'How many lessons have you completed today?',
    exampleAr: 'كم درساً أكملتَ اليوم؟'
  },
  {
    en: 'How much',
    ar: 'كم سعر / كم كمية',
    category: 'compound',
    usageAr: 'للسؤال عن السعر والتكلفة، أو الكميات غير المعدودة (Uncountable Nouns).',
    formulaHint: 'How much + Uncountable Noun / does it cost... ?',
    exampleEn: 'How much time do we need to finish?',
    exampleAr: 'كم مقدار الوقت الذي نحتاجه للإنهاء؟'
  },
  {
    en: 'How far',
    ar: 'كم المسافة / كم البعد',
    category: 'compound',
    usageAr: 'للسؤال عن المسافة والبعد المكاني والجغرافي بين مكانين.',
    formulaHint: 'How far + is + Place / do you travel... ?',
    exampleEn: 'How far is the international airport from here?',
    exampleAr: 'كم تبعد المسافة إلى المطار الدولي من هنا؟'
  },
  {
    en: 'How old',
    ar: 'كم العمر / كم السن',
    category: 'compound',
    usageAr: 'للسؤال عن عمر وسن الأشخاص أو قِدم المعالم والأشياء.',
    formulaHint: 'How old + is/are + Subject?',
    exampleEn: 'How old is this historical university?',
    exampleAr: 'كم يبلغ عمر هذه الجامعة التاريخية؟'
  },
  {
    en: 'What time',
    ar: 'في أي وقت / أي ساعة تحديداً',
    category: 'compound',
    usageAr: 'للسؤال عن وقت دقيق ومحدد بالساعة.',
    formulaHint: 'What time + Aux + Subject + Verb?',
    exampleEn: 'What time does the morning flight depart?',
    exampleAr: 'في أي ساعة تغادر الرحلة الصباحية؟'
  }
];

export function getWhStructureForTense(tenseId: string): SVOStructure {
  switch (tenseId) {
    case 'present_simple':
      return {
        formType: 'wh_question',
        formTitleAr: '4. أسئلة أداة الاستفهام (Wh- Questions)',
        formTitleEn: 'Wh- Question Structure',
        formula: 'Wh-word + do / does + Subject + Verb (Base) + Object?',
        explanationAr: 'نبدأ بأداة الاستفهام (Wh- Word) تليها Do أو Does حسب الفاعل، ثم الفاعل، ثم الفعل الأساسي في المصدر المجرد (Base Form).',
        tableRows: [
          {
            whWord: 'Where',
            subject: 'she',
            auxiliary: 'does',
            verb: 'live',
            verbFormNote: 'مصدر مجرد (Base)',
            objectComplement: 'in Saudi Arabia?',
            timeMarker: '-',
            fullSentence: 'Where does she live in Saudi Arabia?',
            translationAr: 'أين تعيش هي في المملكة العربية السعودية؟'
          },
          {
            whWord: 'When',
            subject: 'you',
            auxiliary: 'do',
            verb: 'play',
            verbFormNote: 'مصدر مجرد (Base)',
            objectComplement: 'football with your friends',
            timeMarker: 'on Fridays?',
            fullSentence: 'When do you play football with your friends on Fridays?',
            translationAr: 'متى تلعب كرة القدم مع أصدقائك أيام الجمعة؟'
          },
          {
            whWord: 'Why',
            subject: 'they',
            auxiliary: 'do',
            verb: 'wake up',
            verbFormNote: 'مصدر مجرد (Base)',
            objectComplement: 'so early',
            timeMarker: 'every morning?',
            fullSentence: 'Why do they wake up so early every morning?',
            translationAr: 'لماذا يستيقظون مبكراً جداً كل صباح؟'
          },
          {
            whWord: 'What',
            subject: 'he',
            auxiliary: 'does',
            verb: 'study',
            verbFormNote: 'مصدر مجرد (Base)',
            objectComplement: 'at university?',
            timeMarker: '-',
            fullSentence: 'What does he study at university?',
            translationAr: 'ماذا يدرس هو في الجامعة؟'
          }
        ]
      };

    case 'present_continuous':
      return {
        formType: 'wh_question',
        formTitleAr: '4. أسئلة أداة الاستفهام (Wh- Questions)',
        formTitleEn: 'Wh- Question Structure',
        formula: 'Wh-word + am / is / are + Subject + Verb-ing + Object?',
        explanationAr: 'نضع أداة الاستفهام في البداية تليها صيغة Be المناسبة للفاعل (am / is / are) ثم الفاعل ثم الفعل مضافاً له (-ing).',
        tableRows: [
          {
            whWord: 'What',
            subject: 'you',
            auxiliary: 'are',
            verb: 'doing',
            verbFormNote: 'Verb + ing',
            objectComplement: 'on your laptop',
            timeMarker: 'right now?',
            fullSentence: 'What are you doing on your laptop right now?',
            translationAr: 'ماذا تفعل على حاسوبك في هذه اللحظة؟'
          },
          {
            whWord: 'Where',
            subject: 'he',
            auxiliary: 'is',
            verb: 'going',
            verbFormNote: 'Verb + ing',
            objectComplement: 'with his friends',
            timeMarker: 'at the moment?',
            fullSentence: 'Where is he going with his friends at the moment?',
            translationAr: 'إلى أين يذهب هو مع أصدقائه في الوقت الحالي؟'
          },
          {
            whWord: 'Why',
            subject: 'she',
            auxiliary: 'is',
            verb: 'studying',
            verbFormNote: 'Verb + ing',
            objectComplement: 'so late',
            timeMarker: 'tonight?',
            fullSentence: 'Why is she studying so late tonight?',
            translationAr: 'لماذا تدرس هي في وقت متأخر هكذا الليلة؟'
          },
          {
            whWord: 'Who',
            subject: 'they',
            auxiliary: 'are',
            verb: 'waiting for',
            verbFormNote: 'Verb + ing',
            objectComplement: 'at the station?',
            timeMarker: 'now',
            fullSentence: 'Who are they waiting for at the station now?',
            translationAr: 'من ينتظرون في المحطة الآن؟'
          }
        ]
      };

    case 'present_perfect':
      return {
        formType: 'wh_question',
        formTitleAr: '4. أسئلة أداة الاستفهام (Wh- Questions)',
        formTitleEn: 'Wh- Question Structure',
        formula: 'Wh-word + have / has + Subject + Verb (V3) + Object?',
        explanationAr: 'نضع أداة الاستفهام ثم Have أو Has ثم الفاعل ثم التصريف الثالث للفعل (V3 Past Participle).',
        tableRows: [
          {
            whWord: 'Where',
            subject: 'you',
            auxiliary: 'have',
            verb: 'traveled',
            verbFormNote: 'التصريف الثالث (V3)',
            objectComplement: 'in your life?',
            timeMarker: 'so far',
            fullSentence: 'Where have you traveled so far in your life?',
            translationAr: 'إلى أين سافرت حتى الآن في حياتك؟'
          },
          {
            whWord: 'What',
            subject: 'she',
            auxiliary: 'has',
            verb: 'achieved',
            verbFormNote: 'التصريف الثالث (V3)',
            objectComplement: 'in this project?',
            timeMarker: 'recently',
            fullSentence: 'What has she achieved in this project recently?',
            translationAr: 'ماذا أنجزت هي في هذا المشروع مؤخراً؟'
          },
          {
            whWord: 'How many books',
            subject: 'they',
            auxiliary: 'have',
            verb: 'read',
            verbFormNote: 'التصريف الثالث (V3)',
            objectComplement: 'for the course?',
            timeMarker: 'already',
            fullSentence: 'How many books have they read already for the course?',
            translationAr: 'كم كتاباً قرأوا بالفعل لهذه الدورة؟'
          },
          {
            whWord: 'Why',
            subject: 'he',
            auxiliary: 'has',
            verb: 'decided',
            verbFormNote: 'التصريف الثالث (V3)',
            objectComplement: 'to change his job?',
            timeMarker: 'just',
            fullSentence: 'Why has he just decided to change his job?',
            translationAr: 'لماذا قرر لتوه تغيير وظيفته؟'
          }
        ]
      };

    case 'present_perfect_continuous':
      return {
        formType: 'wh_question',
        formTitleAr: '4. أسئلة أداة الاستفهام (Wh- Questions)',
        formTitleEn: 'Wh- Question Structure',
        formula: 'Wh-word + have / has + Subject + been + Verb-ing + Object?',
        explanationAr: 'للسؤال عن استمرار الحدث ومدة استغراقه نستخدم غالباً (How long) تليها have/has والفاعل ثم been والفعل بـ (-ing).',
        tableRows: [
          {
            whWord: 'How long',
            subject: 'you',
            auxiliary: 'have',
            verb: 'been living',
            verbFormNote: 'been + Verb-ing',
            objectComplement: 'in this city?',
            timeMarker: '-',
            fullSentence: 'How long have you been living in this city?',
            translationAr: 'كم المدة التي وأنت تعيش في هذه المدينة؟'
          },
          {
            whWord: 'What',
            subject: 'she',
            auxiliary: 'has',
            verb: 'been working on',
            verbFormNote: 'been + Verb-ing',
            objectComplement: 'all afternoon?',
            timeMarker: 'all afternoon',
            fullSentence: 'What has she been working on all afternoon?',
            translationAr: 'على ماذا كانت تعمل طوال فترة بعد الظهر؟'
          },
          {
            whWord: 'Where',
            subject: 'they',
            auxiliary: 'have',
            verb: 'been practicing',
            verbFormNote: 'been + Verb-ing',
            objectComplement: 'their presentation',
            timeMarker: 'since morning?',
            fullSentence: 'Where have they been practicing their presentation since morning?',
            translationAr: 'أين كانوا يتدربون على عرضهم التقديمي منذ الصباح؟'
          }
        ]
      };

    case 'past_simple':
      return {
        formType: 'wh_question',
        formTitleAr: '4. أسئلة أداة الاستفهام (Wh- Questions)',
        formTitleEn: 'Wh- Question Structure',
        formula: 'Wh-word + did + Subject + Verb (Base) + Object?',
        explanationAr: 'نضع أداة الاستفهام ثم الفعل المساعد Did يليه الفاعل ثم الفعل الأساسي في المصدر المجرد (Base) لأن did تدل على الماضي.',
        tableRows: [
          {
            whWord: 'Where',
            subject: 'you',
            auxiliary: 'did',
            verb: 'go',
            verbFormNote: 'مصدر مجرد (Base)',
            objectComplement: 'on holiday',
            timeMarker: 'last summer?',
            fullSentence: 'Where did you go on holiday last summer?',
            translationAr: 'أين ذهبت في العطلة الصيف الماضي؟'
          },
          {
            whWord: 'When',
            subject: 'he',
            auxiliary: 'did',
            verb: 'arrive',
            verbFormNote: 'مصدر مجرد (Base)',
            objectComplement: 'at the airport',
            timeMarker: 'yesterday?',
            fullSentence: 'When did he arrive at the airport yesterday?',
            translationAr: 'متى وصل هو إلى المطار بالأمس؟'
          },
          {
            whWord: 'What',
            subject: 'they',
            auxiliary: 'did',
            verb: 'buy',
            verbFormNote: 'مصدر مجرد (Base)',
            objectComplement: 'from the market',
            timeMarker: 'two days ago?',
            fullSentence: 'What did they buy from the market two days ago?',
            translationAr: 'ماذا اشتروا من السوق قبل يومين؟'
          },
          {
            whWord: 'Why',
            subject: 'she',
            auxiliary: 'did',
            verb: 'call',
            verbFormNote: 'مصدر مجرد (Base)',
            objectComplement: 'the manager',
            timeMarker: 'last night?',
            fullSentence: 'Why did she call the manager last night?',
            translationAr: 'لماذا اتصلت بالمدير الليلة الماضية؟'
          }
        ]
      };

    case 'past_continuous':
      return {
        formType: 'wh_question',
        formTitleAr: '4. أسئلة أداة الاستفهام (Wh- Questions)',
        formTitleEn: 'Wh- Question Structure',
        formula: 'Wh-word + was / were + Subject + Verb-ing + Object?',
        explanationAr: 'نضع أداة الاستفهام ثم Was للمفرد أو Were للجمع ثم الفاعل ثم الفعل مع (-ing) لوصف نشاط كان مستمراً في لحظة ماضية.',
        tableRows: [
          {
            whWord: 'What',
            subject: 'you',
            auxiliary: 'were',
            verb: 'doing',
            verbFormNote: 'Verb + ing',
            objectComplement: 'at home',
            timeMarker: 'at 8 PM yesterday?',
            fullSentence: 'What were you doing at home at 8 PM yesterday?',
            translationAr: 'ماذا كنت تفعل في المنزل في تمام الثامنة مساء أمس؟'
          },
          {
            whWord: 'Where',
            subject: 'she',
            auxiliary: 'was',
            verb: 'driving',
            verbFormNote: 'Verb + ing',
            objectComplement: 'when it started to rain?',
            timeMarker: 'when it rained',
            fullSentence: 'Where was she driving when it started to rain?',
            translationAr: 'إلى أين كانت تقود سيارتها عندما بدأ المطر بالهطول؟'
          },
          {
            whWord: 'Why',
            subject: 'they',
            auxiliary: 'were',
            verb: 'arguing',
            verbFormNote: 'Verb + ing',
            objectComplement: 'so loudly',
            timeMarker: 'last night?',
            fullSentence: 'Why were they arguing so loudly last night?',
            translationAr: 'لماذا كانوا يتجادلون بصوت عالٍ الليلة الماضية؟'
          }
        ]
      };

    case 'past_perfect':
      return {
        formType: 'wh_question',
        formTitleAr: '4. أسئلة أداة الاستفهام (Wh- Questions)',
        formTitleEn: 'Wh- Question Structure',
        formula: 'Wh-word + had + Subject + Verb (V3) + Object?',
        explanationAr: 'نضع أداة الاستفهام ثم الفعل المساعد Had ثم الفاعل ثم التصريف الثالث (V3) للسؤال عن الحدث الأقدم في الماضي.',
        tableRows: [
          {
            whWord: 'What',
            subject: 'you',
            auxiliary: 'had',
            verb: 'prepared',
            verbFormNote: 'التصريف الثالث (V3)',
            objectComplement: 'for the meeting',
            timeMarker: 'before they arrived?',
            fullSentence: 'What had you prepared for the meeting before they arrived?',
            translationAr: 'ماذا كنت قد أعددت للاجتماع قبل وصولهم؟'
          },
          {
            whWord: 'Where',
            subject: 'he',
            auxiliary: 'had',
            verb: 'worked',
            verbFormNote: 'التصريف الثالث (V3)',
            objectComplement: 'before joining our company?',
            timeMarker: 'before joining us',
            fullSentence: 'Where had he worked before joining our company?',
            translationAr: 'أين كان قد عمل قبل انضمامه لشركتنا؟'
          },
          {
            whWord: 'Why',
            subject: 'they',
            auxiliary: 'had',
            verb: 'left',
            verbFormNote: 'التصريف الثالث (V3)',
            objectComplement: 'the hall',
            timeMarker: 'before the speech ended?',
            fullSentence: 'Why had they left the hall before the speech ended?',
            translationAr: 'لماذا كانوا قد غادروا القاعة قبل انتهاء الكلمة؟'
          }
        ]
      };

    case 'past_perfect_continuous':
      return {
        formType: 'wh_question',
        formTitleAr: '4. أسئلة أداة الاستفهام (Wh- Questions)',
        formTitleEn: 'Wh- Question Structure',
        formula: 'Wh-word + had + Subject + been + Verb-ing + Object?',
        explanationAr: 'نستخدم أداة الاستفهام مثل (How long) تليها Had والفاعل ثم been والفعل بـ (-ing) للسؤال عن مدة نشاط استمر قبل حدث ماضٍ آخر.',
        tableRows: [
          {
            whWord: 'How long',
            subject: 'you',
            auxiliary: 'had',
            verb: 'been waiting',
            verbFormNote: 'been + Verb-ing',
            objectComplement: 'at the airport',
            timeMarker: 'before the flight arrived?',
            fullSentence: 'How long had you been waiting at the airport before the flight arrived?',
            translationAr: 'كم المدة التي كنت تنتظرها في المطار قبل وصول الرحلة؟'
          },
          {
            whWord: 'What',
            subject: 'she',
            auxiliary: 'had',
            verb: 'been studying',
            verbFormNote: 'been + Verb-ing',
            objectComplement: 'before she switched majors?',
            timeMarker: 'before switching',
            fullSentence: 'What had she been studying before she switched majors?',
            translationAr: 'ماذا كانت تدرس قبل أن تغيّر تخصصها الجامعي؟'
          }
        ]
      };

    case 'future_simple':
      return {
        formType: 'wh_question',
        formTitleAr: '4. أسئلة أداة الاستفهام (Wh- Questions)',
        formTitleEn: 'Wh- Question Structure',
        formula: 'Wh-word + will + Subject + Verb (Base) + Object?',
        explanationAr: 'نضع أداة الاستفهام ثم الفعل المساعد Will ثم الفاعل ثم الفعل الأساسي في المصدر المجرد (Base).',
        tableRows: [
          {
            whWord: 'Where',
            subject: 'you',
            auxiliary: 'will',
            verb: 'travel',
            verbFormNote: 'مصدر مجرد (Base)',
            objectComplement: 'for your next vacation?',
            timeMarker: 'next summer',
            fullSentence: 'Where will you travel for your next vacation?',
            translationAr: 'إلى أين ستسافر في عطلتك القادمة؟'
          },
          {
            whWord: 'When',
            subject: 'the results',
            auxiliary: 'will',
            verb: 'be',
            verbFormNote: 'مصدر مجرد (Base)',
            objectComplement: 'announced by the committee?',
            timeMarker: 'tomorrow',
            fullSentence: 'When will the results be announced by the committee?',
            translationAr: 'متى سيتم إعلان النتائج من قِبل اللجنة؟'
          },
          {
            whWord: 'What',
            subject: 'they',
            auxiliary: 'will',
            verb: 'do',
            verbFormNote: 'مصدر مجرد (Base)',
            objectComplement: 'after graduating from college?',
            timeMarker: 'next year',
            fullSentence: 'What will they do after graduating from college?',
            translationAr: 'ماذا سيفعلون بعد التخرج من الكلية؟'
          },
          {
            whWord: 'How',
            subject: 'she',
            auxiliary: 'will',
            verb: 'solve',
            verbFormNote: 'مصدر مجرد (Base)',
            objectComplement: 'this complex technical problem?',
            timeMarker: 'soon',
            fullSentence: 'How will she solve this complex technical problem?',
            translationAr: 'كيف ستقوم بحل هذه المشكلة التقنية المعقدة؟'
          }
        ]
      };

    case 'future_continuous':
      return {
        formType: 'wh_question',
        formTitleAr: '4. أسئلة أداة الاستفهام (Wh- Questions)',
        formTitleEn: 'Wh- Question Structure',
        formula: 'Wh-word + will + Subject + be + Verb-ing + Object?',
        explanationAr: 'نضع أداة الاستفهام ثم Will ثم الفاعل ثم be متبوعة بالفعل المنتهي بـ (-ing) للسؤال عما سيكون مستمراً في وقت مستقبلي محدد.',
        tableRows: [
          {
            whWord: 'What',
            subject: 'you',
            auxiliary: 'will',
            verb: 'be doing',
            verbFormNote: 'be + Verb-ing',
            objectComplement: 'at this time tomorrow?',
            timeMarker: 'at this time tomorrow',
            fullSentence: 'What will you be doing at this time tomorrow?',
            translationAr: 'ماذا ستكون تفعل في مثل هذا الوقت غداً؟'
          },
          {
            whWord: 'Where',
            subject: 'they',
            auxiliary: 'will',
            verb: 'be staying',
            verbFormNote: 'be + Verb-ing',
            objectComplement: 'during their conference in Dubai?',
            timeMarker: 'next week',
            fullSentence: 'Where will they be staying during their conference in Dubai?',
            translationAr: 'أين سيكونون يقيمون أثناء مؤتمرهم في دبي؟'
          }
        ]
      };

    case 'future_perfect':
      return {
        formType: 'wh_question',
        formTitleAr: '4. أسئلة أداة الاستفهام (Wh- Questions)',
        formTitleEn: 'Wh- Question Structure',
        formula: 'Wh-word + will + Subject + have + Verb (V3) + Object?',
        explanationAr: 'نضع أداة الاستفهام ثم Will والفاعل ثم have والتصريف الثالث (V3) للسؤال عما سيكون مكتملاً بحلول نقطة زمنية مستقبلية.',
        tableRows: [
          {
            whWord: 'What',
            subject: 'you',
            auxiliary: 'will',
            verb: 'have achieved',
            verbFormNote: 'have + V3',
            objectComplement: 'in your career',
            timeMarker: 'by 2030?',
            fullSentence: 'What will you have achieved in your career by 2030?',
            translationAr: 'ماذا ستكون قد حققت في مسيرتك المهنية بحلول عام 2030؟'
          },
          {
            whWord: 'How many chapters',
            subject: 'she',
            auxiliary: 'will',
            verb: 'have written',
            verbFormNote: 'have + V3',
            objectComplement: 'of her novel',
            timeMarker: 'by next month?',
            fullSentence: 'How many chapters will she have written of her novel by next month?',
            translationAr: 'كم فصلاً ستكون قد كتبت من روايتها بحلول الشهر القادم؟'
          }
        ]
      };

    case 'future_perfect_continuous':
      return {
        formType: 'wh_question',
        formTitleAr: '4. أسئلة أداة الاستفهام (Wh- Questions)',
        formTitleEn: 'Wh- Question Structure',
        formula: 'Wh-word + will + Subject + have been + Verb-ing + Object?',
        explanationAr: 'نستخدم (How long) تليها Will والفاعل ثم have been والفعل بـ (-ing) للسؤال عن مدة الاستمرارية بحلول موعد في المستقبل.',
        tableRows: [
          {
            whWord: 'How long',
            subject: 'you',
            auxiliary: 'will',
            verb: 'have been working',
            verbFormNote: 'have been + Verb-ing',
            objectComplement: 'at this company',
            timeMarker: 'by next year?',
            fullSentence: 'How long will you have been working at this company by next year?',
            translationAr: 'كم المدة التي ستكون قد قضيتها في العمل بهذه الشركة بحلول العام القادم؟'
          },
          {
            whWord: 'Where',
            subject: 'they',
            auxiliary: 'will',
            verb: 'have been living',
            verbFormNote: 'have been + Verb-ing',
            objectComplement: 'for five years',
            timeMarker: 'by December?',
            fullSentence: 'Where will they have been living for five years by December?',
            translationAr: 'أين سيكونون قد عاشوا لمدة خمس سنوات بحلول ديسمبر؟'
          }
        ]
      };

    default:
      return {
        formType: 'wh_question',
        formTitleAr: '4. أسئلة أداة الاستفهام (Wh- Questions)',
        formTitleEn: 'Wh- Question Structure',
        formula: 'Wh-word + Auxiliary + Subject + Verb + Object?',
        explanationAr: 'نضع أداة الاستفهام أولاً ثم الفعل المساعد والفاعل والفعل بالتصريف المناسب.',
        tableRows: [
          {
            whWord: 'Where',
            subject: 'you',
            auxiliary: 'do',
            verb: 'live',
            verbFormNote: 'Base Form',
            objectComplement: 'in the city?',
            timeMarker: '-',
            fullSentence: 'Where do you live in the city?',
            translationAr: 'أين تعيش في المدينة؟'
          }
        ]
      };
  }
}
