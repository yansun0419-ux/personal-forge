export interface BreadcrumbItem {
  href: string;
  label: string;
}

const segmentLabels: Record<string, string> = {
  colors: "确定颜色",
  notes: "修炼日志",
};

const toFallbackLabel = (segment: string) =>
  decodeURIComponent(segment).replaceAll("-", " ");

export function createBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);

  return [
    {
      href: "/",
      label: "主页",
    },
    ...segments.map((segment, index) => ({
      href: `/${segments.slice(0, index + 1).join("/")}`,
      label: segmentLabels[segment] ?? toFallbackLabel(segment),
    })),
  ];
}
