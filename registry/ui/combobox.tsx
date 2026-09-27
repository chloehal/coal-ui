"use client";
import * as React from "react";
import { Combobox as Base } from "@base-ui/react/combobox";
import { cn } from "@/lib/utils";
export const Combobox = Base.Root;
export const ComboboxLabel = Base.Label;
export const ComboboxList = Base.List;
export const ComboboxValue = Base.Value;
export const ComboboxChips = Base.Chips;
export const ComboboxChip = Base.Chip;
export const ComboboxChipRemove = Base.ChipRemove;
export function ComboboxInput({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Input>) {
  return (
    <Base.Input
      className={cn(
        "h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
export function ComboboxContent({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Popup>) {
  return (
    <Base.Portal>
      <Base.Positioner sideOffset={6} className="z-50">
        <Base.Popup
          className={cn(
            "max-h-64 w-[var(--anchor-width)] min-w-48 overflow-auto rounded-lg border bg-popover p-1 text-popover-foreground shadow-lg",
            className,
          )}
          {...props}
        />
      </Base.Positioner>
    </Base.Portal>
  );
}
export function ComboboxItem({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Item>) {
  return (
    <Base.Item
      className={cn(
        "cursor-default rounded px-3 py-2 text-sm outline-none data-[highlighted]:bg-muted data-[selected]:font-medium data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
export function ComboboxEmpty({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Empty>) {
  return (
    <Base.Empty
      className={cn(
        "p-3 text-sm text-muted-foreground empty:hidden",
        className,
      )}
      {...props}
    />
  );
}
