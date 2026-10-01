"use client";
import * as React from "react";
import { cn, setInputValue, useFormReset } from "./internal.js";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
} from "./popover.js";
export type ColorPickerProps = Omit<
  React.ComponentPropsWithRef<"input">,
  "type" | "size"
>;
const palette = [
  "#242424",
  "#686868",
  "#a0a0a0",
  "#d9d9d9",
  "#f0f0f0",
  "#ffffff",
  "#756887",
  "#485c78",
  "#447a85",
  "#476d60",
  "#728ca0",
  "#a7bbc0",
];
export function ColorPicker({
  className,
  value,
  defaultValue = "#756887",
  onChange,
  ref,
  disabled,
  ...props
}: ColorPickerProps) {
  const [local, setLocal] = React.useState(String(defaultValue));
  const color = String(value ?? local);
  const input = React.useRef<HTMLInputElement>(null);
  useFormReset(input, () => setLocal(String(defaultValue)));
  return (
    <Popover>
      <div className={cn("coal-color-field", className)}>
        <input
          {...props}
          ref={(node) => {
            input.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          type="text"
          spellCheck={false}
          pattern="#[a-fA-F0-9]{6}"
          maxLength={7}
          disabled={disabled}
          className="coal-input coal-color-picker"
          value={color}
          onChange={(e) => {
            onChange?.(e);
            if (!e.defaultPrevented) setLocal(e.target.value);
          }}
        />
        <PopoverTrigger
          disabled={disabled || props.readOnly}
          aria-label="Open color palette"
          className="coal-color-swatch"
          style={{
            backgroundColor: /^#[\da-f]{6}$/i.test(color) ? color : undefined,
          }}
        />
      </div>
      <PopoverContent className="coal-color-panel" aria-label="Color palette">
        <PopoverTitle>Choose a color</PopoverTitle>
        <p className="coal-picker-hint">
          Pick a swatch, or enter any six-digit hex value.
        </p>
        <div className="coal-color-grid">
          {palette.map((hex) => (
            <button
              key={hex}
              type="button"
              aria-label={`Use ${hex}`}
              aria-pressed={color.toLowerCase() === hex}
              style={{ backgroundColor: hex }}
              onClick={() => setInputValue(input.current, hex)}
            />
          ))}
        </div>
        <p className="coal-picker-hint">Current: {color}</p>
      </PopoverContent>
    </Popover>
  );
}
