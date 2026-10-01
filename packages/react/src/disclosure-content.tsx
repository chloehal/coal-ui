"use client";
import * as React from "react";

/** CSS grid keeps the closing content in flow; inert removes it from keyboard navigation immediately. */
export function DisclosureContent({
  open,
  children,
  ...props
}: React.ComponentPropsWithRef<"div"> & { open: boolean }) {
  return (
    <div
      {...props}
      data-state={open ? "open" : "closed"}
      inert={!open}
      aria-hidden={!open || undefined}
    >
      <div className="coal-disclosure-inner">
        <div className="coal-disclosure-body">{children}</div>
      </div>
    </div>
  );
}
