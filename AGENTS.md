<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Repo-specific handoff

- Before changing UI, read `/Users/artemtemnov/Documents/kodo media/docs/design-handoff.md`.
- If you are assigned only one page or one block, use `/Users/artemtemnov/Documents/kodo media/docs/section-brief-template.md` to keep scope tight.
- Preserve the current KODO visual language: dark editorial/dev aesthetic, real whitespace, low noise, no generic SaaS patterns.
- Do not replace Fugue fonts, brand palette, or the existing top-level route structure unless explicitly requested.
- Keep pages differentiated by role:
  - `/` is the most expressive entry surface.
  - `/articles`, `/library`, `/prompt-lab`, `/tests` should feel quieter and more systemic.
- Prefer editing existing shared shells/components before introducing parallel patterns.
- After frontend changes, run `npm run lint` and `npm run build`.
