"use client";
import * as React from "react";
import {
  Action,
  cn,
  useValue,
  useRequired,
  type ActionProps,
} from "./internal.js";
const Context = React.createContext<
  { open: boolean; set: (v: boolean) => void; id: string } | undefined
>(undefined);
export type CollapsibleProps = React.ComponentPropsWithRef<"div"> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (value: boolean) => void;
};
export function Collapsible({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
  ...props
}: CollapsibleProps) {
  const [v, set] = useValue(open, defaultOpen, onOpenChange);
  const id = React.useId();
  return (
    <Context.Provider value={{ open: v, set, id }}>
      <div {...props}>{children}</div>
    </Context.Provider>
  );
}
export function CollapsibleTrigger({ onClick, ...props }: ActionProps) {
  const c = useRequired(Context, "CollapsibleTrigger");
  return (
    <Action
      {...props}
      aria-expanded={c.open}
      aria-controls={c.id}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) c.set(!c.open);
      }}
    />
  );
}
export function CollapsibleContent({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  const c = useRequired(Context, "CollapsibleContent");
  return (
    <div
      {...props}
      id={c.id}
      hidden={!c.open}
      className={cn("coal-collapsible-content", className)}
    />
  );
}
