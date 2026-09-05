import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import { teacherGuideSections } from "../../data/bunscoil/teacherGuideSections";
import { primaryResources } from "../../data/bunscoil/resources";
import { Breadcrumbs } from "../../components/layout/Breadcrumbs";
import { TeacherGuideSectionCard } from "../../components/bunscoil/TeacherGuideSectionCard";
import { DocumentViewer } from "../../components/bunscoil/DocumentViewer";
import { PrimaryResourceCard } from "../../components/bunscoil/PrimaryResourceCard";
import { BookIcon, DownloadIcon } from "../../components/icons";

export function TeacherGuide() {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [favourites, setFavourites] = useState<string[]>([]);
  const viewerRef = useRef<HTMLDivElement>(null);

  const toggleFavourite = (id: string) =>
    setFavourites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  const goToViewer = (index?: number) => {
    if (typeof index === "number") setActiveIndex(index);
    viewerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDownload = async () => {
    const { downloadDocumentPdf } = await import("../../utils/downloadResourcePdf");
    downloadDocumentPdf(
      t("teacherGuide.featuredTitle"),
      teacherGuideSections.map((section) => ({
        heading: section.title[lang],
        description: section.description[lang],
        bullets: section.bullets.map((bullet) => bullet[lang]),
      })),
      "treoir-an-muinteora.pdf",
      lang,
    );
  };

  const relatedResources = useMemo(
    () =>
      primaryResources
        .filter(
          (resource) =>
            resource.planning || resource.assessment || resource.resourceType === "worksheets",
        )
        .slice(0, 4),
    [],
  );

  return (
    <>
      <Breadcrumbs items={[{ label: t("home.entryBunscoilTitle"), path: "/bunscoil" }, { label: t("bunscoil.nav.teacherGuide") }]} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-brand-navy-900 sm:text-4xl">
          {t("bunscoil.nav.teacherGuide")}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-navy-800/80">
          {t("teacherGuide.intro")}
        </p>

        <h2 className="mt-10 text-xl font-black text-brand-navy-900">
          {t("teacherGuide.sectionsHeading")}
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {teacherGuideSections.map((section, index) => (
            <TeacherGuideSectionCard
              key={section.id}
              section={section}
              index={index}
              onSelect={goToViewer}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-6 rounded-2xl bg-linear-to-br from-brand-green-700 to-brand-green-900 p-6 text-white sm:flex-row sm:items-center sm:p-10">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/15" aria-hidden="true">
            <BookIcon className="h-10 w-10" />
          </span>
          <div className="flex-1">
            <h2 className="text-2xl font-black">{t("teacherGuide.featuredTitle")}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-green-50/90 sm:text-base">
              {t("teacherGuide.featuredDescription")}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => goToViewer(0)}
                className="rounded-md bg-white px-5 py-2.5 text-sm font-bold text-brand-green-800 hover:bg-brand-gold-50"
              >
                {t("teacherGuide.readOnline")}
              </button>
              <button
                type="button"
                onClick={() => goToViewer(0)}
                className="rounded-md border-2 border-white px-5 py-2.5 text-sm font-bold text-white hover:bg-white/10"
              >
                {t("teacherGuide.openPdf")}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-2 rounded-md border-2 border-white px-5 py-2.5 text-sm font-bold text-white hover:bg-white/10"
              >
                <DownloadIcon className="h-4 w-4" />
                {t("teacherGuide.downloadPdf")}
              </button>
            </div>
          </div>
        </div>

        <div ref={viewerRef} className="mt-12 scroll-mt-20">
          <DocumentViewer
            sections={teacherGuideSections}
            activeIndex={activeIndex}
            onActiveIndexChange={setActiveIndex}
          />
        </div>

        {relatedResources.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-black text-brand-navy-900">
              {t("bunscoil.detail.relatedResources")}
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {relatedResources.map((resource) => (
                <PrimaryResourceCard
                  key={resource.id}
                  resource={resource}
                  isFavourite={favourites.includes(resource.id)}
                  onToggleFavourite={toggleFavourite}
                  onView={(target) => navigate(`/bunscoil/acmhainni/${target.slug}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
