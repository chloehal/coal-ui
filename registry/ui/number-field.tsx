"use client";
import * as React from "react";
import { NumberField as Base } from "@base-ui/react/number-field";
import { cn } from "@/lib/utils";
export function NumberField({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Root>) {
  return <Base.Root className={cn("grid gap-2", className)} {...props} />;
}
export function NumberFieldGroup({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Group>) {
  return (
    <Base.Group
      className={cn(
        "flex overflow-hidden rounded-md border border-input",
        className,
      )}
      {...props}
    />
  );
}
export function NumberFieldInput({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Input>) {
  return (
    <Base.Input
      className={cn(
        "h-9 w-16 bg-transparent text-center text-sm outline-none focus:bg-muted",
        className,
      )}
      {...props}
    />
  );
}
export function NumberFieldIncrement({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Increment>) {
  return (
    <Base.Increment
      className={cn(
        "w-9 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50 data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
export function NumberFieldDecrement({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Decrement>) {
  return (
    <Base.Decrement
      className={cn(
        "w-9 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50 data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
