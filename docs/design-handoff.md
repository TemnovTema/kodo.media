# KODO MEDIA Design Handoff

## What This Product Is

KODO MEDIA is an online media product about vibe-coding and agent-driven product building.

The site is not a generic SaaS landing page. It mixes:

- editorial reading surfaces
- community/feed mechanics
- utility tooling
- diagnostic/test flows
- a small amount of expressive brand motion

## Current Route Map

- `/`
  - animated entry hero
  - most expressive/experimental page in the project
- `/articles`
  - community feed
  - pinned article
  - horizontal article shelf
  - author posts
  - merch shelf
- `/library`
  - archive of open resources
  - currently rendered as 4 branded folder cards
- `/prompt-lab`
  - prompt drafting workspace
  - intro + utility editor with quick scenario buttons
- `/tests`
  - diagnostics archive
- detail routes
  - `/articles/[slug]`
  - `/library/[slug]`
  - `/rubrics/[slug]`
  - `/tests/[slug]`

## Visual Direction

### Core tone

- Dark UI
- Editorial/dev environment aesthetic
- Quiet, controlled, low-noise surfaces
- Real whitespace
- Strong typography, but not text-for-the-sake-of-filling-space
- KODO identity over generic “AI dark-tech”

### Brand palette

Defined in `/Users/artemtemnov/Documents/kodo media/src/lib/brand.ts`:

- Blue: `#6087C2`
- Green: `#5B894B`
- Yellow: `#B49F00`
- Pink: `#A2649D`
- Plum: `#4D434B`
- Charcoal: `#1A181D`
- Ivory: `#F3EEE8`

### Fonts

- Fugue regular
- Fugue headline
- Fugue mono

Do not replace them casually. They are part of the current product identity.

## UI Rules

### Keep

- asymmetry where it already exists
- big negative space around entry blocks
- monospaced metadata labels
- bordered, quiet components rather than glossy panels
- route-specific personalities

### Avoid

- generic SaaS layouts
- filling empty space with extra copy
- loud gradients, neon tech aesthetics, purple-on-black clichés
- default icon-library feel
- random new card systems if an existing shell can be extended

## Route-by-Route Intent

### `/`

- expressive
- animated
- symbolic/brand-driven
- allowed to feel slightly more theatrical than the rest

### `/articles`

- should feel alive, but still editorial
- not a dashboard
- shelves and feeds are appropriate
- motion should remain light and meaningful

### `/library`

- should feel like a resource archive
- current metaphor: folders / open archive
- more system, less spectacle

### `/prompt-lab`

- should behave like a tool
- utility-first, but not sterile
- guided writing surface, not a decorative poster

### `/tests`

- should feel diagnostic and structured
- readable, calm, and product-like

## Important Shared Files

- `/Users/artemtemnov/Documents/kodo media/src/app/layout.tsx`
  - shell, metadata, fonts, header/footer
- `/Users/artemtemnov/Documents/kodo media/src/app/globals.css`
  - global tokens, button styles, shells, shelves
- `/Users/artemtemnov/Documents/kodo media/src/lib/brand.ts`
  - palette and accent helpers
- `/Users/artemtemnov/Documents/kodo media/src/lib/content.ts`
  - seeded content and page data
- `/Users/artemtemnov/Documents/kodo media/src/components/catalog-shell.tsx`
  - shared intro block used by section pages

## Working Pattern For Another Codex Agent

1. Read `AGENTS.md`.
2. Read this file.
3. Inspect the specific route and its shared components before editing.
4. Reuse the current shell or interaction pattern where possible.
5. After changes, run:

```bash
npm run lint
npm run build
```

6. If the task is visual, verify the actual route in the browser, not just the code.

## Best Handoff Package

If you are passing the project to another designer who also works in Codex, give them exactly these three things:

1. `/Users/artemtemnov/Documents/kodo media/README.md`
2. `/Users/artemtemnov/Documents/kodo media/AGENTS.md`
3. `/Users/artemtemnov/Documents/kodo media/docs/design-handoff.md`

If they are taking only one route or one block, also give them:

4. `/Users/artemtemnov/Documents/kodo media/docs/section-brief-template.md`

That combination is better than one long README because it separates:

- human project overview
- agent-specific repo rules
- product/UI context
- section-level execution scope

## Suggested Kickoff Prompt For Another Codex Designer

Use this when you hand off a section:

```text
Read /Users/artemtemnov/Documents/kodo media/AGENTS.md and /Users/artemtemnov/Documents/kodo media/docs/design-handoff.md before changing anything.

You are only responsible for: [route or section].
Goal: [what should improve].
Keep: [what must remain].
Do not redesign the entire product.

Preserve KODO's dark editorial/dev aesthetic, real whitespace, Fugue typography, and route-specific personality. Reuse existing shared shells and components where possible. After changes, verify the route in the browser, run npm run lint and npm run build, then summarize the result.
```

## Handoff Notes For Designers In Code

- If you are taking only one section, preserve the surrounding shell and only mutate that section.
- Prefer introducing one strong visual metaphor per page, not many.
- If you add a new motion element, make sure it still looks acceptable in its idle state.
- If you add copy, ask whether the screen really needs more words or whether it needs a visual anchor instead.
- If you add cards in a row, align their bottoms and CTA positions.

## What Is Safe To Extend

- Intro glyphs / illustrations per section
- Card metaphors within a route
- Shelf behavior and spacing
- Utility affordances on tool pages
- Copy hierarchy inside existing route shells

## What Should Be Coordinated Before Large Changes

- global navigation changes
- brand palette changes
- font changes
- replacing the section shell pattern
- changing `/` hero behavior
- changing the overall tone from dark editorial/dev to something else

## Definition Of Done For Delegated Sections

- The section solves the requested problem without spilling into unrelated routes.
- The resulting UI still looks like KODO, not like a new product.
- Typography supports the layout instead of filling empty space.
- If an illustration or motion element is added, it is legible even in idle state.
- Card rows and CTA baselines are aligned.
- The delegated section is ready to hand back with a clear summary and a commit.
