import { useLanguage } from "../../i18n/useLanguage";
import type { TobghaeltachtItem, MediaType } from "../../data/tobghaeltachtItems";
import { tobghaeltachtCategories } from "../../data/tobghaeltachtCategories";
import { DocumentIcon, EyeIcon, GridIcon, PlayIcon, SoundIcon } from "../icons";

const MEDIA_STYLES: Record<MediaType, { gradient: string; icon: typeof PlayIcon }> = {
  video: { gradient: "from-brand-navy-700 to-brand-navy-900", icon: PlayIcon },
  audio: { gradient: "from-brand-green-600 to-brand-green-800", icon: SoundIcon },
  activity: { gradient: "from-brand-gold-500 to-brand-gold-600", icon: GridIcon },
  document: { gradient: "from-brand-navy-600 to-brand-navy-800", icon: DocumentIcon },
};

interface MultimediaCardProps {
  item: TobghaeltachtItem;
  onOpen: (item: TobghaeltachtItem) => void;
}

export function MultimediaCard({ item, onOpen }: MultimediaCardProps) {
  const { lang, t } = useLanguage();
  const category = tobghaeltachtCategories.find((option) => option.id === item.category);
  const { gradient, icon: MediaIcon } = MEDIA_STYLES[item.mediaType];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-brand-navy-800/10 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div
        className={`flex h-24 items-center justify-center bg-linear-to-br text-white ${gradient}`}
        aria-hidden="true"
      >
        <MediaIcon className="h-8 w-8" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold text-brand-navy-900">
          {lang === "ga" ? item.titleGa : item.titleEn}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-navy-800/80">
          {item.description[lang]}
        </p>

        {category && (
          <span className="mt-3 inline-flex w-fit items-center rounded-full bg-brand-green-50 px-2.5 py-1 text-xs font-bold text-brand-green-800">
            {category.label[lang]}
          </span>
        )}

        <button
          type="button"
          onClick={() => onOpen(item)}
          className="mt-4 flex items-center justify-center gap-1.5 rounded-md bg-brand-green-700 px-3 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800"
        >
          <EyeIcon className="h-4 w-4" />
          {t("bunscoil.card.view")}
        </button>
      </div>
    </article>
  );
}
