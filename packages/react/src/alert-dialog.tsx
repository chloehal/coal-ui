"use client";
import { Dialog, type DialogProps } from "./dialog.js";
export function AlertDialog(props: Omit<DialogProps, "alert">) {
  return <Dialog alert {...props} />;
}
export {
  DialogTrigger as AlertDialogTrigger,
  DialogContent as AlertDialogContent,
  DialogTitle as AlertDialogTitle,
  DialogDescription as AlertDialogDescription,
  DialogClose as AlertDialogClose,
} from "./dialog.js";
