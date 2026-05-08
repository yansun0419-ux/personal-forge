import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

const gardenDirectory = path.join(process.cwd(), "content", "garden");

export interface GardenPostFrontmatter {
  title: string;
  date?: string;
  summary: string;
  tags?: string[];
  status?: string;
}

export interface GardenPostListItem extends GardenPostFrontmatter {
  slug: string;
}

export interface GardenPost extends GardenPostListItem {
  content: string;
}

function normalizeDate(date: string | Date | undefined) {
  if (!date) {
    return undefined;
  }

  return date instanceof Date ? date.toISOString() : date;
}

function normalizeTags(tags: unknown): string[] | undefined {
  if (Array.isArray(tags)) {
    const normalized = tags
      .filter((tag): tag is string => typeof tag === "string")
      .map((tag) => tag.trim())
      .filter(Boolean);

    return normalized.length > 0 ? normalized : undefined;
  }

  if (typeof tags === "string") {
    const normalized = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    return normalized.length > 0 ? normalized : undefined;
  }

  return undefined;
}

function normalizeStatus(status: unknown): string | undefined {
  if (typeof status !== "string") {
    return undefined;
  }

  const normalized = status.trim();
  return normalized.length > 0 ? normalized : undefined;
}

export async function getAllGardenPosts(): Promise<GardenPostListItem[]> {
  const fileNames = await fs.readdir(gardenDirectory);
  const posts = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, "");
        const fullPath = path.join(gardenDirectory, fileName);
        const fileContents = await fs.readFile(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
          slug,
          title: String(data.title ?? slug),
          date: normalizeDate(data.date ?? ""),
          summary: String(data.summary ?? ""),
          tags: normalizeTags(data.tags),
          status: normalizeStatus(data.status),
        } satisfies GardenPostListItem;
      }),
  );

  return posts.sort(
    (left, right) =>
      (right.date ? new Date(right.date).getTime() : 0) -
      (left.date ? new Date(left.date).getTime() : 0),
  );
}

export async function getGardenPostBySlug(slug: string): Promise<GardenPost> {
  const fullPath = path.join(gardenDirectory, `${slug}.mdx`);
  const fileContents = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: String(data.title ?? slug),
    date: normalizeDate(data.date ?? ""),
    summary: String(data.summary ?? ""),
    tags: normalizeTags(data.tags),
    status: normalizeStatus(data.status),
    content,
  };
}
