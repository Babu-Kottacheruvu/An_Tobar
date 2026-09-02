import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import { primaryResources, type PrimaryResource } from "../../data/bunscoil/resources";
import { classLevels } from "../../data/bunscoil/classLevels";
import { themes } from "../../data/bunscoil/themes";
import { bunscoilResourceTypes } from "../../data/bunscoil/resourceTypes";
import { Breadcrumbs } from "../../components/layout/Breadcrumbs";
import { PrimaryResourcePreview } from "../../components/bunscoil/PrimaryResourcePreview";
import { PrimaryResourceCard } from "../../components/bunscoil/PrimaryResourceCard";
import { Modal } from "../../components/common/Modal";
import { ReportIssueForm } from "../../components/bunscoil/ReportIssueForm";
import { NotFound } from "../NotFound";
import { DocumentIcon, DownloadIcon, HeartIcon, ShareIcon } from "../../components/icons";

function useFavourites() {
  const [favourites, setFavourites] = useState<string[]>([]);
  const toggle = (id: string) =>
    setFavourites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  return { favourites, toggle };
}

export function PrimaryResourceDetail() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const resource = primaryResources.find((item) => item.slug === slug);

  const { favourites, toggle: toggleFavourite } = useFavourites();
  const [reportOpen, setReportOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shareCopied) return;
    const timeout = window.setTimeout(() => setShareCopied(false), 3000);
    return () => window.clearTimeout(timeout);
  }, [shareCopied]);

  const related = useMemo(() => {
    if (!resource) return [];
    const sameTheme = primaryResources.filter(
      (item) => item.id !== resource.id && item.theme === resource.theme,
    );
    if (sameTheme.length >= 4) return sameTheme.slice(0, 4);
    const fallback = primaryResources.filter(
      (item) =>
        item.id !== resource.id &&
        item.theme !== resource.theme &&
        item.resourceType === resource.resourceType,
    );
    return [...sameTheme, ...fallback].slice(0, 4);
  }, [resource]);

  if (!resource) return <NotFound />;

  const classLevel = classLevels.find((level) => level.id === resource.classLevel);
  const theme = themes.find((item) => item.id === resource.theme);
  const topic = theme?.topics.find((item) => item.id === resource.topic);
  const resourceType = bunscoilResourceTypes.find((item) => item.id === resource.resourceType);
  const TypeIcon = resourceType?.icon ?? DocumentIcon;
  const isFavourite = favourites.includes(resource.id);

  const applicableFlags = [
    resource.assessment ? t("bunscoil.filters.assessment") : null,
    resource.planning ? t("bunscoil.filters.planning") : null,
  ].filter(Boolean);

  const handleOpenResource = () => {
    previewRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    previewRef.current?.focus();
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
    } catch {
      setShareCopied(false);
    }
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: t("home.entryBunscoilTitle"), path: "/bunscoil" },
          { label: t("bunscoil.nav.resources"), path: "/bunscoil/acmhainni" },
          { label: lang === "ga" ? resource.titleGa : resource.titleEn },
        ]}
      />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-800">
            <TypeIcon className="h-7 w-7" />
          </span>
          <div>
            <h1 className="text-3xl font-black text-brand-navy-900 sm:text-4xl">
              {lang === "ga" ? resource.titleGa : resource.titleEn}
            </h1>
          </div>
        </div>

        <ul className="mt-5 flex flex-wrap gap-2 text-xs font-bold">
          {resourceType && (
            <li className="rounded-full bg-brand-green-50 px-3 py-1.5 text-brand-green-800">
              {resourceType.label[lang]}
            </li>
          )}
          {classLevel && (
            <li className="rounded-full bg-brand-navy-50 px-3 py-1.5 text-brand-navy-800">
              {classLevel.label[lang]}
            </li>
          )}
          {theme && (
            <li className="rounded-full bg-brand-gold-50 px-3 py-1.5 text-brand-gold-600">
              {theme.label[lang]}
            </li>
          )}
          {resource.isNew && (
            <li className="rounded-full bg-brand-gold-400 px-3 py-1.5 text-brand-navy-900">
              {t("common.new")}
            </li>
          )}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleOpenResource}
            className="rounded-md bg-brand-green-700 px-5 py-3 text-sm font-bold text-white hover:bg-brand-green-800"
          >
            {t("bunscoil.detail.openResource")}
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md border border-brand-navy-800/25 px-5 py-3 text-sm font-bold text-brand-navy-900 hover:bg-brand-navy-50"
          >
            <DownloadIcon className="h-4 w-4" />
            {t("common.download")}
          </button>
          <button
            type="button"
            onClick={() => toggleFavourite(resource.id)}
            aria-pressed={isFavourite}
            className={`flex items-center gap-2 rounded-md border px-5 py-3 text-sm font-bold ${
              isFavourite
                ? "border-red-200 bg-red-50 text-red-600"
                : "border-brand-navy-800/25 text-brand-navy-900 hover:bg-brand-navy-50"
            }`}
          >
            <HeartIcon className="h-4 w-4" fill={isFavourite ? "currentColor" : "none"} />
            {isFavourite ? t("bunscoil.card.removeFavourite") : t("bunscoil.card.addFavourite")}
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-2 rounded-md border border-brand-navy-800/25 px-5 py-3 text-sm font-bold text-brand-navy-900 hover:bg-brand-navy-50"
            >
              <ShareIcon className="h-4 w-4" />
              {t("bunscoil.detail.share")}
            </button>
            <span
              role="status"
              aria-live="polite"
              className={`absolute left-0 top-full mt-1 whitespace-nowrap text-xs font-semibold text-brand-green-800 transition-opacity ${
                shareCopied ? "opacity-100" : "opacity-0"
              }`}
            >
              {shareCopied ? t("bunscoil.detail.shareCopied") : ""}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <PrimaryResourcePreview ref={previewRef} resource={resource} />
        </div>

        <p className="mt-8 text-base leading-relaxed text-brand-navy-800/90">
          {resource.description[lang]}
        </p>

        <div className="mt-10 rounded-xl border border-brand-navy-800/12 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-black text-brand-navy-900">
            {t("bunscoil.detail.resourceInfo")}
          </h2>
          <dl className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <dt className="font-semibold text-brand-navy-900">{t("bunscoil.filters.classLevel")}</dt>
              <dd className="text-brand-navy-800/80">{classLevel?.label[lang]}</dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-navy-900">{t("bunscoil.card.theme")}</dt>
              <dd className="text-brand-navy-800/80">{theme?.label[lang]}</dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-navy-900">{t("bunscoil.filters.topics")}</dt>
              <dd className="text-brand-navy-800/80">{topic?.label[lang]}</dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-navy-900">{t("bunscoil.filters.resourceType")}</dt>
              <dd className="text-brand-navy-800/80">{resourceType?.label[lang]}</dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-navy-900">{t("bunscoil.detail.language")}</dt>
              <dd className="text-brand-navy-800/80">{resource.language[lang]}</dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-navy-900">{t("bunscoil.detail.fileSize")}</dt>
              <dd className="text-brand-navy-800/80">{resource.fileSize}</dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-navy-900">{t("bunscoil.card.updated")}</dt>
              <dd className="text-brand-navy-800/80">
                {new Date(resource.updatedDate).toLocaleDateString(lang === "ga" ? "ga-IE" : "en-IE", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-navy-900">{t("bunscoil.detail.suitableFor")}</dt>
              <dd className="text-brand-navy-800/80">{resource.suitableFor[lang]}</dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-navy-900">
                {t("bunscoil.detail.assessmentPlanning")}
              </dt>
              <dd className="text-brand-navy-800/80">
                {applicableFlags.length > 0 ? applicableFlags.join(" · ") : "—"}
              </dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={() => setReportOpen(true)}
            className="mt-6 rounded text-sm font-bold text-brand-navy-800/70 underline-offset-2 hover:text-red-600 hover:underline"
          >
            {t("bunscoil.detail.reportIssue")}
          </button>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-black text-brand-navy-900">
              {t("bunscoil.detail.relatedResources")}
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {related.map((item) => (
                <PrimaryResourceCard
                  key={item.id}
                  resource={item}
                  isFavourite={favourites.includes(item.id)}
                  onToggleFavourite={toggleFavourite}
                  onView={(target: PrimaryResource) => navigate(`/bunscoil/acmhainni/${target.slug}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        title={t("bunscoil.detail.reportIssueTitle")}
      >
        <ReportIssueForm onSubmitted={() => setReportOpen(false)} />
      </Modal>
    </>
  );
}
