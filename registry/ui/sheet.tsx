"use client";
import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";
export {
  Dialog as Sheet,
  DialogTrigger as SheetTrigger,
  DialogTitle as SheetTitle,
  DialogDescription as SheetDescription,
  DialogClose as SheetClose,
} from "@/components/ui/dialog";
export function SheetContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof BaseDialog.Popup>) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="fixed inset-0 z-50 bg-black/40" />
      <BaseDialog.Popup
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-[min(90vw,400px)] overflow-y-auto border-l bg-background p-6 shadow-lg",
          className,
        )}
        {...props}
      >
        {children}
        <BaseDialog.Close
          aria-label="Close panel"
          className="absolute right-4 top-4 rounded p-1 focus-visible:outline-2"
        >
          ×
        </BaseDialog.Close>
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}
