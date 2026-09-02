import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../i18n/useLanguage";
import { competitions } from "../data/competitions";
import { entryTypeOptions } from "../data/competitionFilters";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { CompetitionStatusBadge } from "../components/cards/CompetitionStatusBadge";
import { CompetitionEntryForm } from "../components/cards/CompetitionEntryForm";
import { Modal } from "../components/common/Modal";
import { CheckIcon, TrophyIcon } from "../components/icons";
import { NotFound } from "./NotFound";

export function CompetitionDetail() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const competition = competitions.find((c) => c.slug === slug);
  const [entryOpen, setEntryOpen] = useState(false);

  if (!competition) return <NotFound />;

  const formattedDeadline = new Date(competition.deadline).toLocaleDateString(
    lang === "ga" ? "ga-IE" : "en-IE",
    { day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <>
      <Breadcrumbs
        items={[
          { label: t("nav.competitions"), path: "/comortais" },
          { label: competition.title[lang] },
        ]}
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          to="/comortais"
          className="rounded text-sm font-bold text-brand-green-800 underline-offset-2 hover:underline"
        >
          ← {t("nav.competitions")}
        </Link>

        <div className="mt-4 flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-gold-50 text-brand-gold-600">
            <TrophyIcon className="h-7 w-7" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-black text-brand-navy-900 sm:text-3xl">
                {competition.title[lang]}
              </h1>
              <CompetitionStatusBadge deadline={competition.deadline} />
            </div>
            <p className="mt-2 text-base leading-relaxed text-brand-navy-800/80">
              {competition.description[lang]}
            </p>
          </div>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
          <li className="rounded-full bg-brand-navy-50 px-2.5 py-1 text-brand-navy-800">
            {competition.ageGroup[lang]}
          </li>
          {competition.entryTypes.map((entryType) => {
            const option = entryTypeOptions.find((item) => item.id === entryType);
            return option ? (
              <li key={entryType} className="rounded-full bg-brand-navy-50 px-2.5 py-1 text-brand-navy-800">
                {option.label[lang]}
              </li>
            ) : null;
          })}
        </ul>

        <div className="mt-8 rounded-lg border border-brand-navy-800/12 bg-white p-6 sm:p-8">
          <p className="text-sm font-bold text-brand-navy-900">
            {t("common.deadline")}: <time dateTime={competition.deadline}>{formattedDeadline}</time>
          </p>

          <h2 className="mt-6 flex items-center gap-2 text-lg font-bold text-brand-navy-900">
            <CheckIcon className="h-5 w-5 text-brand-green-700" />
            {t("competitions.eligibility")}
          </h2>
          <p className="mt-2 text-base leading-relaxed text-brand-navy-800/90">
            {competition.eligibility[lang]}
          </p>

          <h2 className="mt-6 flex items-center gap-2 text-lg font-bold text-brand-navy-900">
            <CheckIcon className="h-5 w-5 text-brand-green-700" />
            {t("competitions.enter")}
          </h2>
          <p className="mt-2 text-base leading-relaxed text-brand-navy-800/90">
            {competition.howToEnter[lang]}
          </p>

          <details className="mt-6 rounded-md border border-brand-navy-800/12 p-4">
            <summary className="cursor-pointer text-lg font-bold text-brand-navy-900 marker:text-brand-green-700">
              {t("competitions.rules")}
            </summary>
            <p className="mt-3 text-base leading-relaxed text-brand-navy-800/90">
              {competition.rules[lang]}
            </p>
          </details>

          <button
            type="button"
            onClick={() => setEntryOpen(true)}
            className="mt-8 w-full rounded-md bg-brand-green-700 px-6 py-3.5 text-base font-bold text-white hover:bg-brand-green-800 sm:w-auto"
          >
            {t("competitions.enterButton")}
          </button>
        </div>
      </div>

      <Modal
        isOpen={entryOpen}
        onClose={() => setEntryOpen(false)}
        title={t("competitions.enterModalTitle")}
      >
        <CompetitionEntryForm onSubmitted={() => setEntryOpen(false)} />
      </Modal>
    </>
  );
}
