import { useLanguage } from "../i18n/useLanguage";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { ExternalLinkIcon, GridIcon } from "../components/icons";

export function PadletCogg() {
  const { t } = useLanguage();

  return (
    <>
      <Breadcrumbs items={[{ label: t("nav.padlet") }]} />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-green-800 text-white">
            <GridIcon className="h-7 w-7" />
          </span>
          <div>
            <h1 className="text-3xl font-black text-brand-navy-900 sm:text-4xl">
              {t("padlet.title")}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-brand-navy-800/80">
              {t("padlet.intro")}
            </p>
          </div>
        </div>

        <div className="mt-8 flex aspect-video w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-brand-navy-800/25 bg-white p-8 text-center">
          <GridIcon className="h-10 w-10 text-brand-navy-800/40" />
          <p className="max-w-sm text-sm text-brand-navy-800/70">{t("padlet.embedNotice")}</p>
          <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-md bg-brand-navy-800/10 px-5 py-3 text-sm font-bold text-brand-navy-800/60">
            {t("padlet.openButton")}
            <ExternalLinkIcon className="h-4 w-4" />
          </span>
          <p className="text-xs font-semibold text-brand-navy-800/50">{t("common.comingSoon")}</p>
        </div>
      </div>
    </>
  );
}
