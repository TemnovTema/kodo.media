"use client";

import { useEffect, useState } from "react";

type HomeRouteMapProps = {
  className?: string;
};

const glyphs = ["{}", "//", "<>", "01", "++"];

export function HomeRouteMap({ className = "" }: HomeRouteMapProps) {
  const [glyphIndex, setGlyphIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = window.setInterval(() => {
      setGlyphIndex((current) => (current + 1) % glyphs.length);
    }, 1120);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`group relative aspect-[1.08] min-h-[19rem] overflow-hidden bg-[var(--color-surface)] ${className}`}
    >
      <style>{`
        @keyframes home-route-map-drift {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -6px, 0); }
        }

        @keyframes home-route-map-trace {
          to { stroke-dashoffset: -34; }
        }

        @keyframes home-route-map-signal-x {
          0%, 100% { opacity: 0.28; transform: translateX(-38px); }
          48% { opacity: 1; transform: translateX(38px); }
        }

        @keyframes home-route-map-signal-y {
          0%, 100% { opacity: 0.28; transform: translateY(-38px); }
          48% { opacity: 1; transform: translateY(38px); }
        }

        @keyframes home-route-map-beacon {
          0%, 100% { opacity: 0.36; transform: scale(0.8); }
          48% { opacity: 1; transform: scale(1); }
        }

        .home-route-map__module,
        .home-route-map__signal,
        .home-route-map__beacon {
          transform-box: fill-box;
          transform-origin: center;
        }

        .home-route-map__module {
          animation: home-route-map-drift 5.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .home-route-map__module--two { animation-delay: -1.45s; }
        .home-route-map__module--three { animation-delay: -2.9s; }
        .home-route-map__module--four { animation-delay: -4.35s; }

        .home-route-map__trace {
          stroke-dasharray: 3 8;
          animation: home-route-map-trace 3.6s linear infinite;
        }

        .home-route-map__signal--x {
          animation: home-route-map-signal-x 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .home-route-map__signal--y {
          animation: home-route-map-signal-y 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: -1.6s;
        }

        .home-route-map__beacon {
          animation: home-route-map-beacon 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .group:hover .home-route-map__module { animation-duration: 3.1s; }
        .group:hover .home-route-map__trace { animation-duration: 1.45s; }
        .group:hover .home-route-map__signal--x,
        .group:hover .home-route-map__signal--y { animation-duration: 1.55s; }

        @media (prefers-reduced-motion: reduce) {
          .home-route-map__module,
          .home-route-map__trace,
          .home-route-map__signal,
          .home-route-map__beacon { animation: none; }
        }
      `}</style>

      <svg
        viewBox="0 0 640 640"
        className="h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <g stroke="rgba(243, 238, 232, 0.06)" strokeWidth="1">
          <path d="M 44 64 H 596 M 44 176 H 596 M 44 288 H 596 M 44 400 H 596 M 44 512 H 596 M 44 576 H 596" />
          <path d="M 64 44 V 596 M 176 44 V 596 M 288 44 V 596 M 400 44 V 596 M 512 44 V 596 M 576 44 V 596" />
        </g>

        <g stroke="rgba(243, 238, 232, 0.22)" strokeWidth="1.5">
          <path d="M 240 160 H 400" />
          <path d="M 492 232 V 408" />
          <path d="M 400 480 H 240" />
          <path d="M 148 408 V 232" />
        </g>
        <g className="home-route-map__trace" stroke="rgba(243, 238, 232, 0.76)" strokeWidth="2">
          <path d="M 240 160 H 400" />
          <path d="M 492 232 V 408" />
          <path d="M 400 480 H 240" />
          <path d="M 148 408 V 232" />
        </g>

        <rect className="home-route-map__signal home-route-map__signal--x" x="314" y="154" width="12" height="12" fill="#6087C2" />
        <rect className="home-route-map__signal home-route-map__signal--y" x="486" y="314" width="12" height="12" fill="#5B894B" />
        <rect className="home-route-map__signal home-route-map__signal--x" x="314" y="474" width="12" height="12" fill="#B49F00" />
        <rect className="home-route-map__signal home-route-map__signal--y" x="142" y="314" width="12" height="12" fill="#A2649D" />

        <g className="home-route-map__module">
          <rect x="56" y="88" width="184" height="144" fill="rgba(96, 135, 194, 0.09)" stroke="#6087C2" strokeWidth="2" />
          <path d="M 78 112 H 120 M 78 128 H 102" stroke="#6087C2" strokeWidth="2" />
          <text x="78" y="188" fill="#6087C2" fontFamily="var(--font-fugue-mono), monospace" fontSize="36" letterSpacing="0.04em">
            {glyphs[glyphIndex]}
          </text>
          <text x="78" y="214" fill="rgba(243, 238, 232, 0.72)" fontFamily="var(--font-fugue-mono), monospace" fontSize="11" letterSpacing="0.18em">
            ЧИТАТЬ
          </text>
        </g>

        <g className="home-route-map__module home-route-map__module--two">
          <rect x="400" y="88" width="184" height="144" fill="rgba(91, 137, 75, 0.09)" stroke="#5B894B" strokeWidth="2" />
          <path d="M 422 112 H 560 M 422 128 H 514" stroke="#5B894B" strokeWidth="2" />
          <text x="422" y="188" fill="#5B894B" fontFamily="var(--font-fugue-mono), monospace" fontSize="32" letterSpacing="0.04em">
            TASK
          </text>
          <text x="422" y="214" fill="rgba(243, 238, 232, 0.72)" fontFamily="var(--font-fugue-mono), monospace" fontSize="11" letterSpacing="0.18em">
            СОБРАТЬ
          </text>
        </g>

        <g className="home-route-map__module home-route-map__module--three">
          <rect x="400" y="408" width="184" height="144" fill="rgba(180, 159, 0, 0.09)" stroke="#B49F00" strokeWidth="2" />
          <circle cx="444" cy="466" r="20" stroke="#B49F00" strokeWidth="2" />
          <path d="M 432 466 L 441 475 L 458 455" stroke="#B49F00" strokeWidth="2.4" />
          <text x="422" y="534" fill="rgba(243, 238, 232, 0.72)" fontFamily="var(--font-fugue-mono), monospace" fontSize="11" letterSpacing="0.18em">
            ПРОВЕРИТЬ
          </text>
        </g>

        <g className="home-route-map__module home-route-map__module--four">
          <rect x="56" y="408" width="184" height="144" fill="rgba(162, 100, 157, 0.09)" stroke="#A2649D" strokeWidth="2" />
          <path d="M 78 452 H 146 M 78 468 H 168 M 78 484 H 128" stroke="#A2649D" strokeWidth="2" />
          <text x="78" y="534" fill="rgba(243, 238, 232, 0.72)" fontFamily="var(--font-fugue-mono), monospace" fontSize="11" letterSpacing="0.18em">
            ОБСУДИТЬ
          </text>
        </g>

        <g className="home-route-map__beacon">
          <rect x="306" y="306" width="28" height="28" fill="#F3EEE8" />
          <rect x="312" y="312" width="16" height="16" fill="#08080B" />
        </g>
        <text x="320" y="366" fill="rgba(243, 238, 232, 0.66)" fontFamily="var(--font-fugue-mono), monospace" fontSize="12" letterSpacing="0.2em" textAnchor="middle">
          KODO
        </text>
      </svg>
    </div>
  );
}
