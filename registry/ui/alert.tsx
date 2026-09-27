import * as React from "react";
import { cn } from "@/lib/utils";
export function Alert({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      role="status"
      className={cn(
        "relative rounded-lg border border-border border-l-2 border-l-brand bg-card p-4 text-sm",
        className,
      )}
      {...props}
    />
  );
}
