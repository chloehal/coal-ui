"use client";
import * as React from "react";
export function exitDuration(element: HTMLElement | null) {
  if (
    typeof window === "undefined" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return 0;
  const token = element
    ? getComputedStyle(element).getPropertyValue("--coal-motion-exit").trim()
    : "";
  const value = parseFloat(token);
  return Number.isFinite(value)
    ? token.endsWith("ms")
      ? value
      : value * 1000
    : 140;
}
export function usePresence(
  open: boolean,
  element: React.RefObject<HTMLElement | null>,
) {
  const [retained, setRetained] = React.useState(open);
  React.useEffect(() => {
    if (open) {
      setRetained(true);
      return;
    }
    const timer = setTimeout(
      () => setRetained(false),
      exitDuration(element.current),
    );
    return () => clearTimeout(timer);
  }, [open, element]);
  return open || retained;
}
