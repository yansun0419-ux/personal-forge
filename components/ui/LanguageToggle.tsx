"use client";

import { useI18n } from "@/components/providers/LanguageProvider";
import styles from "./LanguageToggle.module.css";

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  function toggleLanguage() {
    setLocale(locale === "zh" ? "en" : "zh");
  }

  return (
    <button
      className="inline-grid h-10 w-10 place-items-center"
      onClick={toggleLanguage}
      type="button"
    >
      <div className={styles.container} data-locale={locale}>
        <span aria-hidden="true" className={`${styles.icon} ${styles.en}`}>
          A
        </span>
        <span aria-hidden="true" className={`${styles.icon} ${styles.zh}`}>
          文
        </span>
      </div>
    </button>
  );
}
