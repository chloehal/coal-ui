import * as React from "react";
import { cn } from "./internal.js";
export function Spinner({
  className,
  ...props
}: React.ComponentPropsWithRef<"span">) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn("coal-spinner", className)}
      {...props}
    >
      <span aria-hidden="true" />
    </span>
  );
}
