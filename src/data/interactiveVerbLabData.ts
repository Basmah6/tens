import { InteractiveSpellingVerb, SpellingPracticeQuiz } from '../types';

export interface TenseLabMeta {
  targetLabelEn: string;
  targetLabelAr: string;
  inputPlaceholder: string;
  labSubtitleAr: string;
}

export const TENSE_LAB_CONFIG: Record<string, TenseLabMeta> = {
  present_simple: {
    targetLabelEn: 'Conjugated Form (s/es/ies)',
    targetLabelAr: 'الفعل الأساسي مع إضافة s / es / ies',
    inputPlaceholder: 'Type any verb (e.g. watch, study, fix, carry, play, go)...',
    labSubtitleAr: 'اكتشف كيف يتغير شكل الفعل الإملائي مع ضمائر المفرد (He / She / It) في المضارع البسيط:',
  },
  present_continuous: {
    targetLabelEn: 'V-ing Form',
    targetLabelAr: 'صيغة الفعل الأساسي مع اللاحقة (-ing)',
    inputPlaceholder: 'Type any verb (e.g. run, write, die, swim, play, make)...',
    labSubtitleAr: 'اختبر قواعد إضافة (-ing) للفعل مع مراعاة الحروف الصامتة والمضاعفة والاستثناءات:',
  },
  present_perfect: {
    targetLabelEn: 'Past Participle (V3)',
    targetLabelAr: 'التصريف الثالث للفعل الأساسي (V3)',
    inputPlaceholder: 'Type any verb (e.g. see, visit, write, eat, stop, study)...',
    labSubtitleAr: 'اختبر صياغة التصريف الثالث (V3) للأفعال المنتظمة (+ed) والأفعال الشاذة الشائعة:',
  },
  present_perfect_continuous: {
    targetLabelEn: 'V-ing Form',
    targetLabelAr: 'صيغة الفعل الأساسي مع اللاحقة (-ing)',
    inputPlaceholder: 'Type any verb (e.g. wait, live, rain, study, work)...',
    labSubtitleAr: 'اختبر قواعد إضافة (-ing) للفعل الأساسي في صيغة الاستمرار التام:',
  },
  past_simple: {
    targetLabelEn: 'Past Simple Form (V2)',
    targetLabelAr: 'التصريف الثاني للفعل الأساسي (V2)',
    inputPlaceholder: 'Type any verb (e.g. play, study, stop, live, go, buy, see)...',
    labSubtitleAr: 'اختبر تحويل الفعل إلى الماضي البسيط (V2) وملاحظة القواعد الإملائية والصوتية:',
  },
  past_continuous: {
    targetLabelEn: 'V-ing Form',
    targetLabelAr: 'صيغة الفعل الأساسي مع اللاحقة (-ing)',
    inputPlaceholder: 'Type any verb (e.g. drive, sleep, swim, read, die)...',
    labSubtitleAr: 'اختبر قواعد إضافة (-ing) للفعل الأساسي المستمر في الماضي:',
  },
  past_perfect: {
    targetLabelEn: 'Past Participle (V3)',
    targetLabelAr: 'التصريف الثالث للفعل الأساسي (V3)',
    inputPlaceholder: 'Type any verb (e.g. finish, arrive, leave, see, eat)...',
    labSubtitleAr: 'اختبر صياغة التصريف الثالث (V3) للفعل الأساسي في الماضي التام:',
  },
  past_perfect_continuous: {
    targetLabelEn: 'V-ing Form',
    targetLabelAr: 'صيغة الفعل الأساسي مع اللاحقة (-ing)',
    inputPlaceholder: 'Type any verb (e.g. wait, drive, run, sleep, teach)...',
    labSubtitleAr: 'اختبر قواعد إضافة (-ing) للفعل الأساسي في الماضي التام المستمر:',
  },
  future_simple: {
    targetLabelEn: 'Base Form (V1)',
    targetLabelAr: 'المصدر المجرد للفعل الأساسي',
    inputPlaceholder: 'Type any verb (e.g. help, travel, study, buy, come)...',
    labSubtitleAr: 'لاحظ كيف يحافظ الفعل على شكله المجرد (Base Form) في المستقبل البسيط:',
  },
  future_continuous: {
    targetLabelEn: 'V-ing Form',
    targetLabelAr: 'صيغة الفعل الأساسي مع اللاحقة (-ing)',
    inputPlaceholder: 'Type any verb (e.g. fly, take, study, sleep, travel)...',
    labSubtitleAr: 'اختبر قواعد إضافة (-ing) للفعل الأساسي في المستقبل المستمر:',
  },
  future_perfect: {
    targetLabelEn: 'Past Participle (V3)',
    targetLabelAr: 'التصريف الثالث للفعل الأساسي (V3)',
    inputPlaceholder: 'Type any verb (e.g. graduate, complete, finish, arrive)...',
    labSubtitleAr: 'اختبر صياغة التصريف الثالث (V3) للفعل الأساسي في المستقبل التام:',
  },
  future_perfect_continuous: {
    targetLabelEn: 'V-ing Form',
    targetLabelAr: 'صيغة الفعل الأساسي مع اللاحقة (-ing)',
    inputPlaceholder: 'Type any verb (e.g. teach, live, work, wait, study)...',
    labSubtitleAr: 'اختبر قواعد إضافة (-ing) للفعل الأساسي في المستقبل التام المستمر:',
  },
};

