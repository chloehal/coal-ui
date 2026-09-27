import * as React from "react";
export function AspectRatio({
  ratio = 16 / 9,
  style,
  ...props
}: React.ComponentPropsWithRef<"div"> & { ratio?: number }) {
  return (
    <div
      style={{ aspectRatio: ratio > 0 ? ratio : 16 / 9, ...style }}
      {...props}
    />
  );
}
