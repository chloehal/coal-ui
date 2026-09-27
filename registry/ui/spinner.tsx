import * as React from "react";
import { cn } from "@/lib/utils";
export function Spinner({
  className,
  ...props
}: React.ComponentPropsWithRef<"span">) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn("inline-flex", className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
      />
    </span>
  );
}
