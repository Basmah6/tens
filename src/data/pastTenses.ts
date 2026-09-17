import { TenseData } from '../types';

export const pastTenses: TenseData[] = [
  {
    id: 'past_simple',
    nameEn: 'Past Simple',
    nameAr: 'الماضي البسيط',
    category: 'past',
    level: 'مبتدئ',
    shortFormula: 'Subject + V2 (ed / irregular) + Object',
    summaryAr: 'يُستخدم للتعبير عن أحداث وقعت وانتهت تماماً في وقت محدد في الماضي دون اتصال بالحاضر.',
    timelineDescriptionAr: 'حدث مكتمل في نقطة زمنية ماضية محددة.',
    timelinePoint: -1.5,
    usageLesson: {
      titleAr: 'الاستخدام والتفصيل مع أمثلة حية',
      overviewAr: 'الماضي البسيط (Past Simple) يصف أفعالاً بدأت واكتملت تماماً في الماضي في زمن محدد أو معروف في السياق.',
      useCases: [
        {
          titleAr: '1. أحداث وقعت واكتملت في وقت محدد في الماضي (Completed Past Actions)',
          descriptionAr: 'عندما تتحدث عن فعل بدأ وانتهى تماماً في الماضي مع ذكر أو معرفة الوقت المحدد لوقوعه (أمس، العام الماضي، قبل ساعتين).',
          examples: [
            {
              id: 'ps_p1',
              sentence: 'I visited London last summer.',
              translationAr: 'لقد زرت لندن الصيف الماضي.',
              contextAr: 'وقت محدد في الماضي (last summer) وفعل زيارة مكتمل تماماً.',
              subject: 'I',
              verb: 'visited (V2)',
              complement: 'London',
              timeMarker: 'last summer'
            },
            {
              id: 'ps_p2',
              sentence: 'She bought a new car yesterday.',
              translationAr: 'هي اشترت سيارة جديدة بالأمس.',
              contextAr: 'فعل شراء منتهٍ بالأمس مع استخدام فعل شاذ (buy -> bought).',
              subject: 'She',
              verb: 'bought (V2)',
              complement: 'a new car',
              timeMarker: 'yesterday'
            },
            {
              id: 'ps_p3',
              sentence: 'He played football two hours ago.',
              translationAr: 'هو لعب كرة القدم منذ ساعتين.',
              contextAr: 'فعل لعب كرة القدم انتهى قبل ساعتين تماماً.',
              subject: 'He',
              verb: 'played (V2)',
              complement: 'football',
              timeMarker: 'two hours ago'
            }
          ]
        },
        {
          titleAr: '2. سرد أحداث وقصص متتابعة في الماضي (Sequential Story Actions)',
          descriptionAr: 'عندما تسرد قصة أو أحداثاً متتابعة حدثت وراء بعضها البعض في الماضي.',
          examples: [
            {
              id: 'ps_p4',
              sentence: 'He woke up, brushed his teeth, and left the house.',
              translationAr: 'هو استيقظ، ثم نظف أسنانه، وغادر المنزل.',
              contextAr: 'تسلسل أفعال متتالية في الماضي.',
              subject: 'He',
              verb: 'woke up, brushed, left',
              complement: 'the house'
            }
          ]
        }
      ],
      keywords: [
        { word: 'Yesterday', meaningAr: 'أمس', example: 'I saw him yesterday.' },
        { word: 'Last (week / month / year)', meaningAr: 'الماضي (الأسبوع / الشهر / العام)', example: 'We traveled last month.' },
        { word: '... ago (2 days ago)', meaningAr: 'منذ... مضت', example: 'I arrived 10 minutes ago.' },
        { word: 'In (2018 / 2020)', meaningAr: 'في عام...', example: 'They built this house in 2018.' }
      ],
      timeConceptAr: 'نقطة مغلقة ومنتهية في الماضي ليس لها أي صلة مباشرة بالحاضر.'
    },
    svoLesson: {
      titleAr: 'تركيب الجمل وجدول SVO + الأفعال المساعدة',
      rulesAr: [
        'في الإثبات: نستخدم التصريف الثاني للفعل (V2). الأفعال المنتظمة تأخذ (-ed)، والأفعال الشاذة تتغير صيغتها تماماً (go -> went, see -> saw).',
        'في النفي والسؤال: نستخدم الفعل المساعد (did / didn\'t) لجميع الضمائر، ويعود الفعل الأساسي إلى صيغة المصدر المجرد (Base Form).'
      ],
      auxiliaryRulesAr: 'الفعل المساعد في الماضي البسيط هو Did لجميع الضمائر. يظهر فقط في حالتي النفي والسؤال!',
      goldenNotesAr: [
        'ملاحظة: في الإثبات نستخدم التصريف الثاني (V2) سواء كان منتظماً بإضافة ed أو شاذاً.',
        'ملاحظة هامة: عند استخدام didn\'t في النفي أو Did في السؤال، يعود الفعل الأساسي للمصدر المجرد فوراً!',
        'الفعل المساعد Did يُستخدم مع كافة الضمائر والأسماء (المفرد والجمع) بدون أي استثناء.'
      ],
      subjectClassification: {
        singularPronouns: ['He (هو)', 'She (هي)', 'It (هو/هي لغير العاقل)'],
        singularNouns: [
          { en: 'The teacher', ar: 'المعلم' },
          { en: 'Sarah', ar: 'سارة' },
          { en: 'The boy', ar: 'الولد' },
          { en: 'My brother', ar: 'أخي' }
        ],
        pluralPronouns: ['I (أنا)', 'You (أنت / أنتم)', 'They (هم)', 'We (نحن)'],
        pluralNouns: [
          { en: 'The students', ar: 'الطلاب' },
          { en: 'The players', ar: 'اللاعبون' },
          { en: 'Friends', ar: 'الأصدقاء' },
          { en: 'Parents', ar: 'الوالدان' }
        ]
      },
      verbTable: [
        { base: 'play', v2: 'played', v3: 'played', meaningAr: 'يلعب', isIrregular: false },
        { base: 'watch', v2: 'watched', v3: 'watched', meaningAr: 'يشاهد', isIrregular: false },
        { base: 'cook', v2: 'cooked', v3: 'cooked', meaningAr: 'يطبخ', isIrregular: false },
        { base: 'work', v2: 'worked', v3: 'worked', meaningAr: 'يعمل', isIrregular: false },
        { base: 'study', v2: 'studied', v3: 'studied', meaningAr: 'يدرس', isIrregular: false },
        { base: 'go', v2: 'went', v3: 'gone', meaningAr: 'يذهب', isIrregular: true },
        { base: 'see', v2: 'saw', v3: 'seen', meaningAr: 'يرى', isIrregular: true },
        { base: 'buy', v2: 'bought', v3: 'bought', meaningAr: 'يشتري', isIrregular: true },
        { base: 'write', v2: 'wrote', v3: 'written', meaningAr: 'يكتب', isIrregular: true }
      ],
      structures: [
        {
          formType: 'affirmative',
          formTitleAr: '1. الإثبات (Affirmative)',
          formTitleEn: 'Affirmative Structure',
          formula: 'Subject + Verb (V2) + Object / Time',
          explanationAr: 'الفاعل + التصريف الثاني للفعل (V2) + المفعول به.',
          tableRows: [
            {
              subject: 'I (أنا)',
              auxiliary: '-',
              verb: 'played',
              verbFormNote: 'V2 (منتظم)',
              objectComplement: 'football',
              timeMarker: 'yesterday',
              fullSentence: 'I played football yesterday.',
              translationAr: 'أنا لعبت كرة القدم أمس.'
            },
            {
              subject: 'He (هو)',
              auxiliary: '-',
              verb: 'watched',
              verbFormNote: 'V2 (منتظم)',
              objectComplement: 'a movie',
              timeMarker: 'last night',
              fullSentence: 'He watched a movie last night.',
              translationAr: 'هو شاهد فيلماً الليلة الماضية.'
            },
            {
              subject: 'She (هي)',
              auxiliary: '-',
              verb: 'cooked',
              verbFormNote: 'V2 (منتظم)',
              objectComplement: 'dinner',
              fullSentence: 'She cooked dinner.',
              translationAr: 'هي طبخت العشاء.'
            },
            {
              subject: 'You (أنت)',
              auxiliary: '-',
              verb: 'bought',
              verbFormNote: 'V2 (شاذ: buy -> bought)',
              objectComplement: 'a new phone',
              fullSentence: 'You bought a new phone.',
              translationAr: 'أنت اشتريت هاتفاً جديداً.'
            },
            {
              subject: 'They (هم)',
              auxiliary: '-',
              verb: 'went',
              verbFormNote: 'V2 (شاذ: go -> went)',
              objectComplement: 'to London',
              timeMarker: 'last year',
              fullSentence: 'They went to London last year.',
              translationAr: 'هم ذهبوا إلى لندن العام الماضي.'
            }
          ]
        },
        {
          formType: 'negative',
          formTitleAr: '2. النفي (Negative)',
          formTitleEn: 'Negative Structure',
          formula: 'Subject + did not (didn\'t) + Verb (Base Form) + Object',
          explanationAr: 'نضيف didn\'t ويعود الفعل إلى المصدر المجرد (Base Form).',
          tableRows: [
            {
              subject: 'I (أنا)',
              auxiliary: "did not (didn't)",
              verb: 'play',
              verbFormNote: 'مصدر مجرد play',
              objectComplement: 'football',
              fullSentence: "I didn't play football.",
              translationAr: 'أنا لم ألعب كرة القدم.'
            },
            {
              subject: 'He (هو)',
              auxiliary: "did not (didn't)",
              verb: 'watch',
              verbFormNote: 'مصدر مجرد watch',
              objectComplement: 'a movie',
              fullSentence: "He didn't watch a movie.",
              translationAr: 'هو لم يشاهد فيلماً.'
            },
            {
              subject: 'She (هي)',
              auxiliary: "did not (didn't)",
              verb: 'cook',
              verbFormNote: 'مصدر مجرد cook',
              objectComplement: 'dinner',
              fullSentence: "She didn't cook dinner.",
              translationAr: 'هي لم تطبخ العشاء.'
            },
            {
              subject: 'You (أنت)',
              auxiliary: "did not (didn't)",
              verb: 'buy',
              verbFormNote: 'يعود لمصدره buy وليس bought',
              objectComplement: 'a new phone',
              fullSentence: "You didn't buy a new phone.",
              translationAr: 'أنت لم تشترِ هاتفاً جديداً.'
            },
            {
              subject: 'They (هم)',
              auxiliary: "did not (didn't)",
              verb: 'go',
              verbFormNote: 'يعود لمصدره go وليس went',
              objectComplement: 'to London',
              fullSentence: "They didn't go to London.",
              translationAr: 'هم لم يذهبوا إلى لندن.'
            }
          ]
        },
        {
          formType: 'yes_no_question',
          formTitleAr: '3. تكوين السؤال (Questions)',
          formTitleEn: 'Question Structure',
          formula: 'Did + Subject + Verb (Base Form) + Object?',
          explanationAr: 'Did + الفاعل + الفعل في المصدر المجرد.',
          tableRows: [
            {
              subject: 'I',
              auxiliary: 'Did',
              verb: 'play',
              verbFormNote: 'مصدر مجرد',
              objectComplement: 'football?',
              fullSentence: 'Did I play football?',
              translationAr: 'هل أنا لعبت كرة القدم؟'
            },
            {
              subject: 'he',
              auxiliary: 'Did',
              verb: 'watch',
              verbFormNote: 'مصدر مجرد',
              objectComplement: 'a movie?',
              fullSentence: 'Did he watch a movie?',
              translationAr: 'هل هو شاهد فيلماً؟'
            },
            {
              subject: 'she',
              auxiliary: 'Did',
              verb: 'cook',
              verbFormNote: 'مصدر مجرد',
              objectComplement: 'dinner?',
              fullSentence: 'Did she cook dinner?',
              translationAr: 'هل هي طبخت العشاء؟'
            },
            {
              subject: 'you',
              auxiliary: 'Did',
              verb: 'buy',
              verbFormNote: 'مصدر مجرد buy',
              objectComplement: 'a new phone?',
              fullSentence: 'Did you buy a new phone?',
              translationAr: 'هل أنت اشتريت هاتفاً جديداً؟'
            },
            {
              subject: 'they',
              auxiliary: 'Did',
              verb: 'go',
              verbFormNote: 'مصدر مجرد go',
              objectComplement: 'to London?',
              fullSentence: 'Did they go to London?',
              translationAr: 'هل هم ذهبوا إلى لندن؟'
            }
          ]
        }
      ],
      builderParts: {
        subjects: [
          { text: 'They', type: 'plur' },
          { text: 'She', type: 'sing' },
          { text: 'I', type: 'i' }
        ],
        auxiliaries: ['(None)', "didn't", 'Did'],
        verbs: [
          { base: 'buy', conjugated: 'bought', meaningAr: 'اشترى' },
          { base: 'visit', conjugated: 'visited', meaningAr: 'زار' },
          { base: 'find', conjugated: 'found', meaningAr: 'وجد' }
        ],
        objects: ['the lost key', 'a delicious dinner', 'the old museum'],
        timePhrases: ['yesterday', 'last weekend', 'two days ago']
      }
    },
    mistakesLesson: {
      titleAr: 'أبرز وأهم الأخطاء الشائعة وطرق تجنبها',
      introAr: 'إليك أشهر خطأين يقع فيهما المتعلمون في الماضي البسيط:',
      mistakes: [
        {
          id: 'past_m1',
          categoryAr: 'إبقاء الفعل في الماضي بعد did أو didn\'t',
          incorrect: 'I didn\'t went to school yesterday.',
          correct: 'I didn\'t go to school yesterday.',
          reasonAr: 'الفعل المساعد didn\'t يحمل صيغة الماضي بنفسه، لذلك يجب أن يعود الفعل الأساسي إلى المصدر المجرد (Base Form).',
          goldenRuleAr: 'القاعدة الذهبية: Did و Didn\'t تسرق الماضي من الفعل الأساسي وتعيده للمصدر المجرد!'
        },
        {
          id: 'past_m2',
          categoryAr: 'إضافة ed إلى فعل شاذ (Irregular Verb)',
          incorrect: 'He goed / eated / buyed a ticket.',
          correct: 'He went / ate / bought a ticket.',
          reasonAr: 'الأفعال الشاذة لا تقبل -ed، بل لها تصريف خاص يجب حفظه.',
          goldenRuleAr: 'القاعدة الذهبية: احفظ قائمة أهم 50 فعلاً شاذاً لتتقن الماضي البسيط!'
        }
      ],
      proTipsAr: [
        'مع فعل be في الماضي (was/were) لا نستخدم did في السؤال أو النفي: Was he at home? (وليس Did he be).'
      ]
    },
    practiceLesson: {
      titleAr: 'تمارين تفاعلية متنوعة وشاملة',
      exercises: [
        {
          id: 'past_q1',
          type: 'mcq',
          questionAr: 'اختر التصريف الثاني الصحيح للفعل الشاذ (Irregular Verb):',
          promptSentence: 'Yesterday, we ______ a great movie at the cinema.',
          options: ['see', 'saw', 'seen', 'seeing'],
          correctAnswer: 'saw',
          explanationAr: 'الفعل see فعل شاذ، والتصريف الثاني له في الماضي البسيط (V2) هو saw.'
        },
        {
          id: 'past_q2',
          type: 'mcq',
          questionAr: 'اختر الجملة المنفية الصحيحة مع إعادة الفعل للمصدر بعد didn\'t:',
          promptSentence: 'Which negative sentence is correct?',
          options: [
            "She didn't bought the dress.",
            "She didn't buy the dress.",
            "She not bought the dress.",
            "She wasn't buy the dress."
          ],
          correctAnswer: "She didn't buy the dress.",
          explanationAr: 'بعد didn\'t يجب أن يعود الفعل الأساسي إلى صيغة المصدر المجرد (buy).'
        },
        {
          id: 'past_q3',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين سؤال صحيح باستخدام did:',
          scrambledWords: ['Did', 'you', 'call', 'last night?', 'your brother'],
          correctAnswer: 'Did you call your brother last night?',
          explanationAr: 'الترتيب الصحيح للسؤال في الماضي البسيط: Did + الفاعل (you) + الفعل مجرد (call) + المفعول به (your brother) + الدلالة الزمنية (last night?).'
        },
        {
          id: 'past_q4',
          type: 'error_correction',
          questionAr: 'حدد الخطأ في تصريف الفعل المنتظم وصححه:',
          promptSentence: 'He stoped his car suddenly when the light turned red.',
          options: ['stoped -> stopped', 'turned -> turn', 'his -> him', 'when -> while'],
          correctAnswer: 'stoped -> stopped',
          explanationAr: 'الفعل stop ينتهي بساكن قبله متحرك قصير، لذا نضاعف حرف الـ p عند إضافة ed لتصبح (stopped).'
        },
        {
          id: 'past_q5',
          type: 'mcq',
          questionAr: 'اختر الفعل المساعد المناسب مع فعل الكينونة be في الماضي:',
          promptSentence: 'Where ______ you yesterday afternoon?',
          options: ['did', 'were', 'was', 'are'],
          correctAnswer: 'were',
          explanationAr: 'مع الضمير you وفعل الكينونة (be) في الماضي، نستخدم (were) للسؤال عن المكان/الحالة بدون did.'
        },
        {
          id: 'past_q6',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين جملة ماضٍ بسيط مع ago:',
          scrambledWords: ['arrived', 'They', 'in London', 'two days ago.'],
          correctAnswer: 'They arrived in London two days ago.',
          explanationAr: 'الترتيب: الفاعل (They) + الفعل في الماضي (arrived) + شبه الجملة المكانية (in London) + الفترة مع ago (two days ago).'
        }
      ]
    },
    freeWriteLesson: {
      titleAr: 'تكوين الجمل الحر والمدرب الذكي',
      instructionAr: 'اكتب جملة عن حدث قمت به وانتهيت منه تماماً بالأمس أو الأسبوع الماضي مع ذكر وقت محدد.',
      structuralGuide: 'S + V2 (ed / irregular) + Object + (yesterday / last week / ago)',
      scenarios: [
        {
          titleAr: 'ماذا فعلت بالأمس؟ (Yesterday\'s Activity)',
          promptAr: 'اكتب عن وجبة أكلتها، شخص قابلته، أو فيلم شاهدته بالأمس.',
          starter: 'Yesterday, I...',
          exampleTarget: 'Yesterday, I visited my friend and we had lunch together.'
        }
      ]
    },
    finalExamLesson: {
      titleAr: 'الاختبار النهائي للوحدة وتقييم الإتقان',
      passingScorePercent: 80,
      questions: [
        {
          id: 'past_fe1',
          question: 'Which question is formed correctly in the Past Simple according to the SVO table?',
          questionAr: 'أي من الأسئلة التالية مركب بشكل صحيح في الماضي البسيط وفق جدول تكوين السؤال؟',
          options: [
            'Did you went to the conference?',
            'Did you go to the conference?',
            'Were you go to the conference?',
            'Do you went to the conference?'
          ],
          correctIndex: 1,
          explanationAr: 'وفقاً لجدول تكوين السؤال في الدرس 2: عند السؤال في الماضي البسيط نستخدم الفعل المساعد (Did) متبوعاً بالفاعل ثم يعود الفعل للمصدر المجرد (go).',
          category: 'structure',
          lessonRefAr: 'الدرس 2: جدول تركيب الجمل SVO (تكوين السؤال)'
        },
        {
          id: 'past_fe2',
          question: 'What is the past simple (V2) form of the irregular verb "teach" as taught in the lesson?',
          questionAr: 'ما هو تصريف الفعل الشاذ (teach) في الماضي البسيط V2 وفق ما ورد في الشرح؟',
          options: ['teached', 'taught', 'toight', 'teachen'],
          correctIndex: 1,
          explanationAr: 'وفقاً لقواعد تصريف الأفعال الشاذة في الدرس 2: الفعل teach غير منتظم وتصريفه الثاني في الماضي هو (taught).',
          category: 'conjugation',
          lessonRefAr: 'الدرس 2: جدول تركيب الجمل والأفعال الشاذة'
        },
        {
          id: 'past_fe3',
          question: 'Which sentence correctly describes a completed action at a specific past time?',
          questionAr: 'أي من الجمل التالية تصف حدثاً مكتملاً في وقت ماضٍ محدد وفق قواعد الاستخدام؟',
          options: [
            'She bought a new car yesterday.',
            'She buys a new car yesterday.',
            'She is buying a new car yesterday.',
            'She has bought a new car yesterday.'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لحالة الاستخدام 1 في الدرس 1: عند وجود كلمة دالة على وقت ماضٍ محدد مثل (yesterday) نستخدم الماضي البسيط مع التصريف الثاني (bought).',
          category: 'usage',
          lessonRefAr: 'الدرس 1: الاستخدام والتفصيل (الأحداث المكتملة في الماضي)'
        },
        {
          id: 'past_fe4',
          question: 'What is the correct negative sentence according to the Golden Rule for "didn\'t"?',
          questionAr: 'ما هي الجملة المنفية الصحيحة وفق "القاعدة الذهبية" للفعل المساعد didn\'t؟',
          options: [
            "She didn't bought the dress.",
            "She didn't buy the dress.",
            "She not bought the dress.",
            "She wasn't buy the dress."
          ],
          correctIndex: 1,
          explanationAr: 'وفقاً للقاعدة الذهبية في الدرس 3: وجود (didn\'t) يسحب الماضي من الفعل الأساسي ويعيده فوراً إلى صيغة المصدر المجرد (buy).',
          category: 'mistake',
          lessonRefAr: 'الدرس 3: الأخطاء الشائعة والقاعدة الذهبية'
        },
        {
          id: 'past_fe5',
          question: 'Which keyword indicates a specific period that has already passed (e.g. 2 hours)?',
          questionAr: 'أي من الكلمات الدالة التالية تستخدم مع المدة الماضية المنقضية (مثل: منذ ساعتين)؟',
          options: ['since', 'ago (two hours ago)', 'already', 'yet'],
          correctIndex: 1,
          explanationAr: 'وفقاً لقائمة الكلمات الدالة في الدرس 1: كلمة (ago) تأتي بعد المدة الزمنية لتدل على انقضائها في الماضي البسيط.',
          category: 'usage',
          lessonRefAr: 'الدرس 1: الكلمات الدالة على الماضي البسيط'
        }
      ]
    }
  },
  {
    id: 'past_continuous',
    nameEn: 'Past Continuous',
    nameAr: 'الماضي المستمر',
    category: 'past',
    level: 'متوسط',
    shortFormula: 'Subject + was/were + V-ing',
    summaryAr: 'يُستخدم لوصف حدث كان مستمراً في نقطة محددة في الماضي، أو حدث كان مستمراً فقاطعه حدث آخر قصير.',
    timelineDescriptionAr: 'فترة نشاط استمرت في الماضي، غالباً ما تتقاطع مع أحداث أخرى.',
    timelinePoint: -1.2,
    usageLesson: {
      titleAr: 'الاستخدام والتفصيل مع أمثلة حية',
      overviewAr: 'الماضي المستمر (Past Continuous) يرسم خلفية المشهد في الماضي؛ كأنك تشاهد لقطة فيديو لحدث كان يجري في وقت محدد أو عندما قاطعه حدث مفاجئ.',
      useCases: [
        {
          titleAr: '1. حدث كان مستمراً في ساعة محددة في الماضي (Action in Progress at Specific Past Time)',
          descriptionAr: 'ماذا كنت تفعل بالضبط عند الساعة 8 مساء أمس؟',
          examples: [
            {
              id: 'pc_p1',
              sentence: 'At 8 PM last night, I was reading a novel.',
              translationAr: 'في تمام الساعة 8 مساء أمس، كنت أقرأ رواية.',
              contextAr: 'الحدث كان جارياً ومستمراً في تلك الساعة المحددة',
              subject: 'I',
              auxiliary: 'was',
              verb: 'reading',
              complement: 'a novel',
              timeMarker: 'At 8 PM last night'
            }
          ]
        },
        {
          titleAr: '2. حدث طويل قاطعه حدث ماضٍ قصير (Interrupted Action with While / When)',
          descriptionAr: 'بينما كنت أقوم بعمل مستمر (ماضي مستمر)، حدث شيء مفاجئ قاطعني (ماضي بسيط).',
          examples: [
            {
              id: 'pc_p2',
              sentence: 'While I was driving, my phone rang.',
              translationAr: 'بينما كنت أقود السيارة، رن هاتفي.',
              contextAr: 'القيادة كانت مستمرة (driving)، ورنين الهاتف قاطعها (rang)',
              subject: 'I / my phone',
              auxiliary: 'was',
              verb: 'driving / rang',
              complement: 'While...'
            }
          ]
        },
        {
          titleAr: '3. حدثان كانا مستمرين في نفس الوقت (Parallel Past Actions)',
          descriptionAr: 'شخصان يفعلان أمرين مستمرين في نفس اللحظة في الماضي.',
          examples: [
            {
              id: 'pc_p3',
              sentence: 'While Sarah was cooking, her brother was studying.',
              translationAr: 'بينما كانت سارة تطبخ، كان أخوها يدرس.',
              contextAr: 'حدثان متوازيان في الماضي',
              subject: 'Sarah / her brother',
              auxiliary: 'was',
              verb: 'cooking / studying',
              complement: 'simultaneously'
            }
          ]
        }
      ],
      keywords: [
        { word: 'While / As', meaningAr: 'بينما (يتبعهما ماضٍ مستمر)', example: 'While he was sleeping, it rained.' },
        { word: 'When', meaningAr: 'عندما (يتبعه ماضٍ بسيط)', example: 'I was sleeping when the alarm went off.' },
        { word: 'At this time yesterday', meaningAr: 'في مثل هذا الوقت أمس', example: 'At this time yesterday, we were flying.' },
        { word: 'All night / All day', meaningAr: 'طوال الليل / طوال اليوم', example: 'He was studying all night.' }
      ],
      timeConceptAr: 'شريط ممتد في الماضي يحدد استمرارية حدث قاطعه حدث آخر قصير.'
    },
    svoLesson: {
      titleAr: 'تركيب الجمل وجدول SVO + الأفعال المساعدة',
      rulesAr: [
        'نستخدم was مع الضمائر (I, He, She, It) وأسماء المفرد.',
        'نستخدم were مع الضمائر (You, We, They) وأسماء الجمع.',
        'الفعل الأساسي دائماً ينتهي بـ (-ing).',
        'في النفي: wasn\'t أو weren\'t + Verb-ing.'
      ],
      auxiliaryRulesAr: 'الأفعال المساعدة هي was و were (الماضي من verb to be).',
      goldenNotesAr: [
        'ملاحظة: نستخدم was مع (I, he, she, it) والاسم المفرد، ونستخدم were مع (you, we, they) واسم الجمع.',
        'الفعل الأساسي في الماضي المستمر يأخذ دائماً اللاحقة (-ing) بعد الفعل المساعد.',
        'في النفي نضيف not بعد الفعل المساعد لتصبح: wasn\'t / weren\'t.'
      ],
      subjectClassification: {
        singularPronouns: ['I (أنا)', 'He (هو)', 'She (هي)', 'It (هو/هي لغير العاقل)'],
        singularNouns: [
          { en: 'The teacher', ar: 'المعلم' },
          { en: 'Fahad', ar: 'فهد' },
          { en: 'The girl', ar: 'الفتاة' },
          { en: 'My friend', ar: 'صديقي' }
        ],
        pluralPronouns: ['You (أنت / أنتم)', 'They (هم)', 'We (نحن)'],
        pluralNouns: [
          { en: 'The students', ar: 'الطلاب' },
          { en: 'The children', ar: 'الأطفال' },
          { en: 'Workers', ar: 'العمال' },
          { en: 'Engineers', ar: 'المهندسون' }
        ]
      },
      verbTable: [
        { base: 'read', v2: 'read', v3: 'reading (ing)', meaningAr: 'يقرأ', isIrregular: true },
        { base: 'drive', v2: 'drove', v3: 'driving (ing)', meaningAr: 'يقود', isIrregular: true },
        { base: 'cook', v2: 'cooked', v3: 'cooking (ing)', meaningAr: 'يطبخ', isIrregular: false },
        { base: 'sleep', v2: 'slept', v3: 'sleeping (ing)', meaningAr: 'ينام', isIrregular: true },
        { base: 'play', v2: 'played', v3: 'playing (ing)', meaningAr: 'يلعب', isIrregular: false },
        { base: 'study', v2: 'studied', v3: 'studying (ing)', meaningAr: 'يدرس', isIrregular: false },
        { base: 'watch', v2: 'watched', v3: 'watching (ing)', meaningAr: 'يشاهد', isIrregular: false }
      ],
      structures: [
        {
          formType: 'affirmative',
          formTitleAr: '1. الإثبات (Affirmative)',
          formTitleEn: 'Affirmative Structure',
          formula: 'Subject + was/were + Verb-ing + Object',
          explanationAr: 'الفاعل + was/were + الفعل-ing + التكملة.',
          tableRows: [
            {
              subject: 'I / She',
              auxiliary: 'was',
              verb: 'writing',
              verbFormNote: 'was + V-ing',
              objectComplement: 'an important report',
              timeMarker: 'at 4 PM yesterday',
              fullSentence: 'She was writing an important report at 4 PM yesterday.',
              translationAr: 'كانت تكتب تقريراً مهماً عند الساعة 4 مساء أمس.'
            },
            {
              subject: 'They / We',
              auxiliary: 'were',
              verb: 'playing',
              verbFormNote: 'were + V-ing',
              objectComplement: 'tennis when it started to rain',
              fullSentence: 'They were playing tennis when it started to rain.',
              translationAr: 'كانوا يلعبون التنس عندما بدأ المطر بالهطول.'
            }
          ]
        },
        {
          formType: 'negative',
          formTitleAr: '2. النفي (Negative)',
          formTitleEn: 'Negative Structure',
          formula: 'Subject + wasn\'t / weren\'t + Verb-ing',
          explanationAr: 'نضيف not بعد was أو were.',
          tableRows: [
            {
              subject: 'He',
              auxiliary: "was not (wasn't)",
              verb: 'paying',
              verbFormNote: 'V-ing',
              objectComplement: 'attention during the lecture',
              fullSentence: "He wasn't paying attention during the lecture.",
              translationAr: 'لم يكن ينتبه أثناء المحاضرة.'
            }
          ]
        },
        {
          formType: 'yes_no_question',
          formTitleAr: '3. سؤال نعم/لا (Yes/No Question)',
          formTitleEn: 'Yes/No Questions',
          formula: 'Was / Were + Subject + Verb-ing + Object?',
          explanationAr: 'Was/Were + الفاعل + الفعل-ing.',
          tableRows: [
            {
              subject: 'you',
              auxiliary: 'Were',
              verb: 'sleeping',
              verbFormNote: 'V-ing',
              objectComplement: 'when I called you?',
              fullSentence: 'Were you sleeping when I called you?',
              translationAr: 'هل كنت نائماً عندما اتصلت بك؟'
            }
          ]
        },
        {
          formType: 'wh_question',
          formTitleAr: '4. سؤال بأداة استفهام (Wh- Question)',
          formTitleEn: 'Wh- Questions',
          formula: 'Wh-word + was/were + Subject + Verb-ing?',
          explanationAr: 'أداة الاستفهام + was/were + الفاعل + الفعل-ing.',
          tableRows: [
            {
              subject: 'they',
              auxiliary: 'were',
              verb: 'doing',
              verbFormNote: 'Wh: What',
              objectComplement: 'at 10 PM last night?',
              fullSentence: 'What were they doing at 10 PM last night?',
              translationAr: 'ماذا كانوا يفعلون عند الساعة 10 مساء أمس؟'
            }
          ]
        }
      ],
      builderParts: {
        subjects: [
          { text: 'I', type: 'i' },
          { text: 'They', type: 'plur' },
          { text: 'My friend', type: 'sing' }
        ],
        auxiliaries: ['was', 'were', "wasn't", "weren't"],
        verbs: [
          { base: 'drive', conjugated: 'driving', meaningAr: 'يقود' },
          { base: 'study', conjugated: 'studying', meaningAr: 'يدرس' },
          { base: 'cook', conjugated: 'cooking', meaningAr: 'يطبخ' }
        ],
        objects: ['home from work', 'for the chemistry exam', 'dinner for the guests'],
        timePhrases: ['when the lights went out', 'all evening', 'at 6 PM yesterday']
      }
    },
    mistakesLesson: {
      titleAr: 'أبرز وأهم الأخطاء الشائعة وطرق تجنبها',
      introAr: 'الخلط بين When و While واستخدام was/were مع الضمير I:',
      mistakes: [
        {
          id: 'pc_m1',
          categoryAr: 'استخدام were بدلاً من was مع الضمير I',
          incorrect: 'I were watching TV.',
          correct: 'I was watching TV.',
          reasonAr: 'الضمير (I) يأخذ (was) في الماضي، تماماً مثل He و She و It.',
          goldenRuleAr: 'القاعدة الذهبية: I تأخذ was في الماضي المستمر!'
        },
        {
          id: 'pc_m2',
          categoryAr: 'وضع ماضٍ بسيط بعد While بدلاً من مستمر',
          incorrect: 'While I cooked, my phone rang.',
          correct: 'While I was cooking, my phone rang.',
          reasonAr: 'كلمة While تعني "أثناء/بينما" وتتطلب دائماً الحدث الطويل المستمر (was/were + ing).',
          goldenRuleAr: 'القاعدة الذهبية: كلمة While تحب الاستمرار (was/were + ing) بعدها مباشرة!'
        }
      ],
      proTipsAr: [
        'تذكر المعادلة السحرية: While + Past Continuous, Past Simple — أو — Past Continuous + when + Past Simple.'
      ]
    },
    practiceLesson: {
      titleAr: 'تمارين تفاعلية متنوعة وشاملة',
      exercises: [
        {
          id: 'pc_q1',
          type: 'mcq',
          questionAr: 'اختر الصيغة الصحيحة للحدث المستمر بعد While:',
          promptSentence: 'While they ______ football, it started to snow.',
          options: ['played', 'were playing', 'are playing', 'was playing'],
          correctAnswer: 'were playing',
          explanationAr: 'بعد كلمة While ومع الفاعل الجمع (they)، نستخدم الماضي المستمر (were playing).'
        },
        {
          id: 'pc_q2',
          type: 'mcq',
          questionAr: 'اختر الفعل المساعد المناسب للضمير I في الماضي المستمر:',
          promptSentence: 'At 8 PM yesterday, I ______ for the final exam.',
          options: ['was studying', 'were studying', 'am studying', 'studied'],
          correctAnswer: 'was studying',
          explanationAr: 'الضمير (I) يأخذ الفعل المساعد (was) مع الفعل المضاف له ing في الماضي المستمر.'
        },
        {
          id: 'pc_q3',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين جملة تعبر عن حدثين مستمرين في نفس الوقت (Parallel actions):',
          scrambledWords: ['was cooking', 'While mom', 'was reading a book.', 'dad'],
          correctAnswer: 'While mom was cooking dad was reading a book.',
          explanationAr: 'الترتيب: While + الحدث المستمر الأول (mom was cooking) + الحدث المستمر المتزامن الثاني (dad was reading a book).'
        },
        {
          id: 'pc_q4',
          type: 'error_correction',
          questionAr: 'اكتشف الخطأ وصححه (حدث قاطع حدثاً مستمراً):',
          promptSentence: 'I was sleeping when the alarm was ringing.',
          options: ['was ringing -> rang', 'was sleeping -> slept', 'when -> while', 'I -> We'],
          correctAnswer: 'was ringing -> rang',
          explanationAr: 'الحدث القاطع بعد when يجب أن يكون في الماضي البسيط (rang) وليس المستمر.'
        },
        {
          id: 'pc_q5',
          type: 'mcq',
          questionAr: 'اختر صيغة السؤال الصحيحة في الماضي المستمر:',
          promptSentence: 'What ______ doing when the lights went out?',
          options: ['were you', 'you were', 'did you', 'was you'],
          correctAnswer: 'were you',
          explanationAr: 'في السؤال، يتقدم الفعل المساعد (were) على الفاعل (you).'
        },
        {
          id: 'pc_q6',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين جملة ماضٍ مستمر منفية:',
          scrambledWords: ['listening', 'were', 'They', 'not', 'to the teacher.'],
          correctAnswer: 'They were not listening to the teacher.',
          explanationAr: 'الترتيب: الفاعل (They) + الفعل المساعد المنفي (were not) + الفعل-ing (listening) + التكملة (to the teacher).'
        }
      ]
    },
    freeWriteLesson: {
      titleAr: 'تكوين الجمل الحر والمدرب الذكي',
      instructionAr: 'اكتب جملة تصف ما كنت تفعله عندما حدث أمر مفاجئ أو في وقت محدد في الماضي.',
      structuralGuide: 'While I was + V-ing ..., [Past Simple action happened]',
      scenarios: [
        {
          titleAr: 'حدث قاطعه شيء مفاجئ (Interrupted Past Action)',
          promptAr: 'اكتب ماذا كنت تفعل عندما رن الهاتف أو انقطع التيار الكهربائي.',
          starter: 'I was...',
          exampleTarget: 'I was doing my homework when the power suddenly went out.'
        }
      ]
    },
    finalExamLesson: {
      titleAr: 'الاختبار النهائي للوحدة وتقييم الإتقان',
      passingScorePercent: 80,
      questions: [
        {
          id: 'pc_fe1',
          question: 'Choose the correct sentence combination for an interrupted past action:',
          questionAr: 'اختر الجملة المترابطة بطريقة صحيحة نحوياً لحدث ماضٍ مستمر قاطعه حدث مفاجئ:',
          options: [
            'I was taking a shower when someone knocked on the door.',
            'I took a shower when someone was knocking on the door.',
            'While I took a shower, someone knocked.',
            'I was take a shower when someone knock.'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لمحور الاستخدام في الدرس 1: الحدث المستمر الطويل يأخذ الماضي المستمر (was taking a shower) بينما الحدث القصير القاطع يأخذ الماضي البسيط بعد when وهو (knocked).',
          category: 'usage',
          lessonRefAr: 'الدرس 1: الاستخدام والتفصيل (تقاطع الأحداث في الماضي)'
        },
        {
          id: 'pc_fe2',
          question: 'According to the Golden Rule, what auxiliary verb does the pronoun "I" take in Past Continuous?',
          questionAr: 'وفقاً للقاعدة الذهبية للأفعال المساعدة، ما هو الفعل المساعد الذي يأخذه الضمير (I) في الماضي المستمر؟',
          options: ['was (I was reading)', 'were (I were reading)', 'is (I is reading)', 'are (I are reading)'],
          correctIndex: 0,
          explanationAr: 'وفقاً للقاعدة الذهبية في الدرس 3: الضمير (I) يأخذ (was) في الماضي المستمر شأنه شأن He و She و It، واستخدام were معه خطأ شائع.',
          category: 'mistake',
          lessonRefAr: 'الدرس 3: الأخطاء الشائعة والقاعدة الذهبية'
        },
        {
          id: 'pc_fe3',
          question: 'What tense must follow the keyword "While" according to the sentence connectors rule?',
          questionAr: 'ما هو الزمن الذي يجب أن يتبع أداة الربط (While) مباشرة وفق الشرح؟',
          options: [
            'Past Continuous (was/were + V-ing)',
            'Past Simple (V2 only)',
            'Present Simple (V1)',
            'Future Simple (will + V1)'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لمحور الكلمات الدالة في الدرس 1: كلمة (While) تعني "بينما/أثناء" وتتطلب دائماً زمناً مستمراً بعدها مباشرة (was/were + V-ing).',
          category: 'usage',
          lessonRefAr: 'الدرس 1: الكلمات الدالة والروابط (While & When)'
        },
        {
          id: 'pc_fe4',
          question: 'Which question is structured correctly according to the SVO table?',
          questionAr: 'أي من الأسئلة التالية مركب بشكل صحيح وفق جدول تكوين الأسئلة SVO؟',
          options: [
            'What were you doing at 8 PM yesterday?',
            'What was you doing at 8 PM yesterday?',
            'What you were doing at 8 PM yesterday?',
            'What did you doing at 8 PM yesterday?'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لجدول تكوين السؤال في الدرس 2: نضع أداة الاستفهام ثم الفعل المساعد (were) المناسب للفاعل (you) ثم الفعل مع ing وهو (doing).',
          category: 'structure',
          lessonRefAr: 'الدرس 2: جدول تركيب الجمل SVO (تكوين السؤال)'
        },
        {
          id: 'pc_fe5',
          question: 'What is the correct negative form of "They were driving home"?',
          questionAr: 'ما هي صيغة النفي الصحيحة للجملة وفق جدول النفي في الدرس 2؟',
          options: [
            "They weren't driving home.",
            "They didn't driving home.",
            "They wasn't driving home.",
            "They not were driving home."
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لجدول النفي في الدرس 2: ننفي بإضافة not بعد الفعل المساعد were لتصبح (weren\'t driving).',
          category: 'structure',
          lessonRefAr: 'الدرس 2: جدول تركيب الجمل SVO (صيغة النفي)'
        }
      ]
    }
  },
  {
    id: 'past_perfect',
    nameEn: 'Past Perfect',
    nameAr: 'الماضي التام',
    category: 'past',
    level: 'متوسط',
    shortFormula: 'Subject + had + V3 (Past Participle)',
    summaryAr: 'يُستخدم للدلالة على "الحدث الأقدم" من بين حدثين وقعا كلاهما في الماضي (ماضي الماضي).',
    timelineDescriptionAr: 'حدث وقع واكتمل قبل وقوع حدث ماضٍ آخر.',
    timelinePoint: -2.2,
    usageLesson: {
      titleAr: 'الاستخدام والتفصيل مع أمثلة حية',
      overviewAr: 'الماضي التام (Past Perfect) يسمى "ماضي الماضي". عندما يكون لديك حدثان وقعا في الماضي، الحدث الذي وقع أولاً يأخذ (had + V3)، والحدث الذي تلاه يأخذ الماضي البسيط (V2).',
      useCases: [
        {
          titleAr: '1. الحدث الأسبق في الترتيب الزمني في الماضي (The Earlier Past Action)',
          descriptionAr: 'توضيح أيهما حدث قبل الآخر لتجنب أي لبس في تسلسل القصة.',
          examples: [
            {
              id: 'pp_p1',
              sentence: 'When I arrived at the station, the train had already left.',
              translationAr: 'عندما وصلتُ إلى المحطة، كان القطار قد غادر بالفعل (غادر القطار أولاً، ثم وصلت أنا لاحقاً).',
              contextAr: 'مغادرة القطار (الحدث الأول Had left) قبل وصولي (الحدث الثاني arrived)',
              subject: 'The train',
              auxiliary: 'had',
              verb: 'left (V3)',
              complement: 'already'
            },
            {
              id: 'pp_p2',
              sentence: 'She passed the exam because she had studied very hard.',
              translationAr: 'لقد اجتازت الامتحان لأنها كانت قد درست بجد كبير مسبقاً.',
              contextAr: 'الدراسة (الحدث الأول had studied) سبقت النجاح (الحدث الثاني passed)',
              subject: 'she',
              auxiliary: 'had',
              verb: 'studied (V3)',
              complement: 'very hard'
            }
          ]
        }
      ],
      keywords: [
        { word: 'Before', meaningAr: 'قبل (يتبعه ماضٍ بسيط)', example: 'I had locked the door before I left.' },
        { word: 'After', meaningAr: 'بعد (يتبعه ماضٍ تام)', example: 'After he had eaten, he went to sleep.' },
        { word: 'By the time', meaningAr: 'بحلول الوقت الذي...', example: 'By the time we arrived, the movie had started.' },
        { word: 'Already', meaningAr: 'بالفعل / مسبقاً', example: 'They had already finished.' }
      ],
      timeConceptAr: 'نقطة تقع خلف حدث ماضٍ آخر لتحديد أسبقية وقوع الأحداث في الماضي.'
    },
    svoLesson: {
      titleAr: 'تركيب الجمل وجدول SVO + الأفعال المساعدة',
      rulesAr: [
        'نستخدم had مع جميع الضمائر بلا استثناء (I, He, She, It, We, They).',
        'الفعل الأساسي دائماً في التصريف الثالث (Past Participle - V3).',
        'في النفي: hadn\'t + V3.'
      ],
      auxiliaryRulesAr: 'الفعل المساعد الوحيد والثابت هنا هو had لجميع الضمائر المفردة والجمع.',
      goldenNotesAr: [
        'ملاحظة: نستخدم had دائماً كفعل مساعد لجميع الضمائر والأسماء (المفرد والجمع).',
        'يأتي بعد had الفعل بالتصريف الثالث V3 حصراً.',
        'في النفي نستخدم hadn\'t + التصريف الثالث (V3).'
      ],
      subjectClassification: {
        singularPronouns: ['He (هو)', 'She (هي)', 'It (هو/هي لغير العاقل)'],
        singularNouns: [
          { en: 'The student', ar: 'الطالب' },
          { en: 'Ali', ar: 'علي' },
          { en: 'The train', ar: 'القطار' },
          { en: 'The manager', ar: 'المدير' }
        ],
        pluralPronouns: ['I (أنا)', 'You (أنت / أنتم)', 'They (هم)', 'We (نحن)'],
        pluralNouns: [
          { en: 'The passengers', ar: 'الركاب' },
          { en: 'The players', ar: 'اللاعبون' },
          { en: 'Colleagues', ar: 'الزملاء' },
          { en: 'Families', ar: 'العائلات' }
        ]
      },
      verbTable: [
        { base: 'leave', v2: 'left', v3: 'left', meaningAr: 'يغادر', isIrregular: true },
        { base: 'finish', v2: 'finished', v3: 'finished', meaningAr: 'ينهي', isIrregular: false },
        { base: 'see', v2: 'saw', v3: 'seen', meaningAr: 'يرى', isIrregular: true },
        { base: 'clean', v2: 'cleaned', v3: 'cleaned', meaningAr: 'ينظف', isIrregular: false },
        { base: 'eat', v2: 'ate', v3: 'eaten', meaningAr: 'يأكل', isIrregular: true },
        { base: 'study', v2: 'studied', v3: 'studied', meaningAr: 'يدرس', isIrregular: false },
        { base: 'write', v2: 'wrote', v3: 'written', meaningAr: 'يكتب', isIrregular: true }
      ],
      structures: [
        {
          formType: 'affirmative',
          formTitleAr: '1. الإثبات (Affirmative)',
          formTitleEn: 'Affirmative Structure',
          formula: 'Subject + had + V3 + Object',
          explanationAr: 'الفاعل + had + التصريف الثالث (V3) + التكملة.',
          tableRows: [
            {
              subject: 'He / They / I',
              auxiliary: 'had',
              verb: 'cleaned (V3)',
              verbFormNote: 'had + V3',
              objectComplement: 'the house before the guests arrived',
              fullSentence: 'He had cleaned the house before the guests arrived.',
              translationAr: 'كان قد نظف المنزل قبل أن يصل الضيوف.'
            }
          ]
        },
        {
          formType: 'negative',
          formTitleAr: '2. النفي (Negative)',
          formTitleEn: 'Negative Structure',
          formula: 'Subject + had not (hadn\'t) + V3',
          explanationAr: 'نضيف not بعد had.',
          tableRows: [
            {
              subject: 'We',
              auxiliary: "had not (hadn't)",
              verb: 'seen (V3)',
              verbFormNote: 'V3',
              objectComplement: 'such a beautiful view before',
              fullSentence: "We hadn't seen such a beautiful view before.",
              translationAr: 'لم نكن قد رأينا مثل هذا المنظر الجميل من قبل.'
            }
          ]
        }
      ],
      builderParts: {
        subjects: [
          { text: 'The teacher', type: 'sing' },
          { text: 'I', type: 'i' },
          { text: 'They', type: 'plur' }
        ],
        auxiliaries: ['had', "hadn't"],
        verbs: [
          { base: 'finish', conjugated: 'finished', meaningAr: 'أنهى' },
          { base: 'leave', conjugated: 'left', meaningAr: 'غادر' },
          { base: 'save', conjugated: 'saved', meaningAr: 'حفظ' }
        ],
        objects: ['the files before the computer crashed', 'all the tasks', 'the building'],
        timePhrases: ['before', 'after', 'by the time']
      }
    },
    mistakesLesson: {
      titleAr: 'أبرز وأهم الأخطاء الشائعة وطرق تجنبها',
      introAr: 'استخدام الماضي التام دون وجود حدث ماضٍ آخر أو الخلط في الترتيب:',
      mistakes: [
        {
          id: 'pp_m1',
          categoryAr: 'استخدام الماضي التام لجملة منفردة دون مقارنة زمنية',
          incorrect: 'I had visited my uncle yesterday.',
          correct: 'I visited my uncle yesterday.',
          reasonAr: 'إذا كان لديك حدث ماضٍ واحد فقط، استخدم الماضي البسيط. الماضي التام يحتاج سياقاً لحدثين لتوضيح الأسبقية.',
          goldenRuleAr: 'القاعدة الذهبية: الماضي التام لا يعيش وحيداً، بل يحتاج حدثاً ماضياً آخر ليوضح أسبقيته!'
        }
      ],
      proTipsAr: [
        'تذكر: After + Had + V3 (الحدث الأول) — أما Before + Past Simple (الحدث الثاني).'
      ]
    },
    practiceLesson: {
      titleAr: 'تمارين تفاعلية متنوعة وشاملة',
      exercises: [
        {
          id: 'pp_q1',
          type: 'mcq',
          questionAr: 'اختر الترتيب الصحيح للحدثين في الماضي (الأسبق زمناً):',
          promptSentence: 'By the time the police arrived, the thief ______.',
          options: ['escaped', 'had escaped', 'has escaped', 'was escaping'],
          correctAnswer: 'had escaped',
          explanationAr: 'هروب اللص هو الحدث الأول الذي وقع قبل وصول الشرطة (الحدث الثاني)، لذا يأخذ الماضي التام (had escaped).'
        },
        {
          id: 'pp_q2',
          type: 'mcq',
          questionAr: 'اختر التركيب الصحيح بعد كلمة After:',
          promptSentence: 'After she ______ her homework, she watched television.',
          options: ['had done', 'has done', 'did', 'was doing'],
          correctAnswer: 'had done',
          explanationAr: 'بعد كلمة After نضع الحدث الأقدم في الماضي التام (had + V3) لتصبح (had done).'
        },
        {
          id: 'pp_q3',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين جملة ماضٍ تام مع already و before:',
          scrambledWords: ['had', 'The train', 'already left', 'before we arrived.'],
          correctAnswer: 'The train had already left before we arrived.',
          explanationAr: 'الترتيب: الفاعل (The train) + الفعل المساعد (had) + (already left) + الرابط الزمني والحدث الثاني (before we arrived).'
        },
        {
          id: 'pp_q4',
          type: 'error_correction',
          questionAr: 'اكتشف الخطأ في استخدام have بدلاً من had في الماضي:',
          promptSentence: 'When I got to the station, I realized I have lost my ticket.',
          options: ['have lost -> had lost', 'got -> get', 'lost -> lose', 'realized -> realize'],
          correctAnswer: 'have lost -> had lost',
          explanationAr: 'بما أن السياق كله في الماضي (got, realized)، فإن فقدان التذكرة حدث قبل ذلك ويتطلب الماضي التام (had lost).'
        },
        {
          id: 'pp_q5',
          type: 'mcq',
          questionAr: 'اختر الجملة المنفية الصحيحة في الماضي التام:',
          promptSentence: 'We ______ each other before that conference in Dubai.',
          options: ["hadn't met", "didn't met", "haven't meet", "wasn't met"],
          correctAnswer: "hadn't met",
          explanationAr: 'النفي في الماضي التام يكون باستخدام (hadn\'t + V3) فتصبح (hadn\'t met).'
        },
        {
          id: 'pp_q6',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين سؤال بصيغة Had في الماضي التام:',
          scrambledWords: ['Had', 'they', 'eaten', 'dinner', 'before the movie started?'],
          correctAnswer: 'Had they eaten dinner before the movie started?',
          explanationAr: 'ترتيب السؤال: Had + الفاعل (they) + التصريف الثالث (eaten) + المفعول به (dinner) + شبه الجملة الزمنية (before the movie started?).'
        }
      ]
    },
    freeWriteLesson: {
      titleAr: 'تكوين الجمل الحر والمدرب الذكي',
      instructionAr: 'اكتب جملة تحتوي على حدثين في الماضي، مع وضع الحدث الأقدم في الماضي التام (had + V3).',
      structuralGuide: 'Before I [Past Simple], I had already [V3] ...',
      scenarios: [
        {
          titleAr: 'تسلسل عملين في الماضي (Two Past Actions)',
          promptAr: 'اكتب عما قمت بإنجازه قبل أن تبدأ في نشاط آخر.',
          starter: 'After I had...',
          exampleTarget: 'After I had finished my breakfast, I went to work.'
        }
      ]
    },
    finalExamLesson: {
      titleAr: 'الاختبار النهائي للوحدة وتقييم الإتقان',
      passingScorePercent: 80,
      questions: [
        {
          id: 'pp_fe1',
          question: 'Which action happened FIRST in this sentence: "He had turned off the computer before he left the office"?',
          questionAr: 'أي الحدثين وقع أولاً في الجملة وفق قاعدة "ماضي الماضي"؟',
          options: [
            'Turning off the computer (إطفاء الحاسوب)',
            'Leaving the office (مغادرة المكتب)',
            'Both happened at the exact same second',
            'Neither action was completed'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً للدرس 1 (الاستخدام): الحدث المصاغ في الماضي التام (had turned off) هو دائماً الحدث الأسبق في الترتيب الزمني.',
          category: 'usage',
          lessonRefAr: 'الدرس 1: الاستخدام والتفصيل (ترتيب أسبقية الأحداث في الماضي)'
        },
        {
          id: 'pp_fe2',
          question: 'What is the auxiliary verb used in the Past Perfect for plural and singular subjects?',
          questionAr: 'ما هو الفعل المساعد المستخدم في الماضي التام مع الفواعل المفردة والجمع وفق جدول SVO؟',
          options: ['had for all subjects', 'have for plural, has for singular', 'did for all subjects', 'was / were'],
          correctIndex: 0,
          explanationAr: 'وفقاً لجدول SVO في الدرس 2: الفعل المساعد في الماضي التام ثابت وموحد وهو (had) لجميع الضمائر بدون استثناء.',
          category: 'structure',
          lessonRefAr: 'الدرس 2: جدول تركيب الجمل SVO وقاعدة الفعل المساعد'
        },
        {
          id: 'pp_fe3',
          question: 'Complete the sentence correctly: "After she ______ her breakfast, she went to school."',
          questionAr: 'أكمل الفراغ بالصيغة الصحيحة وفق قاعدة أداة الربط (After):',
          options: ['had eaten', 'eats', 'has eaten', 'was eating'],
          correctIndex: 0,
          explanationAr: 'وفقاً لقواعد الكلمات الدالة في الدرس 1: بعد كلمة (After) نضع الحدث الأسبق في زمن الماضي التام (had + V3) وهو (had eaten).',
          category: 'usage',
          lessonRefAr: 'الدرس 1: الكلمات الدالة والروابط (After vs Before)'
        },
        {
          id: 'pp_fe4',
          question: 'What is the Golden Rule regarding the standalone use of Past Perfect without another past action?',
          questionAr: 'ما هي "القاعدة الذهبية" في الدرس 3 بشأن استخدام الماضي التام منفرداً بدون حدث ماضٍ آخر؟',
          options: [
            'Past Perfect cannot live alone; it needs another past action to show priority.',
            'Past Perfect is always used for single, isolated past actions.',
            'Past Perfect replaces the Future tense.',
            'Past Perfect requires the word "tomorrow".'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً للقاعدة الذهبية في الدرس 3: الماضي التام لا يستخدم لجملة منفردة بل يحتاج سياقاً لحدثين في الماضي لتوضيح الأسبقية.',
          category: 'mistake',
          lessonRefAr: 'الدرس 3: الأخطاء الشائعة والقاعدة الذهبية'
        },
        {
          id: 'pp_fe5',
          question: 'Identify the correct negative form of: "They had locked the doors."',
          questionAr: 'اختر الصيغة المنفية الصحيحة للجملة وفق جدول SVO:',
          options: [
            "They hadn't locked the doors.",
            "They didn't locked the doors.",
            "They hadn't lock the doors.",
            "They wasn't locking the doors."
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لجدول النفي في الدرس 2: ننفي بإضافة not بعد had فتصبح (hadn\'t) متبوعة بالتصريف الثالث (locked).',
          category: 'structure',
          lessonRefAr: 'الدرس 2: جدول تركيب الجمل SVO (صيغة النفي)'
        }
      ]
    }
  },
  {
    id: 'past_perfect_continuous',
    nameEn: 'Past Perfect Continuous',
    nameAr: 'الماضي التام المستمر',
    category: 'past',
    level: 'متقدم',
    shortFormula: 'Subject + had been + V-ing',
    summaryAr: 'يُستخدم للتعبير عن حدث كان مستمراً لفترة من الوقت في الماضي قبل أن يقع حدث ماضٍ آخر أو يوقفه.',
    timelineDescriptionAr: 'نشاط استمر لفترة في الماضي وانتهى قبل وقوع حدث ماضٍ آخر.',
    timelinePoint: -2.0,
    usageLesson: {
      titleAr: 'الاستخدام والتفصيل مع أمثلة حية',
      overviewAr: 'الماضي التام المستمر (Past Perfect Continuous) يركز على طول مدة الفعل المستمر في الماضي قبل لحظة معينة أو حدث آخر في الماضي.',
      useCases: [
        {
          titleAr: '1. استمرار نشاط في الماضي قبل حدث ماضٍ آخر (Duration Before Another Past Action)',
          descriptionAr: 'توضيح كم استغرق النشاط من وقت قبل أن يتوقف أو يقطعه شيء في الماضي.',
          examples: [
            {
              id: 'ppc_p1',
              sentence: 'They had been playing football for two hours before it started to rain.',
              translationAr: 'كانوا يلعبون كرة القدم لمدة ساعتين قبل أن تبدأ السماء بالهطول.',
              contextAr: 'التركيز على مدة اللعب (ساعتين had been playing) قبل هطول المطر',
              subject: 'They',
              auxiliary: 'had been',
              verb: 'playing',
              complement: 'football for two hours',
              timeMarker: 'before it started to rain'
            }
          ]
        },
        {
          titleAr: '2. سبب وتفسير لحالة ماضية (Cause of a Past Result)',
          descriptionAr: 'تفسير لماذا كان شخص متعباً أو لماذا كانت الأرض موحلة في الماضي.',
          examples: [
            {
              id: 'ppc_p2',
              sentence: 'He was exhausted because he had been working on the project all night.',
              translationAr: 'كان متعباً للغاية في ذلك الوقت لأنه كان يعمل على المشروع طوال الليل.',
              contextAr: 'العمل الطويل المستمر سبب له التعب في الماضي',
              subject: 'He',
              auxiliary: 'had been',
              verb: 'working',
              complement: 'all night'
            }
          ]
        }
      ],
      keywords: [
        { word: 'Had been + V-ing for...', meaningAr: 'كان مستمراً لمدة...', example: 'I had been waiting for an hour.' },
        { word: 'Since / All day', meaningAr: 'منذ / طوال اليوم في الماضي', example: 'She had been driving all day.' }
      ],
      timeConceptAr: 'شريط استمرارية ممتد يكتمل ويتوقف تماماً قبل نقطة في الماضي.'
    },
    svoLesson: {
      titleAr: 'تركيب الجمل وجدول SVO + الأفعال المساعدة',
      rulesAr: [
        'التركيبة الثابتة لجميع الضمائر: had been + Verb-ing.',
        'في النفي: hadn\'t been + Verb-ing.'
      ],
      auxiliaryRulesAr: 'الفعل المساعد هو had been لجميع الفواعل.',
      goldenNotesAr: [
        'ملاحظة: نستخدم had been كفعل مساعد ثابت لجميع الضمائر والأسماء.',
        'الفعل الأساسي يأخذ اللاحقة (-ing) بعد had been للدلالة على الاستمرارية في الماضي الأسبق.',
        'في النفي نضع not بعد had لتصبح: hadn\'t been + Verb-ing.'
      ],
      subjectClassification: {
        singularPronouns: ['He (هو)', 'She (هي)', 'It (هو/هي لغير العاقل)'],
        singularNouns: [
          { en: 'The pilot', ar: 'الطيار' },
          { en: 'The doctor', ar: 'الطبيب' },
          { en: 'The runner', ar: 'العداء' },
          { en: 'My colleague', ar: 'زميلي' }
        ],
        pluralPronouns: ['I (أنا)', 'You (أنت / أنتم)', 'They (هم)', 'We (نحن)'],
        pluralNouns: [
          { en: 'The workers', ar: 'العمال' },
          { en: 'The players', ar: 'اللاعبون' },
          { en: 'Passengers', ar: 'الركاب' },
          { en: 'Students', ar: 'الطلاب' }
        ]
      },
      verbTable: [
        { base: 'wait', v2: 'waited', v3: 'waiting (ing)', meaningAr: 'ينتظر', isIrregular: false },
        { base: 'work', v2: 'worked', v3: 'working (ing)', meaningAr: 'يعمل', isIrregular: false },
        { base: 'drive', v2: 'drove', v3: 'driving (ing)', meaningAr: 'يقود', isIrregular: true },
        { base: 'run', v2: 'ran', v3: 'running (ing)', meaningAr: 'يركض', isIrregular: true },
        { base: 'fly', v2: 'flew', v3: 'flying (ing)', meaningAr: 'يطير', isIrregular: true },
        { base: 'study', v2: 'studied', v3: 'studying (ing)', meaningAr: 'يدرس', isIrregular: false }
      ],
      structures: [
        {
          formType: 'affirmative',
          formTitleAr: '1. الإثبات (Affirmative)',
          formTitleEn: 'Affirmative Structure',
          formula: 'Subject + had been + Verb-ing + Object/Duration',
          explanationAr: 'الفاعل + had been + الفعل-ing + المدة.',
          tableRows: [
            {
              subject: 'I / She / They',
              auxiliary: 'had been',
              verb: 'studying',
              verbFormNote: 'had been + V-ing',
              objectComplement: 'for five hours before passing the test',
              fullSentence: 'She had been studying for five hours before the exam started.',
              translationAr: 'كانت تدرس لمدة خمس ساعات قبل أن يبدأ الامتحان.'
            }
          ]
        }
      ],
      builderParts: {
        subjects: [
          { text: 'The pilot', type: 'sing' },
          { text: 'We', type: 'plur' }
        ],
        auxiliaries: ['had been', "hadn't been"],
        verbs: [
          { base: 'fly', conjugated: 'flying', meaningAr: 'يطير' },
          { base: 'walk', conjugated: 'walking', meaningAr: 'يمشي' }
        ],
        objects: ['for 6 hours', 'in the mountains'],
        timePhrases: ['before landing', 'before reaching the village']
      }
    },
    mistakesLesson: {
      titleAr: 'أبرز وأهم الأخطاء الشائعة وطرق تجنبها',
      introAr: 'الخلط بين الماضي المستمر والماضي التام المستمر:',
      mistakes: [
        {
          id: 'ppc_m1',
          categoryAr: 'نسيان كلمة been في الصيغة',
          incorrect: 'He had working for 3 hours.',
          correct: 'He had been working for 3 hours.',
          reasonAr: 'لا يمكن استخدام had مع Verb-ing مباشرة دون been.',
          goldenRuleAr: 'القاعدة الذهبية: had been + ing تركيبة ثلاثية لا تنفصل!'
        }
      ],
      proTipsAr: ['أفعال الحالة مثل know و like لا تأخذ ing وتستخدم في الماضي التام البسيط had known.']
    },
    practiceLesson: {
      titleAr: 'تمارين تفاعلية متنوعة وشاملة',
      exercises: [
        {
          id: 'ppc_q1',
          type: 'mcq',
          questionAr: 'اختر الصيغة الصحيحة لنشاط ماضٍ استمر لساعات وفسر نتيجة ماضية:',
          promptSentence: 'His eyes were red because he ______ in front of the screen for hours.',
          options: ['had been sitting', 'has been sitting', 'was sat', 'had satting'],
          correctAnswer: 'had been sitting',
          explanationAr: 'النتيجة كانت في الماضي (were red) بسبب نشاط مستمر استغرق ساعات في الماضي (had been sitting).'
        },
        {
          id: 'ppc_q2',
          type: 'mcq',
          questionAr: 'اختر صيغة السؤال عن المدة في الماضي التام المستمر:',
          promptSentence: 'How long ______ before the train finally arrived?',
          options: [
            'had you been waiting',
            'have you been waiting',
            'were you waiting',
            'had you waited'
          ],
          correctAnswer: 'had you been waiting',
          explanationAr: 'للسؤال عن مدة نشاط استمر حتى نقطة محددة في الماضي (before the train arrived)، نستخدم (had you been waiting).'
        },
        {
          id: 'ppc_q3',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين جملة ماضٍ تام مستمر مع for و before:',
          scrambledWords: ['driving', 'had', 'for six hours', 'He', 'been', 'before taking a break.'],
          correctAnswer: 'He had been driving for six hours before taking a break.',
          explanationAr: 'الترتيب: الفاعل (He) + الفعل المساعد (had been) + الفعل-ing (driving) + المدة (for six hours) + شبه الجملة التوضيحية (before taking a break).'
        },
        {
          id: 'ppc_q4',
          type: 'error_correction',
          questionAr: 'اكتشف الخطأ في نسيان been وصححه:',
          promptSentence: 'They had playing tennis for two hours before it started to rain.',
          options: ['had playing -> had been playing', 'started -> start', 'for -> since', 'playing -> played'],
          correctAnswer: 'had playing -> had been playing',
          explanationAr: 'في زمن الماضي التام المستمر، التركيب الإلزامي هو (had been + V-ing).'
        },
        {
          id: 'ppc_q5',
          type: 'mcq',
          questionAr: 'اختر الجملة الصحيحة مع مراعاة أفعال الحالة (Stative Verbs):',
          promptSentence: 'We ______ each other for ten years before we got married.',
          options: ['had known', 'had been knowing', 'were knowing', 'have been knowing'],
          correctAnswer: 'had known',
          explanationAr: 'الفعل (know) من أفعال الحالة التي لا تقبل ing، لذلك نستخدم الماضي التام البسيط (had known).'
        },
        {
          id: 'ppc_q6',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين جملة تفسر سبب التعب والإرهاق في الماضي:',
          scrambledWords: ['She', 'tired because', 'was', 'she had been', 'running all morning.'],
          correctAnswer: 'She was tired because she had been running all morning.',
          explanationAr: 'الترتيب: (She was tired because) + السبب المستمر في الماضي (she had been running all morning).'
        }
      ]
    },
    freeWriteLesson: {
      titleAr: 'تكوين الجمل الحر والمدرب الذكي',
      instructionAr: 'اكتب جملة تعبر عن نشاط طويل كنت تقوم به في الماضي قبل أن تصل لنقطة معينة.',
      structuralGuide: 'S + had been + V-ing + for ... before ...',
      scenarios: [
        {
          titleAr: 'نشاط طويل ومجهد في الماضي (Past Continuous Effort)',
          promptAr: 'اكتب عن مجهود استمر لساعات قبل أن تنهيه في الماضي.',
          starter: 'I had been...',
          exampleTarget: 'I had been searching for my keys for 30 minutes before I found them.'
        }
      ]
    },
    finalExamLesson: {
      titleAr: 'الاختبار النهائي للوحدة وتقييم الإتقان',
      passingScorePercent: 80,
      questions: [
        {
          id: 'ppc_fe1',
          question: 'Which sentence correctly explains a past physical result caused by a prolonged past action?',
          questionAr: 'أي من الجمل تفسر حالة جسدية ماضية ناتجة عن نشاط ماضٍ طويل مستمر وفق أمثلة الدرس؟',
          options: [
            'He was exhausted because he had been working all night.',
            'He is exhausted because he worked yesterday.',
            'He was exhausting because he had work.',
            'He had exhausted because he was worked.'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لحالة الاستخدام 2 في الدرس 1: الماضي التام المستمر (had been working all night) يقدم التعليل والسبب المباشر لحالة التعب في الماضي (was exhausted).',
          category: 'usage',
          lessonRefAr: 'الدرس 1: الاستخدام والتفصيل (تفسير الحالات والنتائج الماضية)'
        },
        {
          id: 'ppc_fe2',
          question: 'What is the full 3-part formula for Past Perfect Continuous according to the SVO table?',
          questionAr: 'ما هي التركيبة الثلاثية الكاملة للماضي التام المستمر وفق جدول SVO؟',
          options: [
            'Subject + had been + Verb-ing',
            'Subject + have been + Verb-ing',
            'Subject + had + Verb-ing (without been)',
            'Subject + was being + Verb-ing'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لجدول SVO في الدرس 2: التركيبة الثابتة لجميع الضمائر هي (Subject + had been + Verb-ing).',
          category: 'structure',
          lessonRefAr: 'الدرس 2: جدول تركيب الجمل SVO'
        },
        {
          id: 'ppc_fe3',
          question: 'What is the Golden Rule regarding the word "been" in this tense?',
          questionAr: 'ما هي "القاعدة الذهبية" المشروحة في الدرس 3 بخصوص كلمة (been)؟',
          options: [
            'had been + ing is an inseparable 3-part structure; been cannot be omitted.',
            'been is only used when the sentence has no subject.',
            'been is an optional word for polite sentences.',
            'been should only be used with singular pronouns.'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً للقاعدة الذهبية في الدرس 3: لا يمكن الربط بين had والفعل المنتهي بـ ing بدون كلمة been.',
          category: 'mistake',
          lessonRefAr: 'الدرس 3: الأخطة الشائعة والقاعدة الذهبية'
        },
        {
          id: 'ppc_fe4',
          question: 'How do we handle stative verbs (like know / love) when describing duration before a past point?',
          questionAr: 'كيف نتعامل مع أفعال الحالة (مثل: know / understand) عند وصف مدة سابقة في الماضي؟',
          options: [
            'Use Past Perfect Simple (had known), never continuous (-ing).',
            'Use had been knowing with double ing.',
            'Use Present Simple only.',
            'Stative verbs cannot be used in past sentences at all.'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لنصيحة الخبراء في الدرس 3: أفعال الحالة لا تقبل -ing وتتحول إلى الماضي التام البسيط (had known).',
          category: 'mistake',
          lessonRefAr: 'الدرس 3: نصائح الخبراء وأفعال الحالة Stative Verbs'
        },
        {
          id: 'ppc_fe5',
          question: 'Complete the sentence with the correct continuous duration form: "They ______ for two hours before the bus arrived."',
          questionAr: 'أكمل الجملة بصيغة المدة المستمرة الصحيحة:',
          options: [
            'had been waiting',
            'have been waiting',
            'had waiting',
            'were waited'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لأمثلة الدرس 1: النشاط المستمر لمدة ساعتين قبل وصول الحافلة في الماضي يأخذ صيغة الماضي التام المستمر (had been waiting).',
          category: 'structure',
          lessonRefAr: 'الدرس 1: الاستخدام والتفصيل وأمثلة المدة'
        }
      ]
    }
  }
];
