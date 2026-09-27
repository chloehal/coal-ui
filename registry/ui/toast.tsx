"use client";
import * as React from "react";
import { Toast as Base } from "@base-ui/react/toast";
export const useToast = Base.useToastManager;
export const createToastManager = Base.createToastManager;
function Toaster() {
  const { toasts } = useToast();
  return (
    <Base.Portal>
      <Base.Viewport className="fixed bottom-5 right-5 z-[100] flex w-[min(360px,calc(100vw-40px))] flex-col gap-2 outline-none">
        {toasts.map((toast) => (
          <Base.Root
            key={toast.id}
            toast={toast}
            className="relative rounded-lg border border-border border-l-2 border-l-brand bg-popover p-4 pr-10 text-popover-foreground shadow-lg data-[ending-style]:opacity-0"
          >
            <Base.Content>
              <Base.Title className="text-sm font-medium" />
              <Base.Description className="mt-1 text-xs text-muted-foreground" />
              {toast.actionProps && (
                <Base.Action className="mt-3 text-xs underline" />
              )}
            </Base.Content>
            <Base.Close
              aria-hidden={false}
              aria-label="Dismiss notification"
              className="absolute right-3 top-3 size-6 rounded text-muted-foreground focus-visible:outline-2"
            >
              ×
            </Base.Close>
          </Base.Root>
        ))}
      </Base.Viewport>
    </Base.Portal>
  );
}
export function ToastProvider({
  children,
  ...props
}: React.ComponentProps<typeof Base.Provider>) {
  return (
    <Base.Provider {...props}>
      {children}
      <Toaster />
    </Base.Provider>
  );
}
