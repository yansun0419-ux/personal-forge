import assert from "node:assert/strict";
import test from "node:test";

import { createTranslator, dictionaries, locales } from "./i18n.ts";

test("exposes zh and en dictionaries", () => {
  assert.deepEqual(locales, ["zh", "en"]);
  assert.equal(typeof dictionaries.zh.common.brand, "string");
  assert.equal(typeof dictionaries.en.common.brand, "string");
});

test("reads nested translation keys with dot notation", () => {
  const t = createTranslator("zh");

  assert.equal(t("home.title"), "把每一个平常日夜，锻成不凡的作品。");
  assert.equal(t("common.colorStudy"), "确定颜色");
});

test("keeps framework copy bilingual", () => {
  const zh = createTranslator("zh");
  const en = createTranslator("en");

  assert.notEqual(zh("home.title"), en("home.title"));
  assert.notEqual(zh("home.philosophyParagraph1"), en("home.philosophyParagraph1"));
});

test("does not include deep article content in the dictionaries", () => {
  assert.equal("articles" in dictionaries.zh, false);
  assert.equal("articles" in dictionaries.en, false);
  assert.equal("digitalGarden" in dictionaries.zh, false);
  assert.equal("digitalGarden" in dictionaries.en, false);
});
