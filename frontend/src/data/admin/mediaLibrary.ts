export type MediaAssetType = "image" | "pdf" | "powerpoint" | "word" | "video" | "audio";

export interface MediaFolder {
  id: string;
  label: { en: string; ga: string };
}

export const mediaFolders: MediaFolder[] = [
  { id: "bunscoil", label: { en: "Bunscoil", ga: "Bunscoil" } },
  { id: "iar-bhunscoil", label: { en: "Iar-bhunscoil", ga: "Iar-bhunscoil" } },
  { id: "nuacht", label: { en: "News", ga: "Nuacht" } },
  { id: "comortais", label: { en: "Competitions", ga: "Comórtais" } },
  { id: "ginearalta", label: { en: "General", ga: "Ginearálta" } },
];

export const mediaTypeOptions: { id: MediaAssetType; label: { en: string; ga: string } }[] = [
  { id: "image", label: { en: "Images", ga: "Íomhánna" } },
  { id: "pdf", label: { en: "PDF", ga: "PDF" } },
  { id: "powerpoint", label: { en: "PowerPoint", ga: "PowerPoint" } },
  { id: "word", label: { en: "Word", ga: "Word" } },
  { id: "video", label: { en: "Video", ga: "Físeán" } },
  { id: "audio", label: { en: "Audio", ga: "Fuaim" } },
];

export interface MediaAsset {
  id: string;
  filename: string;
  type: MediaAssetType;
  folder: string;
  fileSize: string;
  uploadedDate: string;
  usedBy: string[];
}

export const initialMediaAssets: MediaAsset[] = [
  { id: "m1", filename: "an-aimsir-postaer.pdf", type: "pdf", folder: "bunscoil", fileSize: "1.8 MB", uploadedDate: "2026-02-27", usedBy: ["An Aimsir"] },
  { id: "m2", filename: "mo-chorp-pictiuir.png", type: "image", folder: "bunscoil", fileSize: "3.2 MB", uploadedDate: "2026-02-18", usedBy: ["Pictiúir Lipéadaithe: Mo Chorp"] },
  { id: "m3", filename: "amhran-conas-taoi.mp4", type: "video", folder: "bunscoil", fileSize: "48 MB", uploadedDate: "2026-01-09", usedBy: ["Amhrán: Conas Atá Tú?"] },
  { id: "m4", filename: "cluastuiscint-aimsir.mp3", type: "audio", folder: "bunscoil", fileSize: "6.1 MB", uploadedDate: "2025-11-30", usedBy: ["Comhad Fuaime: Cur Síos ar an Aimsir"] },
  { id: "m5", filename: "seasuir-lathoir.pptx", type: "powerpoint", folder: "bunscoil", fileSize: "5.4 MB", uploadedDate: "2025-09-15", usedBy: ["Láithreoireacht: Na Séasúir"] },
  { id: "m6", filename: "eadai-aimsire-cartai.png", type: "image", folder: "bunscoil", fileSize: "2.7 MB", uploadedDate: "2025-08-19", usedBy: ["Pictiúir: Éadaí Aimsire"] },
  { id: "m7", filename: "pleanail-la-fheile-padraig.docx", type: "word", folder: "bunscoil", fileSize: "1.1 MB", uploadedDate: "2026-01-20", usedBy: ["Pacáiste Pleanála: Lá Fhéile Pádraig"] },
  { id: "m8", filename: "ce-mise-lathoir.pptx", type: "powerpoint", folder: "iar-bhunscoil", fileSize: "4.8 MB", uploadedDate: "2026-02-20", usedBy: ["Cé Mise? Láithreoireacht Réamhrá"] },
  { id: "m9", filename: "nodbhileoga-aonad-1.pdf", type: "pdf", folder: "iar-bhunscoil", fileSize: "480 KB", uploadedDate: "2026-08-27", usedBy: ["Nodbhileoga don Mhúinteoir - Aonad 1"] },
  { id: "m10", filename: "turas-gaeltacht.mp4", type: "video", folder: "iar-bhunscoil", fileSize: "62 MB", uploadedDate: "2025-11-02", usedBy: ["Físeán: Carachtair Theilifíse is Fearr Linn"] },
  { id: "m11", filename: "podchraoladh-scealta.mp3", type: "audio", folder: "iar-bhunscoil", fileSize: "9.4 MB", uploadedDate: "2026-01-05", usedBy: ["FGL: Modheolaíocht na Gaeilge Beo"] },
  { id: "m12", filename: "pleanail-scoile-treimplead.docx", type: "word", folder: "iar-bhunscoil", fileSize: "520 KB", uploadedDate: "2025-09-19", usedBy: ["Pleanáil Ghaeilge don Scoil Iomlán"] },
  { id: "m13", filename: "seachtain-na-gaeilge-2026-banner.png", type: "image", folder: "nuacht", fileSize: "1.4 MB", uploadedDate: "2026-02-20", usedBy: ["Seachtain na Gaeilge 2026: Pacáistí pleanála beo anois"] },
  { id: "m14", filename: "torthai-comortas-nollag.docx", type: "word", folder: "nuacht", fileSize: "310 KB", uploadedDate: "2026-08-29", usedBy: ["Torthaí Chomórtas na Nollag"] },
  { id: "m15", filename: "comortas-scribhneoireachta-postaer.pdf", type: "pdf", folder: "comortais", fileSize: "890 KB", uploadedDate: "2026-01-28", usedBy: ["Comórtas Scríbhneoireachta Cruthaithí"] },
  { id: "m16", filename: "an-tobar-lo.png", type: "image", folder: "ginearalta", fileSize: "240 KB", uploadedDate: "2025-08-01", usedBy: [] },
];
