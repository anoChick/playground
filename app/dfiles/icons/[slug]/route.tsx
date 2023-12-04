import dayjs from "dayjs";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          fontWeight: "bold",
          color: "blue",
          background: "white",
          width: "100%",
          height: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: 'url("https://pg.anochick.com/icon512.png")',
        }}
      >
        {dayjs().format("MM/DD HH:mm:ss")}
      </div>
    ),
    {
      width: 512,
      height: 512,
    }
  );
}
