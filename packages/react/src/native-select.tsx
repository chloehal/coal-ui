import * as React from "react";
import { cn } from "./internal.js";
export type NativeSelectProps = React.ComponentPropsWithRef<"select">;
export function NativeSelect({ className, ...props }: NativeSelectProps) {
  return <select className={cn("coal-native-select", className)} {...props} />;
}
