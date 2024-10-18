import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#fff",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "200px",
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                width: "260px",
                height: "160px",
              }}
              src="https://www.mcmaster.com/mvd/contents/gfx/imagecache/900/90044a123-@halfx_637644589791018819.png?ver=imagenotfound"
            />
          </div>
        </div>
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "20px",
          }}
        >
          Alloy Steel Socket Head Screws
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <div style={{ textAlign: "center", display: "flex" }}>
            <p
              style={{ fontSize: "36px", fontWeight: "bold", color: "#0066cc" }}
            >
              170,000 psi
            </p>
            <p style={{ fontSize: "24px", color: "#666" }}>Tensile Strength</p>
          </div>
          <div style={{ textAlign: "center", display: "flex" }}>
            <p
              style={{ fontSize: "36px", fontWeight: "bold", color: "#009933" }}
            >
              ASTM A574
            </p>
            <p style={{ fontSize: "24px", color: "#666" }}>Compliant</p>
          </div>
          <div style={{ textAlign: "center", display: "flex" }}>
            <p
              style={{ fontSize: "36px", fontWeight: "bold", color: "#cc3300" }}
            >
              Zinc-plated
            </p>
            <p style={{ fontSize: "24px", color: "#666" }}>
              Corrosion Resistant
            </p>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
