"use client";

import { useI18n } from "@/app/components/providers/I18nProvider";
import type { TranslationKey } from "@/lib/i18n";

const forgeStats = [
  {
    label: "home.statusLabelFoundation",
    value: "home.statusValueFoundation",
  },
  {
    label: "home.statusLabelEnemy",
    value: "home.statusValueEnemy",
  },
  {
    label: "home.statusLabelGoal",
    value: "home.statusValueGoal",
  },
] as const satisfies readonly {
  label: TranslationKey;
  value: TranslationKey;
}[];

export function HomeStatusPanel() {
  const { t } = useI18n();

  return (
    <aside
      aria-label={t("home.statusAriaLabel")}
      className="grid gap-3 border-l border-accent-tertiary pl-6"
    >
      {forgeStats.map((item) => (
        <div key={item.label}>
          <p className="text-sm text-text-tertiary">{t(item.label)}</p>
          <p className="mt-1 text-2xl font-black text-text-primary">
            {t(item.value)}
          </p>
        </div>
      ))}
    </aside>
  );
}
