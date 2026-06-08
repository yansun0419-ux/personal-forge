import { locales, type Locale } from "@/lib/i18n";

export type { Locale } from "@/lib/i18n";

export const defaultLocale: Locale = "zh";
export const localeStorageKey = "personal-forge-locale";
export const localeCookieKey = "personal-forge-locale";

export const localeHtmlLang: Record<Locale, string> = {
  zh: "zh-CN",
  en: "en",
};

export function isLocale(value: string | null | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function normalizeLocale(value: string | null | undefined): Locale | null {
  if (typeof value !== "string") {
    return null;
  }

  const locale = value.toLowerCase().split("-")[0];

  return isLocale(locale) ? locale : null;
}

export function parseAcceptLanguage(acceptLanguage: string | null): Locale | null {
  if (acceptLanguage === null) {
    return null;
  }

  const languageRanges = acceptLanguage
    .split(",")
    .map((range) => {
      const [language = "", quality = "q=1"] = range.trim().split(";");
      const qualityValue = Number(quality.trim().replace(/^q=/, ""));

      return {
        locale: normalizeLocale(language.trim()),
        quality: Number.isFinite(qualityValue) ? qualityValue : 1,
      };
    })
    .filter((range): range is { locale: Locale; quality: number } => range.locale !== null)
    .sort((a, b) => b.quality - a.quality);

  return languageRanges[0]?.locale ?? null;
}
