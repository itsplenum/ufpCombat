import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

interface OgImageContent {
  /** Línea pequeña superior, ej. "SÁB 15 AGO 2026 · ARENA CIUDAD". */
  eyebrow?: string;
  /** Línea principal en crema, ej. "UFP 17". */
  title: string;
  /** Línea en rojo sangre, ej. "SANGRE NUEVA". */
  titleAccent?: string;
  /** Línea inferior, ej. "RÍOS VS VOLKOV". */
  footer?: string;
}

/** Plantilla única de OG images del sitio: negro + rojo sangre + Anton. */
export async function renderOgImage(content: OgImageContent): Promise<ImageResponse> {
  const anton = await readFile(
    join(process.cwd(), "src/assets/fonts/Anton-Regular.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
          backgroundColor: "#0A0708",
          backgroundImage:
            "radial-gradient(ellipse 90% 70% at 50% 115%, rgba(122,12,20,.65), transparent 60%)",
          fontFamily: "Anton",
          textTransform: "uppercase",
          padding: 60,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 10,
            backgroundColor: "#C1121F",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#E5383B",
            fontSize: 26,
            letterSpacing: 8,
          }}
        >
          <div style={{ width: 60, height: 2, backgroundColor: "#C1121F", display: "flex" }} />
          <span>{content.eyebrow ?? "ULTIMATE FIGHT PROMOTIONS"}</span>
          <div style={{ width: 60, height: 2, backgroundColor: "#C1121F", display: "flex" }} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            lineHeight: 0.95,
          }}
        >
          <span style={{ color: "#F2ECE4", fontSize: 130 }}>{content.title}</span>
          {content.titleAccent ? (
            <span style={{ color: "#C1121F", fontSize: 130 }}>{content.titleAccent}</span>
          ) : null}
        </div>
        {content.footer ? (
          <span style={{ color: "rgba(242,236,228,.7)", fontSize: 32, letterSpacing: 6 }}>
            {content.footer}
          </span>
        ) : null}
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: "Anton", data: anton, weight: 400 as const, style: "normal" as const }],
    },
  );
}
