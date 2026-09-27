"use client";
import * as React from "react";
import { Collapsible as Base } from "@base-ui/react/collapsible";
import { cn } from "@/lib/utils";
export function CollapsibleContent({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Panel>) {
  return (
    <Base.Panel
      className={cn("py-3 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
export const Collapsible = Base.Root;
export const CollapsibleTrigger = Base.Trigger;
