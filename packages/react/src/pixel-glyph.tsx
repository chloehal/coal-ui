import * as React from "react";
const shapes = {
  check: ["00001", "00010", "10100", "01000", "00000"],
  minus: ["00000", "00000", "11111", "00000", "00000"],
  seed: ["01110", "11111", "11111", "11111", "01110"],
};
/** Functional micro-shapes built from square cells, kept decorative for AT. */
export function PixelGlyph({
  shape = "seed",
}: {
  shape?: keyof typeof shapes;
}) {
  return (
    <svg
      className="coal-pixel-glyph"
      viewBox="0 0 19 19"
      aria-hidden="true"
      focusable="false"
    >
      {shapes[shape].flatMap((row, y) =>
        [...row].map((cell, x) =>
          cell === "1" ? (
            <rect
              key={`${x}-${y}`}
              x={x * 4}
              y={y * 4}
              width={3}
              height={3}
              fill="currentColor"
              style={{ "--cell": x + y } as React.CSSProperties}
            />
          ) : null,
        ),
      )}
    </svg>
  );
}
