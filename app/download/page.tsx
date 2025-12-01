"use client";
import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "react-bootstrap";
import { IoCloudDownload } from "react-icons/io5";

// İstersen targetRef tipini daha net yazabilirsin:
// function Download({ targetRef }: { targetRef: React.RefObject<HTMLDivElement> }) {
function Download({ targetRef }: { targetRef: any }) {
  const createPdf = async () => {
    // Next.js SSR güvenliği
    if (typeof window === "undefined") return;
    if (!targetRef?.current) return;

    // 🔹 TIKLAMA ANINDA yeni bir sekme açıyoruz (Safari için kritik)
    const newWindow = window.open("", "_blank");

    try {
      const canvas = await html2canvas(targetRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a6");
      const pageWidth = pdf.internal.pageSize.getWidth();

      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

      // Blob url üret
      const url = pdf.output("bloburl");
      const href=typeof url === 'string' ? url :'';
      if (newWindow) {
        // 🔹 Daha önce açtığımız sekmeye PDF'i yüklüyoruz
        newWindow.location.href = href;
      } else {
        // Sekme açılamadıysa fallback
        window.open(href, "_blank");
      }
    } catch (err) {
      console.error("PDF oluşturulurken hata oluştu:", err);
      if (newWindow) {
        newWindow.close();
      }
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={createPdf}>
        <IoCloudDownload />
      </Button>
    </div>
  );
}

export default Download;
