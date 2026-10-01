import * as React from "react";
import { cn } from "./internal.js";
import { PixelMark } from "./pixel-mark.js";
export type EmptyProps = React.ComponentPropsWithRef<"div"> & {
  motif?: boolean;
};
export function Empty({
  className,
  children,
  motif = true,
  ...props
}: EmptyProps) {
  return (
    <div className={cn("coal-empty", className)} {...props}>
      {motif && <PixelMark size={44} variant="seed" />}
      {children}
    </div>
  );
}
