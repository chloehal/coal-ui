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
const Root = React.createContext<
  | { values: string[]; set: (v: string[]) => void; multiple: boolean }
  | undefined
>(undefined);
const Item = React.createContext<
  | { open: boolean; toggle: () => void; id: string; disabled?: boolean }
  | undefined
>(undefined);
export type AccordionProps = Omit<
  React.ComponentPropsWithRef<"div">,
  "defaultValue"
> & {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  multiple?: boolean;
};
export function Accordion({
  value,
  defaultValue = [],
  onValueChange,
  multiple = false,
  children,
  className,
  onKeyDown,
  ...props
}: AccordionProps) {
  const [values, set] = useValue(value, defaultValue, onValueChange);
  return (
    <Root.Provider value={{ values, set, multiple }}>
      <div
        className={cn("coal-accordion", className)}
        {...props}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (!e.defaultPrevented)
            moveFocus(e, "[data-coal-accordion-trigger]");
        }}
      >
        {children}
      </div>
    </Root.Provider>
  );
}
export function AccordionItem({
  value,
  disabled,
  children,
  className,
  ...props
}: React.ComponentPropsWithRef<"div"> & {
  value?: string;
  disabled?: boolean;
}) {
  const r = useRequired(Root, "AccordionItem");
  const id = React.useId();
  const key = value ?? id;
  const open = r.values.includes(key);
  return (
    <Item.Provider
      value={{
        id,
        open,
        disabled,
        toggle: () =>
          r.set(
            open
              ? r.values.filter((v) => v !== key)
              : r.multiple
                ? [...r.values, key]
                : [key],
          ),
      }}
    >
      <div className={cn("coal-accordion-item", className)} {...props}>
        {children}
      </div>
    </Item.Provider>
  );
}
export function AccordionHeader(props: React.ComponentPropsWithRef<"h3">) {
  return <h3 {...props} />;
}
export function AccordionTrigger({
  className,
  onClick,
  ...props
}: ActionProps) {
  const c = useRequired(Item, "AccordionTrigger");
  return (
    <Action
      {...props}
      id={`${c.id}-trigger`}
      data-coal-accordion-trigger=""
      disabled={c.disabled || props.disabled}
      aria-expanded={c.open}
      aria-controls={`${c.id}-panel`}
      className={cn("coal-accordion-trigger", className)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) c.toggle();
      }}
    />
  );
}
export function AccordionContent({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  const c = useRequired(Item, "AccordionContent");
  return (
    <div
      {...props}
      id={`${c.id}-panel`}
      role="region"
      aria-labelledby={`${c.id}-trigger`}
      hidden={!c.open}
      className={cn("coal-accordion-content", className)}
    />
  );
}
