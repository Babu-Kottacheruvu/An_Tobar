import { useLanguage } from "../../../i18n/useLanguage";
import type { CmsNavItem } from "../../../data/admin/navigationTrees";
import { NavIcon } from "./iconRegistry";

interface NavigationPreviewProps {
  items: CmsNavItem[];
  theme: "light" | "bunscoil" | "tobshaol";
}

const THEME_STYLES = {
  light: {
    bar: "bg-white border border-brand-navy-800/12",
    pill: "text-brand-navy-900 hover:bg-brand-green-50",
  },
  bunscoil: {
    bar: "bg-linear-to-r from-brand-green-600 to-brand-navy-800",
    pill: "text-white hover:bg-white/15",
  },
  tobshaol: {
    bar: "bg-teen-ink",
    pill: "text-white/90 hover:bg-white/10",
  },
} as const;

export function NavigationPreview({ items, theme }: NavigationPreviewProps) {
  const { lang } = useLanguage();
  const style = THEME_STYLES[theme];
  const visible = items
    .filter((item) => item.parentId === null && item.active)
    .sort((a, b) => a.order - b.order);

  return (
    <div className={`overflow-x-auto rounded-lg p-3 ${style.bar}`}>
      <nav className="flex min-w-max items-center gap-1">
        {visible.map((item) => (
          <span
            key={item.id}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-bold ${style.pill}`}
          >
            <NavIcon icon={item.icon} className="h-4 w-4" />
            {lang === "ga" ? item.labelGa : item.labelEn}
          </span>
        ))}
        {visible.length === 0 && (
          <span className="px-3 py-2 text-sm font-semibold text-brand-navy-800/50">—</span>
        )}
      </nav>
    </div>
  );
}
