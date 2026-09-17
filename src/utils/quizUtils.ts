/**
 * Utilities for quiz randomization and shuffling to prevent predictable option patterns.
 */

/**
 * Fisher-Yates array shuffle that returns a new array with randomly reordered elements.
 */
export function shuffleArray<T>(array: T[]): T[] {
  if (!array || array.length <= 1) return [...(array || [])];
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

/**
 * Shuffles MCQ options and returns both the shuffled array and the new correct index.
 */
export function shuffleOptionsWithIndex(
  options: string[],
  originalCorrectIndex: number
): { shuffledOptions: string[]; newCorrectIndex: number } {
  if (!options || options.length <= 1) {
    return { shuffledOptions: [...(options || [])], newCorrectIndex: 0 };
  }
  const correctOption = options[originalCorrectIndex] ?? options[0];
  const shuffled = shuffleArray(options);
  const newIndex = shuffled.indexOf(correctOption);
  return {
    shuffledOptions: shuffled,
    newCorrectIndex: newIndex >= 0 ? newIndex : 0,
  };
}
