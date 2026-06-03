"use client";

import Image from "next/image";

import { HomePhilosophySection } from "@/app/components/HomePhilosophySection";
import { HomeStatusPanel } from "@/app/components/HomeStatusPanel";
import { useI18n } from "@/app/components/I18nProvider";
import { SiteNav } from "@/app/components/SiteNav";
import { themeTokens } from "@/lib/theme-tokens";

export default function HomePageClient() {
  const { t } = useI18n();

  return (
    <main
      className="relative isolate min-h-screen overflow-hidden"
      style={{
        backgroundColor: themeTokens.background.primary,
        color: themeTokens.text.primary,
      }}
    >
      <Image
        alt={t("home.backgroundAlt")}
        className="absolute inset-0 -z-20 object-cover mix-blend-luminosity"
        fill
        priority
        sizes="100vw"
        src="/forge-nebula.png"
        style={{ opacity: 0.18 }}
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(circle at 78% 18%, color-mix(in srgb, ${themeTokens.accent.primary} 28%, transparent), transparent 28rem), linear-gradient(135deg, ${themeTokens.background.primary}, ${themeTokens.background.secondary})`,
        }}
      />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10">
        <SiteNav />

        <section className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[minmax(0,1.04fr)_minmax(22rem,0.72fr)]">
          <div className="max-w-4xl">
            <p
              className="mb-5 text-sm font-semibold uppercase tracking-[0.24em]"
              style={{ color: themeTokens.accent.primary }}
            >
              {t("home.eyebrow")}
            </p>
            <h1
              className="max-w-4xl text-5xl font-black leading-[1.02] sm:text-7xl"
              style={{ color: themeTokens.text.primary }}
            >
              {t("home.title")}
            </h1>
            <p
              className="mt-7 max-w-2xl text-xl leading-9"
              style={{ color: themeTokens.text.secondary }}
            >
              {t("home.slogan")}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                aria-label={t("common.viewColorStudy")}
                className="rounded-full px-5 py-3 text-sm font-bold"
                href="/colors"
                style={{
                  backgroundColor: themeTokens.accent.primary,
                  boxShadow: `0 18px 60px color-mix(in srgb, ${themeTokens.accent.primary} 24%, transparent)`,
                  color: themeTokens.background.tertiary,
                }}
              >
                {t("common.viewColorStudy")}
              </a>
              <a
                aria-label={t("common.readPhilosophy")}
                className="rounded-full border px-5 py-3 text-sm font-bold"
                href="#philosophy"
                style={{
                  borderColor: themeTokens.accent.secondary,
                  color: themeTokens.text.primary,
                }}
              >
                {t("common.readPhilosophy")}
              </a>
            </div>
          </div>

          <HomeStatusPanel />
        </section>

        <HomePhilosophySection />
      </div>
    </main>
  );
}
