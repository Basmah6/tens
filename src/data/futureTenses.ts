import { TenseData } from '../types';

export const futureTenses: TenseData[] = [
  {
    id: 'future_simple',
    nameEn: 'Future Simple',
    nameAr: 'المستقبل البسيط',
    category: 'future',
    level: 'مبتدئ',
    shortFormula: 'Subject + will / be going to + V1 (Base)',
    summaryAr: 'يُستخدم للتعبير عن القرارات اللحظية، التوقعات، الوعود، أو الخطط المستقبلية المسبقة.',
    timelineDescriptionAr: 'حدث سيقع في نقطة زمنية قادمة في المستقبل.',
    timelinePoint: 1.5,
    usageLesson: {
      titleAr: 'الاستخدام والتفصيل مع أمثلة حية',
      overviewAr: 'المستقبل البسيط (Future Simple) ينقسم لطريقتين رئيسيتين: (Will) للقرارات السريعة اللحظية والوعود والتوقعات العامة، و (Be going to) للخطط المسبقة والتوقعات القائمة على دليل ملموس.',
      useCases: [
        {
          titleAr: '1. قرارات سريعة في لحظة التكلم (Instant / Quick Decisions with Will)',
          descriptionAr: 'قرار تتخذه فوراً استجابة للموقف الحالي دون تفكير مسبق.',
          examples: [
            {
              id: 'fs_f1',
              sentence: 'The phone is ringing. I will answer it.',
              translationAr: 'الهاتف يرن. سأجيب عليه حالاً.',
              contextAr: 'قرار سريع اتخذته في نفس ثانية رنين الهاتف',
              subject: 'I',
              auxiliary: 'will',
              verb: 'answer',
              complement: 'it'
            },
            {
              id: 'fs_f2',
              sentence: 'I feel cold; I will close the window.',
              translationAr: 'أشعر بالبرد؛ سأغلق النافذة.',
              contextAr: 'قرار لحظي فوري',
              subject: 'I',
              auxiliary: 'will',
              verb: 'close',
              complement: 'the window'
            }
          ]
        },
        {
          titleAr: '2. خطط ونوايا مدروسة مسبقاً (Prior Plans with Be Going To)',
          descriptionAr: 'أمر خططت له وقررت فعله قبل لحظة الكلام.',
          examples: [
            {
              id: 'fs_f3',
              sentence: 'I am going to study medicine next year.',
              translationAr: 'أنا أنوي وأخطط لدراسة الطب في العام القادم.',
              contextAr: 'خطة ونية مستقبلية مدروسة مسبقاً',
              subject: 'I',
              auxiliary: 'am going to',
              verb: 'study',
              complement: 'medicine',
              timeMarker: 'next year'
            }
          ]
        },
        {
          titleAr: '3. توقعات قائمة على دليل مرئي (Predictions with Visual Evidence)',
          descriptionAr: 'توقع شيء سيحدث حتماً لأنك ترى دليلاً أمام عينيك الآن.',
          examples: [
            {
              id: 'fs_f4',
              sentence: 'Look at those dark clouds! It is going to rain.',
              translationAr: 'انظر إلى تلك الغيوم الداكنة! سوف تمطر.',
              contextAr: 'توقع مبني على دليل مرئي (dark clouds)',
              subject: 'It',
              auxiliary: 'is going to',
              verb: 'rain',
              complement: 'soon'
            }
          ]
        }
      ],
      keywords: [
        { word: 'Tomorrow', meaningAr: 'غداً', example: 'I will call you tomorrow.' },
        { word: 'Next (week, month, year)', meaningAr: 'القادم (الأسبوع، الشهر...)', example: 'She is going to travel next month.' },
        { word: 'Soon / In the future', meaningAr: 'قريباً / في المستقبل', example: 'We will meet soon.' },
        { word: 'I think / I promise', meaningAr: 'أعتقد / أعدك (مع will)', example: 'I promise I will help you.' }
      ],
      timeConceptAr: 'نقطة قادمة أمام الحاضر تعبر عما سيحدث في المستقبل.'
    },
    svoLesson: {
      titleAr: 'تركيب الجمل وجدول SVO + الأفعال المساعدة',
      rulesAr: [
        'مع will: الفاعل + will + الفعل في المصدر المجرد (Base Form V1) بدون أي إضافات.',
        'مع be going to: الفاعل + (am/is/are) + going to + الفعل في المصدر (V1).',
        'في النفي: will not (won\'t) + V1 — أو am/is/are not going to + V1.'
      ],
      auxiliaryRulesAr: 'will فعل مساعد مشروط (Modal verb) يتبعه المصدر المجرد لجميع الضمائر بلا تغيير.',
      goldenNotesAr: [
        'ملاحظة: will تأتي مع جميع الضمائر (I, you, he, she, it, we, they) بدون أي تغيير في صيغتها.',
        'بعد will يأتي الفعل الأساسي دائماً في صيغة المصدر المجرد الخالي من أي إضافات (Base Form).',
        'في النفي: will not تختصر إلى (won\'t) ويتبعها أيضاً الفعل في المصدر.'
      ],
      subjectClassification: {
        singularPronouns: ['He (هو)', 'She (هي)', 'It (هو/هي لغير العاقل)'],
        singularNouns: [
          { en: 'The manager', ar: 'المدير' },
          { en: 'Sara', ar: 'سارة' },
          { en: 'The student', ar: 'الطالب' },
          { en: 'The team', ar: 'الفريق' }
        ],
        pluralPronouns: ['I (أنا)', 'You (أنت / أنتم)', 'They (هم)', 'We (نحن)'],
        pluralNouns: [
          { en: 'The managers', ar: 'المدراء' },
          { en: 'Engineers', ar: 'المهندسون' },
          { en: 'Friends', ar: 'الأصدقاء' },
          { en: 'Students', ar: 'الطلاب' }
        ]
      },
      verbTable: [
        { base: 'visit', v2: 'visited', v3: 'visited', meaningAr: 'يزور', isIrregular: false },
        { base: 'travel', v2: 'traveled', v3: 'traveled', meaningAr: 'يسافر', isIrregular: false },
        { base: 'buy', v2: 'bought', v3: 'bought', meaningAr: 'يشتري', isIrregular: true },
        { base: 'launch', v2: 'launched', v3: 'launched', meaningAr: 'يطلق/يبدأ', isIrregular: false },
        { base: 'help', v2: 'helped', v3: 'helped', meaningAr: 'يساعد', isIrregular: false },
        { base: 'meet', v2: 'met', v3: 'met', meaningAr: 'يلتقي', isIrregular: true },
        { base: 'see', v2: 'saw', v3: 'seen', meaningAr: 'يرى', isIrregular: true }
      ],
      structures: [
        {
          formType: 'affirmative',
          formTitleAr: '1. الإثبات (Affirmative)',
          formTitleEn: 'Affirmative Structure',
          formula: 'Subject + will + Verb (Base) + Object / Time',
          explanationAr: 'الفاعل + will + الفعل في المصدر المجرد + المفعول به.',
          tableRows: [
            {
              subject: 'I / You / They',
              auxiliary: 'will (\'ll)',
              verb: 'visit',
              verbFormNote: 'مصدر مجرد Base',
              objectComplement: 'our new branch',
              timeMarker: 'tomorrow',
              fullSentence: 'We will visit our new branch tomorrow.',
              translationAr: 'سنزور فرعنا الجديد غداً.'
            },
            {
              subject: 'He / She',
              auxiliary: 'is going to',
              verb: 'buy',
              verbFormNote: 'مصدر مجرد Base',
              objectComplement: 'a new house',
              timeMarker: 'next month',
              fullSentence: 'She is going to buy a new house next month.',
              translationAr: 'هي تخطط لشراء منزل جديد الشهر القادم.'
            }
          ]
        },
        {
          formType: 'negative',
          formTitleAr: '2. النفي (Negative)',
          formTitleEn: 'Negative Structure',
          formula: 'Subject + will not (won\'t) + Verb (Base)',
          explanationAr: 'will not تختصر إلى won\'t ويتبعها الفعل المجرد.',
          tableRows: [
            {
              subject: 'They',
              auxiliary: "will not (won't)",
              verb: 'accept',
              verbFormNote: 'مصدر مجرد',
              objectComplement: 'this offer',
              fullSentence: "They won't accept this offer.",
              translationAr: 'هم لن يقبلوا بهذا العرض.'
            }
          ]
        },
        {
          formType: 'yes_no_question',
          formTitleAr: '3. سؤال نعم/لا (Yes/No Question)',
          formTitleEn: 'Yes/No Questions',
          formula: 'Will + Subject + Verb (Base) + Object?',
          explanationAr: 'نبدأ بـ Will + الفاعل + المصدر.',
          tableRows: [
            {
              subject: 'you',
              auxiliary: 'Will',
              verb: 'join',
              verbFormNote: 'مصدر',
              objectComplement: 'us for dinner?',
              fullSentence: 'Will you join us for dinner?',
              translationAr: 'هل ستنضم إلينا لتناول العشاء؟'
            }
          ]
        },
        {
          formType: 'wh_question',
          formTitleAr: '4. سؤال بأداة استفهام (Wh- Question)',
          formTitleEn: 'Wh- Questions',
          formula: 'Wh-word + will + Subject + Verb (Base)?',
          explanationAr: 'أداة الاستفهام + will + الفاعل + الفعل المصدر.',
          tableRows: [
            {
              subject: 'we',
              auxiliary: 'will',
              verb: 'meet',
              verbFormNote: 'Wh: When',
              objectComplement: 'again?',
              fullSentence: 'When will we meet again?',
              translationAr: 'متى سنلتقي مجدداً؟'
            }
          ]
        }
      ],
      builderParts: {
        subjects: [
          { text: 'I', type: 'i' },
          { text: 'The company', type: 'sing' },
          { text: 'We', type: 'plur' }
        ],
        auxiliaries: ['will', "won't", 'am going to', 'is going to', 'are going to'],
        verbs: [
          { base: 'launch', conjugated: 'launch', meaningAr: 'يطلق' },
          { base: 'travel', conjugated: 'travel', meaningAr: 'يسافر' },
          { base: 'support', conjugated: 'support', meaningAr: 'يدعم' }
        ],
        objects: ['the new service', 'to Japan next summer', 'our team'],
        timePhrases: ['tomorrow', 'next week', 'soon']
      }
    },
    mistakesLesson: {
      titleAr: 'أبرز وأهم الأخطاء الشائعة وطرق تجنبها',
      introAr: 'الفرق بين Will و Going to واستخدام المصدر بعد Will:',
      mistakes: [
        {
          id: 'fs_m1',
          categoryAr: 'إضافة s أو ed أو ing بعد Will',
          incorrect: 'He will travels / traveling tomorrow.',
          correct: 'He will travel tomorrow.',
          reasonAr: 'بعد will يأتي الفعل في صيغة المصدر الخالي من أي إضافات تماماً.',
          goldenRuleAr: 'القاعدة الذهبية: Will يدخل على الفعل ليجرده من أي إضافات (Base Form)!'
        },
        {
          id: 'fs_m2',
          categoryAr: 'نسيان فعل Be مع going to',
          incorrect: 'I going to study tonight.',
          correct: 'I am going to study tonight.',
          reasonAr: 'عبارة النية المستقبلية تتطلب وجود فعل be (am / is / are) قبل going to.',
          goldenRuleAr: 'القاعدة الذهبية: لا تقل going to وحدها، بل (am/is/are going to) دائماً!'
        }
      ],
      proTipsAr: [
        'للوعد أو القرار السريع استخدم: I will. للنية والخطة المعدة مسبقاً استخدم: I am going to.'
      ]
    },
    practiceLesson: {
      titleAr: 'تمارين تفاعلية متنوعة وشاملة',
      exercises: [
        {
          id: 'fs_q1',
          type: 'mcq',
          questionAr: 'اختر الصيغة المناسبة لقرار لحظي وعفوي (Instant Decision):',
          promptSentence: '"Someone is knocking on the door." - "I ______ it."',
          options: ['will open', 'am going to open', 'opened', 'opens'],
          correctAnswer: 'will open',
          explanationAr: 'الرد على فتح الباب هو قرار فوري وسريع في لحظة الكلام يتطلب استخدام (will open).'
        },
        {
          id: 'fs_q2',
          type: 'mcq',
          questionAr: 'اختر الصيغة المناسبة للتنبؤ المبني على دليل ملموس وواضح:',
          promptSentence: 'Look at those dark clouds! It ______ rain.',
          options: ['is going to', 'will', 'is raining to', 'rains'],
          correctAnswer: 'is going to',
          explanationAr: 'وجود دليل مرئي وحاضر (الغيوم الداكنة) يتطلب استخدام صيغة (is going to) للتنبؤ.'
        },
        {
          id: 'fs_q3',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين وعد مستقبلي باستخدام will:',
          scrambledWords: ['I', 'promise', 'will', 'help you', 'with your homework.'],
          correctAnswer: 'I promise I will help you with your homework.',
          explanationAr: 'الترتيب: I promise + (I will help you) + (with your homework).'
        },
        {
          id: 'fs_q4',
          type: 'error_correction',
          questionAr: 'حدد الخطأ بعد will وصححه (استخدام المصدر المجرد):',
          promptSentence: 'I think she will travels to Canada next month.',
          options: ['will travels -> will travel', 'think -> thinks', 'next -> last', 'to -> for'],
          correctAnswer: 'will travels -> will travel',
          explanationAr: 'بعد الفعل المساعد will، يجب دائماً استخدام الفعل في صيغة المصدر المجرد تماماً من أي إضافات (travel).'
        },
        {
          id: 'fs_q5',
          type: 'mcq',
          questionAr: 'اختر الصيغة المنفية الصحيحة لزمن المستقبل البسيط (will not):',
          promptSentence: 'They ______ attend the meeting tomorrow because they are sick.',
          options: ["won't", "don't", "aren't", "not will"],
          correctAnswer: "won't",
          explanationAr: 'اختصار (will not) في المستقبل البسيط هو (won\'t) متبوعاً بالمصدر.'
        },
        {
          id: 'fs_q6',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين سؤال مستقبلي بصيغة Will:',
          scrambledWords: ['Will', 'you', 'join us', 'for dinner', 'tomorrow?'],
          correctAnswer: 'Will you join us for dinner tomorrow?',
          explanationAr: 'الترتيب: Will + الفاعل (you) + الفعل مجرد (join us) + (for dinner) + الدلالة الزمنية (tomorrow?).'
        }
      ]
    },
    freeWriteLesson: {
      titleAr: 'تكوين الجمل الحر والمدرب الذكي',
      instructionAr: 'اكتب جملة تعبر عما ستفعله غداً أو في إجازتك القادمة باستخدام (will) أو (going to).',
      structuralGuide: 'S + will + V1 (Base) + Object + tomorrow / next ...',
      scenarios: [
        {
          titleAr: 'خطتك ليوم الغد (Tomorrow\'s Plan)',
          promptAr: 'اكتب عن نشاط أو مهمة تخطط للقيام بها غداً.',
          starter: 'Tomorrow, I will...',
          exampleTarget: 'Tomorrow, I will wake up early and complete my presentation.'
        }
      ]
    },
    finalExamLesson: {
      titleAr: 'الاختبار النهائي للوحدة وتقييم الإتقان',
      passingScorePercent: 80,
      questions: [
        {
          id: 'fs_fe1',
          question: 'Which sentence correctly expresses an instant, spontaneous decision made at the moment of speaking?',
          questionAr: 'أي من الجمل تعبر عن قرار فوري ولحظي اتُخذ في لحظة الكلام وفق قواعد استخدام will؟',
          options: [
            'The doorbell is ringing; I will answer it.',
            'The doorbell is ringing; I am answering it yesterday.',
            'The doorbell is ringing; I will answering it.',
            'The doorbell is ringing; I answered it tomorrow.'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لحالة الاستخدام 1 في الدرس 1: القرارات السريعة واللحظية المتخذة استجابة لموقف مفاجئ تصاغ باستخدام (will + المصدر المجرد).',
          category: 'usage',
          lessonRefAr: 'الدرس 1: الاستخدام والتفصيل (القرارات اللحظية السريعة)'
        },
        {
          id: 'fs_fe2',
          question: 'Which sentence correctly predicts an event based on visible physical evidence?',
          questionAr: 'أي من الجمل تعبر عن توقع قائم على دليل ملموس ومرئي وفق شرح الدرس 1؟',
          options: [
            'Look at those dark clouds! It is going to rain.',
            'Look at those dark clouds! It will raining.',
            'Look at those dark clouds! It rains tomorrow.',
            'Look at those dark clouds! It is rain.'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لحالة الاستخدام 3 في الدرس 1: عند وجود دليل مرئي ملموس (Look at those dark clouds) نستخدم (be going to) للتعبير عن التوقع الحتمي.',
          category: 'usage',
          lessonRefAr: 'الدرس 1: الاستخدام والتفصيل (التوقعات القائمة على دليل)'
        },
        {
          id: 'fs_fe3',
          question: 'According to the Golden Rule, what form of the verb must follow "will"?',
          questionAr: 'ما هي صيغة الفعل التي يجب أن تأتي بعد (will) مباشرة وفق "القاعدة الذهبية" في الدرس 3؟',
          options: [
            'Base Form (المصدر المجرد الخالي من أي إضافات)',
            'Past Form (V2)',
            'Past Participle (V3)',
            'Gerund (-ing)'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً للقاعدة الذهبية في الدرس 3: will يدخل على الفعل ليجرده تماماً من أي إضافات (بدون s، ed، أو ing).',
          category: 'mistake',
          lessonRefAr: 'الدرس 3: الأخطاء الشائعة والقاعدة الذهبية'
        },
        {
          id: 'fs_fe4',
          question: 'What is the correct negative contraction for "will not" according to the SVO table?',
          questionAr: 'ما هو الاختصار الصحيح للنفي مع will وفق جدول SVO في الدرس 2؟',
          options: [
            "won't (He won't travel)",
            "willn't (He willn't travel)",
            "don't will (He don't will travel)",
            "not will (He not will travel)"
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لجدول النفي في الدرس 2: تختصر (will not) إلى (won\'t) متبوعة بالمصدر المجرد.',
          category: 'structure',
          lessonRefAr: 'الدرس 2: جدول تركيب الجمل SVO (صيغة النفي)'
        },
        {
          id: 'fs_fe5',
          question: 'What is the mistake in: "I going to study medicine next year"?',
          questionAr: 'ما هو الخطأ النحوي في الجملة وفق القاعدة الذهبية لـ going to في الدرس 3؟',
          options: [
            'Missing the auxiliary verb "am" before going to (I am going to).',
            'Going to cannot be followed by study.',
            'Medicine is a singular noun.',
            'Next year can only be used with past simple.'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً للخطأ الشائع 2 والقاعدة الذهبية في الدرس 3: عبارة النية المستقبلية تتطلب وجود فعل be (am / is / are) قبل going to ولا يمكن حذفها.',
          category: 'mistake',
          lessonRefAr: 'الدرس 3: الأخطاء الشائعة وقاعدة (am/is/are going to)'
        }
      ]
    }
  },
  {
    id: 'future_continuous',
    nameEn: 'Future Continuous',
    nameAr: 'المستقبل المستمر',
    category: 'future',
    level: 'متوسط',
    shortFormula: 'Subject + will be + V-ing',
    summaryAr: 'يُستخدم لوصف حدث سيكون مستمراً وجارياً في وقت محدد في المستقبل.',
    timelineDescriptionAr: 'نشاط سيكون في قيد التنفيذ والاستمرار عند نقطة مستقبلية محددة.',
    timelinePoint: 1.8,
    usageLesson: {
      titleAr: 'الاستخدام والتفصيل مع أمثلة حية',
      overviewAr: 'المستقبل المستمر (Future Continuous) ينقلك عبر الزمن للمستقبل لترى نفسك في منتصف القيام بنشاط ما في ساعة معينة.',
      useCases: [
        {
          titleAr: '1. حدث سيكون في قيد الحدوث في وقت مستقبلي محدد (In Progress at a Future Point)',
          descriptionAr: 'تخيل ما ستكون منغمساً في فعله عند الساعة 5 مساء الغد.',
          examples: [
            {
              id: 'fc_f1',
              sentence: 'At 10 AM tomorrow, I will be taking my final exam.',
              translationAr: 'في تمام الساعة 10 صباح الغد، سأكون جالساً أؤدي اختباري النهائي.',
              contextAr: 'الامتحان سيكون مستمراً وجارياً في تلك اللحظة',
              subject: 'I',
              auxiliary: 'will be',
              verb: 'taking',
              complement: 'my final exam',
              timeMarker: 'At 10 AM tomorrow'
            },
            {
              id: 'fc_f2',
              sentence: 'This time next week, we will be relaxing on the beach.',
              translationAr: 'في مثل هذا الوقت من الأسبوع القادم، سنكون مسترخين على الشاطئ.',
              contextAr: 'استمرار الاسترخاء في وقت مستقبلي',
              subject: 'we',
              auxiliary: 'will be',
              verb: 'relaxing',
              complement: 'on the beach',
              timeMarker: 'This time next week'
            }
          ]
        }
      ],
      keywords: [
        { word: 'This time tomorrow / next week', meaningAr: 'في مثل هذا الوقت غداً / الأسبوع القادم', example: 'This time tomorrow, I will be flying.' },
        { word: 'At (specific time) tomorrow', meaningAr: 'في تمام الساعة... غداً', example: 'At 8 PM, she will be studying.' }
      ],
      timeConceptAr: 'نافذة زمنية مفتوحة في المستقبل يظهر فيها الحدث مستمراً.'
    },
    svoLesson: {
      titleAr: 'تركيب الجمل وجدول SVO + الأفعال المساعدة',
      rulesAr: [
        'التركيبة الثابتة لجميع الضمائر: will be + Verb-ing.',
        'في النفي: won\'t be + Verb-ing.'
      ],
      auxiliaryRulesAr: 'will be هي الأفعال المساعدة المدمجة لهذا الزمن.',
      goldenNotesAr: [
        'ملاحظة: نستخدم will be كفعل مساعد ثابت لجميع الضمائر بدون أي استثناء.',
        'يأتي بعد will be الفعل مضافاً إليه (-ing) للدلالة على الاستمرارية في المستقبل.',
        'في النفي: will not be تختصر إلى won\'t be.'
      ],
      subjectClassification: {
        singularPronouns: ['He (هو)', 'She (هي)', 'It (هو/هي لغير العاقل)'],
        singularNouns: [
          { en: 'The pilot', ar: 'الطيار' },
          { en: 'Mona', ar: 'منى' },
          { en: 'The student', ar: 'الطالب' },
          { en: 'The doctor', ar: 'الطبيب' }
        ],
        pluralPronouns: ['I (أنا)', 'You (أنت / أنتم)', 'They (هم)', 'We (نحن)'],
        pluralNouns: [
          { en: 'The team', ar: 'الفريق' },
          { en: 'Passengers', ar: 'الركاب' },
          { en: 'Friends', ar: 'الأصدقاء' },
          { en: 'Tourists', ar: 'السياح' }
        ]
      },
      verbTable: [
        { base: 'fly', v2: 'flew', v3: 'flying (ing)', meaningAr: 'يطير', isIrregular: true },
        { base: 'work', v2: 'worked', v3: 'working (ing)', meaningAr: 'يعمل', isIrregular: false },
        { base: 'study', v2: 'studied', v3: 'studying (ing)', meaningAr: 'يدرس', isIrregular: false },
        { base: 'travel', v2: 'traveled', v3: 'traveling (ing)', meaningAr: 'يسافر', isIrregular: false },
        { base: 'sleep', v2: 'slept', v3: 'sleeping (ing)', meaningAr: 'ينام', isIrregular: true }
      ],
      structures: [
        {
          formType: 'affirmative',
          formTitleAr: '1. الإثبات (Affirmative)',
          formTitleEn: 'Affirmative Structure',
          formula: 'Subject + will be + Verb-ing + Object',
          explanationAr: 'الفاعل + will be + الفعل-ing + التكملة.',
          tableRows: [
            {
              subject: 'I / They',
              auxiliary: 'will be',
              verb: 'flying',
              verbFormNote: 'will be + V-ing',
              objectComplement: 'over the Atlantic ocean',
              timeMarker: 'at noon tomorrow',
              fullSentence: 'They will be flying over the Atlantic ocean at noon tomorrow.',
              translationAr: 'سيكونون محلقين فوق المحيط الأطلسي ظهر الغد.'
            }
          ]
        }
      ],
      builderParts: {
        subjects: [
          { text: 'I', type: 'i' },
          { text: 'The team', type: 'sing' }
        ],
        auxiliaries: ['will be', "won't be"],
        verbs: [
          { base: 'work', conjugated: 'working', meaningAr: 'يعمل' },
          { base: 'travel', conjugated: 'traveling', meaningAr: 'يسافر' }
        ],
        objects: ['on the new update', 'across Europe'],
        timePhrases: ['at this time tomorrow', 'at 9 PM tonight']
      }
    },
    mistakesLesson: {
      titleAr: 'أبرز وأهم الأخطاء الشائعة وطرق تجنبها',
      introAr: 'نسيان كلمة be بين will و ing:',
      mistakes: [
        {
          id: 'fc_m1',
          categoryAr: 'حذف be من التركيب',
          incorrect: 'I will studying tomorrow at 5.',
          correct: 'I will be studying tomorrow at 5.',
          reasonAr: 'لا يمكن وضع will مع فعل منتهي بـ ing مباشرة بدون be.',
          goldenRuleAr: 'القاعدة الذهبية: Will be + V-ing ثنائي المستقبل المستمر!'
        }
      ],
      proTipsAr: ['أفعال الحالة (Stative) لا تستخدم في المستقبل المستمر.']
    },
    practiceLesson: {
      titleAr: 'تمارين تفاعلية متنوعة وشاملة',
      exercises: [
        {
          id: 'fc_q1',
          type: 'mcq',
          questionAr: 'اختر الصيغة الصحيحة لنشاط مستمر في نقطة محددة في المستقبل:',
          promptSentence: 'Don\'t call him at 9 PM. He ______ dinner with his family.',
          options: ['will be having', 'will have', 'is had', 'has been having'],
          correctAnswer: 'will be having',
          explanationAr: 'في تمام الساعة 9 سيكون في منتصف تناول العشاء ومستمراً فيه، لذا نستخدم (will be having).'
        },
        {
          id: 'fc_q2',
          type: 'mcq',
          questionAr: 'اختر التركيبة الصحيحة عند تحديد موعد محدد غداً (This time tomorrow):',
          promptSentence: 'This time tomorrow, we ______ over the Atlantic ocean.',
          options: ['will be flying', 'will fly', 'are fly', 'flew'],
          correctAnswer: 'will be flying',
          explanationAr: 'عبارة (This time tomorrow) تعبر عن استمرار الحدث في وقت دقيق مستقبلاً وتتطلب (will be flying).'
        },
        {
          id: 'fc_q3',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين جملة مستقبل مستمر مع تحديد وقت دقيق:',
          scrambledWords: ['At 3 PM,', 'I', 'will be', 'taking', 'my final exam.'],
          correctAnswer: 'At 3 PM, I will be taking my final exam.',
          explanationAr: 'الترتيب: (At 3 PM,) + الفاعل (I) + الفعل المساعد (will be) + الفعل-ing (taking) + المفعول به (my final exam).'
        },
        {
          id: 'fc_q4',
          type: 'error_correction',
          questionAr: 'اكتشف الخطأ في نسيان كلمة be بعد will وصححه:',
          promptSentence: 'Tomorrow at noon, she will sleeping in her room.',
          options: ['will sleeping -> will be sleeping', 'at -> on', 'sleeping -> sleep', 'her -> she'],
          correctAnswer: 'will sleeping -> will be sleeping',
          explanationAr: 'في المستقبل المستمر، يجب وضع be بين will والفعل المنتهي بـ (-ing).'
        },
        {
          id: 'fc_q5',
          type: 'mcq',
          questionAr: 'اختر السؤال المهذب عن الخطط باستخدام المستقبل المستمر:',
          promptSentence: '______ using your car this afternoon? Can I borrow it?',
          options: ['Will you be', 'Will you', 'Are you', 'Do you be'],
          correctAnswer: 'Will you be',
          explanationAr: 'يُستخدم المستقبل المستمر (Will you be using...?) كطريقة غاية في اللباقة والأدب للسؤال عن الخطط دون فرض.'
        },
        {
          id: 'fc_q6',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين جملة مستقبل مستمر منفية (won\'t be + V-ing):',
          scrambledWords: ['working', 'He', "won't be", 'this weekend.'],
          correctAnswer: "He won't be working this weekend.",
          explanationAr: 'الترتيب: الفاعل (He) + النفي (won\'t be) + الفعل-ing (working) + التكملة (this weekend).'
        }
      ]
    },
    freeWriteLesson: {
      titleAr: 'تكوين الجمل الحر والمدرب الذكي',
      instructionAr: 'اكتب جملة تصف ماذا ستكون تفعل في مثل هذا الوقت غداً أو الأسبوع القادم.',
      structuralGuide: 'At [time] tomorrow, I will be [V-ing] ...',
      scenarios: [
        {
          titleAr: 'نشاطك في وقت محدد غداً (Future Continuous Scenario)',
          promptAr: 'ماذا ستكون تفعل عند الساعة 7 مساء الغد؟',
          starter: 'At 7 PM tomorrow, I will be...',
          exampleTarget: 'At 7 PM tomorrow, I will be watching my favorite football match.'
        }
      ]
    },
    finalExamLesson: {
      titleAr: 'الاختبار النهائي للوحدة وتقييم الإتقان',
      passingScorePercent: 80,
      questions: [
        {
          id: 'fc_fe1',
          question: 'What is the standard structure of the Future Continuous tense according to the SVO table?',
          questionAr: 'ما هي التركيبة القياسية لزمن المستقبل المستمر وفق جدول SVO في الدرس 2؟',
          options: [
            'Subject + will be + Verb-ing',
            'Subject + will + V1',
            'Subject + will have + V3',
            'Subject + is/am/are + V1'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لجدول SVO في الدرس 2: تركيبة المستقبل المستمر الثابتة لجميع الضمائر هي (Subject + will be + Verb-ing).',
          category: 'structure',
          lessonRefAr: 'الدرس 2: جدول تركيب الجمل SVO'
        },
        {
          id: 'fc_fe2',
          question: 'Which sentence correctly describes an action that will be in progress at a specific time tomorrow?',
          questionAr: 'أي من الجمل تصف فعلاً سيكون جارياً ومستمراً في لحظة محددة غداً وفق الدرس 1؟',
          options: [
            'At 10 AM tomorrow, I will be taking my final exam.',
            'At 10 AM tomorrow, I took my final exam.',
            'At 10 AM tomorrow, I will taken my final exam.',
            'At 10 AM tomorrow, I am take my final exam.'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لمحور الاستخدام 1 في الدرس 1: عند تحديد ساعة معينة في المستقبل (At 10 AM tomorrow) نستخدم المستقبل المستمر (will be taking) للتعبير عن استمرار الفعل في تلك اللحظة.',
          category: 'usage',
          lessonRefAr: 'الدرس 1: الاستخدام والتفصيل (أحداث جارية في وقت مستقبلي محدد)'
        },
        {
          id: 'fc_fe3',
          question: 'According to the Golden Rule in Lesson 3, what is the mandatory word between "will" and "-ing"?',
          questionAr: 'وفقاً للقاعدة الذهبية في الدرس 3، ما هي الكلمة الإلزامية التي يجب أن تتوسط بين (will) والفعل المنتهي بـ (ing)؟',
          options: ['be (will be + V-ing)', 'have', 'been', 'is'],
          correctIndex: 0,
          explanationAr: 'وفقاً للقاعدة الذهبية في الدرس 3: لا يمكن الربط بين will والفعل المنتهي بـ ing مباشرة بدون كلمة (be).',
          category: 'mistake',
          lessonRefAr: 'الدرس 3: الأخطاء الشائعة والقاعدة الذهبية'
        },
        {
          id: 'fc_fe4',
          question: 'What is the negative form of "She will be sleeping at midnight"?',
          questionAr: 'ما هي صيغة النفي الصحيحة للجملة وفق جدول SVO في الدرس 2؟',
          options: [
            "She won't be sleeping at midnight.",
            "She will be not sleeping at midnight.",
            "She doesn't will be sleeping at midnight.",
            "She won't sleeping at midnight."
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لجدول النفي في الدرس 2: نضع not بعد will لتصبح (won\'t be sleeping).',
          category: 'structure',
          lessonRefAr: 'الدرس 2: جدول تركيب الجمل SVO (صيغة النفي)'
        },
        {
          id: 'fc_fe5',
          question: 'Which of the following is a classic keyword indicating the Future Continuous tense?',
          questionAr: 'أي من العبارات التالية تعتبر كلمة دالة ومميزة لزمن المستقبل المستمر وفق قائمة الكلمات الدالة؟',
          options: [
            'This time next week (في مثل هذا الوقت الأسبوع القادم)',
            'Yesterday morning',
            'Two days ago',
            'Since 2010'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لقائمة الكلمات الدالة في الدرس 1: عبارة (This time next week) تحدد نافذة مستقبلية يكون الفعل فيها مستمراً وجارياً.',
          category: 'usage',
          lessonRefAr: 'الدرس 1: الكلمات الدالة والتوقيتات المستقبلية'
        }
      ]
    }
  },
  {
    id: 'future_perfect',
    nameEn: 'Future Perfect',
    nameAr: 'المستقبل التام',
    category: 'future',
    level: 'متقدم',
    shortFormula: 'Subject + will have + V3 (Past Participle)',
    summaryAr: 'يُستخدم للتعبير عن حدث سيكتمل وينتهي تماماً قبل وقت محدد في المستقبل.',
    timelineDescriptionAr: 'حدث يكتمل قبل الوصول إلى نقطة زمنية مستقبلية.',
    timelinePoint: 2.3,
    usageLesson: {
      titleAr: 'الاستخدام والتفصيل مع أمثلة حية',
      overviewAr: 'المستقبل التام (Future Perfect) ينظر إلى المستقبل ويضع موعداً نهائياً (Deadline) يكون فيه الفعل قد انتهى واكتمل تماماً.',
      useCases: [
        {
          titleAr: '1. حدث يكتمل قبل موعد نهائي محدد في المستقبل (Completed Before a Future Deadline)',
          descriptionAr: 'بحلول عام 2030 أو بحلول الغد، سيكون المشروع قد اكتمل.',
          examples: [
            {
              id: 'fp_f1',
              sentence: 'By 5 PM, I will have finished this report.',
              translationAr: 'بحلول الساعة 5 مساءً، سأكون قد أنهيت هذا التقرير بالكامل.',
              contextAr: 'اكتمال التقرير قبل حلول الساعة 5',
              subject: 'I',
              auxiliary: 'will have',
              verb: 'finished (V3)',
              complement: 'this report',
              timeMarker: 'By 5 PM'
            },
            {
              id: 'fp_f2',
              sentence: 'By next year, they will have graduated from university.',
              translationAr: 'بحلول العام القادم، سيكونون قد تخرجوا من الجامعة.',
              contextAr: 'إتمام التخرج قبل العام القادم',
              subject: 'they',
              auxiliary: 'will have',
              verb: 'graduated (V3)',
              complement: 'from university',
              timeMarker: 'By next year'
            }
          ]
        }
      ],
      keywords: [
        { word: 'By (tomorrow / next year / 2030)', meaningAr: 'بحلول (غداً، العام القادم...)', example: 'By tomorrow, I will have sent it.' },
        { word: 'By the time + Present Simple', meaningAr: 'بحلول الوقت الذي...', example: 'By the time you arrive, we will have cooked dinner.' }
      ],
      timeConceptAr: 'نقطة اكتمال تسبق موعداً مستقبلياً محدداً (By...).'
    },
    svoLesson: {
      titleAr: 'تركيب الجمل وجدول SVO + الأفعال المساعدة',
      rulesAr: [
        'الصيغة الثابتة لجميع الضمائر: will have + V3 (Past Participle).',
        'في النفي: won\'t have + V3.'
      ],
      auxiliaryRulesAr: 'will have هي الأفعال المساعدة التي تسبق التصريف الثالث للفعل.',
      goldenNotesAr: [
        'ملاحظة: نستخدم will have لجميع الضمائر (I, you, he, she, it, we, they) ولا نستخدم will has أبداً.',
        'يأتي بعد will have التصريف الثالث للفعل V3 دائماً.',
        'في النفي: will not have تختصر إلى won\'t have + V3.'
      ],
      subjectClassification: {
        singularPronouns: ['He (هو)', 'She (هي)', 'It (هو/هي لغير العاقل)'],
        singularNouns: [
          { en: 'The engineer', ar: 'المهندس' },
          { en: 'Nora', ar: 'نورا' },
          { en: 'The company', ar: 'الشركة' },
          { en: 'The student', ar: 'الطالب' }
        ],
        pluralPronouns: ['I (أنا)', 'You (أنت / أنتم)', 'They (هم)', 'We (نحن)'],
        pluralNouns: [
          { en: 'The engineers', ar: 'المهندسون' },
          { en: 'The students', ar: 'الطلاب' },
          { en: 'Scientists', ar: 'العلماء' },
          { en: 'Developers', ar: 'المطورون' }
        ]
      },
      verbTable: [
        { base: 'complete', v2: 'completed', v3: 'completed', meaningAr: 'يكمل/يتم', isIrregular: false },
        { base: 'build', v2: 'built', v3: 'built', meaningAr: 'يبني', isIrregular: true },
        { base: 'graduate', v2: 'graduated', v3: 'graduated', meaningAr: 'يتخرج', isIrregular: false },
        { base: 'finish', v2: 'finished', v3: 'finished', meaningAr: 'ينهي', isIrregular: false },
        { base: 'save', v2: 'saved', v3: 'saved', meaningAr: 'يوفر/يدخر', isIrregular: false },
        { base: 'read', v2: 'read', v3: 'read', meaningAr: 'يقرأ', isIrregular: true }
      ],
      structures: [
        {
          formType: 'affirmative',
          formTitleAr: '1. الإثبات (Affirmative)',
          formTitleEn: 'Affirmative Structure',
          formula: 'Subject + will have + V3 + Object + By [time]',
          explanationAr: 'الفاعل + will have + V3 + التكملة + علامة By.',
          tableRows: [
            {
              subject: 'The engineers',
              auxiliary: 'will have',
              verb: 'built (V3)',
              verbFormNote: 'will have + V3',
              objectComplement: 'the bridge',
              timeMarker: 'by the end of the year',
              fullSentence: 'The engineers will have built the bridge by the end of the year.',
              translationAr: 'سيكون المهندسون قد بنوا الجسر بحلول نهاية العام.'
            }
          ]
        }
      ],
      builderParts: {
        subjects: [
          { text: 'I', type: 'i' },
          { text: 'She', type: 'sing' }
        ],
        auxiliaries: ['will have', "won't have"],
        verbs: [
          { base: 'complete', conjugated: 'completed', meaningAr: 'يكمل' },
          { base: 'save', conjugated: 'saved', meaningAr: 'يوفر' }
        ],
        objects: ['all the course modules', 'enough money for the car'],
        timePhrases: ['by next month', 'by 2028', 'by tomorrow evening']
      }
    },
    mistakesLesson: {
      titleAr: 'أبرز وأهم الأخطاء الشائعة وطرق تجنبها',
      introAr: 'استخدام will has مع الفاعل المفرد أو نسيان التصريف الثالث:',
      mistakes: [
        {
          id: 'fp_m1',
          categoryAr: 'استخدام has بعد will مع الفاعل المفرد (He/She)',
          incorrect: 'He will has finished by tomorrow.',
          correct: 'He will have finished by tomorrow.',
          reasonAr: 'بعد will يأتي المصدر دائماً وهو have، ولا يمكن كتابة will has أبداً في اللغة الإنجليزية.',
          goldenRuleAr: 'القاعدة الذهبية: بعد will تأتي have دائماً لجميع الضمائر حتى مع He و She!'
        }
      ],
      proTipsAr: ['كلمة By هي المفتاح السحري للمستقبل التام.']
    },
    practiceLesson: {
      titleAr: 'تمارين تفاعلية متنوعة وشاملة',
      exercises: [
        {
          id: 'fp_q1',
          type: 'mcq',
          questionAr: 'اختر الصيغة الصحيحة للمستقبل التام مع موعد مستقبلي محدد بـ By:',
          promptSentence: 'By next Friday, she ______ all her exams.',
          options: ['will have finished', 'will finish', 'has finished', 'is finishing'],
          correctAnswer: 'will have finished',
          explanationAr: 'وجود عبارة (By next Friday) تدل على اكتمال الفعل قبل موعد مستقبلي، فتتطلب (will have finished).'
        },
        {
          id: 'fp_q2',
          type: 'mcq',
          questionAr: 'اختر القاعدة الصحيحة بعد will (have ثابتة لجميع الضمائر):',
          promptSentence: 'By 2030, Ali ______ his master\'s degree.',
          options: ['will have earned', 'will has earned', 'will earned', 'has earned'],
          correctAnswer: 'will have earned',
          explanationAr: 'بعد will نستخدم have دائماً كمصدر، ولا يجوز استخدام has إطلاقاً حتى مع الفاعل المفرد (Ali).'
        },
        {
          id: 'fp_q3',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين جملة مستقبل تام مع By the time:',
          scrambledWords: ['By the time', 'you arrive,', 'we will have prepared', 'the dinner.'],
          correctAnswer: 'By the time you arrive, we will have prepared the dinner.',
          explanationAr: 'الترتيب: (By the time you arrive,) + (we will have prepared) + (the dinner).'
        },
        {
          id: 'fp_q4',
          type: 'error_correction',
          questionAr: 'اكتشف الخطأ في تصريف الفعل بعد will have وصححه (استخدام V3):',
          promptSentence: 'By tomorrow morning, they will have arrive at the hotel.',
          options: ['arrive -> arrived', 'will -> would', 'have -> has', 'at -> on'],
          correctAnswer: 'arrive -> arrived',
          explanationAr: 'بعد will have يجب استخدام التصريف الثالث V3 للفعل (arrived).'
        },
        {
          id: 'fp_q5',
          type: 'mcq',
          questionAr: 'اختر الجملة المنفية الصحيحة في زمن المستقبل التام:',
          promptSentence: 'By the end of this week, I ______ all the chapters.',
          options: ["won't have read", "won't read", "haven't read", "not will have read"],
          correctAnswer: "won't have read",
          explanationAr: 'النفي في المستقبل التام يكون بـ (won\'t have + V3).'
        },
        {
          id: 'fp_q6',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين سؤال مستقبلي تام بصيغة Will:',
          scrambledWords: ['Will', 'you', 'have completed', 'the project', 'by next Monday?'],
          correctAnswer: 'Will you have completed the project by next Monday?',
          explanationAr: 'ترتيب السؤال: Will + الفاعل (you) + have + التصريف الثالث (completed) + المفعول به (the project) + الكلمة الدالة (by next Monday?).'
        }
      ]
    },
    freeWriteLesson: {
      titleAr: 'تكوين الجمل الحر والمدرب الذكي',
      instructionAr: 'اكتب جملة تعبر عن هدف أو إنجاز ستكون قد أتممته بالكامل بحلول وقت محدد في المستقبل باستخدام (By...).',
      structuralGuide: 'By [future time], I will have [V3] ...',
      scenarios: [
        {
          titleAr: 'هدف مستقبلي بحلول العام القادم (Goal by Next Year)',
          promptAr: 'ماذا ستكون قد أنجزت أو تعلمت بحلول العام القادم؟',
          starter: 'By next year, I will have...',
          exampleTarget: 'By next year, I will have mastered all English grammar tenses.'
        }
      ]
    },
    finalExamLesson: {
      titleAr: 'الاختبار النهائي للوحدة وتقييم الإتقان',
      passingScorePercent: 80,
      questions: [
        {
          id: 'fp_fe1',
          question: 'Which sentence correctly expresses an action that will be completed before a future deadline?',
          questionAr: 'أي من الجمل تعبر عن حدث سيكتمل وينتهي تماماً قبل موعد نهائي محدد في المستقبل؟',
          options: [
            'By 5 PM, I will have finished this report.',
            'By 5 PM, I will finish this report yesterday.',
            'By 5 PM, I am finish this report.',
            'By 5 PM, I have finished this report tomorrow.'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لحالة الاستخدام 1 في الدرس 1: عند وضع موعد نهائي مستقبلي مسبوق بكلمة By (مثل: By 5 PM)، نستخدم المستقبل التام (will have finished).',
          category: 'usage',
          lessonRefAr: 'الدرس 1: الاستخدام والتفصيل (المواعيد النهائية والأحداث المكتملة)'
        },
        {
          id: 'fp_fe2',
          question: 'What is the Golden Rule in Lesson 3 regarding the auxiliary verb with singular subjects (He / She)?',
          questionAr: 'ما هي "القاعدة الذهبية" في الدرس 3 بخصوص الفعل المساعد مع الفواعل المفردة (He / She)؟',
          options: [
            'Always use "will have", never "will has", for all pronouns including He and She.',
            'Use "will has" for singular pronouns.',
            'Use "will having" for singular pronouns.',
            'Omit "have" with singular subjects.'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً للقاعدة الذهبية في الدرس 3: بعد will يأتي المصدر have دائماً لجميع الضمائر بلا استثناء، ولا يوجد will has في الإنجليزية.',
          category: 'mistake',
          lessonRefAr: 'الدرس 3: الأخطاء الشائعة والقاعدة الذهبية'
        },
        {
          id: 'fp_fe3',
          question: 'What is the magic keyword for the Future Perfect tense taught in the pro-tips?',
          questionAr: 'ما هي الكلمة الدالة التي وصفها الشرح بأنها "المفتاح السحري للمستقبل التام"؟',
          options: [
            'By (By tomorrow / By 2030 / By next week)',
            'Yesterday',
            'Ago',
            'Now'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لنصائح الخبراء وقائمة الكلمات الدالة في الدرس 1 والدرس 3: كلمة (By) هي المؤشر الدال على اكتمال الفعل قبل موعد مستقبلي.',
          category: 'usage',
          lessonRefAr: 'الدرس 1: الكلمات الدالة (المفتاح السحري By)'
        },
        {
          id: 'fp_fe4',
          question: 'What is the standard formula for Future Perfect affirmative sentences in the SVO table?',
          questionAr: 'ما هي التركيبة القياسية لجملة الإثبات في المستقبل التام وفق جدول SVO في الدرس 2؟',
          options: [
            'Subject + will have + V3 (Past Participle)',
            'Subject + will + V1',
            'Subject + will be + V-ing',
            'Subject + have been + V3'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لجدول SVO في الدرس 2: تركيبة الإثبات تتكون من الفاعل + will have + التصريف الثالث للفعل V3.',
          category: 'structure',
          lessonRefAr: 'الدرس 2: جدول تركيب الجمل SVO'
        },
        {
          id: 'fp_fe5',
          question: 'What tense is used in the time clause after "By the time": "By the time you ______ , we will have cooked dinner"?',
          questionAr: 'ما هو زمن الفعل الذي يتبع العبارة الزمنية (By the time) وفق أمثلة الدرس 1؟',
          options: [
            'arrive (Present Simple)',
            'will arrive',
            'arrived',
            'had arrived'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لقواعد الكلمات الدالة في الدرس 1: بعد عبارة (By the time) نستخدم المضارع البسيط (arrive) بينما الجملة الرئيسية تكون في المستقبل التام (will have cooked).',
          category: 'usage',
          lessonRefAr: 'الدرس 1: الكلمات الدالة والروابط الزمنية'
        }
      ]
    }
  },
  {
    id: 'future_perfect_continuous',
    nameEn: 'Future Perfect Continuous',
    nameAr: 'المستقبل التام المستمر',
    category: 'future',
    level: 'متقدم',
    shortFormula: 'Subject + will have been + V-ing',
    summaryAr: 'يُستخدم للتعبير عن استمرار نشاط لفرتة زمنية معينة حتى نصل إلى نقطة محددة في المستقبل.',
    timelineDescriptionAr: 'نشاط مستمر سيبلغ مدة زمنية محددة عند نقطة في المستقبل.',
    timelinePoint: 2.6,
    usageLesson: {
      titleAr: 'الاستخدام والتفصيل مع أمثلة حية',
      overviewAr: 'المستقبل التام المستمر (Future Perfect Continuous) يجمع بين أمرين: مدة استمرار النشاط (for 10 years)، ونقطة في المستقبل سنحتفل فيها بتمام هذه المدة (By next year).',
      useCases: [
        {
          titleAr: '1. قياس مدة استمرار نشاط حتى وقت مستقبلي (Duration of Action Up to a Future Point)',
          descriptionAr: 'حساب عدد السنوات أو الساعات التي ستكون قد قضيتها في فعل شيء عندما نصل لتاريخ مستقبلي.',
          examples: [
            {
              id: 'fpc_f1',
              sentence: 'By next month, I will have been working at this company for five years.',
              translationAr: 'بحلول الشهر القادم، سأكون قد أمضيت خمس سنوات وأنا أعمل في هذه الشركة.',
              contextAr: 'الاحتفال بمرور 5 سنوات مستمرة من العمل عند وصول الشهر القادم',
              subject: 'I',
              auxiliary: 'will have been',
              verb: 'working',
              complement: 'at this company',
              timeMarker: 'for five years by next month'
            }
          ]
        }
      ],
      keywords: [
        { word: 'By ... for (years/hours)', meaningAr: 'بحلول... لمدة...', example: 'By 2026, we will have been living here for 10 years.' }
      ],
      timeConceptAr: 'شريط نشاط ممتد يستمر ويبلغ مدة زمنية محددة عند نقطة مستقبلية.'
    },
    svoLesson: {
      titleAr: 'تركيب الجمل وجدول SVO + الأفعال المساعدة',
      rulesAr: [
        'التركيبة لجميع الضمائر: will have been + Verb-ing.',
        'في النفي: won\'t have been + Verb-ing.'
      ],
      auxiliaryRulesAr: 'will have been هي سلسلة الأفعال المساعدة الثابتة.',
      goldenNotesAr: [
        'ملاحظة: نستخدم will have been كفعل مساعد ثابت لجميع الضمائر بدون أي تغيير.',
        'يأتي بعد will have been الفعل مضافاً إليه (-ing) ليعبر عن استمرارية ممتدة حتى نقطة مستقبلية.',
        'في النفي نضع not بعد will: won\'t have been + Verb-ing.'
      ],
      subjectClassification: {
        singularPronouns: ['He (هو)', 'She (هي)', 'It (هو/هي لغير العاقل)'],
        singularNouns: [
          { en: 'The scientist', ar: 'العالم' },
          { en: 'The researcher', ar: 'الباحث' },
          { en: 'The doctor', ar: 'الطبيب' },
          { en: 'The student', ar: 'الطالب' }
        ],
        pluralPronouns: ['I (أنا)', 'You (أنت / أنتم)', 'They (هم)', 'We (نحن)'],
        pluralNouns: [
          { en: 'The scientists', ar: 'العلماء' },
          { en: 'Engineers', ar: 'المهندسون' },
          { en: 'Workers', ar: 'العمال' },
          { en: 'Colleagues', ar: 'الزملاء' }
        ]
      },
      verbTable: [
        { base: 'work', v2: 'worked', v3: 'working (ing)', meaningAr: 'يعمل', isIrregular: false },
        { base: 'study', v2: 'studied', v3: 'studying (ing)', meaningAr: 'يدرس', isIrregular: false },
        { base: 'live', v2: 'lived', v3: 'living (ing)', meaningAr: 'يعيش/يسكن', isIrregular: false },
        { base: 'teach', v2: 'taught', v3: 'teaching (ing)', meaningAr: 'يعلّم/يدرّس', isIrregular: true },
        { base: 'drive', v2: 'drove', v3: 'driving (ing)', meaningAr: 'يقود', isIrregular: true }
      ],
      structures: [
        {
          formType: 'affirmative',
          formTitleAr: '1. الإثبات (Affirmative)',
          formTitleEn: 'Affirmative Structure',
          formula: 'Subject + will have been + Verb-ing + for [duration] + by [time]',
          explanationAr: 'الفاعل + will have been + الفعل-ing + المدة + الوقت المستقبلي.',
          tableRows: [
            {
              subject: 'They',
              auxiliary: 'will have been',
              verb: 'driving',
              verbFormNote: 'will have been + V-ing',
              objectComplement: 'for eight hours by the time they arrive',
              fullSentence: 'They will have been driving for eight hours by the time they arrive.',
              translationAr: 'سيكونون قد قضوا 8 ساعات وهم يقودون بحلول وقت وصولهم.'
            }
          ]
        }
      ],
      builderParts: {
        subjects: [
          { text: 'I', type: 'i' },
          { text: 'The scientist', type: 'sing' }
        ],
        auxiliaries: ['will have been', "won't have been"],
        verbs: [
          { base: 'study', conjugated: 'studying', meaningAr: 'يدرس' },
          { base: 'research', conjugated: 'researching', meaningAr: 'يبحث' }
        ],
        objects: ['this medical problem', 'artificial intelligence'],
        timePhrases: ['for four years by next summer', 'for three hours by 6 PM']
      }
    },
    mistakesLesson: {
      titleAr: 'أبرز وأهم الأخطاء الشائعة وطرق تجنبها',
      introAr: 'استخدام هذا الزمن مع أفعال الحالة أو نسيان been:',
      mistakes: [
        {
          id: 'fpc_m1',
          categoryAr: 'نسيان كلمة been في الصيغة الرباعية',
          incorrect: 'I will have working for 5 years.',
          correct: 'I will have been working for 5 years.',
          reasonAr: 'التركيبة تتطلب will + have + been + Verb-ing.',
          goldenRuleAr: 'القاعدة الذهبية: will have been + ing سلسلة متماسكة لقياس المدة المستقبلية!'
        }
      ],
      proTipsAr: ['إذا كان الفعل غير مستمر (Stative) مثل know استخدم المستقبل التام البسيط: will have known.']
    },
    practiceLesson: {
      titleAr: 'تمارين تفاعلية متنوعة وشاملة',
      exercises: [
        {
          id: 'fpc_q1',
          type: 'mcq',
          questionAr: 'اختر الصيغة الصحيحة للتعبير عن مدة مستمرة حتى نقطة مستقبلية:',
          promptSentence: 'By next December, we ______ in this house for a decade.',
          options: ['will have been living', 'will be lived', 'have lived', 'will living'],
          correctAnswer: 'will have been living',
          explanationAr: 'الجملة تجمع بين موعد مستقبلي (By next December) ومدة زمنية (for a decade)، فتتطلب المستقبل التام المستمر (will have been living).'
        },
        {
          id: 'fpc_q2',
          type: 'mcq',
          questionAr: 'اختر صيغة السؤال عن استمرار المدة في نقطة مستقبلية:',
          promptSentence: 'How long ______ by the time you retire next year?',
          options: [
            'will you have been working',
            'will you be work',
            'have you worked',
            'are you working'
          ],
          correctAnswer: 'will you have been working',
          explanationAr: 'للسؤال عن المدة الإجمالية التي ستكون قد قضيتها في العمل بحلول موعد التقاعد، نستخدم (will you have been working).'
        },
        {
          id: 'fpc_q3',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين جملة مستقبل تام مستمر مع By next month:',
          scrambledWords: ['By next month,', 'she will have been', 'studying French', 'for two years.'],
          correctAnswer: 'By next month, she will have been studying French for two years.',
          explanationAr: 'الترتيب: (By next month,) + (she will have been) + (studying French) + (for two years).'
        },
        {
          id: 'fpc_q4',
          type: 'error_correction',
          questionAr: 'اكتشف الخطأ في نسيان been وصححه:',
          promptSentence: 'By 5 PM, they will have waiting for three hours.',
          options: ['have waiting -> have been waiting', 'By -> In', 'for -> since', 'waiting -> waited'],
          correctAnswer: 'have waiting -> have been waiting',
          explanationAr: 'التركيبة الرباعية للمستقبل التام المستمر تتطلب وجود been: (will have been + V-ing).'
        },
        {
          id: 'fpc_q5',
          type: 'mcq',
          questionAr: 'اختر الجملة الصحيحة مع أفعال الحالة (Stative Verbs):',
          promptSentence: 'By 2028, I ______ this car for 10 years.',
          options: ['will have had', 'will have been having', 'will be having', 'will have having'],
          correctAnswer: 'will have had',
          explanationAr: 'فعل الملكية (have a car) هو فعل حالة، لذا لا يقبل صيغة الاستمرار ونستخدم المستقبل التام البسيط (will have had).'
        },
        {
          id: 'fpc_q6',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين جملة تدل على مدة السياقة حتى الوصول:',
          scrambledWords: ['We will have been', 'driving for eight hours', 'by the time we arrive.'],
          correctAnswer: 'We will have been driving for eight hours by the time we arrive.',
          explanationAr: 'الترتيب: (We will have been) + (driving for eight hours) + (by the time we arrive).'
        }
      ]
    },
    freeWriteLesson: {
      titleAr: 'تكوين الجمل الحر والمدرب الذكي',
      instructionAr: 'اكتب جملة تحسب فيها كم سنة أو شهر ستكون قد قضيتها في دراسة أو عمل بحلول تاريخ مستقبلي.',
      structuralGuide: 'By next year, I will have been [V-ing] for [duration] ...',
      scenarios: [
        {
          titleAr: 'مدة قضاء عمل أو دراسة في المستقبل (Future Duration)',
          promptAr: 'احسب كم سنة ستكون قد درست أو عملت بحلول العام القادم.',
          starter: 'By next year, I will have been...',
          exampleTarget: 'By next year, I will have been learning English for two years.'
        }
      ]
    },
    finalExamLesson: {
      titleAr: 'الاختبار النهائي للوحدة وتقييم الإتقان',
      passingScorePercent: 80,
      questions: [
        {
          id: 'fpc_fe1',
          question: 'Which sentence correctly calculates the duration of an ongoing activity up to a future point?',
          questionAr: 'أي من الجمل تحسب بدقة مدة استمرار نشاط مستمر حتى الوصول لنقطة مستقبلية وفق الدرس 1؟',
          options: [
            'By next month, I will have been working at this company for five years.',
            'By next month, I will work at this company yesterday.',
            'By next month, I have been working since five years.',
            'By next month, I will be work for five years.'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لحالة الاستخدام 1 في الدرس 1: لحساب مدة إنجاز مستمر (for five years) عند بلوغ نقطة مستقبلية (By next month) نستخدم صيغة المستقبل التام المستمر (will have been working).',
          category: 'usage',
          lessonRefAr: 'الدرس 1: الاستخدام والتفصيل (قياس مدة استمرار نشاط حتى نقطة مستقبلية)'
        },
        {
          id: 'fpc_fe2',
          question: 'What is the full four-part auxiliary sequence for Future Perfect Continuous in the SVO table?',
          questionAr: 'ما هي سلسلة الأفعال المساعدة الرباعية الثابتة في جدول SVO في الدرس 2؟',
          options: [
            'Subject + will have been + Verb-ing',
            'Subject + will has been + Verb-ing',
            'Subject + will be having + Verb-ing',
            'Subject + will been + Verb-ing'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لجدول SVO في الدرس 2: التركيبة الثابتة لجميع الضمائر بدون استثناء هي (Subject + will have been + Verb-ing).',
          category: 'structure',
          lessonRefAr: 'الدرس 2: جدول تركيب الجمل SVO وقواعد الأفعال المساعدة'
        },
        {
          id: 'fpc_fe3',
          question: 'What is the Golden Rule in Lesson 3 regarding the word "been" in this tense?',
          questionAr: 'ما هي "القاعدة الذهبية" في الدرس 3 بخصوص كلمة (been) في تركيبة هذا الزمن؟',
          options: [
            'will have been + ing is a cohesive 4-part chain; been cannot be omitted.',
            'been is only used when the subject is plural.',
            'been can be replaced with being.',
            'been is an optional word for informal speech.'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً للقاعدة الذهبية في الدرس 3: السلسلة الرباعية (will have been + ing) متماسكة ولا يمكن حذف كلمة been منها.',
          category: 'mistake',
          lessonRefAr: 'الدرس 3: الأخطاء الشائعة والقاعدة الذهبية'
        },
        {
          id: 'fpc_fe4',
          question: 'How do we handle stative verbs (e.g. know, understand) instead of using Future Perfect Continuous?',
          questionAr: 'كيف نتعامل مع أفعال الحالة (مثل know و understand) وفق نصائح الخبراء في الدرس 3؟',
          options: [
            'Use Future Perfect Simple (will have known), never continuous (-ing).',
            'Use will have been knowing.',
            'Use will knowing.',
            'Stative verbs cannot be used with future time markers.'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لنصائح الخبراء في الدرس 3: أفعال الحالة لا تقبل الاستمرارية وتتحول تلقائياً إلى المستقبل التام البسيط (will have known).',
          category: 'mistake',
          lessonRefAr: 'الدرس 3: نصائح الخبراء وأفعال الحالة Stative Verbs'
        },
        {
          id: 'fpc_fe5',
          question: 'Choose the correct form to complete: "By 2030, they ______ in this city for twenty years."',
          questionAr: 'اختر الصيغة الصحيحة لإكمال الجملة المشتملة على موعد By ومدة for:',
          options: [
            'will have been living',
            'will be live',
            'have lived',
            'will have lived been'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لقائمة الكلمات الدالة في الدرس 1: اقتران (By 2030) مع مدة زمنية (for twenty years) يتطلب صيغة المستقبل التام المستمر (will have been living).',
          category: 'structure',
          lessonRefAr: 'الدرس 1: الكلمات الدالة والتركيب الزمني'
        }
      ]
    }
  }
];
