"use client";

import { usePathname } from "next/navigation";

import { useI18n } from "@/components/providers/I18nProvider";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { createBreadcrumbItems, type AppRoute } from "@/lib/navigation";

interface SiteNavClientProps {
  routes: AppRoute[];
}

export function SiteNavClient({ routes }: SiteNavClientProps) {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 p-4">
      <Breadcrumbs
        items={createBreadcrumbItems(pathname, routes, t)}
        navLabel={t("navigation.breadcrumbs")}
      />

      <div className="flex flex-wrap items-center justify-end">
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </header>
  );
}
