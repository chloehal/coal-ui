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
  children,
  ref: forwardedRef,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  const c = useRequired(Context, "TabsList");
  const ref = React.useRef<HTMLDivElement>(null);
  const [marker, setMarker] = React.useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  React.useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const place = () => {
      const active = node.querySelector<HTMLElement>(
        '[role="tab"][aria-selected="true"]',
      );
      if (!active) {
        setMarker({ x: 0, y: 0, width: 0, height: 0 });
        return;
      }
      setMarker({
        x: active.offsetLeft,
        y: active.offsetTop,
        width: active.offsetWidth,
        height: active.offsetHeight,
      });
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(node);
    node
      .querySelectorAll('[role="tab"]')
      .forEach((tab) => observer.observe(tab));
    return () => observer.disconnect();
  }, [c.value, children]);
  return (
    <div
      ref={(node) => {
        ref.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      role="tablist"
      aria-orientation={c.orientation}
      className={cn("coal-tabs-list", className)}
      {...props}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (!e.defaultPrevented) moveFocus(e, '[role="tab"]', c.orientation);
      }}
    >
      {children}
      <span
        aria-hidden="true"
        className="coal-tabs-indicator"
        style={
          c.orientation === "vertical"
            ? {
                width: 2,
                height: marker.height,
                top: 0,
                bottom: "auto",
                transform: `translateY(${marker.y}px)`,
              }
            : { width: marker.width, transform: `translateX(${marker.x}px)` }
        }
      />
    </div>
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
