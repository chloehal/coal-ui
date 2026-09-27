"use client";
import * as React from "react";
import { cn } from "./internal.js";
export type CopyableValueProps = React.ComponentPropsWithRef<"div"> & {
  value: string;
  label?: string;
};
export function CopyableValue({
  value,
  label = "Copy value",
  className,
  ...props
}: CopyableValueProps) {
  const [status, setStatus] = React.useState("");
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  React.useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <div className={cn("coal-copyable", className)} {...props}>
      <code>{value}</code>
      <button
        type="button"
        aria-label={label}
        onClick={async () => {
          clearTimeout(timer.current);
          try {
            await navigator.clipboard.writeText(value);
            setStatus("Copied.");
          } catch {
            setStatus("Copy unavailable. Select and copy the value manually.");
          }
          timer.current = setTimeout(() => setStatus(""), 4000);
        }}
      >
        Copy
      </button>
      <span className="coal-sr-only" role="status">
        {status}
      </span>
    </div>
  );
}
