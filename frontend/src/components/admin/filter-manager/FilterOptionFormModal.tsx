import { useState, type FormEvent } from "react";
import { useLanguage } from "../../../i18n/useLanguage";
import type { FilterOptionRow } from "../../../data/admin/filterManager";
import { Modal } from "../../common/Modal";
import { TextField, CheckboxField } from "../../forms/FormField";

interface FilterOptionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (option: Omit<FilterOptionRow, "id" | "order">) => void;
  initialOption?: FilterOptionRow;
}

const EMPTY = { name: "", labelGa: "", labelEn: "", active: true };

export function FilterOptionFormModal({ isOpen, onClose, onSave, initialOption }: FilterOptionFormModalProps) {
  const { t } = useLanguage();
  const [form, setForm] = useState(EMPTY);
  const [wasOpen, setWasOpen] = useState(false);

  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setForm(
        initialOption
          ? {
              name: initialOption.name,
              labelGa: initialOption.labelGa,
              labelEn: initialOption.labelEn,
              active: initialOption.active,
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
    <Modal isOpen={isOpen} onClose={onClose} title={initialOption ? t("admin.edit") : t("admin.filters.addOption")}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField
          label="Option name"
          value={form.name}
          onChange={(value) => setForm((current) => ({ ...current, name: value }))}
          required
          placeholder="mo-shampla"
        />
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
