import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import type { TeacherCategory } from "../../data/tobshaol/teacherCategories";

interface TeacherCategoryCardProps {
  category: TeacherCategory;
  onSelect: (categoryId: string) => void;
}

export function TeacherCategoryCard({ category, onSelect }: TeacherCategoryCardProps) {
  const { lang } = useLanguage();
  const Icon = category.icon;

  const content = (
    <>
      <span className={`flex h-12 w-12 items-center justify-center rounded-full text-white ${category.colorClass}`}>
        <Icon className="h-6 w-6" />
      </span>
      <span className="mt-4 block text-xl font-black text-brand-navy-900">
        {lang === "ga" ? category.titleGa : category.titleEn}
      </span>
      <span className="mt-2 block text-sm leading-relaxed text-brand-navy-800/70">
        {category.description[lang]}
      </span>
    </>
  );

  const className =
    "flex h-full flex-col items-start rounded-2xl border border-brand-navy-800/10 bg-teen-surface p-6 text-left shadow-sm transition-colors hover:border-teen-pink-400";

  if (category.external) {
    return (
      <Link to="/#naisc-sheachtracha" className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={() => onSelect(category.id)} className={className}>
      {content}
    </button>
  );
}
