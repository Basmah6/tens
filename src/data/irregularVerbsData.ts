export type IrregularPattern = 'all_different' | 'v2_equals_v3' | 'v1_equals_v3' | 'no_change';

export interface IrregularVerbItem {
  id: string;
  base: string;           // V1 (المصدر)
  past: string;           // V2 (الماضي البسيط)
  pastParticiple: string; // V3 (التصريف الثالث)
  meaningAr: string;      // المعنى بالعربية
  pattern: IrregularPattern;
  patternAr: string;
  example: string;
  exampleAr: string;
  isCommon: boolean;
  notesAr?: string;
}

export const IRREGULAR_VERBS_DATA: IrregularVerbItem[] = [
  // ==========================================
  // المجموعة 1: أفعال لا تتغير إطلاقاً (V1 = V2 = V3)
  // ==========================================
  {
    id: 'irr_cost',
    base: 'cost',
    past: 'cost',
    pastParticiple: 'cost',
    meaningAr: 'يكلّف (سعراً)',
    pattern: 'no_change',
    patternAr: 'شكل واحد لا يتغير (V1 = V2 = V3)',
    example: 'This ticket cost 50 dollars yesterday.',
    exampleAr: 'كلفت هذه التذكرة 50 دولاراً بالأمس.',
    isCommon: true
  },
  {
    id: 'irr_cut',
    base: 'cut',
    past: 'cut',
    pastParticiple: 'cut',
    meaningAr: 'يقطع / يقص',
    pattern: 'no_change',
    patternAr: 'شكل واحد لا يتغير (V1 = V2 = V3)',
    example: 'He has cut the paper into two pieces.',
    exampleAr: 'لقد قص الورقة إلى قطعتين.',
    isCommon: true
  },
  {
    id: 'irr_hit',
    base: 'hit',
    past: 'hit',
    pastParticiple: 'hit',
    meaningAr: 'يضرب / يصطدم',
    pattern: 'no_change',
    patternAr: 'شكل واحد لا يتغير (V1 = V2 = V3)',
    example: 'The car hit the wall last night.',
    exampleAr: 'اصطدمت السيارة بالجدار الليلة الماضية.',
    isCommon: true
  },
  {
    id: 'irr_hurt',
    base: 'hurt',
    past: 'hurt',
    pastParticiple: 'hurt',
    meaningAr: 'يؤلم / يؤذي',
    pattern: 'no_change',
    patternAr: 'شكل واحد لا يتغير (V1 = V2 = V3)',
    example: 'My leg hurt after the long run.',
    exampleAr: 'آلمتني ساقي بعد الجري الطويل.',
    isCommon: true
  },
  {
    id: 'irr_let',
    base: 'let',
    past: 'let',
    pastParticiple: 'let',
    meaningAr: 'يسمح / يدع',
    pattern: 'no_change',
    patternAr: 'شكل واحد لا يتغير (V1 = V2 = V3)',
    example: 'She let them enter the room.',
    exampleAr: 'سمحت لهم بالدخول إلى الغرفة.',
    isCommon: true
  },
  {
    id: 'irr_put',
    base: 'put',
    past: 'put',
    pastParticiple: 'put',
    meaningAr: 'يضع',
    pattern: 'no_change',
    patternAr: 'شكل واحد لا يتغير (V1 = V2 = V3)',
    example: 'I have put the keys on the desk.',
    exampleAr: 'لقد وضعت المفاتيح على المكتب.',
    isCommon: true
  },
  {
    id: 'irr_quit',
    base: 'quit',
    past: 'quit',
    pastParticiple: 'quit',
    meaningAr: 'يستقيل / يترك',
    pattern: 'no_change',
    patternAr: 'شكل واحد لا يتغير (V1 = V2 = V3)',
    example: 'He quit smoking two years ago.',
    exampleAr: 'أقلع عن التدخين منذ سنتين.',
    isCommon: true
  },
  {
    id: 'irr_read',
    base: 'read',
    past: 'read',
    pastParticiple: 'read',
    meaningAr: 'يقرأ',
    pattern: 'no_change',
    patternAr: 'يكتب بنفس الحروف لكن يُنطق كـ (red) في V2 و V3',
    example: 'I have read this book three times.',
    exampleAr: 'لقد قرأت هذا الكتاب ثلاث مرات.',
    isCommon: true,
    notesAr: 'انتبه: يُكتب read في الحالات الثلاث، لكنه في الماضي والتصريف الثالث يُنطق صوتياً مثل كلمة red.'
  },
  {
    id: 'irr_set',
    base: 'set',
    past: 'set',
    pastParticiple: 'set',
    meaningAr: 'يضبط / يحدد',
    pattern: 'no_change',
    patternAr: 'شكل واحد لا يتغير (V1 = V2 = V3)',
    example: 'She set the alarm for 6 AM.',
    exampleAr: 'ضبطت المنبه على الساعة السادسة صباحاً.',
    isCommon: true
  },
  {
    id: 'irr_shut',
    base: 'shut',
    past: 'shut',
    pastParticiple: 'shut',
    meaningAr: 'يغلق بإحكام',
    pattern: 'no_change',
    patternAr: 'شكل واحد لا يتغير (V1 = V2 = V3)',
    example: 'They shut all the windows.',
    exampleAr: 'أغلقوا جميع النوافذ.',
    isCommon: true
  },
  {
    id: 'irr_spread',
    base: 'spread',
    past: 'spread',
    pastParticiple: 'spread',
    meaningAr: 'ينشر / ينتشر',
    pattern: 'no_change',
    patternAr: 'شكل واحد لا يتغير (V1 = V2 = V3)',
    example: 'The news spread rapidly across the city.',
    exampleAr: 'انتشرت الأخبار بسرعة في أنحاء المدينة.',
    isCommon: false
  },
  {
    id: 'irr_upset',
    base: 'upset',
    past: 'upset',
    pastParticiple: 'upset',
    meaningAr: 'يزعج / يضايق',
    pattern: 'no_change',
    patternAr: 'شكل واحد لا يتغير (V1 = V2 = V3)',
    example: 'The delay upset our plans.',
    exampleAr: 'أفسد التأخير خططنا.',
    isCommon: false
  },

  // ==========================================
  // المجموعة 2: أفعال يتطابق فيها V2 مع V3 (V2 = V3)
  // ==========================================
  {
    id: 'irr_bring',
    base: 'bring',
    past: 'brought',
    pastParticiple: 'brought',
    meaningAr: 'يحضر / يجلب',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'She brought a delicious cake yesterday.',
    exampleAr: 'أحضرت كعكة لذيذة بالأمس.',
    isCommon: true
  },
  {
    id: 'irr_build',
    base: 'build',
    past: 'built',
    pastParticiple: 'built',
    meaningAr: 'يبني / يشيّد',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'They built a modern bridge last year.',
    exampleAr: 'بنوا جسراً حديثاً العام الماضي.',
    isCommon: true
  },
  {
    id: 'irr_burn',
    base: 'burn',
    past: 'burnt',
    pastParticiple: 'burnt',
    meaningAr: 'يحرق',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'The fire burnt the dry wood quickly.',
    exampleAr: 'أحرقت النار الحطب الجاف بسرعة.',
    isCommon: false,
    notesAr: 'يمكن استخدام burned أيضاً بالإنجليزية الأمريكية.'
  },
  {
    id: 'irr_buy',
    base: 'buy',
    past: 'bought',
    pastParticiple: 'bought',
    meaningAr: 'يشتري',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'He has bought a new laptop.',
    exampleAr: 'لقد اشترى حاسوباً محمولاً جديداً.',
    isCommon: true
  },
  {
    id: 'irr_catch',
    base: 'catch',
    past: 'caught',
    pastParticiple: 'caught',
    meaningAr: 'يمسك / يلحق بـ',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'We caught the early train.',
    exampleAr: 'لحقنا بالقطار الباكر.',
    isCommon: true
  },
  {
    id: 'irr_deal',
    base: 'deal',
    past: 'dealt',
    pastParticiple: 'dealt',
    meaningAr: 'يتعامل مع',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'She dealt with the issue professionally.',
    exampleAr: 'تعاملت مع المشكلة باحترافية.',
    isCommon: false
  },
  {
    id: 'irr_dig',
    base: 'dig',
    past: 'dug',
    pastParticiple: 'dug',
    meaningAr: 'يحفر',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'They dug a deep hole in the garden.',
    exampleAr: 'حفروا حفرة عميقة في الحديقة.',
    isCommon: false
  },
  {
    id: 'irr_feel',
    base: 'feel',
    past: 'felt',
    pastParticiple: 'felt',
    meaningAr: 'يشعر / يحس',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'I felt much better after resting.',
    exampleAr: 'شعرت بتحسن كبير بعد أن ارتحت.',
    isCommon: true
  },
  {
    id: 'irr_fight',
    base: 'fight',
    past: 'fought',
    pastParticiple: 'fought',
    meaningAr: 'يقاتل / يحارب',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'They fought bravely for their rights.',
    exampleAr: 'قاتلوا بشجاعة من أجل حقوقهم.',
    isCommon: true
  },
  {
    id: 'irr_find',
    base: 'find',
    past: 'found',
    pastParticiple: 'found',
    meaningAr: 'يجد / يعثر على',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'He found his lost wallet under the bed.',
    exampleAr: 'وجد محفظته المفقودة تحت السرير.',
    isCommon: true
  },
  {
    id: 'irr_get',
    base: 'get',
    past: 'got',
    pastParticiple: 'got',
    meaningAr: 'يحصل على / يصل',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3 / gotten في US)',
    example: 'I have got the promotion finally.',
    exampleAr: 'حصلت على الترقية أخيراً.',
    isCommon: true
  },
  {
    id: 'irr_have',
    base: 'have',
    past: 'had',
    pastParticiple: 'had',
    meaningAr: 'يملك / يتناول',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'We had dinner together at 8 PM.',
    exampleAr: 'تناولنا العشاء معاً في الثامنة مساءً.',
    isCommon: true
  },
  {
    id: 'irr_hear',
    base: 'hear',
    past: 'heard',
    pastParticiple: 'heard',
    meaningAr: 'يسمع',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'Have you heard the good news?',
    exampleAr: 'هل سمعت الأخبار السارة؟',
    isCommon: true
  },
  {
    id: 'irr_hold',
    base: 'hold',
    past: 'held',
    pastParticiple: 'held',
    meaningAr: 'يمسك / يعقد (اجتماعاً)',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'They held an important meeting yesterday.',
    exampleAr: 'عقدوا اجتماعاً هاماً بالأمس.',
    isCommon: true
  },
  {
    id: 'irr_keep',
    base: 'keep',
    past: 'kept',
    pastParticiple: 'kept',
    meaningAr: 'يحافظ على / يحتفظ بـ',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'He kept his promise.',
    exampleAr: 'حافظ على وعده.',
    isCommon: true
  },
  {
    id: 'irr_lead',
    base: 'lead',
    past: 'led',
    pastParticiple: 'led',
    meaningAr: 'يقود / يوجه',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'The captain led the team to victory.',
    exampleAr: 'قاد القائد الفريق نحو الفوز.',
    isCommon: true
  },
  {
    id: 'irr_learn',
    base: 'learn',
    past: 'learnt',
    pastParticiple: 'learnt',
    meaningAr: 'يتعلم',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3 / learned)',
    example: 'I have learnt English tenses easily.',
    exampleAr: 'لقد تعلمت أزمنة الإنجليزية بسهولة.',
    isCommon: true
  },
  {
    id: 'irr_leave',
    base: 'leave',
    past: 'left',
    pastParticiple: 'left',
    meaningAr: 'يغادر / يترك',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'The train had left before we reached the station.',
    exampleAr: 'كان القطار قد غادر قبل أن نصل للمحطة.',
    isCommon: true
  },
  {
    id: 'irr_lend',
    base: 'lend',
    past: 'lent',
    pastParticiple: 'lent',
    meaningAr: 'يقرض / يعير',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'She lent me her camera for the trip.',
    exampleAr: 'أعارتني كاميرتها للرحلة.',
    isCommon: true
  },
  {
    id: 'irr_light',
    base: 'light',
    past: 'lit',
    pastParticiple: 'lit',
    meaningAr: 'يشعل / يضيء',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'They lit candles when the power went out.',
    exampleAr: 'أشعلوا الشموع عند انقطاع الكهرباء.',
    isCommon: false
  },
  {
    id: 'irr_lose',
    base: 'lose',
    past: 'lost',
    pastParticiple: 'lost',
    meaningAr: 'يفقد / يخسر',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'He lost his passport at the airport.',
    exampleAr: 'فقد جواز سفره في المطار.',
    isCommon: true
  },
  {
    id: 'irr_make',
    base: 'make',
    past: 'made',
    pastParticiple: 'made',
    meaningAr: 'يصنع / يجعل',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'She made a fresh cup of coffee.',
    exampleAr: 'صنعت كوباً طازجاً من القهوة.',
    isCommon: true
  },
  {
    id: 'irr_mean',
    base: 'mean',
    past: 'meant',
    pastParticiple: 'meant',
    meaningAr: 'يعني / يقصد',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'I knew what she meant.',
    exampleAr: 'عرفت ما كانت تقصده.',
    isCommon: true
  },
  {
    id: 'irr_meet',
    base: 'meet',
    past: 'met',
    pastParticiple: 'met',
    meaningAr: 'يقابل / يلتقي',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'We met our manager this morning.',
    exampleAr: 'التقينا بمديرنا هذا الصباح.',
    isCommon: true
  },
  {
    id: 'irr_pay',
    base: 'pay',
    past: 'paid',
    pastParticiple: 'paid',
    meaningAr: 'يدفع (مالاً)',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'He paid the bill with his credit card.',
    exampleAr: 'دفع الفاتورة ببطاقته الائتمانية.',
    isCommon: true
  },
  {
    id: 'irr_say',
    base: 'say',
    past: 'said',
    pastParticiple: 'said',
    meaningAr: 'يقول',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'She said she would call me back.',
    exampleAr: 'قالت إنها ستعاود الاتصال بي.',
    isCommon: true
  },
  {
    id: 'irr_sell',
    base: 'sell',
    past: 'sold',
    pastParticiple: 'sold',
    meaningAr: 'يبيع',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'They sold their old house last month.',
    exampleAr: 'باعوا منزلهم القديم الشهر الماضي.',
    isCommon: true
  },
  {
    id: 'irr_send',
    base: 'send',
    past: 'sent',
    pastParticiple: 'sent',
    meaningAr: 'يرسل',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'I have sent the official email.',
    exampleAr: 'لقد أرسلت البريد الإلكتروني الرسمي.',
    isCommon: true
  },
  {
    id: 'irr_shoot',
    base: 'shoot',
    past: 'shot',
    pastParticiple: 'shot',
    meaningAr: 'يطلق النار / يسدد',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'The player shot the ball straight into the goal.',
    exampleAr: 'سدد اللاعب الكرة مباشرة في المرمى.',
    isCommon: false
  },
  {
    id: 'irr_sit',
    base: 'sit',
    past: 'sat',
    pastParticiple: 'sat',
    meaningAr: 'يجلس',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'We sat in the front row.',
    exampleAr: 'جلسنا في الصف الأمامي.',
    isCommon: true
  },
  {
    id: 'irr_sleep',
    base: 'sleep',
    past: 'slept',
    pastParticiple: 'slept',
    meaningAr: 'ينام',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'The baby slept for eight hours.',
    exampleAr: 'نام الرضيع لمدة ثماني ساعات.',
    isCommon: true
  },
  {
    id: 'irr_spend',
    base: 'spend',
    past: 'spent',
    pastParticiple: 'spent',
    meaningAr: 'ينفق (مالاً) / يقضي (وقتاً)',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'They spent their holiday in London.',
    exampleAr: 'أمضوا إجازتهم في لندن.',
    isCommon: true
  },
  {
    id: 'irr_stand',
    base: 'stand',
    past: 'stood',
    pastParticiple: 'stood',
    meaningAr: 'يقف',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'Everyone stood up when the teacher entered.',
    exampleAr: 'وقف الجميع عندما دخل المعلم.',
    isCommon: true
  },
  {
    id: 'irr_teach',
    base: 'teach',
    past: 'taught',
    pastParticiple: 'taught',
    meaningAr: 'يعلّم / يدرّس',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'Mr. David taught mathematics for 20 years.',
    exampleAr: 'درّس السيد ديفيد الرياضيات لمدة عشرين عاماً.',
    isCommon: true
  },
  {
    id: 'irr_tell',
    base: 'tell',
    past: 'told',
    pastParticiple: 'told',
    meaningAr: 'يخبر / يحكي',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'He told me an interesting story.',
    exampleAr: 'أخبرني بقصة مثيرة للاهتمام.',
    isCommon: true
  },
  {
    id: 'irr_think',
    base: 'think',
    past: 'thought',
    pastParticiple: 'thought',
    meaningAr: 'يفكر / يعتقد',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'I thought about the problem carefully.',
    exampleAr: 'فكرت في المشكلة بعناية.',
    isCommon: true
  },
  {
    id: 'irr_understand',
    base: 'understand',
    past: 'understood',
    pastParticiple: 'understood',
    meaningAr: 'يفهم',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'She understood the grammar explanation immediately.',
    exampleAr: 'فهمت شرح القواعد على الفور.',
    isCommon: true
  },
  {
    id: 'irr_win',
    base: 'win',
    past: 'won',
    pastParticiple: 'won',
    meaningAr: 'يفوز / يكسب',
    pattern: 'v2_equals_v3',
    patternAr: 'التصريف الثاني والثالث متطابقان (V2 = V3)',
    example: 'Our team won the championship.',
    exampleAr: 'فاز فريقنا بالبطولة.',
    isCommon: true
  },

  // ==========================================
  // المجموعة 3: أفعال يتطابق فيها المصدر مع التصريف الثالث (V1 = V3)
  // ==========================================
  {
    id: 'irr_become',
    base: 'become',
    past: 'became',
    pastParticiple: 'become',
    meaningAr: 'يصبح',
    pattern: 'v1_equals_v3',
    patternAr: 'المصدر والتصريف الثالث متطابقان (V1 = V3)',
    example: 'He has become a successful engineer.',
    exampleAr: 'لقد أصبح مهندساً ناجحاً.',
    isCommon: true
  },
  {
    id: 'irr_come',
    base: 'come',
    past: 'came',
    pastParticiple: 'come',
    meaningAr: 'يأتي',
    pattern: 'v1_equals_v3',
    patternAr: 'المصدر والتصريف الثالث متطابقان (V1 = V3)',
    example: 'My friends came to my party yesterday.',
    exampleAr: 'جاء أصدقائي إلى حفلتي بالأمس.',
    isCommon: true
  },
  {
    id: 'irr_run',
    base: 'run',
    past: 'ran',
    pastParticiple: 'run',
    meaningAr: 'يركض / يجري',
    pattern: 'v1_equals_v3',
    patternAr: 'المصدر والتصريف الثالث متطابقان (V1 = V3)',
    example: 'He ran five kilometers this morning.',
    exampleAr: 'ركض خمسة كيلومترات هذا الصباح.',
    isCommon: true
  },

  // ==========================================
  // المجموعة 4: أفعال تختلف تماماً في التصاريف الثلاثة (V1 ≠ V2 ≠ V3)
  // ==========================================
  {
    id: 'irr_be',
    base: 'be',
    past: 'was / were',
    pastParticiple: 'been',
    meaningAr: 'يكون (فعل الكينونة)',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'She has been to Japan twice.',
    exampleAr: 'لقد كانت (زارت) اليابان مرتين.',
    isCommon: true,
    notesAr: 'V2 هو was مع المفرد (I, He, She, It) و were مع الجمع و You.'
  },
  {
    id: 'irr_begin',
    base: 'begin',
    past: 'began',
    pastParticiple: 'begun',
    meaningAr: 'يبدأ',
    pattern: 'all_different',
    patternAr: 'نمط الحروف الصوتية (i ➔ a ➔ u)',
    example: 'The exam began at 9 AM.',
    exampleAr: 'بدأ الاختبار في تمام التاسعة صباحاً.',
    isCommon: true
  },
  {
    id: 'irr_bite',
    base: 'bite',
    past: 'bit',
    pastParticiple: 'bitten',
    meaningAr: 'يعض',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'The dog bit the stranger.',
    exampleAr: 'عض الكلب الغريب.',
    isCommon: false
  },
  {
    id: 'irr_blow',
    base: 'blow',
    past: 'blew',
    pastParticiple: 'blown',
    meaningAr: 'يهب / يعصف',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'A strong wind blew all night.',
    exampleAr: 'هبت رياح قوية طوال الليل.',
    isCommon: false
  },
  {
    id: 'irr_break',
    base: 'break',
    past: 'broke',
    pastParticiple: 'broken',
    meaningAr: 'يكسر',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'Who broke the window?',
    exampleAr: 'من كسر النافذة؟',
    isCommon: true
  },
  {
    id: 'irr_choose',
    base: 'choose',
    past: 'chose',
    pastParticiple: 'chosen',
    meaningAr: 'يختار',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'They have chosen the best candidate.',
    exampleAr: 'لقد اختاروا المرشح الأفضل.',
    isCommon: true
  },
  {
    id: 'irr_do',
    base: 'do',
    past: 'did',
    pastParticiple: 'done',
    meaningAr: 'يفعل / يقوم بـ',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'I did my homework before going out.',
    exampleAr: 'أنجزت واجبي قبل الخروج.',
    isCommon: true
  },
  {
    id: 'irr_draw',
    base: 'draw',
    past: 'drew',
    pastParticiple: 'drawn',
    meaningAr: 'يرسم',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'She drew a lovely picture of the sea.',
    exampleAr: 'رسمت لوحة جميلة للبحر.',
    isCommon: true
  },
  {
    id: 'irr_drink',
    base: 'drink',
    past: 'drank',
    pastParticiple: 'drunk',
    meaningAr: 'يشرب',
    pattern: 'all_different',
    patternAr: 'نمط الحروف الصوتية (i ➔ a ➔ u)',
    example: 'He drank two cups of tea.',
    exampleAr: 'شرب كوبين من الشاي.',
    isCommon: true
  },
  {
    id: 'irr_drive',
    base: 'drive',
    past: 'drove',
    pastParticiple: 'driven',
    meaningAr: 'يقود (سيارة)',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'She drove safely through the storm.',
    exampleAr: 'قادت بأمان وسط العاصفة.',
    isCommon: true
  },
  {
    id: 'irr_eat',
    base: 'eat',
    past: 'ate',
    pastParticiple: 'eaten',
    meaningAr: 'يأكل',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'Have you eaten your breakfast yet?',
    exampleAr: 'هل تناولت إفطارك بعد؟',
    isCommon: true
  },
  {
    id: 'irr_fall',
    base: 'fall',
    past: 'fell',
    pastParticiple: 'fallen',
    meaningAr: 'يسقط / يقع',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'Leaves fell from the trees in autumn.',
    exampleAr: 'تساقطت أوراق الشجر في الخريف.',
    isCommon: true
  },
  {
    id: 'irr_fly',
    base: 'fly',
    past: 'flew',
    pastParticiple: 'flown',
    meaningAr: 'يطير / يسافر جواً',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'The birds flew south for winter.',
    exampleAr: 'طارت الطيور جنوباً في الشتاء.',
    isCommon: true
  },
  {
    id: 'irr_forget',
    base: 'forget',
    past: 'forgot',
    pastParticiple: 'forgotten',
    meaningAr: 'ينسى',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'I forgot to lock the front door.',
    exampleAr: 'نسيت أن أقفل الباب الأمامي.',
    isCommon: true
  },
  {
    id: 'irr_forgive',
    base: 'forgive',
    past: 'forgave',
    pastParticiple: 'forgiven',
    meaningAr: 'يسامح / يغفر',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'She forgave his honest mistake.',
    exampleAr: 'سامحته على خطئه غير المقصود.',
    isCommon: false
  },
  {
    id: 'irr_freeze',
    base: 'freeze',
    past: 'froze',
    pastParticiple: 'frozen',
    meaningAr: 'يتجمد',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'The lake froze during the winter night.',
    exampleAr: 'تجمدت البحيرة خلال ليلة الشتاء.',
    isCommon: false
  },
  {
    id: 'irr_give',
    base: 'give',
    past: 'gave',
    pastParticiple: 'given',
    meaningAr: 'يعطي / يمنح',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'He gave me great advice.',
    exampleAr: 'أعطاني نصيحة رائعة.',
    isCommon: true
  },
  {
    id: 'irr_go',
    base: 'go',
    past: 'went',
    pastParticiple: 'gone / been',
    meaningAr: 'يذهب',
    pattern: 'all_different',
    patternAr: 'شاذ كلياً (go ➔ went ➔ gone)',
    example: 'She has gone to Paris (she is still there).',
    exampleAr: 'لقد ذهبت إلى باريس (وهي لا تزال هناك).',
    isCommon: true,
    notesAr: 'في المضارع التام: gone تعني ذهب ولم يعد بعد، بينما been تعني ذهب وعاد.'
  },
  {
    id: 'irr_grow',
    base: 'grow',
    past: 'grew',
    pastParticiple: 'grown',
    meaningAr: 'ينمو / يزرع',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'The children have grown so tall.',
    exampleAr: 'لقد كبر الأطفال وأصبحوا طوال القامة.',
    isCommon: true
  },
  {
    id: 'irr_hide',
    base: 'hide',
    past: 'hid',
    pastParticiple: 'hidden',
    meaningAr: 'يختبئ / يخبئ',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'He hid the gift in the closet.',
    exampleAr: 'خبأ الهدية في الخزانة.',
    isCommon: true
  },
  {
    id: 'irr_know',
    base: 'know',
    past: 'knew',
    pastParticiple: 'known',
    meaningAr: 'يعرف / يعلم',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'I have known him for ten years.',
    exampleAr: 'أعرفه منذ عشر سنوات.',
    isCommon: true
  },
  {
    id: 'irr_ride',
    base: 'ride',
    past: 'rode',
    pastParticiple: 'ridden',
    meaningAr: 'يركب (دراجة أو حصاناً)',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'He rode his bicycle to school.',
    exampleAr: 'ركب دراجته إلى المدرسة.',
    isCommon: true
  },
  {
    id: 'irr_ring',
    base: 'ring',
    past: 'rang',
    pastParticiple: 'rung',
    meaningAr: 'يرن / يدق',
    pattern: 'all_different',
    patternAr: 'نمط الحروف الصوتية (i ➔ a ➔ u)',
    example: 'The phone rang three times.',
    exampleAr: 'رن الهاتف ثلاث مرات.',
    isCommon: true
  },
  {
    id: 'irr_rise',
    base: 'rise',
    past: 'rose',
    pastParticiple: 'risen',
    meaningAr: 'يرتفع / تشرق (الشمس)',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'The sun rose at 6 AM.',
    exampleAr: 'أشرقت الشمس في السادسة صباحاً.',
    isCommon: true
  },
  {
    id: 'irr_see',
    base: 'see',
    past: 'saw',
    pastParticiple: 'seen',
    meaningAr: 'يرى / يشاهد',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'I saw an exciting match yesterday.',
    exampleAr: 'شاهدت مباراة حماسية بالأمس.',
    isCommon: true
  },
  {
    id: 'irr_shake',
    base: 'shake',
    past: 'shook',
    pastParticiple: 'shaken',
    meaningAr: 'يهز / يصافح',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'They shook hands warmly.',
    exampleAr: 'تصافحا بحرارة.',
    isCommon: false
  },
  {
    id: 'irr_show',
    base: 'show',
    past: 'showed',
    pastParticiple: 'shown',
    meaningAr: 'يُظهر / يعرض',
    pattern: 'all_different',
    patternAr: 'V2 منتظم (+ed) بينما V3 ينتهي بـ -n (shown)',
    example: 'He has shown great progress.',
    exampleAr: 'لقد أظهر تقدماً كبيراً.',
    isCommon: true
  },
  {
    id: 'irr_sing',
    base: 'sing',
    past: 'sang',
    pastParticiple: 'sung',
    meaningAr: 'يغني',
    pattern: 'all_different',
    patternAr: 'نمط الحروف الصوتية (i ➔ a ➔ u)',
    example: 'She sang a traditional song.',
    exampleAr: 'غنت أغنية تراثية.',
    isCommon: true
  },
  {
    id: 'irr_sink',
    base: 'sink',
    past: 'sank',
    pastParticiple: 'sunk',
    meaningAr: 'يغرق (للجماد والسفن)',
    pattern: 'all_different',
    patternAr: 'نمط الحروف الصوتية (i ➔ a ➔ u)',
    example: 'The ship sank into the ocean.',
    exampleAr: 'غرقت السفينة في المحيط.',
    isCommon: false
  },
  {
    id: 'irr_speak',
    base: 'speak',
    past: 'spoke',
    pastParticiple: 'spoken',
    meaningAr: 'يتحدث / يتكلم',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'Have you spoken to the professor?',
    exampleAr: 'هل تحدثت إلى الأستاذ الجامعي؟',
    isCommon: true
  },
  {
    id: 'irr_steal',
    base: 'steal',
    past: 'stole',
    pastParticiple: 'stolen',
    meaningAr: 'يسرق',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'Someone stole his bicycle.',
    exampleAr: 'سرق شخص ما دراجته.',
    isCommon: true
  },
  {
    id: 'irr_swim',
    base: 'swim',
    past: 'swam',
    pastParticiple: 'swum',
    meaningAr: 'يسبح',
    pattern: 'all_different',
    patternAr: 'نمط الحروف الصوتية (i ➔ a ➔ u)',
    example: 'They swam across the lake.',
    exampleAr: 'سبحوا عبر البحيرة.',
    isCommon: true
  },
  {
    id: 'irr_take',
    base: 'take',
    past: 'took',
    pastParticiple: 'taken',
    meaningAr: 'يأخذ / يستغرق',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'I took notes during the lecture.',
    exampleAr: 'دونت ملاحظات أثناء المحاضرة.',
    isCommon: true
  },
  {
    id: 'irr_tear',
    base: 'tear',
    past: 'tore',
    pastParticiple: 'torn',
    meaningAr: 'يمزق',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'He accidentally tore the letter.',
    exampleAr: 'مزق الرسالة عن غير قصد.',
    isCommon: false
  },
  {
    id: 'irr_throw',
    base: 'throw',
    past: 'threw',
    pastParticiple: 'thrown',
    meaningAr: 'يرمي / يلقي',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'He threw the ball to his friend.',
    exampleAr: 'رمى الكرة لصديقه.',
    isCommon: true
  },
  {
    id: 'irr_wake',
    base: 'wake',
    past: 'woke',
    pastParticiple: 'woken',
    meaningAr: 'يستيقظ / يوقظ',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'I woke up early today.',
    exampleAr: 'استيقظت مبكراً اليوم.',
    isCommon: true
  },
  {
    id: 'irr_wear',
    base: 'wear',
    past: 'wore',
    pastParticiple: 'worn',
    meaningAr: 'يرتدي / يلبس',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'She wore a beautiful blue dress.',
    exampleAr: 'ارتدت فستاناً أزرق جميلاً.',
    isCommon: true
  },
  {
    id: 'irr_write',
    base: 'write',
    past: 'wrote',
    pastParticiple: 'written',
    meaningAr: 'يكتب',
    pattern: 'all_different',
    patternAr: 'ثلاثة تصاريف مختلفة تماماً (V1 ≠ V2 ≠ V3)',
    example: 'Shakespeare wrote many famous plays.',
    exampleAr: 'كتب شكسبير العديد من المسرحيات الشهيرة.',
    isCommon: true
  }
];

