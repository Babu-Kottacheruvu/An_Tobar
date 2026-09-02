import { NavLink, useNavigate } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import { adminNavigation } from "../../data/adminNav";
import { setAdminAuthenticated } from "./adminAuth";
import { HomeIcon, LogOutIcon } from "../icons";

export function AdminSidebar() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSignOut = () => {
    setAdminAuthenticated(false);
    navigate("/admin/login");
  };

  return (
    <nav aria-label={t("admin.dashboard")} className="w-full lg:w-64 lg:shrink-0">
      <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {adminNavigation.map((item) => (
          <li key={item.id} className="shrink-0 lg:w-full">
            <NavLink
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                [
                  "block whitespace-nowrap rounded-md px-4 py-2.5 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-brand-green-800 text-white"
                    : "text-brand-navy-900 hover:bg-brand-green-50",
                ].join(" ")
              }
            >
              {t(item.labelKey)}
            </NavLink>
          </li>
        ))}
        <li className="shrink-0 border-brand-navy-800/10 lg:mt-4 lg:w-full lg:border-t lg:pt-4">
          <NavLink
            to="/"
            className="flex items-center gap-2 whitespace-nowrap rounded-md px-4 py-2.5 text-sm font-semibold text-brand-navy-800/80 hover:bg-brand-green-50"
          >
            <HomeIcon className="h-4 w-4" />
            {t("admin.backToSite")}
          </NavLink>
        </li>
        <li className="shrink-0 lg:w-full">
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 whitespace-nowrap rounded-md px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50"
          >
            <LogOutIcon className="h-4 w-4" />
            {t("admin.signOut")}
          </button>
        </li>
      </ul>
    </nav>
  );
}
