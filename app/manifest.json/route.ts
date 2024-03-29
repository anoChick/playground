import dayjs from "dayjs";
import { NextResponse } from "next/server";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export const runtime = "edge";

export async function GET() {
  const revision = dayjs().format("YYYYMMDDHHmmss");
  console.log(revision);
  return NextResponse.json({
    id: revision,
    name: "anoChick's playground",
    short_name: "playground",
    start_url: "/?revision=" + revision,
    scope: "/",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    categories: ["playground", "technology"],
    description: "あのちっくが実験的なことをする場所です。",
    display: "standalone",
    related_applications: [
      {
        platform: "webapp",
        url: "https://gira-same-domain.glitch.me/pwa/manifest.json",
      },
    ],
    icons: [
      {
        purpose: "any maskable",
        src: "https://pg.anochick.com/dfiles/icons/" + revision + ".png",
        sizes: "192x192 512x512",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "https://pg.anochick.com/ss1.png",
        sizes: "715x988",
        type: "image/png",
      },
      {
        src: "https://pg.anochick.com/ss2.png",
        sizes: "1619x1637",
        type: "image/png",
      },
    ],
    share_target: {},
    shortcuts: [
      {
        name: "favicon clock",
        url: "/ac/2023/commmune/3",
        icons: [
          {
            src: "clockicon.png",
            type: "image/png",
            sizes: "192x192",
          },
        ],
      },
    ],
  });
}
