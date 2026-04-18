import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

const gardenDirectory = path.join(process.cwd(), "content", "garden");

export interface GardenPostFrontmatter {
  title: string;
  date: string;
  summary: string;
}

export interface GardenPostListItem extends GardenPostFrontmatter {
  slug: string;
}

export interface GardenPost extends GardenPostListItem {
  content: string;
}

function normalizeDate(date: string | Date) {
  return date instanceof Date ? date.toISOString() : date;
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
        } satisfies GardenPostListItem;
      }),
  );

  return posts.sort(
    (left, right) =>
      new Date(right.date).getTime() - new Date(left.date).getTime(),
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
    content,
  };
}
