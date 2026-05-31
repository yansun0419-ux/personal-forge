import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Forge",
  description:
    "A personal forge log for code, craft, and disciplined practice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
