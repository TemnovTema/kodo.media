# KODO MEDIA

KODO MEDIA is a dark editorial web product about vibe-coding: community posts, curated resources, prompt tooling, and diagnostic tests.

This repository is already in active design/implementation, so the most useful starting points are:

- `/Users/artemtemnov/Documents/kodo media/docs/design-handoff.md` — product context, route map, UI principles, and collaboration rules
- `/Users/artemtemnov/Documents/kodo media/AGENTS.md` — short Codex-specific repo instructions

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Local Fugue font family

## Routes

- `/` — animated KODO entry screen
- `/articles` — community feed
- `/library` — open resource archive
- `/prompt-lab` — prompt drafting workspace
- `/tests` — diagnostic tests archive

Dynamic detail pages also exist for articles, library entries, rubrics, and tests.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Production: [https://kodo-media.vercel.app](https://kodo-media.vercel.app)

## Quality Checks

```bash
npm run lint
npm run build
```

## Important Files

- `src/app/layout.tsx` — app shell, metadata, fonts, header/footer
- `src/app/globals.css` — global tokens and shared layout styles
- `src/lib/brand.ts` — palette and accent helpers
- `src/lib/content.ts` — content models and seeded content
- `src/components/catalog-shell.tsx` — shared intro shell for section pages

## Collaboration

- For design/context handoff, use `docs/design-handoff.md`.
- If you are delegating only one route or one block, create a short section brief from `docs/section-brief-template.md`.
- If another Codex agent joins the project, have them read `AGENTS.md` and `docs/design-handoff.md` before editing.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
