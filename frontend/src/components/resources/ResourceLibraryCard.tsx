import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import type { GlobalResult } from "../../data/globalSearch";
import { globalResourceTypeOptions, globalSchoolLevelOptions } from "../../data/globalSearch";
import { resourceLibraryCategories } from "../../data/resourceLibraryCategories";
import { matchesCategory } from "../../data/resourceLibraryFilters";
import {
  DocumentIcon,
  DownloadIcon,
  EyeIcon,
  PictureIcon,
  PlayIcon,
  PresentationIcon,
  SoundIcon,
  GridIcon as GameIcon,
} from "../icons";

const TYPE_ICONS = {
  pictures: PictureIcon,
  video: PlayIcon,
  audio: SoundIcon,
  presentation: PresentationIcon,
  document: DocumentIcon,
  worksheet: DocumentIcon,
  game: GameIcon,
} as const;

interface ResourceLibraryCardProps {
  result: GlobalResult;
  onView: (result: GlobalResult) => void;
}

export function ResourceLibraryCard({ result, onView }: ResourceLibraryCardProps) {
  const { lang, t } = useLanguage();
  const typeOption = globalResourceTypeOptions.find((option) => option.id === result.resourceType);
  const schoolLevel = globalSchoolLevelOptions.find((option) => option.id === result.schoolLevel);
  const matchingCategories = resourceLibraryCategories.filter((category) => matchesCategory(result, category));
  const Icon = TYPE_ICONS[result.resourceType];

  const handleDownload = async () => {
    const { downloadResourcePdf } = await import("../../utils/downloadResourcePdf");
    downloadResourcePdf(
      {
        kicker: typeOption?.label[lang],
        title: lang === "ga" ? result.titleGa : result.titleEn,
        description: result.description[lang],
        meta: [
          typeOption && { label: t("common.type"), value: typeOption.label[lang] },
          schoolLevel && { label: t("common.level"), value: schoolLevel.label[lang] },
          { label: t("search.yearGroup"), value: result.topic.label[lang] },
        ].filter((row): row is { label: string; value: string } => Boolean(row)),
      },
      `${result.id}.pdf`,
      lang,
    );
  };

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-lg border border-brand-navy-800/12 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div
        className="flex h-20 items-center justify-center bg-linear-to-br from-brand-green-700 to-brand-navy-900 text-white"
        aria-hidden="true"
      >
        <Icon className="h-8 w-8" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold text-brand-navy-900">
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

        <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-navy-800/80">
          {result.description[lang]}
        </p>

        <ul className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
          {typeOption && (
            <li className="rounded-full bg-brand-green-50 px-2.5 py-1 text-brand-green-800">
              {typeOption.label[lang]}
            </li>
          )}
          {matchingCategories.slice(0, 2).map((category) => (
            <li key={category.id} className="rounded-full bg-brand-gold-50 px-2.5 py-1 text-brand-gold-600">
              {category.label[lang]}
            </li>
          ))}
          {schoolLevel && (
            <li className="rounded-full bg-brand-navy-50 px-2.5 py-1 text-brand-navy-800">
              {schoolLevel.label[lang]}
            </li>
          )}
          <li className="rounded-full bg-brand-navy-50 px-2.5 py-1 text-brand-navy-800">
            {result.topic.label[lang]}
          </li>
        </ul>

        <div className="relative z-10 mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => onView(result)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-brand-green-700 px-3 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800"
          >
            <EyeIcon className="h-4 w-4" />
            {t("bunscoil.card.view")}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-brand-navy-800/25 px-3 py-2.5 text-sm font-bold text-brand-navy-900 hover:bg-brand-navy-50"
          >
            <DownloadIcon className="h-4 w-4" />
            {t("common.download")}
          </button>
        </div>
      </div>
    </article>
  );
}
