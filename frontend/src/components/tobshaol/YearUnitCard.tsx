import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import type { YearUnit } from "../../data/tobshaol/yearUnits";

interface YearUnitCardProps {
  unit: YearUnit;
  onTopicSelect: (topicId: string) => void;
  onScrollToSearch: () => void;
  /** If set, the card links straight to the unit's own dedicated page instead of filtering/scrolling. */
  pagePath?: string;
}

export function YearUnitCard({ unit, onTopicSelect, onScrollToSearch, pagePath }: YearUnitCardProps) {
  const { lang } = useLanguage();
  const Icon = unit.icon;

  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-teen-cyan-400">
        <Icon className="h-5 w-5" />
      </span>
      <span className="mt-3 block text-lg font-black text-white">
        {lang === "ga" ? unit.titleGa : unit.titleEn}
      </span>
      <span className="mt-2 block text-sm leading-relaxed text-white/70">
        {unit.description[lang]}
      </span>
    </>
  );

  const className =
    "flex h-full flex-col items-start rounded-xl border border-white/10 bg-teen-surface p-5 text-left shadow-sm transition-colors hover:border-teen-pink-400";

  if (pagePath) {
    return (
      <Link to={pagePath} className={className}>
        {content}
      </Link>
    );
  }

  if (unit.action.type === "link") {
    return (
      <Link to={unit.action.path} className={className}>
        {content}
      </Link>
    );
  }

  const handleClick = () => {
    if (unit.action.type === "topic") {
      onTopicSelect(unit.action.topicId);
    } else {
      onScrollToSearch();
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {content}
    </button>
  );
}
