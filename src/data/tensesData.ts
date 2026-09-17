import { TenseData } from '../types';
import { presentTenses } from './presentTenses';
import { pastTenses } from './pastTenses';
import { futureTenses } from './futureTenses';

export const allTenses: TenseData[] = [
  ...presentTenses,
  ...pastTenses,
  ...futureTenses
];

export function getTenseById(id: string): TenseData | undefined {
  return allTenses.find(t => t.id === id);
}

export interface TenseComparisonPair {
  id: string;
  titleAr: string;
  tense1Id: string;
  tense2Id: string;
  differenceSummaryAr: string;
  keyDistinctions: {
    criterionAr: string;
    tense1ExplanationAr: string;
    tense2ExplanationAr: string;
    tense1Example: string;
    tense2Example: string;
  }[];
}

export const comparisonPairs: TenseComparisonPair[] = [
  {
    id: 'ps_vs_pc',
    titleAr: 'المضارع البسيط vs المضارع المستمر',
    tense1Id: 'present_simple',
    tense2Id: 'present_continuous',
    differenceSummaryAr: 'المضارع البسيط يعبر عن عادات وحقائق دائمة وثابتة، بينما المضارع المستمر يعبر عن أحداث مؤقتة تجري الآن في هذه اللحظة أو خطط مستقبلية مؤكدة.',
    keyDistinctions: [
      {
        criterionAr: 'طبيعة الحدث (Nature of Action)',
        tense1ExplanationAr: 'دائم، متكرر، روتين ثابت أو حقيقة علمية مطلقة.',
        tense2ExplanationAr: 'مؤقت، نشاط يجري حالياً في لحظة الكلام أو فترة محددة.',
        tense1Example: 'I live in Riyadh. (مقر سكني الدائم)',
        tense2Example: 'I am living in Riyadh this month. (إقامة مؤقتة)'
      },
      {
        criterionAr: 'الكلمات الدالة (Key Signals)',
        tense1ExplanationAr: 'every day, always, usually, often, on Fridays.',
        tense2ExplanationAr: 'now, right now, at the moment, currently, look!',
        tense1Example: 'She drinks coffee every morning.',
        tense2Example: 'She is drinking coffee right now.'
      },
      {
        criterionAr: 'أفعال الحالة والشعور (Stative Verbs)',
        tense1ExplanationAr: 'تأتي دائماً في البسيط (know, like, want, understand).',
        tense2ExplanationAr: 'لا تأتي عادة بصيغة المستمر -ing عند التعبير عن الشعور أو الملكية.',
        tense1Example: 'I know the answer. (صحيح)',
        tense2Example: 'I am knowing the answer. (خاطئ تماماً)'
      }
    ]
  },
  {
    id: 'past_simple_vs_present_perfect',
    titleAr: 'الماضي البسيط vs المضارع التام',
    tense1Id: 'past_simple',
    tense2Id: 'present_perfect',
    differenceSummaryAr: 'الماضي البسيط يتطلب وقتاً ماضياً محدداً ومغلقاً (yesterday, in 2020)، بينما المضارع التام يركز على النتيجة أو التجربة دون تحديد وقت ماضٍ محدد أو مع وقت لا يزال مستمراً (today, this week).',
    keyDistinctions: [
      {
        criterionAr: 'تحديد الوقت (Time Specificity)',
        tense1ExplanationAr: 'وقت محدد ومنتهٍ تماماً في الماضي (yesterday, last year, ago).',
        tense2ExplanationAr: 'وقت غير محدد (تجربة في الحياة) أو فترة زمنية لم تنتهِ بعد.',
        tense1Example: 'I lost my keys yesterday. (حدث وانتهى بالأمس)',
        tense2Example: 'I have lost my keys! (أضعتها والآن لا أستطيع الدخول)'
      },
      {
        criterionAr: 'الاتصال بالحاضر (Connection to Present)',
        tense1ExplanationAr: 'حدث ماضٍ مقطوع الصلة بالحاضر، انتهى أثره أو أغلق وقته.',
        tense2ExplanationAr: 'حدث ماضٍ له أثر مباشر وواضح على اللحظة الحالية.',
        tense1Example: 'Shakespeare wrote many plays. (مات ولم يعد يكتب)',
        tense2Example: 'She has written three books this year. (قد تكتب المزيد)'
      },
      {
        criterionAr: 'الكلمات المفتاحية (Keywords)',
        tense1ExplanationAr: 'yesterday, last night, two days ago, in 2019.',
        tense2ExplanationAr: 'already, just, yet, ever, never, since, for.',
        tense1Example: 'Did you see the movie last week?',
        tense2Example: 'Have you ever seen this movie?'
      }
    ]
  },
  {
    id: 'past_simple_vs_past_continuous',
    titleAr: 'الماضي البسيط vs الماضي المستمر',
    tense1Id: 'past_simple',
    tense2Id: 'past_continuous',
    differenceSummaryAr: 'الماضي المستمر يعبر عن خلفية الحدث أو حدث كان مستمراً لفترة في الماضي، بينما الماضي البسيط يعبر عن حدث مكتمل أو حدث مفاجئ قاطع الحدث المستمر (بواسطة When / While).',
    keyDistinctions: [
      {
        criterionAr: 'اكتمال الحدث مقابل استمراره',
        tense1ExplanationAr: 'حدث بدأ وانتهى كنقطة مكتملة في الماضي.',
        tense2ExplanationAr: 'حدث كان قيد الحدوث والتطور في لحظة معينة في الماضي.',
        tense1Example: 'I watched a film last night.',
        tense2Example: 'I was watching a film at 8 PM yesterday.'
      },
      {
        criterionAr: 'التقاطع والمقاطعة (Interruption)',
        tense1ExplanationAr: 'الحدث القصير المفاجئ الذي قاطع الفعل الآخر (بعد when).',
        tense2ExplanationAr: 'الحدث الأطول الذي كان مستمراً في الخلفية (بعد while).',
        tense1Example: 'The phone rang while I was studying.',
        tense2Example: 'While I was studying, the phone rang.'
      }
    ]
  },
  {
    id: 'past_simple_vs_past_perfect',
    titleAr: 'الماضي البسيط vs الماضي التام',
    tense1Id: 'past_simple',
    tense2Id: 'past_perfect',
    differenceSummaryAr: 'الماضي التام (had + V3) هو "ماضي الماضي"، يُستخدم لترتيب الأحداث زمنياً لتوضيح الحدث الذي وقع أولاً قبل حدث ماضٍ آخر (الماضي البسيط).',
    keyDistinctions: [
      {
        criterionAr: 'الترتيب الزمني (Chronological Order)',
        tense1ExplanationAr: 'الحدث الثاني الأحدث في الماضي.',
        tense2ExplanationAr: 'الحدث الأول الأسبق تاريخياً الذي اكتمل قبل الحدث الثاني.',
        tense1Example: 'We arrived at the station.',
        tense2Example: 'The train had already left before we arrived.'
      },
      {
        criterionAr: 'الكلمات الرابطة للترتيب (Conjunctions)',
        tense1ExplanationAr: 'يأتي بعد before أو when.',
        tense2ExplanationAr: 'يأتي غالباً بعد after أو because أو as soon as.',
        tense1Example: 'Before I went to bed, I had finished my work.',
        tense2Example: 'After she had cooked dinner, she relaxed.'
      }
    ]
  },
  {
    id: 'present_perfect_vs_present_perfect_continuous',
    titleAr: 'المضارع التام vs المضارع التام المستمر',
    tense1Id: 'present_perfect',
    tense2Id: 'present_perfect_continuous',
    differenceSummaryAr: 'المضارع التام البسيط يركز على "الإنجاز وعدد المرات والنتيجة المكتملة"، بينما المضارع التام المستمر يركز على "النشاط نفسه والمدة الزمنية والاستمرارية".',
    keyDistinctions: [
      {
        criterionAr: 'التركيز: النتيجة أم المدة؟ (Result vs Duration)',
        tense1ExplanationAr: 'التركيز على اكتمال الفعل وكمية الإنجاز (How much / How many).',
        tense2ExplanationAr: 'التركيز على استغراق الوقت وطول النشاط (How long).',
        tense1Example: 'I have read 50 pages of the book.',
        tense2Example: 'I have been reading the book for three hours.'
      },
      {
        criterionAr: 'الديمومة والأثر الحاضر',
        tense1ExplanationAr: 'النتيجة النهائية جاهزة الآن.',
        tense2ExplanationAr: 'النشاط إما ما زال مستمراً أو توقف للتو مع أثر جسدي/مرئي واضح.',
        tense1Example: 'He has washed the car. (السيارة نظيفة الآن)',
        tense2Example: 'He has been washing the car. (ملابسه مبللة بالماء)'
      }
    ]
  },
  {
    id: 'future_simple_vs_future_continuous',
    titleAr: 'المستقبل البسيط vs المستقبل المستمر',
    tense1Id: 'future_simple',
    tense2Id: 'future_continuous',
    differenceSummaryAr: 'المستقبل البسيط (will) يعبر عن قرار لحظي، وعد، أو تنبؤ، بينما المستقبل المستمر (will be + -ing) يعبر عن فعل سيكون قيد الحدوث في لحظة محددة بدقة في المستقبل.',
    keyDistinctions: [
      {
        criterionAr: 'طبيعة التوقع المستقبلي',
        tense1ExplanationAr: 'حقيقة مستقبلية أو قرار فوري في لحظة التحدث.',
        tense2ExplanationAr: 'فعل سيكون في منتصف حدوثه واستمراره عند نقطة محددة قادمة.',
        tense1Example: 'I will call you tomorrow.',
        tense2Example: 'At 10 AM tomorrow, I will be flying to Dubai.'
      },
      {
        criterionAr: 'الدلالة على الروتين أو عدم الإزعاج',
        tense1ExplanationAr: 'طلب أو عرض أو نية عامة.',
        tense2ExplanationAr: 'سؤال مهذب عن خطط شخص ما دون الضغط عليه، أو نشاط روتيني طبيعي.',
        tense1Example: 'Will you help me with this?',
        tense2Example: 'Will you be passing by the supermarket later?'
      }
    ]
  },
  {
    id: 'future_simple_vs_future_perfect',
    titleAr: 'المستقبل البسيط vs المستقبل التام',
    tense1Id: 'future_simple',
    tense2Id: 'future_perfect',
    differenceSummaryAr: 'المستقبل البسيط يعبر عما سيحدث في المستقبل، بينما المستقبل التام (will have + V3) يعبر عما سيكون "قد اكتمل وانتهى بالفعل بحلول وقت معين في المستقبل" (By ...).',
    keyDistinctions: [
      {
        criterionAr: 'نقطة الاكتمال في المستقبل (Completion Deadline)',
        tense1ExplanationAr: 'يبدأ أو يحدث في وقت المستقبل.',
        tense2ExplanationAr: 'يكون منجزاً بالكامل ومغلقاً قبل موعد محدد في المستقبل (بحلول By).',
        tense1Example: 'I will finish the project next month.',
        tense2Example: 'By next month, I will have finished the project.'
      },
      {
        criterionAr: 'العبارات المفتاحية',
        tense1ExplanationAr: 'tomorrow, next week, soon, in 2030.',
        tense2ExplanationAr: 'by tomorrow, by 2030, by the time you arrive.',
        tense1Example: 'We will graduate in June.',
        tense2Example: 'By June, we will have graduated.'
      }
    ]
  }
];

// Find comparison pair by two tense IDs (in any direction)
export function getComparisonPair(tense1Id: string, tense2Id: string): TenseComparisonPair | undefined {
  return comparisonPairs.find(
    p => (p.tense1Id === tense1Id && p.tense2Id === tense2Id) ||
         (p.tense1Id === tense2Id && p.tense2Id === tense1Id)
  );
}

