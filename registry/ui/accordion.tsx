"use client";
import * as React from "react";
import { Accordion as Base } from "@base-ui/react/accordion";
import { cn } from "@/lib/utils";
export function Accordion({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Root>) {
  return <Base.Root className={cn("w-full", className)} {...props} />;
}
export function AccordionItem({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Item>) {
  return (
    <Base.Item className={cn("border-b border-border", className)} {...props} />
  );
}
export function AccordionTrigger({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Trigger>) {
  return (
    <Base.Trigger
      className={cn(
        "flex w-full items-center justify-between py-4 text-left text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50 data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
export function AccordionContent({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Panel>) {
  return (
    <Base.Panel
      className={cn("pb-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
export const AccordionHeader = Base.Header;
