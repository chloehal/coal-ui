import * as React from "react";

/** Fixed square blocks; only their opacity moves around the ring. */
export function LoadingGlyph() {
  return (
    <svg
      className="coal-loading-glyph"
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {[8, 12].flatMap((radius, ring) =>
        Array.from({ length: 16 }, (_, i) => {
          const angle = (i * Math.PI) / 8 - Math.PI / 2;
          return (
            <rect
              key={`${ring}-${i}`}
              x={Number((16 + Math.cos(angle) * radius - 1.1).toFixed(3))}
              y={Number((16 + Math.sin(angle) * radius - 1.1).toFixed(3))}
              width="2.2"
              height="2.2"
              style={
                {
                  "--coal-block-phase": `${-1 + i / 16}`,
                } as React.CSSProperties
              }
            />
          );
        }),
      )}
    </svg>
  );
}
