"use client";
import * as React from "react";
import { cn, useRequired } from "./internal.js";
const Context = React.createContext<
  { loaded: boolean; setLoaded: (v: boolean) => void } | undefined
>(undefined);
export function Avatar({
  children,
  className,
  ...props
}: React.ComponentPropsWithRef<"span">) {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <Context.Provider value={{ loaded, setLoaded }}>
      <span className={cn("coal-avatar", className)} {...props}>
        {children}
      </span>
    </Context.Provider>
  );
}
export function AvatarImage({
  className,
  onLoad,
  onError,
  src,
  alt,
  ...props
}: React.ComponentPropsWithRef<"img">) {
  const c = useRequired(Context, "AvatarImage");
  const { setLoaded } = c;
  React.useEffect(() => {
    setLoaded(false);
  }, [src, setLoaded]);
  return (
    <img
      {...props}
      src={src}
      alt={alt ?? ""}
      className={cn("coal-avatar-image", className)}
      style={{ display: c.loaded ? undefined : "none" }}
      onLoad={(e) => {
        c.setLoaded(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        c.setLoaded(false);
        onError?.(e);
      }}
    />
  );
}
export function AvatarFallback({
  className,
  ...props
}: React.ComponentPropsWithRef<"span">) {
  const c = useRequired(Context, "AvatarFallback");
  return c.loaded ? null : (
    <span className={cn("coal-avatar-fallback", className)} {...props} />
  );
}
