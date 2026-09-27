import * as React from "react";
import { cn } from "@/lib/utils";
export function ButtonGroup({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      role="group"
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border bg-card p-1",
        className,
      )}
      {...props}
    />
  );
}
