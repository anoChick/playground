import dayjs from "dayjs";
import { ImageResponse } from "next/og";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");
export const runtime = "edge";

export async function GET() {
  console.log(dayjs().format("MM/DD HH:mm:ss"));
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
