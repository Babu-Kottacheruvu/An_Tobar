import { useLanguage } from "../../i18n/useLanguage";
import { getCompetitionStatus, type CompetitionStatus } from "../../data/competitions";

const STATUS_STYLES: Record<CompetitionStatus, string> = {
  open: "bg-brand-green-50 text-brand-green-800",
  "closing-soon": "bg-brand-gold-50 text-brand-gold-600",
  closed: "bg-brand-navy-50 text-brand-navy-800/70",
};

const STATUS_LABEL: Record<CompetitionStatus, { en: string; ga: string }> = {
  open: { en: "Open", ga: "Oscailte" },
  "closing-soon": { en: "Closing Soon", ga: "Ag Dúnadh go Luath" },
  closed: { en: "Closed", ga: "Dúnta" },
};

export function CompetitionStatusBadge({ deadline }: { deadline: string }) {
  const { lang } = useLanguage();
  const status = getCompetitionStatus(deadline);

  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${STATUS_STYLES[status]}`}>
      {STATUS_LABEL[status][lang]}
    </span>
  );
}
