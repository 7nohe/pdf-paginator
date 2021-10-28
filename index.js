import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import yargs from "yargs";
import url from "url";
import path from "path";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function resolveHome(filepath) {
  if (filepath[0] === '~') {
      return path.join(process.env.HOME, filepath.slice(1));
  }
  return filepath;
}

export const run = async () => {
  const args = yargs
    .option("_", {
      default: ["./foo.json"],
      description: "input file",
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
    .option("skip", {
      alias: "s",
      description: "number of pages to skip numbering",
      default: 0,
      type: "number",
    })
    .help().argv;

  if (args._.length < 1) {
    console.error("You need to provide pdf file.");
    return;
  }

  try {
    const file = fs.readFileSync(args._[0]);
    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(file);

    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Get the first page of the document
    const pages = pdfDoc.getPages();

    let skipCount = 0;
    if (args.skipFirst) {
      skipCount = 1;
    }

    if (args.skip && Number.isInteger(args.skip)) {
      skipCount = args.skip;
    }

    pages.forEach((page, index) => {
      if (index < skipCount) return;
      // Get the width and height of the page
      const { width, height } = page.getSize();

      // Draw page number
      page.drawText((index + 1 - skipCount).toString(), {
        x: width - 15,
        y: 15,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    const outpuPath = resolveHome(args.output)

    fs.writeFileSync(outpuPath, pdfBytes);
  } catch (e) {
    console.error(e.message);
  }
};
