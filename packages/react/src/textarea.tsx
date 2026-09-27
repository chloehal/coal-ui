import * as React from "react";
import { cn } from "./internal.js";
export type TextareaProps = React.ComponentPropsWithRef<"textarea">;
export function Textarea({ className, ...props }: TextareaProps) {
  return <textarea className={cn("coal-textarea", className)} {...props} />;
}
