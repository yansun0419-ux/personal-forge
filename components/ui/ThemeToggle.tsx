"use client";

import { useTheme } from "next-themes";

import { useI18n } from "@/components/providers/I18nProvider";

import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const { t } = useI18n();
  const { resolvedTheme, setTheme, theme } = useTheme();

  function toggleTheme() {
    const currentTheme = theme === "system" ? resolvedTheme : theme;

    setTheme(currentTheme === "dark" ? "light" : "dark");
  }

  return (
    <button
      aria-label={t("common.themeToggleLabel")}
      className="inline-grid h-10 w-10 place-items-center"
      onClick={toggleTheme}
      suppressHydrationWarning
      title={t("common.themeToggleLabel")}
      type="button"
    >
      <span aria-hidden="true" className={styles.toggle} />
    </button>
  );
}
