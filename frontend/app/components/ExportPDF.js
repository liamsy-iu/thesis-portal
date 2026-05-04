"use client";
import { useState } from "react";

export default function ExportPDF({ sections, title = "Research Report" }) {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;

      // ── Cover Page ──────────────────────────────────────────────
      pdf.setFillColor(15, 23, 42);
      pdf.rect(0, 0, pageWidth, pageHeight, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(22);
      pdf.setFont("helvetica", "bold");
      pdf.text("M-PESA & Financial Inclusion", pageWidth / 2, 60, { align: "center" });
      pdf.text("for Muslims in Kenya", pageWidth / 2, 72, { align: "center" });
      pdf.setFontSize(13);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(148, 163, 184);
      pdf.text("Research Data Report", pageWidth / 2, 88, { align: "center" });
      pdf.text("Islamic University of Madinah — Master's Thesis", pageWidth / 2, 96, { align: "center" });
      pdf.setFontSize(10);
      pdf.text(`Generated: ${new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}`, pageWidth / 2, 112, { align: "center" });
      pdf.setFontSize(9);
      pdf.setTextColor(100, 116, 139);
      pdf.text("Sources: FinAccess Surveys 2006-2024 | CBK Annual Reports | AAOIFI Standards", pageWidth / 2, 125, { align: "center" });

      // ── Sections ────────────────────────────────────────────────
      for (let i = 0; i < sections.length; i++) {
        const { id, label } = sections[i];
        const element = document.getElementById(id);
        if (!element) continue;

        pdf.addPage();

        // Section header
        pdf.setFillColor(30, 41, 59);
        pdf.rect(0, 0, pageWidth, 18, "F");
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.text(label, margin, 11);
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(148, 163, 184);
        pdf.text(`Page ${i + 2}`, pageWidth - margin, 11, { align: "right" });

        // Capture element
        const canvas = await html2canvas(element, {
          scale: 1.5,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
        });

        const imgData = canvas.toDataURL("image/png");
        const imgWidth = pageWidth - margin * 2;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const maxHeight = pageHeight - 24 - margin;
        pdf.addImage(imgData, "PNG", margin, 24, imgWidth, Math.min(imgHeight, maxHeight));
      }

      // ── Footer ───────────────────────────────────────────────────
      const totalPages = pdf.internal.getNumberOfPages();
      for (let p = 2; p <= totalPages; p++) {
        pdf.setPage(p);
        pdf.setFontSize(7);
        pdf.setTextColor(148, 163, 184);
        pdf.text(
          "Abdullahi Alinoor | Islamic University of Madinah | M-PESA & Financial Inclusion for Muslims in Kenya",
          pageWidth / 2, pageHeight - 6, { align: "center" }
        );
      }

      pdf.save("MPESA_Financial_Inclusion_Research_Report.pdf");
    } catch (err) {
      console.error("Export failed:", err);
      alert("Export failed. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {exporting ? (
        <>
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          Generating PDF...
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Full Report PDF
        </>
      )}
    </button>
  );
}
