import { IrregularVerbItem } from '../data/irregularVerbsData';

// Specific curated tricky distractors for common irregular verbs
// Structured as { [verbBase]: { v2?: string[]; v3?: string[] } }
const CURATED_TRICKY_DISTRACTORS: Record<
  string,
  { v2?: string[]; v3?: string[]; explanation?: string }
> = {
  // 1. Unchanged verbs (V1 = V2 = V3) -> Exactly matching user example: cost -> costed, costied, costd
  cost: {
    v2: ['costed', 'costied', 'costd'],
    v3: ['costed', 'costied', 'costd'],
    explanation: 'الفعل cost لا يقبل إضافات ed أو ied أو d، بل يبقى بصيغة (cost) في جميع التصاريف.',
  },
  cut: {
    v2: ['cutted', 'cuted', 'cutied'],
    v3: ['cutted', 'cuted', 'cutied'],
    explanation: 'الفعل cut يبقى ثابتاً (cut) بدون إضافة ed ولا مضاعفة الحرف الأخير مع ed.',
  },
  hit: {
    v2: ['hitted', 'hited', 'hitied'],
    v3: ['hitted', 'hited', 'hitied'],
    explanation: 'الفعل hit من الأفعال الجامدة التي لا تتغير في الماضي أو التام: hit - hit - hit.',
  },
  hurt: {
    v2: ['hurted', 'hurtied', 'hurtd'],
    v3: ['hurted', 'hurtied', 'hurtd'],
    explanation: 'الفعل hurt لا يقبل ed ولا d؛ شكله الصحيح دائماً هو hurt.',
  },
  put: {
    v2: ['putted', 'puted', 'putten'],
    v3: ['putted', 'puted', 'putten'],
    explanation: 'الفعل put يبقى (put) في كل الأزمنة ولا يُصرف بـ putted أو putten.',
  },
  let: {
    v2: ['letted', 'leted', 'letied'],
    v3: ['letted', 'leted', 'letten'],
    explanation: 'الفعل let لا يتغير: let - let - let، واستخدام letted خطأ شائع.',
  },
  set: {
    v2: ['setted', 'seted', 'setied'],
    v3: ['setted', 'seted', 'setten'],
    explanation: 'الفعل set ثابت في جميع التصاريف: set - set - set.',
  },
  shut: {
    v2: ['shutted', 'shuted', 'shutied'],
    v3: ['shutted', 'shuted', 'shutten'],
    explanation: 'الفعل shut من مجموعة الأفعال التي لا تتغير إطلاقاً: shut - shut - shut.',
  },
  quit: {
    v2: ['quitted', 'quited', 'quitied'],
    v3: ['quitted', 'quited', 'quitten'],
    explanation: 'في الإنجليزية الحديثة يُستخدم quit كفعل شاذ لا يتغير (quit - quit - quit).',
  },
  burst: {
    v2: ['bursted', 'burstied', 'burstd'],
    v3: ['bursted', 'burstied', 'burstd'],
    explanation: 'الفعل burst لا يتغير: burst - burst - burst، وصيغة bursted غير قياسية.',
  },
  cast: {
    v2: ['casted', 'castied', 'castd'],
    v3: ['casted', 'castied', 'castd'],
    explanation: 'الفعل cast ومشتقاته (broadcast, forecast) يبقى cast بدون ed.',
  },
  broadcast: {
    v2: ['broadcasted', 'broadcost', 'broadcastied'],
    v3: ['broadcasted', 'broadcost', 'broadcastied'],
    explanation: 'الفعل broadcast يتبع أصل الفعل cast ويبقى broadcast (أو broadcasted نادراً، لكن القياسي broadcast).',
  },
  forecast: {
    v2: ['forecasted', 'forecost', 'forecastied'],
    v3: ['forecasted', 'forecost', 'forecastied'],
    explanation: 'الفعل forecast مشتق من cast فيبقى forecast في كلا التصريفين.',
  },
  spread: {
    v2: ['spreaded', 'spred', 'spreadied'],
    v3: ['spreaded', 'spred', 'spreadied'],
    explanation: 'الفعل spread يُكتب ويُنطق spread في جميع تصاريفه بدون إضافة ed.',
  },
  read: {
    v2: ['readed', 'red', 'readied'],
    v3: ['readed', 'red', 'readied'],
    explanation: 'الفعل read يُكتب بنفس الحروف تماماً (read) في الماضي والتام ولكنه يُنطق صوتياً /red/.',
  },
  bet: {
    v2: ['betted', 'beted', 'betied'],
    v3: ['betted', 'beted', 'betten'],
    explanation: 'الفعل bet شاذ ويبقى bet (أو betted)، لكن الأكثر شيوعاً في الامتحانات هو bet.',
  },
  upset: {
    v2: ['upsetted', 'upseted', 'upsetied'],
    v3: ['upsetted', 'upseted', 'upsetd'],
    explanation: 'مشتق من set، فيبقى upset في التصاريف الثلاثة.',
  },

  // 2. All Different (V1 != V2 != V3)
  write: {
    v2: ['written', 'writed', 'wroten'],
    v3: ['wrote', 'writed', 'writen'],
    explanation: 'تصريف write هو: wrote (V2) ثم written (V3 بمضاعفة حرف t). انتبه لعدم الخلط بين الماضي والتام.',
  },
  go: {
    v2: ['gone', 'goed', 'wented'],
    v3: ['went', 'goed', 'gonen'],
    explanation: 'الفعل go شاذ جداً: ماضيه went وتصريفه الثالث gone. لا تقل goed أبداً!',
  },
  see: {
    v2: ['seen', 'seed', 'sawed'],
    v3: ['saw', 'seed', 'seened'],
    explanation: 'تصريف see هو: saw (V2) و seen (V3). seen تستخدم فقط بعد have / has / had.',
  },
  eat: {
    v2: ['eaten', 'eated', 'ated'],
    v3: ['ate', 'eated', 'aten'],
    explanation: 'تصريف eat هو: ate (V2) و eaten (V3). تجنب صيغة eated المنتظمة الخاطئة.',
  },
  drink: {
    v2: ['drunk', 'drinked', 'dronk'],
    v3: ['drank', 'drinked', 'drunken'],
    explanation: 'نمط i-a-u: الماضي drank (بحرف a) والتصريف الثالث drunk (بحرف u).',
  },
  swim: {
    v2: ['swum', 'swimmed', 'swimed'],
    v3: ['swam', 'swimmed', 'swumed'],
    explanation: 'نمط i-a-u: الماضي swam والتصريف الثالث swum. swimmed خطأ فادح.',
  },
  sing: {
    v2: ['sung', 'singed', 'song'],
    v3: ['sang', 'singed', 'sungen'],
    explanation: 'نمط i-a-u: الماضي sang والتصريف الثالث sung. لا يوجد singed في الإنجليزية القياسية.',
  },
  ring: {
    v2: ['rung', 'ringed', 'rong'],
    v3: ['rang', 'ringed', 'rungen'],
    explanation: 'نمط i-a-u: الماضي rang والتصريف الثالث rung.',
  },
  drive: {
    v2: ['driven', 'drived', 'droved'],
    v3: ['drove', 'drived', 'drivven'],
    explanation: 'تصريف drive هو: drove (V2) و driven (V3). لا تقل drived.',
  },
  ride: {
    v2: ['ridden', 'rided', 'roded'],
    v3: ['rode', 'rided', 'riden'],
    explanation: 'تصريف ride هو: rode (V2) و ridden (V3 بمضاعفة d).',
  },
  hide: {
    v2: ['hidden', 'hided', 'hidded'],
    v3: ['hid', 'hided', 'hiden'],
    explanation: 'تصريف hide هو: hid (V2) و hidden (V3 بمضاعفة d).',
  },
  bite: {
    v2: ['bitten', 'bited', 'bitted'],
    v3: ['bit', 'bited', 'biten'],
    explanation: 'تصريف bite هو: bit (V2) و bitten (V3 بمضاعفة t).',
  },
  speak: {
    v2: ['spoken', 'speaked', 'spoked'],
    v3: ['spoke', 'speaked', 'speaken'],
    explanation: 'تصريف speak هو: spoke (V2) و spoken (V3).',
  },
  break: {
    v2: ['broken', 'breaked', 'broked'],
    v3: ['broke', 'breaked', 'breaken'],
    explanation: 'تصريف break هو: broke (V2) و broken (V3). لا تقل breaked أبداً.',
  },
  choose: {
    v2: ['chosen', 'choosed', 'chosed'],
    v3: ['chose', 'choosed', 'choosen'],
    explanation: 'تصريف choose بحرفي o يتحول إلى chose (V2 بـ o واحدة) و chosen (V3).',
  },
  freeze: {
    v2: ['frozen', 'freezed', 'frozed'],
    v3: ['froze', 'freezed', 'freezen'],
    explanation: 'تصريف freeze هو: froze (V2) و frozen (V3).',
  },
  steal: {
    v2: ['stolen', 'stealed', 'stoled'],
    v3: ['stole', 'stealed', 'stealen'],
    explanation: 'تصريف steal هو: stole (V2) و stolen (V3).',
  },
  wake: {
    v2: ['woken', 'waked', 'woked'],
    v3: ['woke', 'waked', 'waken'],
    explanation: 'تصريف wake هو: woke (V2) و woken (V3).',
  },
  fly: {
    v2: ['flown', 'flied', 'flowed'],
    v3: ['flew', 'flied', 'flowen'],
    explanation: 'تصريف fly هو: flew (V2) و flown (V3). flowed خاصة بفعل تدفق الماء (flow).',
  },
  know: {
    v2: ['known', 'knowed', 'knewed'],
    v3: ['knew', 'knowed', 'knowen'],
    explanation: 'تصريف know هو: knew (V2) و known (V3). لا تقل knowed إطلاقاً.',
  },
  grow: {
    v2: ['grown', 'growed', 'grewed'],
    v3: ['grew', 'growed', 'growen'],
    explanation: 'تصريف grow هو: grew (V2) و grown (V3).',
  },
  throw: {
    v2: ['thrown', 'throwed', 'threwed'],
    v3: ['threw', 'throwed', 'throwen'],
    explanation: 'تصريف throw هو: threw (V2) و thrown (V3).',
  },
  blow: {
    v2: ['blown', 'blowed', 'blewed'],
    v3: ['blew', 'blowed', 'blowen'],
    explanation: 'تصريف blow هو: blew (V2) و blown (V3).',
  },
  draw: {
    v2: ['drawn', 'drawed', 'drewed'],
    v3: ['drew', 'drawed', 'drawen'],
    explanation: 'تصريف draw هو: drew (V2) و drawn (V3).',
  },
  take: {
    v2: ['taken', 'taked', 'tooked'],
    v3: ['took', 'taked', 'tooken'],
    explanation: 'تصريف take هو: took (V2) و taken (V3). tooked و taked أخطاء شائعة.',
  },
  shake: {
    v2: ['shaken', 'shaked', 'shooked'],
    v3: ['shook', 'shaked', 'shooken'],
    explanation: 'تصريف shake هو: shook (V2) و shaken (V3).',
  },
  give: {
    v2: ['given', 'gived', 'gaven'],
    v3: ['gave', 'gived', 'gaved'],
    explanation: 'تصريف give هو: gave (V2) و given (V3).',
  },
  fall: {
    v2: ['fallen', 'falled', 'felled'],
    v3: ['fell', 'falled', 'follen'],
    explanation: 'تصريف fall هو: fell (V2) و fallen (V3). falled خطأ شائع.',
  },
  wear: {
    v2: ['worn', 'weared', 'wored'],
    v3: ['wore', 'weared', 'worned'],
    explanation: 'تصريف wear هو: wore (V2) و worn (V3).',
  },
  tear: {
    v2: ['torn', 'teared', 'tored'],
    v3: ['tore', 'teared', 'torned'],
    explanation: 'تصريف tear هو: tore (V2) و torn (V3).',
  },
  bear: {
    v2: ['born', 'beared', 'bored'],
    v3: ['bore', 'beared', 'borned'],
    explanation: 'تصريف bear هو: bore (V2) و born / borne (V3).',
  },

  // 3. V2 = V3 (تطابق الماضي والتام)
  buy: {
    v2: ['buyed', 'boughted', 'boughten'],
    v3: ['buyed', 'boughted', 'boughten'],
    explanation: 'الفعل buy ينتهي بـ -ought: bought (V2 و V3). لا تقل buyed إطلاقاً.',
  },
  bring: {
    v2: ['bringed', 'broughted', 'brang'],
    v3: ['bringed', 'broughted', 'broughten'],
    explanation: 'الفعل bring يصبح brought (V2 و V3)، وصيغة bringed أو brang خاطئة.',
  },
  think: {
    v2: ['thinked', 'thoughted', 'thank'],
    v3: ['thinked', 'thoughted', 'thoughten'],
    explanation: 'الفعل think يصبح thought في الماضي والتصريف الثالث.',
  },
  teach: {
    v2: ['teached', 'taughted', 'teachen'],
    v3: ['teached', 'taughted', 'taughten'],
    explanation: 'الفعل teach يصبح taught (V2 و V3)، بينما teached غير موجودة.',
  },
  catch: {
    v2: ['catched', 'caughted', 'cotched'],
    v3: ['catched', 'caughted', 'caughten'],
    explanation: 'الفعل catch يصبح caught (V2 و V3) بالـ augh.',
  },
  fight: {
    v2: ['fighted', 'foughted', 'faught'],
    v3: ['fighted', 'foughted', 'foughten'],
    explanation: 'الفعل fight يصبح fought في V2 و V3.',
  },
  make: {
    v2: ['maked', 'maden', 'makd'],
    v3: ['maked', 'maden', 'makd'],
    explanation: 'الفعل make يتحول بحذف k وإضافة de: made - made.',
  },
  have: {
    v2: ['haved', 'hadded', 'hast'],
    v3: ['haved', 'hadded', 'havd'],
    explanation: 'الفعل have تصريفه had في الماضي والتام. haved خطأ فادح.',
  },
  do: {
    v2: ['done', 'doed', 'didded'],
    v3: ['did', 'doed', 'doned'],
    explanation: 'تصريف do هو: did في الماضي (V2) و done في التام (V3).',
  },
  say: {
    v2: ['sayed', 'saied', 'sayd'],
    v3: ['sayed', 'saied', 'sayd'],
    explanation: 'الفعل say ينتهي بـ aid: said (V2 و V3). sayed غير صحيحة.',
  },
  pay: {
    v2: ['payed', 'paied', 'payd'],
    v3: ['payed', 'paied', 'payd'],
    explanation: 'الفعل pay يتحول إلى paid في V2 و V3 (مع الاحتفاظ بـ payed في المعاني البحرية فقط).',
  },
  lay: {
    v2: ['layed', 'laied', 'layd'],
    v3: ['layed', 'laied', 'layd'],
    explanation: 'الفعل lay (يضع) تصريفه laid في V2 و V3.',
  },
  sleep: {
    v2: ['sleeped', 'slepted', 'sleepd'],
    v3: ['sleeped', 'slepted', 'slepten'],
    explanation: 'الفعل sleep يختصر الصوت إلى slept في V2 و V3.',
  },
  keep: {
    v2: ['keeped', 'kepted', 'keepd'],
    v3: ['keeped', 'kepted', 'kepten'],
    explanation: 'الفعل keep يصبح kept في V2 و V3.',
  },
  feel: {
    v2: ['feeled', 'felted', 'feeld'],
    v3: ['feeled', 'felted', 'felten'],
    explanation: 'الفعل feel يصبح felt في V2 و V3.',
  },
  leave: {
    v2: ['leaved', 'lefted', 'leaven'],
    v3: ['leaved', 'lefted', 'leften'],
    explanation: 'الفعل leave يتحول إلى left في V2 و V3. leaved تعني إجازة كاسم.',
  },
  meet: {
    v2: ['meeted', 'metted', 'meeten'],
    v3: ['meeted', 'metted', 'metd'],
    explanation: 'الفعل meet يختصر حرف الـ e المزدوج ليصبح met - met.',
  },
  feed: {
    v2: ['feeded', 'fedded', 'feeden'],
    v3: ['feeded', 'fedded', 'fedd'],
    explanation: 'الفعل feed يختصر ee إلى e واحدة: fed - fed.',
  },
  lead: {
    v2: ['leaded', 'ledded', 'lead'],
    v3: ['leaded', 'ledded', 'lead'],
    explanation: 'الفعل lead يصبح led في الماضي والتام.',
  },
  send: {
    v2: ['sended', 'sented', 'sendt'],
    v3: ['sended', 'sented', 'send'],
    explanation: 'الأفعال المنتهية بـ nd تتحول الـ d فيها إلى t: send ➔ sent.',
  },
  spend: {
    v2: ['spended', 'spented', 'spendt'],
    v3: ['spended', 'spented', 'spend'],
    explanation: 'الفعل spend يتحول إلى spent في V2 و V3.',
  },
  build: {
    v2: ['builded', 'builted', 'buildt'],
    v3: ['builded', 'builted', 'build'],
    explanation: 'الفعل build تتحول فيه الـ d إلى t: built في V2 و V3.',
  },
  lose: {
    v2: ['losed', 'loosed', 'losted'],
    v3: ['losed', 'loosed', 'losted'],
    explanation: 'الفعل lose يصبح lost في V2 و V3، وكلمة loose تعني فضفاض أو واسع.',
  },
  win: {
    v2: ['winned', 'wonned', 'win'],
    v3: ['winned', 'wonned', 'win'],
    explanation: 'الفعل win يصبح won في V2 و V3 ولا يقبل winned.',
  },
  tell: {
    v2: ['telled', 'tolden', 'tolded'],
    v3: ['telled', 'tolden', 'tolded'],
    explanation: 'الفعل tell يصبح told في V2 و V3.',
  },
  sell: {
    v2: ['selled', 'solden', 'solded'],
    v3: ['selled', 'solden', 'solded'],
    explanation: 'الفعل sell يصبح sold في V2 و V3.',
  },
  stand: {
    v2: ['standed', 'stooded', 'standen'],
    v3: ['standed', 'stooded', 'standen'],
    explanation: 'الفعل stand يصبح stood في V2 و V3.',
  },
  understand: {
    v2: ['understanded', 'understooded', 'understanden'],
    v3: ['understanded', 'understooded', 'understanden'],
    explanation: 'مشتق من stand، فيصبح understood في V2 و V3.',
  },
  find: {
    v2: ['finded', 'founded', 'founden'],
    v3: ['finded', 'founded', 'founden'],
    explanation: 'الفعل find يصبح found في V2 و V3. كلمة founded تعني يؤسس أو ينشئ كفعل مستقل.',
  },
  hear: {
    v2: ['heared', 'heard-ed', 'hearn'],
    v3: ['heared', 'heard-ed', 'hearn'],
    explanation: 'الفعل hear نضيف له فقط حرف d ليصبح heard.',
  },
  hold: {
    v2: ['holded', 'helded', 'holden'],
    v3: ['holded', 'helded', 'hold'],
    explanation: 'الفعل hold يصبح held في V2 و V3.',
  },
  get: {
    v2: ['gotten', 'getted', 'gotted'],
    v3: ['got', 'getted', 'gotted'],
    explanation: 'تصريف get هو got في V2، وتصريفه الثالث gotten (أمريكي) أو got (بريطاني).',
  },
  forget: {
    v2: ['forgotten', 'forgetted', 'forgotted'],
    v3: ['forgot', 'forgetted', 'forgotted'],
    explanation: 'تصريف forget هو forgot في الماضي، و forgotten في التام.',
  },

  // 4. V1 = V3 (المصدر يطابق التام)
  come: {
    v2: ['come', 'comed', 'camed'],
    v3: ['came', 'comed', 'comen'],
    explanation: 'الفعل come تصريفه: came (V2) ثم يعود إلى come (V3). comed غير صحيحة.',
  },
  become: {
    v2: ['become', 'becomed', 'becamed'],
    v3: ['became', 'becomed', 'becomen'],
    explanation: 'الفعل become تصريفه: became (V2) ثم يعود إلى become (V3).',
  },
  run: {
    v2: ['run', 'runned', 'ron'],
    v3: ['ran', 'runned', 'ron'],
    explanation: 'الفعل run تصريفه: ran (V2) ثم يعود إلى run (V3). runned خطأ شائع.',
  },
};

