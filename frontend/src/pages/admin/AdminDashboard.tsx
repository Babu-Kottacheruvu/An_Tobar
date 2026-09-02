import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import { globalSearchResults } from "../../data/globalSearch";
import { newsItems } from "../../data/news";
import { competitions, getCompetitionStatus } from "../../data/competitions";
import { draftContent } from "../../data/admin/draftContent";
import { recentActivity, type ActivityItem } from "../../data/admin/recentActivity";
import { StatCard } from "../../components/admin/StatCard";
import {
  BookIcon,
  StudentIcon,
  TeacherIcon,
  NewsIcon,
  TrophyIcon,
  DocumentIcon,
  GridIcon,
  FilterIcon,
  UploadIcon,
  EyeIcon,
  DownloadIcon,
  SearchIcon,
} from "../../components/icons";

const ACTIVITY_ICONS: Record<ActivityItem["type"], typeof DocumentIcon> = {
  resource: DocumentIcon,
  navigation: GridIcon,
  news: NewsIcon,
  filter: FilterIcon,
};

function formatDateTime(iso: string, lang: "en" | "ga") {
  return new Date(iso).toLocaleDateString(lang === "ga" ? "ga-IE" : "en-IE", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AdminDashboard() {
  const { lang, t } = useLanguage();

  const totalResources = globalSearchResults.length;
  const primaryResources = globalSearchResults.filter((r) => r.schoolLevel === "primary").length;
  const secondaryResources = globalSearchResults.filter((r) => r.schoolLevel === "post-primary").length;
  const activeCompetitions = competitions.filter((c) => getCompetitionStatus(c.deadline) !== "closed").length;

  const popularTopics = useMemo(() => {
    const counts = new Map<string, { label: string; count: number }>();
    for (const result of globalSearchResults) {
      const existing = counts.get(result.topic.id);
      if (existing) {
        existing.count += 1;
      } else {
        counts.set(result.topic.id, { label: result.topic.label[lang], count: 1 });
      }
    }
    return [...counts.values()].sort((a, b) => b.count - a.count).slice(0, 5);
  }, [lang]);

  const popularResources = useMemo(
    () => globalSearchResults.filter((result) => result.featured).slice(0, 5),
    [],
  );

  const quickActions = [
    { id: "resource", labelKey: "admin.dash.addResource" as const, path: "/admin/acmhainni", icon: DocumentIcon },
    { id: "news", labelKey: "admin.dash.addNews" as const, path: "/admin/nuacht", icon: NewsIcon },
    { id: "nav", labelKey: "admin.dash.addNavItem" as const, path: "/admin/nascleanuint", icon: GridIcon },
    { id: "filter", labelKey: "admin.dash.addFilter" as const, path: "/admin/scagairi", icon: FilterIcon },
    { id: "media", labelKey: "admin.dash.uploadMedia" as const, path: "/admin/meain", icon: UploadIcon },
  ];

  return (
    <div>
      <h1 className="text-2xl font-black text-brand-navy-900 sm:text-3xl">{t("admin.dash.welcome")}</h1>
      <p className="mt-1 text-sm text-brand-navy-800/70">{t("admin.dash.intro")}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label={t("admin.dash.totalResources")} value={totalResources} icon={BookIcon} />
        <StatCard
          label={t("admin.dash.primaryResources")}
          value={primaryResources}
          icon={StudentIcon}
          accentClass="bg-brand-gold-50 text-brand-gold-600"
        />
        <StatCard
          label={t("admin.dash.secondaryResources")}
          value={secondaryResources}
          icon={TeacherIcon}
          accentClass="bg-brand-navy-50 text-brand-navy-800"
        />
        <StatCard label={t("admin.dash.newsArticles")} value={newsItems.length} icon={NewsIcon} />
        <StatCard
          label={t("admin.dash.activeCompetitions")}
          value={activeCompetitions}
          icon={TrophyIcon}
          accentClass="bg-brand-gold-50 text-brand-gold-600"
        />
        <StatCard
          label={t("admin.dash.draftContent")}
          value={draftContent.length}
          icon={DocumentIcon}
          accentClass="bg-brand-navy-50 text-brand-navy-800"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-brand-navy-800/12 bg-white p-6">
          <h2 className="text-lg font-bold text-brand-navy-900">{t("admin.dash.recentActivity")}</h2>
          <ul className="mt-4 divide-y divide-brand-navy-800/10">
            {recentActivity.map((item) => {
              const Icon = ACTIVITY_ICONS[item.type];
              return (
                <li key={item.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-green-50 text-brand-green-800">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-brand-navy-900">{item.description[lang]}</p>
                    <p className="mt-0.5 text-xs text-brand-navy-800/60">
                      {item.actor} · {formatDateTime(item.timestamp, lang)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-lg border border-brand-navy-800/12 bg-white p-6">
          <h2 className="text-lg font-bold text-brand-navy-900">{t("admin.dash.quickActions")}</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.id}
                  to={action.path}
                  className="flex items-center gap-2.5 rounded-md border border-brand-navy-800/15 px-4 py-3 text-sm font-bold text-brand-navy-900 hover:border-brand-green-600 hover:bg-brand-green-50"
                >
                  <Icon className="h-4 w-4 text-brand-green-700" />
                  {t(action.labelKey)}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-brand-navy-800/12 bg-white p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-bold text-brand-navy-900">{t("admin.dash.analyticsOverview")}</h2>
          <p className="text-xs font-semibold text-brand-navy-800/50">{t("admin.dash.analyticsSample")}</p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-md bg-brand-green-50 p-4">
            <EyeIcon className="h-6 w-6 text-brand-green-800" />
            <div>
              <p className="text-xl font-black text-brand-navy-900">12,480</p>
              <p className="text-xs font-semibold text-brand-navy-800/60">
                {t("admin.dash.resourceViews")} · {t("admin.dash.thisMonth")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-md bg-brand-gold-50 p-4">
            <DownloadIcon className="h-6 w-6 text-brand-gold-600" />
            <div>
              <p className="text-xl font-black text-brand-navy-900">3,210</p>
              <p className="text-xs font-semibold text-brand-navy-800/60">
                {t("admin.dash.downloads")} · {t("admin.dash.thisMonth")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-md bg-brand-navy-50 p-4">
            <SearchIcon className="h-6 w-6 text-brand-navy-800" />
            <div>
              <p className="text-xl font-black text-brand-navy-900">1,875</p>
              <p className="text-xs font-semibold text-brand-navy-800/60">
                {t("admin.dash.searches")} · {t("admin.dash.thisMonth")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-brand-navy-800/60">
              {t("admin.dash.popularTopics")}
            </h3>
            <ol className="mt-3 space-y-2">
              {popularTopics.map((topic, index) => (
                <li key={topic.label} className="flex items-center justify-between text-sm">
                  <span className="text-brand-navy-900">
                    {index + 1}. {topic.label}
                  </span>
                  <span className="font-semibold text-brand-navy-800/60">{topic.count}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-brand-navy-800/60">
              {t("admin.dash.popularResources")}
            </h3>
            <ol className="mt-3 space-y-2">
              {popularResources.map((resource, index) => (
                <li key={resource.id} className="text-sm text-brand-navy-900">
                  {index + 1}. {lang === "ga" ? resource.titleGa : resource.titleEn}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
