import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import { newsItems } from "../../data/news";

function formatDate(dateString: string, lang: "en" | "ga") {
  return new Date(dateString).toLocaleDateString(lang === "ga" ? "ga-IE" : "en-IE", {
    day: "numeric",
    month: "short",
  });
}

export function LatestNewsSidebar() {
  const { lang, t } = useLanguage();
  const latest = [...newsItems]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <aside aria-label={t("home.latestNews")} className="lg:sticky lg:top-24">
      <div className="rounded-lg border border-brand-navy-800/12 bg-white p-5 shadow-sm">
        <h2 className="text-base font-bold text-brand-navy-900">{t("home.latestNews")}</h2>
        <ul className="mt-4 divide-y divide-brand-navy-800/10">
          {latest.map((item) => (
            <li key={item.id} className="py-3 first:pt-0 last:pb-0">
              <Link to={`/nuacht/${item.slug}`} className="group block rounded">
                <p className="text-xs font-semibold text-brand-navy-800/60">
                  {formatDate(item.date, lang)}
                </p>
                <p className="mt-1 text-sm font-bold leading-snug text-brand-navy-900 group-hover:text-brand-green-700 group-hover:underline">
                  {item.title[lang]}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
