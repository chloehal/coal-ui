"use client";
import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
export function CopyButton({
  text,
  label = "Copy",
}: {
  text: string;
  label?: string;
}) {
  const [status, setStatus] = React.useState("");
  React.useEffect(() => {
    if (status) {
      const t = setTimeout(() => setStatus(""), 2200);
      return () => clearTimeout(t);
    }
  }, [status]);
  return (
    <Button
      size="sm"
      variant="ghost"
      aria-label={label}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setStatus("Copied");
        } catch {
          setStatus("Select and copy manually");
        }
      }}
    >
      {status === "Copied" ? <Check size={13} /> : <Copy size={13} />}
      <span aria-live="polite">{status || label}</span>
    </Button>
  );
}
