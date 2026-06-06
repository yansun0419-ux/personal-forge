"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { createTranslator, type Locale, type TranslationKey } from "@/lib/i18n";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>("zh");

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: createTranslator(locale),
    }),
    [locale],
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
