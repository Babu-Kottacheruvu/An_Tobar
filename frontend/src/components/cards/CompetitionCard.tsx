import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import type { Competition } from "../../data/competitions";
import { entryTypeOptions } from "../../data/competitionFilters";
import { TrophyIcon } from "../icons";
import { CompetitionStatusBadge } from "./CompetitionStatusBadge";

export function CompetitionCard({ competition }: { competition: Competition }) {
  const { lang, t } = useLanguage();

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-lg border border-brand-navy-800/12 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div
        className="flex h-28 items-center justify-center bg-linear-to-br from-brand-gold-500 to-brand-green-800 text-white"
        aria-hidden="true"
      >
        <TrophyIcon className="h-10 w-10" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-brand-navy-900">
            <Link to={`/comortais/${competition.slug}`} className="rounded after:absolute after:inset-0">
              {competition.title[lang]}
            </Link>
          </h3>
          <CompetitionStatusBadge deadline={competition.deadline} />
        </div>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-navy-800/80">
          {competition.description[lang]}
        </p>

        <p className="mt-3 text-sm font-semibold text-brand-navy-900">{competition.ageGroup[lang]}</p>

        <ul className="mt-2 flex flex-wrap gap-2 text-xs font-bold">
          {competition.entryTypes.map((entryType) => {
            const option = entryTypeOptions.find((item) => item.id === entryType);
            return option ? (
              <li key={entryType} className="rounded-full bg-brand-navy-50 px-2.5 py-1 text-brand-navy-800">
                {option.label[lang]}
              </li>
            ) : null;
          })}
        </ul>

        <p className="relative z-10 mt-4 text-sm font-semibold text-brand-navy-900">
          {t("common.deadline")}:{" "}
          <time dateTime={competition.deadline}>
            {new Date(competition.deadline).toLocaleDateString(lang === "ga" ? "ga-IE" : "en-IE", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </p>

        <Link
          to={`/comortais/${competition.slug}`}
          className="relative z-10 mt-4 inline-flex w-fit items-center gap-1 rounded-md bg-brand-green-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800"
        >
          {t("competitions.enterButton")}
        </Link>
      </div>
    </article>
  );
}
