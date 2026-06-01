"use client";

import Image from "next/image";
import Link from "next/link";

import { useI18n } from "@/app/components/I18nProvider";
import type { Locale, TranslationKey } from "@/lib/i18n";

const philosophyKeys = [
  "home.philosophyParagraph1",
  "home.philosophyParagraph2",
  "home.philosophyParagraph3",
  "home.philosophyParagraph4",
] as const satisfies readonly TranslationKey[];

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

const nextLocale = (locale: Locale): Locale => (locale === "zh" ? "en" : "zh");

export default function HomePageClient() {
  const { locale, setLocale, t } = useI18n();
  const languageTarget = nextLocale(locale);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#050713] text-white">
      <Image
        alt={t("home.backgroundAlt")}
        className="absolute inset-0 -z-20 object-cover"
        fill
        priority
        sizes="100vw"
        src="/forge-nebula.png"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,7,19,0.94),rgba(5,7,19,0.72)_48%,rgba(5,7,19,0.34))]" />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10">
        <header className="flex items-center justify-between gap-4">
          <Link
            aria-label={t("common.brand")}
            className="text-sm font-semibold uppercase tracking-[0.22em] text-white/72"
            href="/"
          >
            {t("common.brand")}
          </Link>
          <div className="flex items-center gap-3">
            <Link
              aria-label={t("common.colorStudy")}
              className="rounded-full border border-white/18 bg-white/8 px-4 py-2 text-sm font-semibold text-white/86"
              href="/colors"
            >
              {t("common.colorStudy")}
            </Link>
            <button
              aria-label={t("common.languageToggleLabel")}
              className="rounded-full border border-white/18 bg-white/8 px-4 py-2 text-sm font-semibold text-white/86"
              type="button"
              onClick={() => setLocale(languageTarget)}
            >
              {t("common.languageToggle")}
            </button>
          </div>
        </header>

        <section className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[minmax(0,1.04fr)_minmax(22rem,0.72fr)]">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-[#f6b35b]">
              {t("home.eyebrow")}
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] text-white sm:text-7xl">
              {t("home.title")}
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-white/78">
              {t("home.slogan")}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                aria-label={t("common.viewColorStudy")}
                className="rounded-full bg-[#f6b35b] px-5 py-3 text-sm font-bold text-[#140b05] shadow-[0_18px_60px_rgba(246,179,91,0.24)]"
                href="/colors"
              >
                {t("common.viewColorStudy")}
              </Link>
              <a
                aria-label={t("common.readPhilosophy")}
                className="rounded-full border border-white/18 px-5 py-3 text-sm font-bold text-white/86"
                href="#philosophy"
              >
                {t("common.readPhilosophy")}
              </a>
            </div>
          </div>

          <aside
            aria-label={t("home.statusAriaLabel")}
            className="grid gap-3 border-l border-white/14 pl-6"
          >
            {forgeStats.map((item) => (
              <div key={item.label}>
                <p className="text-sm text-white/48">{t(item.label)}</p>
                <p className="mt-1 text-2xl font-black text-white">
                  {t(item.value)}
                </p>
              </div>
            ))}
          </aside>
        </section>

        <section
          className="grid gap-8 border-t border-white/12 py-12 lg:grid-cols-[0.38fr_0.62fr]"
          id="philosophy"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f6b35b]">
              {t("home.philosophyEyebrow")}
            </p>
            <h2 className="mt-4 text-3xl font-black text-white">
              {t("home.philosophyTitle")}
            </h2>
          </div>
          <div className="grid gap-5 text-lg leading-9 text-white/76">
            {philosophyKeys.map((key) => (
              <p key={key}>{t(key)}</p>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
