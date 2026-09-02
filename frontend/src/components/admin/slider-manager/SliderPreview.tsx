import { useLanguage } from "../../../i18n/useLanguage";
import type { SlideItem } from "../../../data/admin/sliderManager";
import { FeaturedSlider } from "../../cards/FeaturedSlider";
import { NavIcon } from "../nav-manager/iconRegistry";

interface SliderPreviewProps {
  slides: SlideItem[];
  accent: string;
}

export function SliderPreview({ slides, accent }: SliderPreviewProps) {
  const { lang, t } = useLanguage();
  const visible = slides.filter((slide) => slide.active).sort((a, b) => a.order - b.order);

  if (visible.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-brand-navy-800/20 p-8 text-center text-sm text-brand-navy-800/60">
        {t("admin.slider.noActiveSlides")}
      </p>
    );
  }

  return (
    <FeaturedSlider
      items={visible}
      getKey={(slide) => slide.id}
      ariaLabel={t("admin.slider.livePreview")}
      variant="dark"
      renderItem={(slide) => (
        <div className={`flex flex-col items-center gap-3 rounded-xl bg-linear-to-br p-8 text-center text-white ${accent}`}>
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
            <NavIcon icon={slide.imageIcon} className="h-7 w-7" />
          </span>
          <h3 className="text-xl font-black">{lang === "ga" ? slide.titleGa : slide.titleEn}</h3>
          <p className="max-w-sm text-sm text-white/85">
            {lang === "ga" ? slide.descriptionGa : slide.descriptionEn}
          </p>
          {slide.ctaText && (
            <span className="mt-2 rounded-md bg-white px-4 py-2 text-sm font-bold text-brand-navy-900">
              {slide.ctaText}
            </span>
          )}
        </div>
      )}
    />
  );
}
