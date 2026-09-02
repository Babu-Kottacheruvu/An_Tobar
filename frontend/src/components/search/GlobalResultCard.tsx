import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import type { GlobalResult } from "../../data/globalSearch";
import { globalResourceTypeOptions, globalSchoolLevelOptions } from "../../data/globalSearch";
import { DocumentIcon, PictureIcon, PlayIcon, PresentationIcon, SoundIcon, GridIcon as GameIcon } from "../icons";

const TYPE_ICONS = {
  pictures: PictureIcon,
  video: PlayIcon,
  audio: SoundIcon,
  presentation: PresentationIcon,
  document: DocumentIcon,
  worksheet: DocumentIcon,
  game: GameIcon,
} as const;

interface GlobalResultCardProps {
  result: GlobalResult;
  layout: "grid" | "list";
}

export function GlobalResultCard({ result, layout }: GlobalResultCardProps) {
  const { lang, t } = useLanguage();
  const typeOption = globalResourceTypeOptions.find((option) => option.id === result.resourceType);
  const schoolLevel = globalSchoolLevelOptions.find((option) => option.id === result.schoolLevel);
  const Icon = TYPE_ICONS[result.resourceType];

  const titleNode = (
    <h3 className={layout === "list" ? "text-base font-bold text-brand-navy-900" : "text-base font-bold text-brand-navy-900"}>
      {result.detailPath ? (
        <Link to={result.detailPath} className="rounded after:absolute after:inset-0">
          {lang === "ga" ? result.titleGa : result.titleEn}
        </Link>
      ) : lang === "ga" ? (
        result.titleGa
      ) : (
        result.titleEn
      )}
    </h3>
  );

  const meta = (
    <ul className="flex flex-wrap gap-2 text-xs font-bold">
      {typeOption && (
        <li className="rounded-full bg-brand-green-50 px-2.5 py-1 text-brand-green-800">
          {typeOption.label[lang]}
        </li>
      )}
      {schoolLevel && (
        <li className="rounded-full bg-brand-navy-50 px-2.5 py-1 text-brand-navy-800">
          {schoolLevel.label[lang]}
        </li>
      )}
      {result.yearGroup && (
        <li className="rounded-full bg-brand-navy-50 px-2.5 py-1 text-brand-navy-800">
          {result.yearGroup.label[lang]}
        </li>
      )}
      <li className="rounded-full bg-brand-gold-50 px-2.5 py-1 text-brand-gold-600">
        {result.topic.label[lang]}
      </li>
    </ul>
  );

  const footer = (
    <p className="text-xs font-semibold text-brand-navy-800/50">
      {result.language[lang]} · {t("bunscoil.card.updated")}{" "}
      {new Date(result.updatedDate).toLocaleDateString(lang === "ga" ? "ga-IE" : "en-IE", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}
    </p>
  );

  if (layout === "list") {
    return (
      <article className="relative flex gap-4 rounded-lg border border-brand-navy-800/12 bg-white p-5 shadow-sm">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-green-50 text-brand-green-800">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          {titleNode}
          <p className="mt-2 text-sm leading-relaxed text-brand-navy-800/80">{result.description[lang]}</p>
          <div className="mt-3">{meta}</div>
          <div className="mt-2">{footer}</div>
        </div>
      </article>
    );
  }

  return (
    <article className="relative flex h-full flex-col rounded-lg border border-brand-navy-800/12 bg-white p-5 shadow-sm">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green-50 text-brand-green-800">
        <Icon className="h-5 w-5" />
      </span>
      <div className="mt-3">{titleNode}</div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-navy-800/80">
        {result.description[lang]}
      </p>
      <div className="mt-3">{meta}</div>
      <div className="mt-3">{footer}</div>
    </article>
  );
}
