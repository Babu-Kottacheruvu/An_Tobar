import { Outlet } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import { TobshaolHeader } from "./TobshaolHeader";
import { Footer } from "../layout/Footer";

export function TobshaolLayout() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col bg-teen-ink text-white">
      <a href="#main-content" className="skip-link">
        {t("skip.toContent")}
      </a>
      <TobshaolHeader />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
