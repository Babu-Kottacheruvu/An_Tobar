import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import type { TeacherGuideSection } from "../../data/bunscoil/teacherGuideSections";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CollapseIcon,
  DownloadIcon,
  ExpandIcon,
  SearchIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "../icons";

interface DocumentViewerProps {
  sections: TeacherGuideSection[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
}

export function DocumentViewer({ sections, activeIndex, onActiveIndexChange }: DocumentViewerProps) {
  const { lang, t } = useLanguage();
  const [zoom, setZoom] = useState(100);
  const [fullScreen, setFullScreen] = useState(false);
  const [query, setQuery] = useState("");

  const active = sections[activeIndex];

  const matches = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];
    return sections
      .map((section, index) => ({ section, index }))
      .filter(({ section }) => section.title[lang].toLowerCase().includes(trimmed));
  }, [query, sections, lang]);

  useEffect(() => {
    if (!fullScreen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setFullScreen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [fullScreen]);

  const goTo = (index: number) => onActiveIndexChange(Math.max(0, Math.min(sections.length - 1, index)));

  const handleDownload = async () => {
    const { downloadDocumentPdf } = await import("../../utils/downloadResourcePdf");
    downloadDocumentPdf(
      t("teacherGuide.featuredTitle"),
      sections.map((section) => ({
        heading: section.title[lang],
        description: section.description[lang],
        bullets: section.bullets.map((bullet) => bullet[lang]),
      })),
      "treoir-an-muinteora.pdf",
      lang,
    );
  };

  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 z-50 flex flex-col bg-white"
          : "flex flex-col overflow-hidden rounded-2xl border border-brand-navy-800/12 bg-white shadow-lg"
      }
    >
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 bg-brand-navy-900 px-3 py-2.5 text-white sm:gap-3 sm:px-4">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label={t("common.previous")}
            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-white/10 disabled:opacity-30"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <span className="whitespace-nowrap text-xs font-semibold sm:text-sm">
            {t("common.page")} {activeIndex + 1} {t("common.of")} {sections.length}
          </span>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === sections.length - 1}
            aria-label={t("common.next")}
            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-white/10 disabled:opacity-30"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="relative order-last w-full sm:order-none sm:ml-2 sm:w-56">
          <label htmlFor="guide-search" className="sr-only">
            {t("teacherGuide.searchInGuide")}
          </label>
          <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
          <input
            id="guide-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && matches.length > 0) goTo(matches[0].index);
            }}
            placeholder={t("teacherGuide.searchPlaceholder")}
            className="w-full rounded-md border border-white/20 bg-white/10 py-1.5 pl-8 pr-2 text-sm text-white placeholder:text-white/50 focus:border-white"
          />
          {query.trim() && (
            <ul className="absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-y-auto rounded-md border border-brand-navy-800/10 bg-white text-sm text-brand-navy-900 shadow-lg">
              {matches.length === 0 ? (
                <li className="px-3 py-2 text-brand-navy-800/60">{t("teacherGuide.noMatch")}</li>
              ) : (
                matches.map(({ section, index }) => (
                  <li key={section.id}>
                    <button
                      type="button"
                      onClick={() => {
                        goTo(index);
                        setQuery("");
                      }}
                      className="block w-full px-3 py-2 text-left hover:bg-brand-green-50"
                    >
                      {section.title[lang]}
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(50, z - 25))}
            aria-label={t("teacherGuide.zoomOut")}
            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-white/10"
          >
            <ZoomOutIcon className="h-5 w-5" />
          </button>
          <span className="w-11 text-center text-xs font-semibold sm:text-sm">{zoom}%</span>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(200, z + 25))}
            aria-label={t("teacherGuide.zoomIn")}
            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-white/10"
          >
            <ZoomInIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleDownload}
            aria-label={t("common.download")}
            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-white/10"
          >
            <DownloadIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setFullScreen((value) => !value)}
            aria-pressed={fullScreen}
            aria-label={fullScreen ? t("teacherGuide.exitFullScreen") : t("teacherGuide.fullScreen")}
            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-white/10"
          >
            {fullScreen ? <CollapseIcon className="h-5 w-5" /> : <ExpandIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        <nav
          aria-label={t("teacherGuide.tableOfContents")}
          className="hidden w-60 shrink-0 overflow-y-auto border-r border-brand-navy-800/10 bg-brand-navy-50 p-3 lg:block"
        >
          <p className="px-2 pb-2 text-xs font-black uppercase tracking-wide text-brand-navy-800/60">
            {t("teacherGuide.tableOfContents")}
          </p>
          <ul className="space-y-0.5">
            {sections.map((section, index) => (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => goTo(index)}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm font-semibold ${
                    index === activeIndex
                      ? "bg-brand-green-700 text-white"
                      : "text-brand-navy-900 hover:bg-brand-green-50"
                  }`}
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/10 text-xs">
                    {index + 1}
                  </span>
                  {section.title[lang]}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex min-h-0 flex-1 flex-col">
          <div
            aria-label={t("teacherGuide.pageThumbnails")}
            className="flex gap-2 overflow-x-auto border-b border-brand-navy-800/10 bg-white p-3"
          >
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`${t("teacherGuide.chapter")} ${index + 1}: ${section.title[lang]}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={`flex h-16 w-12 shrink-0 flex-col items-center justify-center gap-1 rounded-md border-2 text-xs font-bold ${
                    index === activeIndex
                      ? "border-brand-green-700 bg-brand-green-50 text-brand-green-800"
                      : "border-brand-navy-800/15 text-brand-navy-800/50 hover:border-brand-navy-800/30"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {index + 1}
                </button>
              );
            })}
          </div>

          <div className="flex-1 overflow-auto bg-brand-navy-100/40 p-4 sm:p-8">
            <div
              className="mx-auto flex min-h-95 w-full max-w-xl origin-top flex-col gap-4 rounded-md bg-white p-8 shadow-md transition-transform"
              style={{ transform: `scale(${zoom / 100})` }}
            >
              {active && (
                <>
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-green-50 text-brand-green-800">
                      <active.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-brand-navy-800/50">
                        {t("teacherGuide.chapter")} {activeIndex + 1}
                      </p>
                      <h3 className="text-lg font-black text-brand-navy-900">{active.title[lang]}</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-brand-navy-800/85">
                    {active.description[lang]}
                  </p>
                  <ul className="space-y-2 text-sm text-brand-navy-800/85">
                    {active.bullets.map((bullet) => (
                      <li key={bullet.en} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green-700" />
                        {bullet[lang]}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 space-y-2">
                    <div className="h-2 w-full rounded bg-brand-navy-800/8" />
                    <div className="h-2 w-5/6 rounded bg-brand-navy-800/8" />
                    <div className="h-2 w-4/6 rounded bg-brand-navy-800/8" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
