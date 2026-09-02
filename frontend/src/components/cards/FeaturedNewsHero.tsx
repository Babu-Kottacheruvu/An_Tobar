import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import type { NewsItem } from "../../data/news";
import { newsCategories } from "../../data/news";
import { NewsIcon } from "../icons";

function formatDate(dateString: string, lang: "en" | "ga") {
  return new Date(dateString).toLocaleDateString(lang === "ga" ? "ga-IE" : "en-IE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function FeaturedNewsHero({ item }: { item: NewsItem }) {
  const { lang, t } = useLanguage();
  const category = newsCategories.find((cat) => cat.id === item.category);

  return (
    <article className="relative overflow-hidden rounded-2xl border border-brand-navy-800/12 bg-white shadow-md md:grid md:grid-cols-2">
      <div
        className="flex h-48 items-center justify-center bg-linear-to-br from-brand-green-700 to-brand-navy-900 text-white md:h-full"
        aria-hidden="true"
      >
        <NewsIcon className="h-16 w-16 text-brand-gold-400" />
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide">
          <span className="rounded-full bg-brand-gold-50 px-2.5 py-1 text-brand-gold-600">
            {t("common.featured")}
          </span>
          {category && (
            <span className="rounded-full bg-brand-green-50 px-2.5 py-1 text-brand-green-800">
              {category.label[lang]}
            </span>
          )}
          <time dateTime={item.date} className="text-brand-navy-800/60">
            {formatDate(item.date, lang)}
          </time>
        </div>

        <h2 className="mt-3 text-2xl font-black leading-tight text-brand-navy-900 sm:text-3xl">
          <Link to={`/nuacht/${item.slug}`} className="rounded after:absolute after:inset-0">
            {item.title[lang]}
          </Link>
        </h2>

        <p className="mt-4 text-base leading-relaxed text-brand-navy-800/85">{item.summary[lang]}</p>

        <span className="relative z-10 mt-5 inline-flex w-fit items-center gap-1 rounded-md bg-brand-green-700 px-5 py-2.5 text-sm font-bold text-white">
          {t("common.readMore")} →
        </span>
      </div>
    </article>
  );
}
