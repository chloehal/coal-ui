"use client";
import * as React from "react";
export function cn(...values: (string | undefined | null | false)[]) {
  return values.filter(Boolean).join(" ");
}
export function useValue<T>(
  value: T | undefined,
  initial: T,
  onChange?: (value: T) => void,
) {
  const [local, setLocal] = React.useState(initial);
  const current = value === undefined ? local : value;
  const set = React.useCallback(
    (next: T) => {
      if (value === undefined) setLocal(next);
      onChange?.(next);
    },
    [value, onChange],
  );
  return [current, set] as const;
}
export type ActionProps = React.ComponentPropsWithRef<"button"> & {
  render?: React.ReactElement;
};
export function Action({
  render,
  children,
  className,
  ref,
  ...props
}: ActionProps) {
  if (render) {
    const element = render as React.ReactElement<Record<string, unknown>>;
    const original = element.props;
    const merged: Record<string, unknown> = {
      ...original,
      ...props,
      className: cn(original.className as string, className),
    };
    for (const key of [
      "onClick",
      "onKeyDown",
      "onFocus",
      "onBlur",
      "onPointerEnter",
      "onPointerLeave",
    ]) {
      const first = original[key] as
        | ((e: React.SyntheticEvent) => void)
        | undefined;
      const second = merged[key] as
        | ((e: React.SyntheticEvent) => void)
        | undefined;
      if (first && second && first !== second)
        merged[key] = (e: React.SyntheticEvent) => {
          first(e);
          if (!e.defaultPrevented) second(e);
        };
    }
    if (ref)
      merged.ref = (node: HTMLButtonElement | null) => {
        if (typeof ref === "function") ref(node);
        else ref.current = node;
        const own = original.ref as React.Ref<HTMLButtonElement> | undefined;
        if (typeof own === "function") own(node);
        else if (own) own.current = node;
      };
    return React.cloneElement(
      element,
      merged,
      children ?? (original.children as React.ReactNode),
    );
  }
  return (
    <button type="button" {...props} ref={ref} className={className}>
      {children}
    </button>
  );
}
export function useRequired<T>(
  context: React.Context<T | undefined>,
  name: string,
) {
  const value = React.useContext(context);
  if (value === undefined)
    throw new Error(`${name} must be inside its Coal root component.`);
  return value;
}
export function moveFocus(
  e: React.KeyboardEvent,
  selector: string,
  orientation: "horizontal" | "vertical" = "vertical",
) {
  const backward = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
  const forward = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
  if (![backward, forward, "Home", "End"].includes(e.key)) return;
  const list = Array.from(
    e.currentTarget.querySelectorAll<HTMLElement>(selector),
  ).filter(
    (el) =>
      !el.hasAttribute("disabled") &&
      el.getAttribute("aria-disabled") !== "true",
  );
  if (!list.length) return;
  e.preventDefault();
  const i = list.indexOf(document.activeElement as HTMLElement);
  list[
    e.key === "Home"
      ? 0
      : e.key === "End"
        ? list.length - 1
        : (i + (e.key === forward ? 1 : -1) + list.length) % list.length
  ].focus();
}
