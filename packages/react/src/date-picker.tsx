"use client";
import * as React from "react";
import { Calendar } from "./calendar.js";
import { Popover, PopoverTrigger, PopoverContent } from "./popover.js";
import { Button } from "./button.js";
export type DatePickerProps = {
  value?: Date;
  onValueChange: (date: Date | undefined) => void;
  label?: string;
  disabled?: boolean;
  locale?: string;
  name?: string;
};
export function DatePicker({
  value,
  onValueChange,
  label = "Choose a date",
  disabled,
  locale = "en-GB",
  name,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      {name && (
        <input
          type="hidden"
          name={name}
          value={
            value
              ? `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`
              : ""
          }
        />
      )}
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
      <PopoverContent aria-label={label}>
        <Calendar
          mode="single"
          selected={value}
          defaultMonth={value}
          autoFocus
          onSelect={(date) => {
            onValueChange(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
