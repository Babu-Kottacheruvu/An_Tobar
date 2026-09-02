import { Outlet } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col bg-brand-cream text-brand-navy-900">
      <a href="#main-content" className="skip-link">
        {t("skip.toContent")}
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
