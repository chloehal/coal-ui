"use client";
import * as React from "react";
import { cn, useValue, useRequired } from "./internal.js";
const Context = React.createContext<
  | {
      value: number;
      set: (value: number) => void;
      min: number;
      max: number;
      step: number;
      name?: string;
      disabled?: boolean;
    }
  | undefined
>(undefined);
export type SliderProps = Omit<
  React.ComponentPropsWithRef<"div">,
  "defaultValue"
> & {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  name?: string;
  disabled?: boolean;
};
export function Slider({
  value,
  defaultValue = 0,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  name,
  disabled,
  children,
  className,
  ...props
}: SliderProps) {
  const [v, set] = useValue(value, defaultValue, onValueChange);
  return (
    <Context.Provider value={{ value: v, set, min, max, step, name, disabled }}>
      <div className={cn("coal-slider", className)} {...props}>
        {children}
      </div>
    </Context.Provider>
  );
}
export function SliderControl(props: React.ComponentPropsWithRef<"div">) {
  return <div {...props} />;
}
export function SliderTrack(props: React.ComponentPropsWithRef<"div">) {
  return <div {...props} />;
}
export function SliderIndicator(_props: React.ComponentPropsWithRef<"span">) {
  void _props;
  return null;
}
export function SliderThumb({
  className,
  onChange,
  ...props
}: React.ComponentPropsWithRef<"input">) {
  const c = useRequired(Context, "SliderThumb");
  return (
    <input
      type="range"
      min={c.min}
      max={c.max}
      step={c.step}
      name={c.name}
      disabled={c.disabled}
      value={c.value}
      className={cn("coal-slider-input", className)}
      {...props}
      onChange={(e) => {
        onChange?.(e);
        if (!e.defaultPrevented) c.set(e.target.valueAsNumber);
      }}
    />
  );
}
export function SliderValue(props: React.ComponentPropsWithRef<"output">) {
  const c = useRequired(Context, "SliderValue");
  return <output {...props}>{c.value}</output>;
}
