"use client";

import { useEffect, useState } from "react";

import { themeTokens, type ThemeName } from "@/lib/theme-tokens";

const themeLabels: Record<ThemeName, string> = {
  day: "白天",
  night: "黑夜",
};

const colorRoles = [
  ["color primary", "color secondary", "color tertiary"],
  ["BG primary", "BG secondary", "BG tertiary"],
  ["text primary", "text secondary", "text tertiary"],
] as const;

export default function Home() {
  const [theme, setTheme] = useState<ThemeName>("day");
  const activeTokens = themeTokens[theme];

  useEffect(() => {
    document.documentElement.dataset.theme =
      theme === "night" ? "night" : "day";
  }, [theme]);

  const nextTheme = theme === "day" ? "night" : "day";

  return (
    <main className="min-h-screen px-6 py-6 text-text-primary sm:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between gap-4">
          <a
            aria-label="回到首页"
            className="text-sm font-semibold uppercase tracking-[0.22em] text-text-secondary"
            href="/"
          >
            Personal Forge
          </a>
          <button
            aria-label={`切换到${themeLabels[nextTheme]}模式`}
            className="h-11 rounded-full border border-brand-primary/35 bg-bg-tertiary px-5 text-sm font-semibold text-text-primary shadow-[0_14px_40px_color-mix(in_srgb,var(--color-primary)_18%,transparent)] transition hover:border-brand-primary"
            type="button"
            onClick={() => setTheme(nextTheme)}
          >
            {themeLabels[nextTheme]}
          </button>
        </header>

        <section className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary">
              Day blue white / Night red black
            </p>
            <h1 className="text-5xl font-black leading-[0.96] text-text-primary sm:text-7xl">
              先把颜色的骨架立起来。
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-text-secondary">
              参考作品集常用的高留白、强主色和深色霓虹对比后，我把主题拆成
              accent、background、text
              三组，每组三档。文字色不只留一种，因为简历和博客会同时需要标题、正文、辅助信息。
            </p>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-text-tertiary">
              第三档。文字色不只留一种，因为简历和博客会同时需要标题、正文、辅助信息。
            </p>
          </div>

          <div className="grid gap-4">
            {colorRoles.map((group, groupIndex) => {
              const values = Object.values(
                groupIndex === 0
                  ? activeTokens.accent
                  : groupIndex === 1
                    ? activeTokens.background
                    : activeTokens.text,
              );

              return group.map((role, index) => (
                <div
                  className="flex items-center justify-between rounded-lg border border-text-primary/10 bg-bg-tertiary/80 p-4 shadow-[0_20px_80px_color-mix(in_srgb,var(--text-primary)_8%,transparent)]"
                  key={role}
                >
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {role}
                    </p>
                    <p className="mt-1 font-mono text-xs text-text-tertiary">
                      {values[index]}
                    </p>
                  </div>
                  <span
                    aria-label={`${role} 色块`}
                    className="h-12 w-20 rounded-md border border-text-primary/10"
                    style={{ backgroundColor: values[index] }}
                  />
                </div>
              ));
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
