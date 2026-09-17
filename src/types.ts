export type TenseCategory = 'present' | 'past' | 'future';

export type LessonType = 
  | 'usage'      // الدرس 1: الاستخدام والتفصيل والأمثلة
  | 'svo'        // الدرس 2: تركيب الجمل وجدول SVO + الأفعال المساعدة
  | 'mistakes'   // الدرس 3: أبرز الأخطاء الشائعة
  | 'practice'   // الدرس 4: تمارين تفاعلية متنوعة
  | 'free_write' // الدرس 5: تكوين الجمل الحر
  | 'final_exam';// الدرس 6: الاختبار النهائي للوحدة

export interface VerbConjugationEntry {
  base: string; // V1
  v2: string;   // V2
  v3: string;   // V3
  meaningAr: string;
  isIrregular: boolean;
}

export interface SubjectClassification {
  singularNouns: { en: string; ar: string }[];
  pluralNouns: { en: string; ar: string }[];
  singularPronouns: string[];
  pluralPronouns: string[];
  iPronouns?: string[];
  iNotesAr?: string;
  iBeAux?: string;
  iGeneralAux?: string;
}

export interface SVOStructure {
  formType: 'affirmative' | 'negative' | 'yes_no_question' | 'wh_question';
  formTitleAr: string;
  formTitleEn: string;
  formula: string;
  tableRows: {
    whWord?: string;
    subject: string;
    auxiliary: string;
    verb: string;
    verbFormNote: string;
    objectComplement: string;
    timeMarker?: string;
    fullSentence: string;
    translationAr: string;
  }[];
  explanationAr: string;
}

export interface TenseExample {
  id: string;
  sentence: string;
  translationAr: string;
  contextAr: string;
  subject: string;
  auxiliary?: string;
  verb: string;
  complement: string;
  timeMarker?: string;
  audioText?: string;
}

export interface SpellingRuleCard {
  badge: string;
  badgeType: 'emerald' | 'rose' | 'indigo' | 'amber';
  titleAr: string;
  conditionAr: string;
  examples: string;
  examplesList?: { base: string; changed: string; audio?: string }[];
}

export interface SpellingTableRow {
  addition: string;
  ruleTitleAr: string;
  conditionAr: string;
  examples: { base: string; changed: string; audioPhrase?: string }[];
  noteAr: string;
  pronunciationTipAr?: string;
}

export interface SpellingPracticeQuiz {
  questionAr: string;
  options: string[];
  correctOption: string;
  explanationAr: string;
}

export interface InteractiveSpellingVerb {
  base: string;
  conjugated: string;
  additionType: string;
  ruleExplanationAr: string;
  audioPhrase: string;
  exampleSentenceEn: string;
  exampleSentenceAr: string;
}

export interface PronunciationRuleGroup {
  phoneticSound: string;
  phoneticNameAr: string;
  ruleExplanationAr: string;
  audioPhrase: string;
  wordPairs: { base: string; conjugated: string }[];
}

export interface TenseSpellingData {
  tenseId: string;
  titleAr: string;
  subtitleAr: string;
  overviewAr: string;
  ruleCards: SpellingRuleCard[];
  tableRows: SpellingTableRow[];
  irregularSection?: {
    titleAr: string;
    descriptionAr: string;
    items: { base: string; conjugated: string; meaningAr: string; noteAr?: string }[];
  };
  pronunciationGroups?: PronunciationRuleGroup[];
  interactiveVerbs?: InteractiveSpellingVerb[];
  practiceQuiz?: SpellingPracticeQuiz[];
  pronunciationGuideAr?: string;
  goldenSpellingNoteAr?: string;
}

export interface CommonMistake {
  id: string;
  incorrect: string;
  correct: string;
  reasonAr: string;
  goldenRuleAr: string;
  categoryAr: string;
}

export type ExerciseType = 'mcq' | 'fill_blank' | 'reorder' | 'error_correction' | 'transform';

