import * as React from "react";
import { cn } from "./internal.js";
export type SeparatorProps = React.ComponentPropsWithRef<"hr">;
export function Separator({ className, ...props }: SeparatorProps) {
  return <hr className={cn("coal-separator", className)} {...props} />;
}
