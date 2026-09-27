import * as React from "react";
import { cn } from "@/lib/utils";
export function Breadcrumb({
  className,
  ...props
}: React.ComponentPropsWithRef<"nav">) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
