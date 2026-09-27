"use client";
import * as React from "react";
import { Checkbox as Base } from "@base-ui/react/checkbox";
import { cn } from "@/lib/utils";
export function Checkbox({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Root>) {
  return (
    <Base.Root
      className={cn(
        "flex size-4 items-center justify-center rounded-[4px] border border-input bg-background text-primary-foreground data-[checked]:bg-primary data-[indeterminate]:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50 data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
export function CheckboxIndicator({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Indicator>) {
  return (
    <Base.Indicator
      className={cn("text-xs leading-none", className)}
      {...props}
    />
  );
}
