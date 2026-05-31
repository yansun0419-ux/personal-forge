import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Portfolio",
  description: "A day and night theme study for a personal site.",
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
