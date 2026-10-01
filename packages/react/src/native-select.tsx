"use client";
import * as React from "react";
import { useFormReset } from "./internal.js";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./select.js";
/** Compatibility name; the visible control and option list are fully custom. */
export type NativeSelectProps = Omit<
  React.ComponentPropsWithRef<"select">,
  "multiple" | "size"
>;
export function NativeSelect({
  children,
  className,
  value,
  defaultValue,
  onChange,
  disabled,
  required,
  name,
  id,
  ref,
  ...props
}: NativeSelectProps) {
  const options: {
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
  }[] = [];
  const collect = (nodes: React.ReactNode, groupDisabled = false) =>
    React.Children.forEach(nodes, (node) => {
      if (!React.isValidElement(node)) return;
      const p = node.props as {
        value?: string;
        children?: React.ReactNode;
        disabled?: boolean;
      };
      if (node.type === "option")
        options.push({
          value: String(p.value ?? p.children ?? ""),
          label: p.children,
          disabled: groupDisabled || p.disabled,
        });
      else collect(p.children, groupDisabled || p.disabled);
    });
  collect(children);
  const [local, setLocal] = React.useState(
    String(defaultValue ?? options[0]?.value ?? ""),
  );
  const selected = String(value ?? local);
  const proxy = React.useRef<HTMLSelectElement>(null);
  useFormReset(proxy, () =>
    setLocal(String(defaultValue ?? options[0]?.value ?? "")),
  );
  return (
    <>
      <select
        {...props}
        ref={(node) => {
          proxy.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        hidden
        aria-hidden="true"
        tabIndex={-1}
        name={name}
        disabled={disabled}
        value={selected}
        onChange={(e) => {
          onChange?.(e);
          if (!e.defaultPrevented) setLocal(e.target.value);
        }}
      >
        {children}
      </select>
      <Select
        value={selected}
        required={required}
        disabled={disabled}
        items={Object.fromEntries(options.map((o) => [o.value, o.label]))}
        onValueChange={(next) => {
          const node = proxy.current;
          if (node) {
            Object.getOwnPropertyDescriptor(
              HTMLSelectElement.prototype,
              "value",
            )?.set?.call(node, next);
            node.dispatchEvent(new Event("change", { bubbles: true }));
          }
        }}
      >
        <SelectTrigger
          id={id}
          className={className}
          aria-label={props["aria-label"]}
          aria-labelledby={props["aria-labelledby"]}
          aria-describedby={props["aria-describedby"]}
          {...(props["aria-invalid"] !== undefined
            ? { "aria-invalid": props["aria-invalid"] }
            : {})}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
