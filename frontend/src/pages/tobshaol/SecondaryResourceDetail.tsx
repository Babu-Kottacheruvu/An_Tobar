import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import { tobshaolResources } from "../../data/tobshaol/resources";
import { tobshaolYearGroups } from "../../data/tobshaol/yearGroups";
import { tobshaolTopics } from "../../data/tobshaol/topics";
import { tobshaolResourceTypes } from "../../data/tobshaol/resourceTypes";
import { Breadcrumbs, type Crumb } from "../../components/layout/Breadcrumbs";
import { TobshaolResourceCard } from "../../components/tobshaol/TobshaolResourceCard";
import { DocumentIcon, DownloadIcon, ShareIcon } from "../../components/icons";
import { NotFound } from "../NotFound";

export function SecondaryResourceDetail() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const resource = tobshaolResources.find((item) => item.slug === slug);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    if (!shareCopied) return;
    const timeout = window.setTimeout(() => setShareCopied(false), 3000);
    return () => window.clearTimeout(timeout);
  }, [shareCopied]);

  if (!resource) return <NotFound />;

  const yearGroup = tobshaolYearGroups.find((option) => option.id === resource.yearGroup);
  const topic = tobshaolTopics.find((option) => option.id === resource.topic);
  const resourceType = tobshaolResourceTypes.find((option) => option.id === resource.resourceType);
  const TypeIcon = resourceType?.icon ?? DocumentIcon;

  const related = tobshaolResources
    .filter((item) => item.id !== resource.id && item.topic === resource.topic)
    .slice(0, 4);

  const breadcrumbItems: Crumb[] = [{ label: "#Tobshaol", path: "/iar-bhunscoil" }];
  if (resource.yearGroup === "bliain-1" && yearGroup) {
    breadcrumbItems.push({ label: yearGroup.label[lang], path: "/iar-bhunscoil/bliain-1" });
  }
  breadcrumbItems.push({ label: lang === "ga" ? resource.titleGa : resource.titleEn });

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
    } catch {
      // Clipboard API unavailable - non-critical, fail silently
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs variant="dark" items={breadcrumbItems} />

      <div className="mt-8 flex items-start gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/10 text-teen-cyan-400">
          <TypeIcon className="h-7 w-7" />
        </span>
        <div>
          <h1 className="text-3xl font-black text-white sm:text-4xl">
            {lang === "ga" ? resource.titleGa : resource.titleEn}
          </h1>
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-2 text-xs font-bold">
        {resourceType && (
          <li className="rounded-full bg-white/10 px-3 py-1.5 text-white/80">{resourceType.label[lang]}</li>
        )}
        {yearGroup && (
          <li className="rounded-full bg-white/10 px-3 py-1.5 text-white/80">{yearGroup.label[lang]}</li>
        )}
        {topic && <li className="rounded-full bg-white/10 px-3 py-1.5 text-white/80">{topic.label[lang]}</li>}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="flex items-center gap-2 rounded-md bg-teen-pink-600 px-5 py-3 text-sm font-bold text-white hover:bg-teen-pink-600/90"
        >
          <DownloadIcon className="h-4 w-4" />
          {t("common.download")}
        </button>
        <div className="relative">
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-2 rounded-md border border-white/20 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
          >
            <ShareIcon className="h-4 w-4" />
            {t("bunscoil.detail.share")}
          </button>
          <span
            role="status"
            aria-live="polite"
            className={`absolute left-0 top-full mt-1 whitespace-nowrap text-xs font-semibold text-teen-cyan-400 transition-opacity ${
              shareCopied ? "opacity-100" : "opacity-0"
            }`}
          >
            {shareCopied ? t("bunscoil.detail.shareCopied") : ""}
          </span>
        </div>
      </div>

      <p className="mt-8 text-base leading-relaxed text-white/80">{resource.description[lang]}</p>

      <div className="mt-10 rounded-xl border border-white/10 bg-teen-surface p-6 sm:p-8">
        <h2 className="text-lg font-black text-white">{t("tobshaol.detail.resourceInfo")}</h2>
        <dl className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-white/70">{t("tobshaol.filters.yearGroup")}</dt>
            <dd className="text-white/85">{yearGroup?.label[lang]}</dd>
          </div>
          <div>
            <dt className="font-semibold text-white/70">{t("tobshaol.filters.topic")}</dt>
            <dd className="text-white/85">{topic?.label[lang]}</dd>
          </div>
          <div>
            <dt className="font-semibold text-white/70">{t("tobshaol.filters.resourceType")}</dt>
            <dd className="text-white/85">{resourceType?.label[lang]}</dd>
          </div>
          <div>
            <dt className="font-semibold text-white/70">{t("bunscoil.card.author")}</dt>
            <dd className="text-white/85">{resource.author}</dd>
          </div>
          <div>
            <dt className="font-semibold text-white/70">{t("bunscoil.card.updated")}</dt>
            <dd className="text-white/85">
              {new Date(resource.updatedDate).toLocaleDateString(lang === "ga" ? "ga-IE" : "en-IE", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </dd>
          </div>
        </dl>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-black text-white">{t("bunscoil.detail.relatedResources")}</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {related.map((item) => (
              <TobshaolResourceCard key={item.id} resource={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
