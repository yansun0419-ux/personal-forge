"use client";

import Link from "next/link";

import { useI18n } from "@/app/components/providers/I18nProvider";
import { useTheme } from "@/app/components/providers/ThemeProvider";

interface SiteNavProps {
  showLanguageToggle?: boolean;
}

const nextLocale = (locale: "zh" | "en") => (locale === "zh" ? "en" : "zh");

export function SiteNav({ showLanguageToggle = true }: SiteNavProps) {
  const { locale, setLocale, t } = useI18n();
  const { nextTheme, toggleTheme } = useTheme();
  const themeLabel =
    nextTheme === "night" ? t("common.themeToggleNight") : t("common.themeToggleDay");
  const themeAriaLabel =
    nextTheme === "night"
      ? t("common.themeToggleNightLabel")
      : t("common.themeToggleDayLabel");

  return (
    <header className="flex items-center justify-between gap-4">
      <Link
        aria-label={t("common.brand")}
        className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-primary"
        href="/"
      >
        {t("common.brand")}baga
      </Link>
      <div className="flex flex-wrap items-center justify-end gap-3">
        <Link
          aria-label={t("common.colorStudy")}
          className="rounded-full border border-accent-primary bg-bg-tertiary px-4 py-2 text-sm font-semibold text-text-primary"
          href="/colors"
        >
          {t("common.colorStudy")}
        </Link>
        <button
          aria-label={themeAriaLabel}
          className="rounded-full border border-accent-primary bg-bg-tertiary px-4 py-2 text-sm font-semibold text-text-primary"
          type="button"
          onClick={toggleTheme}
        >
          {themeLabel}
        </button>
        {showLanguageToggle ? (
          <button
            aria-label={t("common.languageToggleLabel")}
            className="rounded-full border border-accent-secondary bg-bg-tertiary px-4 py-2 text-sm font-semibold text-text-primary"
            type="button"
            onClick={() => setLocale(nextLocale(locale))}
          >
            {t("common.languageToggle")}
          </button>
        ) : null}
      </div>
    </header>
  );
}
