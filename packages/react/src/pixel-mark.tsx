import * as React from "react";
import { PIXEL_SIZE, PIXEL_STEP } from "./pixel-grid.js";
import { cn } from "./internal.js";

export type PixelMarkProps = React.ComponentPropsWithRef<"svg"> & {
  size?: number;
  variant?: "bloom" | "seed";
};

/** An organic silhouette sampled onto a square grid. No raster asset or random render state. */
export function PixelMark({
  size = 48,
  variant = "bloom",
  className,
  style,
  ...props
}: PixelMarkProps) {
  const cells: React.ReactNode[] = [];
  const count = Math.max(1, Math.floor(size / PIXEL_STEP));
  const offset = Math.floor((size - (count * PIXEL_STEP - 1)) / 2);
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      const x = ((col - (count - 1) / 2) / count) * 21,
        y = ((row - (count - 1) / 2) / count) * 21;
      const angle = Math.atan2(y, x);
      const distance = Math.hypot(x, y);
      const edge =
        variant === "bloom"
          ? 7.8 + 1.1 * Math.sin(3 * angle + 0.5) + 0.7 * Math.cos(5 * angle)
          : 7.3 + 1.1 * Math.sin(angle - 0.6) + 0.5 * Math.sin(3 * angle);
      if (distance > edge || (variant === "bloom" && distance < 2.2)) continue;
      cells.push(
        <rect
          key={`${row}-${col}`}
          x={col * PIXEL_STEP + offset}
          y={row * PIXEL_STEP + offset}
          width={PIXEL_SIZE}
          height={PIXEL_SIZE}
          opacity={0.38 + 0.62 * Math.max(0, 1 - distance / (edge + 1))}
          style={
            {
              "--coal-cell-delay": `${Math.round(distance * 22)}ms`,
            } as React.CSSProperties
          }
        />,
      );
    }
  }
  return (
    <svg
      {...props}
      className={cn("coal-pixel-mark", className)}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      style={{ ...style }}
    >
      {cells}
    </svg>
  );
}
