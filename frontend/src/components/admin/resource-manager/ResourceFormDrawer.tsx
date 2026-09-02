import { useState } from "react";
import { useLanguage } from "../../../i18n/useLanguage";
import type { ManagedResource } from "../../../data/admin/managedResources";
import { publishStatusOptions } from "../../../data/admin/managedResources";
import { globalResourceTypeOptions, globalSchoolLevelOptions } from "../../../data/globalSearch";
import { FilterDrawer } from "../../common/FilterDrawer";
import { TextField, TextAreaField, SelectField, CheckboxField } from "../../forms/FormField";
import { TagsInput } from "./TagsInput";
import { FileUploadField } from "./FileUploadField";
import { ResourcePreviewCard } from "./ResourcePreviewCard";

type DraftResource = Omit<ManagedResource, "id" | "updatedDate">;

const EMPTY: DraftResource = {
  titleGa: "",
  titleEn: "",
  description: { ga: "", en: "" },
  schoolLevel: "primary",
  yearGroup: "",
  theme: "",
  topic: "",
  resourceType: "",
  assessment: false,
  planning: false,
  author: "",
  tags: [],
  featured: false,
  status: "draft",
};

interface ResourceFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (resource: DraftResource) => void;
  initialResource?: ManagedResource;
}

export function ResourceFormDrawer({ isOpen, onClose, onSave, initialResource }: ResourceFormDrawerProps) {
  const { lang, t } = useLanguage();
  const [step, setStep] = useState<"edit" | "preview">("edit");
  const [form, setForm] = useState<DraftResource>(EMPTY);
  const [fileName, setFileName] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [wasOpen, setWasOpen] = useState(false);

  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setForm(initialResource ?? EMPTY);
      setFileName(null);
      setErrors({});
      setStep("edit");
    }
  }

  const update = <K extends keyof DraftResource>(key: K, value: DraftResource[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.titleGa.trim()) nextErrors.titleGa = t("admin.res.titleGaRequired");
    if (!form.titleEn.trim()) nextErrors.titleEn = t("admin.res.titleEnRequired");
    if (!form.resourceType) nextErrors.resourceType = t("admin.res.resourceTypeRequired");
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleContinueToPreview = () => {
    if (validate()) setStep("preview");
  };

  const handleConfirm = () => {
    onSave(form);
  };

  return (
    <FilterDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={initialResource ? t("admin.edit") : t("admin.res.addResource")}
    >
      {step === "edit" ? (
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          <TextField label="Irish title" value={form.titleGa} onChange={(v) => update("titleGa", v)} required error={errors.titleGa} />
          <TextField label="English title" value={form.titleEn} onChange={(v) => update("titleEn", v)} required error={errors.titleEn} />
          <TextAreaField
            label="Description"
            value={form.description.ga}
            onChange={(v) => update("description", { ...form.description, ga: v })}
          />
          <TextAreaField
            label="Description (English)"
            value={form.description.en}
            onChange={(v) => update("description", { ...form.description, en: v })}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField
              label={t("admin.res.schoolLevel")}
              value={form.schoolLevel}
              onChange={(v) => update("schoolLevel", v as ManagedResource["schoolLevel"])}
              options={globalSchoolLevelOptions.map((option) => ({ value: option.id, label: option.label[lang] }))}
            />
            <TextField label={t("admin.res.yearGroup")} value={form.yearGroup} onChange={(v) => update("yearGroup", v)} placeholder="Bliain 1" />
            <TextField label={t("admin.res.theme")} value={form.theme} onChange={(v) => update("theme", v)} placeholder="Mé Féin" />
            <TextField label={t("admin.res.topic")} value={form.topic} onChange={(v) => update("topic", v)} placeholder="Is Gael Mé" />
            <SelectField
              label={t("common.type")}
              value={form.resourceType}
              onChange={(v) => update("resourceType", v)}
              options={[{ value: "", label: "—" }, ...globalResourceTypeOptions.map((option) => ({ value: option.id, label: option.label[lang] }))]}
              error={errors.resourceType}
            />
            <TextField label={t("admin.res.authorProvider")} value={form.author} onChange={(v) => update("author", v)} />
          </div>

          <div className="flex flex-wrap gap-6">
            <CheckboxField label={t("bunscoil.filters.assessment")} checked={form.assessment} onChange={(v) => update("assessment", v)} />
            <CheckboxField label={t("bunscoil.filters.planning")} checked={form.planning} onChange={(v) => update("planning", v)} />
            <CheckboxField label={t("admin.res.featuredToggle")} checked={form.featured} onChange={(v) => update("featured", v)} />
          </div>

          <TagsInput label={t("admin.res.tags")} tags={form.tags} onChange={(tags) => update("tags", tags)} />
          <FileUploadField fileName={fileName} onChange={setFileName} />

          <SelectField
            label={t("admin.res.publishStatus")}
            value={form.status}
            onChange={(v) => update("status", v as ManagedResource["status"])}
            options={publishStatusOptions.map((option) => ({ value: option.id, label: option.label[lang] }))}
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
              type="button"
              onClick={handleContinueToPreview}
              className="rounded-md bg-brand-green-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800"
            >
              {t("admin.res.preview")}
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          <ResourcePreviewCard resource={form} />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setStep("edit")}
              className="rounded-md border border-brand-navy-800/25 px-4 py-2.5 text-sm font-bold text-brand-navy-900"
            >
              {t("admin.res.backToEdit")}
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="rounded-md bg-brand-green-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800"
            >
              {t("admin.res.confirmSave")}
            </button>
          </div>
        </div>
      )}
    </FilterDrawer>
  );
}
