export interface VocabWord {
  id: string;
  irish: string;
  english: string;
  emoji: string;
}

/**
 * A small, simple vocabulary bank used for the "Word of the Day" feature,
 * the browsable word gallery, and the "Try it!" matching activity.
 */
export const vocabularyWords: VocabWord[] = [
  { id: "madra", irish: "madra", english: "dog", emoji: "🐶" },
  { id: "cat", irish: "cat", english: "cat", emoji: "🐱" },
  { id: "teach", irish: "teach", english: "house", emoji: "🏠" },
  { id: "grian", irish: "grian", english: "sun", emoji: "☀️" },
  { id: "leabhar", irish: "leabhar", english: "book", emoji: "📖" },
  { id: "ull", irish: "úll", english: "apple", emoji: "🍎" },
  { id: "brog", irish: "bróg", english: "shoe", emoji: "👟" },
  { id: "cathaoir", irish: "cathaoir", english: "chair", emoji: "🪑" },
  { id: "bus", irish: "bus", english: "bus", emoji: "🚌" },
  { id: "leaba", irish: "leaba", english: "bed", emoji: "🛏️" },
  { id: "doras", irish: "doras", english: "door", emoji: "🚪" },
  { id: "realta", irish: "réalta", english: "star", emoji: "⭐" },
  { id: "banana", irish: "banana", english: "banana", emoji: "🍌" },
  { id: "rothar", irish: "rothar", english: "bicycle", emoji: "🚲" },
  { id: "ean", irish: "éan", english: "bird", emoji: "🐦" },
  { id: "bosca", irish: "bosca", english: "box", emoji: "📦" },
];

function dayOfYear(date: Date): number {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start;
  return Math.floor(diff / 86_400_000);
}

/** Deterministic "word of the day" - the same word all day, changing each day, no backend needed. */
export function getWordOfTheDay(date: Date = new Date()): VocabWord {
  const index = dayOfYear(date) % vocabularyWords.length;
  return vocabularyWords[index];
}
