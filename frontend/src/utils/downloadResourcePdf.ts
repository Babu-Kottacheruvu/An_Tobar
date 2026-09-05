import { jsPDF } from "jspdf";
import { translate, type Lang } from "../i18n/translations";

export interface PdfMetaRow {
  label: string;
  value: string;
}

export interface DownloadableResourceInfo {
  kicker?: string;
  title: string;
  description?: string;
  meta?: PdfMetaRow[];
}

const NAVY = { r: 13, g: 27, b: 48 };
const GOLD = { r: 201, g: 162, b: 39 };
const MUTED = { r: 90, g: 100, b: 115 };
const MARGIN = 56;

/**
 * Generates and downloads a PDF "information sheet" for a resource. An Tobar
 * is a design prototype with no file storage, so this cannot download the
 * original teaching material - it produces a real PDF containing the
 * resource's catalogue information instead, and says so in the footer.
 */
export function downloadResourcePdf(info: DownloadableResourceInfo, filename: string, lang: Lang) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - MARGIN * 2;

  doc.setFillColor(NAVY.r, NAVY.g, NAVY.b);
  doc.rect(0, 0, pageWidth, 56, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(translate("site.name", lang), MARGIN, 35);
  doc.setFillColor(GOLD.r, GOLD.g, GOLD.b);
  doc.rect(0, 56, pageWidth, 3, "F");

  let y = 100;

  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text((info.kicker ?? translate("pdf.infoSheet", lang)).toUpperCase(), MARGIN, y);
  y += 26;

  doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  const titleLines: string[] = doc.splitTextToSize(info.title, contentWidth);
  doc.text(titleLines, MARGIN, y);
  y += titleLines.length * 24 + 14;

  if (info.description) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    const descLines: string[] = doc.splitTextToSize(info.description, contentWidth);
    doc.text(descLines, MARGIN, y);
    y += descLines.length * 15 + 18;
  }

  if (info.meta && info.meta.length > 0) {
    doc.setDrawColor(220, 220, 225);
    doc.line(MARGIN, y, pageWidth - MARGIN, y);
    y += 24;

    doc.setFontSize(11);
    for (const row of info.meta) {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
      doc.text(`${row.label}:`, MARGIN, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(50, 50, 50);
      const valueLines: string[] = doc.splitTextToSize(row.value, contentWidth - 150);
      doc.text(valueLines, MARGIN + 150, y);
      y += Math.max(18, valueLines.length * 15);
    }
  }

  const footerNote = translate("pdf.footerNote", lang);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  const footerLines: string[] = doc.splitTextToSize(footerNote, contentWidth);
  doc.text(footerLines, MARGIN, pageHeight - 30 - (footerLines.length - 1) * 12);

  doc.save(filename);
}

export interface PdfDocumentSection {
  heading: string;
  description?: string;
  bullets?: string[];
}

/**
 * Generates and downloads a multi-section PDF (e.g. a guide made up of
 * several chapters), one section per page, with the same honesty footer
 * as downloadResourcePdf.
 */
export function downloadDocumentPdf(title: string, sections: PdfDocumentSection[], filename: string, lang: Lang) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - MARGIN * 2;
  const footerNote = translate("pdf.footerNote", lang);

  const drawHeader = () => {
    doc.setFillColor(NAVY.r, NAVY.g, NAVY.b);
    doc.rect(0, 0, pageWidth, 56, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(translate("site.name", lang), MARGIN, 35);
    doc.setFillColor(GOLD.r, GOLD.g, GOLD.b);
    doc.rect(0, 56, pageWidth, 3, "F");
  };

  const drawFooter = () => {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
    const footerLines: string[] = doc.splitTextToSize(footerNote, contentWidth);
    doc.text(footerLines, MARGIN, pageHeight - 30 - (footerLines.length - 1) * 12);
  };

  drawHeader();
  doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  const titleLines: string[] = doc.splitTextToSize(title, contentWidth);
  doc.text(titleLines, MARGIN, 140);
  drawFooter();

  for (const section of sections) {
    doc.addPage();
    drawHeader();
    let y = 100;

    doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    const headingLines: string[] = doc.splitTextToSize(section.heading, contentWidth);
    doc.text(headingLines, MARGIN, y);
    y += headingLines.length * 22 + 14;

    if (section.description) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(40, 40, 40);
      const descLines: string[] = doc.splitTextToSize(section.description, contentWidth);
      doc.text(descLines, MARGIN, y);
      y += descLines.length * 15 + 16;
    }

    if (section.bullets && section.bullets.length > 0) {
      doc.setFontSize(11);
      for (const bullet of section.bullets) {
        doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
        doc.text("•", MARGIN, y);
        doc.setTextColor(50, 50, 50);
        const bulletLines: string[] = doc.splitTextToSize(bullet, contentWidth - 16);
        doc.text(bulletLines, MARGIN + 14, y);
        y += Math.max(16, bulletLines.length * 15);
      }
    }

    drawFooter();
  }

  doc.save(filename);
}
