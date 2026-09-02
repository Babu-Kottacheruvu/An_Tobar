import { useLanguage } from "../../../i18n/useLanguage";
import type { MediaAsset } from "../../../data/admin/mediaLibrary";
import { mediaTypeOptions } from "../../../data/admin/mediaLibrary";
import { mediaTypeStyles } from "./mediaTypeStyles";
import { Modal } from "../../common/Modal";

export function MediaPreviewModal({ asset, onClose }: { asset: MediaAsset | null; onClose: () => void }) {
  const { lang, t } = useLanguage();
  const style = asset ? mediaTypeStyles[asset.type] : null;
  const typeLabel = asset ? mediaTypeOptions.find((option) => option.id === asset.type)?.label[lang] : undefined;

  return (
    <Modal isOpen={Boolean(asset)} onClose={onClose} title={asset?.filename ?? ""}>
      {asset && style && (
        <>
          <div className={`flex h-48 items-center justify-center rounded-lg ${style.tile}`}>
            <style.icon className="h-16 w-16" />
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="font-semibold text-brand-navy-900">{t("admin.media.fileType")}</dt>
              <dd className="text-brand-navy-800/80">{typeLabel}</dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-navy-900">{t("admin.media.fileSize")}</dt>
              <dd className="text-brand-navy-800/80">{asset.fileSize}</dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-navy-900">{t("admin.media.uploadedDate")}</dt>
              <dd className="text-brand-navy-800/80">{asset.uploadedDate}</dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-navy-900">{t("admin.media.usedBy")}</dt>
              <dd className="text-brand-navy-800/80">
                {asset.usedBy.length > 0 ? asset.usedBy.join(", ") : t("admin.media.notUsed")}
              </dd>
            </div>
          </dl>
        </>
      )}
    </Modal>
  );
}
