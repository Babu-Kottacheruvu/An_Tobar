import { useLanguage } from "../../../i18n/useLanguage";
import { publishStatusOptions, type PublishStatus } from "../../../data/admin/managedResources";

const STATUS_STYLES: Record<PublishStatus, string> = {
  draft: "bg-brand-navy-50 text-brand-navy-800/70",
  review: "bg-brand-gold-50 text-brand-gold-600",
  published: "bg-brand-green-50 text-brand-green-800",
  archived: "bg-red-50 text-red-700",
};

export function ResourceStatusBadge({ status }: { status: PublishStatus }) {
  const { lang } = useLanguage();
  const option = publishStatusOptions.find((item) => item.id === status);

  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${STATUS_STYLES[status]}`}>
      {option?.label[lang]}
    </span>
  );
}
