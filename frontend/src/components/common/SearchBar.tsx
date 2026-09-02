import { useId } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import { SearchIcon } from "../icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function SearchBar({ value, onChange, label, placeholder }: SearchBarProps) {
  const { t } = useLanguage();
  const id = useId();

  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label ?? t("common.search")}
      </label>
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-navy-800/50" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder ?? t("common.searchPlaceholder")}
        className="w-full rounded-md border border-brand-navy-800/25 bg-white py-3 pl-10 pr-3 text-base text-brand-navy-900 placeholder:text-brand-navy-800/50 focus:border-brand-green-700"
      />
    </div>
  );
}
