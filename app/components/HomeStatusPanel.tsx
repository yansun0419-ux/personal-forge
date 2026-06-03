"use client";

import { useI18n } from "@/app/components/I18nProvider";
import type { TranslationKey } from "@/lib/i18n";
import { themeTokens } from "@/lib/theme-tokens";

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
      className="grid gap-3 border-l pl-6"
      style={{ borderColor: themeTokens.accent.tertiary }}
    >
      {forgeStats.map((item) => (
        <div key={item.label}>
          <p className="text-sm" style={{ color: themeTokens.text.tertiary }}>
            {t(item.label)}
          </p>
          <p
            className="mt-1 text-2xl font-black"
            style={{ color: themeTokens.text.primary }}
          >
            {t(item.value)}
          </p>
        </div>
      ))}
    </aside>
  );
}
