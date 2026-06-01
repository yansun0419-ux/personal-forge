import assert from "node:assert/strict";
import test from "node:test";

import { createBreadcrumbItems } from "./navigation.ts";

test("creates a home-only breadcrumb for the root path", () => {
  assert.deepEqual(createBreadcrumbItems("/"), [
    {
      href: "/",
      label: "主页",
    },
  ]);
});

test("creates clickable breadcrumb levels from route segments", () => {
  assert.deepEqual(createBreadcrumbItems("/colors"), [
    {
      href: "/",
      label: "主页",
    },
    {
      href: "/colors",
      label: "确定颜色",
    },
  ]);
});

test("uses fallback labels for unknown nested route segments", () => {
  assert.deepEqual(createBreadcrumbItems("/notes/bug-beasts"), [
    {
      href: "/",
      label: "主页",
    },
    {
      href: "/notes",
      label: "修炼日志",
    },
    {
      href: "/notes/bug-beasts",
      label: "bug beasts",
    },
  ]);
});
