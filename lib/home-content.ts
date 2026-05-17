export interface FeaturedPath {
  title: string;
  subtitle: string;
  href: string;
  summary: string;
  ariaLabel: string;
}

export interface HeroMetric {
  label: string;
  value: number;
  suffix: string;
}

export const featuredPaths: FeaturedPath[] = [
  {
    title: "Digital Garden",
    subtitle: "知识枝叶",
    href: "/garden",
    summary: "Read evergreen notes, experiments, and problem-solving templates.",
    ariaLabel: "Open digital garden notes",
  },
  {
    title: "Crypto Utility",
    subtitle: "加密锻造台",
    href: "/utility/crypto-tool",
    summary: "Use practical encryption and hash helpers for day-to-day work.",
    ariaLabel: "Open crypto utility tools",
  },
  {
    title: "Now Building",
    subtitle: "进行中",
    href: "/garden/hello-world",
    summary: "A transparent log of what I am making and refining this week.",
    ariaLabel: "Open now building update",
  },
];

export function buildHeroMetrics(seed: number): HeroMetric[] {
  const clampedSeed = Math.max(1, Math.min(seed, 300));
  return [
    { label: "Focus", value: Math.min(100, Math.round(clampedSeed * 0.42)), suffix: "%" },
    { label: "Momentum", value: Math.min(100, Math.round(clampedSeed * 0.51)), suffix: "%" },
    { label: "Shipping", value: Math.min(100, Math.round(clampedSeed * 0.63)), suffix: "%" },
  ];
}
