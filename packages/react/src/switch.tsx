"use client";
import * as React from "react";
import { PIXEL_SIZE } from "./pixel-grid.js";
import { cn } from "./internal.js";
export type SwitchProps = Omit<
  React.ComponentPropsWithRef<"input">,
  "type" | "size"
> & { onCheckedChange?: (checked: boolean) => void };
export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  onChange,
  children,
  className,
  ...props
}: SwitchProps) {
  return (
    <span
      className={cn("coal-switch", className)}
      data-disabled={props.disabled || undefined}
    >
      <input
        {...props}
        type="checkbox"
        role="switch"
        checked={checked}
        defaultChecked={checked === undefined ? defaultChecked : undefined}
        onChange={(e) => {
          onChange?.(e);
          if (!e.defaultPrevented) onCheckedChange?.(e.target.checked);
        }}
      />
      {children ?? <SwitchThumb />}
    </span>
  );
}
const CELLS = Array.from({ length: 25 }, (_, i) => ({
  x: i % 5,
  y: Math.floor(i / 5),
}));
const DURATION = 520;
function hermite(a: number, b: number, va: number, vb: number, t: number) {
  return (
    (2 * t * t * t - 3 * t * t + 1) * a +
    (t * t * t - 2 * t * t + t) * va +
    (-2 * t * t * t + 3 * t * t) * b +
    (t * t * t - t * t) * vb
  );
}
export function SwitchThumb({
  className,
  ref,
  children,
  ...props
}: React.ComponentPropsWithRef<"span">) {
  const holder = React.useRef<HTMLSpanElement | null>(null);
  const previous = React.useRef<boolean | undefined>(undefined);
  const animations = React.useRef<Animation[]>([]);
  React.useLayoutEffect(() => {
    const node = holder.current;
    const input = node?.closest(".coal-switch")?.querySelector("input");
    if (!node || !input) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const render = (immediate = false) => {
      const on = input.checked;
      if (!immediate && previous.current === on) return;
      const animate =
        !immediate && previous.current !== undefined && !reduced.matches;
      previous.current = on;
      const cells = Array.from(
        node.querySelectorAll<HTMLElement>(".coal-switch-cell"),
      );
      const starts = cells.map(
        (cell) => new DOMMatrixReadOnly(getComputedStyle(cell).transform),
      );
      animations.current.forEach((animation) => animation.cancel());
      animations.current = [];
      cells.forEach((cell, i) => {
        const { x, y } = CELLS[i];
        const endX = (on ? 43 : 10) + x * PIXEL_SIZE;
        const endY = y * PIXEL_SIZE;
        cell.style.transform = `translate(${endX}px, ${endY}px)`;
        if (!animate) return;
        const fromX = starts[i].m41,
          fromY = starts[i].m42;
        const middleX = 10 + (x * 2 + (y % 2)) * 5;
        const velocity =
          (on ? 1 : -1) *
          Math.min(Math.abs(middleX - fromX), Math.abs(endX - middleX)) *
          1.6;
        // All 25 cells stay visible. Alternate rows travel half a column ahead.
        const frames = Array.from({ length: 41 }, (_, frame) => {
          const t = frame / 40;
          const px =
            t <= 0.5
              ? hermite(fromX, middleX, 0, velocity, t * 2)
              : hermite(middleX, endX, velocity, 0, (t - 0.5) * 2);
          const py = fromY + (endY - fromY) * t * t * (3 - 2 * t);
          return { offset: t, transform: `translate(${px}px, ${py}px)` };
        });
        animations.current.push(
          cell.animate(frames, { duration: DURATION, easing: "linear" }),
        );
      });
    };
    let active = true;
    // Read after React's controlled input handling and the native reset default action.
    const sync = () =>
      queueMicrotask(() => {
        if (active) render();
      });
    const preference = () => render(true);
    render();
    input.addEventListener("change", sync);
    input.form?.addEventListener("reset", sync);
    reduced.addEventListener("change", preference);
    return () => {
      active = false;
      input.removeEventListener("change", sync);
      input.form?.removeEventListener("reset", sync);
      reduced.removeEventListener("change", preference);
    };
  });
  React.useEffect(
    () => () => animations.current.forEach((animation) => animation.cancel()),
    [],
  );
  return (
    <span
      {...props}
      ref={(node) => {
        holder.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      aria-hidden="true"
      className={cn("coal-switch-thumb", className)}
    >
      {children ??
        CELLS.map(({ x, y }, i) => (
          <span
            key={i}
            className="coal-switch-cell"
            style={
              {
                "--cell-x": x * PIXEL_SIZE + "px",
                "--cell-y": y * PIXEL_SIZE + "px",
              } as React.CSSProperties
            }
          />
        ))}
    </span>
  );
}
