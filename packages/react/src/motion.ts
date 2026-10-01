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
    : 220;
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

/** Capture before a list mutation, then animate surviving nodes from their on-screen positions. */
export function useLayoutMotion<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  const before = React.useRef<Map<string, DOMRect> | null>(null);
  const animations = React.useRef<Animation[]>([]);
  const capture = () => {
    const node = ref.current;
    if (!node) return;
    before.current = new Map(
      Array.from(node.children, (child) => [
        (child as HTMLElement).dataset.motionKey ?? "",
        child.getBoundingClientRect(),
      ]),
    );
    animations.current.forEach((a) => a.cancel());
    animations.current = [];
  };
  React.useLayoutEffect(() => {
    const node = ref.current;
    const previous = before.current;
    before.current = null;
    if (
      !node ||
      !previous ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const style = getComputedStyle(node);
    const duration =
      parseFloat(style.getPropertyValue("--coal-motion-layout")) || 380;
    const easing =
      style.getPropertyValue("--coal-ease-settle").trim() || "ease-out";
    for (const child of Array.from(node.children)) {
      const element = child as HTMLElement;
      const old = previous.get(element.dataset.motionKey ?? "");
      const next = element.getBoundingClientRect();
      const frames = old
        ? [
            {
              transform: `translate(${old.left - next.left}px, ${old.top - next.top}px)`,
            },
            { transform: "translate(0, 0)" },
          ]
        : [
            { opacity: 0, transform: "translateY(8px)" },
            { opacity: 1, transform: "translateY(0)" },
          ];
      const animation = element.animate(frames, { duration, easing });
      animations.current.push(animation);
    }
  });
  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => {
      animations.current.forEach((a) => a.cancel());
      animations.current = [];
    };
    const onChange = () => {
      if (media.matches) stop();
    };
    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
      stop();
    };
  }, []);
  return { ref, capture };
}
