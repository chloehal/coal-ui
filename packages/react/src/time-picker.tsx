"use client";
import * as React from "react";
import { cn, setInputValue, useFormReset } from "./internal.js";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
} from "./popover.js";
export type TimePickerProps = Omit<
  React.ComponentPropsWithRef<"input">,
  "type"
>;
export function TimePicker({
  className,
  value,
  defaultValue = "",
  onChange,
  onBlur,
  onKeyDown,
  ref,
  min,
  max,
  disabled,
  ...props
}: TimePickerProps) {
  const [local, setLocal] = React.useState(String(defaultValue));
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const input = React.useRef<HTMLInputElement>(null);
  const trigger = React.useRef<HTMLButtonElement>(null);
  useFormReset(input, () => {
    setLocal(String(defaultValue));
    setError("");
    input.current?.setCustomValidity("");
  });
  const id = React.useId();
  const time = String(value ?? local);
  const valid = (v: string) =>
    /^([01]\d|2[0-3]):[0-5]\d$/.test(v) &&
    (!min || v >= String(min)) &&
    (!max || v <= String(max));
  const current = /^([01]\d|2[0-3]):[0-5]\d$/.test(time) ? time : "12:00";
  const choose = (v: string) => {
    if (valid(v)) setInputValue(input.current, v);
  };
  const validate = (node: HTMLInputElement, announce = true) => {
    const message =
      node.value && !valid(node.value)
        ? `Enter a time in HH:MM format${min ? ` from ${min}` : ""}${max ? ` to ${max}` : ""}.`
        : "";
    node.setCustomValidity(message);
    if (announce || !message) setError(message);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="coal-time-field">
        <div className="coal-picker-input-row">
          <input
            {...props}
            ref={(node) => {
              input.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) ref.current = node;
            }}
            type="text"
            inputMode="numeric"
            placeholder="HH:MM"
            pattern="([01][0-9]|2[0-3]):[0-5][0-9]"
            maxLength={5}
            disabled={disabled}
            value={time}
            className={cn("coal-input", "coal-time-picker", className)}
            aria-invalid={!!error || props["aria-invalid"]}
            aria-describedby={
              [props["aria-describedby"], error ? `${id}-error` : null]
                .filter(Boolean)
                .join(" ") || undefined
            }
            onChange={(e) => {
              onChange?.(e);
              if (!e.defaultPrevented) {
                setLocal(e.target.value);
                validate(e.target, false);
              }
            }}
            onBlur={(e) => {
              validate(e.target);
              onBlur?.(e);
            }}
            onKeyDown={(e) => {
              onKeyDown?.(e);
              if (e.defaultPrevented || props.readOnly) return;
              if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                e.preventDefault();
                const [h, m] = current.split(":").map(Number);
                const n = Math.max(
                  0,
                  Math.min(1439, h * 60 + m + (e.key === "ArrowUp" ? 1 : -1)),
                );
                choose(
                  `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`,
                );
              }
            }}
          />
          <PopoverTrigger
            ref={trigger}
            disabled={disabled || props.readOnly}
            className="coal-picker-trigger"
            aria-label="Open time picker"
          >
            <span aria-hidden="true">▦</span>
          </PopoverTrigger>
        </div>
        {error && (
          <p id={`${id}-error`} role="alert" className="coal-field-error">
            {error}
          </p>
        )}
      </div>
      <PopoverContent className="coal-time-panel" aria-label="Time picker">
        <PopoverTitle>Choose a time</PopoverTitle>
        <p className="coal-picker-hint">
          24-hour time. You can also type any exact minute.
        </p>
        <div role="group" aria-label="Hours">
          <p className="coal-picker-label">Hour</p>
          <div className="coal-time-grid">
            {Array.from({ length: 24 }, (_, n) =>
              String(n).padStart(2, "0"),
            ).map((h) => (
              <button
                type="button"
                key={h}
                aria-label={`Hour ${h}`}
                aria-pressed={current.slice(0, 2) === h}
                disabled={!valid(`${h}:${current.slice(3)}`)}
                onClick={() => choose(`${h}:${current.slice(3)}`)}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
        <div role="group" aria-label="Minutes">
          <p className="coal-picker-label">Minute</p>
          <div className="coal-time-grid">
            {Array.from({ length: 12 }, (_, n) =>
              String(n * 5).padStart(2, "0"),
            ).map((m) => (
              <button
                type="button"
                key={m}
                aria-label={`Minute ${m}`}
                aria-pressed={current.slice(3) === m}
                disabled={!valid(`${current.slice(0, 2)}:${m}`)}
                onClick={() => {
                  choose(`${current.slice(0, 2)}:${m}`);
                  setOpen(false);
                  trigger.current?.focus();
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
