import type { Bilingual } from "../types";

export interface ActivityItem {
  id: string;
  type: "resource" | "navigation" | "news" | "filter";
  description: Bilingual;
  actor: string;
  timestamp: string;
}

export const recentActivity: ActivityItem[] = [
  {
    id: "a1",
    type: "resource",
    description: {
      en: "Resource uploaded: 'Weather Vocabulary' (An Aimsir)",
      ga: "Acmhainn uaslódáilte: 'An Aimsir' (Foclóir na hAimsire)",
    },
    actor: "An Tobar",
    timestamp: "2026-09-01T10:15:00Z",
  },
  {
    id: "a2",
    type: "navigation",
    description: {
      en: "Navigation updated: added 'COGG Padlet' to main menu",
      ga: "Nascleanúint nuashonraithe: 'Padlet COGG' curtha leis an bpríomh-roghchlár",
    },
    actor: "Máire Ní Bhriain",
    timestamp: "2026-08-30T14:40:00Z",
  },
  {
    id: "a3",
    type: "news",
    description: {
      en: "News article published: 'Welcoming New Students to #Tobshaol'",
      ga: "Alt nuachta foilsithe: 'Fáilte roimh Dhaltaí Nua go dtí #Tobshaol'",
    },
    actor: "Foireann An Tobar",
    timestamp: "2026-08-29T09:05:00Z",
  },
  {
    id: "a4",
    type: "filter",
    description: {
      en: "Filter category added: 'Language Classes' content type",
      ga: "Catagóir scagaire curtha leis: cineál ábhair 'Ranganna Gaeilge'",
    },
    actor: "Seán Ó Conaill",
    timestamp: "2026-08-27T16:20:00Z",
  },
  {
    id: "a5",
    type: "resource",
    description: {
      en: "Resource uploaded: 'Teacher's Answer Sheets - Unit 1'",
      ga: "Acmhainn uaslódáilte: 'Nodbhileoga don Mhúinteoir - Aonad 1'",
    },
    actor: "COGG",
    timestamp: "2026-08-25T11:50:00Z",
  },
];
