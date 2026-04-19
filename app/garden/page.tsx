import Link from "next/link";

import { getAllGardenPosts } from "@/lib/mdx";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

export default async function GardenPage() {
  const posts = await getAllGardenPosts();

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10 sm:py-24 lg:py-28">
        <header className="mb-12 border-b border-zinc-200 pb-8 sm:mb-16 sm:pb-10">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
            Digital Garden
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
            数字花园
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
            这里收录了算法记录、前端笔记与其他慢慢长出来的想法。
          </p>
        </header>

        <section className="grid gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/garden/${post.slug}`}
              aria-label={`Read ${post.title}`}
              className="group rounded-sm border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-sm"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-medium tracking-tight text-zinc-950 group-hover:text-zinc-900">
                      {post.title}
                    </h2>
                    <p className="max-w-2xl text-sm leading-7 text-zinc-600 group-hover:text-zinc-700">
                      {post.summary}
                    </p>
                  </div>
                  <time className="text-sm text-zinc-500" dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                </div>
                <div className="space-y-2">
                  {post.tags?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={`${post.slug}-${tag}`}
                          className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs text-zinc-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
