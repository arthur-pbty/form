import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "FormCraft - Créateur de formulaires en ligne gratuit"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "white",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "24px",
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            FormCraft
          </span>
        </div>
        <div
          style={{
            fontSize: "36px",
            color: "rgba(255, 255, 255, 0.9)",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          Créez vos formulaires gratuitement
        </div>
        <div
          style={{
            fontSize: "22px",
            color: "rgba(255, 255, 255, 0.7)",
            textAlign: "center",
            maxWidth: "700px",
            marginTop: "20px",
            lineHeight: 1.5,
          }}
        >
          Alternative gratuite à Google Forms • Sans inscription • Partage instantané
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "18px",
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          form.arthurp.fr
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
