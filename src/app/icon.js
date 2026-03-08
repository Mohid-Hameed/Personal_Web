import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  const imagePath = path.join(process.cwd(), "public", "head.png");
  const imageBuffer = fs.readFileSync(imagePath);
  const dataUrl = `data:image/png;base64,${imageBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
        }}
      >
        <img
          src={dataUrl}
          width={32}
          height={32}
          style={{ objectFit: "cover" }}
          alt=""
        />
      </div>
    ),
    { ...size }
  );
}
