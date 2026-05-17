import assert from "node:assert/strict";
import test from "node:test";

import { buildHeroMetrics, featuredPaths } from "@/lib/home-content";

test("featured paths include aria labels and valid href", () => {
  assert.ok(featuredPaths.length >= 3);
  for (const item of featuredPaths) {
    assert.ok(item.href.startsWith("/"));
    assert.ok(item.ariaLabel.length > 8);
  }
});

test("buildHeroMetrics returns bounded values", () => {
  const metrics = buildHeroMetrics(128);

  assert.equal(metrics.length, 3);
  assert.ok(metrics.every((metric) => metric.value >= 0));
  assert.ok(metrics.every((metric) => metric.value <= 100));
});
