import * as React from "react";
import { cn } from "./internal.js";
export function Progress({
  className,
  ...props
}: React.ComponentPropsWithRef<"progress">) {
  return (
    <progress max={100} className={cn("coal-progress", className)} {...props} />
  );
}
