// resumeParser.js
// PDF.js CDN se PDF text extract karta hai — koi npm install nahi chahiye

const PDFJS_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const PDFJS_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

let pdfLibLoaded = false;

// PDF.js ko dynamically load karo
function loadPDFJS() {
  return new Promise((resolve, reject) => {
    if (pdfLibLoaded && window.pdfjsLib) return resolve(window.pdfjsLib);

    const script = document.createElement("script");
    script.src = PDFJS_CDN;
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
      pdfLibLoaded = true;
      resolve(window.pdfjsLib);
    };
    script.onerror = () => reject(new Error("PDF.js load nahi hua"));
    document.head.appendChild(script);
  });
}

// File object se text extract karo
export async function extractTextFromPDF(file) {
  if (!file) return null;

  try {
    const pdfjsLib = await loadPDFJS();

    // File ko ArrayBuffer mein convert karo
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(" ");
      fullText += pageText + "\n";
    }

    return fullText.trim();
  } catch (err) {
    console.error("Resume parse error:", err);
    return null;
  }
}