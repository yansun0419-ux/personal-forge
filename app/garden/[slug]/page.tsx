import { notFound } from "next/navigation";
import rehypeHighlight from "rehype-highlight";
import { compileMDX } from "next-mdx-remote/rsc";

import { getAllGardenPosts, getGardenPostBySlug } from "@/lib/mdx";
// 引入你的武器库
import { mdxComponents } from "@/components/MDXComponents";

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

  // 1. 声明变量，只在 try 中获取数据
  let post;
  let compiledContent;

  try {
    post = await getGardenPostBySlug(slug);
    const { content } = await compileMDX({
      source: post.content,
      // 把注册表传给解析引擎
      components: mdxComponents,
      options: {
        mdxOptions: {
          rehypePlugins: [rehypeHighlight],
        },
      },
    });
    compiledContent = content;
  } catch {
    // 只有读取不到文件或解析失败时，才会走到这里触发 404
    notFound();
  }

  // 2. 在 try/catch 外部返回 JSX (完美消除报错)
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
          <div className="mt-4 flex flex-wrap items-center gap-2.5 text-sm">
            <time className="text-zinc-500" dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            {post.status ? (
              <span className="text-zinc-700">{post.status}</span>
            ) : null}
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs text-zinc-600"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
            {post.summary}
          </p>
        </header>

        <div className="prose prose-zinc lg:prose-lg mx-auto prose-headings:tracking-tight prose-a:text-zinc-900 prose-strong:text-zinc-900">
          {compiledContent}
        </div>
      </article>
    </main>
  );
}