import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import { ChevronRightIcon } from "../icons";

export interface Crumb {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  /** 'light' (default) suits the main-site/Bunscoil pages; 'dark' suits #Tobshaol. */
  variant?: "light" | "dark";
}

export function Breadcrumbs({ items, variant = "light" }: BreadcrumbsProps) {
  const { t } = useLanguage();
  const allItems: Crumb[] = [{ label: t("common.home"), path: "/" }, ...items];
  const isDark = variant === "dark";

  return (
    <nav
      aria-label="Breadcrumb"
      className={
        isDark
          ? "border-b border-white/10 bg-teen-surface"
          : "border-b border-brand-navy-800/10 bg-brand-green-50"
      }
    >
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1 px-4 py-3 text-sm sm:px-6 lg:px-8">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRightIcon
                  className={isDark ? "h-4 w-4 text-white/40" : "h-4 w-4 text-brand-navy-800/50"}
                />
              )}
              {isLast || !item.path ? (
                <span
                  aria-current="page"
                  className={isDark ? "font-semibold text-white" : "font-semibold text-brand-navy-900"}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className={
                    isDark
                      ? "rounded text-teen-cyan-400 underline-offset-2 hover:underline"
                      : "rounded text-brand-green-800 underline-offset-2 hover:underline"
                  }
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
