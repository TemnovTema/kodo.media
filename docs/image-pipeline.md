# KODO MEDIA Image Pipeline

## Why the first pass felt weak

The first implementation solved structure, tone, and layout rhythm, but skipped a dedicated image-direction layer.

That created a predictable failure mode:

- empty space was filled with typography instead of visual anchors
- every section depended too heavily on copy to hold attention
- the site had atmosphere but not enough image mass
- the editorial/dev-console language was present in CSS, but not in asset strategy

The fix is not "add random images".

The fix is to add a separate asset pipeline between brand direction and frontend implementation.

---

## Visual system role

For KODO MEDIA, images should behave as:

- editorial anchors
- navigational mood setters
- category identifiers
- analytical overlays
- atmosphere carriers

They should **not** behave as:

- stock illustrations
- cyberpunk filler
- neon AI cliché
- decorative wallpapers with no structural role

---

## Asset map: first production set

### 1. Hero Anchor

- **Role:** primary homepage visual mass
- **Placement:** homepage hero, opposite or behind intro copy
- **Goal:** instantly communicate "serious editorial console about human-agent building"
- **Preferred ratio:** `16:9` or wider
- **Visual language:** dark control-room / signal atlas / design lab
- **Implementation note:** can carry the hero alone; surrounding copy should be reduced once this goes live

### 2. Home Secondary Editorial Plate

- **Role:** second anchor below the hero or inside a featured content block
- **Placement:** homepage, around featured materials / editorial system explanation
- **Goal:** make the home page feel like a publication with a visual world, not a pure typographic manifesto
- **Preferred ratio:** `16:10` or `3:2`
- **Visual language:** layered browser frames, notebooks, printed diagrams, interface fragments

### 3. Prompt Lab Diagrammatic Plate

- **Role:** image for the prompt-lab section and page
- **Placement:** prompt-lab hero or feature block
- **Goal:** make the section feel analytical and tactile, not abstract
- **Preferred ratio:** `16:9`
- **Visual language:** markup sheets, redlines, arrows, brackets, flow diagrams, scoring grids

### 4. Tests Diagnostic Plate

- **Role:** visual anchor for tests and profiles
- **Placement:** tests overview, test detail intro, profile cards
- **Goal:** suggest calibration, profiling, and measured signal
- **Preferred ratio:** `16:9`
- **Visual language:** radar charts, calibration rings, archetype silhouettes, matrix boards

### 5. Cover System Board

- **Role:** source system for article/rubric covers
- **Placement:** used as a reference family, not necessarily as a final single image
- **Goal:** establish a repeatable cover language for rubrics and featured stories
- **Preferred ratio:** board image for reference, then individual derivatives at `4:5`, `3:4`, `16:10`
- **Visual language:** modular editorial covers, red archival tabs, grid fields, monochrome terrain, signal traces

---

## Generated first-pass prompts

These prompts are already validated for the current direction and can be reused or iterated.

### Hero Anchor Prompt

```text
Wide horizontal hero image for a dark editorial website about vibe coding and human-agent product building. Premium developer-media atmosphere, not cyberpunk, not generic AI art, not purple glow. Cinematic charcoal-black control-room mood with tactile screens, node maps, signal traces, grid overlays, red accent lights, subtle terminal-green details, analog grain, scanline texture, industrial editorial composition, strong negative space on one side for website copy overlay. Feels like a serious design magazine meets an advanced software lab. No readable text, no UI labels, no logos, no anime, no robots, no stock-photo people. High-end, restrained, memorable, image-led, implementation-friendly.
```

### Prompt Lab Plate Prompt

```text
Wide horizontal visual anchor for a prompt-lab page on a dark editorial website about vibe coding. Not a UI screenshot, but a refined diagrammatic collage: layered prompt markup sheets, redlined annotations, brackets, arrows, node paths, version stamps, evaluation matrices, terminal fragments, paper overlays, structured grids, subtle green and red signal accents on charcoal-black background. Feels like a premium blend of design critique board, software workflow map, and editorial infographic. Strong empty space for overlay copy, no readable text, no fake lorem ipsum, no logos, no stock-photo people, no purple glow. High-end, restrained, tactile, analytical.
```

### Home Secondary Plate Prompt

```text
Wide horizontal secondary editorial visual for the homepage of a dark online magazine about vibe coding. Premium dark-tech editorial collage with layered browser frames, desk artifacts, printed diagrams, cropped interface fragments, grid sheets, subtle scanner texture, red hazard accents, tiny restrained green signal details, moody charcoal background, strong composition with one dominant image mass and generous negative space. Feels like a serious design publication documenting a software lab. No readable text, no logos, no stock-photo people, no cyberpunk clichés, no purple glow.
```

### Tests Diagnostic Plate Prompt

```text
Wide horizontal visual anchor for the tests page of a dark editorial website about vibe coding. Premium diagnostic image with radar plots, profile matrices, archetype cards, scoring grids, signal bars, circular calibration graphics, red and muted green accents on charcoal-black background, tactile screen glow, restrained lab-instrument mood. Feels analytical, editorial, and product-grade, not gamified. Strong composition, generous negative space for overlay text, no readable text, no logos, no stock photos, no purple AI glow.
```

### Cover System Board Prompt

```text
Wide horizontal cover-system concept image for a dark online magazine about vibe coding. Editorial set of modular article/rubric cover panels arranged on a charcoal presentation field: varied compositions, abstract signal maps, cropped terminal frames, grid plates, red archival tabs, muted green traces, tactile paper inserts, monochrome textures, premium magazine-cover discipline. Feels like a reusable family of covers for categories such as dispatches, prompt forensics, builder notes, and signal tests. No readable text, no logos, no generic stock imagery, no purple glow. Sophisticated, system-driven, memorable.
```

---

## Implementation order

### Phase 1

- put the hero anchor on the homepage
- put the secondary editorial plate below the fold on the homepage
- put the prompt-lab plate into the prompt-lab page hero
- put the tests diagnostic plate into the tests page hero

This alone will remove the "too much typography" feeling.

### Phase 2

- derive 4 rubric covers from the cover-system board
- attach visual covers to featured article cards and rubric cards
- reduce supporting copy where the image now carries attention

### Phase 3

- add section-specific crops / alternate plates
- introduce subtle parallax / fade-ins on image blocks
- keep motion slow and structural, never flashy

---

## Rules for future image generation

- never generate one giant all-page composition for this site
- generate one asset per role
- prefer dark editorial still-life / diagram / lab imagery over generic product mockups
- no readable text inside the image
- no purple-blue AI gradient language
- no generic robot or human portraits
- no random neon terminals as filler
- every image must leave intentional negative space for overlay content

---

## What changes in the code after assets exist

Once assets are exported into the repo:

- homepage hero typography can be reduced by roughly `20–30%`
- the second home block can move from text-first to image-first
- prompt-lab and tests pages can open with a stronger visual plateau instead of pure headline density
- article/rubric cards can gain visual hierarchy without changing the current color or type system
