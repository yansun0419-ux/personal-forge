"use client";

import { useTheme } from "next-themes";

import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const { resolvedTheme, setTheme, theme } = useTheme();

  function toggleTheme() {
    const nextTheme =
      theme === "system" ? "light" : theme === "light" ? "dark" : "system";

    setTheme(nextTheme);
  }

  const themeMode =
    theme === "system" || theme === "light" || theme === "dark"
      ? theme
      : resolvedTheme ?? "system";

  return (
    <button
      className="inline-grid h-10 w-10 place-items-center"
      onClick={toggleTheme}
      suppressHydrationWarning
      type="button"
    >
      <span
        aria-hidden="true"
        className={styles.toggle}
        data-theme-mode={themeMode}
      />
    </button>
  );
}
