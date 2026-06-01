"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { createBreadcrumbItems } from "@/lib/navigation";
import { themeTokens } from "@/lib/theme-tokens";

type ThemeMode = "day" | "night";

const themeLabels: Record<ThemeMode, string> = {
  day: "白昼",
  night: "黑夜",
};

const colorRoles = [
  ["color primary", "color secondary", "color tertiary"],
  ["BG primary", "BG secondary", "BG tertiary"],
  ["text primary", "text secondary", "text tertiary"],
] as const;

export default function ColorsPage() {
  const [theme, setTheme] = useState<ThemeMode>("day");
  const nextTheme = theme === "day" ? "night" : "day";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <main className="min-h-screen px-6 py-6 text-text-primary sm:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between gap-4">
          <Link
            aria-label="回到主页"
            className="text-sm font-semibold uppercase tracking-[0.22em] text-text-secondary"
            href="/"
          >
            Personal Forge
          </Link>
          <button
            aria-label={`切换到${themeLabels[nextTheme]}模式`}
            className="h-11 rounded-full border border-brand-primary/35 bg-bg-tertiary px-5 text-sm font-semibold text-text-primary shadow-[0_14px_40px_color-mix(in_srgb,var(--color-primary)_18%,transparent)] transition hover:border-brand-primary"
            type="button"
            onClick={() => setTheme(nextTheme)}
          >
            {themeLabels[nextTheme]}
          </button>
        </header>

        <div className="pt-8">
          <Breadcrumbs items={createBreadcrumbItems("/colors")} />
        </div>

        <section className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary">
              CSS variables / Theme tokens
            </p>
            <h1 className="text-5xl font-black leading-[0.98] text-text-primary sm:text-7xl">
              先把颜色的骨架立起来。
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-text-secondary">
              这个页面保留为视觉系统的第一块试炼场。这里展示的不是写死的色值，而是一组语义化
              CSS 变量：页面只关心 primary、secondary、tertiary
              这些角色，真正的白昼和黑夜色值由全局样式统一切换。
            </p>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-text-tertiary">
              这样以后在任何路径使用颜色时，只需要写对应变量。想换颜色，就回到
              CSS 里改一次；主题切换时，所有引用变量的页面都会自动跟着变。
            </p>
          </div>

          <div className="grid gap-4">
            {colorRoles.map((group, groupIndex) => {
              const values = Object.values(
                groupIndex === 0
                  ? themeTokens.accent
                  : groupIndex === 1
                    ? themeTokens.background
                    : themeTokens.text,
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
