import { useLanguage } from "../../i18n/useLanguage";
import type { RelatedItem } from "../../data/bunscoil/related";

interface RelatedChipsProps {
  heading: string;
  items: RelatedItem[];
  onSelect: (item: RelatedItem) => void;
}

export function RelatedChips({ heading, items, onSelect }: RelatedChipsProps) {
  const { lang } = useLanguage();

  return (
    <div>
      <h3 className="text-sm font-black uppercase tracking-wide text-brand-navy-800/70">
        {heading}
      </h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="rounded-full border border-brand-navy-800/15 bg-white px-3.5 py-1.5 text-sm font-semibold text-brand-navy-900 hover:border-brand-green-700 hover:text-brand-green-800"
            >
              {item.label[lang]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
