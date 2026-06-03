"use client";

import { useI18n } from "@/components/providers/I18nProvider";
import type { TranslationKey } from "@/lib/i18n";

const philosophyKeys = [
  "home.philosophyParagraph1",
  "home.philosophyParagraph2",
  "home.philosophyParagraph3",
  "home.philosophyParagraph4",
] as const satisfies readonly TranslationKey[];

export function HomePhilosophySection() {
  const { t } = useI18n();

  return (
    <section
      className="grid gap-8 border-t border-accent-tertiary py-12 lg:grid-cols-[0.38fr_0.62fr]"
      id="philosophy"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-primary">
          {t("home.philosophyEyebrow")}
        </p>
        <h2 className="mt-4 text-3xl font-black text-text-primary">
          {t("home.philosophyTitle")}
        </h2>
      </div>
      <div className="grid gap-5 text-lg leading-9 text-text-secondary">
        {philosophyKeys.map((key) => (
          <p key={key}>{t(key)}</p>
        ))}
      </div>
    </section>
  );
}
