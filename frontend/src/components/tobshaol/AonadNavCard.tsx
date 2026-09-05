import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import type { AonadNavItem } from "../../data/tobshaol/aonadNav";

export function AonadNavCard({ item }: { item: AonadNavItem }) {
  const { lang } = useLanguage();
  const Icon = item.icon;

  const content = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teen-cyan-600/10 text-teen-cyan-600">
        <Icon className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-sm font-black text-brand-navy-900">
          {lang === "ga" ? item.titleGa : item.titleEn}
        </span>
      </span>
    </>
  );

  const className =
    "flex items-center gap-3 rounded-xl border border-brand-navy-800/10 bg-teen-surface px-4 py-3.5 text-left shadow-sm transition-colors hover:border-teen-pink-400";

  if (item.action.type === "link") {
    return (
      <Link to={item.action.path} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() =>
        document.getElementById(item.action.type === "scroll" ? item.action.targetId : "")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
      className={className}
    >
      {content}
    </button>
  );
}
