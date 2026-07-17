"use client";

import { useEffect, useRef, useState } from "react";

type CommunityIntroGlyphProps = {
  className?: string;
};

const outline = "rgba(243, 238, 232, 0.12)";
const link = "rgba(243, 238, 232, 0.22)";
const blue = "#6087C2";
const pink = "#A2649D";
const green = "#5B894B";
const yellow = "#B49F00";
const LABEL_CYCLE_MS = 4800;
const ROTATION_BOOST = 108;
const ROTATION_DAMPING = 1.08;
const STOP_THRESHOLD = 2.25;
const RETURN_RATE = 0.72;
const RETURN_THRESHOLD = 0.18;
const ORIENTATION_FOLLOW = 6.2;
const ORIENTATION_LIMIT = 32;

const compassMarks = [
  { x: 160, y: 48, color: yellow, label: "N", size: 16, swap: "O" },
  { x: 223, y: 74, color: blue, label: "NE", size: 11, symbols: ["<>", "::", "[]"] },
  { x: 248, y: 138, color: pink, label: "E", size: 16, swap: "D" },
  { x: 224, y: 204, color: green, label: "SE", size: 11, symbols: ["//", "++", "01"] },
  { x: 160, y: 232, color: yellow, label: "S", size: 16, swap: "O" },
  { x: 96, y: 204, color: pink, label: "SW", size: 11, symbols: ["{}", "||", "0x"] },
  { x: 72, y: 138, color: blue, label: "W", size: 16, swap: "K" },
  { x: 97, y: 74, color: green, label: "NW", size: 11, symbols: ["[]", "><", "--"] },
];

type CompassMark = (typeof compassMarks)[number];
type MotionState = {
  angle: number;
  clock: number;
  phase: number;
};

type MobileCompassState =
  | "idle"
  | "requesting"
  | "active"
  | "unsupported"
  | "unavailable"
  | "denied";

type PersonProps = {
  bodyColor: string;
  delay?: string;
  headColor: string;
  headY?: number;
  scale?: number;
  shoulderPath: string;
  x: number;
  y: number;
};

function Person({
  bodyColor,
  delay = "0s",
  headColor,
  headY = -12,
  scale = 0.92,
  shoulderPath,
  x,
  y,
}: PersonProps) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <animateTransform
        additive="sum"
        attributeName="transform"
        begin={delay}
        dur="5.6s"
        repeatCount="indefinite"
        type="translate"
        values={`0 0; 0 -1.8; 0 0`}
      />
      <g transform={`scale(${scale})`}>
        <circle
          cx="0"
          cy={headY}
          fill="none"
          r="14"
          stroke={headColor}
          strokeWidth="2.4"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={shoulderPath}
          fill="none"
          stroke={bodyColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.4"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </g>
  );
}

function resolveCompassLabel(mark: CompassMark, phase: number, clock: number) {
  const tick = Math.floor(clock / 92);

  if (mark.swap) {
    const scrambleForward = [mark.label, "[", "{", mark.swap];
    const scrambleBackward = [mark.swap, ":", "]", mark.label];

    if (phase < 0.18 || phase >= 0.88) {
      return mark.label;
    }

    if (phase < 0.34) {
      const progress = (phase - 0.18) / 0.16;
      const index = Math.min(
        scrambleForward.length - 1,
        Math.floor(progress * (scrambleForward.length + 1) + (tick % 2)),
      );

      return scrambleForward[index];
    }

    if (phase < 0.68) {
      return mark.swap;
    }

    const progress = (phase - 0.68) / 0.2;
    const index = Math.min(
      scrambleBackward.length - 1,
      Math.floor(progress * (scrambleBackward.length + 1) + (tick % 2)),
    );

    return scrambleBackward[index];
  }

  if (!mark.symbols || phase < 0.2 || phase >= 0.84) {
    return mark.label;
  }

  const activeIndex = Math.floor(((clock / 140) + mark.x * 0.02) % mark.symbols.length);

  return mark.symbols[activeIndex];
}

