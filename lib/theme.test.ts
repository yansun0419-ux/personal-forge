import assert from "node:assert/strict";
import test from "node:test";

import { getNextThemeMode, themeModes } from "./theme.ts";

test("defines the supported theme modes", () => {
  assert.deepEqual(themeModes, ["day", "night"]);
});

test("toggles between day and night modes", () => {
  assert.equal(getNextThemeMode("day"), "night");
  assert.equal(getNextThemeMode("night"), "day");
});
