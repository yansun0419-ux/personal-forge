import Link from "next/link";

import type { FeaturedPath } from "@/lib/home-content";

interface PathCardsProps {
  items: FeaturedPath[];
}

export default function PathCards({ items }: PathCardsProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Main Pathways</p>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((item) => (
          <Link key={item.href} href={item.href} aria-label={item.ariaLabel} className="group rounded-2xl border border-white/10 bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/40">
            <h2 className="text-xl font-semibold group-hover:text-accent">{item.title}</h2>
            <p className="mt-2 text-xs font-semibold uppercase text-accent/80">{item.subtitle}</p>
            <p className="mt-4 text-sm leading-7 text-text-secondary">{item.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
