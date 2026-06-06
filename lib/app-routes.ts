import { readdirSync } from "node:fs";
import { join } from "node:path";

import type { AppRoute } from "./navigation.ts";

const pageFilePattern = /^page\.(js|jsx|ts|tsx|md|mdx)$/;

function isRouteSegment(directoryName: string) {
  return (
    !directoryName.startsWith("_") &&
    !directoryName.startsWith("@") &&
    !directoryName.startsWith("(.)") &&
    !directoryName.startsWith("(..")
  );
}

function toHref(segments: string[]) {
  const urlSegments = segments.filter(
    (segment) => !segment.startsWith("(") || !segment.endsWith(")"),
  );

  return urlSegments.length === 0 ? "/" : `/${urlSegments.join("/")}`;
}

function collectRoutes(directory: string, segments: string[]): AppRoute[] {
  const entries = readdirSync(directory, { withFileTypes: true });
  const hasPage = entries.some(
    (entry) => entry.isFile() && pageFilePattern.test(entry.name),
  );
  const routes = hasPage ? [{ href: toHref(segments) }] : [];

  for (const entry of entries) {
    if (!entry.isDirectory() || !isRouteSegment(entry.name)) {
      continue;
    }

    routes.push(
      ...collectRoutes(join(directory, entry.name), [...segments, entry.name]),
    );
  }

  return routes;
}

export function getAppRoutes(appDirectory = join(process.cwd(), "app")) {
  return collectRoutes(appDirectory, []).sort((a, b) =>
    a.href.localeCompare(b.href),
  );
}
