"use client";
import * as React from "react";
import { DialogContent } from "./dialog.js";
import { cn } from "./internal.js";
export {
  Dialog as Sheet,
  DialogTrigger as SheetTrigger,
  DialogTitle as SheetTitle,
  DialogDescription as SheetDescription,
  DialogClose as SheetClose,
} from "./dialog.js";
export function SheetContent({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof DialogContent>) {
  return <DialogContent className={cn("coal-sheet", className)} {...props} />;
}
