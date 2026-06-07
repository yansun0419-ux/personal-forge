import type { Metadata } from "next";

import { I18nProvider } from "@/components/providers/I18nProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SiteNav } from "@/components/layout/SiteNav";

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
          <ThemeProvider>
            <SiteNav />
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
