"use client";

import dynamic from "next/dynamic";

import HomeHero from "@/components/home/HomeHero";
import PathCards from "@/components/home/PathCards";
import { buildHeroMetrics, featuredPaths } from "@/lib/home-content";

const OrbitVisual = dynamic(() => import("@/components/home/OrbitVisual"), {
  ssr: false,
});

export default function Home() {
  const metrics = buildHeroMetrics(132);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-text-primary">
      <OrbitVisual />
      <HomeHero metrics={metrics} />
      <PathCards items={featuredPaths} />
    </main>
  );
}
