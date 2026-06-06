import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { getAppRoutes } from "./app-routes.ts";

test("collects public routes from app page files", () => {
  const appDirectory = mkdtempSync(join(tmpdir(), "personal-forge-app-"));

  writeFileSync(join(appDirectory, "page.tsx"), "export default function Page() {}");
  mkdirSync(join(appDirectory, "colors"));
  writeFileSync(
    join(appDirectory, "colors", "page.tsx"),
    "export default function Page() {}",
  );
  mkdirSync(join(appDirectory, "(studio)"));
  mkdirSync(join(appDirectory, "(studio)", "notes"));
  writeFileSync(
    join(appDirectory, "(studio)", "notes", "page.tsx"),
    "export default function Page() {}",
  );
  mkdirSync(join(appDirectory, "_components"));
  writeFileSync(
    join(appDirectory, "_components", "page.tsx"),
    "export default function Page() {}",
  );

  assert.deepEqual(getAppRoutes(appDirectory), [
    { href: "/" },
    { href: "/colors" },
    { href: "/notes" },
  ]);
});
