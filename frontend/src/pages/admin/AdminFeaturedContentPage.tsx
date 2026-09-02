import { useState } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import {
  initialSliderTabs,
  sliderTabMeta,
  type SlideItem,
  type SliderTabId,
} from "../../data/admin/sliderManager";
import { SlidesEditor } from "../../components/admin/slider-manager/SlidesEditor";
import { SliderPreview } from "../../components/admin/slider-manager/SliderPreview";

type Banner = { type: "saved" | "published"; message: string } | null;

export function AdminFeaturedContentPage() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<SliderTabId>("homepage");
  const [savedTabs, setSavedTabs] = useState<Record<SliderTabId, SlideItem[]>>(initialSliderTabs);
  const [draftTabs, setDraftTabs] = useState<Record<SliderTabId, SlideItem[]>>(initialSliderTabs);
  const [banner, setBanner] = useState<Banner>(null);

  const activeMeta = sliderTabMeta.find((meta) => meta.id === activeTab)!;
  const activeSlides = draftTabs[activeTab];
  const isDirty = JSON.stringify(draftTabs) !== JSON.stringify(savedTabs);

  const updateActiveSlides = (slides: SlideItem[]) => {
    setDraftTabs((current) => ({ ...current, [activeTab]: slides }));
    setBanner(null);
  };

  const handleSave = () => {
    setSavedTabs(draftTabs);
    setBanner({ type: "saved", message: t("admin.filters.saved") });
  };

  const handleCancel = () => {
    setDraftTabs(savedTabs);
    setBanner(null);
  };

  const handlePublish = () => {
    setSavedTabs(draftTabs);
    setBanner({ type: "published", message: t("admin.filters.published") });
  };

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-navy-900 sm:text-3xl">{t("admin.featuredContent")}</h1>
          <p className="mt-1 text-sm text-brand-navy-800/70">{t("admin.featured.intro")}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={!isDirty}
              className="rounded-md border border-brand-navy-800/25 px-4 py-2.5 text-sm font-bold text-brand-navy-900 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t("common.cancel")}
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!isDirty}
              className="rounded-md border border-brand-green-700 px-4 py-2.5 text-sm font-bold text-brand-green-800 hover:bg-brand-green-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t("admin.filters.saveChanges")}
            </button>
            <button
              type="button"
              onClick={handlePublish}
              className="rounded-md bg-brand-green-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800"
            >
              {t("admin.filters.publish")}
            </button>
          </div>
          {banner ? (
            <p
              role="status"
              className={`text-sm font-semibold ${banner.type === "published" ? "text-brand-green-700" : "text-brand-navy-800/70"}`}
            >
              {banner.message}
            </p>
          ) : (
            isDirty && (
              <p role="status" className="text-sm font-semibold text-brand-gold-600">
                {t("admin.filters.unsavedChanges")}
              </p>
            )
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {sliderTabMeta.map((meta) => (
          <button
            key={meta.id}
            type="button"
            onClick={() => setActiveTab(meta.id)}
            aria-pressed={activeTab === meta.id}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
              activeTab === meta.id
                ? "border-brand-green-700 bg-brand-green-700 text-white"
                : "border-brand-navy-800/20 text-brand-navy-800/70 hover:border-brand-green-600"
            }`}
          >
            {meta.label[lang]}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
        <SlidesEditor slides={activeSlides} onChange={updateActiveSlides} />

        <div className="lg:sticky lg:top-6 lg:self-start">
          <h2 className="text-sm font-black uppercase tracking-wide text-brand-navy-800/60">
            {t("admin.slider.livePreview")}
          </h2>
          <div className="mt-3">
            <SliderPreview slides={activeSlides} accent={activeMeta.accent} />
          </div>
        </div>
      </div>
    </div>
  );
}