function CompassMarkLabel({
  clock,
  mark,
  phase,
}: {
  clock: number;
  mark: CompassMark;
  phase: number;
}) {
  const tracking = mark.size < 12 ? "0.1em" : "0.02em";
  const display = resolveCompassLabel(mark, phase, clock);
  const isTransitioning = phase >= 0.18 && phase < 0.84;
  const lift = isTransitioning
    ? Math.sin(clock * 0.018 + mark.x * 0.06 + mark.y * 0.04) * 1.8
    : 0;
  const opacity = isTransitioning
    ? 0.82 + (Math.sin(clock * 0.014 + mark.x * 0.03) + 1) * 0.09
    : 0.92;

  return (
    <g>
      <text
        x={mark.x}
        y={mark.y + lift}
        fill={mark.color}
        fontFamily="var(--font-fugue-mono), monospace"
        fontSize={mark.size}
        fontWeight="600"
        letterSpacing={tracking}
        opacity={opacity}
        textAnchor="middle"
      >
        {display}
      </text>
    </g>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function normalizeDegrees(value: number) {
  let normalized = value % 360;

  if (normalized < 0) {
    normalized += 360;
  }

  return normalized;
}

function shortestAngleDelta(from: number, to: number) {
  return ((to - from + 540) % 360) - 180;
}

function resolveHeading(event: DeviceOrientationEvent) {
  const iosHeading = (
    event as DeviceOrientationEvent & {
      webkitCompassHeading?: number;
    }
  ).webkitCompassHeading;

  if (typeof iosHeading === "number" && Number.isFinite(iosHeading)) {
    return normalizeDegrees(iosHeading);
  }

  if (typeof event.alpha === "number" && Number.isFinite(event.alpha)) {
    return normalizeDegrees(event.alpha);
  }

  return null;
}

function resolveTilt(event: DeviceOrientationEvent) {
  const gamma = typeof event.gamma === "number" ? event.gamma : null;
  const beta = typeof event.beta === "number" ? event.beta : null;

  if (gamma === null && beta === null) {
    return null;
  }

  return clamp((gamma ?? 0) * 0.82 + (beta ?? 0) * 0.08, -ORIENTATION_LIMIT, ORIENTATION_LIMIT);
}

function getMobileCompassMessage(state: MobileCompassState) {
  switch (state) {
    case "requesting":
      return "разрешаем доступ к компасу";
    case "active":
      return "компас привязан к положению телефона";
    case "unsupported":
      return "браузер не отдаёт compass-сенсор";
    case "unavailable":
      return "сенсор не отвечает";
    case "denied":
      return "доступ к motion/compass отклонён";
    case "idle":
    default:
      return "коснитесь знака, чтобы включить компас";
  }
}

export function CommunityIntroGlyph({
  className = "",
}: CommunityIntroGlyphProps) {
  const frameRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);
  const velocityRef = useRef(0);
  const angleRef = useRef(0);
  const cycleStartRef = useRef<number | null>(null);
  const stepRef = useRef<((timestamp: number) => void) | null>(null);
  const hoverLockRef = useRef(false);
  const isMobileRef = useRef(false);
  const orientationEnabledRef = useRef(false);
  const orientationPermissionNeededRef = useRef(false);
  const orientationAttachedRef = useRef(false);
  const orientationTargetRef = useRef(0);
  const orientationZeroRef = useRef<number | null>(null);
  const orientationLastEventAtRef = useRef(0);
  const attachOrientationListenerRef = useRef<(() => void) | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileCompassState, setMobileCompassState] = useState<MobileCompassState>("idle");
  const [motion, setMotion] = useState<MotionState>({
    angle: 0,
    clock: 0,
    phase: 0,
  });

  useEffect(() => {
    const coarseQuery = window.matchMedia("(hover: none) and (pointer: coarse)");
    const updateMobileState = () => {
      isMobileRef.current = coarseQuery.matches;
      setIsMobile(coarseQuery.matches);

      if (!isMobileRef.current) {
        orientationTargetRef.current = 0;
        orientationEnabledRef.current = false;
        orientationPermissionNeededRef.current = false;
        orientationZeroRef.current = null;
        setMobileCompassState("idle");
      }
    };

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (!isMobileRef.current) {
        return;
      }

      const heading = resolveHeading(event);
      const tilt = resolveTilt(event);
      let target: number | null = null;

      if (heading !== null) {
        if (orientationZeroRef.current === null) {
          orientationZeroRef.current = heading;
        }

        target = shortestAngleDelta(orientationZeroRef.current, heading);
      } else if (tilt !== null) {
        target = tilt;
      }

      if (target === null) {
        return;
      }

      orientationEnabledRef.current = true;
      orientationTargetRef.current = target;
      orientationLastEventAtRef.current = performance.now();
      setMobileCompassState("active");

      if (frameRef.current === null && stepRef.current) {
        const now = performance.now();

        lastFrameRef.current = now;
        frameRef.current = window.requestAnimationFrame(stepRef.current);
      }
    };

    attachOrientationListenerRef.current = () => {
      if (orientationAttachedRef.current) {
        return;
      }

      orientationZeroRef.current = null;
      window.addEventListener("deviceorientation", handleDeviceOrientation, {
        passive: true,
      });
      window.addEventListener("deviceorientationabsolute", handleDeviceOrientation as EventListener, {
        passive: true,
      });
      orientationAttachedRef.current = true;
    };

    updateMobileState();
    coarseQuery.addEventListener("change", updateMobileState);

    if (typeof DeviceOrientationEvent !== "undefined") {
      const orientationCtor = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
        requestPermission?: () => Promise<"denied" | "granted">;
      };

      if (typeof orientationCtor.requestPermission === "function") {
        orientationPermissionNeededRef.current = true;
        setMobileCompassState(isMobileRef.current ? "idle" : "unsupported");
      } else {
        attachOrientationListenerRef.current?.();
        if (isMobileRef.current) {
          setMobileCompassState("idle");
        }
      }
    } else if (isMobileRef.current) {
      setMobileCompassState("unsupported");
    }

    const step = (timestamp: number) => {
      const last = lastFrameRef.current || timestamp;
      const dt = Math.min((timestamp - last) / 1000, 0.05);

      lastFrameRef.current = timestamp;

      if (isMobileRef.current && orientationEnabledRef.current) {
        if (
          orientationLastEventAtRef.current > 0 &&
          timestamp - orientationLastEventAtRef.current > 1800
        ) {
          orientationEnabledRef.current = false;
          setMobileCompassState("unavailable");
        }

        const delta = shortestAngleDelta(angleRef.current, orientationTargetRef.current);

        angleRef.current += delta * Math.min(1, dt * ORIENTATION_FOLLOW);
      } else if (velocityRef.current > 0) {
        angleRef.current += velocityRef.current * dt;
        velocityRef.current *= Math.exp(-dt * ROTATION_DAMPING);

        if (velocityRef.current < STOP_THRESHOLD) {
          velocityRef.current = 0;
        }
      } else if (Math.abs(angleRef.current) > RETURN_THRESHOLD) {
        angleRef.current *= Math.exp(-dt * RETURN_RATE);
      } else {
        angleRef.current = 0;
      }

      let nextPhase = 0;

      if (cycleStartRef.current !== null) {
        const elapsed = timestamp - cycleStartRef.current;

        if (elapsed < LABEL_CYCLE_MS) {
          nextPhase = elapsed / LABEL_CYCLE_MS;
        } else {
          cycleStartRef.current = null;
        }
      }

      setMotion({
        angle: angleRef.current,
        clock: timestamp,
        phase: nextPhase,
      });

      if (
        (isMobileRef.current && orientationEnabledRef.current) ||
        velocityRef.current > 0 ||
        cycleStartRef.current !== null ||
        Math.abs(angleRef.current) > RETURN_THRESHOLD
      ) {
        frameRef.current = window.requestAnimationFrame(step);
      } else {
        frameRef.current = null;
      }
    };

    stepRef.current = step;

    return () => {
      coarseQuery.removeEventListener("change", updateMobileState);
      if (orientationAttachedRef.current) {
        window.removeEventListener("deviceorientation", handleDeviceOrientation);
        window.removeEventListener(
          "deviceorientationabsolute",
          handleDeviceOrientation as EventListener,
        );
      }

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const triggerCompass = () => {
    const now = performance.now();

    cycleStartRef.current = now;
    velocityRef.current = Math.max(velocityRef.current, 18) + ROTATION_BOOST;

    if (frameRef.current === null && stepRef.current) {
      lastFrameRef.current = now;
      frameRef.current = window.requestAnimationFrame(stepRef.current);
    }
  };

  const handleHoverStart = () => {
    if (isMobileRef.current) {
      return;
    }

    if (hoverLockRef.current) {
      return;
    }

    hoverLockRef.current = true;
    triggerCompass();
  };

  const handleHoverEnd = () => {
    hoverLockRef.current = false;
  };

  const handleMobileCompassActivation = async () => {
    if (!isMobileRef.current) {
      return;
    }

    if (!orientationPermissionNeededRef.current) {
      if (!orientationAttachedRef.current) {
        attachOrientationListenerRef.current?.();
      }

      if (!orientationEnabledRef.current) {
        setMobileCompassState("unavailable");
        triggerCompass();
      }

      return;
    }

    const orientationCtor = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: (absolute?: boolean) => Promise<"denied" | "granted">;
    };

    if (typeof orientationCtor.requestPermission !== "function") {
      setMobileCompassState("unsupported");
      return;
    }

    try {
      setMobileCompassState("requesting");
      let permission: "denied" | "granted";

      try {
        permission = await orientationCtor.requestPermission(true);
      } catch {
        permission = await orientationCtor.requestPermission();
      }

      if (permission === "granted") {
        orientationPermissionNeededRef.current = false;
        orientationLastEventAtRef.current = performance.now();
        setMobileCompassState("active");
        attachOrientationListenerRef.current?.();
        window.setTimeout(() => {
          if (
            isMobileRef.current &&
            !orientationEnabledRef.current &&
            mobileCompassState !== "denied"
          ) {
            setMobileCompassState("unavailable");
          }
        }, 1400);
      } else {
        setMobileCompassState("denied");
      }
    } catch {
      setMobileCompassState("denied");
    }
  };

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 ${className}`}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onMouseMove={handleHoverStart}
      onPointerDown={handleMobileCompassActivation}
      onPointerEnter={handleHoverStart}
      onPointerLeave={handleHoverEnd}
      onPointerMove={handleHoverStart}
    >
      <svg
        viewBox="0 0 320 320"
        className="h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="translate(160 140) scale(1.1) translate(-160 -140)">
          <g
            opacity="0.92"
            transform={`rotate(${motion.angle.toFixed(2)} 160 140)`}
          >

            <circle
              cx="160"
              cy="140"
              r="92"
              stroke="rgba(243, 238, 232, 0.08)"
              strokeWidth="1.6"
            />
            <polygon
              points="160,48 223,74 248,138 224,204 160,232 96,204 72,138 97,74"
              stroke={outline}
              strokeWidth="2.4"
            />

            {compassMarks.map((mark) => (
              <CompassMarkLabel
                clock={motion.clock}
                key={`${mark.label}-${mark.x}-${mark.y}`}
                mark={mark}
                phase={motion.phase}
              />
            ))}

            {[
              ["160 66", "160 78"],
              ["211 86", "201 93"],
              ["230 140", "217 140"],
              ["211 194", "201 187"],
              ["160 214", "160 202"],
              ["109 194", "119 187"],
              ["90 140", "103 140"],
              ["109 86", "119 93"],
            ].map(([from, to]) => (
              <line
                key={`${from}-${to}`}
                x1={Number(from.split(" ")[0])}
                y1={Number(from.split(" ")[1])}
                x2={Number(to.split(" ")[0])}
                y2={Number(to.split(" ")[1])}
                stroke={link}
                strokeLinecap="round"
                strokeWidth="2"
              />
            ))}
            <g opacity="0.94">
              <Person
                bodyColor={blue}
                delay="0.15s"
                headColor={blue}
                shoulderPath="M -28 22 Q -28 4 -12 4 L 12 4 Q 28 4 28 22"
                x={110}
                y={152}
              />
              <Person
                bodyColor={pink}
                delay="0.35s"
                headColor={pink}
                headY={-20}
                shoulderPath="M -32 18 Q -32 -2 -14 -2 L 14 -2 Q 32 -2 32 18"
                x={160}
                y={112}
              />
              <Person
                bodyColor={yellow}
                delay="0.25s"
                headColor={yellow}
                shoulderPath="M -28 22 Q -28 4 -12 4 L 12 4 Q 28 4 28 22"
                x={210}
                y={152}
              />
              <Person
                bodyColor={green}
                delay="0s"
                headColor={green}
                shoulderPath="M -38 26 Q -38 2 -18 2 L -2 2 M 2 2 L 18 2 Q 38 2 38 26"
                x={160}
                y={184}
              />
            </g>
          </g>
        </g>

        <g>
          <text
            x="160"
            y="272"
            fill="rgba(243, 238, 232, 0.52)"
            fontFamily="var(--font-fugue-mono), monospace"
            fontSize="11"
            fontWeight="500"
            letterSpacing="0.24em"
            textAnchor="middle"
          >
            community node
          </text>
          <animate
            attributeName="opacity"
            dur="4.8s"
            repeatCount="indefinite"
            values="0.72;1;0.72"
          />
        </g>
        {isMobile ? (
          <text
            x="160"
            y="292"
            fill="rgba(243, 238, 232, 0.44)"
            fontFamily="var(--font-fugue-mono), monospace"
            fontSize="9"
            fontWeight="500"
            letterSpacing="0.14em"
            textAnchor="middle"
          >
            {getMobileCompassMessage(mobileCompassState)}
          </text>
        ) : null}
      </svg>
    </div>
  );
}
