import type { Metadata } from "next";
import { cookies, headers } from "next/headers";

import { I18nProvider } from "@/components/providers/I18nProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SiteNav } from "@/components/layout/SiteNav";
import {
  defaultLocale,
  isLocale,
  localeCookieKey,
  localeHtmlLang,
  parseAcceptLanguage,
  type Locale,
} from "@/lib/locale";

import "./globals.css";

function createLocalePreferenceScript(initialLocale: Locale) {
  return `
(() => {
  const defaultLocale = ${JSON.stringify(defaultLocale)};
  const serverLocale = ${JSON.stringify(initialLocale)};
  const supportedLocales = ["zh", "en"];
  const localeHtmlLang = { zh: "zh-CN", en: "en" };

  function normalizeLocale(value) {
    if (typeof value !== "string") {
      return null;
    }

    const locale = value.toLowerCase().split("-")[0];

    return supportedLocales.includes(locale) ? locale : null;
  }

  function getStoredLocale() {
    try {
      return normalizeLocale(window.localStorage.getItem(${JSON.stringify(localeCookieKey)}));
    } catch {
      return null;
    }
  }

  function getBrowserLocale() {
    const languages = [
      ...((navigator && navigator.languages) || []),
      navigator && navigator.language,
    ];

    for (const language of languages) {
      const locale = normalizeLocale(language);

      if (locale) {
        return locale;
      }
    }

    return defaultLocale;
  }

  const locale = getStoredLocale() || serverLocale || getBrowserLocale();

  document.documentElement.lang = localeHtmlLang[locale] || localeHtmlLang[defaultLocale];
  document.documentElement.dataset.localeTarget = locale;

  try {
    document.cookie = ${JSON.stringify(localeCookieKey)} + "=" + locale + "; path=/; max-age=31536000; samesite=lax";
  } catch {}

  if (locale !== serverLocale) {
    document.documentElement.dataset.localePending = "true";
  }
})();
`;
}

async function getInitialLocale(): Promise<Locale> {
  const cookieLocale = (await cookies()).get(localeCookieKey)?.value;

  if (isLocale(cookieLocale)) {
    return cookieLocale;
  }

  return parseAcceptLanguage((await headers()).get("accept-language")) ?? defaultLocale;
}

export const metadata: Metadata = {
  title: "Personal Forge",
  description:
    "A personal forge log for code, craft, and disciplined practice.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialLocale = await getInitialLocale();

  return (
    <html
      lang={localeHtmlLang[initialLocale]}
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html:
              'html[data-locale-pending="true"] body{visibility:hidden!important}',
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: createLocalePreferenceScript(initialLocale),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <I18nProvider initialLocale={initialLocale}>
          <ThemeProvider>
            <SiteNav />
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
