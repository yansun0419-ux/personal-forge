import Image from "next/image";
import Link from "next/link";

import type { HeroMetric } from "@/lib/home-content";

interface HomeHeroProps {
  metrics: HeroMetric[];
}

export default function HomeHero({ metrics }: HomeHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 px-6 py-24 sm:px-10 sm:py-28">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-14 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Personal Forge</p>
          <h1 className="text-4xl font-black leading-tight sm:text-6xl">Build in public. Ship with rhythm.</h1>
          <p className="text-base leading-8 text-text-secondary sm:text-lg">
            一个更炫、更有节奏感的个人首页：把学习、思考和产品实验融合在一块动态画布里。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/garden" aria-label="Open digital garden" className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-black transition hover:scale-[1.03]">Explore Garden</Link>
            <Link href="/utility/crypto-tool" aria-label="Open crypto tool" className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-text-primary transition hover:border-accent/70">Open Toolbox</Link>
          </div>
        </div>
        <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-surface/80 p-6 shadow-[0_16px_80px_rgba(0,0,0,0.5)] backdrop-blur">
          <Image src="/next.svg" alt="Decorative logo" width={120} height={24} className="opacity-70" />
          <div className="mt-8 grid grid-cols-3 gap-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-white/10 bg-black/25 p-4 text-center">
                <p className="text-xs uppercase tracking-wider text-text-secondary">{metric.label}</p>
                <p className="mt-2 text-2xl font-bold text-accent">{metric.value}{metric.suffix}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
