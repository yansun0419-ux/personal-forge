"use client";

import Link from "next/link";

import { useI18n } from "@/components/providers/LanguageProvider";
import { ThemeToggle } from "../ui/ThemeToggle";
import { LanguageToggle } from "../ui/LanguageToggle";

export function SiteNav() {
  const { t } = useI18n();

  return (
    <header className="flex items-center justify-between gap-4 px-4 py-4">
      <Link
        aria-label={t("common.brand")}
        className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-primary"
        href="/"
      >
        {t("common.brand")}
      </Link>

      <div className="flex flex-wrap items-center justify-end">
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </header>
  );
}
