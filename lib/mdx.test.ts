import assert from "node:assert/strict";
import test from "node:test";

import { getAllGardenPosts, getGardenPostBySlug } from "@/lib/mdx";

test("getGardenPostBySlug parses tags and status from frontmatter", async () => {
  const post = await getGardenPostBySlug("hello-world");

  assert.equal(post.status, "🌱 Seedling");
  assert.deepEqual(post.tags, ["数字花园", "MDX", "Tailwind Typography"]);
});

test("getAllGardenPosts includes tags and status in list items", async () => {
  const posts = await getAllGardenPosts();
  const helloWorld = posts.find((post) => post.slug === "hello-world");

  assert.ok(helloWorld);
  assert.equal(helloWorld.status, "🌱 Seedling");
  assert.deepEqual(helloWorld.tags, ["数字花园", "MDX", "Tailwind Typography"]);
});
