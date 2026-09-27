"use client";
import * as React from "react";
import { cn, useValue, useRequired } from "./internal.js";
import {
  FloatingRoot,
  FloatingContent,
  useFloating,
  type FloatingContentProps,
} from "./floating.js";
type State = {
  items: string[];
  filtered: string[];
  query: string;
  setQuery: (v: string) => void;
  value: string | null;
  choose: (v: string) => void;
  active: number;
  setActive: (i: number) => void;
  id: string;
  disabled?: boolean;
};
const Context = React.createContext<State | undefined>(undefined);
export type ComboboxProps = {
  children: React.ReactNode;
  items: string[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  name?: string;
  disabled?: boolean;
};
export function Combobox({
  children,
  items,
  value,
  defaultValue = null,
  onValueChange,
  name,
  disabled,
}: ComboboxProps) {
  const [v, set] = useValue(value, defaultValue, onValueChange);
  const [query, setQuery] = React.useState(v ?? "");
  const [active, setActive] = React.useState(-1);
  const id = React.useId();
  React.useEffect(() => setQuery(v ?? ""), [v]);
  const filtered = items.filter((s) =>
    s.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );
  return (
    <Context.Provider
      value={{
        items,
        filtered,
        query,
        setQuery: (s) => {
          setQuery(s);
          setActive(-1);
        },
        value: v,
        choose: (s) => {
          set(s);
          setQuery(s);
          setActive(-1);
        },
        active,
        setActive,
        id,
        disabled,
      }}
    >
      <FloatingRoot>
        {name && (
          <input
            type="hidden"
            name={name}
            value={v ?? ""}
            disabled={disabled}
          />
        )}{" "}
        {children}
      </FloatingRoot>
    </Context.Provider>
  );
}
export function ComboboxInput({
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  className,
  ...props
}: React.ComponentPropsWithRef<"input">) {
  const c = useRequired(Context, "ComboboxInput");
  const f = useFloating();
  return (
    <input
      {...props}
      ref={(node) => {
        f.anchor.current = node;
      }}
      role="combobox"
      aria-autocomplete="list"
      aria-expanded={f.open}
      aria-controls={f.id}
      aria-activedescendant={
        f.open && c.active >= 0 ? `${c.id}-option-${c.active}` : undefined
      }
      disabled={c.disabled}
      value={c.query}
      className={cn("coal-input", className)}
      onFocus={(e) => {
        onFocus?.(e);
        if (!e.defaultPrevented) f.set(true);
      }}
      onBlur={(e) => {
        onBlur?.(e);
        if (!f.content.current?.contains(e.relatedTarget)) f.close(false);
      }}
      onChange={(e) => {
        onChange?.(e);
        if (!e.defaultPrevented) {
          c.setQuery(e.target.value);
          f.set(true);
        }
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          f.set(true);
          c.setActive(
            c.filtered.length
              ? (c.active +
                  (e.key === "ArrowDown" ? 1 : -1) +
                  c.filtered.length) %
                  c.filtered.length
              : -1,
          );
        }
        if (e.key === "Enter" && f.open && c.active >= 0) {
          e.preventDefault();
          c.choose(c.filtered[c.active]);
          f.close();
        }
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
          f.close();
        }
        if (e.key === "Tab") f.close(false);
      }}
    />
  );
}
export function ComboboxContent(props: FloatingContentProps) {
  return (
    <FloatingContent
      role="listbox"
      autoFocus={false}
      className="coal-select-content"
      {...props}
    />
  );
}
export function ComboboxList({
  children,
}: {
  children: (item: string) => React.ReactNode;
}) {
  const c = useRequired(Context, "ComboboxList");
  return <>{c.filtered.map(children)}</>;
}
export function ComboboxItem({
  value,
  className,
  onMouseDown,
  onClick,
  ...props
}: Omit<React.ComponentPropsWithRef<"div">, "onSelect"> & { value: string }) {
  const c = useRequired(Context, "ComboboxItem");
  const f = useFloating();
  const i = c.filtered.indexOf(value);
  return (
    <div
      {...props}
      id={`${c.id}-option-${i}`}
      role="option"
      aria-selected={c.value === value}
      data-active={c.active === i || undefined}
      className={cn("coal-option", className)}
      onMouseDown={(e) => {
        onMouseDown?.(e);
        e.preventDefault();
      }}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) {
          c.choose(value);
          f.close();
        }
      }}
    />
  );
}
export function ComboboxEmpty(props: React.ComponentPropsWithRef<"div">) {
  const c = useRequired(Context, "ComboboxEmpty");
  return c.filtered.length ? null : (
    <div role="status" className="coal-menu-label" {...props} />
  );
}
