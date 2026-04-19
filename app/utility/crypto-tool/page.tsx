import CryptoTool from "@/components/utility/CryptoTool";

export default function CryptoToolPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <header className="mb-12 border-b border-zinc-200 pb-8 sm:mb-16 sm:pb-10">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
            Utility / Encryption
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            AES Text Forge
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
            Encrypt and decrypt text with a password-derived key in a clean,
            focused workspace.
          </p>
        </header>

        <CryptoTool />
      </div>
    </main>
  );
}
