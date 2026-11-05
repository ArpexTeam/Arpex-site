import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "ArpeX Technology — Tecnologia para seu negócio funcionar melhor e crescer.";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#0b0e0c",
          color: "#ede9e1",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
          <span>ARPE</span>
          <span style={{ color: "#00cf77" }}>X</span>
          <span style={{ marginLeft: 16, fontSize: 18, color: "#9da39e", fontWeight: 400, letterSpacing: 4 }}>TECHNOLOGY</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          <div style={{ display: "flex", fontSize: 76, lineHeight: 1.02, fontWeight: 700, letterSpacing: -2 }}>
            Tecnologia para seu negócio funcionar melhor e crescer
            <span style={{ color: "#00cf77" }}>.</span>
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 28, color: "#9da39e" }}>
            Estruturação digital sob medida: presença, atendimento e operação.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
