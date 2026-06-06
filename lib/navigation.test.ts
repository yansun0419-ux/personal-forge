import assert from "node:assert/strict";
import test from "node:test";

import { createTranslator } from "./i18n.ts";
import { createBreadcrumbItems } from "./navigation.ts";

const routes = [{ href: "/" }, { href: "/colors" }];

test("creates a home-only breadcrumb for the root path", () => {
  assert.deepEqual(createBreadcrumbItems("/", routes, createTranslator("zh")), [
    {
      href: "/",
      label: "主页",
    },
  ]);
});

test("creates localized breadcrumb levels from route segments", () => {
  assert.deepEqual(
    createBreadcrumbItems("/colors", routes, createTranslator("en")),
    [
      {
        href: "/",
        label: "Home",
      },
      {
        href: "/colors",
        label: "Color Study",
      },
    ],
  );
});

test("only includes clickable route levels", () => {
  assert.deepEqual(
    createBreadcrumbItems(
      "/notes/bug-beasts",
      [{ href: "/" }, { href: "/notes/bug-beasts" }],
      createTranslator("en"),
    ),
    [
      {
        href: "/",
        label: "Home",
      },
      {
        href: "/notes/bug-beasts",
        label: "bug beasts",
      },
    ],
  );
});

test("uses fallback labels for routable unknown segments", () => {
  assert.deepEqual(
    createBreadcrumbItems(
      "/notes",
      [{ href: "/" }, { href: "/notes" }],
      createTranslator("en"),
    ),
    [
      {
        href: "/",
        label: "Home",
      },
      {
        href: "/notes",
        label: "notes",
      },
    ],
  );
});
