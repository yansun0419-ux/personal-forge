import type { Metadata } from "next";

import { I18nProvider } from "@/app/components/I18nProvider";
import { ThemeProvider } from "@/app/components/ThemeProvider";

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
    <html lang="zh-CN" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <I18nProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