/**
 * Algorithmic rule generator that creates 3-4 tricky, deceptive options for ANY verb
 * following the exact concept requested by user:
 * e.g., for "cost" -> costed, costied, costd, cost
 */
export function generateAlgorithmicDistractors(
  verb: IrregularVerbItem,
  target: 'v2' | 'v3'
): string[] {
  const base = verb.base.toLowerCase().trim();
  const past = verb.past.toLowerCase().trim();
  const pp = verb.pastParticiple.toLowerCase().trim();
  const correctAnswer = (target === 'v2' ? past : pp).toLowerCase().trim();

  const candidates: string[] = [];

  const addCandidate = (word: string | undefined | null) => {
    if (!word) return;
    const clean = word.toLowerCase().trim();
    if (clean && clean !== correctAnswer && !candidates.includes(clean)) {
      candidates.push(clean);
    }
  };

  // 1. Regularization trap: base + ed
  if (base.endsWith('e')) {
    addCandidate(base + 'd');
    addCandidate(base + 'ed');
  } else if (base.endsWith('y') && !/[aeiou]y$/i.test(base)) {
    addCandidate(base.slice(0, -1) + 'ied');
    addCandidate(base + 'ed');
  } else {
    addCandidate(base + 'ed');
  }

  // 2. False "ied" trap (e.g. cost -> costied, cut -> cutied, hit -> hitied)
  if (base.endsWith('t') || base.endsWith('d') || base.endsWith('p') || base.endsWith('k')) {
    addCandidate(base + 'ied');
  } else if (!base.endsWith('ied')) {
    addCandidate(base + 'ied');
  }

  // 3. False "d" trap (e.g. cost -> costd, hurt -> hurtd, burst -> burstd)
  if (!base.endsWith('d')) {
    addCandidate(base + 'd');
  }

  // 4. Double consonant + ed trap (e.g. cutted, hitted, putted, setted, shutted)
  const lastChar = base[base.length - 1];
  const secondLast = base[base.length - 2];
  const isCVC =
    /[bdfgklmnprstvz]/i.test(lastChar) &&
    /[aeiou]/i.test(secondLast) &&
    base.length <= 5;
  if (isCVC) {
    addCandidate(base + lastChar + 'ed');
  }

  // 5. Cross-tense confusion trap (V2 vs V3)
  if (target === 'v2') {
    // If asking for V2, offer V3 as a major distractor (e.g. write -> written, see -> seen, go -> gone)
    if (pp !== correctAnswer && pp !== base) {
      addCandidate(pp);
    }
    // Base form trap (asking if it doesn't change like cost/cut)
    if (base !== correctAnswer) {
      addCandidate(base);
    }
  } else {
    // If asking for V3, offer V2 as a major distractor (e.g. write -> wrote, see -> saw, go -> went)
    if (past !== correctAnswer && past !== base) {
      addCandidate(past);
    }
    if (base !== correctAnswer) {
      addCandidate(base);
    }
  }

  // 6. Over-inflection traps (e.g. boughted, thoughted, wented, tooked, wroten)
  if (correctAnswer.endsWith('t') || correctAnswer.endsWith('d')) {
    addCandidate(correctAnswer + 'ed');
  }
  if (!correctAnswer.endsWith('en') && !correctAnswer.endsWith('n')) {
    addCandidate(correctAnswer + 'en');
  } else if (correctAnswer.endsWith('en')) {
    // false single vowel or missing -en
    addCandidate(correctAnswer.slice(0, -2));
  }

  // 7. General fallback traps based on root
  addCandidate(base + 'ten');
  addCandidate(base + 'den');

  return candidates;
}

