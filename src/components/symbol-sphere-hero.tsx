"use client";

import { useEffect, useRef } from "react";

type SymbolSphereHeroProps = {
  className?: string;
  showOverlay?: boolean;
};

type SphereGlyph = {
  accent: string;
  baseX: number;
  baseY: number;
  baseZ: number;
  glyphs: string[];
  phase: number;
};

type PatternPoint = {
  glyph: string;
  x: number;
  y: number;
};

type TargetPoint = {
  accent: string;
  driftX?: number;
  driftY?: number;
  glyph: string;
  phase?: number;
  size: number;
  x: number;
  y: number;
};

type MorphShape = "kodo" | "mask" | "samurai" | "sakura" | "fuji";

type MorphMode = "sphere" | MorphShape;

type PointerState = {
  active: boolean;
  x: number;
  y: number;
};

const GLYPH_GROUPS = [
  ["[", "]", "{", "}", "(", ")", "<", ">"],
  ["0", "1", "2", "3", "4", "5", "6"],
  ["+", "-", "=", "|", ":", "."],
  ["K", "O", "D", "O", "/", "\\"],
];

const ACCENTS = ["#6087C2", "#5B894B", "#B49F00", "#A2649D"];
const GLYPH_COUNT = 112;
const POINT_FILL = "rgba(243, 238, 232, 0.92)";
const POINT_FILL_RGB = { r: 243, g: 238, b: 232 };
const SHAPE_CYCLE: MorphShape[] = ["kodo", "fuji", "sakura", "mask", "samurai"];

function rotateX(x: number, y: number, z: number, angle: number) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  return {
    x,
    y: y * cos - z * sin,
    z: y * sin + z * cos,
  };
}

function rotateY(x: number, y: number, z: number, angle: number) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  return {
    x: x * cos + z * sin,
    y,
    z: -x * sin + z * cos,
  };
}

