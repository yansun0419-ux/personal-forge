import Link from "next/link";

import type { BreadcrumbItem } from "@/lib/navigation";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="面包屑导航" className="text-sm text-text-tertiary">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li className="flex items-center gap-2" key={item.href}>
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {isLast ? (
                <span aria-current="page" className="text-text-secondary">
                  {item.label}
                </span>
              ) : (
                <Link
                  aria-label={`前往${item.label}`}
                  className="transition hover:text-brand-primary"
                  href={item.href}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
