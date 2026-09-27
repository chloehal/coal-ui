"use client";
import * as React from "react";
import { Radio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { cn } from "@/lib/utils";
export const RadioGroup = BaseRadioGroup;
export function RadioGroupItem({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Radio.Root>) {
  return (
    <Radio.Root
      className={cn(
        "flex size-4 items-center justify-center rounded-full border border-input focus-visible:outline-2 focus-visible:outline-ring data-[checked]:border-primary disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <Radio.Indicator className="size-2 rounded-full bg-primary" />
    </Radio.Root>
  );
}
