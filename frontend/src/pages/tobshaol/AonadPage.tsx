import { useState } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import { tobshaolYearGroups } from "../../data/tobshaol/yearGroups";
import { yearUnitsByYearGroup } from "../../data/tobshaol/yearUnits";
import { aonadNavByUnit } from "../../data/tobshaol/aonadNav";
import { aonadResourcesByUnit, type AonadResource } from "../../data/tobshaol/aonadResources";
import { tobshaolResources } from "../../data/tobshaol/resources";
import { Breadcrumbs } from "../../components/layout/Breadcrumbs";
import { LessonProgressPath } from "../../components/tobshaol/LessonProgressPath";
import { AonadNavCard } from "../../components/tobshaol/AonadNavCard";
import { AonadResourceCard } from "../../components/tobshaol/AonadResourceCard";
import { TobshaolResourceCard } from "../../components/tobshaol/TobshaolResourceCard";
import { TobshaolResourcePreview } from "../../components/tobshaol/TobshaolResourcePreview";
import { Modal } from "../../components/common/Modal";
import { NotFound } from "../NotFound";

interface AonadPageProps {
  yearGroupId: string;
  unitId: string;
}

export function AonadPage({ yearGroupId, unitId }: AonadPageProps) {
  const { lang, t } = useLanguage();
  const [previewResource, setPreviewResource] = useState<AonadResource | null>(null);

  const yearGroup = tobshaolYearGroups.find((option) => option.id === yearGroupId);
  const unit = yearUnitsByYearGroup[yearGroupId]?.find((item) => item.id === unitId);
  const navItems = aonadNavByUnit[unitId] ?? [];
  const resources = aonadResourcesByUnit[unitId] ?? [];

  if (!yearGroup || !unit) return <NotFound />;

  const lessonSteps = navItems
    .filter((item) => item.action.type === "scroll" && item.id.startsWith("ceacht-"))
    .map((item) => ({
      id: (item.action as { targetId: string }).targetId,
      label: lang === "ga" ? item.titleGa : item.titleEn,
    }));

  const relatedTopicId = unit.action.type === "topic" ? unit.action.topicId : undefined;
  const related = relatedTopicId
    ? tobshaolResources.filter((resource) => resource.topic === relatedTopicId).slice(0, 4)
    : [];

  const scrollTo = (targetId: string) =>
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const resourceSections = [
    ...lessonSteps.map((step) => ({ id: step.id, resources: resources.filter((r) => r.category === step.id) })),
    { id: "aonad-iomlan", resources: resources.filter((r) => r.category === "aonad-iomlan") },
    { id: "treoir-muinteora", resources: resources.filter((r) => r.category === "treoir-muinteora") },
    { id: "nodbhileoga", resources: resources.filter((r) => r.category === "nodbhileoga") },
    { id: "pacaiste-tacaiochta", resources: resources.filter((r) => r.category === "pacaiste-tacaiochta") },
  ].filter((section) => section.resources.length > 0);

  return (
    <>
      <Breadcrumbs
        variant="dark"
        items={[
          { label: "#Tobshaol", path: "/iar-bhunscoil" },
          { label: yearGroup.label[lang], path: `/iar-bhunscoil/${yearGroupId}` },
          { label: lang === "ga" ? unit.titleGa : unit.titleEn },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black uppercase tracking-tight text-brand-navy-900 sm:text-5xl">
          {lang === "ga" ? unit.titleGa : unit.titleEn}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-brand-navy-800/70">
          {unit.description[lang]}
        </p>

        {lessonSteps.length > 0 && (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-brand-navy-800/10 bg-teen-surface p-5 shadow-sm sm:p-6">
            <LessonProgressPath
              steps={lessonSteps}
              onSelect={scrollTo}
              ariaLabel={`${lang === "ga" ? unit.titleGa : unit.titleEn} - ${t("tobshaol.unitsHeading")}`}
            />
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {navItems.map((item) => (
            <AonadNavCard key={item.id} item={item} />
          ))}
        </div>

        {resourceSections.map((section) => {
          const navItem = navItems.find((item) => item.id === section.id) ??
            navItems.find(
              (item) => item.action.type === "scroll" && item.action.targetId === section.id,
            );
          return (
            <section key={section.id} id={section.id} className="mt-14 scroll-mt-20">
              <h2 className="text-xl font-black uppercase tracking-wide text-brand-navy-800/80">
                {(lang === "ga" ? navItem?.titleGa : navItem?.titleEn) ?? section.id}
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {section.resources.map((resource) => (
                  <AonadResourceCard key={resource.id} resource={resource} onPreview={setPreviewResource} />
                ))}
              </div>
            </section>
          );
        })}

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-black uppercase tracking-wide text-brand-navy-800/80">
              {t("bunscoil.detail.relatedResources")}
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((resource) => (
                <TobshaolResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Modal
        isOpen={Boolean(previewResource)}
        onClose={() => setPreviewResource(null)}
        title={(lang === "ga" ? previewResource?.titleGa : previewResource?.titleEn) ?? ""}
      >
        {previewResource && <TobshaolResourcePreview resource={previewResource} />}
      </Modal>
    </>
  );
}
