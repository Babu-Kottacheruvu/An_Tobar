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

interface NewsCardProps {
  item: NewsItem;
  featured?: boolean;
}

export function NewsCard({ item, featured = false }: NewsCardProps) {
  const { lang, t } = useLanguage();
  const category = newsCategories.find((cat) => cat.id === item.category);

  return (
    <article
      className={`relative flex h-full flex-col rounded-lg border border-brand-navy-800/12 bg-white shadow-sm transition-shadow hover:shadow-md ${
        featured ? "sm:flex-row" : ""
      }`}
    >
      <div
        className={`flex shrink-0 items-center justify-center rounded-t-lg bg-linear-to-br from-brand-navy-700 to-brand-navy-900 text-white ${
          featured ? "h-40 sm:h-auto sm:w-56 sm:rounded-l-lg sm:rounded-tr-none" : "h-32 rounded-b-none"
        }`}
        aria-hidden="true"
      >
        <NewsIcon className="h-10 w-10 text-brand-gold-400" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-brand-navy-800/70">
          {category && (
            <span className="rounded-full bg-brand-green-50 px-2.5 py-1 text-brand-green-800">
              {category.label[lang]}
            </span>
          )}
          <time dateTime={item.date}>{formatDate(item.date, lang)}</time>
        </div>

        <h3 className={`mt-2 font-bold text-brand-navy-900 ${featured ? "text-xl" : "text-base"}`}>
          <Link to={`/nuacht/${item.slug}`} className="rounded after:absolute after:inset-0">
            {item.title[lang]}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-navy-800/80">
          {item.summary[lang]}
        </p>

        <span className="relative z-10 mt-4 self-start text-sm font-bold text-brand-green-800">
          {t("common.readMore")} →
        </span>
      </div>
    </article>
  );
}
