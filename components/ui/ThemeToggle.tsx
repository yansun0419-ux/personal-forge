"use client";

import { useTheme } from "next-themes";

import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const { resolvedTheme, setTheme, theme } = useTheme();

  function toggleTheme() {
    const currentTheme = theme === "system" ? resolvedTheme : theme;

    setTheme(currentTheme === "dark" ? "light" : "dark");
  }

  return (
    <button
      className="inline-grid h-10 w-10 place-items-center"
      onClick={toggleTheme}
      suppressHydrationWarning
      type="button"
    >
      <span aria-hidden="true" className={styles.toggle} />
    </button>
  );
}
