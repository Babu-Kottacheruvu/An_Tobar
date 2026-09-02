import { useId, useRef, useState, type KeyboardEvent } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import { SearchIcon } from "../icons";

export interface SearchSuggestion {
  id: string;
  label: string;
}

interface GlobalSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: SearchSuggestion[];
  onSelectSuggestion: (label: string) => void;
}

export function GlobalSearchBar({ value, onChange, suggestions, onSelectSuggestion }: GlobalSearchBarProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listboxId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const showSuggestions = isOpen && suggestions.length > 0;

  const selectSuggestion = (label: string) => {
    onSelectSuggestion(label);
    setIsOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => (current <= 0 ? suggestions.length - 1 : current - 1));
    } else if (event.key === "Enter") {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        event.preventDefault();
        selectSuggestion(suggestions[activeIndex].label);
      } else {
        setIsOpen(false);
      }
    } else if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-brand-navy-800/40" />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={showSuggestions}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined}
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={t("globalSearch.heading")}
          className="w-full rounded-full border-2 border-brand-navy-800/15 bg-white py-4 pl-14 pr-5 text-lg text-brand-navy-900 shadow-sm placeholder:text-brand-navy-800/40 focus:border-brand-green-700"
        />
      </div>

      {showSuggestions && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={t("globalSearch.suggestionsLabel")}
          className="absolute left-0 right-0 top-full z-20 mt-2 max-h-72 overflow-y-auto rounded-lg border border-brand-navy-800/10 bg-white text-left shadow-lg"
        >
          {suggestions.map((suggestion, index) => (
            <li key={suggestion.id} role="presentation">
              <button
                type="button"
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                onMouseDown={(event) => {
                  event.preventDefault();
                  selectSuggestion(suggestion.label);
                }}
                className={`block w-full px-4 py-2.5 text-left text-sm ${
                  index === activeIndex
                    ? "bg-brand-green-50 text-brand-green-800"
                    : "text-brand-navy-900 hover:bg-brand-green-50"
                }`}
              >
                {suggestion.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
