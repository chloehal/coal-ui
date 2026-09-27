"use client";
import * as React from "react";
import { cn, useRequired, useValue, moveFocus } from "./internal.js";
import { Toggle, type ToggleProps } from "./toggle.js";
const Context = React.createContext<
  { value: string[]; set: (v: string) => void; disabled?: boolean } | undefined
>(undefined);
export type ToggleGroupProps = Omit<
  React.ComponentPropsWithRef<"div">,
  "defaultValue" | "onChange"
> & {
  type?: "single" | "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (v: string[]) => void;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
};
export function ToggleGroup({
  type = "single",
  value,
  defaultValue = [],
  onValueChange,
  disabled,
  orientation = "horizontal",
  children,
  className,
  onKeyDown,
  ...props
}: ToggleGroupProps) {
  const [v, set] = useValue(value, defaultValue, onValueChange);
  return (
    <Context.Provider
      value={{
        value: v,
        disabled,
        set: (item) =>
          set(
            v.includes(item)
              ? v.filter((x) => x !== item)
              : type === "single"
                ? [item]
                : [...v, item],
          ),
      }}
    >
      <div
        role="group"
        className={cn("coal-toggle-group", className)}
        data-orientation={orientation}
        {...props}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (!e.defaultPrevented) moveFocus(e, "button", orientation);
        }}
      >
        {children}
      </div>
    </Context.Provider>
  );
}
export function ToggleGroupItem({
  value,
  disabled,
  ...props
}: Omit<
  ToggleProps,
  "value" | "pressed" | "defaultPressed" | "onPressedChange"
> & { value: string }) {
  const c = useRequired(Context, "ToggleGroupItem");
  return (
    <Toggle
      {...props}
      disabled={disabled || c.disabled}
      pressed={c.value.includes(value)}
      onPressedChange={() => c.set(value)}
    />
  );
}
