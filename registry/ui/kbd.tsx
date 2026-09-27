import * as React from "react";
import { cn } from "@/lib/utils";
export function Kbd({
  className,
  ...props
}: React.ComponentPropsWithRef<"kbd">) {
  return (
    <kbd
      className={cn(
        "inline-flex min-w-5 items-center justify-center rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
