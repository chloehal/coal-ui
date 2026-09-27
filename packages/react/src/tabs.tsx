"use client";
import * as React from "react";
import {
  Action,
  cn,
  useValue,
  useRequired,
  moveFocus,
  type ActionProps,
} from "./internal.js";
const Context = React.createContext<
  | {
      value: string;
      set: (v: string) => void;
      id: string;
      orientation: "horizontal" | "vertical";
    }
  | undefined
>(undefined);
export type TabsProps = Omit<
  React.ComponentPropsWithRef<"div">,
  "defaultValue"
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
};
export function Tabs({
  value,
  defaultValue = "",
  onValueChange,
  orientation = "horizontal",
  children,
  ...props
}: TabsProps) {
  const [v, set] = useValue(value, defaultValue, onValueChange);
  const id = React.useId();
  return (
    <Context.Provider value={{ value: v, set, id, orientation }}>
      <div {...props}>{children}</div>
    </Context.Provider>
  );
}
export function TabsList({
  className,
  onKeyDown,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  const c = useRequired(Context, "TabsList");
  return (
    <div
      role="tablist"
      aria-orientation={c.orientation}
      className={cn("coal-tabs-list", className)}
      {...props}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (!e.defaultPrevented) moveFocus(e, '[role="tab"]', c.orientation);
      }}
    />
  );
}
export function TabsTrigger({
  value,
  className,
  onClick,
  onFocus,
  ...props
}: ActionProps & { value: string }) {
  const c = useRequired(Context, "TabsTrigger");
  return (
    <Action
      {...props}
      id={`${c.id}-tab-${value}`}
      role="tab"
      aria-selected={value === c.value}
      aria-controls={`${c.id}-panel-${value}`}
      tabIndex={value === c.value ? 0 : -1}
      className={cn("coal-tabs-trigger", className)}
      onFocus={(e) => {
        onFocus?.(e);
        if (!e.defaultPrevented) c.set(value);
      }}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) c.set(value);
      }}
    />
  );
}
export function TabsContent({
  value,
  className,
  ...props
}: React.ComponentPropsWithRef<"div"> & { value: string }) {
  const c = useRequired(Context, "TabsContent");
  return (
    <div
      {...props}
      id={`${c.id}-panel-${value}`}
      role="tabpanel"
      aria-labelledby={`${c.id}-tab-${value}`}
      hidden={value !== c.value}
      tabIndex={0}
      className={cn("coal-tabs-content", className)}
    />
  );
}
