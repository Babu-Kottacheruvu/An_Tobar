import { useLanguage } from "../../i18n/useLanguage";
import type { VocabWord } from "../../data/bunscoil/vocabularyWords";
import { SoundIcon } from "../icons";

interface VocabularyCardProps {
  word: VocabWord;
  size?: "large" | "normal";
}

function speak(irishWord: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(irishWord);
  utterance.lang = "ga-IE";
  utterance.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export function VocabularyCard({ word, size = "normal" }: VocabularyCardProps) {
  const { t } = useLanguage();
  const isLarge = size === "large";

  return (
    <div
      className={`flex flex-col items-center gap-3 rounded-2xl border-2 border-brand-navy-800/10 bg-white text-center shadow-sm ${
        isLarge ? "p-8 sm:p-10" : "p-6"
      }`}
    >
      <span
        role="img"
        aria-label={word.english}
        className={isLarge ? "text-7xl sm:text-8xl" : "text-5xl"}
      >
        {word.emoji}
      </span>
      <p className={`font-black text-brand-navy-900 ${isLarge ? "text-3xl sm:text-4xl" : "text-xl"}`}>
        {word.irish}
      </p>
      <p className={`font-semibold text-brand-navy-800/60 ${isLarge ? "text-lg" : "text-sm"}`}>
        {word.english}
      </p>
      <button
        type="button"
        onClick={() => speak(word.irish)}
        className={`flex items-center gap-2 rounded-full bg-brand-green-700 font-bold text-white hover:bg-brand-green-800 ${
          isLarge ? "px-6 py-3 text-base" : "px-4 py-2 text-sm"
        }`}
      >
        <SoundIcon className={isLarge ? "h-5 w-5" : "h-4 w-4"} />
        {t("kidsCorner.listen")}
      </button>
    </div>
  );
}
