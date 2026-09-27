"use client";
import * as React from "react";
import { cn } from "./internal.js";
export type CheckboxProps = Omit<
  React.ComponentPropsWithRef<"input">,
  "type" | "size"
> & { indeterminate?: boolean; onCheckedChange?: (checked: boolean) => void };
export function Checkbox({
  checked,
  defaultChecked = false,
  onCheckedChange,
  onChange,
  indeterminate = false,
  children,
  className,
  ref,
  ...props
}: CheckboxProps) {
  const input = React.useRef<HTMLInputElement | null>(null);
  React.useEffect(() => {
    if (input.current) input.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <span
      className={cn("coal-checkbox", className)}
      data-indeterminate={indeterminate || undefined}
      data-disabled={props.disabled || undefined}
    >
      <input
        {...props}
        ref={(node) => {
          input.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        type="checkbox"
        checked={checked}
        defaultChecked={checked === undefined ? defaultChecked : undefined}
        onChange={(e) => {
          onChange?.(e);
          if (!e.defaultPrevented) onCheckedChange?.(e.target.checked);
        }}
      />
      {children ?? (
        <CheckboxIndicator>{indeterminate ? "−" : "✓"}</CheckboxIndicator>
      )}
    </span>
  );
}
export function CheckboxIndicator({
  className,
  ...props
}: React.ComponentPropsWithRef<"span">) {
  return (
    <span
      aria-hidden="true"
      className={cn("coal-checkbox-indicator", className)}
      {...props}
    />
  );
}
