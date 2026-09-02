import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../i18n/useLanguage";
import { resources } from "../data/resources";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { ResourceViewer } from "../components/common/ResourceViewer";
import { ResourceCard } from "../components/cards/ResourceCard";
import { NotFound } from "./NotFound";

export function ResourceDetail() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const resource = resources.find((item) => item.slug === slug);

  if (!resource) return <NotFound />;

  const related = resources
    .filter((item) => item.id !== resource.id && item.subject === resource.subject)
    .slice(0, 3);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: t("nav.resources"), path: "/acmhainni" },
          { label: resource.title[lang] },
        ]}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          to="/acmhainni"
          className="rounded text-sm font-bold text-brand-green-800 underline-offset-2 hover:underline"
        >
          ← {t("nav.resources")}
        </Link>

        <div className="mt-4 rounded-lg border border-brand-navy-800/12 bg-white p-6 shadow-sm sm:p-8">
          <ResourceViewer resource={resource} />
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-brand-navy-900">
              {t("common.viewAll")}
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {related.map((item) => (
                <ResourceCard key={item.id} resource={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
