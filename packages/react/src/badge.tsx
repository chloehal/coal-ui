import * as React from "react";
import { type Intent, intentSymbols } from "./intent.js";
import { cn } from "./internal.js";
export type BadgeProps = React.ComponentPropsWithRef<"span"> & {
  intent?: Intent;
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning";
};
export function badgeVariants({
  variant = "default",
  className,
}: Pick<BadgeProps, "variant" | "className"> = {}) {
  return cn("coal-badge", `coal-badge--${variant}`, className);
}
export function Badge({
  className,
  variant,
  intent,
  children,
  ...props
}: BadgeProps) {
  const tone =
    intent ??
    (variant === "destructive"
      ? "danger"
      : variant === "success" || variant === "warning"
        ? variant
        : "neutral");
  return (
    <span
      className={cn(
        badgeVariants({ variant, className }),
        `coal-intent-${tone}`,
      )}
      {...props}
    >
      <span className="coal-intent-symbol" aria-hidden="true">
        {intentSymbols[tone]}
      </span>
      {children}
    </span>
  );
}