export const TENSE_INTERACTIVE_VERBS: Record<string, InteractiveSpellingVerb[]> = {
  present_simple: [
    {
      base: 'watch',
      conjugated: 'watches',
      additionType: '+ es',
      ruleExplanationAr: 'ينتهي بنهاية صفيرية ch ➔ نضيف es لمنع تصادم الأصوات الساكنة.',
      audioPhrase: 'He watches educational documentaries every evening.',
      exampleSentenceEn: 'He watches educational documentaries every evening.',
      exampleSentenceAr: 'هو يشاهد وثائقيات تعليمية كل مساء.',
    },
    {
      base: 'study',
      conjugated: 'studies',
      additionType: '+ ies',
      ruleExplanationAr: 'ينتهي بـ (ساكن d + y) ➔ نحذف حرف الـ y ونضيف ies بدلاً منه.',
      audioPhrase: 'She studies medicine at Oxford University.',
      exampleSentenceEn: 'She studies medicine at Oxford University.',
      exampleSentenceAr: 'هي تدرس الطب في جامعة أكسفورد.',
    },
    {
      base: 'play',
      conjugated: 'plays',
      additionType: '+ s',
      ruleExplanationAr: 'ينتهي بـ (متحرك a + y) ➔ لا نحذف الـ y بل نضيف s فقط كقاعدة عامة.',
      audioPhrase: 'My son plays football skillfully every weekend.',
      exampleSentenceEn: 'My son plays football skillfully every weekend.',
      exampleSentenceAr: 'ابني يلعب كرة القدم بمهارة كل عطلة أسبوع.',
    },
    {
      base: 'fix',
      conjugated: 'fixes',
      additionType: '+ es',
      ruleExplanationAr: 'ينتهي بحرف x ➔ نضيف es لسهولة النطق الصوتي.',
      audioPhrase: 'The mechanic fixes old engines with great care.',
      exampleSentenceEn: 'The mechanic fixes old engines with great care.',
      exampleSentenceAr: 'الميكانيكي يصلح المحركات القديمة بعناية فائقة.',
    },
    {
      base: 'go',
      conjugated: 'goes',
      additionType: '+ es',
      ruleExplanationAr: 'ينتهي بحرف o ➔ نضيف es مثل does و goes.',
      audioPhrase: 'Sarah goes to the gym three times a week.',
      exampleSentenceEn: 'Sarah goes to the gym three times a week.',
      exampleSentenceAr: 'سارة تذهب إلى النادي الرياضي ثلاث مرات أسبوعياً.',
    },
    {
      base: 'have',
      conjugated: 'has',
      additionType: 'شاذ',
      ruleExplanationAr: 'فعل استثنائي شاذ ➔ يتحول كلياً إلى has مع ضمائر المفرد الغائب.',
      audioPhrase: 'He has an important meeting this morning.',
      exampleSentenceEn: 'He has an important meeting this morning.',
      exampleSentenceAr: 'لديه اجتماع مهم هذا الصباح.',
    },
  ],

  present_continuous: [
    {
      base: 'work',
      conjugated: 'working',
      additionType: '+ ing',
      ruleExplanationAr: 'فعل قياسي عادي ➔ نضيف اللاحقة ing مباشرة لنهاية الفعل بدون أي حذف.',
      audioPhrase: 'working. She is working on an exciting new project.',
      exampleSentenceEn: 'She is working on an exciting new project right now.',
      exampleSentenceAr: 'هي تعمل على مشروع جديد ومثير في هذه اللحظة.',
    },
    {
      base: 'write',
      conjugated: 'writing',
      additionType: '- e + ing',
      ruleExplanationAr: 'ينتهي بـ e صامتة غير ملفوظة ➔ نحذف حرف الـ e قبل إضافة ing.',
      audioPhrase: 'writing. He is writing a detailed report for his manager.',
      exampleSentenceEn: 'He is writing a detailed report for his manager.',
      exampleSentenceAr: 'هو يكتب تقريراً مفصلاً لمديره حالياً.',
    },
    {
      base: 'run',
      conjugated: 'running',
      additionType: 'مضاعفة CVC',
      ruleExplanationAr: 'مقطع واحد ينتهي بـ ساكن قبله متحرك قصير (CVC) ➔ نضاعف الحرف n قبل ing.',
      audioPhrase: 'running. The children are running joyfully in the park.',
      exampleSentenceEn: 'The children are running joyfully in the park.',
      exampleSentenceAr: 'الأطفال يركضون ببهجة في الحديقة الآن.',
    },
    {
      base: 'die',
      conjugated: 'dying',
      additionType: 'ie ➔ ying',
      ruleExplanationAr: 'ينتهي بـ ie ➔ نستبدل الـ ie بحرف y ثم نضيف ing (مثل: lie ➔ lying).',
      audioPhrase: 'dying. The dry plants are dying because of the heat.',
      exampleSentenceEn: 'The dry plants are dying because of the heat.',
      exampleSentenceAr: 'النباتات الجافة تموت بسبب شدة الحرارة.',
    },
    {
      base: 'play',
      conjugated: 'playing',
      additionType: '+ ing (مع y)',
      ruleExplanationAr: 'مع الـ ing لا نحذف الـ y مطلقاً سواء سبقه ساكن أو متحرك (playing / studying).',
      audioPhrase: 'playing. They are playing basketball outside.',
      exampleSentenceEn: 'They are playing basketball outside.',
      exampleSentenceAr: 'هم يلعبون كرة السلة بالخارج في هذه اللحظة.',
    },
    {
      base: 'know',
      conjugated: 'know (فعل حالة)',
      additionType: 'Stative Verb',
      ruleExplanationAr: 'فعل حالة وإدراك ذهني ➔ لا يقبل إضافة اللاحقة ing في صيغة الاستمرار (فنقول I know وليس I am knowing).',
      audioPhrase: 'know. I know the answer very well.',
      exampleSentenceEn: 'I know the answer very well.',
      exampleSentenceAr: 'أنا أعرف الإجابة جيداً (لا نضع ing لأفعال الإدراك).',
    },
  ],

  present_perfect: [
    {
      base: 'visit',
      conjugated: 'visited',
      additionType: '+ ed (V3)',
      ruleExplanationAr: 'فعل منتظم ➔ يتطابق التصريف الثالث (V3) مع التصريف الثاني بإضافة ed.',
      audioPhrase: 'visited. I have visited the national museum twice.',
      exampleSentenceEn: 'I have visited the national museum twice.',
      exampleSentenceAr: 'لقد زرت المتحف الوطني مرتين حتى الآن.',
    },
    {
      base: 'study',
      conjugated: 'studied',
      additionType: '+ ied (V3)',
      ruleExplanationAr: 'ينتهي بـ (ساكن + y) ➔ تحذف الـ y وتستبدل بـ ied في صيغة الـ V3.',
      audioPhrase: 'studied. She has studied three foreign languages.',
      exampleSentenceEn: 'She has studied three foreign languages.',
      exampleSentenceAr: 'لقد درست ثلاث لغات أجنبية.',
    },
    {
      base: 'stop',
      conjugated: 'stopped',
      additionType: 'مضاعفة CVC',
      ruleExplanationAr: 'فعل CVC قصير ➔ نضاعف الحرف الساكن الأخير قبل إضافة ed في التصريف الثالث.',
      audioPhrase: 'stopped. The rain has finally stopped.',
      exampleSentenceEn: 'The rain has finally stopped.',
      exampleSentenceAr: 'لقد توقف المطر أخيراً.',
    },
    {
      base: 'see',
      conjugated: 'seen',
      additionType: 'V3 شاذ',
      ruleExplanationAr: 'فعل غير منتظم ➔ يتحول من see ➔ saw ➔ seen في التصريف الثالث.',
      audioPhrase: 'seen. Have you seen my car keys anywhere?',
      exampleSentenceEn: 'Have you seen my car keys anywhere?',
      exampleSentenceAr: 'هل رأيت مفاتيح سيارتي في أي مكان؟',
    },
    {
      base: 'write',
      conjugated: 'written',
      additionType: 'V3 شاذ (-en)',
      ruleExplanationAr: 'فعل شاذ ➔ ينتهي التصريف الثالث باللاحقة ten: write ➔ wrote ➔ written.',
      audioPhrase: 'written. He has written several bestselling novels.',
      exampleSentenceEn: 'He has written several bestselling novels.',
      exampleSentenceAr: 'لقد كتب عدة روايات من الأكثر مبيعاً.',
    },
    {
      base: 'go',
      conjugated: 'gone / been',
      additionType: 'gone vs been',
      ruleExplanationAr: 'gone (ذهب ولم يعد بعد)، بينما been (زار المكان وعاد منه بنجاح).',
      audioPhrase: 'gone. She has gone to Paris for a business trip.',
      exampleSentenceEn: 'She has gone to Paris for a business trip.',
      exampleSentenceAr: 'لقد ذهبت إلى باريس في رحلة عمل (وهي هناك حالياً).',
    },
  ],

  present_perfect_continuous: [
    {
      base: 'wait',
      conjugated: 'waiting',
      additionType: '+ ing',
      ruleExplanationAr: 'فعل حركة ممتد ➔ إضافة اللاحقة ing مباشرة لنهاية الفعل للدلالة على الاستمرار.',
      audioPhrase: 'waiting. I have been waiting here for over forty minutes.',
      exampleSentenceEn: 'I have been waiting here for over forty minutes.',
      exampleSentenceAr: 'أنا أنتظر هنا منذ أكثر من أربعين دقيقة.',
    },
    {
      base: 'live',
      conjugated: 'living',
      additionType: 'حذف e + ing',
      ruleExplanationAr: 'الفعل ينتهي بـ e صامتة ➔ تحذف الـ e وتضاف ing.',
      audioPhrase: 'living. We have been living in this city since 2018.',
      exampleSentenceEn: 'We have been living in this city since 2018.',
      exampleSentenceAr: 'نحن نعيش في هذه المدينة منذ عام 2018.',
    },
    {
      base: 'rain',
      conjugated: 'raining',
      additionType: '+ ing',
      ruleExplanationAr: 'يستخدم بكثرة مع ظواهر الطقس لبيان استمرارها طوال الصباح أو اليوم.',
      audioPhrase: 'raining. It has been raining all morning without stopping.',
      exampleSentenceEn: 'It has been raining all morning without stopping.',
      exampleSentenceAr: 'إنها تمطر طوال الصباح دون توقف.',
    },
    {
      base: 'work',
      conjugated: 'working',
      additionType: '+ ing مباشر',
      ruleExplanationAr: 'فعل قياسي يوضح بذل مجهود عملي متواصل أدى إلى التعب الحاضر.',
      audioPhrase: 'working. He has been working on this code since dawn.',
      exampleSentenceEn: 'He has been working on this code since dawn.',
      exampleSentenceAr: 'هو يعمل على هذه البرمجية منذ الفجر.',
    },
    {
      base: 'run',
      conjugated: 'running',
      additionType: 'مضاعفة CVC',
      ruleExplanationAr: 'مضاعفة الحرف n في run لتصبح running لمنع تداخل المقاطع.',
      audioPhrase: 'running. They are tired because they have been running.',
      exampleSentenceEn: 'They are tired because they have been running.',
      exampleSentenceAr: 'هم متعبون لأنهم كانوا يركضون.',
    },
  ],

  past_simple: [
    {
      base: 'play',
      conjugated: 'played',
      additionType: '+ ed',
      ruleExplanationAr: 'ينتهي بـ (متحرك a + y) ➔ لا تحذف الـ y بل نضيف ed مباشرة.',
      audioPhrase: 'played. We played tennis yesterday afternoon.',
      exampleSentenceEn: 'We played tennis yesterday afternoon.',
      exampleSentenceAr: 'لعبنا التنس بعد ظهر أمس.',
    },
    {
      base: 'live',
      conjugated: 'lived',
      additionType: '+ d فقط',
      ruleExplanationAr: 'ينتهي بالفعل بـ e أصلية ➔ نكتفي بإضافة حرف d فقط.',
      audioPhrase: 'lived. My grandparents lived in a quiet village.',
      exampleSentenceEn: 'My grandparents lived in a quiet village.',
      exampleSentenceAr: 'عاش أجدادي في قرية هادئة.',
    },
    {
      base: 'study',
      conjugated: 'studied',
      additionType: '+ ied',
      ruleExplanationAr: 'ينتهي بـ (ساكن d + y) ➔ تحذف الـ y وتستبدل بـ ied في الماضي.',
      audioPhrase: 'studied. He studied hard and passed his final exam.',
      exampleSentenceEn: 'He studied hard and passed his final exam.',
      exampleSentenceAr: 'درس بجد واجتاز اختباره النهائي.',
    },
    {
      base: 'stop',
      conjugated: 'stopped',
      additionType: 'مضاعفة CVC',
      ruleExplanationAr: 'مقطع واحد ينتهي بـ ساكن مسبوق بمتحرك منفرد ➔ نضاعف الـ p قبل ed.',
      audioPhrase: 'stopped. The bus stopped suddenly in front of the station.',
      exampleSentenceEn: 'The bus stopped suddenly in front of the station.',
      exampleSentenceAr: 'توقف الباص فجأة أمام المحطة.',
    },
    {
      base: 'go',
      conjugated: 'went',
      additionType: 'شاذ V2',
      ruleExplanationAr: 'فعل غير منتظم أساسي ➔ يتحول كلياً إلى went في الإثبات، ويعود لمصدره go مع did.',
      audioPhrase: 'went. They went to Dubai on vacation last winter.',
      exampleSentenceEn: 'They went to Dubai on vacation last winter.',
      exampleSentenceAr: 'ذهبوا إلى دبي في إجازة الشتاء الماضي.',
    },
    {
      base: 'buy',
      conjugated: 'bought',
      additionType: 'شاذ V2 (-ought)',
      ruleExplanationAr: 'فعل شاذ ينتهي بصوت /ɔːt/ المكتوب بـ ought.',
      audioPhrase: 'bought. She bought a stylish leather jacket yesterday.',
      exampleSentenceEn: 'She bought a stylish leather jacket yesterday.',
      exampleSentenceAr: 'اشترت سترة جلدية أنيقة يوم أمس.',
    },
  ],

  past_continuous: [
    {
      base: 'read',
      conjugated: 'reading',
      additionType: '+ ing',
      ruleExplanationAr: 'فعل قياسي ➔ نضيف ing مباشرة لنهاية الفعل.',
      audioPhrase: 'reading. I was reading a book when the phone rang.',
      exampleSentenceEn: 'I was reading a book when the phone rang.',
      exampleSentenceAr: 'كنت أقرأ كتاباً عندما رن الهاتف.',
    },
    {
      base: 'drive',
      conjugated: 'driving',
      additionType: 'حذف e + ing',
      ruleExplanationAr: 'ينتهي بـ e صامتة ➔ تحذف الـ e قبل إضافة ing.',
      audioPhrase: 'driving. He was driving home in heavy rain at seven.',
      exampleSentenceEn: 'He was driving home in heavy rain at seven.',
      exampleSentenceAr: 'كان يقود سيارته إلى المنزل وسط مطر غزير في السابعة.',
    },
    {
      base: 'swim',
      conjugated: 'swimming',
      additionType: 'مضاعفة CVC',
      ruleExplanationAr: 'مقطع CVC قصير ➔ نضاعف حرف m لتصبح swimming.',
      audioPhrase: 'swimming. They were swimming in the pool all afternoon.',
      exampleSentenceEn: 'They were swimming in the pool all afternoon.',
      exampleSentenceAr: 'كانوا يسبحون في المسبح طوال فترة بعد الظهر.',
    },
    {
      base: 'sleep',
      conjugated: 'sleeping',
      additionType: '+ ing مباشر',
      ruleExplanationAr: 'فعل ينتهي بساكن قبله متحركان (ee) ➔ لا نضاعف الساكن بل نضيف ing مباشرة.',
      audioPhrase: 'sleeping. The baby was sleeping peacefully in the crib.',
      exampleSentenceEn: 'The baby was sleeping peacefully in the crib.',
      exampleSentenceAr: 'كان الطفل ينام بهدوء في مهده.',
    },
    {
      base: 'hear',
      conjugated: 'heard (فعل حواس)',
      additionType: 'Stative Verb',
      ruleExplanationAr: 'أفعال الحواس والسمع لا تأخذ ing في الماضي بل نستخدم الماضي البسيط (heard).',
      audioPhrase: 'heard. I heard a strange noise outside.',
      exampleSentenceEn: 'I heard a strange noise outside.',
      exampleSentenceAr: 'سمعت صوتاً غريباً بالخارج (نفضل الماضي البسيط).',
    },
  ],

  past_perfect: [
    {
      base: 'finish',
      conjugated: 'finished',
      additionType: '+ ed (V3)',
      ruleExplanationAr: 'فعل منتظم ➔ إضافة ed لبيان التصريف الثالث للفعل الأساسي.',
      audioPhrase: 'finished. I had finished my homework before dinner was served.',
      exampleSentenceEn: 'I had finished my homework before dinner was served.',
      exampleSentenceAr: 'كنت قد أنهيت واجبي المنزلي قبل تقديم العشاء.',
    },
    {
      base: 'arrive',
      conjugated: 'arrived',
      additionType: '+ d فقط (V3)',
      ruleExplanationAr: 'ينتهي بـ e ➔ نضيف d فقط لصياغة التصريف الثالث V3.',
      audioPhrase: 'arrived. The guests had already arrived before the host.',
      exampleSentenceEn: 'The guests had already arrived before the host.',
      exampleSentenceAr: 'كان الضيوف قد وصلوا بالفعل قبل المضيف.',
    },
    {
      base: 'leave',
      conjugated: 'left',
      additionType: 'V3 شاذ',
      ruleExplanationAr: 'فعل غير منتظم ➔ يتحول leave إلى left في التصريف الثالث.',
      audioPhrase: 'left. The train had left when we reached the station.',
      exampleSentenceEn: 'The train had left when we reached the station.',
      exampleSentenceAr: 'كان القطار قد غادر عندما وصلنا إلى المحطة.',
    },
    {
      base: 'see',
      conjugated: 'seen',
      additionType: 'V3 شاذ',
      ruleExplanationAr: 'التصريف الثالث لـ see هو seen.',
      audioPhrase: 'seen. She had never seen such a magnificent sunset before.',
      exampleSentenceEn: 'She had never seen such a magnificent sunset before.',
      exampleSentenceAr: 'لم تكن قد رأت مثل هذا الغروب البديع من قبل.',
    },
    {
      base: 'have',
      conjugated: 'had',
      additionType: 'V3 للفعل have',
      ruleExplanationAr: 'التصريف الثالث لفعل التناول/الملكية have هو had.',
      audioPhrase: 'had. I had had breakfast before I left home.',
      exampleSentenceEn: 'I had had breakfast before I left home.',
      exampleSentenceAr: 'كنت قد تناولت إفطاري قبل مغادرة المنزل.',
    },
  ],

  past_perfect_continuous: [
    {
      base: 'wait',
      conjugated: 'waiting',
      additionType: '+ ing',
      ruleExplanationAr: 'إضافة ing للفعل الأساسي للدلالة على امتداد فترة الانتظار.',
      audioPhrase: 'waiting. We had been waiting for two hours before the bus arrived.',
      exampleSentenceEn: 'We had been waiting for two hours before the bus arrived.',
      exampleSentenceAr: 'كنا ننتظر لمدة ساعتين قبل أن يصل الباص.',
    },
    {
      base: 'drive',
      conjugated: 'driving',
      additionType: 'حذف e + ing',
      ruleExplanationAr: 'حذف e الصامتة قبل إضافة ing للفعل الأساسي drive.',
      audioPhrase: 'driving. He was exhausted because he had been driving all day.',
      exampleSentenceEn: 'He was exhausted because he had been driving all day.',
      exampleSentenceAr: 'كان مرهقاً لأنه كان يقود السيارة طوال اليوم.',
    },
    {
      base: 'work',
      conjugated: 'working',
      additionType: '+ ing مباشر',
      ruleExplanationAr: 'إضافة ing للفعل الأساسي work للدلالة على استمرار الجهد والعمل.',
      audioPhrase: 'working. She had been working there for ten years before retiring.',
      exampleSentenceEn: 'She had been working there for ten years before retiring.',
      exampleSentenceAr: 'كانت تعمل هناك لمدة عشر سنوات قبل أن تتقاعد.',
    },
    {
      base: 'run',
      conjugated: 'running',
      additionType: 'مضاعفة CVC',
      ruleExplanationAr: 'مضاعفة حرف n في run لتصبح running.',
      audioPhrase: 'running. His shoes were muddy because he had been running.',
      exampleSentenceEn: 'His shoes were muddy because he had been running.',
      exampleSentenceAr: 'كان حذاؤه موحلاً لأنه كان يركض.',
    },
  ],

  future_simple: [
    {
      base: 'help',
      conjugated: 'help',
      additionType: 'المصدر (Base)',
      ruleExplanationAr: 'الفعل الأساسي يبقى دائماً في المصدر المجرد بدون أي إضافات.',
      audioPhrase: "help. I'll help you carry these heavy bags.",
      exampleSentenceEn: "I'll help you carry these heavy bags.",
      exampleSentenceAr: 'سأساعدك في حمل هذه الحقائب الثقيلة.',
    },
    {
      base: 'travel',
      conjugated: 'travel',
      additionType: 'المصدر (Base)',
      ruleExplanationAr: 'يبقى الفعل travel في المصدر المجرد.',
      audioPhrase: 'travel. They are going to travel to Japan next summer.',
      exampleSentenceEn: 'They are going to travel to Japan next summer.',
      exampleSentenceAr: 'هم ينوون السفر إلى اليابان الصيف القادم.',
    },
    {
      base: 'study',
      conjugated: 'study',
      additionType: 'المصدر (Base)',
      ruleExplanationAr: 'يبقى الفعل study بمصدره دون أي تعديل إملائي.',
      audioPhrase: "study. She'll study international law next semester.",
      exampleSentenceEn: "She'll study international law next semester.",
      exampleSentenceAr: 'ستدرس القانون الدولي الفصل الدراسي القادم.',
    },
    {
      base: 'come',
      conjugated: 'come',
      additionType: 'المصدر (Base)',
      ruleExplanationAr: 'في الإثبات والنفي يبقى الفعل في المصدر المجرد come.',
      audioPhrase: "come. He won't come to the party tonight.",
      exampleSentenceEn: "He won't come to the party tonight.",
      exampleSentenceAr: 'لن يأتي إلى الحفلة الليلة لأنه مريض.',
    },
    {
      base: 'be',
      conjugated: 'be',
      additionType: 'المصدر (Base)',
      ruleExplanationAr: 'نستخدم المصدر الأصلي be وليس am أو is أو are.',
      audioPhrase: 'be. The weather will be sunny and warm tomorrow.',
      exampleSentenceEn: 'The weather will be sunny and warm tomorrow.',
      exampleSentenceAr: 'سيكون الطقس مشمساً ودافئاً غداً.',
    },
  ],

  future_continuous: [
    {
      base: 'fly',
      conjugated: 'flying',
      additionType: '+ ing',
      ruleExplanationAr: 'إضافة ing للفعل الأساسي للدلالة على الاستمرار في المستقبل.',
      audioPhrase: 'flying. This time tomorrow, I will be flying over the Atlantic.',
      exampleSentenceEn: 'This time tomorrow, I will be flying over the Atlantic.',
      exampleSentenceAr: 'في مثل هذا الوقت غداً، سأكون محلقاً فوق المحيط الأطلسي.',
    },
    {
      base: 'study',
      conjugated: 'studying',
      additionType: '+ ing',
      ruleExplanationAr: 'إضافة ing مباشرة للفعل study دون حذف الـ y.',
      audioPhrase: 'studying. She will be studying for her medical finals tonight.',
      exampleSentenceEn: 'She will be studying for her medical finals tonight.',
      exampleSentenceAr: 'ستكون تدرس لاختباراتها الطبية النهائية الليلة.',
    },
    {
      base: 'take',
      conjugated: 'taking',
      additionType: 'حذف e + ing',
      ruleExplanationAr: 'حذف e الصامتة قبل إضافة ing للفعل take.',
      audioPhrase: 'taking. They will be taking an important test tomorrow morning.',
      exampleSentenceEn: 'They will be taking an important test tomorrow morning.',
      exampleSentenceAr: 'سيكونون يؤدون اختباراً مهماً صباح الغد.',
    },
    {
      base: 'sleep',
      conjugated: 'sleeping',
      additionType: '+ ing مباشر',
      ruleExplanationAr: 'فعل استمرار عادي مضاف له ing.',
      audioPhrase: 'sleeping. Do not call at midnight; I will be sleeping.',
      exampleSentenceEn: 'Do not call at midnight; I will be sleeping.',
      exampleSentenceAr: 'لا تتصل بي عند منتصف الليل؛ سأكون نائماً.',
    },
  ],

  future_perfect: [
    {
      base: 'graduate',
      conjugated: 'graduated',
      additionType: '+ d (V3)',
      ruleExplanationAr: 'التصريف الثالث للفعل الأساسي graduated بإضافة d فقط.',
      audioPhrase: 'graduated. By 2028, she will have graduated from medical school.',
      exampleSentenceEn: 'By 2028, she will have graduated from medical school.',
      exampleSentenceAr: 'بحلول عام 2028، ستكون قد تخرجت من كلية الطب.',
    },
    {
      base: 'complete',
      conjugated: 'completed',
      additionType: '+ d (V3)',
      ruleExplanationAr: 'التصريف الثالث للفعل الأساسي completed بإضافة d.',
      audioPhrase: 'completed. They will have completed the project by June.',
      exampleSentenceEn: 'They will have completed the project by June.',
      exampleSentenceAr: 'سيكونون قد أتموا المشروع بحلول شهر يونيو.',
    },
    {
      base: 'finish',
      conjugated: 'finished',
      additionType: '+ ed (V3)',
      ruleExplanationAr: 'إضافة ed للفعل المنتظم finish لصياغة التصريف الثالث V3.',
      audioPhrase: 'finished. I will have finished reading this novel by Friday.',
      exampleSentenceEn: 'I will have finished reading this novel by Friday.',
      exampleSentenceAr: 'سأكون قد أنهيت قراءة هذه الرواية بحلول يوم الجمعة.',
    },
    {
      base: 'leave',
      conjugated: 'left',
      additionType: 'V3 شاذ',
      ruleExplanationAr: 'التصريف الثالث للفعل الشاذ leave هو left.',
      audioPhrase: 'left. By the time you arrive, the train will have left.',
      exampleSentenceEn: 'By the time you arrive, the train will have left.',
      exampleSentenceAr: 'بحلول وقت وصولك، سيكون القطار قد غادر.',
    },
  ],

  future_perfect_continuous: [
    {
      base: 'teach',
      conjugated: 'teaching',
      additionType: '+ ing',
      ruleExplanationAr: 'صيغة الفعل الأساسي مع ing لحساب مدة استمرار التعليم.',
      audioPhrase: 'teaching. By October, he will have been teaching for thirty years.',
      exampleSentenceEn: 'By October, he will have been teaching for thirty years.',
      exampleSentenceAr: 'بحلول أكتوبر، سيكون قد أمضى ثلاثين عاماً وهو يدرّس.',
    },
    {
      base: 'live',
      conjugated: 'living',
      additionType: 'حذف e + ing',
      ruleExplanationAr: 'حذف الـ e وإضافة ing للفعل الأساسي live.',
      audioPhrase: 'living. Next year, we will have been living here for ten years.',
      exampleSentenceEn: 'Next year, we will have been living here for ten years.',
      exampleSentenceAr: 'في العام القادم، سنكون قد عشنا هنا لمدة عشر سنوات.',
    },
    {
      base: 'work',
      conjugated: 'working',
      additionType: '+ ing',
      ruleExplanationAr: 'إضافة ing للفعل الأساسي work للتعبير عن استمرار العمل.',
      audioPhrase: 'working. She will have been working here for five years next month.',
      exampleSentenceEn: 'She will have been working here for five years next month.',
      exampleSentenceAr: 'ستكون قد عملت هنا لمدة خمس سنوات في الشهر القادم.',
    },
    {
      base: 'wait',
      conjugated: 'waiting',
      additionType: '+ ing',
      ruleExplanationAr: 'إضافة ing للفعل الأساسي wait لحساب طول فترة الانتظار.',
      audioPhrase: 'waiting. If he arrives at five, I will have been waiting for an hour.',
      exampleSentenceEn: 'If he arrives at five, I will have been waiting for an hour.',
      exampleSentenceAr: 'إذا وصل في الخامسة، سأكون قد انتظرت لمدة ساعة كاملة.',
    },
  ],
};

