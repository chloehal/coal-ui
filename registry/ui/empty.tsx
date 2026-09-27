import * as React from "react";
import { cn } from "@/lib/utils";
export function Empty({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
