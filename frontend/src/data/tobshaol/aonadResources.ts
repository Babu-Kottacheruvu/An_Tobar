import type { Bilingual } from "../types";

export type AonadResourceCategory =
  | "ceacht-1"
  | "ceacht-2"
  | "ceacht-3"
  | "ceacht-4"
  | "ceacht-5"
  | "ceacht-6"
  | "aonad-iomlan"
  | "treoir-muinteora"
  | "nodbhileoga"
  | "pacaiste-tacaiochta";

export interface AonadResource {
  id: string;
  category: AonadResourceCategory;
  titleGa: string;
  titleEn: string;
  description: Bilingual;
  resourceType: string;
  fileSize: string;
}

export const aonadResourcesByUnit: Record<string, AonadResource[]> = {
  "aonad-1": [
    {
      id: "a1-c1",
      category: "ceacht-1",
      titleGa: "Mé Féin - Réamhrá",
      titleEn: "Myself - Introduction",
      description: {
        ga: "Láithreoireacht tosaigh a mhúineann frásaí bunúsacha chun tú féin a chur in aithne.",
        en: "An opening presentation teaching basic phrases for introducing yourself.",
      },
      resourceType: "ppt",
      fileSize: "4.8 MB",
    },
    {
      id: "a1-c2",
      category: "ceacht-2",
      titleGa: "Mo Chlann",
      titleEn: "My Family",
      description: {
        ga: "Bileog inphriontáilte le foclóir agus cleachtaí ar bhaill an teaghlaigh.",
        en: "A printable sheet with vocabulary and exercises on family members.",
      },
      resourceType: "pdf",
      fileSize: "610 KB",
    },
    {
      id: "a1-c3",
      category: "ceacht-3",
      titleGa: "Cur Síos Orm Féin",
      titleEn: "Describing Myself",
      description: {
        ga: "Físeán gairid a thaispeánann daltaí ag cur síos orthu féin trí Ghaeilge.",
        en: "A short video of students describing themselves in Irish.",
      },
      resourceType: "video",
      fileSize: "41 MB",
    },
    {
      id: "a1-c4",
      category: "ceacht-4",
      titleGa: "M'Aois agus Mo Bhreithlá",
      titleEn: "My Age and My Birthday",
      description: {
        ga: "Cleachtadh cluastuisceana ar uimhreacha, aoiseanna agus dátaí breithe.",
        en: "A listening exercise on numbers, ages and birthdays.",
      },
      resourceType: "audio",
      fileSize: "5.2 MB",
    },
    {
      id: "a1-c5",
      category: "ceacht-5",
      titleGa: "Mo Chairde",
      titleEn: "My Friends",
      description: {
        ga: "Láithreoireacht le cleachtaí cainte ar chairdeas agus tréithe pearsantachta.",
        en: "A presentation with speaking exercises on friendship and personality traits.",
      },
      resourceType: "ppt",
      fileSize: "5.5 MB",
    },
    {
      id: "a1-c6",
      category: "ceacht-6",
      titleGa: "Athbhreithniú Aonad 1",
      titleEn: "Unit 1 Review",
      description: {
        ga: "Bileog athbhreithnithe a chlúdaíonn foclóir agus gramadach an aonaid ar fad.",
        en: "A review sheet covering the vocabulary and grammar of the whole unit.",
      },
      resourceType: "pdf",
      fileSize: "540 KB",
    },
    {
      id: "a1-full",
      category: "aonad-iomlan",
      titleGa: "Aonad 1 - An Pacáiste Iomlán",
      titleEn: "Unit 1 - Full Pack",
      description: {
        ga: "Gach acmhainn ó Cheacht 1 go Ceacht 6 bailithe le chéile in aon cháipéis amháin.",
        en: "Every resource from Lesson 1 to Lesson 6 gathered into a single document.",
      },
      resourceType: "word",
      fileSize: "12.4 MB",
    },
    {
      id: "a1-teacher-guide",
      category: "treoir-muinteora",
      titleGa: "Treoir don Mhúinteoir - Aonad 1",
      titleEn: "Teacher's Guide - Unit 1",
      description: {
        ga: "Nótaí teagaisc, aidhmeanna ceachta agus moltaí ama do gach ceacht san aonad.",
        en: "Teaching notes, lesson aims and timing suggestions for every lesson in the unit.",
      },
      resourceType: "word",
      fileSize: "2.1 MB",
    },
    {
      id: "a1-crib-sheets",
      category: "nodbhileoga",
      titleGa: "Nodbhileoga don Mhúinteoir - Aonad 1",
      titleEn: "Teacher's Answer Sheets - Unit 1",
      description: {
        ga: "Freagraí do na bileoga oibre agus do na cleachtaí cluastuisceana san aonad.",
        en: "Answers for the unit's worksheets and listening exercises.",
      },
      resourceType: "pdf",
      fileSize: "480 KB",
    },
    {
      id: "a1-support",
      category: "pacaiste-tacaiochta",
      titleGa: "Pacáiste Tacaíochta - Aonad 1",
      titleEn: "Support Package - Unit 1",
      description: {
        ga: "Leaganacha simplithe de na cleachtaí do dhaltaí a bhfuil tacaíocht bhreise ag teastáil uathu.",
        en: "Simplified versions of the exercises for students who need additional support.",
      },
      resourceType: "word",
      fileSize: "1.3 MB",
    },
  ],
};
