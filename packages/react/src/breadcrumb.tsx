import * as React from "react";
import { cn } from "./internal.js";
export type BreadcrumbProps = React.ComponentPropsWithRef<"nav">;
export function Breadcrumb({ className, ...props }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("coal-breadcrumb", className)}
      {...props}
    />
  );
}
