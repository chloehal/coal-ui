import * as React from "react";
import { cn } from "./internal.js";
export type LabelProps = React.ComponentPropsWithRef<"label">;
export function Label({ className, ...props }: LabelProps) {
  return <label className={cn("coal-label", className)} {...props} />;
}
