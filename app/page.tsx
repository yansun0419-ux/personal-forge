import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col px-6 py-16 sm:px-10 sm:py-24 lg:py-32">
        <header className="mb-16 sm:mb-24">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-zinc-500">
            Personal Forge
          </p>
        </header>

        <section className="max-w-3xl space-y-6 sm:space-y-8">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
            我的锻造哲学
          </h1>
          <p className="text-base leading-8 text-zinc-700 sm:text-lg sm:leading-9">
            我们都向往小说里“一朝顿悟”的瞬间，却常常忽略了那些“十年磨一剑”的平常日夜。我们沉迷于游戏“升级”的快感，却忘记了“修炼”过程本身的枯燥。我相信，真正的“神兵”（卓越的作品）不是靠灵感凭空诞生的，而是用一行行代码、一次次调试，在无数个“平常”的锻造过程中打磨出来的。AI
            可以“拼凑”，但“匠心”必须“修炼”。这个网站就是我的“修炼日志”。我在这里重铸根基、清剿“Bug兽兵”、并尝试锻造属于我的“神兵”。我不畏惧过程的平淡，因为我知道，这是通往“不凡”的唯一路径。
          </p>
        </section>

        <section className="mt-20 max-w-3xl space-y-6 border-t border-zinc-200 pt-12 sm:mt-28 sm:space-y-8 sm:pt-16">
          <h2 className="text-2xl font-medium tracking-tight text-zinc-900 sm:text-4xl">
            My Philosophy
          </h2>
          <p className="text-base leading-8 text-zinc-600 sm:text-lg sm:leading-9">
            We celebrate the &apos;flash of inspiration&apos; but often overlook
            the &apos;daily grind.&apos; We see the &apos;level-up&apos; in the
            game, but not the hours of mundane practice it took to get there. I
            believe great work isn&apos;t born of genius; it is forged.
            It&apos;s built from countless lines of code, relentless debugging,
            and a deep commitment to the craft. AI can assemble, but
            craftsmanship must be cultivated. This website is my forge.
            It&apos;s my logbook for rebuilding my foundation, hunting down
            &apos;bugs&apos; (the monsters), and attempting to craft my own
            &apos;divine weapons&apos; (exceptional projects). I don&apos;t fear
            the process. I embrace it as the only path to mastery.
          </p>
        </section>

        <section className="mt-24 max-w-3xl space-y-6 sm:mt-32 sm:space-y-8">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
            Featured Entry Points
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Link href="/garden" aria-label="Open the digital garden">
              <div className="group h-full rounded-sm border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-zinc-50 hover:shadow-sm cursor-pointer">
                <h3 className="text-lg font-medium tracking-tight text-zinc-900 group-hover:text-zinc-950">
                  Digital Garden
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 group-hover:text-zinc-600">
                  数字花园
                </p>
                <p className="mt-4 text-sm leading-7 text-zinc-600 group-hover:text-zinc-700">
                  A quiet archive for notes, experiments, and long-form
                  thinking.
                </p>
                <p className="mt-2 text-sm leading-7 text-zinc-500 group-hover:text-zinc-600">
                  记录算法、前端与日常锻造的沉淀空间。
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-zinc-700 group-hover:text-zinc-900">
                  <span>Open</span>
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>

            <Link
              href="/utility/crypto-tool"
              aria-label="Open the encryption tool"
            >
              <div className="group rounded-sm border border-zinc-200 bg-white p-6 transition-all duration-300 hover:border-zinc-400 hover:bg-zinc-50 hover:shadow-sm hover:-translate-y-0.5 cursor-pointer">
                <h3 className="text-lg font-medium tracking-tight text-zinc-900 group-hover:text-zinc-950">
                  Crypto Utility
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 group-hover:text-zinc-600">
                  加密小工具
                </p>
                <p className="mt-4 text-sm leading-7 text-zinc-600 group-hover:text-zinc-700">
                  A secure AES-256-CBC encryption tool for safe data forging.
                </p>
                <p className="mt-2 text-sm leading-7 text-zinc-500 group-hover:text-zinc-600">
                  基于高强度算法的加解密实验原型。
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-zinc-700 group-hover:text-zinc-900">
                  <span>Open</span>
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
