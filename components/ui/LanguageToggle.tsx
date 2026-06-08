"use client";

import { useI18n } from "@/components/providers/I18nProvider";
import styles from "./LanguageToggle.module.css";

export function LanguageToggle() {
  const { locale, setLocale, t } = useI18n();

  function toggleLanguage() {
    setLocale(locale === "zh" ? "en" : "zh");
  }

  return (
    <button
      aria-label={t("common.languageToggleLabel")}
      className="inline-grid h-10 w-10 place-items-center cursor-pointer"
      onClick={toggleLanguage}
      title={t("common.languageToggleLabel")}
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
