import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import { tobshaolNavigation } from "../../data/tobshaol/navigation";
import { LanguageSwitcher } from "../nav/LanguageSwitcher";
import { MenuIcon, CloseIcon } from "../icons";

export function TobshaolHeader() {
  const { lang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastLang, setLastLang] = useState(lang);

  if (lang !== lastLang) {
    setLastLang(lang);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-brand-navy-800/10 bg-teen-surface text-brand-navy-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/iar-bhunscoil" className="flex items-baseline gap-1 rounded-md">
          <span className="text-2xl font-black tracking-tight text-teen-pink-600">#</span>
          <span className="text-2xl font-black uppercase tracking-tight">Tobshaol</span>
        </Link>

        <nav aria-label={t("nav.mainNavigation")} className="hidden items-center gap-1 lg:flex">
          {tobshaolNavigation.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.id === "home"}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-black uppercase tracking-wide transition-colors ${
                  isActive
                    ? "bg-teen-pink-600 text-white"
                    : "text-brand-navy-800/80 hover:bg-brand-navy-800/5 hover:text-brand-navy-900"
                }`
              }
            >
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-brand-navy-800/20 text-brand-navy-900 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="tobshaol-mobile-nav"
            aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.menu")}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="tobshaol-mobile-nav" className="border-t border-brand-navy-800/10 bg-teen-surface px-4 py-4 lg:hidden">
          <div className="mb-4 sm:hidden">
            <LanguageSwitcher />
          </div>
          <ul className="flex flex-col gap-1">
            {tobshaolNavigation.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  end={item.id === "home"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-md px-4 py-3 text-base font-black uppercase tracking-wide ${
                      isActive ? "bg-teen-pink-600 text-white" : "text-brand-navy-800/85 hover:bg-brand-navy-800/5"
                    }`
                  }
                >
                  {t(item.labelKey)}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
