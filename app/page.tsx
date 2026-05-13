"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MouseEvent } from "react";

const particles = [
  { left: "7%", top: "24%", size: 2, opacity: 0.55 },
  { left: "18%", top: "67%", size: 1, opacity: 0.4 },
  { left: "29%", top: "35%", size: 2, opacity: 0.7 },
  { left: "42%", top: "18%", size: 1, opacity: 0.45 },
  { left: "55%", top: "72%", size: 2, opacity: 0.5 },
  { left: "68%", top: "31%", size: 1, opacity: 0.65 },
  { left: "77%", top: "58%", size: 2, opacity: 0.45 },
  { left: "89%", top: "22%", size: 1, opacity: 0.75 },
  { left: "94%", top: "76%", size: 2, opacity: 0.5 },
] as const;

function seededNoise(seed: number) {
  return Math.sin(seed * 999) * 0.5 + Math.sin(seed * 37) * 0.5;
}

function createWaveLine(seed: number, baseY = 318, amplitude = 74) {
  const segmentWidth = 400;
  let previousY = baseY + seededNoise(seed) * amplitude;
  let line = `M -80 ${previousY.toFixed(1)}`;

  for (let index = 0; index < 5; index += 1) {
    const startX = -80 + segmentWidth * index;
    const endX = startX + segmentWidth;
    const nextY = baseY + seededNoise(seed + index + 1) * amplitude;
    const controlOneY =
      previousY + seededNoise(seed + index + 11) * amplitude * 0.85;
    const controlTwoY =
      nextY + seededNoise(seed + index + 21) * amplitude * 0.85;

    line += ` C ${(startX + 120).toFixed(1)} ${controlOneY.toFixed(1)}, ${(
      startX + 280
    ).toFixed(1)} ${controlTwoY.toFixed(1)}, ${endX.toFixed(1)} ${nextY.toFixed(
      1,
    )}`;
    previousY = nextY;
  }

  return line;
}

const waveLines = [
  { seed: 2, baseY: 318, amplitude: 82 },
  { seed: 5, baseY: 272, amplitude: 96 },
  { seed: 9, baseY: 356, amplitude: 88 },
  { seed: 14, baseY: 292, amplitude: 104 },
  { seed: 19, baseY: 340, amplitude: 92 },
].map(({ seed, baseY, amplitude }) => createWaveLine(seed, baseY, amplitude));
const waveFills = waveLines.map((line) => `${line} L 1920 680 L -80 680 Z`);

