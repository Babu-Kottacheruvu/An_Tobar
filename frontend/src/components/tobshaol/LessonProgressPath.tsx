interface LessonStep {
  id: string;
  label: string;
}

interface LessonProgressPathProps {
  steps: LessonStep[];
  onSelect: (targetId: string) => void;
  ariaLabel: string;
}

/**
 * A connected step path showing the order of lessons in a unit. This is a
 * sequence map, not a per-user completion tracker - the site has no login,
 * so it never claims to know which lessons a visitor has finished.
 */
export function LessonProgressPath({ steps, onSelect, ariaLabel }: LessonProgressPathProps) {
  return (
    <ol aria-label={ariaLabel} className="flex flex-wrap items-center gap-x-2 gap-y-4 sm:gap-x-3">
      {steps.map((step, index) => (
        <li key={step.id} className="flex items-center gap-x-2 sm:gap-x-3">
          <button
            type="button"
            onClick={() => onSelect(step.id)}
            className="flex flex-col items-center gap-1.5 rounded-lg px-1 py-1 hover:opacity-80"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teen-pink-600 text-base font-black text-white sm:h-12 sm:w-12">
              {index + 1}
            </span>
            <span className="text-xs font-bold text-white/70">{step.label}</span>
          </button>
          {index < steps.length - 1 && (
            <span className="h-0.5 w-6 shrink-0 bg-white/20 sm:w-10" aria-hidden="true" />
          )}
        </li>
      ))}
    </ol>
  );
}
