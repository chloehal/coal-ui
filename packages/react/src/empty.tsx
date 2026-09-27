import * as React from "react";
import { cn } from "./internal.js";
export type EmptyProps = React.ComponentPropsWithRef<"div">;
export function Empty({ className, ...props }: EmptyProps) {
  return <div className={cn("coal-empty", className)} {...props} />;
}
