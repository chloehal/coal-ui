import * as React from "react";
import { cn } from "@/lib/utils";
export function Progress({
  className,
  ...props
}: React.ComponentPropsWithRef<"progress">) {
  return (
    <progress
      max={100}
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full bg-muted accent-primary [&::-webkit-progress-bar]:bg-muted [&::-webkit-progress-value]:bg-primary [&::-moz-progress-bar]:bg-primary",
        className,
      )}
      {...props}
    />
  );
}
