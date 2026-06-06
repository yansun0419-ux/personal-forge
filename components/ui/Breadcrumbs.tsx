import Link from "next/link";

import type { BreadcrumbItem } from "@/lib/navigation";

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
