"use client";
import { Action, cn, useValue, type ActionProps } from "./internal.js";
export type ToggleProps = ActionProps & {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
};
export function Toggle({
  pressed,
  defaultPressed = false,
  onPressedChange,
  onClick,
  className,
  ...props
}: ToggleProps) {
  const [v, set] = useValue(pressed, defaultPressed, onPressedChange);
  return (
    <Action
      aria-pressed={v}
      className={cn("coal-toggle", className)}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) set(!v);
      }}
    />
  );
}
