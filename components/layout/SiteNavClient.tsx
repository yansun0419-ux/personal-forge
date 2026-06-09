"use client";

import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SiteNavBreadcrumbs } from "@/components/ui/Breadcrumbs";
import type { AppRoute } from "@/lib/app-routes";

interface SiteNavClientProps {
  routes: AppRoute[];
}

export function SiteNavClient({ routes }: SiteNavClientProps) {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 py-4 px-6 sm:px-10">
      <SiteNavBreadcrumbs routes={routes} />

      <div className="flex flex-wrap items-center justify-end">
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </header>
  );
}
