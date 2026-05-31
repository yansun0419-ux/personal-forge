import assert from "node:assert/strict";
import test from "node:test";

import { themeTokens } from "./theme-tokens.ts";

const cssVariablePattern = /^var\(--[a-z-]+\)$/u;

test("theme tokens expose three-step scales for every role", () => {
  assert.deepEqual(Object.keys(themeTokens.accent), [
    "primary",
    "secondary",
    "tertiary",
  ]);
  assert.deepEqual(Object.keys(themeTokens.background), [
    "primary",
    "secondary",
    "tertiary",
  ]);
  assert.deepEqual(Object.keys(themeTokens.text), [
    "primary",
    "secondary",
    "tertiary",
  ]);
});

test("theme token values point to CSS custom properties", () => {
  for (const scale of Object.values(themeTokens)) {
    for (const value of Object.values(scale)) {
      assert.match(value, cssVariablePattern);
    }
  }
});
