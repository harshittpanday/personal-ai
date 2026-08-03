import { PDFParse } from "pdf-parse";

export interface ParsedDocument {
  text: string;
  pageCount?: number;
}

export async function parseDocument(
  file: File
): Promise<ParsedDocument> {
  const bytes = await file.arrayBuffer();

  switch (file.type) {
    case "application/pdf": {
      const parser = new PDFParse({
        data: bytes,
      });

      const pdf = await parser.getText();

      await parser.destroy();

      return {
        text: cleanText(pdf.text),
        pageCount: pdf.total,
      };
    }

    case "text/plain": {
      const buffer = Buffer.from(bytes);

      return {
        text: cleanText(buffer.toString("utf-8")),
      };
    }

    default:
      throw new Error("Unsupported file type.");
  }
}

function cleanText(text: string): string {
  return text
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ ]{2,}/g, " ")
    .trim();
}