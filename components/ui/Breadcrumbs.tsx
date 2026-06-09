"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useI18n } from "@/components/providers/I18nProvider";
import { createBreadcrumbItems, type BreadcrumbItem } from "@/lib/navigation";
import type { AppRoute } from "@/lib/app-routes";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  navLabel: string;
}

export function Breadcrumbs({ items, navLabel }: BreadcrumbsProps) {
  return (
    <nav aria-label={navLabel}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li className="flex items-center gap-2" key={item.href}>
              {index > 0 ? (
                <span aria-hidden="true" className="text-accent-primary/55">
                  /
                </span>
              ) : null}
              <Link
                aria-current={isLast ? "page" : undefined}
                aria-label={item.label}
                className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-primary"
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

interface SiteNavBreadcrumbsProps {
  routes: AppRoute[];
}

export function SiteNavBreadcrumbs({ routes }: SiteNavBreadcrumbsProps) {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <Breadcrumbs
      items={createBreadcrumbItems(pathname, routes, t)}
      navLabel={t("navigation.breadcrumbs")}
    />
  );
}
