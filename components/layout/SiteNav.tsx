"use client";

import Link from "next/link";

import { useI18n } from "@/components/providers/I18nProvider";
import { ThemeToggle } from "../ui/ThemeToggle";

const nextLocale = (locale: "zh" | "en") => (locale === "zh" ? "en" : "zh");

export function SiteNav() {
  const { locale, setLocale, t } = useI18n();

  return (
    <header className="flex items-center justify-between gap-4 px-4 py-4">
      <Link
        aria-label={t("common.brand")}
        className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-primary"
        href="/"
      >
        {t("common.brand")}
      </Link>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <ThemeToggle />

        <button
          aria-label={t("common.languageToggleLabel")}
          className="rounded-full border border-accent-secondary bg-bg-tertiary px-4 py-2 text-sm font-semibold text-text-primary"
          type="button"
          onClick={() => setLocale(nextLocale(locale))}
        >
          {t("common.languageToggle")}
        </button>
      </div>
    </header>
  );
}
