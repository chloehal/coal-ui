"use client";
import * as React from "react";
import { Slider as Base } from "@base-ui/react/slider";
import { cn } from "@/lib/utils";
export function Slider({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Root>) {
  return <Base.Root className={cn("w-full", className)} {...props} />;
}
export function SliderControl({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Control>) {
  return (
    <Base.Control
      className={cn("flex h-5 items-center", className)}
      {...props}
    />
  );
}
export function SliderTrack({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Track>) {
  return (
    <Base.Track
      className={cn("relative h-1 w-full rounded-full bg-muted", className)}
      {...props}
    />
  );
}
export function SliderIndicator({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Indicator>) {
  return (
    <Base.Indicator
      className={cn("rounded-full bg-primary", className)}
      {...props}
    />
  );
}
export function SliderThumb({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Thumb>) {
  return (
    <Base.Thumb
      className={cn(
        "size-3.5 rounded-full border border-primary bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50 data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
export const SliderValue = Base.Value;
