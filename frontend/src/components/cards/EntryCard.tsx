import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import type { EntryCardConfig } from "../../data/entryCards";
import { BookIcon, StudentIcon } from "../icons";

const variantStyles = {
  primary: {
    wrapper:
      "bg-linear-to-br from-brand-green-600 to-brand-green-800 text-white rounded-[2rem] hover:from-brand-green-700 hover:to-brand-green-900",
    icon: "bg-brand-gold-400 text-brand-navy-900",
    subtitle: "text-brand-green-50/90",
    Icon: StudentIcon,
  },
  secondary: {
    wrapper:
      "bg-linear-to-br from-brand-navy-800 to-brand-navy-900 text-white rounded-lg hover:from-brand-navy-900 hover:to-black",
    icon: "bg-white text-brand-navy-900",
    subtitle: "text-brand-navy-50/80",
    Icon: BookIcon,
  },
} as const;

export function EntryCard({ config }: { config: EntryCardConfig }) {
  const { t } = useLanguage();
  const style = variantStyles[config.variant];
  const Icon = style.Icon;

  return (
    <Link
      to={config.path}
      className={`group flex items-center gap-5 p-7 shadow-md transition-transform hover:-translate-y-0.5 sm:p-8 ${style.wrapper}`}
    >
      <span
        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-2xl font-black shadow-inner ${style.icon}`}
      >
        <Icon className="h-8 w-8" />
      </span>
      <span>
        <span className="block text-2xl font-black sm:text-3xl">{t(config.titleKey)}</span>
        <span className={`mt-1 block text-sm font-semibold sm:text-base ${style.subtitle}`}>
          {t(config.subtitleKey)}
        </span>
      </span>
    </Link>
  );
}
