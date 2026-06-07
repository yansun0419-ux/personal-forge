"use client";

import { HomePhilosophySection } from "@/components/HomePhilosophySection";
import { HomeStatusPanel } from "@/components/HomeStatusPanel";
import { useI18n } from "@/components/providers/I18nProvider";

export default function HomePageClient() {
  const { t } = useI18n();

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-bg-primary text-text-primary">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 78% 18%, color-mix(in srgb, var(--accent-primary) 28%, transparent), transparent 28rem), linear-gradient(135deg, var(--bg-primary), var(--bg-secondary))",
        }}
      />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10">
        <section className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[minmax(0,1.04fr)_minmax(22rem,0.72fr)]">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-accent-primary">
              {t("home.eyebrow")}
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] text-text-primary sm:text-7xl">
              {t("home.title")}
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-text-secondary">
              {t("home.slogan")}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                aria-label={t("common.viewColorStudy")}
                className="rounded-full bg-accent-primary px-5 py-3 text-sm font-bold text-bg-tertiary shadow-[0_18px_60px_color-mix(in_srgb,var(--accent-primary)_24%,transparent)]"
                href="/colors"
              >
                {t("common.viewColorStudy")}
              </a>
              <a
                aria-label={t("common.readPhilosophy")}
                className="rounded-full border border-accent-secondary px-5 py-3 text-sm font-bold text-text-primary"
                href="#philosophy"
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
