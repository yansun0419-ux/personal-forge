"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import {
  createTranslator,
  locales,
  type Locale,
  type TranslationKey,
} from "@/lib/i18n";

const defaultLocale: Locale = "zh";
const localeStorageKey = "personal-forge-locale";
const localeChangeEvent = "personal-forge-locale-change";
const localeHtmlLang: Record<Locale, string> = {
  zh: "zh-CN",
  en: "en",
};
let inMemoryLocale: Locale | null = null;

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps {
  children: ReactNode;
}

function isLocale(value: string | null): value is Locale {
  return locales.includes(value as Locale);
}

function getBrowserLocale(): Locale {
  const languagePreferences = [
    ...(navigator.languages ?? []),
    navigator.language,
  ].filter(Boolean);

  for (const language of languagePreferences) {
    const languageCode = language.toLowerCase().split("-")[0];

    if (isLocale(languageCode)) {
      return languageCode;
    }
  }

  return defaultLocale;
}

function getStoredLocale(): Locale | null {
  if (inMemoryLocale !== null) {
    return inMemoryLocale;
  }

  try {
    const storedLocale = window.localStorage.getItem(localeStorageKey);

    return isLocale(storedLocale) ? storedLocale : null;
  } catch {
    return null;
  }
}

function persistLocale(locale: Locale) {
  inMemoryLocale = locale;

  try {
    window.localStorage.setItem(localeStorageKey, locale);
  } catch {
    // Storage may be disabled; the in-memory preference still applies.
  }
}

function getLocaleSnapshot(): Locale {
  return getStoredLocale() ?? getBrowserLocale();
}

function getServerLocaleSnapshot(): Locale {
  return defaultLocale;
}

function subscribeToLocaleChanges(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(localeChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(localeChangeEvent, onStoreChange);
  };
}

export function I18nProvider({ children }: I18nProviderProps) {
  const locale = useSyncExternalStore(
    subscribeToLocaleChanges,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );

  useEffect(() => {
    document.documentElement.lang = localeHtmlLang[locale];
  }, [locale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    persistLocale(nextLocale);
    window.dispatchEvent(new Event(localeChangeEvent));
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: createTranslator(locale),
    }),
    [locale, setLocale],
  );

  return <I18nContext value={value}>{children}</I18nContext>;
}

export function useI18n() {
  const value = useContext(I18nContext);

  if (value === null) {
    throw new Error("useI18n must be used within I18nProvider(LanguageProvider)");
  }

  return value;
}
