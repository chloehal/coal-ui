"use client";
import * as React from "react";
import {
  cn,
  useValue,
  useRequired,
  Action,
  type ActionProps,
} from "./internal.js";
const Context = React.createContext<
  | {
      value: number;
      set: (v: number) => void;
      min?: number;
      max?: number;
      step: number;
      disabled?: boolean;
      name?: string;
    }
  | undefined
>(undefined);
export type NumberFieldProps = Omit<
  React.ComponentPropsWithRef<"div">,
  "defaultValue"
> & {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  name?: string;
};
export function NumberField({
  value,
  defaultValue = 0,
  onValueChange,
  min,
  max,
  step = 1,
  disabled,
  name,
  children,
  className,
  ...props
}: NumberFieldProps) {
  const [v, set] = useValue(value, defaultValue, onValueChange);
  return (
    <Context.Provider
      value={{
        value: v,
        set: (n) =>
          set(Math.min(max ?? Infinity, Math.max(min ?? -Infinity, n))),
        min,
        max,
        step,
        disabled,
        name,
      }}
    >
      <div className={cn("coal-field", className)} {...props}>
        {children}
      </div>
    </Context.Provider>
  );
}
export function NumberFieldGroup({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return <div className={cn("coal-number-group", className)} {...props} />;
}
export function NumberFieldInput({
  onChange,
  onBlur,
  className,
  ...props
}: React.ComponentPropsWithRef<"input">) {
  const c = useRequired(Context, "NumberFieldInput");
  const [draft, setDraft] = React.useState(String(c.value));
  React.useEffect(() => setDraft(String(c.value)), [c.value]);
  return (
    <input
      type="number"
      value={draft}
      min={c.min}
      max={c.max}
      step={c.step}
      name={c.name}
      disabled={c.disabled}
      className={cn("coal-number-input", className)}
      {...props}
      onBlur={(e) => {
        onBlur?.(e);
        setDraft(String(c.value));
      }}
      onChange={(e) => {
        onChange?.(e);
        if (!e.defaultPrevented) setDraft(e.target.value);
        if (!e.defaultPrevented && Number.isFinite(e.target.valueAsNumber))
          c.set(e.target.valueAsNumber);
      }}
    />
  );
}
function StepButton({
  direction,
  onClick,
  className,
  ...props
}: ActionProps & { direction: number }) {
  const c = useRequired(Context, "NumberField step");
  return (
    <Action
      className={cn("coal-number-step", className)}
      disabled={
        c.disabled ||
        (direction > 0
          ? c.value >= (c.max ?? Infinity)
          : c.value <= (c.min ?? -Infinity))
      }
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented)
          c.set(Number((c.value + direction * c.step).toFixed(12)));
      }}
    />
  );
}
export function NumberFieldIncrement(props: ActionProps) {
  return <StepButton direction={1} {...props} />;
}
export function NumberFieldDecrement(props: ActionProps) {
  return <StepButton direction={-1} {...props} />;
}
