import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import { mainNavigation } from "../../data/navigation";
import { Navigation } from "../nav/Navigation";
import { LanguageSwitcher } from "../nav/LanguageSwitcher";
import { SocialLinks } from "../nav/SocialLinks";
import { MenuIcon, CloseIcon, SearchIcon, LockIcon } from "../icons";

export function Header() {
  const { lang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastLang, setLastLang] = useState(lang);

  if (lang !== lastLang) {
    setLastLang(lang);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 shadow-sm">
      <div className="hidden bg-brand-navy-900 text-white sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-4 px-4 py-1.5 sm:px-6 lg:px-8">
          <SocialLinks variant="dark" />
          <span className="h-5 w-px bg-white/20" aria-hidden="true" />
          <Link
            to="/admin/login"
            className="flex items-center gap-1.5 rounded px-1.5 py-1 text-xs font-bold text-white/80 hover:text-white"
          >
            <LockIcon className="h-3.5 w-3.5" />
            {t("admin.loginLink")}
          </Link>
          <span className="h-5 w-px bg-white/20" aria-hidden="true" />
          <LanguageSwitcher />
        </div>
      </div>

      <div className="border-b-4 border-brand-gold-500 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-md py-1"
            aria-label={`${t("site.name")} - ${t("common.home")}`}
          >
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green-800 text-lg font-bold text-white"
              aria-hidden="true"
            >
              AT
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-brand-navy-900">
                {t("site.name")}
              </span>
              <span className="hidden text-xs font-medium text-brand-navy-800/70 sm:block">
                {t("site.tagline")}
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-2 lg:flex">
            <Navigation items={mainNavigation} />
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/cuardach"
              aria-label={t("common.search")}
              className="flex h-11 w-11 items-center justify-center rounded-md text-brand-navy-900 hover:bg-brand-green-50"
            >
              <SearchIcon className="h-5 w-5" />
            </Link>
            <LanguageSwitcher className="sm:hidden" />
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-brand-navy-800/20 text-brand-navy-900 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.menu")}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-brand-navy-800/10 bg-white px-4 py-4 lg:hidden"
        >
          <Navigation
            items={mainNavigation}
            variant="vertical"
            onNavigate={() => setMobileOpen(false)}
          />
          <div className="mt-4 flex items-center justify-between border-t border-brand-navy-800/10 pt-4">
            <SocialLinks />
            <Link
              to="/admin/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-1.5 rounded px-2 py-1.5 text-sm font-bold text-brand-navy-800/70 hover:text-brand-navy-900"
            >
              <LockIcon className="h-4 w-4" />
              {t("admin.loginLink")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
