import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import { tobshaolYearGroups } from "../../data/tobshaol/yearGroups";
import { tobshaolSecondaryButtons } from "../../data/tobshaol/secondaryButtons";
import { yearUnitsByYearGroup } from "../../data/tobshaol/yearUnits";

const YEAR_COLORS = [
  "bg-teen-pink-600 text-white hover:bg-teen-pink-600/90",
  "bg-teen-violet-600 text-white hover:bg-teen-violet-600/90",
  "bg-teen-cyan-600 text-white hover:bg-teen-cyan-600/90",
  "bg-teen-yellow-400 text-brand-navy-900 hover:bg-teen-yellow-400/90",
];

interface TobshaolButtonGridProps {
  onSelectYear: (yearGroupId: string) => void;
}

export function TobshaolButtonGrid({ onSelectYear }: TobshaolButtonGridProps) {
  const { lang, t } = useLanguage();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
        {t("tobshaol.heroHeading")}
      </h2>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tobshaolYearGroups.map((year, index) => {
          const colorClass = YEAR_COLORS[index % YEAR_COLORS.length];
          const hasDedicatedPage = Boolean(yearUnitsByYearGroup[year.id]);

          if (hasDedicatedPage) {
            return (
              <Link
                key={year.id}
                to={`/iar-bhunscoil/${year.id}`}
                className={`rounded-2xl px-6 py-8 text-left shadow-lg transition-transform hover:-translate-y-1 ${colorClass}`}
              >
                <span className="block text-2xl font-black">{year.label[lang]}</span>
              </Link>
            );
          }

          return (
            <button
              key={year.id}
              type="button"
              onClick={() => onSelectYear(year.id)}
              className={`rounded-2xl px-6 py-8 text-left shadow-lg transition-transform hover:-translate-y-1 ${colorClass}`}
            >
              <span className="block text-2xl font-black">{year.label[lang]}</span>
            </button>
          );
        })}
      </div>

      <h3 className="mt-10 text-sm font-black uppercase tracking-wide text-white/60">
        {t("tobshaol.smallButtonsHeading")}
      </h3>
      <div className="mt-4 flex flex-wrap gap-3">
        {tobshaolSecondaryButtons.map((button) => {
          const Icon = button.icon;
          const content = (
            <>
              <Icon className="h-4 w-4" />
              <span>{button.label[lang]}</span>
            </>
          );
          const className =
            "flex items-center gap-2 rounded-full border border-white/20 bg-teen-surface px-4 py-2.5 text-sm font-bold text-white hover:border-teen-pink-400 hover:text-teen-pink-400";

          if (button.path.startsWith("#")) {
            return (
              <button
                key={button.id}
                type="button"
                onClick={() =>
                  document.getElementById(button.path.slice(1))?.scrollIntoView({ behavior: "smooth" })
                }
                className={className}
              >
                {content}
              </button>
            );
          }

          return (
            <Link key={button.id} to={button.path} className={className}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
