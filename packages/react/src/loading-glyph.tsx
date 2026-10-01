import * as React from "react";
import { PIXEL_SIZE, PIXEL_STEP } from "./pixel-grid.js";

/** Fixed-size cells on a common grid; only opacity travels around the ring. */
export function LoadingGlyph({ size = 16 }: { size?: number }) {
  const count = Math.max(2, Math.floor(size / PIXEL_STEP));
  const offset = Math.floor((size - (count * PIXEL_STEP - 1)) / 2);
  const cells: React.ReactNode[] = [];
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      const x = col - (count - 1) / 2;
      const y = row - (count - 1) / 2;
      const distance = Math.hypot(x, y);
      if (distance > count / 2 || distance < Math.max(0, count / 2 - 2))
        continue;
      const phase = (Math.atan2(y, x) + Math.PI) / (Math.PI * 2);
      cells.push(
        <rect
          key={`${row}-${col}`}
          x={offset + col * PIXEL_STEP}
          y={offset + row * PIXEL_STEP}
          width={PIXEL_SIZE}
          height={PIXEL_SIZE}
          style={
            { "--coal-block-phase": `${phase - 1}` } as React.CSSProperties
          }
        />,
      );
    }
  }
  return (
    <svg
      className="coal-loading-glyph"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {cells}
    </svg>
  );
}
