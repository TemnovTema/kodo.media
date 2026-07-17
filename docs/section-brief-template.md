# KODO MEDIA Section Brief Template

Use this when handing one route or one block to another designer/agent instead of the whole product.

## Section

- Route:
- Block:
- Owner:

## Goal

- What should change:
- What should stay the same:
- Why this work is needed:

## Context

- Read first:
  - `/Users/artemtemnov/Documents/kodo media/AGENTS.md`
  - `/Users/artemtemnov/Documents/kodo media/docs/design-handoff.md`
- Relevant files:
  - `src/app/...`
  - `src/components/...`
  - `src/lib/...`

## Must Preserve

- Route personality:
- Shared shell/layout:
- Brand palette / fonts:
- Existing interactions that should not be broken:

## Safe To Change

- Visual metaphor:
- Card system / inner spacing:
- Copy hierarchy:
- Motion / hover states:

## Assets / References

- Brand assets:
- Existing screenshots:
- External references:

## Deliverables

- Files expected to change:
- Browser routes to verify:
- Whether a commit/push is required:

## Acceptance Checklist

- The route still matches KODO's dark editorial/dev identity.
- The page has real whitespace and no filler copy.
- New UI does not introduce generic SaaS patterns.
- Shared navigation/header/footer still feel consistent with adjacent pages.
- `npm run lint` passes.
- `npm run build` passes.

## Copy-Paste Prompt For Codex

```text
You are taking over one section of KODO MEDIA.

Read these files first:
- /Users/artemtemnov/Documents/kodo media/AGENTS.md
- /Users/artemtemnov/Documents/kodo media/docs/design-handoff.md

Your scope for this task:
- Route/block: ...
- Goal: ...
- Must preserve: ...
- Safe to change: ...

Do not redesign the whole product. Preserve the existing shell, spacing philosophy, brand palette, and Fugue typography. Reuse existing components where possible. After changes, run npm run lint and npm run build, then summarize what changed and any residual risks.
```
