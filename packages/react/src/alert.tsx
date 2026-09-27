import * as React from "react";
import { cn } from "./internal.js";
import { type Intent, intentSymbols } from "./intent.js";
export type AlertProps = React.ComponentPropsWithRef<"div"> & {
  intent?: Intent;
};
export function Alert({
  className,
  intent = "info",
  children,
  ...props
}: AlertProps) {
  return (
    <div
      role={intent === "danger" ? "alert" : "status"}
      className={cn("coal-alert", `coal-intent-${intent}`, className)}
      {...props}
    >
      <span className="coal-intent-symbol" aria-hidden="true">
        {intentSymbols[intent]}
      </span>
      <div>{children}</div>
    </div>
  );
}
