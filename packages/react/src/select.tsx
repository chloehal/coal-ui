"use client";
import * as React from "react";
import {
  Action,
  cn,
  useRequired,
  useValue,
  moveFocus,
  type ActionProps,
} from "./internal.js";
import {
  FloatingRoot,
  FloatingTrigger,
  FloatingContent,
  useFloating,
  type FloatingContentProps,
} from "./floating.js";
type State = {
  value: string;
  set: (v: string) => void;
  items: Record<string, React.ReactNode>;
  disabled?: boolean;
};
const Context = React.createContext<State | undefined>(undefined);
export type SelectProps = {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  items?: Record<string, React.ReactNode>;
  name?: string;
  disabled?: boolean;
  required?: boolean;
};
export function Select({
  children,
  value,
  defaultValue = "",
  onValueChange,
  items = {},
  name,
  disabled,
  required,
}: SelectProps) {
  const [v, set] = useValue(value, defaultValue, onValueChange);
  return (
    <Context.Provider value={{ value: v, set, items, disabled }}>
      <FloatingRoot>
        <SelectFormValue name={name} required={required} />
        {children}
      </FloatingRoot>
    </Context.Provider>
  );
}
function SelectFormValue({
  name,
  required,
}: {
  name?: string;
  required?: boolean;
}) {
  const c = useRequired(Context, "Select");
  const f = useFloating();
  return (
    <select
      className="coal-sr-only"
      tabIndex={-1}
      aria-hidden="true"
      name={name}
      value={c.value}
      required={required}
      disabled={c.disabled}
      onChange={(e) => c.set(e.target.value)}
      onInvalid={(e) => {
        e.preventDefault();
        f.anchor.current?.focus();
        f.set(true);
      }}
    >
      <option value="" />
      {Array.from(new Set([...Object.keys(c.items), c.value]))
        .filter(Boolean)
        .map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
    </select>
  );
}
export function SelectTrigger({ className, ...props }: ActionProps) {
  const c = useRequired(Context, "SelectTrigger");
  return (
    <FloatingTrigger
      role="combobox"
      aria-haspopup="listbox"
      disabled={c.disabled}
      className={cn("coal-select-trigger", className)}
      {...props}
    />
  );
}
export function SelectValue({
  placeholder = "Choose an option",
  ...props
}: React.ComponentPropsWithRef<"span"> & { placeholder?: string }) {
  const c = useRequired(Context, "SelectValue");
  return (
    <span {...props}>
      {c.items[c.value] ?? (c.value || placeholder)}
      <span aria-hidden="true" className="coal-select-chevron">
        ⌄
      </span>
    </span>
  );
}
export function SelectContent({ onKeyDown, ...props }: FloatingContentProps) {
  return (
    <FloatingContent
      role="listbox"
      className="coal-select-content"
      {...props}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (!e.defaultPrevented) {
          moveFocus(e, '[role="option"]');
          if (e.key.length === 1) {
            const option = Array.from(
              e.currentTarget.querySelectorAll<HTMLElement>('[role="option"]'),
            ).find(
              (el) =>
                !el.hasAttribute("disabled") &&
                el.textContent
                  ?.trim()
                  .toLowerCase()
                  .startsWith(e.key.toLowerCase()),
            );
            option?.focus();
          }
        }
      }}
    />
  );
}
export function SelectItem({
  value,
  className,
  onClick,
  ...props
}: ActionProps & { value: string }) {
  const c = useRequired(Context, "SelectItem");
  const f = useFloating();
  return (
    <Action
      {...props}
      role="option"
      aria-selected={c.value === value}
      tabIndex={c.value === value ? 0 : -1}
      className={cn("coal-option", className)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) {
          c.set(value);
          f.close();
        }
      }}
    />
  );
}
export function SelectGroup(props: React.ComponentPropsWithRef<"div">) {
  return <div role="group" {...props} />;
}
export function SelectLabel(props: React.ComponentPropsWithRef<"div">) {
  return <div className="coal-menu-label" {...props} />;
}
export function SelectSeparator(props: React.ComponentPropsWithRef<"hr">) {
  return <hr className="coal-separator" {...props} />;
}
