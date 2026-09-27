import * as React from "react";
import { cn } from "@/lib/utils";
export function Separator({
  className,
  ...props
}: React.ComponentPropsWithRef<"hr">) {
  return (
    <hr
      className={cn("w-full border-0 border-t border-border", className)}
      {...props}
    />
  );
}
