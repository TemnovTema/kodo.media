export const brandPalette = {
  blue: "#6087C2",
  green: "#5B894B",
  yellow: "#B49F00",
  pink: "#A2649D",
  plum: "#4D434B",
  charcoal: "#1A181D",
  ivory: "#F3EEE8",
} as const;

export const brandAccentSequence = [
  brandPalette.blue,
  brandPalette.green,
  brandPalette.yellow,
  brandPalette.pink,
];

const rubricAccents: Record<string, string> = {
  dispatches: brandPalette.blue,
  "prompt-forensics": brandPalette.pink,
  "builder-notes": brandPalette.yellow,
  "signal-tests": brandPalette.green,
};

const testAccents: Record<string, string> = {
  "vibe-coding-profile": brandPalette.blue,
  "prompt-lint": brandPalette.pink,
  "agent-stack-fit": brandPalette.green,
};

const libraryKindAccents: Record<string, string> = {
  Скилл: brandPalette.blue,
  Шаблон: brandPalette.green,
  Промт: brandPalette.pink,
  Гайд: brandPalette.yellow,
};

export function getAccentByIndex(index: number) {
  return brandAccentSequence[index % brandAccentSequence.length];
}

export function getRubricAccent(slug?: string) {
  if (!slug) {
    return brandPalette.blue;
  }

  return rubricAccents[slug] ?? brandPalette.blue;
}

export function getTestAccent(slug?: string) {
  if (!slug) {
    return brandPalette.green;
  }

  return testAccents[slug] ?? brandPalette.green;
}

export function getLibraryAccent(kind?: string) {
  if (!kind) {
    return brandPalette.blue;
  }

  return libraryKindAccents[kind] ?? brandPalette.blue;
}
