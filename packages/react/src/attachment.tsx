"use client";
import * as React from "react";
import { Button } from "./button.js";
import { cn, useValue } from "./internal.js";
export type AttachmentProps = {
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  disabled?: boolean;
  value?: File[];
  onValueChange?: (files: File[]) => void;
  className?: string;
};
function accepts(file: File, accept?: string) {
  return (
    !accept ||
    accept.split(",").some((rule) => {
      const r = rule.trim().toLowerCase();
      return r.startsWith(".")
        ? file.name.toLowerCase().endsWith(r)
        : r.endsWith("/*")
          ? file.type.toLowerCase().startsWith(r.slice(0, -1))
          : file.type.toLowerCase() === r;
    })
  );
}
export function Attachment({
  label = "Attach files",
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024,
  disabled,
  value,
  onValueChange,
  className,
}: AttachmentProps) {
  const [files, set] = useValue(value, [], onValueChange);
  const [error, setError] = React.useState("");
  const id = React.useId();
  const input = React.useRef<HTMLInputElement>(null);
  return (
    <div className={cn("coal-attachment", className)}>
      <span id={`${id}-label`}>{label}</span>
      <Button
        variant="outline"
        disabled={disabled}
        aria-labelledby={`${id}-label ${id}-action`}
        aria-describedby={`${id}-hint ${id}-error`}
        onClick={() => input.current?.click()}
      >
        <span aria-hidden="true">＋</span>
        <span id={`${id}-action`}>Choose files</span>
      </Button>
      <input
        id={id}
        ref={input}
        hidden
        aria-labelledby={`${id}-label`}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        aria-invalid={!!error || undefined}
        aria-describedby={`${id}-hint ${id}-error`}
        onChange={(e) => {
          const chosen = Array.from(e.target.files ?? []);
          const invalid = chosen.filter(
            (f) => f.size > maxSize || !accepts(f, accept),
          );
          setError(
            invalid.length
              ? `Rejected: ${invalid.map((f) => f.name).join(", ")}. Check file type and size.`
              : "",
          );
          set(chosen.filter((f) => !invalid.includes(f)));
          e.target.value = "";
        }}
      />
      <p id={`${id}-hint`}>
        Up to {Math.round((maxSize / 1024 / 1024) * 10) / 10} MB per file
        {accept ? ` · ${accept}` : ""}
      </p>
      <p id={`${id}-error`} role="status">
        {error}
      </p>
      <ul>
        {files.map((file, i) => (
          <li key={`${file.name}-${i}`}>
            <span>{file.name}</span>
            <button
              type="button"
              disabled={disabled}
              aria-label={`Remove ${file.name}`}
              onClick={() => set(files.filter((_, j) => i !== j))}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