// Helper to determine if the irregular verbs list should be shown for a tense
// Shown for all tenses EXCEPT:
// - present_simple (المضارع البسيط)
// - present_continuous (المضارع المستمر)
// - future_simple (المستقبل البسيط)
// - future_continuous (المستقبل المستمر)
export function isTenseUsingV2OrV3(tenseId: string): boolean {
  const excludedTenses = [
    'present_simple',
    'present_continuous',
    'future_simple',
    'future_continuous'
  ];
  return !excludedTenses.includes(tenseId);
}

// Get quick description for why this tense uses V2 or V3
export function getV2V3TenseRoleAr(tenseId: string): { badge: string; textAr: string } {
  switch (tenseId) {
    case 'past_simple':
      return {
        badge: 'التصريف الثاني (V2)',
        textAr: 'الماضي البسيط يعتمد في جمل الإثبات كلياً على التصريف الثاني للفعل (V2). الأفعال الشاذة لها أشكال مخصصة لا تتبع قاعدة -ed.'
      };
    case 'past_continuous':
      return {
        badge: 'الماضي (was / were)',
        textAr: 'الماضي المستمر يستخدم أفعال الكينونة في الماضي (was / were) متبوعة بالفعل بصيغة ing. جدول الأفعال الشاذة مرجع ممتاز لتصاريف الماضي.'
      };
    case 'present_perfect':
      return {
        badge: 'التصريف الثالث (V3)',
        textAr: 'المضارع التام يتركب من (have / has + V3). معرفة التصريف الثالث (Past Participle) ضرورية جداً لبناء الجملة بشكل صحيح.'
      };
    case 'past_perfect':
      return {
        badge: 'التصريف الثالث (V3)',
        textAr: 'الماضي التام يتركب من (had + V3). يتم استخدام التصريف الثالث بعد had للتعبير عن الحدث الأسبق في الماضي.'
      };
    case 'future_perfect':
      return {
        badge: 'التصريف الثالث (V3)',
        textAr: 'المستقبل التام يتركب من (will have + V3). يتطلب التصريف الثالث للدلالة على إنجاز الفعل قبل نقطة في المستقبل.'
      };
    case 'present_perfect_continuous':
    case 'past_perfect_continuous':
    case 'future_perfect_continuous':
      return {
        badge: 'التصريف الثالث (been)',
        textAr: 'الأزمنة التامة المستمرة تستخدم التصريف الثالث لفعل الكينونة (been) متبوعاً بالفعل مضافاً إليه ing.'
      };
    default:
      return {
        badge: 'تصاريف V2 و V3',
        textAr: 'مرجع شامل لتصاريف الأفعال الشاذة باللغة الإنجليزية للمساعدة في ضبط قواعد الماضي والتام.'
      };
  }
}
