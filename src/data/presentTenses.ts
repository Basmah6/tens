import { TenseData } from '../types';

export const presentTenses: TenseData[] = [
  {
    id: 'present_simple',
    nameEn: 'Present Simple',
    nameAr: 'المضارع البسيط',
    category: 'present',
    level: 'مبتدئ',
    shortFormula: 'Subject + V1 (s/es) + Object',
    summaryAr: 'يُستخدم للتعبير عن العادات، الروتين اليومي، الحقائق العلمية العامة، والمواعيد الثابتة.',
    timelineDescriptionAr: 'يحدث بانتظام أو يمثل حقيقة دائمة لا ترتبط بلحظة معينة.',
    timelinePoint: 0,
    usageLesson: {
      titleAr: 'الاستخدام والتفصيل مع أمثلة حية',
      overviewAr: 'المضارع البسيط (Present Simple) هو أكثر الأزمنة استخداماً في اللغة الإنجليزية. لا يعني بالضرورة ما يحدث "الآن بهذه الثانية"، بل يركز على الحقائق الدائمة والأشياء المتكررة.',
      useCases: [
        {
          titleAr: '1. العادات والروتين اليومي (Habits & Daily Routine)',
          descriptionAr: 'عندما تفعل شيئاً بانتظام وبشكل متكرر كجزء من روتينك اليومي أو الأسبوعي أو السنوي (أفعال اعتيادية وليست لمرة واحدة).',
          examples: [
            {
              id: 'ps_ex1',
              sentence: 'I play football.',
              translationAr: 'أنا ألعب كرة القدم.',
              contextAr: 'أنت هنا تقصد أنك تلعب كرة القدم بشكل متكرر سواء كل يوم أو كل أسبوع؛ إنها عادة من عاداتك.',
              subject: 'I',
              verb: 'play',
              complement: 'football'
            },
            {
              id: 'ps_ex2',
              sentence: 'Fatima goes to school every day.',
              translationAr: 'فاطمة تذهب إلى المدرسة كل يوم.',
              contextAr: 'أنت هنا تقول إن فاطمة تذهب للمدرسة كل يوم كروتين متكرر.',
              subject: 'Fatima',
              verb: 'goes',
              complement: 'to school',
              timeMarker: 'every day'
            }
          ]
        },
        {
          titleAr: '2. الحقائق العامة والعلمية (General Facts)',
          descriptionAr: 'عندما تتحدث عن أشياء صحيحة دائماً أو حقائق علمية أو حقائق عامة لا تتغير ولا تقتصر على شخص أو وقت معين.',
          examples: [
            {
              id: 'ps_ex3',
              sentence: 'The sun rises from the east.',
              translationAr: 'الشمس تشرق من الشرق.',
              contextAr: 'حقيقة علمية وكونية مثبتة بأن الشمس تشرق من جهة الشرق (ليست رأياً أو عادة).',
              subject: 'The sun',
              verb: 'rises',
              complement: 'from the east'
            },
            {
              id: 'ps_ex4',
              sentence: 'I live in Riyadh.',
              translationAr: 'أنا أعيش في الرياض.',
              contextAr: 'أنت هنا تتكلم عن حقيقة ثابتة عنك بأنك تقيم وتعيش في الرياض.',
              subject: 'I',
              verb: 'live',
              complement: 'in Riyadh'
            }
          ]
        },
        {
          titleAr: '3. الجداول الزمنية والمواعيد المحددة (Schedule & Fixed Times)',
          descriptionAr: 'عندما تتحدث عن موعد محدد مسبقاً في جدول زمني ثابت يصعب تغييره (المواصلات، المحلات العامة، الحصص، الأفلام والفعاليات).',
          examples: [
            {
              id: 'ps_ex5',
              sentence: 'The train comes at 6 PM tomorrow.',
              translationAr: 'موعد قدوم القطار هو غداً الساعة 6 مساءً.',
              contextAr: 'المواصلات: جدول زمني محدد وثابت لرحلة القطار.',
              subject: 'The train',
              verb: 'comes',
              complement: 'at 6 PM tomorrow'
            },
            {
              id: 'ps_ex6',
              sentence: 'The bank opens at 9 AM.',
              translationAr: 'موعد الافتتاح اليومي للبنك هو الساعة 9 صباحاً.',
              contextAr: 'المحلات والأماكن العامة: موعد افتتاح رسمي ثابت.',
              subject: 'The bank',
              verb: 'opens',
              complement: 'at 9 AM'
            },
            {
              id: 'ps_ex7',
              sentence: 'My class finishes at 3 PM.',
              translationAr: 'حصتي تنتهي الساعة 3 مساءً.',
              contextAr: 'الحصص والفعاليات: موعد انتهاء ثابت في جدول الحصص.',
              subject: 'My class',
              verb: 'finishes',
              complement: 'at 3 PM'
            },
            {
              id: 'ps_ex8',
              sentence: 'The movie starts at 7 PM.',
              translationAr: 'الفيلم يبدأ الساعة 7 مساءً.',
              contextAr: 'عروض السينما والفعاليات: موعد بدء محدد في جدول العرض.',
              subject: 'The movie',
              verb: 'starts',
              complement: 'at 7 PM'
            }
          ]
        }
      ],
      keywords: [
        { word: 'Always', meaningAr: 'دائماً (100%)', example: 'I always arrive on time.' },
        { word: 'Usually', meaningAr: 'عادة (80%)', example: 'He usually takes the bus.' },
        { word: 'Every day / week', meaningAr: 'كل يوم / كل أسبوع', example: 'Fatima goes to school every day.' },
        { word: 'Regularly', meaningAr: 'بانتظام', example: 'We go out regularly.' },
        { word: 'Often', meaningAr: 'غالباً', example: 'They often eat dinner early.' }
      ],
      timeConceptAr: 'يعبر عن خط زمني ممتد يصف عادات وروتين متكرر، حقائق ثابتة، وجداول ومواعيد محددة مسبقاً.'
    },
    svoLesson: {
      titleAr: 'تركيب الجمل وجدول SVO + الأفعال المساعدة',
      rulesAr: [
        'القاعدة الذهبية: عند التحدث عن نفسك (I) أو الجمع (you, they, we) وأسماء الجمع، الفعل يبقى بشكله الأساسي بدون أي تغيير.',
        'عند التحدث عن الأسماء والضمائر المفردة (he, she, it)، نضيف (s / es) للفعل.',
        'الأفعال المساعدة "Do" و "Does": وظيفتهما مساعدة الفعل الرئيسي عند النفي وتكوين السؤال.',
        'ملاحظة هامة: بعد استخدام do / does يرجع الفعل لحالته الأساسية بدون إضافة (s).'
      ],
      auxiliaryRulesAr: 'Do و Does أفعال مساعدة تعتمد كلياً على الفاعل: نستخدم do مع (I, you, they, we) وأسماء الجمع، ونستخدم does مع (he, she, it) وأسماء المفرد.',
      goldenNotesAr: [
        'ملاحظة: يتم إضافة es للفعل do لاستخدامها مع المفرد فتصبح does.',
        'ملاحظة: بعد استخدام does يعود الفعل الرئيسي لحالته الأساسية (المصدر المجرد) بدون إضافة s.',
        'ملاحظة للاختصار: do not تُكتب don\'t، و does not تُكتب doesn\'t.'
      ],
      subjectClassification: {
        iPronouns: ['I (أنا)'],
        iBeAux: 'am / am not',
        iGeneralAux: 'do / don\'t + Base V1',
        iNotesAr: 'يستقل ضمير المتكلم (I) تماماً مع فعل الكينونة To Be فيأخذ (am / am not) حصراً. ومع الأفعال العادية يأخذ صيغة المصدر المجرد والفعل المساعد (do / don\'t).',
        singularPronouns: ['He (هو)', 'She (هي)', 'It (هو/هي لغير العاقل)'],
        singularNouns: [
          { en: 'Friend', ar: 'صديق' },
          { en: 'Cat', ar: 'قطة' },
          { en: 'Student', ar: 'طالب' },
          { en: 'Boy', ar: 'ولد' }
        ],
        pluralPronouns: ['You (أنت / أنتم)', 'They (هم)', 'We (نحن)'],
        pluralNouns: [
          { en: 'Friends', ar: 'أصدقاء' },
          { en: 'Cats', ar: 'قطط' },
          { en: 'Students', ar: 'طلاب' },
          { en: 'Boys', ar: 'أولاد' }
        ]
      },
      structures: [
        {
          formType: 'affirmative',
          formTitleAr: '1. جملة الإثبات (Affirmative)',
          formTitleEn: 'Affirmative Structure',
          formula: 'Subject + Verb (Base / Base+s) + Object',
          explanationAr: 'يكتب الفعل في حالته الأساسية بدون تغيير مع (I, you, they, we) وأسماء الجمع، ويضاف له (s) مع (he, she, it) وأسماء المفرد.',
          tableRows: [
            {
              subject: 'I (أنا)',
              auxiliary: '-',
              verb: 'live',
              verbFormNote: 'الفعل في حالته الأساسية',
              objectComplement: 'in Jeddah',
              fullSentence: 'I live in Jeddah.',
              translationAr: 'أنا أعيش في جدة.'
            },
            {
              subject: 'You (أنت / أنتم)',
              auxiliary: '-',
              verb: 'play',
              verbFormNote: 'بدون أي تغيير',
              objectComplement: 'football',
              fullSentence: 'You play football.',
              translationAr: 'أنت تلعب كرة القدم.'
            },
            {
              subject: 'They (هم)',
              auxiliary: '-',
              verb: 'eat',
              verbFormNote: 'بدون أي تغيير',
              objectComplement: 'dinner early',
              fullSentence: 'They eat dinner early.',
              translationAr: 'هم يتناولون العشاء مبكراً.'
            },
            {
              subject: 'We (نحن)',
              auxiliary: '-',
              verb: 'go',
              verbFormNote: 'بدون أي تغيير',
              objectComplement: 'out regularly',
              fullSentence: 'We go out regularly.',
              translationAr: 'نحن نخرج بانتظام.'
            },
            {
              subject: 'He (هو)',
              auxiliary: '-',
              verb: 'lives',
              verbFormNote: 'بإضافة s للمفرد',
              objectComplement: 'in Jeddah',
              fullSentence: 'He lives in Jeddah.',
              translationAr: 'هو يعيش في جدة.'
            },
            {
              subject: 'She (هي)',
              auxiliary: '-',
              verb: 'plays',
              verbFormNote: 'بإضافة s للمفرد',
              objectComplement: 'football',
              fullSentence: 'She plays football.',
              translationAr: 'هي تلعب كرة القدم.'
            },
            {
              subject: 'Cat / It (القطة)',
              auxiliary: '-',
              verb: 'eats',
              verbFormNote: 'بإضافة s للمفرد',
              objectComplement: 'a lot',
              fullSentence: 'The cat eats a lot.',
              translationAr: 'القطة تأكل كثيراً.'
            }
          ]
        },
        {
          formType: 'negative',
          formTitleAr: '2. جملة النفي (Negative)',
          formTitleEn: 'Negative Structure',
          formula: 'Subject + do not / does not + Verb (Base) + Object',
          explanationAr: 'للنفي في المضارع البسيط نستخدم do not (don\'t) أو does not (doesn\'t) قبل الفعل الأساسي، ويعود الفعل لحالته الأصلية بدون s.',
          tableRows: [
            {
              subject: 'He (هو)',
              auxiliary: 'does not (doesn\'t)',
              verb: 'live',
              verbFormNote: 'يعود لمصدره المجرد',
              objectComplement: 'in Jeddah',
              fullSentence: 'He does not live in Jeddah.',
              translationAr: 'هو لا يعيش في جدة.'
            },
            {
              subject: 'I (أنا)',
              auxiliary: 'do not (don\'t)',
              verb: 'play',
              verbFormNote: 'المصدر الأساسي',
              objectComplement: 'football',
              fullSentence: 'I do not play football.',
              translationAr: 'أنا لا ألعب كرة القدم.'
            },
            {
              subject: 'They (هم)',
              auxiliary: 'do not (don\'t)',
              verb: 'eat',
              verbFormNote: 'المصدر الأساسي',
              objectComplement: 'a lot',
              fullSentence: 'They do not eat a lot.',
              translationAr: 'هم لا يأكلون كثيراً.'
            }
          ]
        },
        {
          formType: 'yes_no_question',
          formTitleAr: '3. تكوين السؤال (Questions)',
          formTitleEn: 'Question Structure',
          formula: 'Do / Does + Subject + Verb (Base) + Object?',
          explanationAr: 'للسؤال في المضارع البسيط نستخدم Do أو Does في بداية الجملة متبوعاً بالفاعل ثم الفعل في حالته الأساسية.',
          tableRows: [
            {
              subject: 'he',
              auxiliary: 'Does',
              verb: 'live',
              verbFormNote: 'الفعل في حالته الأساسية',
              objectComplement: 'in Jeddah?',
              fullSentence: 'Does he live in Jeddah?',
              translationAr: 'هل هو يعيش في جدة؟'
            },
            {
              subject: 'I',
              auxiliary: 'Do',
              verb: 'play',
              verbFormNote: 'الفعل في حالته الأساسية',
              objectComplement: 'football?',
              fullSentence: 'Do I play football?',
              translationAr: 'هل أنا ألعب كرة القدم؟'
            },
            {
              subject: 'they',
              auxiliary: 'Do',
              verb: 'eat',
              verbFormNote: 'الفعل في حالته الأساسية',
              objectComplement: 'a lot?',
              fullSentence: 'Do they eat a lot?',
              translationAr: 'هل هم يأكلون كثيراً؟'
            }
          ]
        },
        {
          formType: 'wh_question',
          formTitleAr: '4. سؤال بأداة استفهام (Wh- Question)',
          formTitleEn: 'Wh- Questions',
          formula: 'Wh-word + do / does + Subject + Verb (Base) + Object?',
          explanationAr: 'نضع أداة الاستفهام في البداية تليها Do أو Does والفاعل ثم الفعل في المصدر.',
          tableRows: [
            {
              subject: 'she',
              auxiliary: 'does',
              verb: 'live',
              verbFormNote: 'أداة الاستفهام: Where',
              objectComplement: 'in Saudi Arabia?',
              fullSentence: 'Where does she live in Saudi Arabia?',
              translationAr: 'أين تعيش هي في المملكة العربية السعودية؟'
            },
            {
              subject: 'you',
              auxiliary: 'do',
              verb: 'play',
              verbFormNote: 'أداة الاستفهام: When',
              objectComplement: 'football with your friends?',
              fullSentence: 'When do you play football with your friends?',
              translationAr: 'متى تلعب كرة القدم مع أصدقائك؟'
            }
          ]
        }
      ],
      builderParts: {
        subjects: [
          { text: 'Sarah', type: 'sing' },
          { text: 'They', type: 'plur' },
          { text: 'I', type: 'i' },
          { text: 'My brother', type: 'sing' }
        ],
        auxiliaries: ['(None - الإثبات)', "don't", "doesn't", 'Do', 'Does'],
        verbs: [
          { base: 'play', conjugated: 'plays', meaningAr: 'يلعب' },
          { base: 'study', conjugated: 'studies', meaningAr: 'يدرس' },
          { base: 'drive', conjugated: 'drives', meaningAr: 'يقود' },
          { base: 'speak', conjugated: 'speaks', meaningAr: 'يتحدث' }
        ],
        objects: ['English fluently', 'football at the park', 'a red car', 'medicine at university'],
        timePhrases: ['every day', 'every morning', 'on weekends', 'at night']
      }
    },
    mistakesLesson: {
      titleAr: 'أبرز وأهم الأخطاء الشائعة وطرق تجنبها',
      introAr: 'يقع الكثير من متعلمي اللغة الإنجليزية في أخطاء مكررة عند استخدام المضارع البسيط. إليك أهم 5 أخطاء شائعة مع القواعد الذهبية لتفاديها:',
      mistakes: [
        {
          id: 'ps_m0',
          categoryAr: 'استخدام (ing) كفعل أساسي في المضارع البسيط',
          incorrect: 'I going to school every day.',
          correct: 'I go to school every day.',
          reasonAr: 'خطأ شائع جداً ومرفوض تماماً نحوياً! الفعل الأساسي في المضارع البسيط لا يأخذ (-ing) إطلاقاً، بل يُستخدم في المصدر المجرد (go / play / study) أو بإضافة s مع المفرد (goes / plays). أما (going) فتحتاج إلى فعل مساعد (am) في زمن المضارع المستمر فقط (I am going).',
          goldenRuleAr: 'القاعدة الذهبية: إياك أن تقول (I going) أو (He playing) بمفردها! في المضارع البسيط نستخدم الفعل في المصدر (I go / He plays).'
        },
        {
          id: 'ps_m1',
          categoryAr: 'نسيان S المفرد الغائب',
          incorrect: 'He speak English very well.',
          correct: 'He speaks English very well.',
          reasonAr: 'عندما يكون الفاعل مفرداً غائباً (He, She, It, أو اسم مفرد)، يجب إضافة (s / es) لنهاية الفعل في جملة الإثبات.',
          goldenRuleAr: 'القاعدة الذهبية: الفاعل المفرد يحب حرف الـ S مع الفعل في المضارع البسيط!'
        },
        {
          id: 'ps_m2',
          categoryAr: 'استخدام am/is/are مع الفعل الأساسي',
          incorrect: 'I am go to school every day.',
          correct: 'I go to school every day.',
          reasonAr: 'أفعال (am, is, are) لا تأتي مباشرة مع فعل في المصدر. إذا أردت استخدام am/is/are يجب أن يكون الفعل مستمراً بـ (-ing). في المضارع البسيط نضع الفعل الأساسي مباشرة بعد الفاعل.',
          goldenRuleAr: 'القاعدة الذهبية: لا تجمع بين (am/is/are) وفعل مجرد في جملة واحدة أبداً!'
        },
        {
          id: 'ps_m3',
          categoryAr: 'إبقاء S بعد does أو doesn\'t',
          incorrect: 'She doesn\'t likes coffee.',
          correct: 'She doesn\'t like coffee.',
          reasonAr: 'عندما نستخدم الفعل المساعد does أو doesn\'t، فإنه يأخذ حرف الـ s بالفعل، لذلك يجب أن يعود الفعل الأساسي إلى مصدره المجرد.',
          goldenRuleAr: 'القاعدة الذهبية: عند دخول Do أو Does يهرب حرف الـ S من الفعل الأساسي!'
        },
        {
          id: 'ps_m4',
          categoryAr: 'موقع ظروف التكرار (Adverbs of Frequency)',
          incorrect: 'He goes always to bed early.',
          correct: 'He always goes to bed early.',
          reasonAr: 'ظروف التكرار (always, usually, often, never) تأتي قبل الفعل الأساسي، وبعد فعل to be (am/is/are).',
          goldenRuleAr: 'القاعدة الذهبية: ظرف التكرار يسبق الفعل الأساسي (He always eats) ويتبع verb to be (He is always happy).'
        }
      ],
      proTipsAr: [
        'تذكر دائماً: الفعل المضاف له (-ing) لا يُستخدم بمفرده كفعل أساسي في المضارع البسيط إطلاقاً.',
        'إذا انتهى الفعل بـ (ch, sh, ss, x, o, z)، نضيف (es) مثل: watches, washes, fixes, goes.',
        'إذا انتهى الفعل بحرف ساكن + y، نحذف الـ y ونضيف (ies) مثل: study -> studies.'
      ]
    },
    practiceLesson: {
      titleAr: 'تمارين تفاعلية متنوعة وشاملة',
      exercises: [
        {
          id: 'ps_q1',
          type: 'mcq',
          questionAr: 'اختر الفعل الصحيح لإكمال الجملة في صيغة المفرد:',
          promptSentence: 'My sister ______ two cups of tea every morning.',
          options: ['drink', 'drinks', 'is drink', 'drinking'],
          correctAnswer: 'drinks',
          explanationAr: 'الفاعل (My sister) مفرد غائب (She)، لذلك نضيف (s) للفعل في المضارع البسيط لتصبح (drinks).'
        },
        {
          id: 'ps_q2',
          type: 'mcq',
          questionAr: 'اختر الصيغة الصحيحة للنفي مع الفاعل الجمع:',
          promptSentence: 'Khaled and Omar ______ fast food.',
          options: ["doesn't eat", "don't eat", "not eat", "aren't eat"],
          correctAnswer: "don't eat",
          explanationAr: 'الفاعل جمع (Khaled and Omar = They)، لذا نستخدم الفعل المساعد (don\'t) متبوعاً بالمصدر (eat).'
        },
        {
          id: 'ps_q3',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين جملة صحيحة مع ظرف التكرار:',
          scrambledWords: ['always', 'He', 'breakfast', 'eats', 'at 7 AM.'],
          correctAnswer: 'He always eats breakfast at 7 AM.',
          explanationAr: 'الترتيب الصحيح: الفاعل (He) + ظرف التكرار (always) + الفعل (eats) + المفعول به (breakfast) + الوقت (at 7 AM).'
        },
        {
          id: 'ps_q4',
          type: 'error_correction',
          questionAr: 'حدد الخطأ في السؤال التالي وصححه:',
          promptSentence: 'Do your brother speak French?',
          options: ['Do -> Does', 'speak -> speaks', 'French -> Frenchs', 'Do -> Is'],
          correctAnswer: 'Do -> Does',
          explanationAr: 'الفاعل (your brother) مفرد غائب، لذا يجب استخدام الفعل المساعد (Does) للسؤال بدلاً من (Do).'
        },
        {
          id: 'ps_q5',
          type: 'mcq',
          questionAr: 'اختر الإضافة الإملائية الصحيحة للفعل المنتهي بـ (ch):',
          promptSentence: 'Tariq ______ the evening news every night.',
          options: ['watchs', 'watches', 'is watch', 'watching'],
          correctAnswer: 'watches',
          explanationAr: 'الأفعال المنتهية بـ (ch) يضاف لها (es) مع الفاعل المفرد (He/She/It) فتصبح (watches).'
        },
        {
          id: 'ps_q6',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين سؤال صحيح بصيغة Wh-question:',
          scrambledWords: ['Where', 'do', 'they', 'work', 'every day?'],
          correctAnswer: 'Where do they work every day?',
          explanationAr: 'ترتيب سؤال Wh: أداة الاستفهام (Where) + الفعل المساعد (do) + الفاعل (they) + الفعل الأساسي مجرد (work) + التكملة (every day?).'
        }
      ]
    },
    freeWriteLesson: {
      titleAr: 'تكوين الجمل الحر والمدرب الذكي',
      instructionAr: 'اكتب جملتك الخاصة باستخدام زمن المضارع البسيط (Present Simple). سيتولى المصحح الذكي فحص توافق الفاعل مع الفعل، والأفعال المساعدة، ودقة التركيب السليم.',
      structuralGuide: 'S + V1(+s/es) + Object/Complement + Time phrase (every day, on weekends, etc.)',
      scenarios: [
        {
          titleAr: 'الروتين الصباحي (Morning Routine)',
          promptAr: 'اكتب ماذا تفعل أنت أو صديقك كل صباح عند الاستيقاظ.',
          starter: 'I wake up at...',
          exampleTarget: 'I drink warm water and read a book every morning.'
        },
        {
          titleAr: 'حقيقة عن وظيفتك أو دراستك (Job / Study Fact)',
          promptAr: 'اكتب ماذا تدرس أو أين تعمل أو مهارة تتقنها.',
          starter: 'She works at...',
          exampleTarget: 'My brother works as a software engineer at a tech company.'
        },
        {
          titleAr: 'عادة أسبوعية (Weekly Habit)',
          promptAr: 'اكتب عن نشاط رياضي أو ترفيهي تمارسه في عطلة نهاية الأسبوع.',
          starter: 'We play...',
          exampleTarget: 'We visit our grandparents every Friday.'
        }
      ]
    },
    finalExamLesson: {
      titleAr: 'الاختبار النهائي للوحدة وتقييم الإتقان',
      passingScorePercent: 80,
      questions: [
        {
          id: 'ps_fe1',
          question: 'Which sentence describes a permanent general truth according to the lesson rules?',
          questionAr: 'أي من الجمل التالية تصف حقيقة علمية عامة وثابتة وفق ما ورد في شرح الدرس؟',
          options: [
            'Water boils at 100°C.',
            'Water is boiling right now.',
            'Water boiled yesterday.',
            'Water will boil tomorrow.'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لمحور الاستخدام في الدرس 1: الحقائق العلمية العامة والظواهر الكونية الثابتة تصاغ دائماً في زمن المضارع البسيط (Present Simple) وتأخذ الفعل الأساسي بصيغته الحاضرة.',
          category: 'usage',
          lessonRefAr: 'الدرس 1: الاستخدام والتفصيل (الحقائق الثابتة)'
        },
        {
          id: 'ps_fe2',
          question: 'Identify the grammatically correct negative sentence based on the SVO table:',
          questionAr: 'اختر الجملة المنفية الصحيحة نحوياً وفق جدول SVO وقاعدة الأفعال المساعدة:',
          options: [
            "He doesn't likes watching TV.",
            "He doesn't like watching TV.",
            "He not like watching TV.",
            "He isn't like watching TV."
          ],
          correctIndex: 1,
          explanationAr: 'وفقاً لجدول SVO في الدرس 2: نستخدم الفعل المساعد (doesn\'t) مع الفاعل المفرد (He)، ويجب أن يعود الفعل الأساسي بعدها إلى صيغة المصدر المجرد (like) بدون أي إضافات.',
          category: 'structure',
          lessonRefAr: 'الدرس 2: جدول تركيب الجمل SVO (صيغة النفي)'
        },
        {
          id: 'ps_fe3',
          question: 'Where should frequency adverbs like "usually" and "always" be placed in a sentence?',
          questionAr: 'أين يجب وضع ظروف التكرار مثل (usually / always) داخل الجملة كما ورد في الشرح؟',
          options: [
            'Between the subject and the main verb (They usually go...).',
            'After the object at the very end of the sentence.',
            'After the main verb directly (They go usually...).',
            'Before the subject at the beginning only.'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لقواعد الكلمات الدالة في الدرس 1: ظروف التكرار (always, usually, often) توضع مباشرة بين الفاعل والفعل الأساسي (Subject + Adverb + Verb).',
          category: 'usage',
          lessonRefAr: 'الدرس 1: الكلمات الدالة وظروف التكرار'
        },
        {
          id: 'ps_fe4',
          question: 'Which question is structured correctly according to the auxiliary verb rules?',
          questionAr: 'أي من الأسئلة التالية مركب بشكل صحيح وفق قاعدة توافق الفاعل مع الفعل المساعد؟',
          options: [
            'Where does your parents live?',
            'Where do your parents live?',
            'Where your parents live?',
            'Where are your parents live?'
          ],
          correctIndex: 1,
          explanationAr: 'وفقاً لتصنيف الفاعل في الدرس 2: الفاعل (your parents) اسم جمع (يعادل They)، لذلك نستخدم الفعل المساعد (do) وليس (does).',
          category: 'structure',
          lessonRefAr: 'الدرس 2: تصنيف الفاعل وتكوين السؤال'
        },
        {
          id: 'ps_fe5',
          question: 'What is the correct fix for the common error: "Ali study English every evening"?',
          questionAr: 'ما هو التصحيح السليم للخطأ الشائع وفق "القاعدة الذهبية" للأخطاء؟',
          options: [
            'Ali studies English every evening.',
            'Ali is study English every evening.',
            'Ali studying English every evening.',
            'Ali studyes English every evening.'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً للدرس 3 (الأخطاء الشائعة): مع الفاعل المفرد الغائب (Ali) نضيف s/es للفعل، والأفعال المنتهية بساكن + y مثل (study) تُقلب فيها y إلى ies فتصبح (studies).',
          category: 'mistake',
          lessonRefAr: 'الدرس 3: الأخطاء الشائعة والقاعدة الذهبية'
        }
      ]
    }
  },
  {
    id: 'present_continuous',
    nameEn: 'Present Continuous',
    nameAr: 'المضارع المستمر',
    category: 'present',
    level: 'مبتدئ',
    shortFormula: 'Subject + am/is/are + V-ing + Object',
    summaryAr: 'يُستخدم للأحداث الجارية في لحظة التحدث، أو الترتيبات المؤكدة في المستقبل القريب.',
    timelineDescriptionAr: 'يحدث الآن في هذه اللحظة بشكل مؤقت ومستمر، أو خطة مستقبلية مؤكدة.',
    timelinePoint: 0.2,
    usageLesson: {
      titleAr: 'الاستخدام والتفصيل مع أمثلة حية',
      overviewAr: 'المضارع المستمر (Present Continuous / Progressive) يركز على استمرارية الحدث ونشاطه في الوقت الحاضر أو الفترة الحالية المؤقتة.',
      useCases: [
        {
          titleAr: '1. أفعال مستمرة وتحدث في لحظة التحدث (Actions Happening Now)',
          descriptionAr: 'عندما تتحدث عن فعل مستمر في الحدوث في لحظة الكلام بالذات وأمام عينيك.',
          examples: [
            {
              id: 'pc_ex1',
              sentence: 'I am playing football now.',
              translationAr: 'أنا ألعب كرة القدم الآن.',
              contextAr: 'أنت في الملعب وتلعب الكرة في هذه اللحظة بالذات أثناء حديثك.',
              subject: 'I',
              auxiliary: 'am',
              verb: 'playing',
              complement: 'football',
              timeMarker: 'now'
            },
            {
              id: 'pc_ex2',
              sentence: 'She is cooking dinner.',
              translationAr: 'هي تطبخ العشاء الآن.',
              contextAr: 'هي الآن موجودة في المطبخ وتقوم بعملية طبخ العشاء في هذه الأثناء.',
              subject: 'She',
              auxiliary: 'is',
              verb: 'cooking',
              complement: 'dinner'
            }
          ]
        },
        {
          titleAr: '2. أفعال ومشاريع مؤقتة (Temporary Actions & Projects)',
          descriptionAr: 'عندما تقوم بفعل أو مشروع مؤقت يستمر لفترة معينة (هذا الأسبوع، هذا الشهر، هذا الفصل) وسينتهي بانتهاء مدته.',
          examples: [
            {
              id: 'pc_ex3',
              sentence: 'I am studying a lot this weekend.',
              translationAr: 'أنا أذاكر كثيراً في عطلة نهاية هذا الأسبوع.',
              contextAr: 'كمية المذاكرة الكثيرة مؤقتة وخاصة بعطلة نهاية هذا الأسبوع فقط.',
              subject: 'I',
              auxiliary: 'am',
              verb: 'studying',
              complement: 'a lot',
              timeMarker: 'this weekend'
            },
            {
              id: 'pc_ex4',
              sentence: 'He is working on a new project.',
              translationAr: 'هو يعمل على مشروع جديد.',
              contextAr: 'يعمل الآن على مشروع محدد وسينتهي عمله هذا بانتهاء تسليم المشروع.',
              subject: 'He',
              auxiliary: 'is',
              verb: 'working',
              complement: 'on a new project'
            }
          ]
        }
      ],
      keywords: [
        { word: 'Now / Right now', meaningAr: 'الآن / الآن بالذات', example: 'I am playing football now.' },
        { word: 'At the moment', meaningAr: 'في هذه اللحظة', example: 'She is cooking at the moment.' },
        { word: 'Today', meaningAr: 'اليوم', example: 'We are working today.' },
        { word: 'This week / month', meaningAr: 'هذا الأسبوع / الشهر', example: 'I am studying a lot this weekend.' }
      ],
      timeConceptAr: 'نقطة نشطة تتمدد حول لحظة الحاضر وتؤكد على استمرارية الحدث ومؤقتية وقوعه.'
    },
    svoLesson: {
      titleAr: 'تركيب الجمل وجدول SVO + الأفعال المساعدة',
      rulesAr: [
        'الفعل المساعد إجباري دائماً: am مع (I)، و is مع (he, she, it ومفرد)، و are مع (you, they, we وجمع).',
        'الفعل الأساسي دائماً يأخذ اللاحقة (-ing) للدلالة على الاستمرار.',
        'في النفي: نضع (not) مباشرة بعد الفعل المساعد (am not / isn\'t / aren\'t).',
        'في السؤال: نبدأ بالفعل المساعد (Am / Is / Are) قبل الفاعل.'
      ],
      auxiliaryRulesAr: 'الأفعال المساعدة في هذا الزمن هي Verb to Be (am, is, are). بدونها تسقط الجملة نحوياً!',
      goldenNotesAr: [
        'ملاحظة: صيغة -ing إجبارية مع الفعل الأساسي في هذا الزمن.',
        'نستخدم am حصراً مع الضمير I، و is مع الأسماء والضمائر المفردة، و are مع ضمائر وأسماء الجمع.',
        'ملاحظة للنفي: نضيف not بعد الفعل المساعد فتصبح: am not, isn\'t, aren\'t.'
      ],
      subjectClassification: {
        singularPronouns: ['He (هو)', 'She (هي)', 'It (هو/هي لغير العاقل)'],
        singularNouns: [
          { en: 'The student', ar: 'الطالب' },
          { en: 'The baby', ar: 'الطفل' },
          { en: 'Sarah', ar: 'سارة' },
          { en: 'My friend', ar: 'صديقي' }
        ],
        pluralPronouns: ['I (أنا - مع am)', 'You (أنت / أنتم)', 'They (هم)', 'We (نحن)'],
        pluralNouns: [
          { en: 'The students', ar: 'الطلاب' },
          { en: 'The players', ar: 'اللاعبون' },
          { en: 'Friends', ar: 'الأصدقاء' },
          { en: 'Children', ar: 'الأطفال' }
        ]
      },
      structures: [
        {
          formType: 'affirmative',
          formTitleAr: '1. الإثبات (Affirmative)',
          formTitleEn: 'Affirmative Structure',
          formula: 'Subject + am / is / are + Verb-ing + Object',
          explanationAr: 'الفاعل + فعل be المساعد المناسب + الفعل مضافاً إليه ing + المفعول به.',
          tableRows: [
            {
              subject: 'I (أنا)',
              auxiliary: 'am',
              verb: 'playing',
              verbFormNote: 'Verb + ing',
              objectComplement: 'football',
              timeMarker: 'now',
              fullSentence: 'I am playing football.',
              translationAr: 'أنا ألعب كرة القدم الآن.'
            },
            {
              subject: 'He (هو)',
              auxiliary: 'is',
              verb: 'watching',
              verbFormNote: 'Verb + ing',
              objectComplement: 'a movie',
              fullSentence: 'He is watching a movie.',
              translationAr: 'هو يشاهد فيلماً.'
            },
            {
              subject: 'She (هي)',
              auxiliary: 'is',
              verb: 'cooking',
              verbFormNote: 'Verb + ing',
              objectComplement: 'dinner',
              fullSentence: 'She is cooking dinner.',
              translationAr: 'هي تطبخ العشاء.'
            },
            {
              subject: 'You (أنت)',
              auxiliary: 'are',
              verb: 'working',
              verbFormNote: 'Verb + ing',
              objectComplement: 'a lot this week',
              fullSentence: 'You are working a lot this week.',
              translationAr: 'أنت تعمل كثيراً هذا الأسبوع.'
            },
            {
              subject: 'We (نحن)',
              auxiliary: 'are',
              verb: 'studying',
              verbFormNote: 'Verb + ing',
              objectComplement: 'for exams next week',
              fullSentence: 'We are studying for exams next week.',
              translationAr: 'نحن ندرس للاختبارات الأسبوع القادم.'
            }
          ]
        },
        {
          formType: 'negative',
          formTitleAr: '2. النفي (Negative)',
          formTitleEn: 'Negative Structure',
          formula: 'Subject + am/is/are + not + Verb-ing + Object',
          explanationAr: 'نضيف not بعد الفعل المساعد مباشرة دون أي تغيير في صيغة الفعل المنتهي بـ ing.',
          tableRows: [
            {
              subject: 'I (أنا)',
              auxiliary: 'am not',
              verb: 'playing',
              verbFormNote: 'Verb + ing',
              objectComplement: 'football',
              fullSentence: 'I am not playing football.',
              translationAr: 'أنا لا ألعب كرة القدم.'
            },
            {
              subject: 'He (هو)',
              auxiliary: "is not (isn't)",
              verb: 'watching',
              verbFormNote: 'Verb + ing',
              objectComplement: 'a movie',
              fullSentence: 'He is not watching a movie.',
              translationAr: 'هو لا يشاهد فيلماً.'
            },
            {
              subject: 'She (هي)',
              auxiliary: "is not (isn't)",
              verb: 'cooking',
              verbFormNote: 'Verb + ing',
              objectComplement: 'dinner',
              fullSentence: 'She is not cooking dinner.',
              translationAr: 'هي لا تطبخ العشاء.'
            },
            {
              subject: 'You (أنت)',
              auxiliary: "are not (aren't)",
              verb: 'working',
              verbFormNote: 'Verb + ing',
              objectComplement: 'a lot this week',
              fullSentence: 'You are not working a lot this week.',
              translationAr: 'أنت لا تعمل كثيراً هذا الأسبوع.'
            },
            {
              subject: 'We (نحن)',
              auxiliary: "are not (aren't)",
              verb: 'studying',
              verbFormNote: 'Verb + ing',
              objectComplement: 'for exams next week',
              fullSentence: 'We are not studying for exams next week.',
              translationAr: 'نحن لا ندرس للاختبارات الأسبوع القادم.'
            }
          ]
        },
        {
          formType: 'yes_no_question',
          formTitleAr: '3. تكوين السؤال (Questions)',
          formTitleEn: 'Question Structure',
          formula: 'Am / Is / Are + Subject + Verb-ing + Object?',
          explanationAr: 'نقدم الفعل المساعد (Am / Is / Are) في بداية السؤال قبل الفاعل.',
          tableRows: [
            {
              subject: 'I',
              auxiliary: 'Am',
              verb: 'playing',
              verbFormNote: 'Verb + ing',
              objectComplement: 'football?',
              fullSentence: 'Am I playing football?',
              translationAr: 'هل أنا ألعب كرة القدم؟'
            },
            {
              subject: 'he',
              auxiliary: 'Is',
              verb: 'watching',
              verbFormNote: 'Verb + ing',
              objectComplement: 'a movie?',
              fullSentence: 'Is he watching a movie?',
              translationAr: 'هل هو يشاهد فيلماً؟'
            },
            {
              subject: 'she',
              auxiliary: 'Is',
              verb: 'cooking',
              verbFormNote: 'Verb + ing',
              objectComplement: 'dinner?',
              fullSentence: 'Is she cooking dinner?',
              translationAr: 'هل هي تطبخ العشاء؟'
            },
            {
              subject: 'you',
              auxiliary: 'Are',
              verb: 'working',
              verbFormNote: 'Verb + ing',
              objectComplement: 'a lot this week?',
              fullSentence: 'Are you working a lot this week?',
              translationAr: 'هل تعمل كثيراً هذا الأسبوع؟'
            },
            {
              subject: 'we',
              auxiliary: 'Are',
              verb: 'studying',
              verbFormNote: 'Verb + ing',
              objectComplement: 'for exams next week?',
              fullSentence: 'Are we studying for exams next week?',
              translationAr: 'هل نحن ندرس للاختبارات الأسبوع القادم؟'
            }
          ]
        }
      ],
      builderParts: {
        subjects: [
          { text: 'I', type: 'i' },
          { text: 'She', type: 'sing' },
          { text: 'The engineers', type: 'plur' },
          { text: 'You', type: 'you' }
        ],
        auxiliaries: ['am', 'is', 'are', "isn't", "aren't"],
        verbs: [
          { base: 'build', conjugated: 'building', meaningAr: 'يبني' },
          { base: 'design', conjugated: 'designing', meaningAr: 'يصمم' },
          { base: 'read', conjugated: 'reading', meaningAr: 'يقرأ' },
          { base: 'prepare', conjugated: 'preparing', meaningAr: 'يجهز' }
        ],
        objects: ['a mobile application', 'a scientific report', 'for the exam', 'delicious lunch'],
        timePhrases: ['right now', 'at the moment', 'currently', 'this afternoon']
      }
    },
    mistakesLesson: {
      titleAr: 'أبرز وأهم الأخطاء الشائعة وطرق تجنبها',
      introAr: 'إليك أهم العثرات التي يقع فيها الطلاب في المضارع المستمر وكيفية تصحيحها:',
      mistakes: [
        {
          id: 'pc_m1',
          categoryAr: 'نسيان الفعل المساعد (am/is/are)',
          incorrect: 'She playing tennis now.',
          correct: 'She is playing tennis now.',
          reasonAr: 'لا يمكن وضع الفعل مضافاً إليه ing بمفرده دون فعل مساعد يربطه بالفاعل.',
          goldenRuleAr: 'القاعدة الذهبية: الـ (-ing) يتيمة لا تقف بمفردها أبداً بدون (am / is / are)!'
        },
        {
          id: 'pc_m2',
          categoryAr: 'استخدام الأفعال التقريرية (Stative Verbs) في المستمر',
          incorrect: 'I am understanding the lesson now.',
          correct: 'I understand the lesson now.',
          reasonAr: 'أفعال الحواس والشعور والإدراك (understand, know, like, want, believe, need) لا تقبل الاستمرار وتستخدم في المضارع البسيط.',
          goldenRuleAr: 'القاعدة الذهبية: أفعال العقل والمشاعر لا تأخذ (-ing) حتى لو كان معناها "الآن"!'
        },
        {
          id: 'pc_m3',
          categoryAr: 'أخطاء الإملاء عند إضافة ing',
          incorrect: 'He is writeing / swiming now.',
          correct: 'He is writing / swimming now.',
          reasonAr: 'الفعل المنتهي بـ e تحذف الـ e عند إضافة ing (write -> writing). والفعل المكون من ساكن-متحرك-ساكن نضاعف الحرف الأخير (swim -> swimming).',
          goldenRuleAr: 'القاعدة الذهبية: احذف الـ e الصامتة وضاعف الحرف الأخير إذا سبقه حرف علة واحد قصير!'
        }
      ],
      proTipsAr: [
        'الأفعال مثل (have) تأخذ ing إذا كانت تعني "يتناول" أو "يقضي وقتاً" (I am having breakfast)، لكنها لا تأخذ ing إذا كانت تعني "يمتلك" (I have a car).'
      ]
    },
    practiceLesson: {
      titleAr: 'تمارين تفاعلية متنوعة وشاملة',
      exercises: [
        {
          id: 'pc_q1',
          type: 'mcq',
          questionAr: 'اختر التكملة الصحيحة للجملة مع حدث يقع الآن:',
          promptSentence: 'Be quiet! The baby ______ in the bedroom.',
          options: ['sleeps', 'is sleeping', 'are sleeping', 'sleeping'],
          correctAnswer: 'is sleeping',
          explanationAr: 'كلمة (Be quiet!) تدل على أن الحدث يقع الآن، والفاعل (The baby) مفرد لذا يأخذ (is sleeping).'
        },
        {
          id: 'pc_q2',
          type: 'mcq',
          questionAr: 'اختر الجملة الصحيحة مراعياً أفعال الحالة (Stative Verbs):',
          promptSentence: 'Which of the following is correct?',
          options: [
            'I am knowing the correct answer.',
            'I know the correct answer.',
            'I knowing the correct answer.',
            'I am know the correct answer.'
          ],
          correctAnswer: 'I know the correct answer.',
          explanationAr: 'الفعل (know) من أفعال الإدراك والحالة (Stative verb) ولا يُصاغ في زمن المستمر.'
        },
        {
          id: 'pc_q3',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين سؤال صحيح في المضارع المستمر:',
          scrambledWords: ['Why', 'are', 'you', 'crying', 'right now?'],
          correctAnswer: 'Why are you crying right now?',
          explanationAr: 'ترتيب سؤال Wh: أداة الاستفهام (Why) + الفعل المساعد (are) + الفاعل (you) + الفعل-ing (crying) + الدلالة الزمنية (right now?).'
        },
        {
          id: 'pc_q4',
          type: 'error_correction',
          questionAr: 'صحح الخطأ في الفعل المساعد للفاعل الجمع:',
          promptSentence: 'They is preparing for the final match.',
          options: ['is -> are', 'preparing -> prepare', 'match -> matches', 'They -> He'],
          correctAnswer: 'is -> are',
          explanationAr: 'الضمير (They) جمع ويتطلب الفعل المساعد (are) مع الفعل المضاف له ing.'
        },
        {
          id: 'pc_q5',
          type: 'mcq',
          questionAr: 'اختر التهجئة الصحيحة لإضافة ing مع مضاعفة الحرف الأخير:',
          promptSentence: 'Look at the swimming pool! The boy ______ very fast.',
          options: ['is swiming', 'is swimming', 'are swimming', 'swims'],
          correctAnswer: 'is swimming',
          explanationAr: 'الفعل swim ينتهي بـ ساكن مسبوق بمتحرك قصير (CVC)، لذلك نضاعف الـ m لتصبح (is swimming).'
        },
        {
          id: 'pc_q6',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين جملة تعبر عن خطة مستقبلية مؤكدة ومجدولة:',
          scrambledWords: ['meeting', 'We', 'are', 'the manager', 'tomorrow at 10 AM.'],
          correctAnswer: 'We are meeting the manager tomorrow at 10 AM.',
          explanationAr: 'الترتيب: الفاعل (We) + الفعل المساعد (are) + الفعل-ing (meeting) + المفعول به (the manager) + الموعد المستقبلي المجدول (tomorrow at 10 AM).'
        }
      ]
    },
    freeWriteLesson: {
      titleAr: 'تكوين الجمل الحر والمدرب الذكي',
      instructionAr: 'اكتب جملة تعبر عن حدث تفعله أنت أو أشخاص آخرون في هذه اللحظة بالتحديد، أو خطة مؤكدة في المستقبل القريب.',
      structuralGuide: 'S + am/is/are + V-ing + Complement + (now / at the moment)',
      scenarios: [
        {
          titleAr: 'ماذا تفعل الآن؟ (Current Action)',
          promptAr: 'صف ما تقوم به حالياً في دراستك أو غرفتك.',
          starter: 'I am currently...',
          exampleTarget: 'I am currently studying the present continuous tense on my laptop.'
        },
        {
          titleAr: 'ماذا يفعل أفراد عائلتك؟ (Family Actions)',
          promptAr: 'اكتب ماذا يفعل والدك أو أختك في هذه الأثناء.',
          starter: 'My mother is...',
          exampleTarget: 'My mother is preparing a cup of coffee in the kitchen.'
        }
      ]
    },
    finalExamLesson: {
      titleAr: 'الاختبار النهائي للوحدة وتقييم الإتقان',
      passingScorePercent: 80,
      questions: [
        {
          id: 'pc_fe1',
          question: 'Which sentence describes an action happening at the exact moment of speech?',
          questionAr: 'أي من الجمل التالية تصف حدثاً يقع في لحظة الكلام مباشرة وفق أمثلة الدرس؟',
          options: [
            'She usually drives to work.',
            'She is driving to work right now.',
            'She drove to work yesterday.',
            'She will drive to work tomorrow.'
          ],
          correctIndex: 1,
          explanationAr: 'وفقاً لحالة الاستخدام 1 في الدرس 1: التركيبة (is + V-ing) مع الكلمة الدالة (right now) تعبر عن حدث جاري ومستمر في لحظة التحدث بالذات.',
          category: 'usage',
          lessonRefAr: 'الدرس 1: الاستخدام والتفصيل (الأحداث الجارية الآن)'
        },
        {
          id: 'pc_fe2',
          question: 'According to the Golden Rule for auxiliary verbs, what is the required form for "She"?',
          questionAr: 'وفقاً لجدول SVO وقاعدة الأفعال المساعدة، ما هو التركيب الصحيح مع الفاعل المفرد (She)؟',
          options: [
            'She is cooking dinner.',
            'She are cooking dinner.',
            'She am cooking dinner.',
            'She cooking dinner.'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لجدول SVO في الدرس 2: الضمائر المفردة (he, she, it) تأخذ دائماً الفعل المساعد (is) متبوعاً بالفعل مضافاً إليه (-ing).',
          category: 'structure',
          lessonRefAr: 'الدرس 2: جدول تركيب الجمل SVO والأفعال المساعدة'
        },
        {
          id: 'pc_fe3',
          question: 'Which of these verbs is a stative verb (أفعال الإدراك والشعور) that CANNOT take -ing?',
          questionAr: 'أي من الأفعال التالية هو فعل تقريري/شعوري (Stative Verb) لا يقبل -ing كما شرحنا في الأخطاء الشائعة؟',
          options: ['Play', 'Run', 'Believe', 'Watch'],
          correctIndex: 2,
          explanationAr: 'وفقاً لقاعدة الأخطاء الشائعة في الدرس 3: أفعال الحواس والعقل والمشاعر (understand, know, believe, want) لا تقبل -ing وتصاغ في المضارع البسيط.',
          category: 'mistake',
          lessonRefAr: 'الدرس 3: الأخطاء الشائعة (أفعال الحالة Stative Verbs)'
        },
        {
          id: 'pc_fe4',
          question: 'What is the correct negative form of "They are watching a movie" according to the SVO rules?',
          questionAr: 'ما هي صيغة النفي الصحيحة وفقاً لقواعد النفي في جدول SVO؟',
          options: [
            "They aren't watching a movie.",
            "They don't watching a movie.",
            "They not watching a movie.",
            "They aren't watch a movie."
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لجدول النفي في الدرس 2: ننفي بإضافة not بعد الفعل المساعد (are) مباشرة لتصبح (aren\'t watching) مع بقاء الفعل مضافاً إليه -ing.',
          category: 'structure',
          lessonRefAr: 'الدرس 2: جدول تركيب الجمل SVO (صيغة النفي)'
        },
        {
          id: 'pc_fe5',
          question: 'Choose the correct spelling rule when adding -ing to the short verb "run":',
          questionAr: 'اختر الإملاء الصحيح عند إضافة -ing للفعل (run) وفق القاعدة الإملائية المشروحة:',
          options: ['runing', 'running', 'runeing', 'runned'],
          correctIndex: 1,
          explanationAr: 'وفقاً للقاعدة الذهبية للإملاء في الدرس 3: الفعل القصير المكون من (ساكن + متحرك + ساكن) نضاعف حرفه الأخير قبل إضافة ing ليصبح (running).',
          category: 'mistake',
          lessonRefAr: 'الدرس 3: الأخطاء الشائعة وقواعد الإملاء'
        }
      ]
    }
  },
  {
    id: 'present_perfect',
    nameEn: 'Present Perfect',
    nameAr: 'المضارع التام',
    category: 'present',
    level: 'متوسط',
    shortFormula: 'Subject + have/has + V3 (Past Participle)',
    summaryAr: 'يربط بين الماضي والحاضر: تجارب حياتية سابقة، أو أحداث حدثت في الماضي ولها أثر أو نتيجة حاضرة.',
    timelineDescriptionAr: 'بدأ في الماضي وتأثيره أو نتيجته مستمرة وحاضرة الآن.',
    timelinePoint: -0.5,
    usageLesson: {
      titleAr: 'الاستخدام والتفصيل مع أمثلة حية',
      overviewAr: 'المضارع التام (Present Perfect) هو الجسر السحري بين الماضي والحاضر. الوقت الذي حدث فيه الفعل غير محدد، ولكن النتيجة هي المهمة الآن.',
      useCases: [
        {
          titleAr: '1. أفعال حدثت في الماضي ولها أثر مستمر في الحاضر (Action with Present Result)',
          descriptionAr: 'عندما تفعل شيئاً في الماضي ولكن أثره ونتيجته لا تزال ملموسة وواضحة في الحاضر.',
          examples: [
            {
              id: 'pp_ex1',
              sentence: 'I have lost my keys.',
              translationAr: 'أنا أضعت مفاتيحي.',
              contextAr: 'الحدث: ضاع المفتاح في الماضي. التأثير في الحاضر: لا أستطيع الدخول إلى المنزل الآن.',
              subject: 'I',
              auxiliary: 'have',
              verb: 'lost (V3)',
              complement: 'my keys'
            },
            {
              id: 'pp_ex2',
              sentence: 'He has finished his homework.',
              translationAr: 'هو أنهى واجبه المدرسي.',
              contextAr: 'الحدث: تم حل الواجب في وقت سابق. التأثير في الحاضر: هو الآن متفرغ وبإمكانه اللعب أو الراحة.',
              subject: 'He',
              auxiliary: 'has',
              verb: 'finished (V3)',
              complement: 'his homework'
            }
          ]
        },
        {
          titleAr: '2. أفعال حدثت وانتهت بالماضي دون ذكر وقت محدد (Indefinite Past Actions)',
          descriptionAr: 'عندما تتحدث عن فعل وقع وانتهى في الماضي، والمهم هو وقوع الحدث نفسه وليس تحديد تاريخ أو وقت حدوثه.',
          examples: [
            {
              id: 'pp_ex3',
              sentence: 'I have played football.',
              translationAr: 'أنا لعبت كرة القدم.',
              contextAr: 'حدث وقع في الماضي وانتهى، ولكن ليس مهماً تحديد متى أو في أي وقت.',
              subject: 'I',
              auxiliary: 'have',
              verb: 'played (V3)',
              complement: 'football'
            },
            {
              id: 'pp_ex4',
              sentence: 'He has finished studying.',
              translationAr: 'هو انتهى من المذاكرة.',
              contextAr: 'انتهى من المذاكرة بدون ذكر للوقت المحدد الذي انتهى فيه.',
              subject: 'He',
              auxiliary: 'has',
              verb: 'finished (V3)',
              complement: 'studying'
            }
          ]
        },
        {
          titleAr: '3. أفعال بدأت في الماضي وما زالت مستمرة في الحاضر (Started in Past & Continues)',
          descriptionAr: 'عندما تبدأ في فعل أو حالة في الماضي وما زلت مستمراً فيها حتى الآن (غالباً مع For و Since).',
          examples: [
            {
              id: 'pp_ex5',
              sentence: 'I have worked in this company for 5 years.',
              translationAr: 'أنا أعمل في هذه الشركة منذ 5 سنوات.',
              contextAr: 'بدأ العمل في الشركة منذ 5 سنوات وما زال على رأس العمل في نفس الشركة.',
              subject: 'I',
              auxiliary: 'have',
              verb: 'worked (V3)',
              complement: 'in this company',
              timeMarker: 'for 5 years'
            },
            {
              id: 'pp_ex6',
              sentence: 'She has lived in Makkah since 2010.',
              translationAr: 'هي تعيش في مكة منذ عام 2010.',
              contextAr: 'بدأت بالعيش في مكة عام 2010 وما زالت تسكن وتعيش فيها حتى اليوم.',
              subject: 'She',
              auxiliary: 'has',
              verb: 'lived (V3)',
              complement: 'in Makkah',
              timeMarker: 'since 2010'
            }
          ]
        }
      ],
      keywords: [
        { word: 'Already', meaningAr: 'بالفعل / مسبقاً', example: 'I have already finished.' },
        { word: 'Just', meaningAr: 'للتو / حالاً', example: 'She has just arrived.' },
        { word: 'Since', meaningAr: 'منذ (بداية الوقت)', example: 'She has lived here since 2010.' },
        { word: 'For', meaningAr: 'لمدة (حساب المدة)', example: 'I have worked here for 5 years.' },
        { word: 'Ever / Never', meaningAr: 'سبق لك / أبداً', example: 'Have you ever visited London?' }
      ],
      timeConceptAr: 'يربط حدثاً ماضياً غير محدد بنتيجة حية أو استمرارية في الحاضر.'
    },
    svoLesson: {
      titleAr: 'تركيب الجمل وجدول SVO + الأفعال المساعدة',
      rulesAr: [
        'نستخدم have مع الضمائر (I, you, they, we) وأسماء الجمع.',
        'نستخدم has مع الضمائر (he, she, it) وأسماء المفرد.',
        'الفعل الأساسي يجب أن يكون دائماً في التصريف الثالث (Past Participle - V3).',
        'في النفي: have not (haven\'t) أو has not (hasn\'t) + V3.',
        'في السؤال: نقدم Have أو Has في بداية الجملة قبل الفاعل.'
      ],
      auxiliaryRulesAr: 'have و has أفعال مساعدة أساسية مسؤولة عن حمل صيغة الزمن وعلامة النفي (haven\'t / hasn\'t).',
      goldenNotesAr: [
        'ملاحظة: الفعل بعد have أو has يجب أن يكون في التصريف الثالث (V3) دائماً!',
        'الأفعال الشاذة تتغير تصريفاتها كلياً (go -> went -> gone, eat -> ate -> eaten, see -> saw -> seen).',
        'اختصارات النفي: have not تصبح haven\'t، و has not تصبح hasn\'t.'
      ],
      subjectClassification: {
        singularPronouns: ['He (هو)', 'She (هي)', 'It (هو/هي لغير العاقل)'],
        singularNouns: [
          { en: 'The manager', ar: 'المدير' },
          { en: 'Sarah', ar: 'سارة' },
          { en: 'The student', ar: 'الطالب' },
          { en: 'My brother', ar: 'أخي' }
        ],
        pluralPronouns: ['I (أنا)', 'You (أنت / أنتم)', 'They (هم)', 'We (نحن)'],
        pluralNouns: [
          { en: 'The managers', ar: 'المدراء' },
          { en: 'Students', ar: 'الطلاب' },
          { en: 'Employees', ar: 'الموظفون' },
          { en: 'Friends', ar: 'الأصدقاء' }
        ]
      },
      structures: [
        {
          formType: 'affirmative',
          formTitleAr: '1. الإثبات (Affirmative)',
          formTitleEn: 'Affirmative Structure',
          formula: 'Subject + have / has + Verb (V3) + Object',
          explanationAr: 'الفاعل + have/has + التصريف الثالث للفعل (V3) + المفعول به.',
          tableRows: [
            {
              subject: 'I (أنا)',
              auxiliary: 'have',
              verb: 'played',
              verbFormNote: 'التصريف الثالث V3',
              objectComplement: 'football',
              fullSentence: 'I have played football.',
              translationAr: 'أنا لعبت كرة القدم.'
            },
            {
              subject: 'He (هو)',
              auxiliary: 'has',
              verb: 'watched',
              verbFormNote: 'التصريف الثالث V3',
              objectComplement: 'a movie',
              fullSentence: 'He has watched a movie.',
              translationAr: 'هو شاهد فيلماً.'
            },
            {
              subject: 'She (هي)',
              auxiliary: 'has',
              verb: 'bought',
              verbFormNote: 'التصريف الثالث V3 (شاذ)',
              objectComplement: 'dinner',
              fullSentence: 'She has bought dinner.',
              translationAr: 'هي اشترت العشاء.'
            },
            {
              subject: 'You (أنت)',
              auxiliary: 'have',
              verb: 'worked',
              verbFormNote: 'التصريف الثالث V3',
              objectComplement: 'a lot',
              fullSentence: 'You have worked a lot.',
              translationAr: 'أنت عملت كثيراً.'
            },
            {
              subject: 'We (نحن)',
              auxiliary: 'have',
              verb: 'studied',
              verbFormNote: 'التصريف الثالث V3',
              objectComplement: 'for 3 hours',
              fullSentence: 'We have studied for 3 hours.',
              translationAr: 'نحن درسنا لمدة 3 ساعات.'
            }
          ]
        },
        {
          formType: 'negative',
          formTitleAr: '2. النفي (Negative)',
          formTitleEn: 'Negative Structure',
          formula: 'Subject + have/has + not + Verb (V3) + Object',
          explanationAr: 'نضيف not بعد have أو has ويبقى الفعل في التصريف الثالث (V3).',
          tableRows: [
            {
              subject: 'I (أنا)',
              auxiliary: "have not (haven't)",
              verb: 'played',
              verbFormNote: 'التصريف الثالث V3',
              objectComplement: 'football',
              fullSentence: 'I have not played football.',
              translationAr: 'أنا لم ألعب كرة القدم.'
            },
            {
              subject: 'He (هو)',
              auxiliary: "has not (hasn't)",
              verb: 'watched',
              verbFormNote: 'التصريف الثالث V3',
              objectComplement: 'a movie',
              fullSentence: 'He has not watched a movie.',
              translationAr: 'هو لم يشاهد فيلماً.'
            },
            {
              subject: 'She (هي)',
              auxiliary: "has not (hasn't)",
              verb: 'bought',
              verbFormNote: 'التصريف الثالث V3',
              objectComplement: 'dinner',
              fullSentence: 'She has not bought dinner.',
              translationAr: 'هي لم تشترِ العشاء.'
            },
            {
              subject: 'You (أنت)',
              auxiliary: "have not (haven't)",
              verb: 'worked',
              verbFormNote: 'التصريف الثالث V3',
              objectComplement: 'a lot',
              fullSentence: 'You have not worked a lot.',
              translationAr: 'أنت لم تعمل كثيراً.'
            },
            {
              subject: 'We (نحن)',
              auxiliary: "have not (haven't)",
              verb: 'studied',
              verbFormNote: 'التصريف الثالث V3',
              objectComplement: 'for 3 hours',
              fullSentence: 'We have not studied for 3 hours.',
              translationAr: 'نحن لم ندرس لمدة 3 ساعات.'
            }
          ]
        },
        {
          formType: 'yes_no_question',
          formTitleAr: '3. تكوين السؤال (Questions)',
          formTitleEn: 'Question Structure',
          formula: 'Have / Has + Subject + Verb (V3) + Object?',
          explanationAr: 'نبدأ السؤال بـ Have أو Has متبوعاً بالفاعل ثم الفعل في التصريف الثالث.',
          tableRows: [
            {
              subject: 'I',
              auxiliary: 'Have',
              verb: 'played',
              verbFormNote: 'التصريف الثالث V3',
              objectComplement: 'football?',
              fullSentence: 'Have I played football?',
              translationAr: 'هل أنا لعبت كرة القدم؟'
            },
            {
              subject: 'he',
              auxiliary: 'Has',
              verb: 'watched',
              verbFormNote: 'التصريف الثالث V3',
              objectComplement: 'a movie?',
              fullSentence: 'Has he watched a movie?',
              translationAr: 'هل هو شاهد فيلماً؟'
            },
            {
              subject: 'she',
              auxiliary: 'Has',
              verb: 'bought',
              verbFormNote: 'التصريف الثالث V3',
              objectComplement: 'dinner?',
              fullSentence: 'Has she bought dinner?',
              translationAr: 'هل هي اشترت العشاء؟'
            },
            {
              subject: 'you',
              auxiliary: 'Have',
              verb: 'worked',
              verbFormNote: 'التصريف الثالث V3',
              objectComplement: 'a lot?',
              fullSentence: 'Have you worked a lot?',
              translationAr: 'هل أنت عملت كثيراً؟'
            },
            {
              subject: 'we',
              auxiliary: 'Have',
              verb: 'studied',
              verbFormNote: 'التصريف الثالث V3',
              objectComplement: 'for 3 hours?',
              fullSentence: 'Have we studied for 3 hours?',
              translationAr: 'هل نحن درسنا لمدة 3 ساعات؟'
            }
          ]
        }
      ],
      builderParts: {
        subjects: [
          { text: 'I', type: 'i' },
          { text: 'The manager', type: 'sing' },
          { text: 'They', type: 'plur' },
          { text: 'We', type: 'plur' }
        ],
        auxiliaries: ['have', 'has', "haven't", "hasn't"],
        verbs: [
          { base: 'see', conjugated: 'seen', meaningAr: 'رأى' },
          { base: 'finish', conjugated: 'finished', meaningAr: 'أنهى' },
          { base: 'visit', conjugated: 'visited', meaningAr: 'زار' },
          { base: 'learn', conjugated: 'learned', meaningAr: 'تعلم' }
        ],
        objects: ['the new museum', 'all the requirements', 'this difficult lesson', 'five countries'],
        timePhrases: ['already', 'recently', 'so far', 'yet']
      }
    },
    mistakesLesson: {
      titleAr: 'أبرز وأهم الأخطاء الشائعة وطرق تجنبها',
      introAr: 'الفرق الدقيق بين الماضي البسيط والمضارع التام هو أكثر نقطة محيرة للطلاب. إليك أبرز الأخطاء:',
      mistakes: [
        {
          id: 'pp_m1',
          categoryAr: 'استخدام وقت محدد في الماضي مع المضارع التام',
          incorrect: 'I have seen him yesterday.',
          correct: 'I saw him yesterday. (OR: I have seen him recently.)',
          reasonAr: 'إذا حُدد وقت انتهاء الفعل في الماضي (yesterday, in 2010, last week, 2 hours ago)، يجب استخدام الماضي البسيط (Past Simple) وليس المضارع التام.',
          goldenRuleAr: 'القاعدة الذهبية: إذا حددت تاريخاً أو وقتاً ماضياً محدداً، ابتعد عن (have/has) واستخدم الماضي البسيط!'
        },
        {
          id: 'pp_m2',
          categoryAr: 'وضع التصريف الأول أو الثاني بدلاً من V3',
          incorrect: 'She has saw that movie.',
          correct: 'She has seen that movie.',
          reasonAr: 'بعد have / has يجب حصراً استخدام التصريف الثالث للفعل (Past Participle - V3).',
          goldenRuleAr: 'القاعدة الذهبية: have و has لا تصادق سوى التصريف الثالث (V3)!'
        },
        {
          id: 'pp_m3',
          categoryAr: 'الخلط بين Since و For',
          incorrect: 'I have lived here since 5 years.',
          correct: 'I have lived here for 5 years. (OR: since 2019)',
          reasonAr: '(Since) تأتي مع نقطة البداية المحددة (since Monday, since 2018). بينما (For) تأتي مع المدة الزمنية الإجمالية (for 3 days, for 5 years).',
          goldenRuleAr: 'القاعدة الذهبية: Since لنقطة البداية، و For للمدة والعدد!'
        }
      ],
      proTipsAr: [
        'الفعل gone يعني أنه ذهب ولم يعد بعد (He has gone to Paris). بينما been يعني أنه ذهب وعاد (He has been to Paris).'
      ]
    },
    practiceLesson: {
      titleAr: 'تمارين تفاعلية متنوعة وشاملة',
      exercises: [
        {
          id: 'pp_q1',
          type: 'mcq',
          questionAr: 'اختر الفعل المناسب لإكمال الجملة لحدث ماضٍ أثره حاضر الآن:',
          promptSentence: 'Sara ______ her keys, so she cannot open the door.',
          options: ['lost', 'has lost', 'have lost', 'is losing'],
          correctAnswer: 'has lost',
          explanationAr: 'النتيجة حاضرة في الوقت الحالي (لا تستطيع فتح الباب)، والفاعل (Sara) مفرد لذا نستخدم (has lost).'
        },
        {
          id: 'pp_q2',
          type: 'mcq',
          questionAr: 'اختر الكلمة المناسبة (Since أو For) مع المدة الإجمالية:',
          promptSentence: 'They have been married ______ ten years.',
          options: ['since', 'for', 'already', 'ago'],
          correctAnswer: 'for',
          explanationAr: 'عبارة (ten years) تمثل مدة زمنية إجمالية محسوبة، لذا نستخدم معها (for).'
        },
        {
          id: 'pp_q3',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين جملة مضارع تام صحيحة مع already:',
          scrambledWords: ['already', 'have', 'I', 'finished', 'my report.'],
          correctAnswer: 'I have already finished my report.',
          explanationAr: 'الترتيب: الفاعل (I) + الفعل المساعد (have) + كلمة (already) + التصريف الثالث (finished) + المفعول به (my report).'
        },
        {
          id: 'pp_q4',
          type: 'error_correction',
          questionAr: 'اكتشف الخطأ في تصريف الفعل بعد Have وصححه:',
          promptSentence: 'Have you ever went to Spain?',
          options: ['went -> been / gone', 'Have -> Did', 'ever -> never', 'you -> she'],
          correctAnswer: 'went -> been / gone',
          explanationAr: 'بعد Have يجب استخدام التصريف الثالث V3، والتصريف الثالث للفعل go للتعبير عن التجارب والزيارة هو been.'
        },
        {
          id: 'pp_q5',
          type: 'mcq',
          questionAr: 'اختر الفرق بين been و gone (ذهب وعاد مقابل ذهب ولم يعد):',
          promptSentence: 'Faisal is not at home right now. He ______ to the supermarket.',
          options: ['has been', 'has gone', 'is going to', 'went to'],
          correctAnswer: 'has gone',
          explanationAr: 'بما أنه ليس بالمنزل الآن، فهو ذهب وما زال هناك ولم يعد بعد، لذلك نستخدم (has gone).'
        },
        {
          id: 'pp_q6',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين جملة منفية باستخدام yet في نهاية الجملة:',
          scrambledWords: ['has', 'not', 'He', 'received', 'the package', 'yet.'],
          correctAnswer: 'He has not received the package yet.',
          explanationAr: 'الترتيب الصحيح: الفاعل (He) + الفعل المساعد المنفي (has not) + التصريف الثالث (received) + المفعول به (the package) + الكلمة الدالة (yet).'
        }
      ]
    },
    freeWriteLesson: {
      titleAr: 'تكوين الجمل الحر والمدرب الذكي',
      instructionAr: 'اكتب جملة تعبر عن تجربة قمت بها في حياتك، أو إنجاز أنجزته مؤخراً، أو شيء قمت به وتظهر نتيجته الآن.',
      structuralGuide: 'S + have/has + V3 (Past Participle) + Object + (already / since / recently)',
      scenarios: [
        {
          titleAr: 'إنجاز أو هدف حققته (Achievement)',
          promptAr: 'اكتب عن كتاب قرأته أو دورة اجتزتها أو مشروع أكملته.',
          starter: 'I have already...',
          exampleTarget: 'I have already read ten books this year.'
        },
        {
          titleAr: 'بلد أو مكان زرته (Travel Experience)',
          promptAr: 'اكتب عن مدينة أو دولة قمت بزيارتها في حياتك.',
          starter: 'I have visited...',
          exampleTarget: 'I have visited the Great Wall of China once.'
        }
      ]
    },
    finalExamLesson: {
      titleAr: 'الاختبار النهائي للوحدة وتقييم الإتقان',
      passingScorePercent: 80,
      questions: [
        {
          id: 'pp_fe1',
          question: 'Which sentence correctly uses the Present Perfect with a visible present result?',
          questionAr: 'أي من الجمل تستخدم المضارع التام مع نتيجة حية وملموسة في الحاضر كما ورد في شرح الدرس؟',
          options: [
            'I washed my car last Monday.',
            'I have washed my car, so it is shiny and clean now.',
            'I wash my car every week.',
            'I will wash my car tomorrow.'
          ],
          correctIndex: 1,
          explanationAr: 'وفقاً لمحور الاستخدام في الدرس 1: المضارع التام (have washed) يربط فعلاً ماضياً بنتيجة حاضرة ظاهرة (it is clean now).',
          category: 'usage',
          lessonRefAr: 'الدرس 1: الاستخدام والتفصيل (الربط بين الماضي والنتيجة الحاضرة)'
        },
        {
          id: 'pp_fe2',
          question: 'According to the keyword rules, when do we use "since" versus "for"?',
          questionAr: 'وفقاً لقاعدة الكلمات الدالة في الدرس 1، متى نستخدم (since) مقارنة بـ (for)؟',
          options: [
            'Since for starting point (since 2018), and For for total duration (for 5 years).',
            'Since for duration only, and For for starting years only.',
            'They are used identically without any rule difference.',
            'Since is only used in negative sentences.'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً للدرس 1: نستخدم (since) مع نقطة البداية المحددة مثل (since 2018 / since morning)، ونستخدم (for) مع المدة المحسوبة مثل (for 5 years / for 3 hours).',
          category: 'usage',
          lessonRefAr: 'الدرس 1: الكلمات الدالة (الفرق بين Since و For)'
        },
        {
          id: 'pp_fe3',
          question: 'According to the SVO table, which sentence correctly conjugates the irregular verb "buy"?',
          questionAr: 'وفقاً لجدول SVO، أي من الجمل التالية تصرف الفعل الشاذ (buy) بصيغة التصريف الثالث V3 الصحيحة؟',
          options: [
            'She has buyed dinner.',
            'She has bought dinner.',
            'She has buy dinner.',
            'She have bought dinner.'
          ],
          correctIndex: 1,
          explanationAr: 'وفقاً لجدول SVO في الدرس 2: الفاعل المفرد (She) يأخذ (has)، والفعل buy شاذ وتصريفه الثالث هو (bought).',
          category: 'structure',
          lessonRefAr: 'الدرس 2: جدول تركيب الجمل SVO والتصريف الثالث V3'
        },
        {
          id: 'pp_fe4',
          question: 'What is the Golden Rule regarding specific past times like "yesterday" with Present Perfect?',
          questionAr: 'ما هي "القاعدة الذهبية" المشروحة في الدرس 3 بشأن استخدام الأوقات الماضية المحددة (yesterday / last year)؟',
          options: [
            'Specific past times require Past Simple, NEVER Present Perfect with have/has.',
            'Specific past times always require have/has been.',
            'Specific past times can only be used with already.',
            'There is no restriction on using yesterday with have/has.'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً للقاعدة الذهبية في الدرس 3: إذا حددت وقتاً ماضياً منتهياً (yesterday, last week, in 2010)، يجب استخدام الماضي البسيط (Past Simple) ولا يجوز استخدام المضارع التام (have/has).',
          category: 'mistake',
          lessonRefAr: 'الدرس 3: الأخطاء الشائعة والقاعدة الذهبية'
        },
        {
          id: 'pp_fe5',
          question: 'Choose the correct question format for asking about life experiences:',
          questionAr: 'اختر الصيغة الصحيحة للسؤال عن التجارب الحياتية وفق جدول تكوين السؤال:',
          options: [
            'Have you ever visited London?',
            'Did you ever visited London?',
            'Have you ever visit London?',
            'Has you ever visited London?'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لجدول السؤال في الدرس 2: نسأل بـ (Have) مع الضمير (you) متبوعاً بكلمة (ever) ثم التصريف الثالث (visited).',
          category: 'structure',
          lessonRefAr: 'الدرس 2: جدول تركيب الجمل SVO (تكوين السؤال)'
        }
      ]
    }
  },
  {
    id: 'present_perfect_continuous',
    nameEn: 'Present Perfect Continuous',
    nameAr: 'المضارع التام المستمر',
    category: 'present',
    level: 'متوسط',
    shortFormula: 'Subject + have/has been + V-ing',
    summaryAr: 'يُركز على مدة استمرار نشاط بدأ في الماضي ولا يزال مستمراً حتى الآن دون انقطاع، أو توقف للتو مع أثر جسدي ظاهر.',
    timelineDescriptionAr: 'بدأ في الماضي واستمر لفترة زمنية متصلة حتى اللحظة الحاضرة.',
    timelinePoint: -0.2,
    usageLesson: {
      titleAr: 'الاستخدام والتفصيل مع أمثلة حية',
      overviewAr: 'المضارع التام المستمر (Present Perfect Continuous) يجمع بين أمرين: أنه بدأ في الماضي (تام)، وأنه استمر أو استغرق وقتاً طويلاً ومجهوداً (مستمر). التركيز هنا يكون على "المدة والمجهود".',
      useCases: [
        {
          titleAr: '1. أحداث بدأت في الماضي ومستمرة حتى الآن (Ongoing Duration)',
          descriptionAr: 'نشاط بدأ في وقت سابق ولا يزال يحدث في هذه اللحظة، مع إبراز كم استغرق من الوقت.',
          examples: [
            {
              id: 'ppc_ex1',
              sentence: 'I have been studying English for three hours.',
              translationAr: 'أنا أدرس الإنجليزية منذ ثلاث ساعات (وما زلت أدرس حتى الآن).',
              contextAr: 'التركيز على طول فترة المذاكرة واستمرارها',
              subject: 'I',
              auxiliary: 'have been',
              verb: 'studying',
              complement: 'English',
              timeMarker: 'for three hours'
            },
            {
              id: 'ppc_ex2',
              sentence: 'It has been raining all morning.',
              translationAr: 'إنها تمطر طوال الصباح (ولا تزال السماء تمطر).',
              contextAr: 'استمرار الهطول طوال فترة الصباح',
              subject: 'It',
              auxiliary: 'has been',
              verb: 'raining',
              complement: 'all morning'
            }
          ]
        },
        {
          titleAr: '2. نشاط توقف للتو لكن آثاره الجسدية واضحة (Action Just Stopped with Visible Effect)',
          descriptionAr: 'توقف النشاط قبل قليل، ولكنك متعب أو مبتل أو تظهر عليك آثار المجهود الذي بذلته.',
          examples: [
            {
              id: 'ppc_ex3',
              sentence: 'He is breathing heavily because he has been running.',
              translationAr: 'هو يتنفس بصعوبة لأنه كان يركض (لفترة مستمرة قبل قليل).',
              contextAr: 'الركض الطويل سبب له هذا الإرهاق الواضح الآن',
              subject: 'He',
              auxiliary: 'has been',
              verb: 'running',
              complement: 'because he...'
            }
          ]
        }
      ],
      keywords: [
        { word: 'How long...?', meaningAr: 'كم المدة التي...؟', example: 'How long have you been waiting?' },
        { word: 'For (2 hours, 5 years)', meaningAr: 'لمدة...', example: 'She has been working here for 5 years.' },
        { word: 'Since (morning, 2020)', meaningAr: 'منذ...', example: 'They have been talking since 9 AM.' },
        { word: 'All day / All week', meaningAr: 'طوال اليوم / الأسبوع', example: 'I have been cleaning the house all day.' }
      ],
      timeConceptAr: 'شريط زمني يمتد من نقطة في الماضي ويتصل بلحظة الحاضر ليبرز الاستمرارية وطول الوقت.'
    },
    svoLesson: {
      titleAr: 'تركيب الجمل وجدول SVO + الأفعال المساعدة',
      rulesAr: [
        'التركيبة الثابتة: have been أو has been متبوعة بـ Verb-ing.',
        'have been مع الضمائر (I, You, We, They) وأسماء الجمع.',
        'has been مع الضمائر (He, She, It) وأسماء المفرد.',
        'في النفي: haven\'t been أو hasn\'t been + Verb-ing.'
      ],
      auxiliaryRulesAr: 'الفعل المساعد هنا مركب من جزأين: (have/has) + التصريف الثالث (been).',
      goldenNotesAr: [
        'ملاحظة: كلمة been إجبارية في هذا الزمن للربط بين الفعل المساعد have/has والفعل المنتهي بـ (-ing).',
        'نستخدم have been مع (I, you, they, we)، و has been مع (he, she, it).',
        'في النفي نضع not بعد have/has فتصبح: haven\'t been / hasn\'t been.'
      ],
      subjectClassification: {
        singularPronouns: ['He (هو)', 'She (هي)', 'It (هو/هي لغير العاقل)'],
        singularNouns: [
          { en: 'The doctor', ar: 'الطبيب' },
          { en: 'Fahad', ar: 'فهد' },
          { en: 'The student', ar: 'الطالب' },
          { en: 'My mother', ar: 'أمي' }
        ],
        pluralPronouns: ['I (أنا)', 'You (أنت / أنتم)', 'They (هم)', 'We (نحن)'],
        pluralNouns: [
          { en: 'The students', ar: 'الطلاب' },
          { en: 'The workers', ar: 'العمال' },
          { en: 'Engineers', ar: 'المهندسون' },
          { en: 'Friends', ar: 'الأصدقاء' }
        ]
      },
      structures: [
        {
          formType: 'affirmative',
          formTitleAr: '1. الإثبات (Affirmative)',
          formTitleEn: 'Affirmative Structure',
          formula: 'Subject + have/has been + Verb-ing + Object/Time',
          explanationAr: 'الفاعل + have/has been + الفعل مضافاً إليه ing + تكملة الجملة والمدة.',
          tableRows: [
            {
              subject: 'I / They',
              auxiliary: 'have been',
              verb: 'working',
              verbFormNote: 'been + V-ing',
              objectComplement: 'on this software',
              timeMarker: 'since 8 AM',
              fullSentence: 'They have been working on this software since 8 AM.',
              translationAr: 'هم يعملون على هذا البرنامج منذ الساعة 8 صباحاً.'
            },
            {
              subject: 'Fahad',
              auxiliary: 'has been',
              verb: 'reading',
              verbFormNote: 'been + V-ing',
              objectComplement: 'the novel',
              timeMarker: 'for two hours',
              fullSentence: 'Fahad has been reading the novel for two hours.',
              translationAr: 'فهد يقرأ الرواية منذ ساعتين.'
            }
          ]
        },
        {
          formType: 'negative',
          formTitleAr: '2. النفي (Negative)',
          formTitleEn: 'Negative Structure',
          formula: 'Subject + haven\'t / hasn\'t been + Verb-ing',
          explanationAr: 'نضع not بين have/has وبين been.',
          tableRows: [
            {
              subject: 'She',
              auxiliary: "has not been (hasn't been)",
              verb: 'sleeping',
              verbFormNote: 'been + V-ing',
              objectComplement: 'well',
              timeMarker: 'lately',
              fullSentence: "She hasn't been sleeping well lately.",
              translationAr: 'هي لا تنام جيداً في الآونة الأخيرة.'
            }
          ]
        },
        {
          formType: 'yes_no_question',
          formTitleAr: '3. سؤال نعم/لا (Yes/No Question)',
          formTitleEn: 'Yes/No Questions',
          formula: 'Have / Has + Subject + been + Verb-ing?',
          explanationAr: 'Have/Has + الفاعل + been + الفعل-ing.',
          tableRows: [
            {
              subject: 'you',
              auxiliary: 'Have ... been',
              verb: 'waiting',
              verbFormNote: 'been + waiting',
              objectComplement: 'here long?',
              fullSentence: 'Have you been waiting here long?',
              translationAr: 'هل كنت تنتظر هنا طويلاً؟'
            }
          ]
        },
        {
          formType: 'wh_question',
          formTitleAr: '4. سؤال بأداة استفهام (Wh- Question)',
          formTitleEn: 'Wh- Questions',
          formula: 'How long + have/has + Subject + been + Verb-ing?',
          explanationAr: 'السؤال الأشهر مع هذا الزمن هو How long (كم المدة).',
          tableRows: [
            {
              subject: 'they',
              auxiliary: 'have ... been',
              verb: 'living',
              verbFormNote: 'Wh: How long',
              objectComplement: 'in this neighborhood?',
              fullSentence: 'How long have they been living in this neighborhood?',
              translationAr: 'كم المدة التي عاشوا فيها في هذا الحي؟'
            }
          ]
        }
      ],
      builderParts: {
        subjects: [
          { text: 'I', type: 'i' },
          { text: 'The doctor', type: 'sing' },
          { text: 'We', type: 'plur' }
        ],
        auxiliaries: ['have been', 'has been', "haven't been", "hasn't been"],
        verbs: [
          { base: 'code', conjugated: 'coding', meaningAr: 'يبرمج' },
          { base: 'wait', conjugated: 'waiting', meaningAr: 'ينتظر' },
          { base: 'drive', conjugated: 'driving', meaningAr: 'يقود' }
        ],
        objects: ['in heavy traffic', 'for the bus', 'the new update'],
        timePhrases: ['for 40 minutes', 'since morning', 'all afternoon']
      }
    },
    mistakesLesson: {
      titleAr: 'أبرز وأهم الأخطاء الشائعة وطرق تجنبها',
      introAr: 'الفرق بين المضارع التام البسيط والمستمر يكمن في النتيجة مقابل المدة:',
      mistakes: [
        {
          id: 'ppc_m1',
          categoryAr: 'استخدام أفعال الحواس والعقل في التام المستمر',
          incorrect: 'I have been knowing him for ten years.',
          correct: 'I have known him for ten years.',
          reasonAr: 'أفعال (know, like, have-ملكية, understand) لا تقبل -ing حتى لو كان فيها دلالة مدة، ونستخدم معها المضارع التام البسيط (Present Perfect Simple).',
          goldenRuleAr: 'القاعدة الذهبية: أفعال الحالة (Stative) لا تدخل عالم المستمر أبداً، حتى مع since و for!'
        },
        {
          id: 'ppc_m2',
          categoryAr: 'نسيان كلمة been في التركيب',
          incorrect: 'She has studying for two hours.',
          correct: 'She has been studying for two hours.',
          reasonAr: 'لا يمكن الربط بين has و Verb-ing مباشرة بدون been.',
          goldenRuleAr: 'القاعدة الذهبية: been هي الجسر الإجباري بين has/have وبين الفعل المنتهي بـ (-ing)!'
        }
      ],
      proTipsAr: [
        'إذا ذكرت عدد المرات أو كمية الإنجاز (مثلاً: كتب 5 رسائل) استخدم البسيط: He has written 5 letters. أما إذا ذكرت المدة الزمنية: He has been writing letters all day.'
      ]
    },
    practiceLesson: {
      titleAr: 'تمارين تفاعلية متنوعة وشاملة',
      exercises: [
        {
          id: 'ppc_q1',
          type: 'mcq',
          questionAr: 'اختر التركيبة الصحيحة للتعبير عن نشاط مستمر طوال الصباح يظهر أثره الآن:',
          promptSentence: 'They are tired because they ______ in the garden all morning.',
          options: ['have worked', 'have been working', 'are working', 'were worked'],
          correctAnswer: 'have been working',
          explanationAr: 'الجملة تؤكد على مدة واستمرار النشاط في الصباح (all morning) الذي تسبب في التعب الواضح الآن.'
        },
        {
          id: 'ppc_q2',
          type: 'mcq',
          questionAr: 'اختر صيغة السؤال الصحيحة عن المدة الزمنية المستمرة:',
          promptSentence: 'How long ______ French?',
          options: [
            'have you been learning',
            'are you learning',
            'did you learn',
            'do you learn'
          ],
          correctAnswer: 'have you been learning',
          explanationAr: 'سؤال (How long) عن نشاط ممتد حتى الحاضر يستخدم صيغة المضارع التام المستمر (have you been learning).'
        },
        {
          id: 'ppc_q3',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين جملة تعبر عن مدة الانتظار:',
          scrambledWords: ['been', 'has', 'She', 'waiting', 'for two hours.', 'for you'],
          correctAnswer: 'She has been waiting for you for two hours.',
          explanationAr: 'الترتيب الصحيح: الفاعل (She) + الفعل المساعد (has been) + الفعل-ing (waiting) + المجرور (for you) + المدة الزمنية (for two hours).'
        },
        {
          id: 'ppc_q4',
          type: 'error_correction',
          questionAr: 'اكتشف الخطأ في نسيان كلمة been وصححه:',
          promptSentence: 'He has working on this project since 9 AM.',
          options: ['has working -> has been working', 'since -> for', 'working -> worked', 'He -> They'],
          correctAnswer: 'has working -> has been working',
          explanationAr: 'في المضارع التام المستمر، يجب وجود (been) بين has والفعل المنتهي بـ (-ing).'
        },
        {
          id: 'ppc_q5',
          type: 'mcq',
          questionAr: 'اختر الصيغة الصحيحة مراعياً أفعال الحالة (Stative Verbs) مع المدة:',
          promptSentence: 'I ______ my best friend since elementary school.',
          options: ['have known', 'have been knowing', 'am knowing', 'knowed'],
          correctAnswer: 'have known',
          explanationAr: 'الفعل (know) فعل حالة لا يقبل ing، لذا نستخدم معه المضارع التام البسيط (have known) بدلاً من المستمر.'
        },
        {
          id: 'ppc_q6',
          type: 'reorder',
          questionAr: 'رتّب الكلمات لتكوين جملة تصف حالة الطقس المستمرة:',
          scrambledWords: ['raining', 'It', 'has', 'been', 'heavily', 'since yesterday.'],
          correctAnswer: 'It has been raining heavily since yesterday.',
          explanationAr: 'الترتيب: الفاعل (It) + الفعل المساعد (has been) + الفعل-ing (raining) + الظرف (heavily) + نقطة البداية (since yesterday).'
        }
      ]
    },
    freeWriteLesson: {
      titleAr: 'تكوين الجمل الحر والمدرب الذكي',
      instructionAr: 'اكتب جملة تعبر عن نشاط أو مهارة أو عمل بدأت فيه وما زلت مستمراً فيه منذ فترة من الزمن.',
      structuralGuide: 'S + have/has been + V-ing + Object + (for ... / since ...)',
      scenarios: [
        {
          titleAr: 'مدة تعلم مهارة معينة (Learning Duration)',
          promptAr: 'اكتب منذ متى وأنت تتعلم البرمجة، الإنجليزية، أو الرياضة.',
          starter: 'I have been learning...',
          exampleTarget: 'I have been learning English grammar for six months.'
        }
      ]
    },
    finalExamLesson: {
      titleAr: 'الاختبار النهائي للوحدة وتقييم الإتقان',
      passingScorePercent: 80,
      questions: [
        {
          id: 'ppc_fe1',
          question: 'Which sentence best emphasizes the ongoing continuous duration of an activity?',
          questionAr: 'أي من الجمل التالية تركز بأقوى صورة على مدة واستمرار النشاط من الماضي حتى اللحظة الحاضرة؟',
          options: [
            'I have painted two rooms.',
            'I have been painting the house all day.',
            'I painted the house yesterday.',
            'I paint houses every summer.'
          ],
          correctIndex: 1,
          explanationAr: 'وفقاً للدرس 1 (الاستخدام): جملة (have been painting all day) تركز على استمرارية النشاط ومجهوده وطول فترته طوال اليوم.',
          category: 'usage',
          lessonRefAr: 'الدرس 1: الاستخدام والتفصيل (استمرارية النشاط والمجهود)'
        },
        {
          id: 'ppc_fe2',
          question: 'What is the complete 4-part structure of the Present Perfect Continuous for "She"?',
          questionAr: 'ما هي التركيبة الرباعية الكاملة للمضارع التام المستمر مع الفاعل المفرد (She) وفق جدول SVO؟',
          options: [
            'She has been studying for two hours.',
            'She has studying for two hours.',
            'She is been studying for two hours.',
            'She have been studying for two hours.'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لجدول SVO في الدرس 2: التركيبة الكاملة هي (Subject + has been + Verb-ing) مع الفاعل المفرد (She).',
          category: 'structure',
          lessonRefAr: 'الدرس 2: جدول تركيب الجمل SVO (الصيغة الرباعية)'
        },
        {
          id: 'ppc_fe3',
          question: 'How do we ask about the duration of an ongoing action according to the question table?',
          questionAr: 'كيف نسأل عن مدة نشاط مستمر وفق جدول تكوين الأسئلة (Wh- Questions) في الدرس 2؟',
          options: [
            'How long have you been waiting?',
            'When did you waiting?',
            'How long are you waited?',
            'Where have you wait?'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً لجدول تكوين السؤال في الدرس 2: نبدأ بـ (How long) + الفعل المساعد (have) + الفاعل (you) + (been waiting).',
          category: 'structure',
          lessonRefAr: 'الدرس 2: جدول تركيب الجمل SVO (تكوين سؤال How long)'
        },
        {
          id: 'ppc_fe4',
          question: 'Find the correct sentence for the stative verb "know" based on the Common Mistakes lesson:',
          questionAr: 'اختر الجملة الصحيحة مع فعل الحالة (know) وفق ما تم توضيحه في درس الأخطاء الشائعة:',
          options: [
            'We have been knowing each other for a long time.',
            'We have known each other for a long time.',
            'We knowing each other for a long time.',
            'We are knowing each other for a long time.'
          ],
          correctIndex: 1,
          explanationAr: 'وفقاً للقاعدة الذهبية في الدرس 3: أفعال الحالة والإدراك (know, understand, like) لا تقبل -ing أبداً، ونستخدم معها المضارع التام البسيط (have known) حتى مع وجود for.',
          category: 'mistake',
          lessonRefAr: 'الدرس 3: الأخطاء الشائعة وأفعال الحالة Stative Verbs'
        },
        {
          id: 'ppc_fe5',
          question: 'What is the role of "been" in this tense according to the Golden Rules?',
          questionAr: 'ما هو دور كلمة (been) في هذا الزمن وفق القاعدة الذهبية في الشرح؟',
          options: [
            'It is the mandatory bridge between have/has and Verb-ing.',
            'It is optional and can be removed anytime.',
            'It is only used when the sentence is negative.',
            'It replaces the subject in affirmative sentences.'
          ],
          correctIndex: 0,
          explanationAr: 'وفقاً للقاعدة الذهبية في الدرس 3: كلمة (been) هي الجسر الإجباري بين الفعل المساعد have/has وبين الفعل المنتهي بـ (-ing) ولا تسقط أبداً.',
          category: 'mistake',
          lessonRefAr: 'الدرس 3: الأخطاء الشائعة والقاعدة الذهبية'
        }
      ]
    }
  }
];