export const TENSE_PRACTICE_QUIZZES: Record<string, SpellingPracticeQuiz[]> = {
  present_simple: [
    {
      questionAr: 'ما هو التصريف الإملائي السليم للفعل (catch) مع الضمير He؟',
      options: ['catchs', 'catches', 'catchies', 'catching'],
      correctOption: 'catches',
      explanationAr: 'الفعل ينتهي بنهاية صفيرية ch، لذلك نضيف es لمنع تصادم الأصوات الساكنة.',
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

  present_continuous: [
    {
      questionAr: 'ما هو الهجاء الصحيح للفعل (make) عند إضافة اللاحقة (-ing)؟',
      options: ['makeing', 'making', 'makking', 'makin'],
      correctOption: 'making',
      explanationAr: 'الأفعال المنتهية بحرف e صامت غير ملفوظ نحذف منها الـ e قبل إضافة ing.',
    },
    {
      questionAr: 'ما هو الهجاء الصحيح للفعل (run) في صيغة المضارع المستمر؟',
      options: ['runing', 'running', 'runeng', 'runnig'],
      correctOption: 'running',
      explanationAr: 'فعل ذو مقطع صوتي واحد ينتهي بـ (ساكن قبله متحرك قصير CVC)، فنضاعف الساكن الأخير (n).',
    },
    {
      questionAr: 'ما هو الشكل الصحيح للفعل (lie) عند إضافة اللاحقة (-ing)؟',
      options: ['lieing', 'lying', 'liing', 'lyeing'],
      correctOption: 'lying',
      explanationAr: 'الأفعال المنتهية بـ ie نستبدل فيها الـ ie بحرف y ثم نضيف ing.',
    },
    {
      questionAr: 'أي من الأفعال التالية يُعد من "أفعال الحالة Stative" التي لا تقبل عادة اللاحقة (-ing)؟',
      options: ['eat', 'run', 'know', 'play'],
      correctOption: 'know',
      explanationAr: 'فعل know يعبر عن إدراك ذهني دائم وحالة، فلا يقبل صيغة الاستمرار بالمعنى الأصلي.',
    },
  ],

  present_perfect: [
    {
      questionAr: 'ما هو التصريف الثالث (V3) الصحيح للفعل غير المنتظم (see) بعد have / has؟',
      options: ['saw', 'seen', 'seed', 'sawing'],
      correctOption: 'seen',
      explanationAr: 'تصريف الفعل هو: see (V1) ➔ saw (V2) ➔ seen (V3).',
    },
    {
      questionAr: 'ما هو التصريف الثالث الصحيح للفعل المنتظم (study)؟',
      options: ['studyed', 'studied', 'studyd', 'studying'],
      correctOption: 'studied',
      explanationAr: 'فعل منتظم ينتهي بـ ساكن + y، فتحذف الـ y وتستبدل بـ ied.',
    },
    {
      questionAr: 'اختر الجملة التي تدل على أن الشخص "سافر إلى باريس وعاد منها بالفعل":',
      options: ['He has gone to Paris.', 'He has been to Paris.', 'He is going to Paris.', 'He had gone to Paris.'],
      correctOption: 'He has been to Paris.',
      explanationAr: 'has been تعني زار المكان وعاد منه، بينما has gone تعني ذهب ولم يعد بعد.',
    },
    {
      questionAr: 'ما هو التصريف الثالث الصحيح للفعل (write)؟',
      options: ['wrote', 'writed', 'written', 'writting'],
      correctOption: 'written',
      explanationAr: 'الفعل write هو فعل شاذ تصريفه الثالث written بمضاعفة حرف الـ t.',
    },
  ],

  present_perfect_continuous: [
    {
      questionAr: 'ما هي التركيبة الصحيحة للجملة مع الفاعل (She)؟',
      options: ['She have been waiting', 'She has been waiting', 'She has been wait', 'She is been waiting'],
      correctOption: 'She has been waiting',
      explanationAr: 'مع ضمائر المفرد (He / She / It) نستخدم has been متبوعة بـ V-ing.',
    },
    {
      questionAr: 'ما هو الهجاء الصحيح للفعل (live) مع (have been)؟',
      options: ['liveing', 'living', 'livving', 'lived'],
      correctOption: 'living',
      explanationAr: 'نحذف حرف e الصامت قبل إضافة اللاحقة ing.',
    },
    {
      questionAr: 'هل يصح القول: "I have been knowing him for 5 years"؟',
      options: ['نعم، جملة صحيحة تماماً', 'لا، لأن know فعل حالة ويجب استخدام المضارع التام البسيط (have known)'],
      correctOption: 'لا، لأن know فعل حالة ويجب استخدام المضارع التام البسيط (have known)',
      explanationAr: 'أفعال المعرفة والملكية لا تأخذ استمراراً فنقول I have known him.',
    },
    {
      questionAr: 'ما هي الكلمة التي لا يمكن حذفها من تركيبة المضارع التام المستمر؟',
      options: ['been', 'will', 'did', 'had'],
      correctOption: 'been',
      explanationAr: 'كلمة been هي الركن الأساسي الثابت الذي يربط التمام بالاستمرار.',
    },
  ],

  past_simple: [
    {
      questionAr: 'ما هو الماضي البسيط (V2) للفعل الشاذ (go) في الجملة المثبتة؟',
      options: ['goed', 'went', 'gone', 'going'],
      correctOption: 'went',
      explanationAr: 'الماضي البسيط من go هو went وهو فعل غير منتظم.',
    },
    {
      questionAr: 'في الجملة المنفية: "I didn\'t _____ him yesterday.", ما هو شكل الفعل (see)؟',
      options: ['saw', 'see', 'seen', 'seed'],
      correctOption: 'see',
      explanationAr: 'بمجرد دخول didn\'t يعود الفعل فوراً إلى المصدر المجرد see.',
    },
    {
      questionAr: 'ما هو الهجاء السليم للفعل (stop) في الماضي البسيط؟',
      options: ['stoped', 'stopped', 'stoppied', 'stopping'],
      correctOption: 'stopped',
      explanationAr: 'فعل CVC ذو مقطع واحد ➔ نضاعف الحرف الساكن p قبل إضافة ed.',
    },
    {
      questionAr: 'ما هو النطق الصوتي للـ ed في نهاية الفعل (watched)؟',
      options: ['صوت /t/', 'صوت /d/', 'صوت مقطع كامل /ɪd/'],
      correctOption: 'صوت /t/',
      explanationAr: 'بعد الأصوات الصامتة والصفيرية مثل ch و sh و p و k، تُنطق الـ ed كصوت /t/.',
    },
  ],

  past_continuous: [
    {
      questionAr: 'مع الضمير (They)، ما هو التركيب الصحيح في الماضي المستمر للفعل (play)؟',
      options: ['They was playing', 'They were playing', 'They were play', 'They are playing'],
      correctOption: 'They were playing',
      explanationAr: 'ضمائر الجمع تأخذ were متبوعة بـ V-ing.',
    },
    {
      questionAr: 'في الجملة: "While I was driving, I _____ a strange bird.", ما هو الفعل الأنسب؟',
      options: ['was seeing', 'saw', 'see', 'have seen'],
      correctOption: 'saw',
      explanationAr: 'الحدث القاطع اللحظي المفاجئ يأتي في الماضي البسيط (saw).',
    },
    {
      questionAr: 'ما هو الهجاء الصحيح للفعل (swim) في الماضي المستمر؟',
      options: ['was swiming', 'was swimming', 'was swimed', 'were swiming'],
      correctOption: 'was swimming',
      explanationAr: 'نضاعف الحرف m في swim لأنها CVC ذات مقطع واحد.',
    },
    {
      questionAr: 'ما هو نفي الجملة: "She was studying"؟',
      options: ['She wasn\'t study', 'She wasn\'t studying', 'She didn\'t studying', 'She weren\'t studying'],
      correctOption: 'She wasn\'t studying',
      explanationAr: 'في النفي نضيف not إلى was لتصبح wasn\'t مع بقاء الفعل بـ ing.',
    },
  ],

  past_perfect: [
    {
      questionAr: 'ما هو الفعل المساعد المستخدم دائماً في زمن الماضي التام مع كافة الضمائر؟',
      options: ['have', 'has', 'had', 'did'],
      correctOption: 'had',
      explanationAr: 'الفعل had هو الفعل المساعد الموحد لزمن الماضي التام مع كل الفاعلين.',
    },
    {
      questionAr: 'ما هو التصريف الصحيح للفعل (leave) في جملة الماضي التام؟',
      options: ['had leaved', 'had left', 'had leaving', 'had leave'],
      correctOption: 'had left',
      explanationAr: 'التصريف الثالث للفعل leave هو left.',
    },
    {
      questionAr: 'في جملة "When we arrived, the movie _____ already started.", ما هو الفراغ المناسب؟',
      options: ['has', 'was', 'had', 'did'],
      correctOption: 'had',
      explanationAr: 'الحدث الأسبق وقوعاً في الماضي يأخذ صيغة الماضي التام had + V3.',
    },
    {
      questionAr: 'هل يصح لغوياً تكرار "had had" مثل: "I had had lunch before he called"؟',
      options: ['نعم، صحيحة 100% (الأولى مساعدة والثانية تصريف ثالث)', 'لا، هذا خطأ نحوي مكرر'],
      correctOption: 'نعم، صحيحة 100% (الأولى مساعدة والثانية تصريف ثالث)',
      explanationAr: 'had الأولى فعل مساعد للماضي التام، و had الثانية هي الـ V3 لفعل يتناول/يملك.',
    },
  ],

  past_perfect_continuous: [
    {
      questionAr: 'ما هي تركيبة الفعل في زمن الماضي التام المستمر؟',
      options: ['had been + V-ing', 'have been + V-ing', 'had + V3', 'was been + V-ing'],
      correctOption: 'had been + V-ing',
      explanationAr: 'يتكون من had been متبوعة بالفعل بصيغة ing للدلالة على استمرار حدث قبل حدث ماض آخر.',
    },
    {
      questionAr: 'ما هو تصريف الفعل (drive) في الماضي التام المستمر؟',
      options: ['had been driving', 'had been driveing', 'had driving', 'had been drived'],
      correctOption: 'had been driving',
      explanationAr: 'تحذف الـ e الصامتة قبل إضافة الـ ing.',
    },
    {
      questionAr: 'لماذا نستخدم الماضي التام المستمر في: "He was tired because he had been running"؟',
      options: ['لتوضيح سبب التعب الماضي من خلال نشاط استمر لفترة', 'للتعبير عن المستقبل', 'للتعبير عن حقيقة علمية'],
      correctOption: 'لتوضيح سبب التعب الماضي من خلال نشاط استمر لفترة',
      explanationAr: 'الماضي التام المستمر يبرز المدة والمجهود المستمر الذي أدى لنتيجة في الماضي.',
    },
    {
      questionAr: 'ما هو اختصار "I had been waiting"؟',
      options: ["I'd been waiting", "I've been waiting", "I'm been waiting", "I'll been waiting"],
      correctOption: "I'd been waiting",
      explanationAr: "تختصر had مع الضمائر إلى 'd.",
    },
  ],

  future_simple: [
    {
      questionAr: 'ما هو شكل الفعل الذي يأتي بعد (will) دائماً؟',
      options: ['المصدر المجرد (Base Form) بدون أي إضافات', 'الفعل مضافاً له s', 'الفعل مضافاً له ing', 'التصريف الثاني للماضي'],
      correctOption: 'المصدر المجرد (Base Form) بدون أي إضافات',
      explanationAr: 'will فعل ناقص يتبعه دائماً المصدر المجرد الخالي من أي تصريف.',
    },
    {
      questionAr: 'ما هو نفي الفعل المساعد (will) الشائع في المحادثة والكتابة؟',
      options: ['willn\'t', 'won\'t', 'wont', 'will not'],
      correctOption: 'won\'t',
      explanationAr: 'تختصر will not إلى won\'t.',
    },
    {
      questionAr: 'أي من الجمل التالية تعبر عن "نية وخطة مسبقة مؤكدة"؟',
      options: ['I am going to buy a new car next week.', 'I will buy a car maybe.', 'I buy a car yesterday.'],
      correctOption: 'I am going to buy a new car next week.',
      explanationAr: 'صيغة be going to تدل على التخطيط والنية المسبقة.',
    },
    {
      questionAr: 'في الجملة: "He will _____ tomorrow.", ما هو الخيار الصحيح للفعل come؟',
      options: ['comes', 'come', 'coming', 'came'],
      correctOption: 'come',
      explanationAr: 'حتى مع ضمائر المفرد He و She، بعد will لا نضيف حرف s أبداً.',
    },
  ],

  future_continuous: [
    {
      questionAr: 'ما هي التركيبة الثابتة لزمن المستقبل المستمر؟',
      options: ['will be + V-ing', 'will + V-ing', 'will have + V-ing', 'is going to + V-ing'],
      correctOption: 'will be + V-ing',
      explanationAr: 'التركيبة تتطلب وجود كلمة be بين will وفعل الـ ing.',
    },
    {
      questionAr: 'هل يصح القول: "At 10 AM tomorrow, I will flying to Paris"؟',
      options: ['خطأ، يجب القول: I will be flying', 'صحيحة تماماً ولا تحتاج لكلمة be'],
      correctOption: 'خطأ، يجب القول: I will be flying',
      explanationAr: 'حذف be خطأ شائع؛ التركيبة الصحيحة هي will be + V-ing.',
    },
    {
      questionAr: 'ما هو الهجاء الصحيح للفعل (take) في المستقبل المستمر؟',
      options: ['will be takeing', 'will be taking', 'will be takking', 'will taking'],
      correctOption: 'will be taking',
      explanationAr: 'تحذف الـ e الصامتة قبل إضافة اللاحقة ing.',
    },
    {
      questionAr: 'متى نستخدم المستقبل المستمر في العادة؟',
      options: ['للتعبير عن حدث سيكون قيد الاستمرار في وقت محدد بالمستقبل', 'للأحداث التي انتهت في الماضي', 'للحقائق العلمية الثابتة'],
      correctOption: 'للتعبير عن حدث سيكون قيد الاستمرار في وقت محدد بالمستقبل',
      explanationAr: 'يركز على استمرار النشاط عند نقطة زمنية مستقبلية.',
    },
  ],

  future_perfect: [
    {
      questionAr: 'ما هي تركيبة الفعل في زمن المستقبل التام؟',
      options: ['will have + V3', 'will has + V3', 'will had + V3', 'will have been + V3'],
      correctOption: 'will have + V3',
      explanationAr: 'will have ثابتة دائماً متبوعة بالتصريف الثالث V3.',
    },
    {
      questionAr: 'مع الضمير (He)، هل يصح أن نقول "He will has finished"؟',
      options: ['لا، غير صحيح إطلاقاً؛ بعد will نستخدم have دائماً', 'نعم، لأن He تأخذ has'],
      correctOption: 'لا، غير صحيح إطلاقاً؛ بعد will نستخدم have دائماً',
      explanationAr: 'will تلزم ما بعدها بالمصدر المجرد وهو have، فلا تأتي has بعد will أبداً.',
    },
    {
      questionAr: 'ما هي الكلمة الدالة الأكثر شهرة مع المستقبل التام؟',
      options: ['By (بحلول)', 'Yesterday', 'Since', 'While'],
      correctOption: 'By (بحلول)',
      explanationAr: 'كلمة By متبوعة بنقطة زمنية مستقبلية (مثل By tomorrow أو By 2030) هي العلامة الأبرز.',
    },
    {
      questionAr: 'ما هو التصريف الثالث الصحيح للفعل (complete) في المستقبل التام؟',
      options: ['will have completed', 'will have complete', 'will completed', 'will having completed'],
      correctOption: 'will have completed',
      explanationAr: 'إضافة d فقط للفعل المنتهي بـ e بعد will have.',
    },
  ],

  future_perfect_continuous: [
    {
      questionAr: 'ما هي الأركان الأربعة التي يتكون منها زمن المستقبل التام المستمر؟',
      options: ['will + have + been + V-ing', 'will + be + V-ing', 'will + have + V3', 'have + been + V-ing'],
      correctOption: 'will + have + been + V-ing',
      explanationAr: 'هو أطول زمن في اللغة الإنجليزية ويتكون من أربعة أركان متتالية.',
    },
    {
      questionAr: 'ما هي وظيفة زمن المستقبل التام المستمر الأساسية؟',
      options: ['حساب المدة الزمنية التراكمية التي سيكون قد استغرقها الحدث بحلول وقت مستقبلي', 'الحديث عن عادة يومية بسيطة', 'وصف حدث ماض انتهى تماماً'],
      correctOption: 'حساب المدة الزمنية التراكمية التي سيكون قد استغرقها الحدث بحلول وقت مستقبلي',
      explanationAr: 'يستخدم لقياس المدة التراكمية لاستمرار الفعل حتى نقطة قادمة.',
    },
    {
      questionAr: 'ما هو تصريف الفعل (teach) في جملة: "By June, he _____ for 20 years"؟',
      options: ['will have been teaching', 'will be teaching', 'will have taught', 'is teaching'],
      correctOption: 'will have been teaching',
      explanationAr: 'وجود By مع مدة زمنية (for 20 years) يستدعي المستقبل التام المستمر.',
    },
    {
      questionAr: 'ما هو هجاء الفعل (live) في المستقبل التام المستمر؟',
      options: ['will have been living', 'will have been liveing', 'will have living', 'will has been living'],
      correctOption: 'will have been living',
      explanationAr: 'حذف e الصامتة قبل إضافة ing مع التركيبة الرباعية.',
    },
  ],
};

// Comprehensive Irregular Verb Dictionary for accurate tense conjugation
const COMMON_IRREGULARS: Record<string, { v2: string; v3: string; isStative?: boolean }> = {
  be: { v2: 'was / were', v3: 'been', isStative: true },
  have: { v2: 'had', v3: 'had', isStative: true },
  do: { v2: 'did', v3: 'done' },
  go: { v2: 'went', v3: 'gone / been' },
  see: { v2: 'saw', v3: 'seen', isStative: true },
  write: { v2: 'wrote', v3: 'written' },
  read: { v2: 'read', v3: 'read' },
  eat: { v2: 'ate', v3: 'eaten' },
  drink: { v2: 'drank', v3: 'drunk' },
  buy: { v2: 'bought', v3: 'bought' },
  come: { v2: 'came', v3: 'come' },
  take: { v2: 'took', v3: 'taken' },
  make: { v2: 'made', v3: 'made' },
  get: { v2: 'got', v3: 'got / gotten' },
  find: { v2: 'found', v3: 'found' },
  tell: { v2: 'told', v3: 'told' },
  say: { v2: 'said', v3: 'said' },
  give: { v2: 'gave', v3: 'given' },
  run: { v2: 'ran', v3: 'run' },
  sleep: { v2: 'slept', v3: 'slept' },
  think: { v2: 'thought', v3: 'thought', isStative: true },
  teach: { v2: 'taught', v3: 'taught' },
  leave: { v2: 'left', v3: 'left' },
  bring: { v2: 'brought', v3: 'brought' },
  cut: { v2: 'cut', v3: 'cut' },
  put: { v2: 'put', v3: 'put' },
  meet: { v2: 'met', v3: 'met' },
  pay: { v2: 'paid', v3: 'paid' },
  stand: { v2: 'stood', v3: 'stood' },
  win: { v2: 'won', v3: 'won' },
  know: { v2: 'knew', v3: 'known', isStative: true },
  speak: { v2: 'spoke', v3: 'spoken' },
  break: { v2: 'broke', v3: 'broken' },
  drive: { v2: 'drove', v3: 'driven' },
  sing: { v2: 'sang', v3: 'sung' },
  swim: { v2: 'swam', v3: 'swum' },
  fly: { v2: 'flew', v3: 'flown' },
  fall: { v2: 'fell', v3: 'fallen' },
  wear: { v2: 'wore', v3: 'worn' },
  catch: { v2: 'caught', v3: 'caught' },
  choose: { v2: 'chose', v3: 'chosen' },
  build: { v2: 'built', v3: 'built' },
  send: { v2: 'sent', v3: 'sent' },
  spend: { v2: 'spent', v3: 'spent' },
  understand: { v2: 'understood', v3: 'understood', isStative: true },
  like: { v2: 'liked', v3: 'liked', isStative: true },
  love: { v2: 'loved', v3: 'loved', isStative: true },
  need: { v2: 'needed', v3: 'needed', isStative: true },
  want: { v2: 'wanted', v3: 'wanted', isStative: true },
  belong: { v2: 'belonged', v3: 'belonged', isStative: true },
};

// CVC single-syllable doubling helper
function isCvcDoubling(word: string): boolean {
  if (word.length < 3) return false;
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const lastChar = word.charAt(word.length - 1);
  const secondLast = word.charAt(word.length - 2);
  const thirdLast = word.charAt(word.length - 3);

  // Exclude w, x, y (semi-vowels)
  if (['w', 'x', 'y'].includes(lastChar)) return false;

  const isLastConsonant = !vowels.includes(lastChar);
  const isSecondVowel = vowels.includes(secondLast);
  const isThirdConsonant = !vowels.includes(thirdLast);

  // Check short word or stress on last syllable
  return isLastConsonant && isSecondVowel && isThirdConsonant && word.length <= 5;
}

// Compute -ing form with precise English spelling rules
export function getIngForm(verb: string): { ingWord: string; ruleNoteAr: string; additionType: string } {
  const v = verb.toLowerCase().trim();
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  if (COMMON_IRREGULARS[v]?.isStative) {
    return {
      ingWord: v + 'ing',
      ruleNoteAr: `الفعل (${v}) هو فعل حالة وشعور (Stative Verb) لا يفضل استخدامه في صيغة المستمر في معناه الدائم.`,
      additionType: 'فعل حالة Stative',
    };
  }

  if (v.endsWith('ie')) {
    const stem = v.slice(0, -2);
    return {
      ingWord: stem + 'ying',
      ruleNoteAr: 'ينتهي بـ ie ➔ نستبدل ie بحرف y ثم نضيف ing (مثل: die ➔ dying, lie ➔ lying).',
      additionType: 'ie ➔ ying',
    };
  }

  if (v.endsWith('ee') || v.endsWith('ye') || v.endsWith('oe')) {
    return {
      ingWord: v + 'ing',
      ruleNoteAr: 'ينتهي بـ ee مزدوجة ➔ لا نحذف شيئاً بل نضيف ing مباشرة (مثل: see ➔ seeing, agree ➔ agreeing).',
      additionType: '+ ing مباشر',
    };
  }

  if (v.endsWith('e') && !v.endsWith('ee')) {
    const stem = v.slice(0, -1);
    return {
      ingWord: stem + 'ing',
      ruleNoteAr: 'ينتهي بـ e صامتة غير منطوقة ➔ نحذف حرف الـ e قبل إضافة اللاحقة ing.',
      additionType: '- e + ing',
    };
  }

  if (isCvcDoubling(v)) {
    const lastChar = v.charAt(v.length - 1);
    return {
      ingWord: v + lastChar + 'ing',
      ruleNoteAr: `مقطع صوتي واحد ينتهي بـ ساكن مسبوق بمتحرك منفرد (CVC) ➔ نضاعف الحرف الساكن الأخير (${lastChar}) قبل إضافة ing.`,
      additionType: 'مضاعفة CVC + ing',
    };
  }

  if (v.endsWith('y')) {
    return {
      ingWord: v + 'ing',
      ruleNoteAr: 'ينتهي بحرف y ➔ في صيغة ing لا نحذف الـ y أبداً سواء سبقه ساكن أو متحرك (مثل: playing, studying).',
      additionType: '+ ing (مع y)',
    };
  }

  return {
    ingWord: v + 'ing',
    ruleNoteAr: 'قاعدة قياسية عادية ➔ نضيف اللاحقة ing مباشرة لنهاية الفعل بدون أي تعديل إملائي.',
    additionType: '+ ing قياسي',
  };
}

// Compute Past / V2 form
export function getPastSimpleForm(verb: string): { pastWord: string; ruleNoteAr: string; additionType: string } {
  const v = verb.toLowerCase().trim();
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  if (COMMON_IRREGULARS[v]) {
    return {
      pastWord: COMMON_IRREGULARS[v].v2,
      ruleNoteAr: `فعل غير منتظم شاذ (Irregular) ➔ يتغير شكله في الماضي إلى (${COMMON_IRREGULARS[v].v2}) ويجب حفظه، ويعود لمصدره مع did/didn't.`,
      additionType: 'شاذ (Irregular V2)',
    };
  }

  if (v.endsWith('e')) {
    return {
      pastWord: v + 'd',
      ruleNoteAr: 'ينتهي الفعل بحرف e أصلية ➔ نكتفي بإضافة d فقط بنهايته.',
      additionType: '+ d فقط',
    };
  }

  if (v.endsWith('y')) {
    const prevChar = v.charAt(v.length - 2);
    if (vowels.includes(prevChar)) {
      return {
        pastWord: v + 'ed',
        ruleNoteAr: `يسبق الـ y حرف متحرك (${prevChar}) ➔ لا نحذف الـ y بل نضيف ed مباشرة (مثل: play ➔ played).`,
        additionType: '+ ed (مع متحرك)',
      };
    } else {
      return {
        pastWord: v.slice(0, -1) + 'ied',
        ruleNoteAr: `يسبق الـ y حرف ساكن (${prevChar}) ➔ نحذف حرف الـ y ونستبدله بـ ied (مثل: study ➔ studied).`,
        additionType: '+ ied',
      };
    }
  }

  if (isCvcDoubling(v)) {
    const lastChar = v.charAt(v.length - 1);
    return {
      pastWord: v + lastChar + 'ed',
      ruleNoteAr: `مقطع صوتي واحد ينتهي بـ ساكن قبله متحرك قصير (CVC) ➔ نضاعف الحرف الساكن (${lastChar}) قبل إضافة ed.`,
      additionType: 'مضاعفة CVC + ed',
    };
  }

  return {
    pastWord: v + 'ed',
    ruleNoteAr: 'قاعدة منتظمة قياسية ➔ نضيف ed مباشرة لنهاية الفعل.',
    additionType: '+ ed قياسي',
  };
}

// Compute V3 / Past Participle
export function getPastParticipleForm(verb: string): { v3Word: string; ruleNoteAr: string; additionType: string } {
  const v = verb.toLowerCase().trim();

  if (COMMON_IRREGULARS[v]) {
    return {
      v3Word: COMMON_IRREGULARS[v].v3,
      ruleNoteAr: `فعل غير منتظم (Irregular V3) ➔ تصريفه الثالث الخاص هو (${COMMON_IRREGULARS[v].v3}) بعد have / has / had.`,
      additionType: 'V3 شاذ',
    };
  }

  // Regular verbs have identical V2 and V3
  const v2 = getPastSimpleForm(v);
  return {
    v3Word: v2.pastWord,
    ruleNoteAr: `فعل منتظم ➔ يتطابق التصريف الثالث (V3) تماماً مع صيغة الماضي البسيط: (${v2.pastWord}).`,
    additionType: v2.additionType,
  };
}

// Compute Present Simple 3rd person singular (+s, +es, +ies)
export function getPresentSimpleForm(verb: string): { presWord: string; ruleNoteAr: string; additionType: string } {
  const v = verb.toLowerCase().trim();
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  if (v === 'have') {
    return {
      presWord: 'has',
      ruleNoteAr: 'فعل استثنائي شاذ يتغير كلياً إلى has مع ضمائر المفرد (He / She / It).',
      additionType: 'شاذ (has)',
    };
  }
  if (v === 'be') {
    return {
      presWord: 'is / are / am',
      ruleNoteAr: 'فعل الكينونة يتغير كلياً حسب الفاعل (He/She/It is, You/We/They are, I am).',
      additionType: 'شاذ (is/are/am)',
    };
  }
  if (v === 'do') {
    return {
      presWord: 'does',
      ruleNoteAr: 'ينتهي بحرف o ➔ نضيف es ليصبح does مع المفرد.',
      additionType: '+ es',
    };
  }
  if (v === 'go') {
    return {
      presWord: 'goes',
      ruleNoteAr: 'ينتهي بحرف o ➔ نضيف es ليصبح goes مع المفرد.',
      additionType: '+ es',
    };
  }

  if (v.endsWith('ch') || v.endsWith('sh') || v.endsWith('ss') || v.endsWith('x') || v.endsWith('z')) {
    return {
      presWord: v + 'es',
      ruleNoteAr: 'ينتهي بنهاية صفيرية (ch, sh, ss, x, z) ➔ نضيف es لمنع تصادم الأصوات الساكنة.',
      additionType: '+ es',
    };
  }

  if (v.endsWith('y')) {
    const prevChar = v.charAt(v.length - 2);
    if (vowels.includes(prevChar)) {
      return {
        presWord: v + 's',
        ruleNoteAr: `يسبق الـ y حرف علة متحرك (${prevChar}) ➔ لا نحذف الـ y بل نطبق قاعدة s العادية فقط!`,
        additionType: '+ s',
      };
    } else {
      return {
        presWord: v.slice(0, -1) + 'ies',
        ruleNoteAr: `يسبق الـ y حرف ساكن (${prevChar || 'consonant'}) ➔ نحذف حرف الـ y تماماً ونستبدله بـ ies.`,
        additionType: '+ ies',
      };
    }
  }

  return {
    presWord: v + 's',
    ruleNoteAr: 'قاعدة عادية قياسية ➔ نضيف s فقط لنهاية الفعل بدون أي تغيير إملائي.',
    additionType: '+ s',
  };
}

// Master Analysis Function for any verb and any tense
export function analyzeVerbForTense(
  verbInput: string,
  tenseId: string
): {
  base: string;
  conjugated: string;
  addition: string;
  rule: string;
} {
  const v = verbInput.trim().toLowerCase();
  if (!v) {
    return { base: '', conjugated: '', addition: '', rule: '' };
  }

  switch (tenseId) {
    case 'present_simple': {
      const p = getPresentSimpleForm(v);
      return {
        base: v,
        conjugated: p.presWord,
        addition: p.additionType,
        rule: p.ruleNoteAr,
      };
    }

    case 'present_continuous': {
      const ing = getIngForm(v);
      return {
        base: v,
        conjugated: ing.ingWord,
        addition: ing.additionType,
        rule: `صيغة الفعل مع (-ing): ${ing.ruleNoteAr}`,
      };
    }

    case 'present_perfect': {
      const v3 = getPastParticipleForm(v);
      return {
        base: v,
        conjugated: v3.v3Word,
        addition: v3.additionType,
        rule: `التصريف الثالث للفعل الأساسي (V3): ${v3.v3Word}. ${v3.ruleNoteAr}`,
      };
    }

    case 'present_perfect_continuous': {
      const ing = getIngForm(v);
      return {
        base: v,
        conjugated: ing.ingWord,
        addition: ing.additionType,
        rule: `صيغة الفعل الأساسي مع (-ing): ${ing.ingWord}. ${ing.ruleNoteAr}`,
      };
    }

    case 'past_simple': {
      const past = getPastSimpleForm(v);
      return {
        base: v,
        conjugated: past.pastWord,
        addition: past.additionType,
        rule: `الماضي البسيط: ${past.ruleNoteAr} (تذكر: يعود لمصدره المجرد ${v} مع did أو didn't).`,
      };
    }

    case 'past_continuous': {
      const ing = getIngForm(v);
      return {
        base: v,
        conjugated: ing.ingWord,
        addition: ing.additionType,
        rule: `صيغة الفعل الأساسي مع (-ing): ${ing.ingWord}. ${ing.ruleNoteAr}`,
      };
    }

    case 'past_perfect': {
      const v3 = getPastParticipleForm(v);
      return {
        base: v,
        conjugated: v3.v3Word,
        addition: v3.additionType,
        rule: `التصريف الثالث للفعل الأساسي (V3): ${v3.v3Word}. ${v3.ruleNoteAr}`,
      };
    }

    case 'past_perfect_continuous': {
      const ing = getIngForm(v);
      return {
        base: v,
        conjugated: ing.ingWord,
        addition: ing.additionType,
        rule: `صيغة الفعل الأساسي مع (-ing): ${ing.ingWord}. ${ing.ruleNoteAr}`,
      };
    }

    case 'future_simple': {
      return {
        base: v,
        conjugated: v,
        addition: 'المصدر المجرد (Base Form)',
        rule: `المستقبل البسيط: بعد will أو be going to يبقى الفعل في المصدر المجرد (${v}) تماماً بدون أي إضافات أو تصريف!`,
      };
    }

    case 'future_continuous': {
      const ing = getIngForm(v);
      return {
        base: v,
        conjugated: ing.ingWord,
        addition: ing.additionType,
        rule: `صيغة الفعل الأساسي مع (-ing): ${ing.ingWord}. ${ing.ruleNoteAr}`,
      };
    }

    case 'future_perfect': {
      const v3 = getPastParticipleForm(v);
      return {
        base: v,
        conjugated: v3.v3Word,
        addition: v3.additionType,
        rule: `التصريف الثالث للفعل الأساسي (V3): ${v3.v3Word}. ${v3.ruleNoteAr}`,
      };
    }

    case 'future_perfect_continuous': {
      const ing = getIngForm(v);
      return {
        base: v,
        conjugated: ing.ingWord,
        addition: ing.additionType,
        rule: `صيغة الفعل الأساسي مع (-ing): ${ing.ingWord}. ${ing.ruleNoteAr}`,
      };
    }

    default: {
      const p = getPresentSimpleForm(v);
      return {
        base: v,
        conjugated: p.presWord,
        addition: p.additionType,
        rule: p.ruleNoteAr,
      };
    }
  }
}
