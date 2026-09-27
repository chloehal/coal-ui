"use client";
import * as React from "react";
import { cn, useValue, useRequired } from "./internal.js";
const Context = React.createContext<
  | {
      value: string;
      set: (value: string) => void;
      name: string;
      disabled?: boolean;
      required?: boolean;
    }
  | undefined
>(undefined);
export type RadioGroupProps = Omit<
  React.ComponentPropsWithRef<"div">,
  "defaultValue" | "onChange"
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  required?: boolean;
};
export function RadioGroup({
  value,
  defaultValue = "",
  onValueChange,
  name,
  disabled,
  required,
  children,
  className,
  ...props
}: RadioGroupProps) {
  const id = React.useId();
  const [v, set] = useValue(value, defaultValue, onValueChange);
  return (
    <Context.Provider
      value={{ value: v, set, name: name ?? id, disabled, required }}
    >
      <div
        role="radiogroup"
        className={cn("coal-radio-group", className)}
        {...props}
      >
        {children}
      </div>
    </Context.Provider>
  );
}
export function RadioGroupItem({
  value,
  disabled,
  onChange,
  className,
  ...props
}: Omit<React.ComponentPropsWithRef<"input">, "type" | "value"> & {
  value: string;
}) {
  const c = useRequired(Context, "RadioGroupItem");
  return (
    <input
      {...props}
      type="radio"
      className={cn("coal-radio", className)}
      name={c.name}
      value={value}
      required={c.required}
      disabled={disabled || c.disabled}
      checked={c.value === value}
      onChange={(e) => {
        onChange?.(e);
        if (!e.defaultPrevented) c.set(value);
      }}
    />
  );
}
