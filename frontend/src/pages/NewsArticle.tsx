import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../i18n/useLanguage";
import { newsCategories, newsItems } from "../data/news";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { NotFound } from "./NotFound";

export function NewsArticle() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const item = newsItems.find((n) => n.slug === slug);

  if (!item) return <NotFound />;

  const category = newsCategories.find((c) => c.id === item.category);
  const formattedDate = new Date(item.date).toLocaleDateString(
    lang === "ga" ? "ga-IE" : "en-IE",
    { day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <>
      <Breadcrumbs
        items={[
          { label: t("nav.news"), path: "/nuacht" },
          { label: item.title[lang] },
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          to="/nuacht"
          className="rounded text-sm font-bold text-brand-green-800 underline-offset-2 hover:underline"
        >
          ← {t("nav.news")}
        </Link>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-brand-navy-800/70">
          {category && (
            <span className="rounded-full bg-brand-green-50 px-2.5 py-1 text-brand-green-800">
              {category.label[lang]}
            </span>
          )}
          <time dateTime={item.date}>{formattedDate}</time>
        </div>

        <h1 className="mt-3 text-3xl font-black text-brand-navy-900 sm:text-4xl">
          {item.title[lang]}
        </h1>
        <p className="mt-2 text-sm font-semibold text-brand-navy-800/70">
          {t("news.by")} {item.author}
        </p>

        <p className="mt-6 text-lg font-semibold leading-relaxed text-brand-navy-900">
          {item.summary[lang]}
        </p>
        <p className="mt-4 text-base leading-relaxed text-brand-navy-800/90">{item.body[lang]}</p>
      </article>
    </>
  );
}
