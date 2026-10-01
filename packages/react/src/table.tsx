import * as React from "react";
import { cn } from "./internal.js";
export function Table({
  className,
  ...props
}: React.ComponentPropsWithRef<"table">) {
  return (
    <div className="coal-table-scroll" tabIndex={0}>
      <table className={cn("coal-table", className)} {...props} />
    </div>
  );
}
export function TableHeader({
  className,
  ...props
}: React.ComponentPropsWithRef<"thead">) {
  return <thead className={cn("coal-table-header", className)} {...props} />;
}
export function TableBody({
  className,
  ...props
}: React.ComponentPropsWithRef<"tbody">) {
  return <tbody className={cn("coal-table-body", className)} {...props} />;
}
export function TableHead({
  className,
  ...props
}: React.ComponentPropsWithRef<"th">) {
  return (
    <th scope="col" className={cn("coal-table-head", className)} {...props} />
  );
}
export function TableRow({
  className,
  ...props
}: React.ComponentPropsWithRef<"tr">) {
  return <tr className={cn("coal-table-row", className)} {...props} />;
}
export function TableCell({
  className,
  ...props
}: React.ComponentPropsWithRef<"td">) {
  return <td className={cn("coal-table-cell", className)} {...props} />;
}
export function TableCaption({
  className,
  ...props
}: React.ComponentPropsWithRef<"caption">) {
  return <caption className={cn("coal-table-caption", className)} {...props} />;
}
