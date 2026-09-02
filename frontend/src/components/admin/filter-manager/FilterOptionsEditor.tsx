import { useState } from "react";
import { useLanguage } from "../../../i18n/useLanguage";
import type { FilterOptionRow } from "../../../data/admin/filterManager";
import { FilterOptionFormModal } from "./FilterOptionFormModal";
import { GridIcon } from "../../icons";

interface FilterOptionsEditorProps {
  options: FilterOptionRow[];
  onChange: (options: FilterOptionRow[]) => void;
}

function makeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `opt-${Date.now()}`;
}

export function FilterOptionsEditor({ options, onChange }: FilterOptionsEditorProps) {
  const { t } = useLanguage();
  const [modalOption, setModalOption] = useState<FilterOptionRow | "new" | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const sorted = [...options].sort((a, b) => a.order - b.order);

  const handleDrop = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return;
    const draggedIndex = sorted.findIndex((option) => option.id === draggedId);
    const targetIndex = sorted.findIndex((option) => option.id === targetId);
    if (draggedIndex === -1 || targetIndex === -1) return;
    const reordered = [...sorted];
    const [moved] = reordered.splice(draggedIndex, 1);
    reordered.splice(targetIndex, 0, moved);
    onChange(reordered.map((option, index) => ({ ...option, order: index + 1 })));
    setDraggedId(null);
  };

  const handleToggleActive = (id: string) => {
    onChange(options.map((option) => (option.id === id ? { ...option, active: !option.active } : option)));
  };

  const handleDelete = (id: string) => {
    const label = options.find((option) => option.id === id)?.labelGa ?? "";
    if (!window.confirm(`${t("admin.delete")}: ${label}?`)) return;
    onChange(options.filter((option) => option.id !== id));
  };

  const handleSave = (form: Omit<FilterOptionRow, "id" | "order">) => {
    if (modalOption && modalOption !== "new") {
      onChange(options.map((option) => (option.id === modalOption.id ? { ...option, ...form } : option)));
    } else {
      const nextOrder = options.length ? Math.max(...options.map((option) => option.order)) + 1 : 1;
      onChange([...options, { ...form, id: makeId(), order: nextOrder }]);
    }
    setModalOption(null);
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-brand-navy-800/12 bg-white">
        <table className="w-full min-w-140 border-collapse text-left text-sm">
          <caption className="sr-only">{t("admin.filters")}</caption>
          <thead>
            <tr className="border-b border-brand-navy-800/12 bg-brand-navy-50">
              <th scope="col" className="w-10 px-3 py-3" />
              <th scope="col" className="px-3 py-3 font-bold text-brand-navy-900">
                Option name
              </th>
              <th scope="col" className="px-3 py-3 font-bold text-brand-navy-900">
                Irish label
              </th>
              <th scope="col" className="px-3 py-3 font-bold text-brand-navy-900">
                English label
              </th>
              <th scope="col" className="px-3 py-3 font-bold text-brand-navy-900">
                Active
              </th>
              <th scope="col" className="px-3 py-3 font-bold text-brand-navy-900">
                {t("admin.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((option) => (
              <tr
                key={option.id}
                draggable
                onDragStart={() => setDraggedId(option.id)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => handleDrop(option.id)}
                className={`border-b border-brand-navy-800/8 last:border-0 ${option.active ? "" : "opacity-50"}`}
              >
                <td className="px-3 py-2.5 text-brand-navy-800/30">
                  <span className="cursor-grab active:cursor-grabbing" aria-hidden="true">
                    <GridIcon className="h-4 w-4" />
                  </span>
                </td>
                <td className="px-3 py-2.5 font-mono text-xs text-brand-navy-800/70">{option.name}</td>
                <td className="px-3 py-2.5 font-semibold text-brand-navy-900">{option.labelGa}</td>
                <td className="px-3 py-2.5 text-brand-navy-800/80">{option.labelEn}</td>
                <td className="px-3 py-2.5">
                  <input
                    type="checkbox"
                    checked={option.active}
                    onChange={() => handleToggleActive(option.id)}
                    aria-label={`${option.active ? t("admin.published") : t("admin.draft")}: ${option.labelGa}`}
                    className="h-4 w-4 accent-brand-green-700"
                  />
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setModalOption(option)}
                      className="font-semibold text-brand-green-800 hover:underline"
                    >
                      {t("admin.edit")}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(option.id)}
                      className="font-semibold text-red-700 hover:underline"
                    >
                      {t("admin.delete")}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={() => setModalOption("new")}
        className="mt-3 rounded-md bg-brand-green-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800"
      >
        {t("admin.filters.addOption")}
      </button>

      <FilterOptionFormModal
        isOpen={modalOption !== null}
        onClose={() => setModalOption(null)}
        onSave={handleSave}
        initialOption={modalOption !== "new" ? modalOption ?? undefined : undefined}
      />
    </div>
  );
}
