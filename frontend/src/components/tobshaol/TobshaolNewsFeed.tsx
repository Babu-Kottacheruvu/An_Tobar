import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import { newsItems } from "../../data/news";

function formatDate(dateString: string, lang: "en" | "ga") {
  return new Date(dateString).toLocaleDateString(lang === "ga" ? "ga-IE" : "en-IE", {
    day: "numeric",
    month: "short",
  });
}

export function TobshaolNewsFeed() {
  const { lang, t } = useLanguage();
  const latest = [...newsItems]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <aside aria-label={t("tobshaol.newsHeading")} className="lg:sticky lg:top-24">
      <div className="rounded-2xl border border-white/10 bg-teen-surface p-5">
        <h2 className="text-lg font-black uppercase tracking-wide text-white">
          {t("tobshaol.newsHeading")}
        </h2>
        <ul className="mt-4 divide-y divide-white/10">
          {latest.map((item) => (
            <li key={item.id} className="py-3 first:pt-0 last:pb-0">
              <Link to={`/nuacht/${item.slug}`} className="group block rounded">
                <p className="text-xs font-bold uppercase tracking-wide text-teen-cyan-400">
                  {formatDate(item.date, lang)}
                </p>
                <p className="mt-1 text-sm font-bold leading-snug text-white group-hover:text-teen-pink-400">
                  {item.title[lang]}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/nuacht"
          className="mt-4 inline-block text-sm font-bold text-teen-pink-400 hover:underline"
        >
          {t("common.viewAll")} →
        </Link>
      </div>
    </aside>
  );
}
