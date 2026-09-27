import * as React from "react";
import { cn } from "./internal.js";
export function InputGroup({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return <div className={cn("coal-input-group", className)} {...props} />;
}
export function InputGroupAddon({
  className,
  ...props
}: React.ComponentPropsWithRef<"span">) {
  return <span className={cn("coal-input-addon", className)} {...props} />;
}
