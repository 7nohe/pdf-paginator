import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import yargs from "yargs";

export const run = async () => {
  const args = yargs
    .option("_", {
      default: ["./foo.json"],
      description: "perform some sort of action on this path",
    })
    .option("output", {
      alias: "o",
      description: "output file",
      default: "output.pdf",
    })
    .option("skipFirst", {
      alias: "sf",
      description: "skip first page",
      default: false,
      type: "boolean",
    })
    .help().argv;

  if (args._.length < 1) {
    console.error("You need to provide pdf file.")
    return;
  }
  const file = fs.readFileSync(args._[0]);

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(file);

  // Embed the Helvetica font
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Get the first page of the document
  const pages = pdfDoc.getPages();

  pages.forEach((page, index) => {
    if (args.skipFirst && index == 0) return;
    // Get the width and height of the page
    const { width, height } = page.getSize();

    // Draw page number
    page.drawText((index + (args.skipFirst ? 0 : 1)).toString(), {
      x: width - 15,
      y: 15,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  fs.writeFileSync(args.output, pdfBytes);
};
