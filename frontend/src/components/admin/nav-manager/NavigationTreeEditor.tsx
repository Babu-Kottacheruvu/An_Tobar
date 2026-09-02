import { useState } from "react";
import { useLanguage } from "../../../i18n/useLanguage";
import type { CmsNavItem } from "../../../data/admin/navigationTrees";
import { NavIcon } from "./iconRegistry";
import { NavItemFormModal } from "./NavItemFormModal";
import { GridIcon } from "../../icons";

interface NavigationTreeEditorProps {
  items: CmsNavItem[];
  onChange: (items: CmsNavItem[]) => void;
}

function makeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `nav-${Date.now()}`;
}

export function NavigationTreeEditor({ items, onChange }: NavigationTreeEditorProps) {
  const { lang, t } = useLanguage();
  const [modalItem, setModalItem] = useState<CmsNavItem | "new" | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const roots = items.filter((item) => item.parentId === null).sort((a, b) => a.order - b.order);
  const childrenOf = (parentId: string) =>
    items.filter((item) => item.parentId === parentId).sort((a, b) => a.order - b.order);

  const handleDrop = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return;
    const dragged = items.find((item) => item.id === draggedId);
    const target = items.find((item) => item.id === targetId);
    if (!dragged || !target || dragged.parentId !== target.parentId) return;

    const siblings = items.filter((item) => item.parentId === dragged.parentId).sort((a, b) => a.order - b.order);
    const others = items.filter((item) => item.parentId !== dragged.parentId);
    const draggedIndex = siblings.findIndex((item) => item.id === draggedId);
    const targetIndex = siblings.findIndex((item) => item.id === targetId);
    const reordered = [...siblings];
    const [moved] = reordered.splice(draggedIndex, 1);
    reordered.splice(targetIndex, 0, moved);
    onChange([...others, ...reordered.map((item, index) => ({ ...item, order: index + 1 }))]);
    setDraggedId(null);
  };

  const handleToggleActive = (id: string) => {
    onChange(items.map((item) => (item.id === id ? { ...item, active: !item.active } : item)));
  };

  const handleDelete = (id: string) => {
    const label = items.find((item) => item.id === id)?.labelGa ?? "";
    if (!window.confirm(`${t("admin.delete")}: ${label}?`)) return;
    onChange(items.filter((item) => item.id !== id && item.parentId !== id));
  };

  const handleSave = (form: Omit<CmsNavItem, "id" | "order">) => {
    if (modalItem && modalItem !== "new") {
      onChange(items.map((item) => (item.id === modalItem.id ? { ...item, ...form } : item)));
    } else {
      const siblings = items.filter((item) => item.parentId === form.parentId);
      const nextOrder = siblings.length ? Math.max(...siblings.map((item) => item.order)) + 1 : 1;
      onChange([...items, { ...form, id: makeId(), order: nextOrder }]);
    }
    setModalItem(null);
  };

  const parentOptions = items.map((item) => ({ value: item.id, label: item.labelGa }));

  const renderRow = (item: CmsNavItem, depth: number) => (
    <li key={item.id}>
      <div
        draggable
        onDragStart={() => setDraggedId(item.id)}
        onDragOver={(event) => event.preventDefault()}
        onDrop={() => handleDrop(item.id)}
        style={{ marginLeft: depth * 28 }}
        className={`flex flex-wrap items-center gap-3 rounded-md border border-brand-navy-800/10 bg-white px-3 py-2.5 ${
          item.active ? "" : "opacity-50"
        }`}
      >
        <span className="cursor-grab text-brand-navy-800/30 active:cursor-grabbing" aria-hidden="true">
          <GridIcon className="h-4 w-4" />
        </span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-brand-green-50 text-brand-green-800">
          <NavIcon icon={item.icon} className="h-4 w-4" />
        </span>
        <div className="min-w-40 flex-1">
          <p className="text-sm font-bold text-brand-navy-900">
            {lang === "ga" ? item.labelGa : item.labelEn}
          </p>
          <p className="font-mono text-xs text-brand-navy-800/50">{item.path}</p>
        </div>

        <label className="flex items-center gap-1.5 text-xs font-bold text-brand-navy-800/70">
          <input
            type="checkbox"
            checked={item.active}
            onChange={() => handleToggleActive(item.id)}
            className="h-4 w-4 accent-brand-green-700"
          />
          {item.active ? t("admin.published") : t("admin.draft")}
        </label>

        <button
          type="button"
          onClick={() => setModalItem(item)}
          className="text-sm font-semibold text-brand-green-800 hover:underline"
        >
          {t("admin.edit")}
        </button>
        <button
          type="button"
          onClick={() => handleDelete(item.id)}
          className="text-sm font-semibold text-red-700 hover:underline"
        >
          {t("admin.delete")}
        </button>
      </div>

      {childrenOf(item.id).length > 0 && (
        <ul className="mt-1.5 space-y-1.5">
          {childrenOf(item.id).map((child) => renderRow(child, depth + 1))}
        </ul>
      )}
    </li>
  );

  return (
    <div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setModalItem("new")}
          className="rounded-md bg-brand-green-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800"
        >
          {t("admin.addNew")}
        </button>
      </div>

      <ul className="mt-3 space-y-1.5">{roots.map((item) => renderRow(item, 0))}</ul>

      <NavItemFormModal
        isOpen={modalItem !== null}
        onClose={() => setModalItem(null)}
        onSave={handleSave}
        initialItem={modalItem !== "new" ? modalItem ?? undefined : undefined}
        parentOptions={parentOptions.filter((option) => modalItem === "new" || option.value !== (modalItem as CmsNavItem)?.id)}
      />
    </div>
  );
}
