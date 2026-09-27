"use client";
import * as React from "react";
import { Field as Base } from "@base-ui/react/field";
import { cn } from "@/lib/utils";
export function Field({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Root>) {
  return <Base.Root className={cn("grid gap-2", className)} {...props} />;
}
export function FieldLabel({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Label>) {
  return (
    <Base.Label className={cn("text-sm font-medium", className)} {...props} />
  );
}
export function FieldDescription({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Description>) {
  return (
    <Base.Description
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}
export function FieldError({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Error>) {
  return (
    <Base.Error
      className={cn("text-xs text-destructive", className)}
      {...props}
    />
  );
}
export const FieldControl = Base.Control;
