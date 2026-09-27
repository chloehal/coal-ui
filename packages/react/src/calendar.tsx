"use client";
import * as React from "react";
import { cn } from "./internal.js";
export type DateRange = { from: Date; to?: Date };
type Common = {
  defaultMonth?: Date;
  locale?: string;
  disabled?: (date: Date) => boolean;
  className?: string;
  autoFocus?: boolean;
  weekStartsOn?: 0 | 1;
};
export type CalendarProps = Common &
  (
    | {
        mode?: "single";
        selected?: Date;
        onSelect?: (date: Date | undefined) => void;
      }
    | {
        mode: "multiple";
        selected?: Date[];
        onSelect?: (dates: Date[]) => void;
      }
    | {
        mode: "range";
        selected?: DateRange;
        onSelect?: (range: DateRange | undefined) => void;
      }
  );
const same = (a: Date | undefined, b: Date) =>
  !!a &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();
const start = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const key = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
function shiftMonth(d: Date, n: number) {
  const result = new Date(d.getFullYear(), d.getMonth() + n, 1);
  result.setDate(
    Math.min(
      d.getDate(),
      new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate(),
    ),
  );
  return result;
}
export function Calendar(props: CalendarProps) {
  const {
    defaultMonth,
    locale = "en-US",
    disabled,
    className,
    autoFocus = false,
    weekStartsOn = 0,
  } = props;
  const firstSelected =
    props.mode === "multiple"
      ? props.selected?.[0]
      : props.mode === "range"
        ? props.selected?.from
        : props.selected;
  const [month, setMonth] = React.useState(() =>
    start(defaultMonth ?? firstSelected ?? new Date()),
  );
  const [focus, setFocus] = React.useState(
    () => firstSelected ?? defaultMonth ?? new Date(),
  );
  const root = React.useRef<HTMLDivElement | null>(null);
  const pending = React.useRef(false);
  React.useEffect(() => {
    if (pending.current) {
      root.current
        ?.querySelector<HTMLButtonElement>(`[data-date="${key(focus)}"]`)
        ?.focus();
      pending.current = false;
    }
  }, [focus, month]);
  const title = month.toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
  });
  const first = new Date(
    month.getFullYear(),
    month.getMonth(),
    1 - ((month.getDay() - weekStartsOn + 7) % 7),
  );
  const days = Array.from(
    { length: 42 },
    (_, i) =>
      new Date(first.getFullYear(), first.getMonth(), first.getDate() + i),
  );
  function selected(d: Date) {
    if (props.mode === "multiple")
      return props.selected?.some((v) => same(v, d));
    if (props.mode === "range")
      return (
        !!props.selected &&
        d >= props.selected.from &&
        d <= (props.selected.to ?? props.selected.from)
      );
    return same(props.selected, d);
  }
  function choose(d: Date) {
    if (disabled?.(d)) return;
    if (props.mode === "multiple") {
      props.onSelect?.(
        selected(d)
          ? (props.selected ?? []).filter((v) => !same(v, d))
          : [...(props.selected ?? []), d],
      );
    } else if (props.mode === "range") {
      const old = props.selected;
      props.onSelect?.(
        !old || old.to
          ? { from: d }
          : d < old.from
            ? { from: d, to: old.from }
            : { from: old.from, to: d },
      );
    } else props.onSelect?.(same(props.selected, d) ? undefined : d);
  }
  function keyboard(e: React.KeyboardEvent<HTMLButtonElement>, d: Date) {
    let next: Date | undefined;
    const offsets: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };
    if (e.key in offsets)
      next = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate() + offsets[e.key],
      );
    if (e.key === "Home")
      next = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate() - ((d.getDay() - weekStartsOn + 7) % 7),
      );
    if (e.key === "End")
      next = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate() + 6 - ((d.getDay() - weekStartsOn + 7) % 7),
      );
    if (e.key === "PageUp" || e.key === "PageDown")
      next = shiftMonth(
        d,
        (e.key === "PageUp" ? -1 : 1) * (e.shiftKey ? 12 : 1),
      );
    if (!next) return;
    e.preventDefault();
    const direction = next < d ? -1 : 1;
    for (let i = 0; i < 366 && disabled?.(next); i++)
      next = new Date(
        next.getFullYear(),
        next.getMonth(),
        next.getDate() + direction,
      );
    if (disabled?.(next)) return;
    pending.current = true;
    setFocus(next);
    setMonth(start(next));
  }
  const inMonth =
    focus.getMonth() === month.getMonth() &&
    focus.getFullYear() === month.getFullYear();
  const tabDate = inMonth
    ? focus
    : days.find((d) => d.getMonth() === month.getMonth() && !disabled?.(d));
  return (
    <div ref={root} className={cn("coal-calendar", className)}>
      <div className="coal-calendar-header">
        <button
          type="button"
          aria-label="Go to the Previous Month"
          onClick={() => setMonth(shiftMonth(month, -1))}
        >
          ←
        </button>
        <span aria-live="polite">{title}</span>
        <button
          type="button"
          aria-label="Go to the Next Month"
          onClick={() => setMonth(shiftMonth(month, 1))}
        >
          →
        </button>
      </div>
      <table role="grid" aria-label={title}>
        <thead>
          <tr>
            {days.slice(0, 7).map((d) => (
              <th
                key={d.getDay()}
                scope="col"
                aria-label={d.toLocaleDateString(locale, { weekday: "long" })}
              >
                {d.toLocaleDateString(locale, { weekday: "short" })}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }, (_, row) => (
            <tr key={row}>
              {days.slice(row * 7, row * 7 + 7).map((d) => (
                <td
                  key={key(d)}
                  role="gridcell"
                  aria-selected={!!selected(d)}
                  data-outside={d.getMonth() !== month.getMonth() || undefined}
                >
                  <button
                    type="button"
                    data-date={key(d)}
                    data-today={same(new Date(), d) || undefined}
                    tabIndex={tabDate && same(tabDate, d) ? 0 : -1}
                    autoFocus={autoFocus && !!tabDate && same(tabDate, d)}
                    disabled={disabled?.(d)}
                    aria-label={d.toLocaleDateString(locale, {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    onFocus={() => setFocus(d)}
                    onKeyDown={(e) => keyboard(e, d)}
                    onClick={() => choose(d)}
                  >
                    {d.getDate()}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
