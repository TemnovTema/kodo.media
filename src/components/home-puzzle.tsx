import type { CSSProperties } from "react";

// Coordinates follow the two diagonal branches from the edge toward the centre.
const rightTiles = [
  [5, 0], [4, 1], [3, 2], [2, 3], [1, 2], [0, 3],
  [4, 3], [5, 4], [3, 4], [4, 5], [5, 6], [3, 6],
  [2, 7], [3, 8], [4, 7], [4, 9],
];

const leftTiles = [
  [0, 9], [1, 8], [2, 7], [3, 8], [4, 7], [3, 6],
  [4, 5], [1, 6], [0, 5], [2, 5], [1, 4], [0, 3],
  [2, 3], [1, 2], [0, 1], [2, 1], [1, 0],
];

export function HomePuzzle() {
  return (
    <div className="home-puzzle" aria-hidden="true">
      {([ ["right", rightTiles], ["left", leftTiles] ] as const).map(([side, tiles]) => (
        <div className={`home-puzzle-cluster home-puzzle-${side}`} key={side}>
          {tiles.map(([x, y], index) => (
            <span
              key={`${x}-${y}`}
              className="home-puzzle-tile"
              style={{
                "--tile-x": x,
                "--tile-y": y,
                "--tile-delay": `${380 + index * 110 + (side === "left" ? 55 : 0)}ms`,
              } as CSSProperties}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
