import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import { footerColumns, legalLinks } from "../../data/footer";
import { SocialLinks } from "../nav/SocialLinks";
import { LanguageSwitcher } from "../nav/LanguageSwitcher";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t-4 border-brand-gold-500 bg-brand-navy-900 text-brand-navy-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold-500 text-sm font-bold text-brand-navy-900"
              aria-hidden="true"
            >
              AT
            </span>
            <span className="text-lg font-bold text-white">{t("site.name")}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-navy-50/80">
            {t("footer.aboutText")}
          </p>
        </div>

        {footerColumns.map((column) => (
          <div key={column.id}>
            <h2 className="text-sm font-bold uppercase tracking-wide text-brand-gold-400">
              {t(column.headingKey)}
            </h2>
            <ul className="mt-4 space-y-2">
              {column.links.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.path}
                    className="rounded text-sm text-brand-navy-50/90 hover:text-white hover:underline"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-gold-400">
            {t("footer.contact")}
          </h2>
          <address className="mt-4 space-y-1 text-sm not-italic text-brand-navy-50/90">
            <p>An Tobar</p>
            <p>Éire / Ireland</p>
            <p>
              <a className="rounded hover:underline" href="mailto:eolas@antobar.ie">
                eolas@antobar.ie
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10 bg-brand-navy-800/40">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-gold-400">
            {t("footer.coggHeading")}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-navy-50/85">
            {t("footer.coggText")}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-brand-gold-400">
                {t("footer.followUs")}
              </p>
              <SocialLinks variant="dark" className="mt-2" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-brand-gold-400">
                {t("footer.language")}
              </p>
              <LanguageSwitcher className="mt-2" />
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-4 text-xs text-brand-navy-50/70 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {year} {t("site.name")} — {t("footer.rightsReserved")}
            </p>
            <ul className="flex flex-wrap gap-4">
              {legalLinks.map((link) => (
                <li key={link.id}>
                  <Link to={link.path} className="rounded hover:text-white hover:underline">
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
