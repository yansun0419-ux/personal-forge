import type { TranslationKey } from "./i18n.ts";

export interface BreadcrumbItem {
  href: string;
  label: string;
}

export interface AppRoute {
  href: string;
}

type Translate = (key: TranslationKey) => string;

const routeLabelKeys: Record<string, TranslationKey> = {
  "/": "navigation.home",
  "/colors": "navigation.colors",
};

const toFallbackLabel = (segment: string) =>
  decodeURIComponent(segment).replaceAll("-", " ");

function normalizePathname(pathname: string) {
  const normalized = pathname.split(/[?#]/)[0] || "/";
  const withoutTrailingSlash =
    normalized.length > 1 ? normalized.replace(/\/+$/, "") : normalized;

  return withoutTrailingSlash.startsWith("/")
    ? withoutTrailingSlash
    : `/${withoutTrailingSlash}`;
}

function toRouteSet(routes: AppRoute[]) {
  return new Set(routes.map((route) => normalizePathname(route.href)));
}

export function createBreadcrumbItems(
  pathname: string,
  routes: AppRoute[],
  t: Translate,
): BreadcrumbItem[] {
  const normalizedPathname = normalizePathname(pathname);
  const routeSet = toRouteSet(routes);
  const segments = normalizedPathname.split("/").filter(Boolean);
  const items = [
    {
      href: "/",
      label: t("navigation.home"),
    },
    ...segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      const labelKey = routeLabelKeys[href];

      return {
        href,
        label: labelKey === undefined ? toFallbackLabel(segment) : t(labelKey),
      };
    }),
  ];

  return items.filter(
    (item) =>
      item.href === "/" ||
      item.href === normalizedPathname ||
      routeSet.has(item.href),
  );
}
