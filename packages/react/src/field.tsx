"use client";
import * as React from "react";
import { cn, useRequired } from "./internal.js";
const Context = React.createContext<
  { id: string; invalid?: boolean } | undefined
>(undefined);
export function Field({
  invalid,
  children,
  className,
  id,
  ...props
}: React.ComponentPropsWithRef<"div"> & { invalid?: boolean }) {
  const generated = React.useId();
  return (
    <Context.Provider value={{ id: id ?? generated, invalid }}>
      <div className={cn("coal-field", className)} {...props}>
        {children}
      </div>
    </Context.Provider>
  );
}
export function FieldLabel({
  className,
  ...props
}: React.ComponentPropsWithRef<"label">) {
  const c = useRequired(Context, "FieldLabel");
  return (
    <label htmlFor={c.id} className={cn("coal-label", className)} {...props} />
  );
}
export function FieldControl({
  render,
  ...props
}: React.ComponentPropsWithRef<"input"> & { render?: React.ReactElement }) {
  const c = useRequired(Context, "FieldControl");
  const merged = {
    id: c.id,
    "aria-invalid": c.invalid,
    "aria-describedby": `${c.id}-description${c.invalid ? ` ${c.id}-error` : ""}`,
    ...props,
  };
  return render ? (
    React.cloneElement(
      render as React.ReactElement<Record<string, unknown>>,
      merged,
    )
  ) : (
    <input className="coal-input" {...merged} />
  );
}
export function FieldDescription({
  className,
  ...props
}: React.ComponentPropsWithRef<"p">) {
  const c = useRequired(Context, "FieldDescription");
  return (
    <p
      {...props}
      id={`${c.id}-description`}
      className={cn("coal-field-description", className)}
    />
  );
}
export function FieldError({
  className,
  ...props
}: React.ComponentPropsWithRef<"p">) {
  const c = useRequired(Context, "FieldError");
  return c.invalid ? (
    <p
      {...props}
      id={`${c.id}-error`}
      role="alert"
      className={cn("coal-field-error", className)}
    />
  ) : null;
}
