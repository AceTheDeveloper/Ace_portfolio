import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.firstName} "${site.nickname}" ${site.lastName}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COBALT = "#1F4FFF";
const INK = "#0B1220";
const MUTED = "#5B6678";
const LINE = "#E3E8F2";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#FFFFFF",
          border: `1px solid ${LINE}`,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            color: COBALT,
          }}
        >
          {`${site.role} / ${site.focus}`.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 112,
              fontWeight: 700,
              letterSpacing: -4,
              lineHeight: 1,
              color: INK,
            }}
          >
            <span>{site.firstName}</span>
            <span style={{ color: COBALT, margin: "0 28px" }}>
              {`“${site.nickname}”`}
            </span>
            <span>{site.lastName}</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 36,
              fontSize: 34,
              lineHeight: 1.35,
              color: MUTED,
              maxWidth: 900,
            }}
          >
            {site.tagline}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: 96, height: 8, background: COBALT }} />
          <div
            style={{
              display: "flex",
              marginLeft: 24,
              fontSize: 26,
              color: INK,
            }}
          >
            github.com/AceTheDeveloper
          </div>
        </div>
      </div>
    ),
    size,
  );
}
