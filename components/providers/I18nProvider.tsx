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
  type Locale,
  type TranslationKey,
} from "@/lib/i18n";
import {
  defaultLocale,
  localeCookieKey,
  localeHtmlLang,
  localeStorageKey,
  normalizeLocale,
} from "@/lib/locale";

const localeChangeEvent = "personal-forge-locale-change";
let inMemoryLocale: Locale | null = null;

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps {
  children: ReactNode;
  initialLocale: Locale;
}

function getBrowserLocale(): Locale {
  const languagePreferences = [
    ...(navigator.languages ?? []),
    navigator.language,
  ].filter(Boolean);

  for (const language of languagePreferences) {
    const languageCode = normalizeLocale(language);

    if (languageCode !== null) {
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

    return normalizeLocale(storedLocale);
  } catch {
    return null;
  }
}

function getCookieLocale(): Locale | null {
  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${localeCookieKey}=`));

  return normalizeLocale(cookie?.split("=")[1]);
}

function persistLocale(locale: Locale) {
  inMemoryLocale = locale;

  try {
    window.localStorage.setItem(localeStorageKey, locale);
  } catch {
    // Storage may be disabled; the in-memory preference still applies.
  }

  document.cookie = `${localeCookieKey}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

function getLocaleSnapshot(): Locale {
  return getStoredLocale() ?? getCookieLocale() ?? getBrowserLocale();
}

function subscribeToLocaleChanges(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(localeChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(localeChangeEvent, onStoreChange);
  };
}

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  const locale = useSyncExternalStore(
    subscribeToLocaleChanges,
    getLocaleSnapshot,
    () => initialLocale,
  );

  useEffect(() => {
    const expectedLocale = getLocaleSnapshot();
    const isWaitingForClientLocale =
      document.documentElement.dataset.localePending === "true" &&
      expectedLocale !== locale;

    if (isWaitingForClientLocale) {
      return;
    }

    document.documentElement.lang = localeHtmlLang[locale];
    document.documentElement.removeAttribute("data-locale-pending");
    document.documentElement.removeAttribute("data-locale-target");
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
