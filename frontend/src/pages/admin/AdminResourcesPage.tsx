import { useState } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import {
  initialManagedResources,
  type ManagedResource,
} from "../../data/admin/managedResources";
import { globalResourceTypeOptions, globalSchoolLevelOptions } from "../../data/globalSearch";
import { AdminTable, type AdminTableColumn } from "../../components/admin/AdminTable";
import { ResourceStatusBadge } from "../../components/admin/resource-manager/ResourceStatusBadge";
import { ResourceFormDrawer } from "../../components/admin/resource-manager/ResourceFormDrawer";
import { UploadMultipleModal } from "../../components/admin/resource-manager/UploadMultipleModal";
import { ImportModal } from "../../components/admin/resource-manager/ImportModal";
import { ResourcePreviewCard } from "../../components/admin/resource-manager/ResourcePreviewCard";
import { Modal } from "../../components/common/Modal";
import { UploadIcon, DocumentIcon } from "../../components/icons";

function makeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `res-${Date.now()}`;
}

export function AdminResourcesPage() {
  const { lang, t } = useLanguage();
  const [resources, setResources] = useState<ManagedResource[]>(initialManagedResources);

  const [formOpen, setFormOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<ManagedResource | undefined>(undefined);
  const [viewingResource, setViewingResource] = useState<ManagedResource | null>(null);
  const [uploadMultipleOpen, setUploadMultipleOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);

  const openAdd = () => {
    setEditingResource(undefined);
    setFormOpen(true);
  };
  const openEdit = (resource: ManagedResource) => {
    setEditingResource(resource);
    setFormOpen(true);
  };

  const handleSave = (draft: Omit<ManagedResource, "id" | "updatedDate">) => {
    const today = new Date().toISOString().slice(0, 10);
    if (editingResource) {
      setResources((current) =>
        current.map((item) =>
          item.id === editingResource.id ? { ...item, ...draft, updatedDate: today } : item,
        ),
      );
    } else {
      setResources((current) => [...current, { ...draft, id: makeId(), updatedDate: today }]);
    }
    setFormOpen(false);
  };

  const handleDuplicate = (resource: ManagedResource) => {
    const today = new Date().toISOString().slice(0, 10);
    setResources((current) => [
      ...current,
      {
        ...resource,
        id: makeId(),
        titleGa: `${resource.titleGa} (Cóip)`,
        titleEn: `${resource.titleEn} (Copy)`,
        status: "draft",
        updatedDate: today,
      },
    ]);
  };

  const handleArchive = (id: string) => {
    setResources((current) => current.map((item) => (item.id === id ? { ...item, status: "archived" } : item)));
  };

  const handleDelete = (resource: ManagedResource) => {
    if (!window.confirm(`${t("admin.delete")}: ${lang === "ga" ? resource.titleGa : resource.titleEn}?`)) return;
    setResources((current) => current.filter((item) => item.id !== resource.id));
  };

  const columns: AdminTableColumn<ManagedResource>[] = [
    {
      key: "resource",
      header: t("admin.res.resource"),
      render: (row) => (
        <div>
          <p className="font-semibold text-brand-navy-900">
            {lang === "ga" ? row.titleGa : row.titleEn}
          </p>
        </div>
      ),
    },
    {
      key: "type",
      header: t("common.type"),
      render: (row) => globalResourceTypeOptions.find((option) => option.id === row.resourceType)?.label[lang] ?? row.resourceType,
    },
    {
      key: "schoolLevel",
      header: t("admin.res.schoolLevel"),
      render: (row) => globalSchoolLevelOptions.find((option) => option.id === row.schoolLevel)?.label[lang],
    },
    { key: "yearGroup", header: t("admin.res.yearGroup"), render: (row) => row.yearGroup || "—" },
    { key: "topic", header: t("admin.res.topic"), render: (row) => row.topic || "—" },
    { key: "status", header: t("admin.status"), render: (row) => <ResourceStatusBadge status={row.status} /> },
    { key: "updated", header: t("bunscoil.card.updated"), render: (row) => row.updatedDate },
    {
      key: "actions",
      header: t("admin.actions"),
      render: (row) => (
        <div className="flex flex-wrap gap-2.5">
          <button type="button" onClick={() => setViewingResource(row)} className="font-semibold text-brand-green-800 hover:underline">
            {t("admin.res.view")}
          </button>
          <button type="button" onClick={() => openEdit(row)} className="font-semibold text-brand-green-800 hover:underline">
            {t("admin.edit")}
          </button>
          <button type="button" onClick={() => handleDuplicate(row)} className="font-semibold text-brand-navy-800 hover:underline">
            {t("admin.res.duplicate")}
          </button>
          <button type="button" onClick={() => handleArchive(row.id)} className="font-semibold text-brand-gold-600 hover:underline">
            {t("admin.res.archive")}
          </button>
          <button type="button" onClick={() => handleDelete(row)} className="font-semibold text-red-700 hover:underline">
            {t("admin.delete")}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-black text-brand-navy-900 sm:text-3xl">{t("admin.resources")}</h1>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setImportOpen(true)}
            className="flex items-center gap-2 rounded-md border border-brand-navy-800/25 px-4 py-2.5 text-sm font-bold text-brand-navy-900 hover:bg-brand-navy-50"
          >
            <DocumentIcon className="h-4 w-4" />
            {t("admin.res.import")}
          </button>
          <button
            type="button"
            onClick={() => setUploadMultipleOpen(true)}
            className="flex items-center gap-2 rounded-md border border-brand-navy-800/25 px-4 py-2.5 text-sm font-bold text-brand-navy-900 hover:bg-brand-navy-50"
          >
            <UploadIcon className="h-4 w-4" />
            {t("admin.res.uploadMultiple")}
          </button>
          <button
            type="button"
            onClick={openAdd}
            className="rounded-md bg-brand-green-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-green-800"
          >
            {t("admin.res.addResource")}
          </button>
        </div>
      </div>

      <div className="mt-6">
        <AdminTable columns={columns} rows={resources} getRowId={(row) => row.id} caption={t("admin.resources")} />
      </div>

      <ResourceFormDrawer
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
        initialResource={editingResource}
      />
      <UploadMultipleModal isOpen={uploadMultipleOpen} onClose={() => setUploadMultipleOpen(false)} />
      <ImportModal isOpen={importOpen} onClose={() => setImportOpen(false)} />

      <Modal
        isOpen={Boolean(viewingResource)}
        onClose={() => setViewingResource(null)}
        title={(lang === "ga" ? viewingResource?.titleGa : viewingResource?.titleEn) ?? ""}
      >
        {viewingResource && <ResourcePreviewCard resource={viewingResource} />}
      </Modal>
    </div>
  );
}
