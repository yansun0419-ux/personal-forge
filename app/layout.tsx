import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Forge",
  description: "A personal forge for tools and a digital garden.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
