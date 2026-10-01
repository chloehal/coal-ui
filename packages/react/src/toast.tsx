"use client";
import * as React from "react";
import { exitDuration } from "./motion.js";
import { createPortal } from "react-dom";
import { type Intent, intentSymbols } from "./intent.js";
import { useRequired } from "./internal.js";
export type ToastOptions = {
  title: React.ReactNode;
  description?: React.ReactNode;
  timeout?: number;
  intent?: Intent;
};
type Entry = ToastOptions & { id: string; closing?: boolean };
type Manager = {
  add: (options: ToastOptions) => string;
  close: (id?: string) => void;
};
const Context = React.createContext<Manager | undefined>(undefined);
export function useToast() {
  return useRequired(Context, "useToast");
}
function ToastItem({
  toast,
  close,
  remove,
}: {
  toast: Entry;
  close: (id: string) => void;
  remove: (id: string) => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!toast.closing) return;
    const timer = setTimeout(() => remove(toast.id), exitDuration(ref.current));
    return () => clearTimeout(timer);
  }, [toast.closing, toast.id, remove]);
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (
      toast.closing ||
      paused ||
      toast.timeout === 0 ||
      (toast.timeout === undefined &&
        (toast.intent === "danger" || toast.intent === "warning"))
    )
      return;
    const timer = setTimeout(() => close(toast.id), toast.timeout ?? 5000);
    return () => clearTimeout(timer);
  }, [toast, close, paused]);
  return (
    <div
      ref={ref}
      data-state={toast.closing ? "closed" : "open"}
      inert={toast.closing || undefined}
      aria-hidden={toast.closing || undefined}
      className={`coal-toast coal-intent-${toast.intent ?? "neutral"}`}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      <div
        role={toast.intent === "danger" ? "alert" : "status"}
        aria-atomic="true"
      >
        <p className="coal-toast-title">
          <span className="coal-intent-symbol" aria-hidden="true">
            {intentSymbols[toast.intent ?? "neutral"]}
          </span>
          <span>{toast.title}</span>
        </p>
        {toast.description && (
          <p className="coal-toast-description">{toast.description}</p>
        )}
      </div>
      <button
        type="button"
        aria-label="Dismiss notification"
        className="coal-toast-close"
        onClick={() => close(toast.id)}
      >
        ×
      </button>
    </div>
  );
}
export function ToastProvider({
  children,
  limit = 3,
  timeout = 5000,
}: {
  children: React.ReactNode;
  limit?: number;
  timeout?: number;
}) {
  const [toasts, setToasts] = React.useState<Entry[]>([]);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const id = React.useId();
  const counter = React.useRef(0);
  const close = React.useCallback(
    (id?: string) =>
      setToasts((list) =>
        list.map((t) => (!id || t.id === id ? { ...t, closing: true } : t)),
      ),
    [],
  );
  const remove = React.useCallback(
    (id: string) => setToasts((list) => list.filter((t) => t.id !== id)),
    [],
  );
  const add = React.useCallback(
    (options: ToastOptions) => {
      const next = `${id}-${++counter.current}`;
      setToasts((list) => {
        const entry = {
          ...options,
          timeout:
            options.timeout ??
            (options.intent === "danger" || options.intent === "warning"
              ? 0
              : timeout),
          id: next,
        };
        const all = [...list, entry];
        const transient = new Set(
          all
            .filter((t) => t.timeout !== 0)
            .slice(-Math.max(1, limit))
            .map((t) => t.id),
        );
        return all.filter((t) => t.timeout === 0 || transient.has(t.id));
      });
      return next;
    },
    [id, limit, timeout],
  );
  return (
    <Context.Provider value={{ add, close }}>
      {children}
      {mounted &&
        createPortal(
          <section aria-label="Notifications" className="coal-toaster">
            {toasts.map((t) => (
              <ToastItem key={t.id} toast={t} close={close} remove={remove} />
            ))}
          </section>,
          document.body,
        )}
    </Context.Provider>
  );
}
