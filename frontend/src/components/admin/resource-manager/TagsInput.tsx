import { useId, useState, type KeyboardEvent } from "react";
import { useLanguage } from "../../../i18n/useLanguage";
import { CloseIcon } from "../../icons";

interface TagsInputProps {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
}

export function TagsInput({ label, tags, onChange }: TagsInputProps) {
  const { t } = useLanguage();
  const id = useId();
  const [draft, setDraft] = useState("");

  const addTag = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setDraft("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(draft);
    } else if (event.key === "Backspace" && draft === "" && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold text-brand-navy-900">
        {label}
      </label>
      <div className="flex flex-wrap items-center gap-2 rounded-md border border-brand-navy-800/25 px-2 py-2 focus-within:border-brand-green-700">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 rounded-full bg-brand-green-50 px-2.5 py-1 text-xs font-bold text-brand-green-800"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(tags.filter((item) => item !== tag))}
              aria-label={`${t("admin.delete")}: ${tag}`}
              className="rounded hover:text-red-700"
            >
              <CloseIcon className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          id={id}
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(draft)}
          className="min-w-32 flex-1 border-none px-1 py-1 text-sm text-brand-navy-900 outline-none"
        />
      </div>
      <p className="text-xs text-brand-navy-800/50">{t("admin.res.tagsHint")}</p>
    </div>
  );
}
