import { useLanguage } from "../../i18n/useLanguage";
import { tobshaolResources } from "../../data/tobshaol/resources";
import { TobshaolResourceCard } from "./TobshaolResourceCard";
import { FeaturedSlider } from "../cards/FeaturedSlider";

export function TobshaolSpotlight() {
  const { t } = useLanguage();
  const featured = tobshaolResources.filter((resource) => resource.featured);

  if (featured.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-black uppercase tracking-tight text-brand-navy-900 sm:text-3xl">
        {t("tobshaol.spotlightHeading")}
      </h2>
      <div className="mt-5">
        <FeaturedSlider
          items={featured}
          getKey={(resource) => resource.id}
          ariaLabel={t("tobshaol.spotlightHeading")}
          variant="light"
          renderItem={(resource) => (
            <div className="mx-auto max-w-md">
              <TobshaolResourceCard resource={resource} />
            </div>
          )}
        />
      </div>
    </div>
  );
}
