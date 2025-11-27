"use client";

import { forwardRef } from "react";
import { useQRCode } from "next-qrcode";
import { Image } from "react-bootstrap";

interface Props {
  qrcode?: string;
}

const QrResult = forwardRef<HTMLDivElement, Props>(({ qrcode = "" }, ref) => {
  const { Canvas } = useQRCode();

  // Her zaman string ve güvenli bir değer kullanalım
  const safeValue = (qrcode ?? "").toString();
  const upper = safeValue.toUpperCase();
  const hasValue = safeValue.trim().length > 0;

  return (
    <div
      ref={ref}
      className="bg-white-100 rounded-2xl flex flex-col items-center pb-2 pt-2"
      style={{ width: 300, height: "auto" }}
    >
      <Image src="cv-charging.png" alt="CV Charging" width={300} height={100} />

      <span className="mb-2 f">{hasValue ? upper : ""}</span>

      <Canvas
        text={hasValue ? upper : " "}
        options={{
          type: "image/png",
          quality: 0.3,
          errorCorrectionLevel: "M",
          margin: 1,
          scale: 0.1,
          width: 200,
          color: {
            dark: "#000000",
            light: "#ffffffff",
          },
        }}
      />

      <Image src="contact.png" alt="CV Charging" width={300} height={200} />
    </div>
  );
});

QrResult.displayName = "QrResult";
export default QrResult;
