"use client";
import * as React from "react";
import { usePresence } from "./motion.js";
import { createPortal } from "react-dom";
import {
  Action,
  cn,
  useRequired,
  useValue,
  type ActionProps,
} from "./internal.js";
type State = {
  scheduleClose: () => void;
  cancelClose: () => void;
  open: boolean;
  set: (value: boolean) => void;
  close: (focus?: boolean) => void;
  id: string;
  anchor: React.RefObject<HTMLElement | null>;
  content: React.RefObject<HTMLDivElement | null>;
};
const Context = React.createContext<State | undefined>(undefined);
export const useFloating = () => useRequired(Context, "Floating content");
export type FloatingProps = {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (value: boolean) => void;
};
export function FloatingRoot({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
}: FloatingProps) {
  const [v, set] = useValue(open, defaultOpen, onOpenChange);
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const cancelClose = React.useCallback(() => clearTimeout(timer.current), []);
  const scheduleClose = () => {
    cancelClose();
    timer.current = setTimeout(() => set(false), 180);
  };
  React.useEffect(() => cancelClose, [cancelClose]);
  const id = React.useId();
  const anchor = React.useRef<HTMLElement | null>(null);
  const content = React.useRef<HTMLDivElement | null>(null);
  const close = React.useCallback(
    (focus = true) => {
      set(false);
      if (focus) anchor.current?.focus();
    },
    [set],
  );
  React.useEffect(() => {
    if (!v) return;
    const outside = (e: PointerEvent) => {
      const node = e.target as HTMLElement;
      if (
        !anchor.current?.contains(node) &&
        !content.current?.contains(node) &&
        !node.closest("[data-coal-layer]")
      )
        set(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [v, set]);
  return (
    <Context.Provider
      value={{
        open: v,
        set,
        close,
        id,
        anchor,
        content,
        scheduleClose,
        cancelClose,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function FloatingTrigger({
  onClick,
  onKeyDown,
  ref,
  ...props
}: ActionProps) {
  const c = useFloating();
  return (
    <Action
      {...props}
      ref={(node) => {
        c.anchor.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      aria-haspopup={props["aria-haspopup"] ?? "dialog"}
      aria-expanded={c.open}
      aria-controls={c.id}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) c.set(!c.open);
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (!e.defaultPrevented && e.key === "ArrowDown") {
          e.preventDefault();
          c.set(true);
        }
      }}
    />
  );
}
export type FloatingContentProps = React.ComponentPropsWithRef<"div"> & {
  autoFocus?: boolean;
  sideOffset?: number;
};
export function FloatingContent({
  children,
  className,
  style,
  onKeyDown,
  autoFocus = true,
  sideOffset = 6,
  ref,
  ...props
}: FloatingContentProps) {
  const c = useFloating();
  const present = usePresence(c.open, c.content);
  const [position, setPosition] = React.useState<React.CSSProperties>({
    visibility: "hidden",
  });
  React.useLayoutEffect(() => {
    if (!c.open) return;
    const place = () => {
      const a = c.anchor.current?.getBoundingClientRect(),
        p = c.content.current?.getBoundingClientRect();
      if (!a || !p) return;
      const maxHeight = Math.max(
        80,
        Math.max(a.top, innerHeight - a.bottom) - sideOffset - 12,
      );
      const top =
        a.bottom + sideOffset + p.height > innerHeight - 12 &&
        a.top > innerHeight - a.bottom
          ? Math.max(12, a.top - p.height - sideOffset)
          : a.bottom + sideOffset;
      setPosition({
        top,
        left: Math.max(12, Math.min(a.left, innerWidth - p.width - 12)),
        maxHeight,
        "--coal-anchor-width": `${a.width}px`,
      } as React.CSSProperties);
    };
    place();
    const observer = new ResizeObserver(place);
    if (c.content.current) observer.observe(c.content.current);
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [c.open, c.anchor, c.content, sideOffset]);
  React.useEffect(() => {
    if (!c.open || !autoFocus) return;
    const frame = requestAnimationFrame(() => {
      const target =
        c.content.current?.querySelector<HTMLElement>(
          '[autofocus], [tabindex="0"]',
        ) ??
        c.content.current?.querySelector<HTMLElement>(
          "button:not([disabled]), input:not([disabled]), a[href]",
        );
      (target ?? c.content.current)?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [c.open, c.content, autoFocus]);
  if (!present || typeof document === "undefined") return null;
  return createPortal(
    <div
      {...props}
      id={c.id}
      ref={(node) => {
        c.content.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      data-coal-layer=""
      data-state={c.open ? "open" : "closed"}
      inert={!c.open}
      aria-hidden={!c.open || undefined}
      tabIndex={-1}
      className={cn("coal-floating", className)}
      style={{ ...position, ...style }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key === "Escape" && !e.defaultPrevented) {
          e.preventDefault();
          e.stopPropagation();
          c.close();
        }
        if (e.key === "Tab")
          setTimeout(() => {
            if (!c.content.current?.contains(document.activeElement))
              c.close(false);
          }, 0);
      }}
    >
      {children}
    </div>,
    c.anchor.current?.closest("dialog") ?? document.body,
  );
}
