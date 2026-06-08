"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

import { useI18n } from "@/components/providers/I18nProvider";
import type { TranslationKey } from "@/lib/i18n";

import styles from "./ThemeToggle.module.css";

type ThemeMode = "system" | "light" | "dark";

const themeModes: ThemeMode[] = ["system", "light", "dark"];
const themeLabelKeys: Record<ThemeMode, TranslationKey> = {
  system: "common.themeToggleLabel.system.light",
  light: "common.themeToggleLabel.light.dark",
  dark: "common.themeToggleLabel.dark.system",
};

function isThemeMode(value: string | undefined): value is ThemeMode {
  return value === "system" || value === "light" || value === "dark";
}

function subscribeToMountedSnapshot() {
  return () => { };
}

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const { t } = useI18n();
  const mounted = useSyncExternalStore(
    subscribeToMountedSnapshot,
    () => true,
    () => false,
  );

  const themeMode: ThemeMode = mounted && isThemeMode(theme) ? theme : "system";
  const nextTheme = themeModes[(themeModes.indexOf(themeMode) + 1) % themeModes.length];
  const buttonLabel = mounted
    ? t(themeLabelKeys[themeMode])
    : t("common.themeToggleLabel.loading");

  function toggleTheme() {
    setTheme(nextTheme);
  }

  return (
    <button
      aria-label={buttonLabel}
      className="inline-grid h-10 w-10 place-items-center cursor-pointer"
      disabled={!mounted}
      onClick={toggleTheme}
      suppressHydrationWarning
      title={buttonLabel}
      type="button"
    >
      <span
        aria-hidden="true"
        className={styles.toggle}
        data-theme-mode={themeMode}
      />
      <span aria-live="polite" className="sr-only">
        {buttonLabel}
      </span>
    </button>
  );
}
