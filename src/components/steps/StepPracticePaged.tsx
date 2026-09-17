import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle2, XCircle, ArrowLeft, ArrowRight, RotateCcw, Award, Volume2, Sparkles } from 'lucide-react';
import { TenseData, ExerciseItem } from '../../types';
import { playEnglishAudio } from '../../utils/audio';
import { shuffleArray } from '../../utils/quizUtils';

interface StepPracticePagedProps {
  tense: TenseData;
  onCompleteLesson: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const StepPracticePaged: React.FC<StepPracticePagedProps> = ({
  tense,
  onCompleteLesson,
  onNext,
  onPrev,
}) => {
  const exercises = tense.practiceLesson.exercises;
  const [currentExIndex, setCurrentExIndex] = useState(0);

  // Automatically scroll to top when changing exercises/questions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentExIndex]);

  // Student Answers State
  const [userAnswers, setUserAnswers] = useState<{ [exerciseId: string]: any }>({});
  const [checkedStatus, setCheckedStatus] = useState<{ [exerciseId: string]: boolean }>({});
  const [reorderState, setReorderState] = useState<{ [exerciseId: string]: string[] }>({});
  const [reorderIndices, setReorderIndices] = useState<{ [exerciseId: string]: number[] }>({});
  const [exerciseShuffleKeys, setExerciseShuffleKeys] = useState<{ [exId: string]: number }>({});

  // Dynamically shuffle MCQ options so the correct answer position is completely randomized
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

  const currentExercise = randomizedExercises[currentExIndex] || randomizedExercises[0];

  const handleSelectOption = (exId: string, option: string) => {
    if (checkedStatus[exId]) return;
    setUserAnswers((prev) => ({ ...prev, [exId]: option }));
  };

  const handlePickWordReorder = (exId: string, chipIdx: number, scrambledWords: string[]) => {
    if (checkedStatus[exId]) return;
    setReorderIndices((prev) => {
      const currentList = prev[exId] || [];
      if (currentList.includes(chipIdx)) return prev;
      const nextList = [...currentList, chipIdx];
      const nextWords = nextList.map((i) => scrambledWords[i]);
      setReorderState((rPrev) => ({ ...rPrev, [exId]: nextWords }));
      setUserAnswers((uPrev) => ({ ...uPrev, [exId]: nextWords.join(' ') }));
      return { ...prev, [exId]: nextList };
    });
  };

  const handleRemoveWordReorder = (exId: string, trayIdx: number, scrambledWords: string[]) => {
    if (checkedStatus[exId]) return;
    setReorderIndices((prev) => {
      const currentList = prev[exId] || [];
      const nextList = currentList.filter((_, idx) => idx !== trayIdx);
      const nextWords = nextList.map((i) => scrambledWords[i]);
      setReorderState((rPrev) => ({ ...rPrev, [exId]: nextWords }));
      setUserAnswers((uPrev) => ({ ...uPrev, [exId]: nextWords.join(' ') }));
      return { ...prev, [exId]: nextList };
    });
  };

  const handleCheckAnswer = (exId: string) => {
    setCheckedStatus((prev) => ({ ...prev, [exId]: true }));
    onCompleteLesson();
  };

  const handleResetExercise = (exId: string) => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[exId];
      return copy;
    });
    setCheckedStatus((prev) => {
      const copy = { ...prev };
      delete copy[exId];
      return copy;
    });
    setReorderState((prev) => {
      const copy = { ...prev };
      delete copy[exId];
      return copy;
    });
    setReorderIndices((prev) => {
      const copy = { ...prev };
      delete copy[exId];
      return copy;
    });
    setExerciseShuffleKeys((prev) => ({
      ...prev,
      [exId]: (prev[exId] || 0) + 1,
    }));
  };

  // Score statistics
  const totalCount = exercises.length;
  let correctCount = 0;
  exercises.forEach((ex) => {
    if (checkedStatus[ex.id]) {
      const ans = userAnswers[ex.id];
      if (
        ans &&
        ans.trim().toLowerCase() ===
          (typeof ex.correctAnswer === 'string' ? ex.correctAnswer.trim().toLowerCase() : '')
      ) {
        correctCount += 1;
      }
    }
  });

  const isCurrentChecked = checkedStatus[currentExercise?.id];
  const currentStudentAns = userAnswers[currentExercise?.id];
  const isCurrentCorrect =
    currentStudentAns &&
    currentStudentAns.trim().toLowerCase() ===
      (typeof currentExercise?.correctAnswer === 'string'
        ? currentExercise.correctAnswer.trim().toLowerCase()
        : '');

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn" dir="rtl">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>التمارين التفاعلية الشاملة (تمرين {currentExIndex + 1} من {totalCount})</span>
          </div>

          <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
            النتيجة: {correctCount} / {totalCount}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 font-arabic">
          اختبر فهمك وتطبيقك لزمن ({tense.nameAr})
        </h2>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-arabic">
          أجب عن التمارين بتركيز، واقرأ التوضيح الفوري لمعرفة سبب صحة أو خطأ كل خيار.
        </p>

        {/* Exercises Step Dots */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 mt-4">
          {exercises.map((ex, idx) => {
            const isDone = checkedStatus[ex.id];
            const isRight =
              isDone &&
              userAnswers[ex.id]?.trim().toLowerCase() ===
                (typeof ex.correctAnswer === 'string' ? ex.correctAnswer.trim().toLowerCase() : '');
            const isSelected = currentExIndex === idx;

            let dotCls = 'bg-slate-100 text-slate-600 border-slate-200';
            if (isSelected) {
              dotCls = 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-200 font-bold';
            } else if (isDone) {
              dotCls = isRight
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold'
                : 'bg-rose-100 text-rose-800 border-rose-300 font-bold';
            }

            return (
              <button
                key={ex.id || idx}
                onClick={() => setCurrentExIndex(idx)}
                className={`w-7 h-7 rounded-lg text-xs flex items-center justify-center font-mono border transition ${dotCls}`}
                title={`التمرين ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Exercise Card (Focused Single View) */}
      {currentExercise && (
        <div
          className={`bg-white border rounded-2xl p-6 sm:p-7 shadow-xs space-y-4 transition ${
            isCurrentChecked
              ? isCurrentCorrect
                ? 'border-emerald-300 bg-emerald-50/10'
                : 'border-rose-300 bg-rose-50/10'
              : 'border-slate-200/90'
          }`}
        >
          {/* Question Title */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold font-mono shrink-0">
                {currentExIndex + 1}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-arabic">
                {currentExercise.questionAr}
              </h3>
            </div>

            {isCurrentChecked && (
              <button
                onClick={() => handleResetExercise(currentExercise.id)}
                className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 font-arabic transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة المحاولة</span>
              </button>
            )}
          </div>

          {/* Prompt Sentence if exists */}
          {currentExercise.promptSentence && (
            <div className="bg-[#1E293B] text-white p-4 rounded-xl font-sans text-base sm:text-lg font-bold text-left tracking-wide flex items-center justify-between" dir="ltr">
              <span>{currentExercise.promptSentence}</span>
              <button
                onClick={() => playEnglishAudio(currentExercise.promptSentence || '')}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                title="استمع للجملة"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* MCQ / Fill blank Options */}
          {currentExercise.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1" dir="ltr">
              {currentExercise.options.map((opt, oIdx) => {
                const isSelected = currentStudentAns === opt;
                let btnClass = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-blue-50/60 hover:border-blue-300';

                if (isCurrentChecked) {
                  if (opt === currentExercise.correctAnswer) {
                    btnClass = 'bg-emerald-600 border-emerald-600 text-white font-bold shadow-xs';
                  } else if (isSelected && !isCurrentCorrect) {
                    btnClass = 'bg-rose-600 border-rose-600 text-white font-bold';
                  } else {
                    btnClass = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  btnClass = 'bg-blue-600 border-blue-600 text-white font-bold shadow-xs';
                }

                return (
                  <button
                    key={oIdx}
                    disabled={isCurrentChecked}
                    onClick={() => handleSelectOption(currentExercise.id, opt)}
                    className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition text-left flex items-center justify-between ${btnClass}`}
                  >
                    <span>{opt}</span>
                    {isCurrentChecked && opt === currentExercise.correctAnswer && (
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    )}
                    {isCurrentChecked && isSelected && !isCurrentCorrect && (
                      <XCircle className="w-4 h-4 text-white shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Word Reorder Exercise */}
          {currentExercise.type === 'reorder' && currentExercise.scrambledWords && (
            <div className="space-y-3 pt-1">
              {/* Selected Words Tray */}
              <div className="min-h-[48px] p-3 bg-[#0F172A] text-white rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center" dir="ltr">
                {(reorderIndices[currentExercise.id] || []).length === 0 ? (
                  <span className="text-xs text-slate-400 italic">انقر على الكلمات بالأسفل لترتيبها هنا...</span>
                ) : (
                  (reorderIndices[currentExercise.id] || []).map((chipIdx, trayIdx) => (
                    <span
                      key={trayIdx}
                      onClick={() => handleRemoveWordReorder(currentExercise.id, trayIdx, currentExercise.scrambledWords!)}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-blue-500 transition shadow-xs"
                      title="انقر لإزالة الكلمة"
                    >
                      {currentExercise.scrambledWords![chipIdx]}
                    </span>
                  ))
                )}
              </div>

              {/* Scrambled Word Pills */}
              <div className="flex flex-wrap gap-2" dir="ltr">
                {currentExercise.scrambledWords.map((w, wIdx) => {
                  const isPicked = (reorderIndices[currentExercise.id] || []).includes(wIdx);
                  return (
                    <button
                      key={wIdx}
                      disabled={isCurrentChecked || isPicked}
                      onClick={() => handlePickWordReorder(currentExercise.id, wIdx, currentExercise.scrambledWords!)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                        isPicked
                          ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed opacity-50 line-through'
                          : 'bg-white border-slate-300 text-slate-800 hover:border-blue-500 hover:text-blue-600 shadow-2xs'
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
          {!isCurrentChecked && (
            <div className="pt-2">
              <button
                disabled={!currentStudentAns}
                onClick={() => handleCheckAnswer(currentExercise.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-xs font-arabic ${
                  currentStudentAns
                    ? 'bg-blue-600 hover:bg-blue-700 text-white active:scale-98'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                تحقق من الإجابة
              </button>
            </div>
          )}

          {/* Feedback & Detailed Arabic Explanation */}
          {isCurrentChecked && (
            <div
              className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed border animate-fadeIn font-arabic ${
                isCurrentCorrect
                  ? 'bg-emerald-50 text-emerald-950 border-emerald-200'
                  : 'bg-rose-50 text-rose-950 border-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1.5">
                {isCurrentCorrect ? (
                  <span className="text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> إجابة صحيحة وممتازة!
                  </span>
                ) : (
                  <span className="text-rose-700 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> إجابة غير دقيقة. الإجابة الصحيحة هي: "{currentExercise.correctAnswer}"
                  </span>
                )}
              </div>
              <p className="text-slate-700">
                <strong>الشرح:</strong> {currentExercise.explanationAr}
              </p>
            </div>
          )}

          {/* Exercise Step Navigation within Practice */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              disabled={currentExIndex === 0}
              onClick={() => setCurrentExIndex((prev) => Math.max(0, prev - 1))}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-arabic transition ${
                currentExIndex === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              التمرين السابق
            </button>

            <button
              disabled={currentExIndex === totalCount - 1}
              onClick={() => setCurrentExIndex((prev) => Math.min(totalCount - 1, prev + 1))}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-arabic transition ${
                currentExIndex === totalCount - 1
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              التمرين التالي ({currentExIndex + 2} من {totalCount})
            </button>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="pt-2 flex items-center justify-between">
        <button
          onClick={onPrev}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition font-arabic"
        >
          <ArrowRight className="w-4 h-4" />
          <span>السابق</span>
        </button>

        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#214ecf] hover:bg-[#1a3eb0] text-white text-xs sm:text-sm font-bold shadow-sm transition active:scale-98 font-arabic"
        >
          <span>الانتقال إلى تكوين الجمل الحر</span>
          <ArrowLeft className="w-4 h-4 rotate-180" />
        </button>
      </div>
    </div>
  );
};
