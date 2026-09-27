"use client";
import * as React from "react";
import { AlertDialog as Base } from "@base-ui/react/alert-dialog";
import { cn } from "@/lib/utils";
export const AlertDialog = Base.Root;
export const AlertDialogTrigger = Base.Trigger;
export const AlertDialogTitle = Base.Title;
export const AlertDialogDescription = Base.Description;
export const AlertDialogClose = Base.Close;
export function AlertDialogContent({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Popup>) {
  return (
    <Base.Portal>
      <Base.Backdrop className="fixed inset-0 z-50 bg-black/40" />
      <Base.Popup
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-background p-6 shadow-lg",
          className,
        )}
        {...props}
      />
    </Base.Portal>
  );
}
