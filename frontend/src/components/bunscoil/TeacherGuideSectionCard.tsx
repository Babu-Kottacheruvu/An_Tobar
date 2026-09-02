import { useLanguage } from "../../i18n/useLanguage";
import type { TeacherGuideSection } from "../../data/bunscoil/teacherGuideSections";

interface TeacherGuideSectionCardProps {
  section: TeacherGuideSection;
  index: number;
  onSelect: (index: number) => void;
}

export function TeacherGuideSectionCard({ section, index, onSelect }: TeacherGuideSectionCardProps) {
  const { lang } = useLanguage();
  const Icon = section.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      className="flex h-full flex-col items-start gap-3 rounded-xl border border-brand-navy-800/12 bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-md"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-green-800 text-white">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="text-base font-black text-brand-navy-900">{section.title[lang]}</h3>
      <p className="text-sm leading-relaxed text-brand-navy-800/80">{section.description[lang]}</p>
      <ul className="mt-auto space-y-1 pt-2 text-xs font-semibold text-brand-navy-800/60">
        {section.bullets.map((bullet) => (
          <li key={bullet.en} className="flex items-center gap-1.5">
            <span className="h-1 w-1 shrink-0 rounded-full bg-brand-green-700" />
            {bullet[lang]}
          </li>
        ))}
      </ul>
    </button>
  );
}
