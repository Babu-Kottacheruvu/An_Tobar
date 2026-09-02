import { useLanguage } from "../../../i18n/useLanguage";
import type { ManagedResource } from "../../../data/admin/managedResources";
import { DocumentIcon, PictureIcon, PlayIcon, PresentationIcon, SoundIcon, GridIcon } from "../../icons";

const TYPE_ICONS: Record<string, typeof DocumentIcon> = {
  pictures: PictureIcon,
  video: PlayIcon,
  audio: SoundIcon,
  presentation: PresentationIcon,
  document: DocumentIcon,
  worksheet: DocumentIcon,
  game: GridIcon,
};

export function ResourcePreviewCard({ resource }: { resource: Partial<ManagedResource> }) {
  const { lang, t } = useLanguage();
  const Icon = TYPE_ICONS[resource.resourceType ?? ""] ?? DocumentIcon;

  return (
    <div className="mx-auto max-w-sm rounded-lg border border-brand-navy-800/12 bg-white shadow-sm">
      <div className="flex h-20 items-center justify-center bg-linear-to-br from-brand-green-700 to-brand-navy-900 text-white">
        <Icon className="h-8 w-8" />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-bold text-brand-navy-900">
            {(lang === "ga" ? resource.titleGa : resource.titleEn) || "—"}
          </h3>
          {resource.featured && (
            <span className="rounded-full bg-brand-gold-400 px-2.5 py-1 text-xs font-black text-brand-navy-900">
              {t("common.featured")}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-brand-navy-800/80">
          {resource.description?.[lang] || "—"}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
          {resource.schoolLevel && (
            <li className="rounded-full bg-brand-navy-50 px-2.5 py-1 text-brand-navy-800">
              {resource.schoolLevel === "primary" ? "Bunscoil" : "Iar-bhunscoil"}
            </li>
          )}
          {resource.yearGroup && resource.yearGroup !== "-" && (
            <li className="rounded-full bg-brand-navy-50 px-2.5 py-1 text-brand-navy-800">{resource.yearGroup}</li>
          )}
          {resource.topic && (
            <li className="rounded-full bg-brand-gold-50 px-2.5 py-1 text-brand-gold-600">{resource.topic}</li>
          )}
        </ul>
        {resource.tags && resource.tags.length > 0 && (
          <p className="mt-3 text-xs text-brand-navy-800/50">#{resource.tags.join(" #")}</p>
        )}
        <p className="mt-3 text-xs font-semibold text-brand-navy-800/40">{resource.author || "—"}</p>
      </div>
    </div>
  );
}
