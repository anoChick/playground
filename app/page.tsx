import Link from "next/link";

export default function Home() {
  return (
    <main className="p-4">
      <div>
        <a
          href="https://x.com/anoChick"
          className="text-blue-400"
          target="_blank"
          rel="noopener"
        >
          anoChick
        </a>
        のプレイグラウンドです
      </div>
      <div>
        <Link href="/ac/2023/commmune/3" className="text-blue-400">
          favicon clock
        </Link>
      </div>
      <div>
        <Link href="/webpush" className="text-blue-400">
          webpush
        </Link>
      </div>
      <div>
        <Link href="/pwabadge" className="text-blue-400">
          PWA Badge
        </Link>
      </div>
      <div>
        <Link href="/pwainstallation" className="text-blue-400">
          PWA Installation
        </Link>
      </div>
      <div>
        <Link href="/ac/2023/commmune/24" className="text-blue-400">
          Breakout
        </Link>
      </div>
    </main>
  );
}
