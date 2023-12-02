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
    </main>
  );
}
