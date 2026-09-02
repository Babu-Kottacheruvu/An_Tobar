import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import type { Resource } from "../../data/resources";
import { levelOptions, resourceTypeOptions, subjectOptions } from "../../data/resources";
import { DocumentIcon, PlayIcon, GridIcon as GameIcon } from "../icons";

const typeIcons: Record<string, typeof DocumentIcon> = {
  fisean: PlayIcon,
  cluiche: GameIcon,
};

interface ResourceCardProps {
  resource: Resource;
  onQuickView?: (resource: Resource) => void;
}

export function ResourceCard({ resource, onQuickView }: ResourceCardProps) {
  const { lang, t } = useLanguage();
  const Icon = typeIcons[resource.type] ?? DocumentIcon;
  const level = levelOptions.find((option) => option.id === resource.level);
  const subject = subjectOptions.find((option) => option.id === resource.subject);
  const type = resourceTypeOptions.find((option) => option.id === resource.type);

  return (
    <article className="relative flex h-full flex-col rounded-lg border border-brand-navy-800/12 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-2 px-5 pt-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-green-50 text-brand-green-800">
          <Icon className="h-5 w-5" />
        </span>
        {resource.featured && (
          <span className="rounded-full bg-brand-gold-50 px-2.5 py-1 text-xs font-bold text-brand-gold-600">
            {t("common.featured")}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
        <h3 className="text-base font-bold text-brand-navy-900">
          <Link
            to={`/acmhainni/${resource.slug}`}
            className="rounded after:absolute after:inset-0"
          >
            {resource.title[lang]}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-navy-800/80">
          {resource.description[lang]}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
          {level && (
            <li className="rounded-full bg-brand-navy-50 px-2.5 py-1 text-brand-navy-800">
              {level.label[lang]}
            </li>
          )}
          {subject && (
            <li className="rounded-full bg-brand-navy-50 px-2.5 py-1 text-brand-navy-800">
              {subject.label[lang]}
            </li>
          )}
          {type && (
            <li className="rounded-full bg-brand-navy-50 px-2.5 py-1 text-brand-navy-800">
              {type.label[lang]}
            </li>
          )}
        </ul>

        {onQuickView && (
          <button
            type="button"
            onClick={() => onQuickView(resource)}
            className="relative z-10 mt-4 self-start rounded text-sm font-bold text-brand-green-800 underline-offset-2 hover:underline"
          >
            {t("common.viewResource")}
          </button>
        )}
      </div>
    </article>
  );
}
