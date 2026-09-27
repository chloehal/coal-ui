"use client";
import * as React from "react";
import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { cn } from "@/lib/utils";
export function Toggle({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof BaseToggle>) {
  return (
    <BaseToggle
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md border border-transparent text-sm hover:bg-muted data-[pressed]:border-border data-[pressed]:bg-secondary focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
