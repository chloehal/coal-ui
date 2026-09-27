import * as React from "react";
import { cn } from "./internal.js";
export type ButtonGroupProps = React.ComponentPropsWithRef<"div">;
export function ButtonGroup({ className, ...props }: ButtonGroupProps) {
  return (
    <div
      role="group"
      className={cn("coal-button-group", className)}
      {...props}
    />
  );
}
