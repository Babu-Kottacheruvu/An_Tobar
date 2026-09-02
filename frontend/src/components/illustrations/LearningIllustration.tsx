interface LearningIllustrationProps {
  label: string;
  className?: string;
}

/**
 * A bespoke, brand-coloured illustration of a younger (primary) learner and
 * an older (secondary) learner sharing a book with a shamrock motif.
 * Hand-drawn as inline SVG so no external image assets are required.
 */
export function LearningIllustration({ label, className = "" }: LearningIllustrationProps) {
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 480 340"
      className={className}
    >
      <ellipse cx="240" cy="300" rx="210" ry="24" fill="#0b664130" />

      {/* sun */}
      <circle cx="410" cy="60" r="34" fill="#e2b93b" opacity="0.9" />

      {/* ground */}
      <path d="M0 300 Q240 260 480 300 V340 H0 Z" fill="#cfe8dc" />

      {/* open book */}
      <path d="M120 250 240 232 360 250 360 200 240 182 120 200 Z" fill="#ffffff" stroke="#142744" strokeWidth="3" strokeLinejoin="round" />
      <path d="M240 182 V232" stroke="#142744" strokeWidth="3" />
      <path d="M140 208 210 198 M140 222 210 213 M270 198 340 208 M270 213 340 222" stroke="#0b6641" strokeWidth="3" strokeLinecap="round" />

      {/* shamrock on book */}
      <g transform="translate(232,150)">
        <circle cx="-6" cy="-4" r="8" fill="#0e7a4f" />
        <circle cx="6" cy="-4" r="8" fill="#0e7a4f" />
        <circle cx="0" cy="6" r="8" fill="#0e7a4f" />
        <path d="M0 12 L0 26" stroke="#0b6641" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* primary learner - seated, smaller */}
      <g transform="translate(120,150)">
        <circle cx="0" cy="0" r="26" fill="#f3c98a" />
        <path d="M-26 -6 A26 22 0 0 1 26 -6 L26 -16 A26 16 0 0 0 -26 -16 Z" fill="#142744" />
        <path d="M-34 70 Q-34 30 0 30 Q34 30 34 70 Z" fill="#c9a227" />
        <path d="M-20 70 L-24 100 M20 70 L24 100" stroke="#142744" strokeWidth="8" strokeLinecap="round" />
      </g>

      {/* secondary learner - standing, taller */}
      <g transform="translate(360,132)">
        <circle cx="0" cy="0" r="24" fill="#e3ab7c" />
        <path d="M-30 88 Q-30 20 0 20 Q30 20 30 88 Z" fill="#1f3a5f" />
        <path d="M-16 88 L-18 120 M16 88 L18 120" stroke="#142744" strokeWidth="8" strokeLinecap="round" />
        <path d="M-30 40 Q-46 60 -34 76" stroke="#1f3a5f" strokeWidth="10" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}
