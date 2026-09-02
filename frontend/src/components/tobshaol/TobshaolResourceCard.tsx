import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import type { TobshaolResource } from "../../data/tobshaol/resources";
import { tobshaolYearGroups } from "../../data/tobshaol/yearGroups";
import { tobshaolTopics } from "../../data/tobshaol/topics";
import { tobshaolResourceTypes } from "../../data/tobshaol/resourceTypes";
import { DocumentIcon } from "../icons";

const ACCENT_BY_TYPE: Record<string, string> = {
  ppt: "bg-teen-pink-600",
  word: "bg-teen-violet-600",
  posters: "bg-teen-cyan-600",
  worksheets: "bg-teen-yellow-400",
};

export function TobshaolResourceCard({ resource }: { resource: TobshaolResource }) {
  const { lang, t } = useLanguage();
  const yearGroup = tobshaolYearGroups.find((option) => option.id === resource.yearGroup);
  const topic = tobshaolTopics.find((option) => option.id === resource.topic);
  const resourceType = tobshaolResourceTypes.find((option) => option.id === resource.resourceType);
  const TypeIcon = resourceType?.icon ?? DocumentIcon;
  const accent = ACCENT_BY_TYPE[resource.resourceType] ?? "bg-teen-pink-600";

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-teen-surface">
      <div className={`h-1.5 w-full ${accent}`} aria-hidden="true" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
            <TypeIcon className="h-5 w-5" />
          </span>
          {resourceType && (
            <span className="text-xs font-black uppercase tracking-wide text-white/50">
              {resourceType.label[lang]}
            </span>
          )}
        </div>

        <h3 className="mt-4 text-lg font-black leading-tight text-white">
          <Link to={`/iar-bhunscoil/acmhainni/${resource.slug}`} className="rounded after:absolute after:inset-0">
            {lang === "ga" ? resource.titleGa : resource.titleEn}
          </Link>
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">
          {resource.description[lang]}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
          {yearGroup && (
            <li className="rounded-full bg-white/10 px-2.5 py-1 text-white/80">
              {yearGroup.label[lang]}
            </li>
          )}
          {topic && (
            <li className="rounded-full bg-white/10 px-2.5 py-1 text-white/80">{topic.label[lang]}</li>
          )}
        </ul>

        <p className="mt-4 text-xs font-semibold text-white/40">
          {resource.author} · {t("bunscoil.card.updated")}{" "}
          {new Date(resource.updatedDate).toLocaleDateString(lang === "ga" ? "ga-IE" : "en-IE", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </article>
  );
}
