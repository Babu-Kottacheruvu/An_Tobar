import { useLanguage } from "../../i18n/useLanguage";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const { t } = useLanguage();

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label={t("common.page")} className="mt-8 flex items-center justify-center gap-1">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-brand-navy-800/20 text-brand-navy-900 disabled:opacity-40"
        aria-label={t("common.previous")}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      <span className="sr-only" aria-live="polite">
        {t("common.page")} {page} {t("common.of")} {totalPages}
      </span>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={`hidden h-10 w-10 items-center justify-center rounded-md text-sm font-semibold sm:flex ${
            p === page
              ? "bg-brand-green-800 text-white"
              : "border border-brand-navy-800/20 text-brand-navy-900 hover:bg-brand-green-50"
          }`}
        >
          {p}
        </button>
      ))}

      <span className="text-sm font-semibold text-brand-navy-900 sm:hidden">
        {page} / {totalPages}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label={t("common.next")}
        className="flex h-10 items-center justify-center gap-1 rounded-md border border-brand-navy-800/20 px-3 text-sm font-semibold text-brand-navy-900 disabled:opacity-40"
      >
        <span className="hidden sm:inline">{t("common.next")}</span>
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </nav>
  );
}
