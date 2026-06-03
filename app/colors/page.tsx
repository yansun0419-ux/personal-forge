"use client";

import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { SiteNav } from "@/app/components/SiteNav";
import { createBreadcrumbItems } from "@/lib/navigation";
import { themeTokens } from "@/lib/theme-tokens";

const colorRoles = [
  ["color primary", "color secondary", "color tertiary"],
  ["BG primary", "BG secondary", "BG tertiary"],
  ["text primary", "text secondary", "text tertiary"],
] as const;

export default function ColorsPage() {
  return (
    <main
      className="min-h-screen px-6 py-6 sm:px-10"
      style={{
        background: `radial-gradient(circle at 15% 10%, color-mix(in srgb, ${themeTokens.accent.tertiary} 52%, transparent), transparent 28rem), linear-gradient(135deg, ${themeTokens.background.primary}, ${themeTokens.background.secondary})`,
        color: themeTokens.text.primary,
      }}
    >
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col">
        <SiteNav />

        <div className="pt-8">
          <Breadcrumbs items={createBreadcrumbItems("/colors")} />
        </div>

        <section className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <p
              className="mb-5 text-sm font-semibold uppercase tracking-[0.24em]"
              style={{ color: themeTokens.accent.primary }}
            >
              CSS variables / Theme tokens
            </p>
            <h1
              className="text-5xl font-black leading-[0.98] sm:text-7xl"
              style={{ color: themeTokens.text.primary }}
            >
              先把颜色的骨架立起来。
            </h1>
            <p
              className="mt-7 max-w-2xl text-lg leading-8"
              style={{ color: themeTokens.text.secondary }}
            >
              这个页面保留为视觉系统的第一块试炼场。这里展示的不是写死的色值，而是一组语义化
              CSS 变量：页面只关心 primary、secondary、tertiary
              这些角色，真正的白昼和黑夜色值由全局样式统一切换。
            </p>
            <p
              className="mt-7 max-w-2xl text-lg leading-8"
              style={{ color: themeTokens.text.tertiary }}
            >
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
                  className="flex items-center justify-between rounded-lg border p-4"
                  key={role}
                  style={{
                    backgroundColor: themeTokens.background.tertiary,
                    borderColor: `color-mix(in srgb, ${themeTokens.text.primary} 10%, transparent)`,
                    boxShadow: `0 20px 80px color-mix(in srgb, ${themeTokens.text.primary} 8%, transparent)`,
                  }}
                >
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: themeTokens.text.primary }}
                    >
                      {role}
                    </p>
                    <p
                      className="mt-1 font-mono text-xs"
                      style={{ color: themeTokens.text.tertiary }}
                    >
                      {values[index]}
                    </p>
                  </div>
                  <span
                    aria-label={`${role} 色块`}
                    className="h-12 w-20 rounded-md border"
                    style={{
                      backgroundColor: values[index],
                      borderColor: `color-mix(in srgb, ${themeTokens.text.primary} 10%, transparent)`,
                    }}
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
