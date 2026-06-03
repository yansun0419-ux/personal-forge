"use client";

import { SiteNav } from "@/components/layout/SiteNav";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { createBreadcrumbItems } from "@/lib/navigation";

const colorRoles = [
  [
    {
      role: "color primary",
      swatchClassName: "bg-accent-primary",
      value: "var(--accent-primary)",
    },
    {
      role: "color secondary",
      swatchClassName: "bg-accent-secondary",
      value: "var(--accent-secondary)",
    },
    {
      role: "color tertiary",
      swatchClassName: "bg-accent-tertiary",
      value: "var(--accent-tertiary)",
    },
  ],
  [
    {
      role: "BG primary",
      swatchClassName: "bg-bg-primary",
      value: "var(--bg-primary)",
    },
    {
      role: "BG secondary",
      swatchClassName: "bg-bg-secondary",
      value: "var(--bg-secondary)",
    },
    {
      role: "BG tertiary",
      swatchClassName: "bg-bg-tertiary",
      value: "var(--bg-tertiary)",
    },
  ],
  [
    {
      role: "text primary",
      swatchClassName: "bg-text-primary",
      value: "var(--text-primary)",
    },
    {
      role: "text secondary",
      swatchClassName: "bg-text-secondary",
      value: "var(--text-secondary)",
    },
    {
      role: "text tertiary",
      swatchClassName: "bg-text-tertiary",
      value: "var(--text-tertiary)",
    },
  ],
] as const;

export default function ColorsPage() {
  return (
    <main
      className="min-h-screen px-6 py-6 text-text-primary sm:px-10"
      style={{
        background:
          "radial-gradient(circle at 15% 10%, color-mix(in srgb, var(--accent-tertiary) 52%, transparent), transparent 28rem), linear-gradient(135deg, var(--bg-primary), var(--bg-secondary))",
      }}
    >
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col">
        <SiteNav />

        <div className="pt-8">
          <Breadcrumbs items={createBreadcrumbItems("/colors")} />
        </div>

        <section className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-accent-primary">
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
            {colorRoles.map((group) =>
              group.map((item) => (
                <div
                  className="flex items-center justify-between rounded-lg border border-text-primary/10 bg-bg-tertiary p-4 shadow-[0_20px_80px_color-mix(in_srgb,var(--text-primary)_8%,transparent)]"
                  key={item.role}
                >
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {item.role}
                    </p>
                    <p className="mt-1 font-mono text-xs text-text-tertiary">
                      {item.value}
                    </p>
                  </div>
                  <span
                    aria-label={`${item.role} 色块`}
                    className={`h-12 w-20 rounded-md border border-text-primary/10 ${item.swatchClassName}`}
                  />
                </div>
              )),
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
