import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import { bunscoilHeroSlides, type HeroSlide } from "../../data/bunscoil/heroSlides";
import { FeaturedSlider } from "../cards/FeaturedSlider";
import { HomeIcon, PlayIcon, TeacherIcon } from "../icons";

const artStyles: Record<HeroSlide["art"], { gradient: string; Icon: typeof HomeIcon }> = {
  welcome: { gradient: "from-brand-green-600 to-brand-green-900", Icon: HomeIcon },
  playful: { gradient: "from-brand-gold-500 to-brand-green-700", Icon: PlayIcon },
  teacher: { gradient: "from-brand-navy-700 to-brand-navy-900", Icon: TeacherIcon },
};

export function BunscoilHeroSlider() {
  const { lang, t } = useLanguage();

  return (
    <FeaturedSlider
      items={bunscoilHeroSlides}
      getKey={(slide) => slide.id}
      ariaLabel={t("bunscoil.searchHeading")}
      renderItem={(slide) => {
        const { gradient, Icon } = artStyles[slide.art];
        return (
          <div
            className={`grid grid-cols-1 items-center gap-8 rounded-2xl bg-linear-to-br p-8 text-white sm:p-12 md:grid-cols-[1fr_auto] ${gradient}`}
          >
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black sm:text-4xl">{slide.title[lang]}</h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/90 sm:text-lg md:mx-0">
                {slide.description[lang]}
              </p>
              <Link
                to={slide.ctaPath}
                className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-base font-bold text-brand-navy-900 shadow hover:bg-brand-gold-50"
              >
                {slide.ctaLabel[lang]}
              </Link>
            </div>
            <span
              className="mx-auto flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-white/15 sm:h-40 sm:w-40"
              aria-hidden="true"
            >
              <Icon className="h-16 w-16 sm:h-20 sm:w-20" />
            </span>
          </div>
        );
      }}
    />
  );
}
