import { useLanguage } from "../../../i18n/useLanguage";
import type { NewsPublishStatus } from "../../../data/admin/newsManagement";

const STATUS_STYLES: Record<NewsPublishStatus, string> = {
  draft: "bg-brand-navy-50 text-brand-navy-800/70",
  scheduled: "bg-brand-gold-50 text-brand-gold-600",
  published: "bg-brand-green-50 text-brand-green-800",
};

const STATUS_LABEL: Record<NewsPublishStatus, { en: string; ga: string }> = {
  draft: { en: "Draft", ga: "Dréacht" },
  scheduled: { en: "Scheduled", ga: "Sceidealta" },
  published: { en: "Published", ga: "Foilsithe" },
};

export function NewsStatusBadge({ status }: { status: NewsPublishStatus }) {
  const { lang } = useLanguage();
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${STATUS_STYLES[status]}`}>
      {STATUS_LABEL[status][lang]}
    </span>
  );
}
