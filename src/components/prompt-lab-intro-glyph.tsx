"use client";

import { useState } from "react";
import { brandPalette } from "@/lib/brand";

type PromptLabIntroGlyphProps = {
  className?: string;
};

export function PromptLabIntroGlyph({
  className = "",
}: PromptLabIntroGlyphProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <svg
        viewBox="0 0 320 320"
        className="h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <line
          x1="44"
          y1="246"
          x2="276"
          y2="246"
          stroke="rgba(243, 238, 232, 0.12)"
          strokeWidth="2"
        />

        <g
          style={{
            transform: hovered ? "translateY(-4px)" : "translateY(0px)",
            transformOrigin: "160px 160px",
            transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <rect
            x="100"
            y="178"
            width="120"
            height="44"
            rx="12"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(243, 238, 232, 0.16)"
            strokeWidth="1.6"
          />

          <path
            d="M122 178 V104 H150 V178"
            stroke={brandPalette.blue}
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path
            d="M170 178 V116 H198 V178"
            stroke={brandPalette.pink}
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path
            d="M126 104 H146 L154 148 H118 Z"
            fill="rgba(96, 135, 194, 0.08)"
            stroke={brandPalette.blue}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M174 116 H194 L202 154 H166 Z"
            fill="rgba(162, 100, 157, 0.08)"
            stroke={brandPalette.pink}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          <g
            style={{
              transform: hovered ? "translateY(-7px)" : "translateY(0px)",
              transition: "transform 620ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <circle cx="134" cy="136" r="4" fill={brandPalette.green} opacity={hovered ? 0.92 : 0.68} />
            <circle cx="184" cy="142" r="4" fill={brandPalette.yellow} opacity={hovered ? 0.92 : 0.68} />
            <circle cx="146" cy="126" r="3.4" fill={brandPalette.blue} opacity={hovered ? 0.88 : 0.62} />
            <circle cx="194" cy="130" r="3.4" fill={brandPalette.pink} opacity={hovered ? 0.88 : 0.62} />
          </g>

          <rect
            x="132"
            y="192"
            width="56"
            height="16"
            rx="6"
            fill="rgba(243, 238, 232, 0.05)"
            stroke="rgba(243, 238, 232, 0.12)"
            strokeWidth="1.3"
          />
          <rect x="140" y="197" width="8" height="6" fill={`${brandPalette.blue}CC`} />
          <rect x="152" y="197" width="8" height="6" fill={`${brandPalette.green}CC`} />
          <rect x="164" y="197" width="8" height="6" fill={`${brandPalette.yellow}CC`} />
          <rect x="176" y="197" width="8" height="6" fill={`${brandPalette.pink}CC`} />

          <g opacity="0.92">
            <path
              d="M66 162 H98"
              stroke="rgba(243, 238, 232, 0.18)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M222 162 H254"
              stroke="rgba(243, 238, 232, 0.18)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <text
              x="82"
              y="154"
              fill={brandPalette.green}
              fontFamily="var(--font-fugue-mono), monospace"
              fontSize="14"
              letterSpacing="0.06em"
              textAnchor="middle"
            >
              {`{ }`}
            </text>
            <text
              x="238"
              y="154"
              fill={brandPalette.yellow}
              fontFamily="var(--font-fugue-mono), monospace"
              fontSize="14"
              letterSpacing="0.06em"
              textAnchor="middle"
            >
              {`[ ]`}
            </text>
          </g>
        </g>

        <text
          x="160"
          y="284"
          fill="rgba(243, 238, 232, 0.5)"
          fontFamily="var(--font-fugue-mono), monospace"
          fontSize="11"
          fontWeight="500"
          letterSpacing="0.22em"
          textAnchor="middle"
        >
          prompt lab
        </text>
      </svg>
    </div>
  );
}
