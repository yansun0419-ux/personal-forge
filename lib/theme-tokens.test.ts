import assert from "node:assert/strict";
import test from "node:test";

import { themeTokens } from "./theme-tokens.ts";

const hexColorPattern = /^#[0-9A-F]{6}$/u;

test("theme tokens expose three-step scales for every role", () => {
  for (const theme of Object.values(themeTokens)) {
    assert.deepEqual(Object.keys(theme.accent), ["primary", "secondary", "tertiary"]);
    assert.deepEqual(Object.keys(theme.background), ["primary", "secondary", "tertiary"]);
    assert.deepEqual(Object.keys(theme.text), ["primary", "secondary", "tertiary"]);
  }
});

test("theme token values are stable uppercase hex colors", () => {
  for (const theme of Object.values(themeTokens)) {
    for (const scale of Object.values(theme)) {
      for (const value of Object.values(scale)) {
        assert.match(value, hexColorPattern);
      }
    }
  }
});
