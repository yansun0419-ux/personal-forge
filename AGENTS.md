# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Commands

```sh
npm run dev       # dev server (Next.js 16)
npm run build     # production build
npm start         # start production
npm test          # node --experimental-strip-types --test lib/*.test.ts
npm run lint      # ESLint 9 flat config (eslint.config.mjs)
```

- Run `lint` before committing.
- TypeScript 6 requires `--experimental-strip-types` in the test command.

## Testing

- **No Vitest/Jest.** Uses Node.js native test runner (`node:test`, `node:assert/strict`).
- Test files: `lib/*.test.ts` only.

## Architecture

- **Framework:** Next.js 16 App Router, React 19.2.6, TypeScript 6.
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`, `@tailwindcss/typography`). Uses `@theme inline` and custom CSS variables toggled via `data-theme` attribute. Color tokens are semantic roles (accent/bg/text × primary/secondary/tertiary).
- **Path alias:** `@/*` → `./*`.
- **I18n:** Custom bilingual (zh/en) system in `lib/i18n.ts`. Type-safe dot-notation keys (`TranslationKey`). Resolved by priority: `Accept-Language` header → cookie → localStorage. Default: `zh`.
- **Theme:** `next-themes` with `data-theme` attribute (not `class`), storage key `personal-forge-theme`.
- **Routes:** Auto-discovered from `app/` filesystem via `lib/app-routes.ts` (skips `_`, `@`, `(.)`-prefixed dirs). Current routes: `/`, `/colors`.
- **Components** organized under `components/{layout,providers,ui}/`.

## Conventions

- **Git:** Conventional Commits (`feat:`, `fix:`, `chore:`, etc.).
- **Deploy:** Vercel (standard `next build`).
- No comments in code (verified across all source files).
- `"use client"` on every component using browser APIs or hooks.
- i18n keys referenced as typed string literals: `t("home.title")`.
