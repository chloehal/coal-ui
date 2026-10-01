"use client";
import * as React from "react";

/** Optional, page-wide pointer feedback. Inert, bounded, and idle between clicks. */
export function PixelClickFeedback() {
  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const active = new Map<HTMLElement, Animation[]>();
    const remove = (node: HTMLElement) => {
      const animations = active.get(node);
      active.delete(node);
      animations?.forEach((animation) => animation.cancel());
      node.remove();
    };
    const clear = () => {
      Array.from(active.keys()).forEach(remove);
    };
    const onPreference = () => {
      if (media.matches) clear();
    };
    const click = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (
        media.matches ||
        event.detail === 0 ||
        event.button !== 0 ||
        !target ||
        target.closest(
          'input:not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"], :disabled, [aria-disabled="true"]',
        )
      )
        return;
      if (active.size >= 4) remove(active.keys().next().value!);
      const node = document.createElement("span");
      node.className = "coal-pixel-burst";
      node.setAttribute("aria-hidden", "true");
      node.inert = true;
      const dialog = target.closest("dialog");
      const bounds = dialog?.getBoundingClientRect();
      node.style.position = dialog ? "absolute" : "fixed";
      node.style.left = `${event.clientX - (bounds?.left ?? 0) + (dialog?.scrollLeft ?? 0)}px`;
      node.style.top = `${event.clientY - (bounds?.top ?? 0) + (dialog?.scrollTop ?? 0)}px`;
      (dialog ?? document.body).appendChild(node);
      const animations = Array.from({ length: 12 }, (_, index) => {
        const cell = document.createElement("span");
        node.appendChild(cell);
        const angle = (index / 12) * Math.PI * 2;
        const radius = 20 + (index % 3) * 4;
        const x = Math.round((Math.cos(angle) * radius) / 4) * 4;
        const y = Math.round((Math.sin(angle) * radius) / 4) * 4;
        return cell.animate(
          [
            { opacity: 0.8, transform: "translate(-1.5px, -1.5px)" },
            {
              opacity: 0.65,
              transform: `translate(${x * 0.7}px, ${y * 0.7}px)`,
              offset: 0.35,
            },
            { opacity: 0, transform: `translate(${x}px, ${y}px)` },
          ],
          {
            duration: 520,
            easing: "cubic-bezier(0.22, 0.8, 0.24, 1)",
            fill: "forwards",
          },
        );
      });
      active.set(node, animations);
      void Promise.allSettled(animations.map((a) => a.finished)).then(() =>
        remove(node),
      );
    };
    document.addEventListener("click", click);
    media.addEventListener("change", onPreference);
    return () => {
      document.removeEventListener("click", click);
      media.removeEventListener("change", onPreference);
      clear();
    };
  }, []);
  return null;
}
