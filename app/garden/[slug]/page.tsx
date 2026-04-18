import { notFound } from "next/navigation";
import rehypeHighlight from "rehype-highlight";
import { compileMDX } from "next-mdx-remote/rsc";

import { getAllGardenPosts, getGardenPostBySlug } from "@/lib/mdx";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export async function generateStaticParams() {
  const posts = await getAllGardenPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function GardenPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const post = await getGardenPostBySlug(slug);
    const { content } = await compileMDX({
      source: post.content,
      options: {
        mdxOptions: {
          rehypePlugins: [rehypeHighlight],
        },
      },
    });

    return (
      <main className="min-h-screen bg-zinc-50 text-zinc-900">
        <article className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10 sm:py-24 lg:py-28">
          <header className="mb-10 border-b border-zinc-200 pb-8 sm:mb-14 sm:pb-10">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
              Digital Garden
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-3 text-sm text-zinc-500 sm:text-base">
              {formatDate(post.date)}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
              {post.summary}
            </p>
          </header>

          <div className="prose prose-zinc lg:prose-lg mx-auto prose-headings:tracking-tight prose-a:text-zinc-900 prose-strong:text-zinc-900">
            {content}
          </div>
        </article>
      </main>
    );
  } catch {
    notFound();
  }
}
