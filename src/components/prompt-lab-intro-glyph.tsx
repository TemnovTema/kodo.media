import { brandPalette } from "@/lib/brand";

type PromptLabIntroGlyphProps = {
  className?: string;
};

const lineWidth = 2;

export function PromptLabIntroGlyph({
  className = "",
}: PromptLabIntroGlyphProps) {
  return (
    <div
      aria-hidden="true"
      className={`prompt-lab-intro-glyph absolute inset-0 ${className}`}
    >
      <style>{`
        @keyframes prompt-lab-bubble {
          0% {
            opacity: 0;
            transform: translateY(8px) scale(0.72);
          }
          18% {
            opacity: 0.92;
          }
          78% {
            opacity: 0.76;
          }
          100% {
            opacity: 0;
            transform: translateY(-28px) scale(1);
          }
        }

        @keyframes prompt-lab-steam {
          0% {
            opacity: 0;
            transform: translate(0, 7px);
          }
          25% {
            opacity: 0.48;
          }
          100% {
            opacity: 0;
            transform: translate(3px, -10px);
          }
        }

        @keyframes prompt-lab-microscope {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-3px) rotate(-1deg);
          }
        }

        .prompt-lab-intro-glyph .prompt-lab-bubble,
        .prompt-lab-intro-glyph .prompt-lab-steam {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }

        .prompt-lab-intro-glyph .prompt-lab-microscope {
          transform-box: fill-box;
          transform-origin: center bottom;
        }

        .prompt-lab-intro-glyph:hover .prompt-lab-bubble {
          animation: prompt-lab-bubble 1.5s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }

        .prompt-lab-intro-glyph:hover .prompt-lab-bubble--two {
          animation-delay: 240ms;
        }

        .prompt-lab-intro-glyph:hover .prompt-lab-bubble--three {
          animation-delay: 480ms;
        }

        .prompt-lab-intro-glyph:hover .prompt-lab-bubble--four {
          animation-delay: 720ms;
        }

        .prompt-lab-intro-glyph:hover .prompt-lab-steam {
          animation: prompt-lab-steam 1.8s ease-out infinite;
        }

        .prompt-lab-intro-glyph:hover .prompt-lab-steam--two {
          animation-delay: 520ms;
        }

        .prompt-lab-intro-glyph:hover .prompt-lab-microscope {
          animation: prompt-lab-microscope 1.6s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .prompt-lab-intro-glyph:hover .prompt-lab-bubble,
          .prompt-lab-intro-glyph:hover .prompt-lab-steam,
          .prompt-lab-intro-glyph:hover .prompt-lab-microscope {
            animation: none;
          }

          .prompt-lab-intro-glyph:hover .prompt-lab-bubble,
          .prompt-lab-intro-glyph:hover .prompt-lab-steam {
            opacity: 0.72;
          }
        }
      `}</style>
      <svg
        viewBox="0 0 320 320"
        className="h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="translate(0 6)">
          <g>
            <path
              className="prompt-lab-steam prompt-lab-steam--one"
              d="M 78 143 C 72 135 84 130 78 121"
              stroke="rgba(243, 238, 232, 0.56)"
              strokeWidth={lineWidth}
              strokeLinecap="round"
            />
            <path
              className="prompt-lab-steam prompt-lab-steam--two"
              d="M 101 143 C 107 136 95 130 101 121"
              stroke="rgba(243, 238, 232, 0.4)"
              strokeWidth={lineWidth}
              strokeLinecap="round"
            />
            <path
              d="M 57 148 H 117"
              stroke="rgba(243, 238, 232, 0.74)"
              strokeWidth={lineWidth}
              strokeLinecap="round"
            />
            <path
              d="M 70 152 V 193 L 43 245 C 38 255 45 266 56 266 H 118 C 129 266 136 255 131 245 L 104 193 V 152"
              fill="rgba(162, 100, 157, 0.1)"
              stroke={brandPalette.pink}
              strokeWidth={lineWidth}
              strokeLinejoin="round"
            />
            <path
              d="M 55 232 H 123"
              stroke="rgba(243, 238, 232, 0.28)"
              strokeWidth={lineWidth}
              strokeLinecap="round"
            />
            <circle
              className="prompt-lab-bubble prompt-lab-bubble--one"
              cx="77"
              cy="251"
              r="3"
              fill={brandPalette.blue}
            />
            <circle
              className="prompt-lab-bubble prompt-lab-bubble--two"
              cx="95"
              cy="254"
              r="5"
              fill={brandPalette.yellow}
            />
            <circle
              className="prompt-lab-bubble prompt-lab-bubble--three"
              cx="108"
              cy="247"
              r="3.5"
              fill={brandPalette.green}
            />
            <circle
              className="prompt-lab-bubble prompt-lab-bubble--four"
              cx="88"
              cy="260"
              r="2.5"
              fill={brandPalette.pink}
            />
          </g>

          <g className="prompt-lab-microscope" opacity="0.96">
            <path
              d="M 215 221 C 251 211 251 164 219 150"
              stroke={brandPalette.green}
              strokeWidth={lineWidth}
              strokeLinecap="round"
            />

            <g transform="rotate(22 192 150)">
              <rect
                x="178"
                y="76"
                width="53"
                height="20"
                rx="4"
                fill="rgba(243, 238, 232, 0.04)"
                stroke="rgba(243, 238, 232, 0.76)"
                strokeWidth={lineWidth}
              />
              <path
                d="M 195 96 V 118 H 213 V 96"
                stroke="rgba(243, 238, 232, 0.64)"
                strokeWidth={lineWidth}
                strokeLinejoin="round"
              />
              <rect
                x="179"
                y="118"
                width="50"
                height="78"
                rx="6"
                fill="rgba(96, 135, 194, 0.13)"
                stroke={brandPalette.blue}
                strokeWidth={lineWidth}
              />
              <path
                d="M 179 196 H 229 V 211 H 179 Z"
                fill="rgba(243, 238, 232, 0.04)"
                stroke="rgba(243, 238, 232, 0.72)"
                strokeWidth={lineWidth}
                strokeLinejoin="round"
              />
            </g>

            <path
              d="M 157 217 L 215 239"
              stroke="rgba(243, 238, 232, 0.62)"
              strokeWidth={lineWidth}
              strokeLinecap="round"
            />
            <circle
              cx="215"
              cy="232"
              r="28"
              fill="rgba(6, 6, 9, 0.8)"
              stroke="rgba(243, 238, 232, 0.72)"
              strokeWidth={lineWidth}
            />
            <circle
              cx="215"
              cy="232"
              r="17"
              stroke={brandPalette.green}
              strokeWidth={lineWidth}
            />
            <path
              d="M 161 267 H 266 Q 273 267 273 274 V 280 H 153 Z"
              fill="rgba(243, 238, 232, 0.04)"
              stroke="rgba(243, 238, 232, 0.72)"
              strokeWidth={lineWidth}
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
