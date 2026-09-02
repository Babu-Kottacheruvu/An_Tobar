import { useLanguage } from "../../i18n/useLanguage";
import { AdminTable, type AdminTableColumn } from "../../components/admin/AdminTable";

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

const mockUsers: MockUser[] = [
  { id: "u1", name: "Máire Ní Bhriain", email: "maire.nibhriain@example.ie", role: "Teacher" },
  { id: "u2", name: "Seán Ó Conaill", email: "sean.oconaill@example.ie", role: "Principal" },
  { id: "u3", name: "Aoife Nic Cárthaigh", email: "aoife.niccarthaigh@example.ie", role: "Content Editor" },
];

export function AdminUsersPage() {
  const { t } = useLanguage();

  const columns: AdminTableColumn<MockUser>[] = [
    { key: "name", header: t("admin.title"), render: (row) => row.name },
    { key: "email", header: "Email", render: (row) => row.email },
    { key: "role", header: "Role", render: (row) => row.role },
    {
      key: "actions",
      header: t("admin.actions"),
      render: () => (
        <button type="button" className="font-semibold text-brand-green-800 hover:underline">
          {t("admin.edit")}
        </button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-black text-brand-navy-900 sm:text-3xl">{t("admin.users")}</h1>
      <div className="mt-6">
        <AdminTable columns={columns} rows={mockUsers} getRowId={(row) => row.id} caption={t("admin.users")} />
      </div>
    </div>
  );
}
