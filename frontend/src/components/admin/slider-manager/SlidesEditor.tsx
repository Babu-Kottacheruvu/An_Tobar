import { useState } from "react";
import { useLanguage } from "../../../i18n/useLanguage";
import type { SlideItem } from "../../../data/admin/sliderManager";
import { SlideFormModal } from "./SlideFormModal";
import { NavIcon } from "../nav-manager/iconRegistry";
import { GridIcon } from "../../icons";

interface SlidesEditorProps {
  slides: SlideItem[];
  onChange: (slides: SlideItem[]) => void;
}

function makeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `slide-${Date.now()}`;
}

export function SlidesEditor({ slides, onChange }: SlidesEditorProps) {
  const { lang, t } = useLanguage();
  const [modalSlide, setModalSlide] = useState<SlideItem | "new" | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const sorted = [...slides].sort((a, b) => a.order - b.order);

  const handleDrop = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return;
    const draggedIndex = sorted.findIndex((slide) => slide.id === draggedId);
    const targetIndex = sorted.findIndex((slide) => slide.id === targetId);
    if (draggedIndex === -1 || targetIndex === -1) return;
    const reordered = [...sorted];
    const [moved] = reordered.splice(draggedIndex, 1);
    reordered.splice(targetIndex, 0, moved);
    onChange(reordered.map((slide, index) => ({ ...slide, order: index + 1 })));
    setDraggedId(null);
  };

  const handleToggleActive = (id: string) => {
    onChange(slides.map((slide) => (slide.id === id ? { ...slide, active: !slide.active } : slide)));
  };

  const handleDelete = (id: string) => {
    const slide = slides.find((item) => item.id === id);
    const label = (lang === "ga" ? slide?.titleGa : slide?.titleEn) ?? "";
    if (!window.confirm(`${t("admin.delete")}: ${label}?`)) return;
    onChange(slides.filter((slide) => slide.id !== id));
  };

  const handleDuplicate = (slide: SlideItem) => {
    const nextOrder = Math.max(...slides.map((item) => item.order)) + 1;
    onChange([
      ...slides,
      { ...slide, id: makeId(), order: nextOrder, titleGa: `${slide.titleGa} (Cóip)`, titleEn: `${slide.titleEn} (Copy)` },
    ]);
  };

  const handleSave = (form: Omit<SlideItem, "id" | "order">) => {
    if (modalSlide && modalSlide !== "new") {
      onChange(slides.map((slide) => (slide.id === modalSlide.id ? { ...slide, ...form } : slide)));
    } else {
      const nextOrder = slides.length ? Math.max(...slides.map((slide) => slide.order)) + 1 : 1;
      onChange([...slides, { ...form, id: makeId(), order: nextOrder }]);
    }
    setModalSlide(null);
  };

  return (
    <div>
      <ul className="space-y-2">
        {sorted.map((slide) => (
          <li key={slide.id}>
            <div
              draggable
              onDragStart={() => setDraggedId(slide.id)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => handleDrop(slide.id)}
              className={`flex flex-wrap items-center gap-3 rounded-md border border-brand-navy-800/10 bg-white px-3 py-2.5 ${
                slide.active ? "" : "opacity-50"
              }`}
            >
              <span className="cursor-grab text-brand-navy-800/30 active:cursor-grabbing" aria-hidden="true">
                <GridIcon className="h-4 w-4" />
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-brand-green-50 text-brand-green-800">
                <NavIcon icon={slide.imageIcon} className="h-4 w-4" />
              </span>
              <div className="min-w-48 flex-1">
                <p className="text-sm font-bold text-brand-navy-900">
                  {lang === "ga" ? slide.titleGa : slide.titleEn}
                </p>
                <p className="text-xs text-brand-navy-800/50">
                  {slide.ctaText || "—"} → {slide.ctaDestination}
                </p>
              </div>
              <p className="hidden text-xs text-brand-navy-800/40 sm:block">
                {slide.startDate || "—"} – {slide.endDate || (lang === "ga" ? "gan teorainn" : "no end")}
              </p>

              <label className="flex items-center gap-1.5 text-xs font-bold text-brand-navy-800/70">
                <input
                  type="checkbox"
                  checked={slide.active}
                  onChange={() => handleToggleActive(slide.id)}
                  className="h-4 w-4 accent-brand-green-700"
                />
                {slide.active ? t("admin.published") : t("admin.draft")}
              </label>

              <button type="button" onClick={() => setModalSlide(slide)} className="text-sm font-semibold text-brand-green-800 hover:underline">
                {t("admin.edit")}
              </button>
              <button type="button" onClick={() => handleDuplicate(slide)} className="text-sm font-semibold text-brand-navy-800 hover:underline">
                {t("admin.slider.duplicate")}
              </button>
              <button type="button" onClick={() => handleDelete(slide.id)} className="text-sm font-semibold text-red-700 hover:underline">
                {t("admin.delete")}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setModalSlide("new")}
        className="mt-3 rounded-md bg-brand-green-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800"
      >
        {t("admin.slider.addSlide")}
      </button>

      <SlideFormModal
        isOpen={modalSlide !== null}
        onClose={() => setModalSlide(null)}
        onSave={handleSave}
        initialSlide={modalSlide !== "new" ? modalSlide ?? undefined : undefined}
      />
    </div>
  );
}
