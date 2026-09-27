"use client";
import * as React from "react";
import { Menu as Base } from "@base-ui/react/menu";
import { cn } from "@/lib/utils";
export function DropdownMenuTrigger({
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
export const DropdownMenu = Base.Root;
export const DropdownMenuPortal = Base.Portal;
export const DropdownMenuPositioner = Base.Positioner;
export function DropdownMenuContent({
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
export function DropdownMenuItem({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Item>) {
  return (
    <Base.Item
      className={cn(
        "cursor-default rounded px-2 py-1.5 outline-none data-[highlighted]:bg-muted data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
export const DropdownMenuSeparator = Base.Separator;
export const DropdownMenuGroup = Base.Group;
export const DropdownMenuGroupLabel = Base.GroupLabel;
