import { NavLink } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import type { NavItem } from "../../data/navigation";
import { navIcons } from "../iconMaps";

interface NavigationProps {
  items: NavItem[];
  variant?: "horizontal" | "vertical";
  onNavigate?: () => void;
}

export function Navigation({
  items,
  variant = "horizontal",
  onNavigate,
}: NavigationProps) {
  const { t } = useLanguage();

  return (
    <nav aria-label={t("nav.mainNavigation")}>
      <ul
        className={
          variant === "horizontal"
            ? "flex items-center gap-1"
            : "flex flex-col gap-1"
        }
      >
        {items.map((item) => {
          const Icon = navIcons[item.id as keyof typeof navIcons];
          return (
            <li key={item.id}>
              <NavLink
                to={item.path}
                onClick={onNavigate}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                    variant === "vertical" ? "text-base px-4 py-3" : "",
                    isActive
                      ? "bg-brand-green-800 text-white"
                      : "text-brand-navy-900 hover:bg-brand-green-50",
                  ].join(" ")
                }
              >
                {Icon && <Icon className="h-5 w-5 shrink-0" />}
                <span>{t(item.labelKey)}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
