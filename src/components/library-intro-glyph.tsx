import { brandPalette } from "@/lib/brand";

type LibraryIntroGlyphProps = {
  className?: string;
};

export function LibraryIntroGlyph({
  className = "",
}: LibraryIntroGlyphProps) {
  return (
    <div
      aria-hidden="true"
      className={`library-intro-glyph absolute inset-0 ${className}`}
    >
      <style>{`
        @keyframes library-book-riffle {
          0%, 62%, 100% {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
          20% {
            transform: translateX(7px) translateY(-5px) rotate(2deg);
          }
          42% {
            transform: translateX(2px) translateY(-1px) rotate(0.5deg);
          }
        }

        .library-intro-glyph .library-book {
          transform-box: fill-box;
          transform-origin: center bottom;
        }

        .library-intro-glyph:hover .library-book {
          animation: library-book-riffle 1.05s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .library-intro-glyph:hover .library-book--two {
          animation-delay: 120ms;
        }

        .library-intro-glyph:hover .library-book--three {
          animation-delay: 240ms;
        }

        .library-intro-glyph:hover .library-book--four {
          animation-delay: 360ms;
        }

        @media (prefers-reduced-motion: reduce) {
          .library-intro-glyph:hover .library-book {
            animation: none;
          }
        }
      `}</style>
      <svg
        viewBox="0 0 320 320"
        className="h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="translate(0 4)">
          <g className="library-book library-book--one">
            <rect
              x="62"
              y="184"
              width="38"
              height="62"
              rx="5"
              fill="rgba(96, 135, 194, 0.12)"
              stroke={brandPalette.blue}
              strokeWidth="2"
            />
            <line
              x1="74"
              y1="197"
              x2="74"
              y2="234"
              stroke={brandPalette.blue}
              strokeWidth="1.6"
            />
            <line
              x1="84"
              y1="197"
              x2="84"
              y2="234"
              stroke="rgba(243, 238, 232, 0.3)"
              strokeWidth="1.2"
            />
            <line
              x1="92"
              y1="197"
              x2="92"
              y2="234"
              stroke="rgba(243, 238, 232, 0.14)"
              strokeWidth="1.2"
            />
          </g>

          <g className="library-book library-book--two">
            <rect
              x="108"
              y="170"
              width="38"
              height="76"
              rx="5"
              fill="rgba(162, 100, 157, 0.13)"
              stroke={brandPalette.pink}
              strokeWidth="2"
            />
            <line
              x1="120"
              y1="183"
              x2="120"
              y2="234"
              stroke={brandPalette.pink}
              strokeWidth="1.6"
            />
            <line
              x1="130"
              y1="183"
              x2="130"
              y2="234"
              stroke="rgba(243, 238, 232, 0.32)"
              strokeWidth="1.2"
            />
            <line
              x1="138"
              y1="183"
              x2="138"
              y2="234"
              stroke="rgba(243, 238, 232, 0.14)"
              strokeWidth="1.2"
            />
          </g>

          <g className="library-book library-book--three">
            <rect
              x="154"
              y="156"
              width="38"
              height="90"
              rx="5"
              fill="rgba(180, 159, 0, 0.12)"
              stroke={brandPalette.yellow}
              strokeWidth="2"
            />
            <line
              x1="166"
              y1="169"
              x2="166"
              y2="234"
              stroke={brandPalette.yellow}
              strokeWidth="1.6"
            />
            <line
              x1="176"
              y1="169"
              x2="176"
              y2="234"
              stroke="rgba(243, 238, 232, 0.32)"
              strokeWidth="1.2"
            />
            <line
              x1="184"
              y1="169"
              x2="184"
              y2="234"
              stroke="rgba(243, 238, 232, 0.14)"
              strokeWidth="1.2"
            />
          </g>

          <g className="library-book library-book--four">
            <rect
              x="200"
              y="142"
              width="38"
              height="104"
              rx="5"
              fill="rgba(91, 137, 75, 0.12)"
              stroke={brandPalette.green}
              strokeWidth="2"
            />
            <line
              x1="212"
              y1="155"
              x2="212"
              y2="234"
              stroke={brandPalette.green}
              strokeWidth="1.6"
            />
            <line
              x1="222"
              y1="155"
              x2="222"
              y2="234"
              stroke="rgba(243, 238, 232, 0.32)"
              strokeWidth="1.2"
            />
            <line
              x1="230"
              y1="155"
              x2="230"
              y2="234"
              stroke="rgba(243, 238, 232, 0.14)"
              strokeWidth="1.2"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