function lerp(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");

  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

function mixAccentWithFill(hex: string, intensity: number, alpha = 1) {
  const rgb = hexToRgb(hex);

  return `rgba(${Math.round(lerp(POINT_FILL_RGB.r, rgb.r, intensity))}, ${Math.round(
    lerp(POINT_FILL_RGB.g, rgb.g, intensity),
  )}, ${Math.round(lerp(POINT_FILL_RGB.b, rgb.b, intensity))}, ${alpha})`;
}

function sampleSegment(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  steps: number,
  glyph: string,
) {
  return Array.from({ length: steps }, (_, index) => {
    const progress = steps === 1 ? 0 : index / (steps - 1);

    return {
      glyph,
      x: lerp(startX, endX, progress),
      y: lerp(startY, endY, progress),
    } satisfies PatternPoint;
  });
}

function sampleArc(
  centerX: number,
  centerY: number,
  radiusX: number,
  radiusY: number,
  startAngle: number,
  endAngle: number,
  steps: number,
  glyphForAngle: (angle: number) => string,
) {
  return Array.from({ length: steps }, (_, index) => {
    const progress = steps === 1 ? 0 : index / (steps - 1);
    const angle = lerp(startAngle, endAngle, progress);

    return {
      glyph: glyphForAngle(angle),
      x: centerX + Math.cos(angle) * radiusX,
      y: centerY + Math.sin(angle) * radiusY,
    } satisfies PatternPoint;
  });
}

function buildSphereGlyphs() {
  return Array.from({ length: GLYPH_COUNT }, (_, index) => {
    const offset = 2 / GLYPH_COUNT;
    const y = index * offset - 1 + offset / 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = index * Math.PI * (3 - Math.sqrt(5));
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    const group = GLYPH_GROUPS[index % GLYPH_GROUPS.length];

    return {
      baseX: x,
      baseY: y,
      baseZ: z,
      glyphs: group,
      accent: ACCENTS[index % ACCENTS.length],
      phase: index * 0.17,
    } satisfies SphereGlyph;
  });
}

function buildKodoTargets(centerX: number, centerY: number, scale: number) {
  const marks = [
    {
      accent: "#A2649D",
      pattern: [
        ...sampleSegment(-0.16, -0.48, -0.16, 0.48, 14, "]"),
        ...sampleSegment(0.16, -0.48, -0.16, 0, 7, "<"),
        ...sampleSegment(0.16, 0.48, -0.16, 0, 7, "<"),
      ],
    },
    {
      accent: "#6087C2",
      pattern: [
        ...sampleSegment(-0.18, -0.48, -0.18, 0.48, 14, "["),
        ...sampleSegment(0.18, -0.48, 0.18, 0.48, 14, "]"),
      ],
    },
    {
      accent: "#5B894B",
      pattern: [
        ...sampleSegment(-0.18, -0.48, -0.18, 0.48, 14, "|"),
        ...sampleSegment(-0.12, -0.48, 0.18, 0, 7, ">"),
        ...sampleSegment(-0.12, 0.48, 0.18, 0, 7, ">"),
      ],
    },
    {
      accent: "#B49F00",
      pattern: [
        ...sampleSegment(-0.18, -0.48, -0.18, 0.48, 14, "["),
        ...sampleSegment(0.18, -0.48, 0.18, 0.48, 14, "]"),
      ],
    },
  ] as const;

  const markSpan = scale * 0.82;
  const markGap = scale * 0.24;
  const totalWidth = markSpan * marks.length + markGap * (marks.length - 1);
  const startCenterX = centerX - totalWidth / 2 + markSpan / 2;
  const targets: TargetPoint[] = [];

  marks.forEach((mark, index) => {
    const markCenterX = startCenterX + index * (markSpan + markGap);

    mark.pattern.forEach((point) => {
      targets.push({
        accent: mark.accent,
        driftX: point.glyph === "<" ? -1.8 : point.glyph === ">" ? 1.8 : 0,
        driftY: point.glyph === "[" || point.glyph === "]" || point.glyph === "|" ? 3.8 : 2.4,
        glyph: point.glyph,
        phase: index * 0.9 + targets.length * 0.17,
        size: scale * 0.26,
        x: markCenterX + point.x * scale,
        y: centerY + point.y * scale,
      });
    });
  });

  return targets.slice(0, GLYPH_COUNT);
}

function buildAnonymousMaskTargets(centerX: number, centerY: number, scale: number) {
  const features = [
    {
      accent: "#A2649D",
      driftX: -1.8,
      driftY: 2.8,
      pattern: [
        ...sampleSegment(-0.36, -0.4, -0.28, 0.16, 8, "("),
        ...sampleSegment(-0.28, 0.16, -0.08, 0.5, 6, "/"),
      ],
    },
    {
      accent: "#B49F00",
      driftX: 1.8,
      driftY: 2.8,
      pattern: [
        ...sampleSegment(0.36, -0.4, 0.28, 0.16, 8, ")"),
        ...sampleSegment(0.28, 0.16, 0.08, 0.5, 6, "\\"),
      ],
    },
    {
      accent: "#6087C2",
      driftX: -0.6,
      driftY: -1.8,
      pattern: sampleSegment(-0.28, -0.16, -0.06, -0.24, 10, "/"),
    },
    {
      accent: "#5B894B",
      driftX: 0.6,
      driftY: -1.8,
      pattern: sampleSegment(0.06, -0.24, 0.28, -0.16, 10, "\\"),
    },
    {
      accent: "#6087C2",
      driftX: -1.2,
      driftY: -0.8,
      pattern: [
        ...sampleSegment(-0.24, -0.02, -0.15, -0.09, 4, "/"),
        ...sampleSegment(-0.15, -0.09, -0.06, -0.02, 4, "\\"),
      ],
    },
    {
      accent: "#5B894B",
      driftX: 1.2,
      driftY: -0.8,
      pattern: [
        ...sampleSegment(0.06, -0.02, 0.15, -0.09, 4, "/"),
        ...sampleSegment(0.15, -0.09, 0.24, -0.02, 4, "\\"),
      ],
    },
    {
      accent: "#A2649D",
      driftX: 0,
      driftY: 1.4,
      pattern: [
        ...sampleSegment(0, -0.02, 0, 0.14, 4, "|"),
        ...sampleSegment(0, 0.14, -0.07, 0.22, 2, "/"),
        ...sampleSegment(0, 0.14, 0.07, 0.22, 2, "\\"),
      ],
    },
    {
      accent: "#B49F00",
      driftX: -0.8,
      driftY: 1.6,
      pattern: sampleSegment(-0.02, 0.18, -0.22, 0.09, 8, "/"),
    },
    {
      accent: "#A2649D",
      driftX: 0.8,
      driftY: 1.6,
      pattern: sampleSegment(0.02, 0.18, 0.22, 0.09, 8, "\\"),
    },
    {
      accent: "#6087C2",
      driftX: -0.5,
      driftY: 0.9,
      pattern: sampleSegment(-0.18, 0.24, -0.03, 0.2, 6, "\\"),
    },
    {
      accent: "#5B894B",
      driftX: 0.5,
      driftY: 0.9,
      pattern: sampleSegment(0.03, 0.2, 0.18, 0.24, 6, "/"),
    },
    {
      accent: "#B49F00",
      driftX: 0,
      driftY: 1.8,
      pattern: sampleArc(0, 0.28, 0.18, 0.08, Math.PI * 0.15, Math.PI * 0.85, 12, () => "_"),
    },
  ] as const;

  const targets: TargetPoint[] = [];

  features.forEach((feature, featureIndex) => {
    feature.pattern.forEach((point) => {
      targets.push({
        accent: feature.accent,
        driftX: feature.driftX,
        driftY: feature.driftY,
        glyph: point.glyph,
        phase: featureIndex * 0.72 + targets.length * 0.09,
        size: scale * 0.28,
        x: centerX + point.x * scale,
        y: centerY + point.y * scale,
      });
    });
  });

  return targets.slice(0, GLYPH_COUNT);
}

function buildSamuraiTargets(centerX: number, centerY: number, scale: number) {
  const features = [
    {
      accent: "#6087C2",
      driftX: -0.006,
      driftY: 0.008,
      pattern: [
        ...sampleSegment(-0.36, -0.48, -0.16, -0.18, 5, "\\"),
        ...sampleSegment(-0.32, -0.48, -0.12, -0.18, 5, "\\"),
      ],
    },
    {
      accent: POINT_FILL,
      driftX: -0.004,
      driftY: 0.006,
      pattern: [
        ...sampleSegment(-0.3, -0.4, -0.23, -0.3, 2, "/"),
        ...sampleSegment(-0.23, -0.3, -0.16, -0.2, 2, "/"),
      ],
    },
    {
      accent: "#5B894B",
      driftX: -0.006,
      driftY: 0.008,
      pattern: [
        ...sampleSegment(-0.15, -0.15, -0.02, -0.15, 3, "_"),
        ...sampleSegment(-0.08, -0.21, -0.08, -0.09, 3, "|"),
      ],
    },
    {
      accent: "#6087C2",
      driftX: 0.006,
      driftY: 0.003,
      pattern: [
        ...sampleSegment(-0.07, -0.08, 0.29, 0.47, 9, "\\"),
      ],
    },
    {
      accent: POINT_FILL,
      driftX: 0.004,
      driftY: 0.002,
      pattern: [
        ...sampleSegment(-0.03, -0.1, 0.33, 0.43, 9, "\\"),
      ],
    },
    {
      accent: POINT_FILL,
      driftX: 0.004,
      driftY: 0.002,
      pattern: [
        ...sampleSegment(0.28, 0.46, 0.34, 0.39, 2, "/"),
      ],
    },
    {
      accent: "#B49F00",
      driftX: 0.006,
      driftY: 0.008,
      pattern: [
        ...sampleSegment(0.36, -0.48, 0.16, -0.18, 5, "/"),
        ...sampleSegment(0.32, -0.48, 0.12, -0.18, 5, "/"),
      ],
    },
    {
      accent: POINT_FILL,
      driftX: -0.004,
      driftY: 0.006,
      pattern: [
        ...sampleSegment(0.3, -0.4, 0.23, -0.3, 2, "\\"),
        ...sampleSegment(0.23, -0.3, 0.16, -0.2, 2, "\\"),
      ],
    },
    {
      accent: "#A2649D",
      driftX: 0.006,
      driftY: 0.008,
      pattern: [
        ...sampleSegment(0.02, -0.15, 0.15, -0.15, 3, "_"),
        ...sampleSegment(0.08, -0.21, 0.08, -0.09, 3, "|"),
      ],
    },
    {
      accent: "#B49F00",
      driftX: 0.006,
      driftY: 0.003,
      pattern: [
        ...sampleSegment(0.07, -0.08, -0.29, 0.47, 9, "/"),
      ],
    },
    {
      accent: POINT_FILL,
      driftX: 0.004,
      driftY: 0.002,
      pattern: [
        ...sampleSegment(0.03, -0.1, -0.33, 0.43, 9, "/"),
      ],
    },
    {
      accent: POINT_FILL,
      driftX: 0.004,
      driftY: 0.002,
      pattern: [
        ...sampleSegment(-0.28, 0.46, -0.34, 0.39, 2, "\\"),
      ],
    },
  ] as const;

  const targets: TargetPoint[] = [];

  features.forEach((feature, featureIndex) => {
    feature.pattern.forEach((point) => {
      targets.push({
        accent: feature.accent,
        driftX: feature.driftX,
        driftY: feature.driftY,
        glyph: point.glyph,
        phase: featureIndex * 0.8 + targets.length * 0.11,
        size: scale * 0.26,
        x: centerX + point.x * scale,
        y: centerY + point.y * scale,
      });
    });
  });

  return targets.slice(0, GLYPH_COUNT);
}

function buildSakuraTargets(centerX: number, centerY: number, scale: number) {
  const petals = [
    {
      accent: "#A2649D",
      driftX: -1.1,
      driftY: -1.8,
      pattern: sampleArc(-0.2, -0.1, 0.14, 0.12, 0, Math.PI * 2, 12, () => "0"),
    },
    {
      accent: "#A2649D",
      driftX: 0,
      driftY: -2.2,
      pattern: sampleArc(0, -0.22, 0.16, 0.14, 0, Math.PI * 2, 14, () => "0"),
    },
    {
      accent: "#A2649D",
      driftX: 1.1,
      driftY: -1.8,
      pattern: sampleArc(0.2, -0.1, 0.14, 0.12, 0, Math.PI * 2, 12, () => "0"),
    },
    {
      accent: "#A2649D",
      driftX: -0.7,
      driftY: -0.7,
      pattern: sampleArc(-0.08, 0.08, 0.12, 0.1, 0, Math.PI * 2, 10, () => "0"),
    },
    {
      accent: "#A2649D",
      driftX: 0.7,
      driftY: -0.7,
      pattern: sampleArc(0.08, 0.08, 0.12, 0.1, 0, Math.PI * 2, 10, () => "0"),
    },
    {
      accent: "#5B894B",
      driftX: 0,
      driftY: 0.8,
      pattern: [
        ...sampleSegment(0, 0.08, 0, 0.5, 9, "|"),
        ...sampleSegment(0, 0.18, -0.14, 0.0, 4, "/"),
        ...sampleSegment(0, 0.14, 0.14, -0.02, 4, "\\"),
      ],
    },
    {
      accent: "#6087C2",
      driftX: -0.4,
      driftY: 0.7,
      pattern: [
        ...sampleSegment(-0.06, 0.26, -0.16, 0.14, 4, "/"),
        ...sampleSegment(0.04, 0.28, 0.15, 0.16, 4, "\\"),
      ],
    },
    {
      accent: "#B49F00",
      driftX: 0,
      driftY: 0.35,
      pattern: [
        ...sampleSegment(-0.34, 0.56, 0.34, 0.56, 12, "_"),
        ...sampleSegment(-0.26, 0.62, 0.26, 0.62, 10, "-"),
      ],
    },
  ] as const;

  const targets: TargetPoint[] = [];

  petals.forEach((petal, petalIndex) => {
    petal.pattern.forEach((point) => {
      targets.push({
        accent: petal.accent,
        driftX: petal.driftX,
        driftY: petal.driftY,
        glyph: point.glyph,
        phase: petalIndex * 1.1 + targets.length * 0.09,
        size: scale * 0.25,
        x: centerX + point.x * scale,
        y: centerY + point.y * scale,
      });
    });
  });

  return targets.slice(0, GLYPH_COUNT);
}

function buildFujiTargets(centerX: number, centerY: number, scale: number) {
  const features = [
    {
      accent: "#6087C2",
      driftX: -1,
      driftY: 1.2,
      pattern: sampleSegment(-0.56, 0.36, -0.04, -0.32, 14, "/"),
    },
    {
      accent: "#5B894B",
      driftX: 1,
      driftY: 1.2,
      pattern: sampleSegment(0.04, -0.32, 0.56, 0.36, 14, "\\"),
    },
    {
      accent: POINT_FILL,
      driftX: 0,
      driftY: -0.8,
      pattern: [
        ...sampleSegment(-0.1, -0.22, 0, -0.38, 4, "/"),
        ...sampleSegment(0, -0.38, 0.1, -0.22, 4, "\\"),
        ...sampleSegment(-0.18, -0.08, -0.02, -0.22, 5, "/"),
        ...sampleSegment(0.02, -0.22, 0.18, -0.08, 5, "\\"),
      ],
    },
    {
      accent: "#B49F00",
      driftX: 0,
      driftY: 0.8,
      pattern: [
        ...sampleSegment(-0.72, 0.42, 0.72, 0.42, 18, "_"),
        ...sampleSegment(-0.62, 0.54, 0.62, 0.54, 16, "-"),
      ],
    },
    {
      accent: "#A2649D",
      driftX: 2.2,
      driftY: -1.4,
      pattern: sampleArc(0.42, -0.36, 0.1, 0.1, 0, Math.PI * 2, 10, () => "0"),
    },
  ] as const;

  const targets: TargetPoint[] = [];

  features.forEach((feature, featureIndex) => {
    feature.pattern.forEach((point) => {
      targets.push({
        accent: feature.accent,
        driftX: feature.driftX,
        driftY: feature.driftY,
        glyph: point.glyph,
        phase: featureIndex * 0.83 + targets.length * 0.08,
        size: scale * 0.24,
        x: centerX + point.x * scale,
        y: centerY + point.y * scale,
      });
    });
  });

  return targets.slice(0, GLYPH_COUNT);
}

function getKodoGlyph(baseGlyph: string, time: number, index: number) {
  const frame = Math.floor(time * 0.012 + index * 0.43);

  switch (baseGlyph) {
    case "]":
      return ["]", "|", "]", "["][frame % 4];
    case "[":
      return ["[", "|", "[", "]"][frame % 4];
    case "<":
      return ["<", "/", "<", "\\"][frame % 4];
    case ">":
      return [">", "\\", ">", "/"][frame % 4];
    case "|":
      return ["|", "]", "|", "["][frame % 4];
    default:
      return baseGlyph;
  }
}

export function SymbolSphereHero({
  className = "",
  showOverlay = true,
}: SymbolSphereHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const hoverRef = useRef(false);
  const mobileRef = useRef(false);
  const pointerRef = useRef<PointerState>({ active: false, x: 0, y: 0 });
  const modeRef = useRef<MorphMode>("sphere");
  const shapeRef = useRef<MorphShape>("kodo");
  const nextShapeIndexRef = useRef(0);
  const morphRef = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncMode = () => {
      mobileRef.current = mediaQuery.matches;
      hoverRef.current = false;
      modeRef.current = "sphere";
      shapeRef.current = "kodo";
      nextShapeIndexRef.current = 0;
      pointerRef.current = { active: false, x: 0, y: 0 };
    };

    syncMode();
    mediaQuery.addEventListener("change", syncMode);

    return () => {
      mediaQuery.removeEventListener("change", syncMode);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const glyphs = buildSphereGlyphs();
    const resizeObserver = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    });

    resizeObserver.observe(canvas);

    const monoFamily =
      getComputedStyle(canvas).getPropertyValue("--font-fugue-mono").trim() ||
      "monospace";

    const render = (time: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (!width || !height) {
        frameRef.current = window.requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const isMobile = mobileRef.current;
      const centerY = height * (isMobile ? 0.49 : 0.53);
      const centerX = width * 0.5;
      const radius = Math.min(width, height) * (isMobile ? 0.3 : 0.33);
      const spin = time * 0.00035;
      const mode = modeRef.current;
      const activeShape = shapeRef.current;
      const isAssembled = mode !== "sphere";
      const disturbPointer =
        isMobile && !isAssembled
          ? {
              active: true,
              x:
                centerX +
                Math.cos(time * 0.00105) * radius * 0.52 +
                Math.sin(time * 0.0019) * radius * 0.08,
              y:
                centerY +
                Math.sin(time * 0.00137) * radius * 0.42 +
                Math.cos(time * 0.0018) * radius * 0.12,
            }
          : pointerRef.current;
      const isHovering = (isMobile || hoverRef.current) && !isAssembled;
      const morphTarget = isAssembled ? 1 : 0;
      morphRef.current = lerp(morphRef.current, morphTarget, isAssembled ? 0.12 : 0.09);

      const morph = morphRef.current;
      const targetScaleBase = Math.min(width, height) * (isMobile ? 0.145 : 0.17);
      const targetScaleMultiplier =
        activeShape === "mask"
          ? 2.5
          : activeShape === "samurai"
            ? 1.9
            : activeShape === "sakura"
              ? 1.95
              : activeShape === "fuji"
                ? 2.25
                : 1;
      const targetScale = targetScaleBase * targetScaleMultiplier;
      const targetPoints =
        activeShape === "kodo"
          ? buildKodoTargets(centerX, centerY, targetScale)
          : activeShape === "mask"
            ? buildAnonymousMaskTargets(centerX, centerY, targetScale)
            : activeShape === "samurai"
              ? buildSamuraiTargets(centerX, centerY, targetScale)
              : activeShape === "sakura"
                ? buildSakuraTargets(centerX, centerY, targetScale)
                : buildFujiTargets(centerX, centerY, targetScale);

      const projected = glyphs.map((glyph, index) => {
        const target = targetPoints[index];
        const wobble = Math.sin(time * 0.0012 + glyph.phase) * 0.16;
        const rotatedY = rotateY(glyph.baseX, glyph.baseY, glyph.baseZ, spin + wobble);
        const rotated = rotateX(
          rotatedY.x,
          rotatedY.y,
          rotatedY.z,
          Math.sin(time * 0.0009 + index * 0.03) * 0.2,
        );

        const perspective = 1.7 / (1.7 - rotated.z);
        const sphereX = centerX + rotated.x * radius * perspective;
        const sphereY = centerY + rotated.y * radius * perspective;
        const baseAlpha = 0.28 + ((rotated.z + 1) / 2) * 0.72;
        const baseSize = 12 + perspective * 10;
        const glyphIndex = Math.floor((time * 0.003 + index * 0.7) % glyph.glyphs.length);

        let hoverX = sphereX;
        let hoverY = sphereY;
        let hoverAlpha = baseAlpha;
        let hoverSize = baseSize;
        let hoverColor = POINT_FILL;

        if (isHovering && disturbPointer.active) {
          const dx = sphereX - disturbPointer.x;
          const dy = sphereY - disturbPointer.y;
          const distance = Math.hypot(dx, dy);
          const reach = radius * 0.82;
          const influence = Math.max(0, 1 - distance / reach);

          if (influence > 0) {
            const falloff = influence * influence;
            const angle = distance > 0.001 ? Math.atan2(dy, dx) : glyph.phase;
            const repel = 10 + falloff * (26 + perspective * 18);

            hoverX += Math.cos(angle) * repel;
            hoverY += Math.sin(angle) * repel;
            hoverX += Math.sin(time * 0.0017 + index * 1.7) * falloff * 4;
            hoverY += Math.cos(time * 0.0015 + index * 1.1) * falloff * 4;
            hoverAlpha = Math.min(1, baseAlpha + falloff * 0.36);
            hoverSize = baseSize * (1 + falloff * 0.48);
            hoverColor = falloff > 0.12 ? glyph.accent : POINT_FILL;
          }
        }

        if (!target) {
          const residualAlpha =
            activeShape === "samurai" ? hoverAlpha * (1 - morph) * 0.16 : hoverAlpha * (1 - morph * 0.92);

          return {
            alpha: residualAlpha,
            color: hoverColor,
            glyph: glyph.glyphs[glyphIndex],
            isPrimary: false,
            size: hoverSize * (1 - morph * 0.12),
            x: hoverX,
            y: hoverY,
            z: rotated.z,
          };
        }

        const alpha = lerp(hoverAlpha, 1, morph);
        let animatedTargetX = target.x;
        let animatedTargetY = target.y;
        let animatedGlyph = target.glyph;
        let animatedColor = target.accent;
        let animatedSize = target.size;

        if (activeShape === "kodo") {
          const run = Math.sin(time * 0.01 + index * 0.72 + (target.phase ?? 0));
          const driftX = (target.driftX ?? 0) * run;
          const driftY = (target.driftY ?? 0) * run;
          const pulse = 0.84 + (Math.sin(time * 0.006 + index * 0.38) + 1) * 0.08;

          animatedTargetX += driftX;
          animatedTargetY += driftY;
          animatedSize *= pulse;
          animatedGlyph = getKodoGlyph(target.glyph, time, index);
          animatedColor = mixAccentWithFill(target.accent, 0.82 + run * 0.12, 1);
        } else if (activeShape === "mask") {
          const breathe = Math.sin(time * 0.0022) * targetScale * 0.018;
          const sway = Math.sin(time * 0.0046 + index * 0.34 + (target.phase ?? 0));
          const shimmer = 0.46 + (Math.sin(time * 0.0035 + (target.phase ?? 0)) + 1) * 0.27;

          animatedTargetX += (target.driftX ?? 0) * sway;
          animatedTargetY += breathe + (target.driftY ?? 0) * sway;
          animatedSize *= 1.06 + Math.cos(time * 0.0038 + index * 0.3) * 0.05;
          animatedColor = mixAccentWithFill(target.accent, shimmer, 1);
        } else if (activeShape === "samurai") {
          const brace = Math.sin(time * 0.0048 + (target.phase ?? 0));
          const glint = 0.5 + (Math.sin(time * 0.0074 + index * 0.41) + 1) * 0.2;

          animatedTargetX += (target.driftX ?? 0) * brace;
          animatedTargetY += (target.driftY ?? 0) * brace;
          animatedSize *= 1 + Math.cos(time * 0.0048 + index * 0.19) * 0.015;
          animatedColor =
            target.accent === POINT_FILL
              ? POINT_FILL
              : mixAccentWithFill(target.accent, glint, 1);
        } else if (activeShape === "sakura") {
          const blossom = Math.sin(time * 0.0044 + (target.phase ?? 0));
          const petalLight = 0.5 + (Math.cos(time * 0.0062 + index * 0.26) + 1) * 0.2;

          animatedTargetX += (target.driftX ?? 0) * blossom;
          animatedTargetY += (target.driftY ?? 0) * blossom;
          animatedSize *= 1.03 + Math.sin(time * 0.0048 + index * 0.29) * 0.05;
          animatedColor =
            target.accent === POINT_FILL
              ? POINT_FILL
              : mixAccentWithFill(target.accent, petalLight, 1);
        } else if (activeShape === "fuji") {
          const haze = Math.sin(time * 0.0031 + (target.phase ?? 0));
          const coldLight = 0.44 + (Math.sin(time * 0.0047 + index * 0.22) + 1) * 0.18;

          animatedTargetX += (target.driftX ?? 0) * haze;
          animatedTargetY += (target.driftY ?? 0) * haze;
          animatedSize *= 1 + Math.cos(time * 0.0036 + index * 0.18) * 0.03;
          animatedColor =
            target.accent === POINT_FILL
              ? POINT_FILL
              : mixAccentWithFill(target.accent, coldLight, 1);
        }

        const x = lerp(hoverX, animatedTargetX, morph);
        const y = lerp(hoverY, animatedTargetY, morph);
        const glyphChar = morph > 0.58 ? animatedGlyph : glyph.glyphs[glyphIndex];
        const color = morph > 0.42 ? animatedColor : hoverColor;

        return {
          alpha,
          color,
          glyph: glyphChar,
          isPrimary: morph > 0.2,
          size: lerp(hoverSize, animatedSize, morph),
          x,
          y,
          z: rotated.z,
        };
      });

      const secondary = projected
        .filter((item) => !item.isPrimary)
        .sort((left, right) => left.z - right.z);
      const primary = projected.filter((item) => item.isPrimary);

      for (const item of [...secondary, ...primary]) {
        ctx.save();
        ctx.globalAlpha = Math.min(1, item.alpha);
        ctx.fillStyle = item.color;
        ctx.font = `${item.size}px ${monoFamily}, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item.glyph, item.x, item.y);
        ctx.restore();
      }

      frameRef.current = window.requestAnimationFrame(render);
    };

    frameRef.current = window.requestAnimationFrame(render);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }

      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={`relative overflow-hidden cursor-pointer touch-manipulation ${className}`}
      onClick={() => {
        if (modeRef.current !== "sphere") {
          modeRef.current = "sphere";
          return;
        }

        const nextShape = SHAPE_CYCLE[nextShapeIndexRef.current];

        shapeRef.current = nextShape;
        modeRef.current = nextShape;
        nextShapeIndexRef.current = (nextShapeIndexRef.current + 1) % SHAPE_CYCLE.length;
      }}
      onPointerEnter={(event) => {
        if (mobileRef.current) {
          return;
        }

        const rect = event.currentTarget.getBoundingClientRect();

        hoverRef.current = true;
        pointerRef.current = {
          active: true,
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
      }}
      onPointerLeave={() => {
        if (mobileRef.current) {
          return;
        }

        hoverRef.current = false;
        pointerRef.current = { active: false, x: 0, y: 0 };
      }}
      onPointerMove={(event) => {
        if (mobileRef.current) {
          return;
        }

        const rect = event.currentTarget.getBoundingClientRect();

        pointerRef.current = {
          active: true,
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
      }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      {showOverlay ? (
        <>
          <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-3 border border-[var(--color-border)] bg-[rgba(23,22,26,0.78)] px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-text-soft)] backdrop-blur-sm">
            <span className="h-2.5 w-2.5 bg-[var(--color-brand-green)]" aria-hidden="true" />
            Mobile Autoplay / Click To Step
          </div>
          <div className="pointer-events-none absolute bottom-5 left-5 max-w-xs space-y-2">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-brand-blue)]">
              Symbol Sphere
            </p>
            <p className="text-sm leading-6 text-[var(--color-text-soft)]">
              На desktop hover локально ломает орбиту. На mobile облако живет само,
              а click ведет по шагам: sphere, KODO, sphere, Fuji, sphere, Sakura, sphere, mask, sphere, swords.
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}
