import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "anoChick's playground",
  description: "anoChickのプレイグラウンドです",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className={inter.className}>
        <header className="text-center p-2 border-b">
          <Link className="text-blue-400" href="/">
            Top
          </Link>
        </header>
        <div>{children}</div>
      </body>
    </html>
  );
}