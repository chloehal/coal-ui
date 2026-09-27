"use client";
import * as React from "react";
import { Popover as Base } from "@base-ui/react/popover";
import { cn } from "@/lib/utils";
export function PopoverTrigger({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Trigger>) {
  return (
    <Base.Trigger
      className={cn(
        "inline-flex items-center gap-2 rounded-md text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50 data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
export const Popover = Base.Root;
export const PopoverPortal = Base.Portal;
export const PopoverPositioner = Base.Positioner;
export function PopoverContent({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Popup>) {
  return (
    <Base.Portal>
      <Base.Positioner sideOffset={6} className="z-50">
        <Base.Popup
          className={cn(
            "min-w-44 rounded-lg border border-border bg-popover p-2 text-sm text-popover-foreground shadow-lg outline-none",
            className,
          )}
          {...props}
        />
      </Base.Positioner>
    </Base.Portal>
  );
}
export const PopoverTitle = Base.Title;
export const PopoverDescription = Base.Description;
export const PopoverClose = Base.Close;
