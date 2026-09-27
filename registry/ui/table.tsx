import * as React from "react";
import { cn } from "@/lib/utils";
export function Table({
  className,
  ...props
}: React.ComponentPropsWithRef<"table">) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn("w-full text-left text-sm", className)} {...props} />
    </div>
  );
}
export function TableHeader(props: React.ComponentPropsWithRef<"thead">) {
  return <thead {...props} />;
}
export function TableBody(props: React.ComponentPropsWithRef<"tbody">) {
  return <tbody {...props} />;
}
export function TableRow({
  className,
  ...props
}: React.ComponentPropsWithRef<"tr">) {
  return (
    <tr
      className={cn(
        "border-b border-border transition-colors hover:bg-muted/50",
        className,
      )}
      {...props}
    />
  );
}
export function TableHead({
  className,
  ...props
}: React.ComponentPropsWithRef<"th">) {
  return (
    <th
      scope="col"
      className={cn("h-10 px-3 font-medium text-muted-foreground", className)}
      {...props}
    />
  );
}
export function TableCell({
  className,
  ...props
}: React.ComponentPropsWithRef<"td">) {
  return <td className={cn("p-3", className)} {...props} />;
}
export function TableCaption({
  className,
  ...props
}: React.ComponentPropsWithRef<"caption">) {
  return (
    <caption
      className={cn("py-3 text-left text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
