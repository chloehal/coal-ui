"use client";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
export type DatePickerProps = {
  value?: Date;
  onValueChange: (date: Date | undefined) => void;
  label?: string;
  disabled?: boolean;
  locale?: string;
};
export function DatePicker({
  value,
  onValueChange,
  label = "Choose a date",
  disabled,
  locale = "en-GB",
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        render={<Button variant="outline" />}
        aria-label={
          value ? `${label}: ${value.toLocaleDateString(locale)}` : label
        }
      >
        {value
          ? value.toLocaleDateString(locale, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : label}
        <span aria-hidden="true">⌄</span>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Calendar
          mode="single"
          selected={value}
          defaultMonth={value}
          onSelect={(date) => {
            onValueChange(date);
            setOpen(false);
          }}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