export interface ExerciseItem {
  id: string;
  type: ExerciseType;
  questionAr: string;
  promptSentence?: string;
  options?: string[]; // for mcq
  correctAnswer: string | string[]; // for fill_blank, mcq, reorder
  scrambledWords?: string[]; // for reorder
  explanationAr: string;
  hintAr?: string;
}

export interface ExamQuestion {
  id: string;
  question: string;
  questionAr?: string;
  options: string[];
  correctIndex: number;
  explanationAr: string;
  category?: 'usage' | 'structure' | 'mistake' | 'conjugation';
  lessonRefAr?: string;
}

export interface EducationalVideo {
  id?: string;
  titleAr: string;
  titleEn?: string;
  videoUrl: string;
  duration?: string;
  channelName?: string;
  summaryAr?: string;
  timestamps?: { label: string; timeInSeconds: number }[];
}

export interface TenseData {
  id: string;
  nameEn: string;
  nameAr: string;
  category: TenseCategory;
  level: 'مبتدئ' | 'متوسط' | 'متقدم';
  shortFormula: string;
  summaryAr: string;
  timelineDescriptionAr: string;
  timelinePoint: number; // -3 to +3 for past to future timeline position
  videoUrl?: string; // رابط الفيديو التعليمي الرئيسي للزمن
  videos?: EducationalVideo[]; // معرض فيديوهات تعليمية متكاملة للزمن
  
  // Lesson 1: الاستخدام والتفصيل والأمثلة
  usageLesson: {
    titleAr: string;
    overviewAr: string;
    useCases: {
      titleAr: string;
      descriptionAr: string;
      examples: TenseExample[];
    }[];
    keywords: {
      word: string;
      meaningAr: string;
      example: string;
    }[];
    timeConceptAr: string;
  };

  // Lesson 2: تركيب الجمل وجدول SVO + الأفعال المساعدة
  svoLesson: {
    titleAr: string;
    rulesAr: string[];
    auxiliaryRulesAr: string;
    goldenNotesAr?: string[];
    subjectClassification?: SubjectClassification;
    verbTable?: VerbConjugationEntry[];
    structures: SVOStructure[];
    builderParts: {
      subjects: { text: string; type: 'sing' | 'plur' | 'i' | 'you'; meaningAr?: string }[];
      auxiliaries?: string[];
      verbs: {
        base: string;
        conjugated: string;
        meaningAr: string;
        v2?: string;
        v3?: string;
        ving?: string;
        complements?: { en: string; ar: string }[];
      }[];
      objects?: string[];
      timePhrases: string[];
    };
  };

  // Lesson 3: أبرز وأهم الأخطاء الشائعة
  mistakesLesson: {
    titleAr: string;
    introAr: string;
    mistakes: CommonMistake[];
    proTipsAr: string[];
  };

  // Lesson 4: تمارين تفاعلية متنوعة
  practiceLesson: {
    titleAr: string;
    exercises: ExerciseItem[];
  };

  // Lesson 5: تكوين الجمل الحر
  freeWriteLesson: {
    titleAr: string;
    instructionAr: string;
    scenarios: {
      titleAr: string;
      promptAr: string;
      starter: string;
      exampleTarget: string;
    }[];
    structuralGuide: string;
  };

  // Lesson 6: الاختبار النهائي للوحدة
  finalExamLesson: {
    titleAr: string;
    timeLimitSeconds?: number;
    passingScorePercent: number;
    questions: ExamQuestion[];
  };
}

export interface UserTenseProgress {
  tenseId?: string;
  completedLessons: (LessonType | number)[];
  examScore?: number;
  examPassed?: boolean;
  freeSentences?: {
    sentence: string;
    score: number;
    feedback: string;
    date?: string;
    timestamp?: string;
  }[];
}

export interface UserOverallProgress {
  [tenseId: string]: UserTenseProgress | undefined;
}
