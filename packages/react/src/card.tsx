import * as React from "react";
import { cn } from "./internal.js";
export function Card({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return <div className={cn("coal-card", className)} {...props} />;
}
export function CardHeader({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return <div className={cn("coal-card-header", className)} {...props} />;
}
export function CardTitle({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return <div className={cn("coal-card-title", className)} {...props} />;
}
export function CardDescription({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return <div className={cn("coal-card-description", className)} {...props} />;
}
export function CardContent({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return <div className={cn("coal-card-content", className)} {...props} />;
}
export function CardFooter({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return <div className={cn("coal-card-footer", className)} {...props} />;
}
