import * as React from "react";
import { cn } from "./internal.js";
import { LoadingGlyph } from "./loading-glyph.js";
export type SpinnerProps = React.ComponentPropsWithRef<"span"> & {
  size?: number;
};
export function Spinner({
  className,
  size = 24,
  style,
  ...props
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn("coal-spinner", className)}
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <LoadingGlyph size={size} />
    </span>
  );
}
