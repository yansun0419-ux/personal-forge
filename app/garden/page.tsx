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
    <main className="min-h-screen bg-background text-text-primary">
      <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10 sm:py-24 lg:py-28">
        <header className="mb-12 border-b border-white/5 pb-9 sm:mb-16 sm:pb-12">
          <Link
            href="/"
            aria-label="Back to the homepage"
            className="inline-flex rounded-full border border-white/10 bg-surface px-4 py-2 text-sm font-medium text-text-secondary shadow-[0_0_24px_rgba(222,255,154,0.08)] transition-all duration-300 hover:border-accent/40 hover:text-accent"
          >
            Home
          </Link>
          <p className="mt-10 text-xs font-semibold uppercase text-accent">
            Digital Garden
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-text-primary sm:text-6xl">
            数字花园
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
            这里收录了算法记录、前端笔记与其他慢慢长出来的想法。
          </p>
        </header>

        <section className="grid gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/garden/${post.slug}`}
              aria-label={`Read ${post.title}`}
              className="group rounded-lg border border-white/5 bg-surface p-7 shadow-[0_18px_80px_rgba(0,0,0,0.38)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-surface-elevated hover:shadow-[0_20px_90px_rgba(222,255,154,0.08)]"
            >
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                  <div className="space-y-3">
                    <h2 className="text-2xl font-semibold text-text-primary group-hover:text-accent">
                      {post.title}
                    </h2>
                    <p className="max-w-2xl text-sm leading-7 text-text-secondary">
                      {post.summary}
                    </p>
                  </div>
                  {post.date ? (
                    <time
                      className="shrink-0 text-sm font-medium text-text-secondary/80"
                      dateTime={post.date}
                    >
                      {formatDate(post.date)}
                    </time>
                  ) : null}
                </div>
                <div className="space-y-2">
                  {post.tags?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={`${post.slug}-${tag}`}
                          className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
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
