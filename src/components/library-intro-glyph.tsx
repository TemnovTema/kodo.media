"use client";

import { useEffect, useState } from "react";
import { brandPalette } from "@/lib/brand";

type LibraryIntroGlyphProps = {
  className?: string;
};

export function LibraryIntroGlyph({
  className = "",
}: LibraryIntroGlyphProps) {
  const [hovered, setHovered] = useState(false);
  const [pagePhase, setPagePhase] = useState(0);

  useEffect(() => {
    if (!hovered) {
      return;
    }

    const interval = window.setInterval(() => {
      setPagePhase((value) => (value + 1) % 6);
    }, 180);

    return () => window.clearInterval(interval);
  }, [hovered]);

  const pageSwing = hovered ? 6 + (pagePhase % 3) * 1.8 : 0;
  const lineShift = hovered ? (pagePhase % 4) * 1.2 : 0;

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPagePhase(0);
      }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        setPagePhase(0);
      }}
    >
      <svg
        viewBox="0 0 320 320"
        className="h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="translate(0 2)">
          <line
            x1="56"
            y1="246"
            x2="264"
            y2="246"
            stroke="rgba(243, 238, 232, 0.14)"
            strokeWidth="2"
          />

          <g opacity="0.92">
            <rect
              x="70"
              y="182"
              width="34"
              height="64"
              rx="8"
              fill="rgba(96, 135, 194, 0.12)"
              stroke={brandPalette.blue}
              strokeWidth="2"
            />
            <line x1="81" y1="194" x2="81" y2="236" stroke={brandPalette.blue} strokeWidth="1.6" />
            <line x1="92" y1="194" x2="92" y2="236" stroke="rgba(243, 238, 232, 0.15)" strokeWidth="1.4" />

            <rect
              x="216"
              y="170"
              width="38"
              height="76"
              rx="8"
              fill="rgba(91, 137, 75, 0.1)"
              stroke={brandPalette.green}
              strokeWidth="2"
            />
            <line x1="227" y1="182" x2="227" y2="236" stroke={brandPalette.green} strokeWidth="1.6" />
            <line x1="239" y1="182" x2="239" y2="236" stroke="rgba(243, 238, 232, 0.15)" strokeWidth="1.4" />
          </g>

          <g transform="translate(160 164)">
            <g
              style={{
                transform: hovered ? "translateY(-4px)" : "translateY(0px)",
                transformOrigin: "160px 164px",
                transition: "transform 680ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <rect
                x="-18"
                y="52"
                width="36"
                height="12"
                rx="4"
                fill="rgba(243, 238, 232, 0.08)"
                stroke="rgba(243, 238, 232, 0.16)"
                strokeWidth="1.4"
              />

              <g
                style={{
                  transform: hovered ? "rotate(-20deg)" : "rotate(-3deg)",
                  transformOrigin: "0px 52px",
                  transition: "transform 780ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <path
                  d="M 0 50 L -58 26 L -58 -44 L 0 -22 Z"
                  fill="rgba(162, 100, 157, 0.18)"
                  stroke={brandPalette.pink}
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                <path
                  d="M 0 46 L -46 24 L -46 -36 L 0 -17 Z"
                  fill="rgba(243, 238, 232, 0.9)"
                  stroke="rgba(243, 238, 232, 0.22)"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                  style={{
                    transform: hovered ? `rotate(${-pageSwing}deg)` : "rotate(0deg)",
                    transformOrigin: "0px 46px",
                    transition: "transform 680ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
                {[0, 1, 2].map((index) => (
                  <line
                    key={`left-line-${index}`}
                    x1={-34}
                    y1={-15 + index * 13}
                    x2={-10 + lineShift + index * 1.6}
                    y2={-12 + index * 12}
                    stroke="rgba(77, 67, 75, 0.34)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                ))}
              </g>

              <g
                style={{
                  transform: hovered ? "rotate(20deg)" : "rotate(3deg)",
                  transformOrigin: "0px 52px",
                  transition: "transform 780ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <path
                  d="M 0 50 L 58 26 L 58 -44 L 0 -22 Z"
                  fill="rgba(180, 159, 0, 0.16)"
                  stroke={brandPalette.yellow}
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                <path
                  d="M 0 46 L 46 24 L 46 -36 L 0 -17 Z"
                  fill="rgba(243, 238, 232, 0.9)"
                  stroke="rgba(243, 238, 232, 0.22)"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                  style={{
                    transform: hovered ? `rotate(${pageSwing}deg)` : "rotate(0deg)",
                    transformOrigin: "0px 46px",
                    transition: "transform 680ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
                {[0, 1, 2].map((index) => (
                  <line
                    key={`right-line-${index}`}
                    x1={10 - lineShift - index * 1.6}
                    y1={-12 + index * 12}
                    x2={34}
                    y2={-15 + index * 13}
                    stroke="rgba(77, 67, 75, 0.34)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                ))}
              </g>

              <path
                d="M 0 50 L 0 -22"
                stroke="rgba(243, 238, 232, 0.24)"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </g>
          </g>

          <g opacity="0.88">
            <rect
              x="116"
              y="208"
              width="88"
              height="22"
              rx="8"
              fill="rgba(243, 238, 232, 0.03)"
              stroke="rgba(243, 238, 232, 0.12)"
              strokeWidth="1.4"
            />
            <rect x="130" y="214" width="16" height="10" fill={`${brandPalette.blue}AA`} />
            <rect x="152" y="214" width="16" height="10" fill={`${brandPalette.pink}AA`} />
            <rect x="174" y="214" width="16" height="10" fill={`${brandPalette.yellow}AA`} />
          </g>

          <text
            x="160"
            y="286"
            fill="rgba(243, 238, 232, 0.5)"
            fontFamily="var(--font-fugue-mono), monospace"
            fontSize="11"
            fontWeight="500"
            letterSpacing="0.22em"
            textAnchor="middle"
          >
            open archive
          </text>
        </g>
      </svg>
    </div>
  );
}
