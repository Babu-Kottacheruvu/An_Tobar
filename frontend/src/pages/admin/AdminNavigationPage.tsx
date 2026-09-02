import { useState } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import {
  initialNavigationTrees,
  navigationTreeMeta,
  type CmsNavItem,
  type NavigationTreeId,
} from "../../data/admin/navigationTrees";
import { NavigationTreeEditor } from "../../components/admin/nav-manager/NavigationTreeEditor";
import { NavigationPreview } from "../../components/admin/nav-manager/NavigationPreview";

export function AdminNavigationPage() {
  const { lang, t } = useLanguage();
  const [activeTree, setActiveTree] = useState<NavigationTreeId>("main");
  const [trees, setTrees] = useState<Record<NavigationTreeId, CmsNavItem[]>>(initialNavigationTrees);

  const activeMeta = navigationTreeMeta.find((meta) => meta.id === activeTree)!;
  const activeItems = trees[activeTree];

  const updateActiveTree = (items: CmsNavItem[]) => {
    setTrees((current) => ({ ...current, [activeTree]: items }));
  };

  return (
    <div>
      <h1 className="text-2xl font-black text-brand-navy-900 sm:text-3xl">{t("admin.navigation")}</h1>
      <p className="mt-1 text-sm text-brand-navy-800/70">{t("admin.nav.intro")}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {navigationTreeMeta.map((meta) => (
          <button
            key={meta.id}
            type="button"
            onClick={() => setActiveTree(meta.id)}
            aria-pressed={activeTree === meta.id}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
              activeTree === meta.id
                ? "border-brand-green-700 bg-brand-green-700 text-white"
                : "border-brand-navy-800/20 text-brand-navy-800/70 hover:border-brand-green-600"
            }`}
          >
            {meta.label[lang]}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="mb-3 text-xs font-semibold text-brand-navy-800/50">{t("admin.nav.dragHint")}</p>
          <NavigationTreeEditor items={activeItems} onChange={updateActiveTree} />
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-lg border border-brand-navy-800/12 bg-white p-5">
            <h2 className="text-sm font-black uppercase tracking-wide text-brand-navy-800/60">
              {t("admin.nav.livePreview")}
            </h2>
            <p className="mt-1 text-xs text-brand-navy-800/50">{activeMeta.label[lang]}</p>
            <div className="mt-3">
              <NavigationPreview items={activeItems} theme={activeMeta.theme} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