/**
 * Generates the full set of 4 options with maximum challenge and deception.
 * Guarantees exactly 4 options including the correct answer.
 */
export function generateChallengingOptions(
  verb: IrregularVerbItem,
  target: 'v2' | 'v3'
): { options: string[]; correctAnswer: string; explanation: string } {
  const baseLower = verb.base.toLowerCase().trim();
  const correctAnswer = target === 'v2' ? verb.past : verb.pastParticiple;
  const curated = CURATED_TRICKY_DISTRACTORS[baseLower];

  let rawDistractors: string[] = [];

  // Try curated list first
  if (curated) {
    const specificList = target === 'v2' ? curated.v2 : curated.v3;
    if (specificList && specificList.length > 0) {
      rawDistractors.push(...specificList);
    }
  }

  // If curated list didn't provide enough or verb isn't curated, add algorithmic distractors
  if (rawDistractors.length < 3) {
    const algoDistractors = generateAlgorithmicDistractors(verb, target);
    for (const d of algoDistractors) {
      if (!rawDistractors.includes(d) && d.toLowerCase() !== correctAnswer.toLowerCase()) {
        rawDistractors.push(d);
      }
    }
  }

  // Ensure clean, deduplicated distractors not equal to correct answer
  const validDistractors: string[] = [];
  for (const d of rawDistractors) {
    const trimmed = d.trim();
    if (
      trimmed &&
      trimmed.toLowerCase() !== correctAnswer.toLowerCase() &&
      !validDistractors.some((v) => v.toLowerCase() === trimmed.toLowerCase())
    ) {
      validDistractors.push(trimmed);
    }
    if (validDistractors.length === 3) break;
  }

  // Fallback safety if still less than 3
  if (validDistractors.length < 3) {
    const safetyOptions = [
      verb.base + 'ed',
      verb.base + 'ied',
      verb.base + 'd',
      verb.base + 'ing',
      verb.base + 's',
    ];
    for (const s of safetyOptions) {
      if (
        s.toLowerCase() !== correctAnswer.toLowerCase() &&
        !validDistractors.some((v) => v.toLowerCase() === s.toLowerCase())
      ) {
        validDistractors.push(s);
      }
      if (validDistractors.length === 3) break;
    }
  }

  // Combine with correct answer and shuffle
  const allFour = [correctAnswer, ...validDistractors.slice(0, 3)];
  const shuffled = [...allFour].sort(() => 0.5 - Math.random());

  // Prepare explanation
  let explanation = curated?.explanation || '';
  if (!explanation) {
    if (verb.pattern === 'no_change') {
      explanation = `الفعل ${verb.base} من مجموعة الأفعال التي لا تتغير (V1 = V2 = V3)، فيبقى (${verb.past}) بدون أي إضافات ed أو ied.`;
    } else if (verb.pattern === 'v2_equals_v3') {
      explanation = `الفعل ${verb.base} يتطابق فيه الماضي والتصريف الثالث (${verb.past}). انتبه للصيغ المنتظمة الخاطئة.`;
    } else if (verb.pattern === 'v1_equals_v3') {
      explanation = `الفعل ${verb.base} يعود في التصريف الثالث إلى شكله المصدري (${verb.pastParticiple})، بينما ماضيه هو (${verb.past}).`;
    } else {
      explanation = `الفعل ${verb.base} له 3 تصاريف مختلفة كلياً: المصدر (${verb.base})، الماضي V2: (${verb.past})، والتصريف الثالث V3: (${verb.pastParticiple}).`;
    }
  }

  return {
    options: shuffled,
    correctAnswer,
    explanation,
  };
}