function HeroSection() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 28 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 28 });
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 520], [0, -72]);
  const ridgeY = useTransform(scrollY, [0, 520], [0, -168]);
  const titleX = useTransform(smoothX, [-1, 1], [-14, 14]);
  const titleMouseY = useTransform(smoothY, [-1, 1], [-8, 8]);
  const ridgeX = useTransform(smoothX, [-1, 1], [22, -22]);
  const ridgeMouseY = useTransform(smoothY, [-1, 1], [16, -16]);
  const titleLayerY = useTransform<number, number>(
    [titleY, titleMouseY],
    ([scrollOffset, mouseOffset]) => scrollOffset + mouseOffset,
  );
  const ridgeLayerY = useTransform<number, number>(
    [ridgeY, ridgeMouseY],
    ([scrollOffset, mouseOffset]) => scrollOffset + mouseOffset,
  );
  const ridgeRelativeX = useTransform<number, number>(
    [ridgeX, titleX],
    ([ridgeOffset, titleOffset]) => ridgeOffset - titleOffset,
  );
  const ridgeRelativeY = useTransform<number, number>(
    [ridgeLayerY, titleLayerY],
    ([ridgeOffset, titleOffset]) => ridgeOffset - titleOffset,
  );
  const particlesX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const particlesY = useTransform(smoothY, [-1, 1], [-6, 6]);

  function handlePointerMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      onMouseMove={handlePointerMove}
      className="relative isolate flex min-h-[76vh] overflow-hidden bg-[#111111] px-6 sm:min-h-[82vh] sm:px-10"
    >
      <motion.div
        aria-hidden="true"
        style={{ x: particlesX, y: particlesY }}
        className="absolute inset-0 z-0"
      >
        {particles.map((particle) => (
          <span
            key={`${particle.left}-${particle.top}`}
            className="absolute rounded-full bg-[#deff9a] shadow-[0_0_14px_rgba(222,255,154,0.7)]"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center">
        <motion.svg
          aria-label="Personal Forge"
          role="img"
          style={{ x: titleX, y: titleLayerY }}
          className="h-[clamp(20rem,52vw,38rem)] w-full overflow-visible"
          viewBox="0 0 1440 640"
          preserveAspectRatio="xMinYMid meet"
        >
          <defs>
            <clipPath id="hero-wave-cut" clipPathUnits="userSpaceOnUse">
              <motion.path
                style={{ x: ridgeRelativeX, y: ridgeRelativeY }}
                initial={false}
                animate={{ d: waveFills }}
                transition={{
                  duration: 8,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              />
            </clipPath>
          </defs>

          <g className="[font-family:var(--font-urbanist)] text-[188px] font-black uppercase leading-none">
            <text x="0" y="238" fill="#f5f5f5">
              Personal
            </text>
            <text x="0" y="420" fill="#f5f5f5">
              Forge
            </text>
          </g>

          <motion.g style={{ x: ridgeRelativeX, y: ridgeRelativeY }}>
            <motion.path
              initial={false}
              animate={{ d: waveFills }}
              transition={{
                duration: 8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }}
              fill="#1a1a1a"
              opacity="0.92"
            />
          </motion.g>

          <g
            clipPath="url(#hero-wave-cut)"
            className="[font-family:var(--font-urbanist)] text-[188px] font-black uppercase leading-none"
          >
            <text
              x="0"
              y="238"
              fill="#deff9a"
              filter="drop-shadow(0 0 14px rgba(222,255,154,0.75))"
            >
              Personal
            </text>
            <text
              x="0"
              y="420"
              fill="#deff9a"
              filter="drop-shadow(0 0 14px rgba(222,255,154,0.75))"
            >
              Forge
            </text>
          </g>

          <motion.path
            style={{ x: ridgeRelativeX, y: ridgeRelativeY }}
            initial={false}
            animate={{ d: waveLines }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
            fill="none"
            stroke="#deff9a"
            strokeWidth="2"
            filter="drop-shadow(0 0 8px rgba(222,255,154,0.95))"
          />
        </motion.svg>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-text-primary">
      <HeroSection />
      <div className="mx-auto flex w-full max-w-6xl flex-col px-6 py-16 sm:px-10 sm:py-24 lg:py-28">
        <header className="mb-14 flex items-center justify-between border-b border-white/5 pb-6 sm:mb-20">
          <p className="text-xs font-semibold uppercase text-accent">
            Personal Forge
          </p>
          <Link
            href="/garden"
            aria-label="Open the digital garden"
            className="rounded-full border border-white/10 bg-surface px-4 py-2 text-sm font-medium text-text-secondary shadow-[0_0_24px_rgba(222,255,154,0.08)] transition-all duration-300 hover:border-accent/40 hover:text-accent"
          >
            Garden
          </Link>
        </header>

        <section className="max-w-4xl space-y-7 border-t border-white/5 pt-12 sm:space-y-9">
          <h2 className="text-2xl font-semibold text-text-primary sm:text-4xl">
            My Philosophy
          </h2>
          <p className="max-w-3xl text-base leading-8 text-text-secondary sm:text-lg sm:leading-9">
            We celebrate the &apos;flash of inspiration&apos; but often overlook
            the &apos;daily grind.&apos; We see the &apos;level-up&apos; in the
            game, but not the hours of mundane practice it took to get there. I
            believe great work isn&apos;t born of genius; it is forged.
            It&apos;s built from countless lines of code, relentless debugging,
            and a deep commitment to the craft. AI can assemble, but
            craftsmanship must be cultivated. This website is my forge.
          </p>
        </section>

        <section className="mt-24 space-y-7 sm:mt-32 sm:space-y-9">
          <p className="text-xs font-semibold uppercase text-accent">
            Featured Entry Points
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              ["Digital Garden", "数字花园", "/garden"],
              ["Crypto Utility", "加密小工具", "/utility/crypto-tool"],
            ].map(([title, label, href]) => (
              <Link
                key={href}
                href={href}
                aria-label={`Open ${title}`}
                className="group rounded-lg border border-white/5 bg-surface p-7 shadow-[0_18px_80px_rgba(0,0,0,0.42)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-surface-elevated hover:shadow-[0_20px_90px_rgba(222,255,154,0.08)]"
              >
                <h3 className="text-xl font-semibold text-text-primary group-hover:text-accent">
                  {title}
                </h3>
                <p className="mt-2 text-xs font-semibold uppercase text-accent/80">
                  {label}
                </p>
                <p className="mt-5 text-sm leading-7 text-text-secondary">
                  Open a focused space for notes, tools, and experiments.
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
