import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../i18n/useLanguage";
import { resources } from "../data/resources";
import { newsItems } from "../data/news";
import { entryCards } from "../data/entryCards";
import { externalOrgs } from "../data/externalLinks";
import { EntryCard } from "../components/cards/EntryCard";
import { ResourceCard } from "../components/cards/ResourceCard";
import { NewsCard } from "../components/cards/NewsCard";
import { ExternalLinkCard } from "../components/cards/ExternalLinkCard";
import { FeaturedSlider } from "../components/cards/FeaturedSlider";
import { SearchSection } from "../components/home/SearchSection";
import { LearningIllustration } from "../components/illustrations/LearningIllustration";

function chunk<T>(list: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < list.length; i += size) {
    chunks.push(list.slice(i, i + size));
  }
  return chunks;
}

export function Home() {
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const featuredResources = resources.filter((resource) => resource.featured);
  const featuredSlides = chunk(featuredResources, 3);
  const latestNews = [...newsItems]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-linear-to-br from-brand-green-700 to-brand-green-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:gap-10 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:px-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-black leading-tight sm:text-5xl md:text-6xl">
              {t("site.name")}
            </h1>
            <p className="mt-3 text-lg font-bold text-brand-gold-400 sm:mt-5 sm:text-2xl">
              {t("home.heroSubtitle")}
            </p>
          </div>

          <LearningIllustration
            label={t("home.heroIllustrationAlt")}
            className="mx-auto w-full max-w-55 drop-shadow-xl sm:max-w-md"
          />
        </div>
      </section>

      {/* Entry cards */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <h2 className="text-center text-2xl font-black text-brand-navy-900 sm:text-3xl">
          {t("home.entryHeading")}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {entryCards.map((card) => (
            <EntryCard key={card.id} config={card} />
          ))}
        </div>
      </section>

      {/* Search */}
      <div className="bg-brand-navy-50">
        <SearchSection />
      </div>

      {/* News */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black text-brand-navy-900 sm:text-3xl">
            {t("news.title")}
          </h2>
          <Link
            to="/nuacht"
            className="rounded text-sm font-bold text-brand-green-800 underline-offset-2 hover:underline"
          >
            {t("common.viewAll")} →
          </Link>
        </div>
        <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4">
          {latestNews.map((item) => (
            <div key={item.id} className="w-[85vw] max-w-xs shrink-0 snap-start sm:w-auto sm:max-w-none">
              <NewsCard item={item} />
            </div>
          ))}
        </div>
      </section>

      {/* Featured resources */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-black text-brand-navy-900 sm:text-3xl">
              {t("home.featuredResources")}
            </h2>
            <Link
              to="/acmhainni"
              className="hidden rounded text-sm font-bold text-brand-green-800 underline-offset-2 hover:underline sm:block"
            >
              {t("common.viewAll")} →
            </Link>
          </div>

          <div className="mt-8">
            <FeaturedSlider
              items={featuredSlides}
              getKey={(slide) => slide.map((item) => item.id).join("-")}
              ariaLabel={t("home.featuredResources")}
              renderItem={(slide) => (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  {slide.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              )}
            />
          </div>
        </div>
      </section>

      {/* External links */}
      <section id="naisc-sheachtracha" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <h2 className="text-2xl font-black text-brand-navy-900 sm:text-3xl">
          {t("home.externalLinks")}
        </h2>
        <p className="mt-2 max-w-2xl text-base text-brand-navy-800/80">
          {t("home.externalLinksIntro")}
        </p>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {externalOrgs.map((org) => (
            <ExternalLinkCard key={org.id} org={org} />
          ))}
        </div>
      </section>
    </>
  );
}
