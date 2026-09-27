"use client";
import * as React from "react";
import { cn } from "./internal.js";
export type CommandItem = {
  id: string;
  label: string;
  keywords?: string;
  disabled?: boolean;
};
export type CommandProps = {
  items: CommandItem[];
  onSelect: (id: string) => void;
  label?: string;
  placeholder?: string;
  emptyText?: string;
  className?: string;
};
export function Command({
  items,
  onSelect,
  label = "Search commands",
  placeholder = "Type a command…",
  emptyText = "No commands found.",
  className,
}: CommandProps) {
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState("");
  const id = React.useId();
  const root = React.useRef<HTMLDivElement>(null);
  const filtered = items.filter((i) =>
    (i.label + " " + (i.keywords ?? ""))
      .toLocaleLowerCase()
      .includes(query.toLocaleLowerCase()),
  );
  const enabled = filtered.filter((i) => !i.disabled);
  const current = enabled.find((i) => i.id === active) ?? enabled[0];
  const optionId = (item: CommandItem) => `${id}-${items.indexOf(item)}`;
  const activeId = current ? optionId(current) : undefined;
  React.useEffect(() => {
    if (activeId && root.current?.contains(document.activeElement))
      document.getElementById(activeId)?.scrollIntoView({ block: "nearest" });
  }, [activeId]);
  return (
    <div ref={root} className={cn("coal-command", className)}>
      <input
        className="coal-input"
        role="combobox"
        aria-label={label}
        aria-autocomplete="list"
        aria-expanded="true"
        aria-controls={`${id}-list`}
        aria-activedescendant={current ? optionId(current) : undefined}
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive("");
        }}
        onKeyDown={(e) => {
          if (
            ["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key) &&
            enabled.length
          ) {
            e.preventDefault();
            const index = enabled.indexOf(current!);
            setActive(
              enabled[
                e.key === "Home"
                  ? 0
                  : e.key === "End"
                    ? enabled.length - 1
                    : (index +
                        (e.key === "ArrowUp" ? -1 : 1) +
                        enabled.length) %
                      enabled.length
              ].id,
            );
          }
          if (e.key === "Enter" && current) {
            e.preventDefault();
            onSelect(current.id);
          }
        }}
      />
      <div id={`${id}-list`} role="listbox" aria-label={label}>
        {filtered.map((item) => (
          <div
            id={optionId(item)}
            role="option"
            key={item.id}
            aria-disabled={item.disabled || undefined}
            aria-selected={item === current}
            onMouseDown={(e) => e.preventDefault()}
            onPointerMove={() => {
              if (!item.disabled) setActive(item.id);
            }}
            onClick={() => {
              if (!item.disabled) onSelect(item.id);
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
      {!filtered.length && <p role="status">{emptyText}</p>}
    </div>
  );
}
