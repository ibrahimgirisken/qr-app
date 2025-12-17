"use client";
import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "react-bootstrap";
import { IoCloudDownload } from "react-icons/io5";

function Download({ targetRef }: { targetRef: any }) {
  const createPdf = async () => {
    if (typeof window === "undefined") return;
    if (!targetRef?.current) return;

    const newWindow = window.open("", "_blank");

    try {
      const canvas = await html2canvas(targetRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a6");
      const pageWidth = pdf.internal.pageSize.getWidth();

      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

      const url = pdf.output("bloburl");
      const href=typeof url === 'string' ? url :'';
      if (newWindow) {
        newWindow.location.href = href;
      } else {
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
        <IoCloudDownload /> İndir PDF
      </Button>
    </div>
  );
}

export default Download;
