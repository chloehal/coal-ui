import * as React from "react";
import { cn } from "@/lib/utils";
export function NativeSelect({
  className,
  ...props
}: React.ComponentPropsWithRef<"select">) {
  return (
    <select
      className={cn(
        "h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
