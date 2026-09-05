import { useRef } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import { TobshaolButtonGrid } from "../../components/tobshaol/TobshaolButtonGrid";
import { TobshaolSearch, type TobshaolSearchHandle } from "../../components/tobshaol/TobshaolSearch";
import { TobshaolNewsFeed } from "../../components/tobshaol/TobshaolNewsFeed";
import { TobshaolSpotlight } from "../../components/tobshaol/TobshaolSpotlight";

export function TobshaolHome() {
  const { t } = useLanguage();
  const searchRef = useRef<TobshaolSearchHandle>(null);

  const handleSelectYear = (yearGroupId: string) => {
    searchRef.current?.selectYear(yearGroupId);
    document.getElementById("tobshaol-cuardach")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section className="overflow-hidden border-b border-brand-navy-800/10 bg-linear-to-br from-teen-ink via-teen-surface to-teen-ink py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-teen-cyan-600">
            #Tobshaol
          </p>
          <h1 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight text-brand-navy-900 sm:text-6xl">
            {t("tobshaol.tagline")}
          </h1>
        </div>
      </section>

      <div className="py-12 sm:py-16">
        <TobshaolButtonGrid onSelectYear={handleSelectYear} />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <div id="tobshaol-cuardach" className="scroll-mt-20">
              <TobshaolSearch ref={searchRef} />
            </div>

            <div className="mt-16">
              <TobshaolSpotlight />
            </div>
          </div>

          <TobshaolNewsFeed />
        </div>
      </div>
    </>
  );
}
