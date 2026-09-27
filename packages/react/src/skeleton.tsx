import * as React from "react";
import { cn } from "./internal.js";
export type SkeletonProps = React.ComponentPropsWithRef<"div">;
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("coal-skeleton", className)}
      {...props}
    />
  );
}
