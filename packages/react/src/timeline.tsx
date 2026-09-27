import * as React from "react";
import { cn } from "./internal.js";
export function Timeline({
  className,
  ...props
}: React.ComponentPropsWithRef<"ol">) {
  return <ol className={cn("coal-timeline", className)} {...props} />;
}
export type TimelineItemProps = React.ComponentPropsWithRef<"li"> & {
  dateTime: string;
  timeLabel: string;
  title: string;
};
export function TimelineItem({
  dateTime,
  timeLabel,
  title,
  children,
  className,
  ...props
}: TimelineItemProps) {
  return (
    <li className={cn("coal-timeline-item", className)} {...props}>
      <time dateTime={dateTime}>{timeLabel}</time>
      <strong>{title}</strong>
      {children && <div>{children}</div>}
    </li>
  );
}
