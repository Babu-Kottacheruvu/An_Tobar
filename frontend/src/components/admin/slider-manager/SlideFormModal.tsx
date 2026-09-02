import { useState, type FormEvent } from "react";
import { useLanguage } from "../../../i18n/useLanguage";
import type { SlideItem } from "../../../data/admin/sliderManager";
import { slideIconOptions } from "../../../data/admin/sliderManager";
import { Modal } from "../../common/Modal";
import { TextField, TextAreaField, SelectField, CheckboxField } from "../../forms/FormField";

type DraftSlide = Omit<SlideItem, "id" | "order">;

const EMPTY: DraftSlide = {
  titleGa: "",
  titleEn: "",
  descriptionGa: "",
  descriptionEn: "",
  ctaText: "",
  ctaDestination: "",
  imageIcon: "star",
  startDate: "",
  endDate: "",
  active: true,
};

interface SlideFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (slide: DraftSlide) => void;
  initialSlide?: SlideItem;
}

export function SlideFormModal({ isOpen, onClose, onSave, initialSlide }: SlideFormModalProps) {
  const { t } = useLanguage();
  const [form, setForm] = useState<DraftSlide>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [wasOpen, setWasOpen] = useState(false);

  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setForm(initialSlide ?? EMPTY);
      setErrors({});
    }
  }

  const update = <K extends keyof DraftSlide>(key: K, value: DraftSlide[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.titleGa.trim()) nextErrors.titleGa = t("admin.res.titleGaRequired");
    if (!form.titleEn.trim()) nextErrors.titleEn = t("admin.res.titleEnRequired");
    if (!form.ctaDestination.trim()) nextErrors.ctaDestination = t("common.required");
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSave(form);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialSlide ? t("admin.edit") : t("admin.slider.addSlide")}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <SelectField
          label={t("admin.slider.image")}
          value={form.imageIcon}
          onChange={(value) => update("imageIcon", value)}
          options={slideIconOptions.map((icon) => ({ value: icon, label: icon }))}
        />
        <TextField label={t("admin.slider.titleGa")} value={form.titleGa} onChange={(v) => update("titleGa", v)} required error={errors.titleGa} />
        <TextField label={t("admin.slider.titleEn")} value={form.titleEn} onChange={(v) => update("titleEn", v)} required error={errors.titleEn} />
        <TextAreaField label={t("admin.slider.descriptionGa")} value={form.descriptionGa} onChange={(v) => update("descriptionGa", v)} rows={2} />
        <TextAreaField label={t("admin.slider.descriptionEn")} value={form.descriptionEn} onChange={(v) => update("descriptionEn", v)} rows={2} />
        <TextField label={t("admin.slider.ctaText")} value={form.ctaText} onChange={(v) => update("ctaText", v)} />
        <TextField
          label={t("admin.slider.ctaDestination")}
          value={form.ctaDestination}
          onChange={(v) => update("ctaDestination", v)}
          required
          error={errors.ctaDestination}
          placeholder="/acmhainni"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="slide-start" className="text-sm font-bold text-brand-navy-900">
              {t("admin.slider.startDate")}
            </label>
            <input
              id="slide-start"
              type="date"
              value={form.startDate}
              onChange={(event) => update("startDate", event.target.value)}
              className="rounded-md border border-brand-navy-800/25 px-3 py-2.5 text-base text-brand-navy-900 focus:border-brand-green-700"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="slide-end" className="text-sm font-bold text-brand-navy-900">
              {t("admin.slider.endDate")}
            </label>
            <input
              id="slide-end"
              type="date"
              value={form.endDate}
              onChange={(event) => update("endDate", event.target.value)}
              className="rounded-md border border-brand-navy-800/25 px-3 py-2.5 text-base text-brand-navy-900 focus:border-brand-green-700"
            />
          </div>
        </div>
        <CheckboxField label="Active" checked={form.active} onChange={(v) => update("active", v)} />

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
