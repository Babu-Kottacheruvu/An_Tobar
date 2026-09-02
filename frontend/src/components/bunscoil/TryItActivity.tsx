import { useMemo, useState } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import { vocabularyWords, type VocabWord } from "../../data/bunscoil/vocabularyWords";
import { CheckIcon, CloseIcon } from "../icons";

function shuffle<T>(list: T[]): T[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildQuestion() {
  const word = vocabularyWords[Math.floor(Math.random() * vocabularyWords.length)];
  const distractors = shuffle(vocabularyWords.filter((item) => item.id !== word.id)).slice(0, 2);
  const options = shuffle([word, ...distractors]);
  return { word, options };
}

export function TryItActivity() {
  const { t } = useLanguage();
  const [question, setQuestion] = useState(buildQuestion);
  const [status, setStatus] = useState<"idle" | "correct" | "incorrect">("idle");
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: VocabWord) => {
    setSelected(option.id);
    setStatus(option.id === question.word.id ? "correct" : "incorrect");
  };

  const handleNext = () => {
    setQuestion(buildQuestion());
    setStatus("idle");
    setSelected(null);
  };

  const feedbackId = useMemo(() => "tryit-feedback", []);

  return (
    <div className="rounded-2xl border-2 border-brand-navy-800/10 bg-white p-6 sm:p-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <span role="img" aria-hidden="true" className="text-6xl">
          {question.word.emoji}
        </span>
        <p className="text-2xl font-black text-brand-navy-900">{question.word.irish}</p>
        <p className="text-base font-semibold text-brand-navy-800/70">
          {t("kidsCorner.tryItPrompt")}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {question.options.map((option) => {
          const isSelected = selected === option.id;
          const isCorrectOption = option.id === question.word.id;
          const showCorrect = status !== "idle" && isCorrectOption;
          const showIncorrect = isSelected && status === "incorrect";

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option)}
              disabled={status === "correct"}
              className={`rounded-xl border-2 px-4 py-4 text-base font-bold transition-colors ${
                showCorrect
                  ? "border-brand-green-700 bg-brand-green-50 text-brand-green-800"
                  : showIncorrect
                    ? "border-red-300 bg-red-50 text-red-600"
                    : "border-brand-navy-800/15 text-brand-navy-900 hover:border-brand-green-600"
              }`}
            >
              {option.english}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex min-h-12 flex-col items-center gap-3" aria-live="polite" id={feedbackId}>
        {status === "correct" && (
          <p className="flex items-center gap-2 text-lg font-black text-brand-green-800">
            <CheckIcon className="h-6 w-6" />
            {t("kidsCorner.correct")}
          </p>
        )}
        {status === "incorrect" && (
          <p className="flex items-center gap-2 text-lg font-black text-red-600">
            <CloseIcon className="h-6 w-6" />
            {t("kidsCorner.incorrect")}
          </p>
        )}
        {status === "correct" && (
          <button
            type="button"
            onClick={handleNext}
            className="rounded-full bg-brand-green-700 px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800"
          >
            {t("kidsCorner.nextQuestion")}
          </button>
        )}
      </div>
    </div>
  );
}
