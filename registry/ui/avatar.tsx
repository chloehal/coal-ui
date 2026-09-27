"use client";
import * as React from "react";
import { Avatar as Base } from "@base-ui/react/avatar";
import { cn } from "@/lib/utils";
export function Avatar({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Root>) {
  return (
    <Base.Root
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-secondary text-xs font-medium",
        className,
      )}
      {...props}
    />
  );
}
export function AvatarImage({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Image>) {
  return (
    <Base.Image
      className={cn("size-full object-cover", className)}
      {...props}
    />
  );
}
export function AvatarFallback({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Fallback>) {
  return (
    <Base.Fallback
      className={cn("flex size-full items-center justify-center", className)}
      {...props}
    />
  );
}
