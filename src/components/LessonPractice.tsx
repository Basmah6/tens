import React, { useState, useMemo } from 'react';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { TenseData, ExerciseItem } from '../types';
import { playEnglishAudio } from '../utils/audio';
import { shuffleArray } from '../utils/quizUtils';

interface LessonPracticeProps {
  tense: TenseData;
  onCompleteLesson: () => void;
  onNextLesson: () => void;
}

export const LessonPractice: React.FC<LessonPracticeProps> = ({
  tense,
  onCompleteLesson,
  onNextLesson,
}) => {
  const exercises = tense.practiceLesson.exercises;

  // Student Answers State
  const [userAnswers, setUserAnswers] = useState<{ [exerciseId: string]: any }>({});
  const [checkedStatus, setCheckedStatus] = useState<{ [exerciseId: string]: boolean }>({});
  const [reorderState, setReorderState] = useState<{ [exerciseId: string]: string[] }>({});
  const [reorderIndices, setReorderIndices] = useState<{ [exerciseId: string]: number[] }>({});
  const [exerciseShuffleKeys, setExerciseShuffleKeys] = useState<{ [exId: string]: number }>({});

  // Dynamically randomize MCQ options so correct answers are unpredictable
  const randomizedExercises = useMemo(() => {
    return exercises.map((ex) => {
      if (ex.options && ex.options.length > 0) {
        return {
          ...ex,
          options: shuffleArray(ex.options),
        };
      }
      return ex;
    });
  }, [exercises, tense.id, exerciseShuffleKeys]);

  const handleSelectOption = (exId: string, option: string) => {
    if (checkedStatus[exId]) return;
    setUserAnswers(prev => ({ ...prev, [exId]: option }));
  };

  const handlePickWordReorder = (exId: string, chipIdx: number, scrambledWords: string[]) => {
    if (checkedStatus[exId]) return;
    setReorderIndices(prev => {
      const currentList = prev[exId] || [];
      if (currentList.includes(chipIdx)) return prev;
      const nextList = [...currentList, chipIdx];
      const nextWords = nextList.map(i => scrambledWords[i]);
      setReorderState(rPrev => ({ ...rPrev, [exId]: nextWords }));
      setUserAnswers(uPrev => ({ ...uPrev, [exId]: nextWords.join(' ') }));
      return { ...prev, [exId]: nextList };
    });
  };

  const handleRemoveWordReorder = (exId: string, trayIdx: number, scrambledWords: string[]) => {
    if (checkedStatus[exId]) return;
    setReorderIndices(prev => {
      const currentList = prev[exId] || [];
      const nextList = currentList.filter((_, idx) => idx !== trayIdx);
      const nextWords = nextList.map(i => scrambledWords[i]);
      setReorderState(rPrev => ({ ...rPrev, [exId]: nextWords }));
      setUserAnswers(uPrev => ({ ...uPrev, [exId]: nextWords.join(' ') }));
      return { ...prev, [exId]: nextList };
    });
  };

  const handleCheckAnswer = (exId: string) => {
    setCheckedStatus(prev => ({ ...prev, [exId]: true }));
  };

  const handleResetExercise = (exId: string) => {
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[exId];
      return copy;
    });
    setCheckedStatus(prev => {
      const copy = { ...prev };
      delete copy[exId];
      return copy;
    });
    setReorderState(prev => {
      const copy = { ...prev };
      delete copy[exId];
      return copy;
    });
    setReorderIndices(prev => {
      const copy = { ...prev };
      delete copy[exId];
      return copy;
    });
    setExerciseShuffleKeys(prev => ({
      ...prev,
      [exId]: (prev[exId] || 0) + 1,
    }));
  };

  // Calculate score
  const totalCount = exercises.length;
  let correctCount = 0;
  exercises.forEach(ex => {
    if (checkedStatus[ex.id]) {
      const ans = userAnswers[ex.id];
      if (ans && ans.trim().toLowerCase() === (typeof ex.correctAnswer === 'string' ? ex.correctAnswer.trim().toLowerCase() : '')) {
        correctCount += 1;
      }
    }
  });

  const allCompleted = Object.keys(checkedStatus).length === totalCount;

  return (
    <div className="space-y-6 animate-fadeIn" dir="rtl">
      
      {/* Header Banner */}
      <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1.5 h-full bg-emerald-500"></div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30 mb-3">
          <CheckCircle2 className="w-3.5 h-3.5" />
          الدرس 4: تمارين تفاعلية متنوعة للزمن
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white">
          اختبر فهمك وتطبيقك لزمن ({tense.nameAr})
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl">
          أجب عن التمارين التالية لتثبيت القواعد، واقرأ التوضيح الفوري لمعرفة سبب صحة أو خطأ كل خيار.
        </p>

        {/* Progress Mini Bar */}
        <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between text-xs text-slate-300">
          <span>تمت الإجابة والتحقق من: {Object.keys(checkedStatus).length} من {totalCount}</span>
          <span className="font-mono text-emerald-400 font-bold">النتيجة: {correctCount} / {totalCount}</span>
        </div>
      </div>

      {/* Exercises List */}
      <div className="space-y-4">
        {randomizedExercises.map((ex, idx) => {
          const isChecked = checkedStatus[ex.id];
          const studentAns = userAnswers[ex.id];
          const isCorrect = studentAns && studentAns.trim().toLowerCase() === (typeof ex.correctAnswer === 'string' ? ex.correctAnswer.trim().toLowerCase() : '');

          return (
            <div 
              key={ex.id} 
              className={`bg-white border rounded-xl p-5 sm:p-6 shadow-sm transition ${
                isChecked
                  ? isCorrect 
                    ? 'border-emerald-300 bg-emerald-50/10' 
                    : 'border-rose-300 bg-rose-50/10'
                  : 'border-slate-200'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold font-mono">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 font-arabic">
                    {ex.questionAr}
                  </h4>
                </div>

                {isChecked && (
                  <button
                    onClick={() => handleResetExercise(ex.id)}
                    className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 font-arabic"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    إعادة المحاولة
                  </button>
                )}
              </div>

              {/* Prompt Sentence if exists */}
              {ex.promptSentence && (
                <div className="bg-[#1E293B] text-white p-3.5 rounded-lg font-sans text-base font-bold mb-3 text-left tracking-wide" dir="ltr">
                  {ex.promptSentence}
                </div>
              )}

              {/* MCQ & Error Correction Options */}
              {ex.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3" dir="ltr">
                  {ex.options.map((opt, oIdx) => {
                    const isSelected = studentAns === opt;
                    let btnClass = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-blue-50/50 hover:border-blue-200';

                    if (isChecked) {
                      if (opt === ex.correctAnswer) {
                        btnClass = 'bg-emerald-600 border-emerald-600 text-white font-bold shadow-sm';
                      } else if (isSelected && !isCorrect) {
                        btnClass = 'bg-rose-600 border-rose-600 text-white font-bold';
                      } else {
                        btnClass = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
                      }
                    } else if (isSelected) {
                      btnClass = 'bg-blue-600 border-blue-600 text-white font-bold shadow-sm';
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={isChecked}
                        onClick={() => handleSelectOption(ex.id, opt)}
                        className={`p-3 rounded-lg border text-xs sm:text-sm font-semibold transition text-left flex items-center justify-between ${btnClass}`}
                      >
                        <span>{opt}</span>
                        {isChecked && opt === ex.correctAnswer && <CheckCircle2 className="w-4 h-4 text-white" />}
                        {isChecked && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-white" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Word Reorder Exercise */}
              {ex.type === 'reorder' && ex.scrambledWords && (
                <div className="space-y-3 mb-3">
                  {/* Selected Words Tray */}
                  <div className="min-h-[48px] p-3 bg-[#0F172A] text-white rounded-lg border border-slate-800 flex flex-wrap gap-2 items-center" dir="ltr">
                    {(reorderIndices[ex.id] || []).length === 0 ? (
                      <span className="text-xs text-slate-500 italic">انقر على الكلمات بالأسفل لترتيبها هنا بالترتيب الصحيح...</span>
                    ) : (
                      (reorderIndices[ex.id] || []).map((chipIdx, trayIdx) => (
                        <span 
                          key={trayIdx}
                          onClick={() => handleRemoveWordReorder(ex.id, trayIdx, ex.scrambledWords!)}
                          className="px-2.5 py-1 bg-blue-600 text-white rounded-md text-xs font-bold cursor-pointer hover:bg-blue-500 transition shadow-xs"
                          title="انقر لإزالة الكلمة"
                        >
                          {ex.scrambledWords![chipIdx]}
                        </span>
                      ))
                    )}
                  </div>

                  {/* Scrambled Word Pills to Pick */}
                  <div className="flex flex-wrap gap-2" dir="ltr">
                    {ex.scrambledWords.map((w, wIdx) => {
                      const isPicked = (reorderIndices[ex.id] || []).includes(wIdx);
                      return (
                        <button
                          key={wIdx}
                          disabled={isChecked || isPicked}
                          onClick={() => handlePickWordReorder(ex.id, wIdx, ex.scrambledWords!)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                            isPicked
                              ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed opacity-50 line-through'
                              : 'bg-white border-slate-300 text-slate-800 hover:border-blue-500 hover:text-blue-600 shadow-xs'
                          }`}
                        >
                          {w}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Check Answer Button */}
              {!isChecked && (
                <button
                  disabled={!studentAns}
                  onClick={() => handleCheckAnswer(ex.id)}
                  className={`mt-1 px-4 py-2 rounded-lg text-xs font-bold transition shadow-xs ${
                    studentAns
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  تحقق من الإجابة
                </button>
              )}

              {/* Feedback & Detailed Arabic Explanation */}
              {isChecked && (
                <div className={`mt-3 p-3.5 rounded-lg text-xs sm:text-sm leading-relaxed border ${
                  isCorrect 
                    ? 'bg-emerald-50 text-emerald-950 border-emerald-200' 
                    : 'bg-rose-50 text-rose-950 border-rose-200'
                }`}>
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {isCorrect ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> إجابة صحيحة وممتازة!
                      </span>
                    ) : (
                      <span className="text-rose-700 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> إجابة غير دقيقة. الإجابة الصحيحة هي: "{ex.correctAnswer}"
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1 font-arabic">
                    <strong>الشرح:</strong> {ex.explanationAr}
                  </p>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
        <button
          onClick={() => {
            onCompleteLesson();
            onNextLesson();
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-sm transition active:scale-95 mr-auto"
        >
          <span>إتمام الدرس والانتقال إلى تكوين الجمل الحر</span>
          <ArrowRight className="w-4 h-4 rotate-180" />
        </button>
      </div>

    </div>
  );
};
