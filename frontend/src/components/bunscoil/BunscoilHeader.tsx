import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import { bunscoilNavigation } from "../../data/bunscoil/navigation";
import { LanguageSwitcher } from "../nav/LanguageSwitcher";
import { MenuIcon, CloseIcon, SearchIcon, SparkleIcon } from "../icons";

export function BunscoilHeader() {
  const { lang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastLang, setLastLang] = useState(lang);

  if (lang !== lastLang) {
    setLastLang(lang);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 shadow-md">
      <div className="bg-linear-to-r from-brand-green-600 via-brand-green-700 to-brand-navy-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/bunscoil"
            className="flex items-center gap-3 rounded-md py-1"
            aria-label={`${t("site.name")} - ${t("home.entryBunscoilTitle")}`}
          >
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-gold-400 text-xl font-black text-brand-navy-900 shadow-inner"
              aria-hidden="true"
            >
              <SparkleIcon className="h-7 w-7" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-xl font-black text-white">{t("site.name")}</span>
              <span className="text-xs font-bold text-brand-gold-300">
                {t("bunscoil.tagline")}
              </span>
            </span>
          </Link>

          <nav
            aria-label={t("nav.mainNavigation")}
            className="hidden items-center gap-1 lg:flex"
          >
            {bunscoilNavigation.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.id === "home"}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                    isActive
                      ? "bg-white text-brand-green-800"
                      : "text-white/90 hover:bg-white/15"
                  }`
                }
              >
                {t(item.labelKey)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/bunscoil/acmhainni"
              aria-label={t("common.search")}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/15"
            >
              <SearchIcon className="h-5 w-5" />
            </Link>
            <LanguageSwitcher className="hidden sm:inline-flex" />
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="bunscoil-mobile-nav"
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
          id="bunscoil-mobile-nav"
          className="border-t-4 border-brand-gold-400 bg-white px-4 py-4 lg:hidden"
        >
          <div className="mb-4 sm:hidden">
            <LanguageSwitcher />
          </div>
          <ul className="flex flex-col gap-1">
            {bunscoilNavigation.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  end={item.id === "home"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-md px-4 py-3 text-base font-bold ${
                      isActive
                        ? "bg-brand-green-800 text-white"
                        : "text-brand-navy-900 hover:bg-brand-green-50"
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
