import { TenseSpellingData } from '../types';

export const tenseSpellingRulesData: Record<string, TenseSpellingData> = {
  present_simple: {
    tenseId: 'present_simple',
    titleAr: 'جدول تصاريف الأفعال وقواعد الإملاء (Spelling & Verb Forms)',
    subtitleAr: 'قواعد إضافة (s / es / ies) مع ضمائر المفرد الغائب (He, She, It) وبقاء الفعل مجرداً مع الجمع و I',
    overviewAr: 'في زمن المضارع البسيط، يبقى الفعل في صيغة المصدر المجرد (Base V1) بدون أي تغيير مع الضمائر (I, You, We, They). أما مع ضمائر المفرد الغائب (He, She, It والأسماء المفردة)، فيجب إضافة s أو es أو ies بنهاية الفعل طبقاً للقواعد الإملائية التالية:',
    ruleCards: [
      {
        badge: '+ s',
        badgeType: 'emerald',
        titleAr: 'مع معظم الأفعال العادية',
        conditionAr: 'تضاف حرف الـ s فقط بآخر معظم الأفعال الشائعة بنسبة تفوق 85%.',
        examples: 'work ➔ works | play ➔ plays | eat ➔ eats',
      },
      {
        badge: '+ es',
        badgeType: 'rose',
        titleAr: 'نهايات صوتية محددة (ch, sh, ss, x, z, o)',
        conditionAr: 'تضاف es لمنع صعوبة التقاء الحروف الساكنة الصفيرية وتسهيل النطق.',
        examples: 'watch ➔ watches | wash ➔ washes | go ➔ goes',
      },
      {
        badge: '+ ies',
        badgeType: 'indigo',
        titleAr: 'إذا انتهى الفعل بـ (حرف ساكن + Y)',
        conditionAr: 'نحذف حرف الـ Y تماماً ونضع مكانه ies.',
        examples: 'study ➔ studies | fly ➔ flies | cry ➔ cries',
      },
    ],
    tableRows: [
      {
        addition: '+ s',
        ruleTitleAr: '١) القاعدة العامة الافتراضية (معظم الأفعال):',
        conditionAr: 'تضاف حرف الـ s فقط لآخر معظم الأفعال العادية.',
        examples: [
          { base: 'work', changed: 'works', audioPhrase: 'work. works.' },
          { base: 'eat', changed: 'eats', audioPhrase: 'eat. eats.' },
          { base: 'speak', changed: 'speaks', audioPhrase: 'speak. speaks.' },
        ],
        noteAr: 'القاعدة الأكثر شيوعاً وتطبق على أغلب الأفعال بدون شروط استثنائية.',
      },
      {
        addition: '+ es',
        ruleTitleAr: '٢) إذا انتهى الفعل بأحد الحروف التالية: (ch, sh, ss, x, z, o)',
        conditionAr: 'نضيف es حتى يسهل نطق الكلمة بدلاً من التقاء أصوات صفيرية متتالية.',
        examples: [
          { base: 'watch', changed: 'watches', audioPhrase: 'watch. watches.' },
          { base: 'wash', changed: 'washes', audioPhrase: 'wash. washes.' },
          { base: 'fix', changed: 'fixes', audioPhrase: 'fix. fixes.' },
          { base: 'go / do', changed: 'goes / does', audioPhrase: 'go. goes. do. does.' },
        ],
        noteAr: 'يُنطق المقطع es كصوت /ɪz/ (مثل wɒtʃ.ɪz) ليمنح الكلمة صوتاً سلساً ومريحاً.',
      },
      {
        addition: '+ ies',
        ruleTitleAr: '٣) إذا انتهى الفعل بحرف Y وقبله حرف ساكن (Consonant + Y):',
        conditionAr: 'نحذف الـ Y ونستبدلها بـ ies.',
        examples: [
          { base: 'study', changed: 'studies', audioPhrase: 'study. studies.' },
          { base: 'carry', changed: 'carries', audioPhrase: 'carry. carries.' },
          { base: 'fly', changed: 'flies', audioPhrase: 'fly. flies.' },
        ],
        noteAr: 'ملاحظة هامة: إذا سبق حرف الـ Y حرف متحرك (a, e, i, o, u) لا نحذف الـ Y بل نضيف s فقط (play ➔ plays / buy ➔ buys).',
      },
    ],
    irregularSection: {
      titleAr: 'أفعال شاذة حقيقية في المضارع البسيط:',
      descriptionAr: 'هذان هما الفعلان الشاذان الوحيدان إملائياً في المضارع البسيط، حيث يتغير شكلهما تماماً مع ضمائر المفرد (ولا نطبق عليهما قواعد الإضافة العادية):',
      items: [
        { base: 'have', conjugated: 'has', meaningAr: 'يملك / يتناول', noteAr: 'شاذ إملائياً: يتحول إلى has (ولا نقول haves)' },
        { base: 'be', conjugated: 'is / am / are', meaningAr: 'يكون', noteAr: 'شاذ كلياً: يتغير شكل الفعل حسب الفاعل (He is, I am, They are)' },
      ],
    },
    pronunciationGroups: [
      {
        phoneticSound: '/s/',
        phoneticNameAr: 'صوت السين الصافية الخفيفة',
        ruleExplanationAr: 'يُنطق بعد الأصوات الصامتة الخفيفة الحلقية والشفتانية (Voiceless sounds مثل p, k, t, f, θ).',
        audioPhrase: 'stops, speaks, writes, laughs',
        wordPairs: [
          { base: 'stop', conjugated: 'stops' },
          { base: 'speak', conjugated: 'speaks' },
          { base: 'write', conjugated: 'writes' },
          { base: 'laugh', conjugated: 'laughs' },
        ],
      },
      {
        phoneticSound: '/z/',
        phoneticNameAr: 'صوت الزاي المجهورة الاهتزازية',
        ruleExplanationAr: 'يُنطق بعد الأصوات المجهورة وحروف العلة الصوتية (Voiced sounds مثل b, d, g, v, l, m, n, r وحروف العلة).',
        audioPhrase: 'runs, plays, calls, lives, buys',
        wordPairs: [
          { base: 'run', conjugated: 'runs' },
          { base: 'play', conjugated: 'plays' },
          { base: 'call', conjugated: 'calls' },
          { base: 'live', conjugated: 'lives' },
        ],
      },
      {
        phoneticSound: '/ɪz/',
        phoneticNameAr: 'صوت الكسرة مع الزاي (مقطع إضافي كامل)',
        ruleExplanationAr: 'يُنطق مقطعاً صوتياً إضافياً بعد الأصوات الصفيرية (Sibilants مثل s, z, ʃ "sh", tʃ "ch", dʒ "j, ge").',
        audioPhrase: 'watches, washes, fixes, kisses, misses',
        wordPairs: [
          { base: 'watch', conjugated: 'watches' },
          { base: 'wash', conjugated: 'washes' },
          { base: 'fix', conjugated: 'fixes' },
          { base: 'kiss', conjugated: 'kisses' },
        ],
      },
    ],
    interactiveVerbs: [
      {
        base: 'watch',
        conjugated: 'watches',
        additionType: '+ es',
        ruleExplanationAr: 'ينتهي بـ ch الصفيرية ➔ نضيف es ليصبح النطق سلساً.',
        audioPhrase: 'He watches educational documentaries every evening.',
        exampleSentenceEn: 'He watches educational documentaries every evening.',
        exampleSentenceAr: 'هو يشاهد وثائقيات تعليمية كل مساء.',
      },
      {
        base: 'study',
        conjugated: 'studies',
        additionType: '+ ies',
        ruleExplanationAr: 'ينتهي بـ (ساكن d + y) ➔ نحذف حرف الـ y ونضيف ies.',
        audioPhrase: 'She studies medicine at Oxford University.',
        exampleSentenceEn: 'She studies medicine at Oxford University.',
        exampleSentenceAr: 'هي تدرس الطب في جامعة أكسفورد.',
      },
      {
        base: 'play',
        conjugated: 'plays',
        additionType: '+ s',
        ruleExplanationAr: 'ينتهي بـ (متحرك a + y) ➔ لا نحذف الـ y بل نطبق قاعدة s العادية فقط.',
        audioPhrase: 'My son plays football skillfully every weekend.',
        exampleSentenceEn: 'My son plays football skillfully every weekend.',
        exampleSentenceAr: 'ابني يلعب كرة القدم بمهارة كل عطلة أسبوع.',
      },
      {
        base: 'fix',
        conjugated: 'fixes',
        additionType: '+ es',
        ruleExplanationAr: 'ينتهي بحرف x ➔ نضيف es لمنع التصادم الصوتي الصامت.',
        audioPhrase: 'The mechanic fixes old engines with great care.',
        exampleSentenceEn: 'The mechanic fixes old engines with great care.',
        exampleSentenceAr: 'الميكانيكي يصلح المحركات القديمة بعناية فائقة.',
      },
      {
        base: 'go',
        conjugated: 'goes',
        additionType: '+ es',
        ruleExplanationAr: 'ينتهي بحرف o ➔ نضيف es لضبط النطق الصحيح.',
        audioPhrase: 'Sarah goes to the gym three times a week.',
        exampleSentenceEn: 'Sarah goes to the gym three times a week.',
        exampleSentenceAr: 'سارة تذهب إلى النادي الرياضي ثلاث مرات أسبوعياً.',
      },
      {
        base: 'carry',
        conjugated: 'carries',
        additionType: '+ ies',
        ruleExplanationAr: 'ينتهي بـ (ساكن r + y) ➔ نستبدل الـ y بـ ies.',
        audioPhrase: 'He carries a heavy backpack to school.',
        exampleSentenceEn: 'He carries a heavy backpack to school.',
        exampleSentenceAr: 'هو يحمل حقيبة ظهر ثقيلة إلى المدرسة.',
      },
      {
        base: 'work',
        conjugated: 'works',
        additionType: '+ s',
        ruleExplanationAr: 'فعل عادي ➔ نضيف s فقط مباشرة بنهاية الكلمة.',
        audioPhrase: 'Ahmed works as a software engineer in Riyadh.',
        exampleSentenceEn: 'Ahmed works as a software engineer in Riyadh.',
        exampleSentenceAr: 'أحمد يعمل كمهندس برمجيات في الرياض.',
      },
      {
        base: 'have',
        conjugated: 'has',
        additionType: 'شاذ',
        ruleExplanationAr: 'فعل شاذ استثنائي ➔ يتحول كلياً إلى has مع المفرد الغائب.',
        audioPhrase: 'He has an important meeting this morning.',
        exampleSentenceEn: 'He has an important meeting this morning.',
        exampleSentenceAr: 'لديه اجتماع مهم هذا الصباح.',
      },
    ],
    practiceQuiz: [
      {
        questionAr: 'ما هو التصريف الإملائي السليم للفعل (catch) مع الضمير He؟',
        options: ['catchs', 'catches', 'catchies', 'catching'],
        correctOption: 'catches',
        explanationAr: 'الفعل ينتهي بـ ch، لذلك نضيف es لمنع التقاء الأصوات الصفيرية.',
      },
      {
        questionAr: 'ما هو الشكل الصحيح للفعل (try) عند إسناده لـ (She)؟',
        options: ['trys', 'tryes', 'tries', 'tryies'],
        correctOption: 'tries',
        explanationAr: 'الفعل ينتهي بـ y يسبقه حرف ساكن (r)، فتحذف الـ y وتستبدل بـ ies.',
      },
      {
        questionAr: 'ما هو التصريف الصحيح للفعل (buy) مع الفاعل (He)؟',
        options: ['buies', 'buys', 'buyes', 'buyies'],
        correctOption: 'buys',
        explanationAr: 'الفعل ينتهي بـ y مسبوق بحرف علة متحرك (u)، لذلك لا نحذف الـ y بل نضيف s فقط.',
      },
      {
        questionAr: 'في الجملة: "She does not _____ coffee.", ما هو شكل الفعل (drink)؟',
        options: ['drinks', 'drink', 'drinkes', 'drank'],
        correctOption: 'drink',
        explanationAr: 'عند وجود الفعل المساعد does / does not، يعود الفعل فوراً إلى المصدر المجرد (drink) بدون s.',
      },
    ],
    goldenSpellingNoteAr: 'تذكر دائماً: إضافات (s / es / ies) خاصة فقط بالجملة المثبتة (Affirmative). بمجرد دخول الفعل المساعد does أو doesn\'t في السؤال أو النفي، يعود الفعل فوراً إلى أصله المجرّد بدون أي إضافات!',
  },

  present_continuous: {
    tenseId: 'present_continuous',
    titleAr: 'جدول تصاريف الأفعال وقواعد الإملاء (Spelling & Verb Forms)',
    subtitleAr: 'قواعد إضافة اللاحقة (-ing) للفعل بعد أفعال الكينونة (am / is / are) واستثناءات أفعال الحالة',
    overviewAr: 'في زمن المضارع المستمر، يتكون الفعل من شقين: فعل الكينونة المساعد (am / is / are) يليه الفعل مضافاً إليه اللاحقة (-ing). تتطلب إضافة ing اتباع قواعد إملائية دقيقة تخص الحرف الأخير ونوع الحروف الصوتية:',
    ruleCards: [
      {
        badge: '+ ing',
        badgeType: 'emerald',
        titleAr: 'معظم الأفعال العادية',
        conditionAr: 'تضاف ing مباشرة لنهاية معظم الأفعال بدون حذف أو تغيير.',
        examples: 'read ➔ reading | play ➔ playing | sleep ➔ sleeping',
      },
      {
        badge: 'حذف e',
        badgeType: 'rose',
        titleAr: 'الأفعال المنتهية بـ e غير ملفوظة (صامتة)',
        conditionAr: 'نحذف حرف الـ e الأخير قبل إضافة ing.',
        examples: 'make ➔ making | write ➔ writing | drive ➔ driving',
      },
      {
        badge: 'مضاعفة الساكن',
        badgeType: 'indigo',
        titleAr: 'قاعدة الحرف الساكن المنفرد (CVC)',
        conditionAr: 'فعل ذو مقطع واحد ينتهي بـ ساكن قبله متحرك واحد: نضاعف الساكن الأخير.',
        examples: 'run ➔ running | sit ➔ sitting | swim ➔ swimming',
      },
      {
        badge: 'ie ➔ ying',
        badgeType: 'amber',
        titleAr: 'الأفعال المنتهية بـ ie',
        conditionAr: 'نستبدل الـ ie بحرف y ثم نضيف ing.',
        examples: 'die ➔ dying | lie ➔ lying | tie ➔ tying',
      },
    ],
    tableRows: [
      {
        addition: '+ ing',
        ruleTitleAr: '١) القاعدة العامة الافتراضية:',
        conditionAr: 'إضافة ing مباشرة بدون أي تعديل إملائي.',
        examples: [
          { base: 'work', changed: 'working', audioPhrase: 'work. working.' },
          { base: 'learn', changed: 'learning', audioPhrase: 'learn. learning.' },
          { base: 'watch', changed: 'watching', audioPhrase: 'watch. watching.' },
        ],
        noteAr: 'حتى لو انتهى الفعل بـ y، نضيف ing مباشرة ولا نحذف الـ y أبداً: play ➔ playing, study ➔ studying.',
      },
      {
        addition: '- e + ing',
        ruleTitleAr: '٢) حذف حرف الـ e الصامتة:',
        conditionAr: 'إذا انتهى الفعل بحرف e غير منطوق، نحذفه قبل إضافة ing.',
        examples: [
          { base: 'write', changed: 'writing', audioPhrase: 'write. writing.' },
          { base: 'take', changed: 'taking', audioPhrase: 'take. taking.' },
          { base: 'dance', changed: 'dancing', audioPhrase: 'dance. dancing.' },
        ],
        noteAr: 'استثناء: إذا كان الفعل ينتهي بـ ee مزدوجة لا نحذف شيئاً: see ➔ seeing, agree ➔ agreeing.',
      },
      {
        addition: 'مضاعفة + ing',
        ruleTitleAr: '٣) مضاعفة الحرف الساكن الأخير (CVC Doubling):',
        conditionAr: 'إذا كان الفعل يتكون من مقطع صوتي واحد وينتهي بـ ساكن مسبوق بمتحرك واحد قصير.',
        examples: [
          { base: 'run', changed: 'running', audioPhrase: 'run. running.' },
          { base: 'stop', changed: 'stopping', audioPhrase: 'stop. stopping.' },
          { base: 'get', changed: 'getting', audioPhrase: 'get. getting.' },
        ],
        noteAr: 'لا نضاعف الحروف w و x و y أبداً لأنها تعمل كأنصاف حروف علة: snow ➔ snowing, fix ➔ fixing.',
      },
    ],
    irregularSection: {
      titleAr: 'أفعال الحالة والشعور (Stative Verbs) التي لا تقبل -ing:',
      descriptionAr: 'هذه الأفعال تعبر عن حالة أو شعور أو ملكية دائمة، لذا لا تُستخدم في صيغة المستمر (ing) في معناها الأصلي:',
      items: [
        { base: 'know', conjugated: 'I know (ليس I am knowing)', meaningAr: 'يعرف / يعلم', noteAr: 'حالة ذهنية دائمة' },
        { base: 'like / love', conjugated: 'She likes (ليس She is liking)', meaningAr: 'يحب / يفضل', noteAr: 'مشاعر وشعور باطني' },
        { base: 'understand', conjugated: 'I understand', meaningAr: 'يفهم / يستوعب', noteAr: 'إدراك معرفي' },
        { base: 'belong / own', conjugated: 'It belongs to me', meaningAr: 'ينتمي / يملك', noteAr: 'حالة ملكية قانونية' },
      ],
    },
    goldenSpellingNoteAr: 'قاعدة ذهبية: لا يمكن أن يتجرد الفعل المستمر من فعل الكينونة المساعد؛ القول "I going" خطأ فادح، والصواب الحتمي هو "I am going".',
  },

  present_perfect: {
    tenseId: 'present_perfect',
    titleAr: 'جدول تصاريف الأفعال وقواعد الإملاء (Spelling & Verb Forms)',
    subtitleAr: 'قواعد صياغة التصريف الثالث Past Participle (V3) بعد have / has والأفعال الشاذة',
    overviewAr: 'يتطلب زمن المضارع التام تصريف الفعل إلى التصريف الثالث (Past Participle - V3) مسبوقاً بـ have أو has. في الأفعال المنتظمة يكون V3 مطابقاً لـ V2 (+ed)، بينما تتغير الأفعال غير المنتظمة (Irregular) وتتطلب الحفظ والممارسة:',
    ruleCards: [
      {
        badge: 'V3 المنتظم (+ed)',
        badgeType: 'emerald',
        titleAr: 'الأفعال القياسية المنتظمة',
        conditionAr: 'تأخذ نفس نهاية الماضي البسيط (+ed / +d / +ied).',
        examples: 'finish ➔ finished | clean ➔ cleaned | live ➔ lived',
      },
      {
        badge: 'V3 الشاذ',
        badgeType: 'rose',
        titleAr: 'الأفعال غير المنتظمة (Irregular)',
        conditionAr: 'تتغير جذرياً ولها صيغ خاصة يجب معرفتها.',
        examples: 'see ➔ seen | write ➔ written | do ➔ done | eat ➔ eaten',
      },
      {
        badge: 'been vs gone',
        badgeType: 'indigo',
        titleAr: 'الفارق بين have been و have gone',
        conditionAr: 'been تعني ذهب وعاد، بينما gone تعني ذهب ولم يعد بعد.',
        examples: 'He has been to Paris (عاد) | He has gone (هناك الآن)',
      },
    ],
    tableRows: [
      {
        addition: '+ ed (منتظم)',
        ruleTitleAr: '١) التصريف الثالث للأفعال المنتظمة (Regular V3):',
        conditionAr: 'نضيف ed أو d للفعل المصدر، ونطبق قواعد مضاعفة الساكن وقلب الـ y إلى ied.',
        examples: [
          { base: 'visit', changed: 'has/have visited', audioPhrase: 'visit. visited.' },
          { base: 'study', changed: 'has/have studied', audioPhrase: 'study. studied.' },
          { base: 'stop', changed: 'has/have stopped', audioPhrase: 'stop. stopped.' },
        ],
        noteAr: 'في الأفعال المنتظمة، التصريف الثاني (الماضي البسيط) والتصريف الثالث متطابقان تماماً: cleaned / cleaned.',
      },
      {
        addition: 'V3 غير منتظم',
        ruleTitleAr: '٢) أشهر الأفعال الشاذة في التصريف الثالث (Past Participle):',
        conditionAr: 'صيغ تصريف ثالث شائعة الاستخدام تتكرر في المحادثات اليومية.',
        examples: [
          { base: 'see ➔ saw', changed: 'seen', audioPhrase: 'see. saw. seen.' },
          { base: 'write ➔ wrote', changed: 'written', audioPhrase: 'write. wrote. written.' },
          { base: 'speak ➔ spoke', changed: 'spoken', audioPhrase: 'speak. spoke. spoken.' },
          { base: 'break ➔ broke', changed: 'broken', audioPhrase: 'break. broke. broken.' },
        ],
        noteAr: 'تنتهي الكثير من صيغ الـ V3 الشاذة باللاحقة en أو ne (written, seen, broken, taken, driven).',
      },
      {
        addition: 'V3 بدون تغيير',
        ruleTitleAr: '٣) أفعال شاذة لا يتغير تصريفها الثالث:',
        conditionAr: 'يبقى الفعل كما هو في التصاريف الثلاثة.',
        examples: [
          { base: 'cut', changed: 'cut / cut', audioPhrase: 'cut. cut. cut.' },
          { base: 'put', changed: 'put / put', audioPhrase: 'put. put. put.' },
          { base: 'read', changed: 'read / read (ينطق /rɛd/)', audioPhrase: 'read. read. read.' },
        ],
        noteAr: 'الفعل read يُكتب بنفس الطريقة ولكن ينطق في التصريفين الثاني والثالث مثل كلمة red.',
      },
    ],
    irregularSection: {
      titleAr: 'قائمة الأفعال الشاذة الأكثر تكراراً في المضارع التام:',
      descriptionAr: 'جدول تصاريف أساسي يغطي أهم أفعال الحديث اليومي:',
      items: [
        { base: 'go', conjugated: 'gone / been', meaningAr: 'يذهب', noteAr: 'has gone (لم يعد) / has been (زار وعاد)' },
        { base: 'eat', conjugated: 'eaten', meaningAr: 'يأكل', noteAr: 'I have eaten lunch already' },
        { base: 'buy', conjugated: 'bought', meaningAr: 'يشتري', noteAr: 'They have bought a new house' },
        { base: 'meet', conjugated: 'met', meaningAr: 'يقابل', noteAr: 'Have you met my friend?' },
      ],
    },
    goldenSpellingNoteAr: 'قاعدة ذهبية: have و has يتطلبان دائماً وأبداً التصريف الثالث (V3) بعدهما، ولا يمكن استخدام المصدر المجرد (V1) أو الماضي البسيط (V2) معهما مطلقاً.',
  },

  present_perfect_continuous: {
    tenseId: 'present_perfect_continuous',
    titleAr: 'جدول تصاريف الأفعال وقواعد الإملاء (Spelling & Verb Forms)',
    subtitleAr: 'تركيبة (have / has + been + V-ing) وتطبيق قواعد استمرار الأفعال الحركية',
    overviewAr: 'في زمن المضارع التام المستمر، تكون تركيبة الفعل ثابتة ومزدوجة: الفعل المساعد have / has يليه التصريف الثالث الثابت لـ be وهو (been)، ثم الفعل الأساسي بصيغة الاستمرار مضافاً إليه (-ing).',
    ruleCards: [
      {
        badge: 'been الثابتة',
        badgeType: 'emerald',
        titleAr: 'رابط الزمن (been)',
        conditionAr: 'تأتي كلمة been ثابتة لا تتغير مع كافة الضمائر للدلالة على استمرار الحدث منذ الماضي.',
        examples: 'have been working | has been raining',
      },
      {
        badge: '+ ing',
        badgeType: 'indigo',
        titleAr: 'قواعد إملاء الـ ing',
        conditionAr: 'تنطبق نفس قواعد إملاء الـ ing (حذف e الصامتة، مضاعفة CVC، قلب ie إلى ying).',
        examples: 'writing | running | waiting',
      },
      {
        badge: 'أفعال الامتداد',
        badgeType: 'rose',
        titleAr: 'أفعال النشاط والحركة (Dynamic Actions)',
        conditionAr: 'يناسب الأفعال التي تستغرق زمناً (wait, live, work, study, rain, sleep).',
        examples: 'I have been waiting for two hours',
      },
    ],
    tableRows: [
      {
        addition: 'have/has been + ing',
        ruleTitleAr: '١) الصياغة القياسية مع المفرد والجمع:',
        conditionAr: 'has been مع ضمائر المفرد (He, She, It) و have been مع (I, We, You, They).',
        examples: [
          { base: 'wait', changed: 'have been waiting', audioPhrase: 'I have been waiting.' },
          { base: 'work', changed: 'has been working', audioPhrase: 'She has been working.' },
          { base: 'rain', changed: 'has been raining', audioPhrase: 'It has been raining.' },
        ],
        noteAr: 'يجب الانتباه لعدم حذف كلمة been، فالقول "I have waiting" خطأ لغوي جسيم.',
      },
      {
        addition: 'اختصار have/has',
        ruleTitleAr: '٢) اختصارات الفعل المساعد الشائعة في النطق والكتابة:',
        conditionAr: 'دمج الضمير مع have أو has لتسهيل الحديث السريع.',
        examples: [
          { base: 'I have been', changed: "I've been", audioPhrase: "I've been studying." },
          { base: 'She has been', changed: "She's been", audioPhrase: "She's been sleeping." },
          { base: 'They have been', changed: "They've been", audioPhrase: "They've been playing." },
        ],
        noteAr: "في النطق السريع، تُلفظ كلمة been بصوت قصير مائل للكسرة الخفيفة /bɪn/ أو /biːn/.",
      },
    ],
    goldenSpellingNoteAr: 'انتبه: إذا كان الفعل من أفعال الحالة (مثل know أو like أو have للملكية) نستخدم المضارع التام البسيط بدلاً من المستمر (فنقول: I have known him for years وليس I have been knowing).',
  },

  past_simple: {
    tenseId: 'past_simple',
    titleAr: 'جدول تصاريف الأفعال وقواعد الإملاء (Spelling & Verb Forms)',
    subtitleAr: 'قواعد إضافة (-ed) للأفعال المنتظمة وقواعد النطق الصوتي الثلاثة وأشهر الأفعال الشاذة (V2)',
    overviewAr: 'في زمن الماضي البسيط، يتطلب الفعل التحول إلى التصريف الثاني (V2). ينقسم الفعل باللغة الإنجليزية إلى منتظم (Regular) يكتفي بإضافة -ed مع مراعاة القواعد الإملائية والصوتية، أو غير منتظم (Irregular) يملك شكلاً خاصاً مستقلاً:',
    ruleCards: [
      {
        badge: '+ ed / + d',
        badgeType: 'emerald',
        titleAr: 'القاعدة العامة وإضافة d فقط',
        conditionAr: 'تضاف ed لمعظم الأفعال، وإذا انتهى الفعل بـ e أصلية نضيف d فقط.',
        examples: 'play ➔ played | live ➔ lived | watch ➔ watched',
      },
      {
        badge: '+ ied',
        badgeType: 'rose',
        titleAr: 'المنتهي بـ (ساكن + Y)',
        conditionAr: 'نحذف الـ Y ونستبدلها بـ ied (study ➔ studied). أما إذا سبقه متحرك فلا نحذفه (stay ➔ stayed).',
        examples: 'study ➔ studied | carry ➔ carried | cry ➔ cried',
      },
      {
        badge: 'مضاعفة CVC',
        badgeType: 'indigo',
        titleAr: 'مضاعفة الحرف الساكن الأخير',
        conditionAr: 'مقطع واحد ينتهي بـ ساكن مسبوق بمتحرك منفرد: نضاعف الساكن قبل ed.',
        examples: 'stop ➔ stopped | plan ➔ planned | fit ➔ fitted',
      },
    ],
    tableRows: [
      {
        addition: '+ ed / + d',
        ruleTitleAr: '١) قواعد إضافة -ed و -d للأفعال المنتظمة:',
        conditionAr: 'القاعدة الأساسية لتحويل الفعل للماضي البسيط.',
        examples: [
          { base: 'cook', changed: 'cooked', audioPhrase: 'cook. cooked.' },
          { base: 'smile', changed: 'smiled (أضفنا d فقط)', audioPhrase: 'smile. smiled.' },
          { base: 'stay', changed: 'stayed (متحرك + y لا يحذف)', audioPhrase: 'stay. stayed.' },
          { base: 'marry', changed: 'married (ساكن + y يستبدل)', audioPhrase: 'marry. married.' },
        ],
        noteAr: 'الفعل play لا نحذف منه الـ y لأن قبله حرف متحرك (a) فنقول played.',
      },
      {
        addition: 'نطق ed الثلاثي',
        ruleTitleAr: '٢) القواعد الصوتية الثلاث لنطق نهاية -ed بشكل احترافي:',
        conditionAr: 'تُنطق الـ ed بثلاث طرق صوتية مختلفة بحسب الحرف الأخير في الفعل:',
        examples: [
          { base: 'الأصوات الصامتة (p, k, f, s, sh, ch)', changed: 'تُنطق /t/ مثل: watched, stopped, laughed', audioPhrase: 'watched. stopped. laughed.' },
          { base: 'الأصوات المجهورة (b, g, v, z, m, n, l, r, vowels)', changed: 'تُنطق /d/ مثل: played, cleaned, loved', audioPhrase: 'played. cleaned. loved.' },
          { base: 'الأفعال المنتهية بـ t أو d فقط', changed: 'تُنطق مقطعاً كاملاً /ɪd/ مثل: started, needed, visited', audioPhrase: 'started. needed. visited.' },
        ],
        noteAr: 'الخطأ الشائع هو نطق ed دائماً كـ /ed/، بينما في الواقع تنطق كصوت /t/ أو /d/ بنسبة 90% ولا تضاف كصوت /ɪd/ إلا بعد t و d.',
      },
      {
        addition: 'V2 شاذ (Irregular)',
        ruleTitleAr: '٣) أشهر الأفعال غير المنتظمة في الماضي البسيط (V2):',
        conditionAr: 'أفعال أساسية يجب إتقان تصريفها الثاني غيباً:',
        examples: [
          { base: 'go', changed: 'went', audioPhrase: 'go. went.' },
          { base: 'see', changed: 'saw', audioPhrase: 'see. saw.' },
          { base: 'buy', changed: 'bought', audioPhrase: 'buy. bought.' },
          { base: 'take', changed: 'took', audioPhrase: 'take. took.' },
        ],
        noteAr: 'مع ديد (did / didn\'t) في السؤال أو النفي، يسقط التصريف الثاني ويعود الفعل لمصدره فوراً (Did you go? / I didn\'t see).',
      },
    ],
    irregularSection: {
      titleAr: 'قائمة بأبرز 6 أفعال شاذة يجب حفظها في الماضي البسيط:',
      descriptionAr: 'لا تطبق عليها قاعدة ed بل تتغير في الماضي:',
      items: [
        { base: 'have', conjugated: 'had', meaningAr: 'كان يملك / تناول', noteAr: 'I had breakfast at 8 am' },
        { base: 'do', conjugated: 'did', meaningAr: 'فعل / عمل', noteAr: 'He did his homework' },
        { base: 'say', conjugated: 'said', meaningAr: 'قال', noteAr: 'يُنطق /sɛd/ مثل كلمة red' },
        { base: 'come', conjugated: 'came', meaningAr: 'أتى / وصل', noteAr: 'They came yesterday' },
        { base: 'find', conjugated: 'found', meaningAr: 'وجد', noteAr: 'She found her keys' },
        { base: 'tell', conjugated: 'told', meaningAr: 'أخبر', noteAr: 'He told me the truth' },
      ],
    },
    goldenSpellingNoteAr: 'قاعدة ذهبية: بمجرد ظهور did أو didn\'t في الجملة (سواء سؤال أو نفي)، يجب إرجاع الفعل فوراً إلى شكله المجرّد بدون ed أو تصريف شاذ (فنقول: I didn\'t go وليس I didn\'t went).',
  },

  past_continuous: {
    tenseId: 'past_continuous',
    titleAr: 'جدول تصاريف الأفعال وقواعد الإملاء (Spelling & Verb Forms)',
    subtitleAr: 'قواعد تركيب was / were مع الفعل المنتهي بـ (-ing) للتعبير عن حدث كان مستمراً في الماضي',
    overviewAr: 'يتكون زمن الماضي المستمر من الفعل المساعد (was / were) متبوعاً بالفعل مضافاً إليه اللاحقة (-ing). تنطبق نفس القواعد الإملائية لإضافة ing التي تعلمناها في المضارع المستمر.',
    ruleCards: [
      {
        badge: 'was / were',
        badgeType: 'emerald',
        titleAr: 'اختيار الفعل المساعد',
        conditionAr: 'نستخدم was مع (I, He, She, It والمفرد)، ونستخدم were مع (You, We, They والجمع).',
        examples: 'I was reading | They were playing',
      },
      {
        badge: '+ ing',
        badgeType: 'rose',
        titleAr: 'قواعد إملاء الـ ing',
        conditionAr: 'حذف e الصامتة، مضاعفة ساكن CVC، وقلب ie إلى ying.',
        examples: 'writing | swimming | dying',
      },
    ],
    tableRows: [
      {
        addition: 'was/were + ing',
        ruleTitleAr: '١) توزيع was و were مع الأفعال:',
        conditionAr: 'تطابق الفعل المساعد مع الفاعل هو الخطوة الأولى الأساسية.',
        examples: [
          { base: 'I / He / She / It', changed: 'was studying / was driving', audioPhrase: 'I was studying. He was driving.' },
          { base: 'You / We / They', changed: 'were studying / were driving', audioPhrase: 'They were studying. We were driving.' },
        ],
        noteAr: 'في النفي نستخدم wasn\'t أو weren\'t مع الحفاظ التام على الفعل بصيغة ing.',
      },
      {
        addition: 'أفعال لا تقبل ing',
        ruleTitleAr: '٢) استثناء أفعال الحواس والشعور في الماضي المستمر:',
        conditionAr: 'إذا ورد فعل يعبر عن حالة شعورية أو إدراك في وقت ماض، نستخدم الماضي البسيط بدلاً من المستمر.',
        examples: [
          { base: 'hear', changed: 'I heard a sound (ليس I was hearing)', audioPhrase: 'I heard a strange noise.' },
          { base: 'know', changed: 'I knew the answer (ليس I was knowing)', audioPhrase: 'I knew the right answer.' },
        ],
        noteAr: 'أفعال الحواس والملكية تتفادى الـ ing وتكتفي بالماضي البسيط.',
      },
    ],
    goldenSpellingNoteAr: 'انتبه للفارق بين while و when: عادة ما يتبع while ماضٍ مستمر (was/were + ing)، بينما يتبع when ماضٍ بسيط (V2).',
  },

  past_perfect: {
    tenseId: 'past_perfect',
    titleAr: 'جدول تصاريف الأفعال وقواعد الإملاء (Spelling & Verb Forms)',
    subtitleAr: 'قواعد had + Past Participle (V3) للدلالة على الحدث الأسبق وقوعاً في الماضي',
    overviewAr: 'يتكون زمن الماضي التام من الفعل المساعد had (وهو ثابت مع كافة الضمائر بلا استثناء) يليه التصريف الثالث للفعل الأساسي (Past Participle - V3).',
    ruleCards: [
      {
        badge: 'had الثابتة',
        badgeType: 'emerald',
        titleAr: 'الفعل المساعد الثابت (had)',
        conditionAr: 'يستخدم had مع جميع الضمائر المفردة والجمع على حد سواء.',
        examples: 'I had, She had, They had',
      },
      {
        badge: 'V3 التصريف الثالث',
        badgeType: 'rose',
        titleAr: 'التصريف الثالث (Past Participle)',
        conditionAr: 'إضافة ed للأفعال المنتظمة، واستخدام الشكل الشاذ للأفعال غير المنتظمة.',
        examples: 'had finished | had left | had seen',
      },
    ],
    tableRows: [
      {
        addition: 'had + V3 منتظم',
        ruleTitleAr: '١) الأفعال المنتظمة مع had:',
        conditionAr: 'إضافة ed إلى مصدر الفعل.',
        examples: [
          { base: 'finish', changed: 'had finished', audioPhrase: 'had finished' },
          { base: 'arrive', changed: 'had arrived', audioPhrase: 'had arrived' },
          { base: 'clean', changed: 'had cleaned', audioPhrase: 'had cleaned' },
        ],
        noteAr: "اختصار had مع الضمائر يكتب كـ 'd (مثال: I'd finished / She'd left).",
      },
      {
        addition: 'had + V3 شاذ',
        ruleTitleAr: '٢) الأفعال الشاذة مع had:',
        conditionAr: 'استخدام صيغة الـ Past Participle الخاصة بكل فعل غير منتظم.',
        examples: [
          { base: 'leave', changed: 'had left', audioPhrase: 'The train had left.' },
          { base: 'go', changed: 'had gone', audioPhrase: 'He had gone home.' },
          { base: 'eat', changed: 'had eaten', audioPhrase: 'We had eaten dinner.' },
        ],
        noteAr: 'تكرار had had وارد وصحيح لغوياً 100%: الأولى فعل مساعد والثانية التصريف الثالث لفعل يملك (I had had lunch before he arrived).',
      },
    ],
    goldenSpellingNoteAr: 'الماضي التام هو "أقدم ماضٍ" في الجملة؛ استخدمه فقط عندما توجد نقطتان زمنيتان في الماضي وتريد توضيح أيهما حدثت أولاً.',
  },

  past_perfect_continuous: {
    tenseId: 'past_perfect_continuous',
    titleAr: 'جدول تصاريف الأفعال وقواعد الإملاء (Spelling & Verb Forms)',
    subtitleAr: 'تركيبة (had been + V-ing) للتعبير عن استمرار حدث ماضٍ قبل وقوع حدث ماضٍ آخر',
    overviewAr: 'يتكون زمن الماضي التام المستمر من صيغة ثلاثية موحدة مع كافة الضمائر: (had been) متبوعة بالفعل الأساسي مضافاً إليه (-ing).',
    ruleCards: [
      {
        badge: 'had been',
        badgeType: 'emerald',
        titleAr: 'المساعد المزدوج الثابت',
        conditionAr: 'had been ثابتة مع المفرد والجمع، وتختصر إلى I\'d been / She\'d been.',
        examples: 'I had been waiting | He had been driving',
      },
      {
        badge: '+ ing',
        badgeType: 'indigo',
        titleAr: 'إملاء الـ ing',
        conditionAr: 'تطبيق نفس قواعد إملاء الـ ing المعتادة.',
        examples: 'waiting | running | living',
      },
    ],
    tableRows: [
      {
        addition: 'had been + ing',
        ruleTitleAr: '١) الصياغة والأمثلة التوضيحية:',
        conditionAr: 'تركيبة تدل على استغراق وقت وجهد قبل لحظة معينة في الماضي.',
        examples: [
          { base: 'wait', changed: 'had been waiting for 3 hours', audioPhrase: 'I had been waiting for 3 hours.' },
          { base: 'drive', changed: 'had been driving all day', audioPhrase: 'He had been driving all day.' },
        ],
        noteAr: 'يتميز هذا الزمن ببيان أسباب التعب أو النتيجة في الماضي: (He was tired because he had been running).',
      },
    ],
    goldenSpellingNoteAr: 'لا تستخدم هذا الزمن مع أفعال اللحظة الخاطفة (مثل start, stop, break) بل مع الأفعال التي تمتد زمنياً بطبيعتها.',
  },

  future_simple: {
    tenseId: 'future_simple',
    titleAr: 'جدول تصاريف الأفعال وقواعد الإملاء (Spelling & Verb Forms)',
    subtitleAr: 'صيغتا المستقبل (will + Base Verb) و (be going to + Base Verb) وقواعد الاختصار',
    overviewAr: 'في زمن المستقبل البسيط، الميزة الأبرز هي بقاء الفعل الرئيسي في صيغة المصدر المجرد (Base V1) بدون أي إضافات، سواء استُخدم الفعل المساعد will أو الصيغة التعبيرية be going to:',
    ruleCards: [
      {
        badge: 'will + Base',
        badgeType: 'emerald',
        titleAr: 'صيغة will مع المصدر المجرد',
        conditionAr: 'الفعل بعد will يأتي خالياً من أي إضافة (بدون s، بدون ed، بدون ing).',
        examples: 'will go | will study | will help',
      },
      {
        badge: 'اختصارات will',
        badgeType: 'rose',
        titleAr: "اختصارات 'll و won't",
        conditionAr: "تختصر will مع الضمائر إلى 'll، وفي النفي تصبح won't (= will not).",
        examples: "I'll call you | She won't come",
      },
      {
        badge: 'be going to',
        badgeType: 'indigo',
        titleAr: 'صيغة be going to + المصدر',
        conditionAr: 'فعل الكينونة (am/is/are) يليه going to ثم الفعل المصدر المجرد.',
        examples: 'am going to travel | is going to buy',
      },
    ],
    tableRows: [
      {
        addition: "will / 'll + المصدر",
        ruleTitleAr: '١) جدول اختصارات will والنفي مع الضمائر:',
        conditionAr: 'will تعمل كفعل مساعد ناقص يتطلب مصدراً مجرداً بعدها.',
        examples: [
          { base: 'I will ➔ I\'ll', changed: "I'll see you tomorrow", audioPhrase: "I'll see you tomorrow." },
          { base: 'He will ➔ He\'ll', changed: "He'll arrive soon", audioPhrase: "He'll arrive soon." },
          { base: 'will not ➔ won\'t', changed: "We won't be late", audioPhrase: "We won't be late." },
        ],
        noteAr: 'انتبه: بعد will لا نضيف s الغائب حتى مع he أو she (فنقول: He will come وليس He will comes).',
      },
      {
        addition: 'be going to + المصدر',
        ruleTitleAr: '٢) قواعد صياغة be going to:',
        conditionAr: 'تتغير am / is / are حسب الفاعل، ويبقى الفعل الأساسي في المصدر.',
        examples: [
          { base: 'I', changed: 'am going to buy a car', audioPhrase: 'I am going to buy a new car.' },
          { base: 'He / She', changed: 'is going to start university', audioPhrase: 'She is going to start next week.' },
          { base: 'They / We', changed: 'are going to visit Egypt', audioPhrase: 'They are going to visit Egypt.' },
        ],
        noteAr: 'في النطق غير الرسمي السريع بالعامية الأمريكية، تُنطق going to كـ gonna ولكنها لا تكتب هكذا في الامتحانات الرسمية.',
      },
    ],
    goldenSpellingNoteAr: 'قاعدة ذهبية: بعد will أو won\'t أو to، يأتي الفعل دائماً في المصدر المجرد الأساسي بدون أي تغيير أو تصريف.',
  },

  future_continuous: {
    tenseId: 'future_continuous',
    titleAr: 'جدول تصاريف الأفعال وقواعد الإملاء (Spelling & Verb Forms)',
    subtitleAr: 'قواعد will be + V-ing للدلالة على حدث سيكون مستمراً في لحظة معينة بالمستقبل',
    overviewAr: 'يتكون زمن المستقبل المستمر من التركيبة الثابتة (will be) متبوعة بالفعل الأساسي مضافاً إليه (-ing). تنطبق نفس القواعد الإملائية المعروفة لإضافة ing.',
    ruleCards: [
      {
        badge: 'will be الثابتة',
        badgeType: 'emerald',
        titleAr: 'المساعد الثابت (will be)',
        conditionAr: 'تأتي will be متطابقة مع كافة الضمائر، متبوعة بـ ing.',
        examples: 'will be flying | will be sleeping',
      },
      {
        badge: '+ ing',
        badgeType: 'rose',
        titleAr: 'قواعد إملاء الـ ing',
        conditionAr: 'حذف e الصامتة ومضاعفة الساكن مع CVC.',
        examples: 'having | traveling | waiting',
      },
    ],
    tableRows: [
      {
        addition: 'will be + ing',
        ruleTitleAr: '١) أمثلة التكوين الإملائي واللفظي:',
        conditionAr: 'حدث قيد الاستمرار في المستقبل عند نقطة محددة.',
        examples: [
          { base: 'fly', changed: 'will be flying to Dubai at 9 AM', audioPhrase: 'I will be flying to Dubai tomorrow at nine.' },
          { base: 'study', changed: 'will be studying for finals', audioPhrase: 'She will be studying tonight.' },
        ],
        noteAr: 'في النفي نضع not بين will و be: (will not be / won\'t be playing).',
      },
    ],
    goldenSpellingNoteAr: 'لا تحذف كلمة be أبداً؛ القول "I will studying" خطأ نحوي شائع، والصواب هو "I will be studying".',
  },

  future_perfect: {
    tenseId: 'future_perfect',
    titleAr: 'جدول تصاريف الأفعال وقواعد الإملاء (Spelling & Verb Forms)',
    subtitleAr: 'قواعد will have + Past Participle (V3) للدلالة على إنجاز واكتمال الحدث قبل وقت مستقبلي',
    overviewAr: 'يتكون زمن المستقبل التام من التركيبة الثابتة (will have) متبوعة بالتصريف الثالث للفعل (Past Participle - V3). لا نستخدم has أبداً بعد will حتى مع ضمائر المفرد.',
    ruleCards: [
      {
        badge: 'will have فقط',
        badgeType: 'emerald',
        titleAr: 'ثبات have وعدم استخدام has',
        conditionAr: 'بعد will نستخدم have دائماً مع كل الضمائر بدون استثناء.',
        examples: 'He will have finished (لا نقول will has)',
      },
      {
        badge: 'V3 التصريف الثالث',
        badgeType: 'rose',
        titleAr: 'التصريف الثالث (Past Participle)',
        conditionAr: 'إضافة ed للأفعال المنتظمة وتصريف خاص للأفعال الشاذة.',
        examples: 'completed | graduated | left',
      },
    ],
    tableRows: [
      {
        addition: 'will have + V3',
        ruleTitleAr: '١) نماذج الصياغة مع المفرد والجمع:',
        conditionAr: 'اكتمال حدث قبل موعد محدد مسبوق بكلمة By (مثل: By next year, By 5 PM).',
        examples: [
          { base: 'graduate', changed: 'will have graduated by 2027', audioPhrase: 'I will have graduated by 2027.' },
          { base: 'complete', changed: 'will have completed the project', audioPhrase: 'They will have completed the project by Friday.' },
        ],
        noteAr: 'لا يصح مطلقاً أن نقول "He will has" لأن will تلزم ما بعدها بالمصدر المجرد وهو have.',
      },
    ],
    goldenSpellingNoteAr: 'علامة المستقبل التام الدالة الأشهر هي كلمة By متبوعة بزمن مستقبلي (مثال: By tomorrow, By next month).',
  },

  future_perfect_continuous: {
    tenseId: 'future_perfect_continuous',
    titleAr: 'جدول تصاريف الأفعال وقواعد الإملاء (Spelling & Verb Forms)',
    subtitleAr: 'تركيبة (will have been + V-ing) لحساب مدة استمرار عمل حتى نقطة في المستقبل',
    overviewAr: 'يتكون زمن المستقبل التام المستمر من تركيبة رباعية ثابتة وموحدة: (will have been) متبوعة بالفعل الأساسي مضافاً إليه اللاحقة (-ing).',
    ruleCards: [
      {
        badge: 'will have been',
        badgeType: 'emerald',
        titleAr: 'التركيبة المساعدة الثابتة',
        conditionAr: 'will have been ثابتة لا تتغير مع أي فاعل أو ضمير.',
        examples: 'will have been working for 10 years',
      },
      {
        badge: '+ ing',
        badgeType: 'indigo',
        titleAr: 'إملاء الـ ing',
        conditionAr: 'تطبيق نفس قواعد إملاء الـ ing.',
        examples: 'living | teaching | driving',
      },
    ],
    tableRows: [
      {
        addition: 'will have been + ing',
        ruleTitleAr: '١) نموذج الصياغة للتعبير عن المدة الزمنية التراكمية:',
        conditionAr: 'قياس المدة الزمنية التي يكون قد استغرقها الحدث بحلول موعد قادم.',
        examples: [
          { base: 'teach', changed: 'will have been teaching for 15 years by June', audioPhrase: 'By June, I will have been teaching for fifteen years.' },
          { base: 'live', changed: 'will have been living in London for a decade', audioPhrase: 'We will have been living here for ten years.' },
        ],
        noteAr: 'التركيبة تبين استمرار الفعل وكمية الوقت التي ستكون قد انقضت فيه.',
      },
    ],
    goldenSpellingNoteAr: 'هذا الزمن هو أطول أزمنة الإنجليزية تركيباً؛ احرص على وجود الأركان الأربعة: will + have + been + V-ing.',
  },
};

export function getSpellingRulesForTense(tenseId: string): TenseSpellingData {
  return tenseSpellingRulesData[tenseId] || tenseSpellingRulesData['present_simple'];
}
