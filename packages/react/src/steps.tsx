import * as React from "react";
import { cn } from "./internal.js";
export type StepsProps = React.ComponentPropsWithRef<"ol"> & {
  steps: { id: string; label: string; description?: string }[];
  current: number;
};
export function Steps({ steps, current, className, ...props }: StepsProps) {
  return (
    <ol
      className={cn("coal-steps", className)}
      aria-label="Progress"
      {...props}
    >
      {steps.map((step, i) => (
        <li
          key={step.id}
          aria-current={i === current ? "step" : undefined}
          data-complete={i < current || undefined}
        >
          <span className="coal-step-number" aria-hidden="true">
            {i < current ? "✓" : i + 1}
          </span>
          <div>
            <strong>{step.label}</strong>
            {step.description && <p>{step.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
