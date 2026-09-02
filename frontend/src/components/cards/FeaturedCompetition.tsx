import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import type { Competition } from "../../data/competitions";
import { TrophyIcon } from "../icons";
import { CompetitionStatusBadge } from "./CompetitionStatusBadge";

export function FeaturedCompetition({ competition }: { competition: Competition }) {
  const { lang, t } = useLanguage();

  return (
    <article className="relative overflow-hidden rounded-2xl border border-brand-navy-800/12 bg-white shadow-md md:grid md:grid-cols-2">
      <div
        className="flex h-48 items-center justify-center bg-linear-to-br from-brand-gold-500 to-brand-green-800 text-white md:h-full"
        aria-hidden="true"
      >
        <TrophyIcon className="h-16 w-16" />
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide">
          <span className="rounded-full bg-brand-gold-50 px-2.5 py-1 text-brand-gold-600">
            {t("competitions.featured")}
          </span>
          <CompetitionStatusBadge deadline={competition.deadline} />
        </div>

        <h2 className="mt-3 text-2xl font-black leading-tight text-brand-navy-900 sm:text-3xl">
          <Link to={`/comortais/${competition.slug}`} className="rounded after:absolute after:inset-0">
            {competition.title[lang]}
          </Link>
        </h2>

        <p className="mt-3 text-base leading-relaxed text-brand-navy-800/85">
          {competition.description[lang]}
        </p>

        <p className="mt-3 text-sm font-semibold text-brand-navy-900">{competition.ageGroup[lang]}</p>
        <p className="mt-1 text-sm font-semibold text-brand-navy-900">
          {t("common.deadline")}:{" "}
          <time dateTime={competition.deadline}>
            {new Date(competition.deadline).toLocaleDateString(lang === "ga" ? "ga-IE" : "en-IE", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </p>

        <span className="relative z-10 mt-5 inline-flex w-fit items-center gap-1 rounded-md bg-brand-green-700 px-5 py-2.5 text-sm font-bold text-white">
          {t("competitions.enterButton")} →
        </span>
      </div>
    </article>
  );
}
