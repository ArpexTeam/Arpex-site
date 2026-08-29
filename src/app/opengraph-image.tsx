import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "ArpeX Technology";

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
          backgroundColor: "#080B09",
          color: "#F1EFE8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>
          <span>ARPE</span>
          <span style={{ color: "#00E57A" }}>X</span>
          <span style={{ marginLeft: 16, fontSize: 20, color: "#858D87", fontWeight: 400, letterSpacing: 3 }}>
            TECHNOLOGY
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 920 }}>
          <div style={{ display: "flex", fontSize: 56, lineHeight: 1.15, fontWeight: 600 }}>
            Sua empresa já tem um sistema.
          </div>
          <div style={{ display: "flex", fontSize: 56, lineHeight: 1.15, fontWeight: 600, color: "#00E57A" }}>
            Ele só está espalhado.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
