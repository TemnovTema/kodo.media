"use client";

import { useEffect, useState } from "react";

type HomeRouteMapProps = {
  className?: string;
};

const glyphs = ["[]", "//", "01", "{}", "<>"];

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
      className={`group relative aspect-[1.08] min-h-[18rem] overflow-hidden bg-[var(--color-surface)] ${className}`}
    >
      <style>{`
        @keyframes home-route-map-drift {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -7px, 0); }
        }

        @keyframes home-route-map-trace {
          to { stroke-dashoffset: -44; }
        }

        @keyframes home-route-map-beacon {
          0%, 100% { opacity: 0.38; transform: scale(0.8); }
          48% { opacity: 1; transform: scale(1); }
        }

        .home-route-map__node {
          transform-box: fill-box;
          transform-origin: center;
          animation: home-route-map-drift 5.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .home-route-map__node--two { animation-delay: -1.45s; }
        .home-route-map__node--three { animation-delay: -2.9s; }
        .home-route-map__node--four { animation-delay: -4.35s; }

        .home-route-map__trace {
          stroke-dasharray: 3 8;
          animation: home-route-map-trace 3.6s linear infinite;
        }

        .home-route-map__beacon {
          transform-box: fill-box;
          transform-origin: center;
          animation: home-route-map-beacon 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .group:hover .home-route-map__node { animation-duration: 2.8s; }
        .group:hover .home-route-map__trace { animation-duration: 1.45s; }

        @media (prefers-reduced-motion: reduce) {
          .home-route-map__node,
          .home-route-map__trace,
          .home-route-map__beacon { animation: none; }
        }
      `}</style>

      <svg
        viewBox="0 0 640 592"
        className="h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M 114 168 C 198 120, 266 166, 314 230 S 448 345, 544 264"
          stroke="rgba(243, 238, 232, 0.24)"
          strokeWidth="1.5"
        />
        <path
          d="M 114 168 C 198 120, 266 166, 314 230 S 448 345, 544 264"
          className="home-route-map__trace"
          stroke="rgba(243, 238, 232, 0.72)"
          strokeWidth="2"
        />
        <path
          d="M 94 422 C 194 458, 266 408, 326 350 S 462 267, 548 384"
          stroke="rgba(243, 238, 232, 0.16)"
          strokeWidth="1.5"
        />
        <path
          d="M 94 422 C 194 458, 266 408, 326 350 S 462 267, 548 384"
          className="home-route-map__trace"
          stroke="rgba(243, 238, 232, 0.58)"
          strokeWidth="2"
        />

        <g className="home-route-map__node">
          <rect x="70" y="119" width="88" height="88" fill="rgba(96, 135, 194, 0.12)" stroke="#6087C2" strokeWidth="2" />
          <text x="114" y="169" fill="#6087C2" fontFamily="var(--font-fugue-mono), monospace" fontSize="26" letterSpacing="0.08em" textAnchor="middle">
            {glyphs[glyphIndex]}
          </text>
          <text x="114" y="233" fill="rgba(243, 238, 232, 0.54)" fontFamily="var(--font-fugue-mono), monospace" fontSize="11" letterSpacing="0.18em" textAnchor="middle">
            ЧИТАТЬ
          </text>
        </g>

        <g className="home-route-map__node home-route-map__node--two">
          <rect x="272" y="190" width="84" height="84" fill="rgba(162, 100, 157, 0.12)" stroke="#A2649D" strokeWidth="2" />
          <path d="M 296 216 H 332 M 296 232 H 322 M 296 248 H 337" stroke="#A2649D" strokeWidth="2" />
          <text x="314" y="299" fill="rgba(243, 238, 232, 0.54)" fontFamily="var(--font-fugue-mono), monospace" fontSize="11" letterSpacing="0.18em" textAnchor="middle">
            ЗАДАЧА
          </text>
        </g>

        <g className="home-route-map__node home-route-map__node--three">
          <rect x="504" y="214" width="80" height="80" fill="rgba(91, 137, 75, 0.12)" stroke="#5B894B" strokeWidth="2" />
          <path d="M 526 253 L 540 267 L 566 239" stroke="#5B894B" strokeWidth="2.2" />
          <text x="544" y="319" fill="rgba(243, 238, 232, 0.54)" fontFamily="var(--font-fugue-mono), monospace" fontSize="11" letterSpacing="0.18em" textAnchor="middle">
            ПРОВЕРИТЬ
          </text>
        </g>

        <g className="home-route-map__node home-route-map__node--four">
          <rect x="58" y="374" width="74" height="74" fill="rgba(180, 159, 0, 0.12)" stroke="#B49F00" strokeWidth="2" />
          <circle cx="95" cy="411" r="15" stroke="#B49F00" strokeWidth="2" />
          <path d="M 95 396 V 426 M 80 411 H 110" stroke="#B49F00" strokeWidth="2" />
          <text x="95" y="474" fill="rgba(243, 238, 232, 0.54)" fontFamily="var(--font-fugue-mono), monospace" fontSize="11" letterSpacing="0.18em" textAnchor="middle">
            ВСТРЕТИТЬСЯ
          </text>
        </g>

        <g className="home-route-map__beacon">
          <rect x="305" y="335" width="18" height="18" fill="#F3EEE8" />
          <rect x="309" y="339" width="10" height="10" fill="#08080B" />
        </g>
        <text x="320" y="539" fill="rgba(243, 238, 232, 0.42)" fontFamily="var(--font-fugue-mono), monospace" fontSize="12" letterSpacing="0.22em" textAnchor="middle">
          KODO / WORKING ROUTE
        </text>
      </svg>
    </div>
  );
}
