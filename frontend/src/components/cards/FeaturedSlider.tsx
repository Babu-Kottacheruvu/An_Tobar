import { useState, type ReactNode } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";

interface FeaturedSliderProps<T> {
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  ariaLabel: string;
  /** 'light' (default) suits a white/cream page background; 'dark' suits a dark section. */
  variant?: "light" | "dark";
}

export function FeaturedSlider<T>({
  items,
  getKey,
  renderItem,
  ariaLabel,
  variant = "light",
}: FeaturedSliderProps<T>) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const isDark = variant === "dark";

  if (items.length === 0) return null;

  const goTo = (next: number) => {
    setIndex((next + items.length) % items.length);
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={ariaLabel} className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((item) => (
            <div
              key={getKey(item)}
              role="group"
              aria-roledescription="slide"
              className="w-full shrink-0 px-1"
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>

      {items.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label={t("common.previous")}
            className={
              isDark
                ? "flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10"
                : "flex h-10 w-10 items-center justify-center rounded-full border border-brand-navy-800/20 text-brand-navy-900 hover:bg-brand-green-50"
            }
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {items.map((item, itemIndex) => (
              <button
                key={getKey(item)}
                type="button"
                onClick={() => goTo(itemIndex)}
                aria-label={`${t("common.page")} ${itemIndex + 1} ${t("common.of")} ${items.length}`}
                aria-current={itemIndex === index}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  itemIndex === index
                    ? isDark
                      ? "bg-teen-pink-400"
                      : "bg-brand-green-700"
                    : isDark
                      ? "bg-white/20"
                      : "bg-brand-navy-800/20"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label={t("common.next")}
            className={
              isDark
                ? "flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10"
                : "flex h-10 w-10 items-center justify-center rounded-full border border-brand-navy-800/20 text-brand-navy-900 hover:bg-brand-green-50"
            }
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
