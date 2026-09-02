import { useState, type FormEvent } from "react";
import { useLanguage } from "../../../i18n/useLanguage";
import type { CmsNavItem } from "../../../data/admin/navigationTrees";
import { iconOptions } from "../../../data/admin/navigationTrees";
import { Modal } from "../../common/Modal";
import { TextField, SelectField, CheckboxField } from "../../forms/FormField";

interface NavItemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<CmsNavItem, "id" | "order">) => void;
  initialItem?: CmsNavItem;
  parentOptions: { value: string; label: string }[];
}

const EMPTY: Omit<CmsNavItem, "id" | "order"> = {
  labelGa: "",
  labelEn: "",
  path: "",
  icon: "document",
  parentId: null,
  active: true,
};

export function NavItemFormModal({ isOpen, onClose, onSave, initialItem, parentOptions }: NavItemFormModalProps) {
  const { t } = useLanguage();
  const [form, setForm] = useState(EMPTY);
  const [wasOpen, setWasOpen] = useState(false);

  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setForm(
        initialItem
          ? {
              labelGa: initialItem.labelGa,
              labelEn: initialItem.labelEn,
              path: initialItem.path,
              icon: initialItem.icon,
              parentId: initialItem.parentId,
              active: initialItem.active,
            }
          : EMPTY,
      );
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSave(form);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialItem ? t("admin.edit") : t("admin.addNew")}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField
          label="Lipéad Gaeilge (Irish label)"
          value={form.labelGa}
          onChange={(value) => setForm((current) => ({ ...current, labelGa: value }))}
          required
        />
        <TextField
          label="English label"
          value={form.labelEn}
          onChange={(value) => setForm((current) => ({ ...current, labelEn: value }))}
          required
        />
        <TextField
          label="URL / page"
          value={form.path}
          onChange={(value) => setForm((current) => ({ ...current, path: value }))}
          required
          placeholder="/nasc-nua"
        />
        <SelectField
          label="Icon"
          value={form.icon}
          onChange={(value) => setForm((current) => ({ ...current, icon: value }))}
          options={iconOptions.map((icon) => ({ value: icon, label: icon }))}
        />
        <SelectField
          label="Parent"
          value={form.parentId ?? ""}
          onChange={(value) => setForm((current) => ({ ...current, parentId: value || null }))}
          options={[{ value: "", label: "— Top level —" }, ...parentOptions]}
        />
        <CheckboxField
          label="Active"
          checked={form.active}
          onChange={(value) => setForm((current) => ({ ...current, active: value }))}
        />
        <div className="mt-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-brand-navy-800/25 px-4 py-2.5 text-sm font-bold text-brand-navy-900"
          >
            {t("common.cancel")}
          </button>
          <button
            type="submit"
            className="rounded-md bg-brand-green-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800"
          >
            {t("common.save")}
          </button>
        </div>
      </form>
    </Modal>
  );
}
