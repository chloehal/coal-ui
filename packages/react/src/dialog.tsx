"use client";
import * as React from "react";
import { exitDuration } from "./motion.js";
import { createPortal } from "react-dom";
import {
  Action,
  cn,
  useRequired,
  useValue,
  type ActionProps,
} from "./internal.js";
type State = {
  open: boolean;
  set: (value: boolean) => void;
  id: string;
  trigger: React.RefObject<HTMLButtonElement | null>;
  alert: boolean;
};
const Context = React.createContext<State | undefined>(undefined);
export type DialogProps = {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  alert?: boolean;
};
export function Dialog({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  alert = false,
}: DialogProps) {
  const [v, set] = useValue(open, defaultOpen, onOpenChange);
  const id = React.useId();
  const trigger = React.useRef<HTMLButtonElement | null>(null);
  return (
    <Context.Provider value={{ open: v, set, id, trigger, alert }}>
      {children}
    </Context.Provider>
  );
}
export function DialogTrigger({ onClick, ref, ...props }: ActionProps) {
  const c = useRequired(Context, "DialogTrigger");
  return (
    <Action
      {...props}
      ref={(node) => {
        c.trigger.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      aria-haspopup="dialog"
      aria-expanded={c.open}
      aria-controls={c.id}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) c.set(true);
      }}
    />
  );
}
export function DialogPortal({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => setReady(true), []);
  return ready ? createPortal(children, document.body) : null;
}
export function DialogContent({
  children,
  className,
  onCancel,
  onClose,
  onClick,
  ref: forwardedRef,
  ...props
}: React.ComponentPropsWithRef<"dialog">) {
  const c = useRequired(Context, "DialogContent");
  const ref = React.useRef<HTMLDialogElement | null>(null);
  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (c.open && !node.open) node.showModal();
    if (!c.open && node.open) {
      const timer = setTimeout(() => node.close(), exitDuration(node));
      return () => clearTimeout(timer);
    }
  }, [c.open]);
  // Keep the native dialog mounted: its top layer handles inertness, focus trapping and nested dialogs.
  return (
    <dialog
      {...props}
      ref={(node) => {
        ref.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      data-state={c.open ? "open" : "closed"}
      id={c.id}
      role={c.alert ? "alertdialog" : "dialog"}
      aria-labelledby={`${c.id}-title`}
      aria-describedby={`${c.id}-description`}
      className={cn("coal-dialog", className)}
      onCancel={(e) => {
        onCancel?.(e);
        if (!e.defaultPrevented) {
          e.preventDefault();
          c.set(false);
        }
      }}
      onClose={(e) => {
        onClose?.(e);
        c.set(false);
        c.trigger.current?.focus();
      }}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || c.alert || e.target !== e.currentTarget)
          return;
        const r = e.currentTarget.getBoundingClientRect();
        if (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        )
          c.set(false);
      }}
    >
      {children}
      <DialogClose className="coal-dialog-close" aria-label="Close">
        ×
      </DialogClose>
    </dialog>
  );
}
export function DialogClose({ onClick, ...props }: ActionProps) {
  const c = useRequired(Context, "DialogClose");
  return (
    <Action
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) c.set(false);
      }}
    />
  );
}
export function DialogTitle({
  className,
  ...props
}: React.ComponentPropsWithRef<"h2">) {
  const c = useRequired(Context, "DialogTitle");
  return (
    <h2
      {...props}
      id={`${c.id}-title`}
      className={cn("coal-dialog-title", className)}
    />
  );
}
export function DialogDescription({
  className,
  ...props
}: React.ComponentPropsWithRef<"p">) {
  const c = useRequired(Context, "DialogDescription");
  return (
    <p
      {...props}
      id={`${c.id}-description`}
      className={cn("coal-dialog-description", className)}
    />
  );
}
export function DialogHeader({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return <div className={cn("coal-dialog-header", className)} {...props} />;
}
export function DialogFooter({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return <div className={cn("coal-dialog-footer", className)} {...props} />;
}
