import { useLanguage } from "../../i18n/useLanguage";
import type { KidsCategory } from "../../data/bunscoil/kidsCategories";

export function KidsCategoryCard({ category }: { category: KidsCategory }) {
  const { lang } = useLanguage();
  const handleClick = () => {
    document.getElementById(category.targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex flex-col items-center gap-2 rounded-2xl p-6 text-center text-white shadow-md transition-transform hover:-translate-y-1 ${category.colorClass}`}
    >
      <span className="text-5xl" role="img" aria-hidden="true">
        {category.emoji}
      </span>
      <span className="text-lg font-black">{category.label[lang]}</span>
    </button>
  );
}
