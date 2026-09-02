import { useMemo, useState } from "react";
import { useLanguage } from "../i18n/useLanguage";
import { newsItems } from "../data/news";
import { newsFilterTags } from "../data/newsFilters";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { SearchBar } from "../components/common/SearchBar";
import { FilterSidebar, type FilterGroup } from "../components/common/FilterSidebar";
import { FeaturedNewsHero } from "../components/cards/FeaturedNewsHero";
import { NewsCard } from "../components/cards/NewsCard";
import { LatestNewsSidebar } from "../components/cards/LatestNewsSidebar";
import { Pagination } from "../components/common/Pagination";

const PAGE_SIZE = 4;

export function News() {
  const { lang, t } = useLanguage();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [tags, setTags] = useState<string[]>([]);

  const sorted = useMemo(
    () => [...newsItems].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [],
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return sorted.filter((item) => {
      if (tags.length && !item.tags.some((tag) => tags.includes(tag))) return false;
      if (query) {
        const haystack = `${item.title.ga} ${item.title.en} ${item.summary[lang]}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [sorted, tags, search, lang]);

  const featured = filtered.find((item) => item.featured) ?? filtered[0];
  const rest = filtered.filter((item) => item.id !== featured?.id);
  const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  const paged = rest.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const groups: FilterGroup[] = [
    {
      id: "tags",
      label: t("common.filters"),
      options: newsFilterTags.map((tag) => ({ id: tag.id, label: tag.label[lang] })),
      selected: tags,
      onToggle: (id) => {
        setTags((current) =>
          current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
        );
        setPage(1);
      },
    },
  ];

  return (
    <>
      <Breadcrumbs items={[{ label: t("nav.news") }]} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-brand-navy-900 sm:text-4xl">{t("news.title")}</h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-brand-navy-800/80">
          {t("news.intro")}
        </p>

        <div className="mt-8 max-w-xl">
          <SearchBar
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr_280px]">
          <FilterSidebar groups={groups} onClear={() => setTags([])} activeCount={tags.length} />

          <div>
            {!featured ? (
              <p className="rounded-lg border border-dashed border-brand-navy-800/20 p-10 text-center text-brand-navy-800/70">
                {t("common.noResults")}
              </p>
            ) : (
              <>
                <FeaturedNewsHero item={featured} />
                {paged.length > 0 && (
                  <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {paged.map((item) => (
                      <NewsCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
              </>
            )}
          </div>

          <LatestNewsSidebar />
        </div>
      </div>
    </>
  );
}
