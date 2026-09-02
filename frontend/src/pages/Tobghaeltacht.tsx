import { useMemo, useState } from "react";
import { useLanguage } from "../i18n/useLanguage";
import { tobghaeltachtCategories } from "../data/tobghaeltachtCategories";
import { tobghaeltachtItems, type TobghaeltachtItem } from "../data/tobghaeltachtItems";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { SearchBar } from "../components/common/SearchBar";
import { MultimediaCard } from "../components/cards/MultimediaCard";
import { MultimediaPreview } from "../components/cards/MultimediaPreview";
import { Modal } from "../components/common/Modal";
import { MapPinIcon } from "../components/icons";

export function Tobghaeltacht() {
  const { lang, t } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [openItem, setOpenItem] = useState<TobghaeltachtItem | null>(null);

  const toggleCategory = (id: string) =>
    setCategory((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return tobghaeltachtItems.filter((item) => {
      if (category.length && !category.includes(item.category)) return false;
      if (query) {
        const haystack = `${item.titleGa} ${item.titleEn} ${item.description[lang]}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [search, category, lang]);

  const isFiltering = search.trim() !== "" || category.length > 0;

  return (
    <>
      <Breadcrumbs items={[{ label: t("nav.tobghaeltacht") }]} />

      <div className="bg-linear-to-br from-brand-green-700 to-brand-green-900 py-14 text-white sm:py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-4 text-center sm:px-6 lg:px-8">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
            <MapPinIcon className="h-7 w-7" />
          </span>
          <h1 className="text-3xl font-black sm:text-5xl">{t("tobghaeltacht.title")}</h1>
          <p className="text-xl font-bold text-brand-gold-400">{t("tobghaeltacht.tagline")}</p>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-brand-green-50/90">
            {t("tobghaeltacht.intro")}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder={t("tobghaeltacht.searchPlaceholder")}
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {tobghaeltachtCategories.map((option) => {
            const Icon = option.icon;
            const isActive = category.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleCategory(option.id)}
                aria-pressed={isActive}
                className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-bold transition-colors ${
                  isActive
                    ? "border-brand-green-700 bg-brand-green-50 text-brand-green-800"
                    : "border-brand-navy-800/15 text-brand-navy-800/70 hover:border-brand-green-600"
                }`}
              >
                <Icon className="h-4 w-4" />
                {option.label[lang]}
              </button>
            );
          })}
        </div>

        {isFiltering ? (
          <div className="mt-8">
            <p className="text-sm font-semibold text-brand-navy-800/70" role="status">
              {filtered.length} {t("common.results")}
            </p>
            {filtered.length === 0 ? (
              <p className="mt-6 rounded-lg border border-dashed border-brand-navy-800/20 p-10 text-center text-brand-navy-800/70">
                {t("common.noResults")}
              </p>
            ) : (
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {filtered.map((item) => (
                  <MultimediaCard key={item.id} item={item} onOpen={setOpenItem} />
                ))}
              </div>
            )}
          </div>
        ) : (
          tobghaeltachtCategories.map((section) => {
            const items = tobghaeltachtItems.filter((item) => item.category === section.id);
            if (items.length === 0) return null;
            const Icon = section.icon;
            return (
              <section key={section.id} className="mt-12">
                <h2 className="flex items-center gap-2 text-xl font-black text-brand-navy-900">
                  <Icon className="h-5 w-5 text-brand-green-700" />
                  {section.label[lang]}
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((item) => (
                    <MultimediaCard key={item.id} item={item} onOpen={setOpenItem} />
                  ))}
                </div>
              </section>
            );
          })
        )}

        <div className="mt-14 rounded-lg border border-brand-navy-800/12 bg-white p-6 text-center sm:p-8">
          <p className="text-base leading-relaxed text-brand-navy-800/90">
            {t("tobghaeltacht.bookDay")}
          </p>
        </div>
      </div>

      <Modal
        isOpen={Boolean(openItem)}
        onClose={() => setOpenItem(null)}
        title={(lang === "ga" ? openItem?.titleGa : openItem?.titleEn) ?? ""}
      >
        {openItem && (
          <div>
            <p className="mt-2 text-sm leading-relaxed text-brand-navy-800/85">
              {openItem.description[lang]}
            </p>
            <div className="mt-4">
              <MultimediaPreview mediaType={openItem.mediaType} />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
