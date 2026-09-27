"use client";
import * as React from "react";
import { Switch as Base } from "@base-ui/react/switch";
import { cn } from "@/lib/utils";
export function Switch({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Root>) {
  return (
    <Base.Root
      className={cn(
        "group inline-flex h-5 w-9 items-center rounded-full border border-input bg-muted p-0.5 data-[checked]:bg-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50 data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
export function SwitchThumb({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Thumb>) {
  return (
    <Base.Thumb
      className={cn(
        "size-3.5 rounded-full bg-background shadow-sm transition-transform data-[checked]:translate-x-4",
        className,
      )}
      {...props}
    />
  );
}
