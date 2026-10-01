"use client";
import { LoadingGlyph } from "./loading-glyph.js";
import { Action, cn, type ActionProps } from "./internal.js";
export type ButtonProps = ActionProps & {
  loading?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
};
export function buttonVariants({
  variant = "default",
  size = "default",
  className,
}: Pick<ButtonProps, "variant" | "size" | "className"> = {}) {
  return cn(
    "coal-button",
    `coal-button--${variant}`,
    `coal-button--${size}`,
    className,
  );
}
export function Button({
  variant,
  size,
  className,
  loading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <Action
      className={buttonVariants({ variant, size, className })}
      {...props}
      {...(disabled !== undefined || loading
        ? { disabled: disabled || loading }
        : {})}
      aria-busy={loading || undefined}
    >
      {loading ? (
        <>
          <span className="coal-button-loading" aria-hidden="true">
            <LoadingGlyph />
          </span>
          {children ??
            (
              props.render?.props as
                | { children?: import("react").ReactNode }
                | undefined
            )?.children}
        </>
      ) : (
        children
      )}
    </Action>
  );
}
