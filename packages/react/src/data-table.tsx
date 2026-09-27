"use client";
import * as React from "react";
import { cn } from "./internal.js";
import { Checkbox } from "./checkbox.js";
import { Pagination } from "./pagination.js";
export type DataTableColumn<T> = {
  id: string;
  header: string;
  value: (row: T) => string | number;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
};
export type DataTableProps<T> = {
  rows: T[];
  columns: DataTableColumn<T>[];
  getRowId: (row: T) => string;
  caption: string;
  pageSize?: number;
  selectable?: boolean;
  onSelectionChange?: (ids: string[]) => void;
  className?: string;
};
export function DataTable<T>({
  rows,
  columns,
  getRowId,
  caption,
  pageSize = 5,
  selectable = false,
  onSelectionChange,
  className,
}: DataTableProps<T>) {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<{
    id: string;
    descending: boolean;
  } | null>(null);
  const [page, setPage] = React.useState(1);
  const [selection, setSelection] = React.useState<string[]>([]);
  const selected = selection.filter((id) =>
    rows.some((row) => getRowId(row) === id),
  );
  const size = Math.max(1, Math.floor(pageSize) || 5);
  const filtered = rows.filter((row) =>
    columns.some((col) =>
      String(col.value(row))
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()),
    ),
  );
  const column = columns.find((c) => c.id === sort?.id);
  if (column && sort)
    filtered.sort((a, b) => {
      const x = column.value(a),
        y = column.value(b);
      return (
        (typeof x === "number" && typeof y === "number"
          ? x - y
          : String(x).localeCompare(String(y), undefined, { numeric: true })) *
        (sort.descending ? -1 : 1)
      );
    });
  const pages = Math.max(1, Math.ceil(filtered.length / size));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * size, current * size);
  function update(ids: string[]) {
    setSelection(ids);
    onSelectionChange?.(ids);
  }
  const all =
    visible.length > 0 && visible.every((r) => selected.includes(getRowId(r)));
  return (
    <div className={cn("coal-data-table", className)}>
      <input
        className="coal-input"
        type="search"
        aria-label={`Filter ${caption}`}
        placeholder="Filter rows…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
      />
      <div className="coal-table-container">
        <table className="coal-table">
          <caption>{caption}</caption>
          <thead>
            <tr>
              {selectable && (
                <th scope="col">
                  <Checkbox
                    aria-label="Select visible rows"
                    checked={all}
                    indeterminate={
                      !all &&
                      visible.some((r) => selected.includes(getRowId(r)))
                    }
                    onCheckedChange={(checked) =>
                      update(
                        checked
                          ? Array.from(
                              new Set([...selected, ...visible.map(getRowId)]),
                            )
                          : selected.filter(
                              (id) => !visible.some((r) => getRowId(r) === id),
                            ),
                      )
                    }
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.id}
                  scope="col"
                  aria-sort={
                    sort?.id === col.id
                      ? sort.descending
                        ? "descending"
                        : "ascending"
                      : undefined
                  }
                >
                  {col.sortable === false ? (
                    col.header
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setSort({
                          id: col.id,
                          descending:
                            sort?.id === col.id ? !sort.descending : false,
                        });
                        setPage(1);
                      }}
                    >
                      {col.header}
                      <span aria-hidden="true">
                        {" "}
                        {sort?.id === col.id
                          ? sort.descending
                            ? "↓"
                            : "↑"
                          : "↕"}
                      </span>
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr
                key={getRowId(row)}
                data-selected={selected.includes(getRowId(row)) || undefined}
              >
                {selectable && (
                  <td>
                    <Checkbox
                      aria-label={`Select row ${getRowId(row)}`}
                      checked={selected.includes(getRowId(row))}
                      onCheckedChange={(checked) =>
                        update(
                          checked
                            ? [...selected, getRowId(row)]
                            : selected.filter((id) => id !== getRowId(row)),
                        )
                      }
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.id}>
                    {col.render ? col.render(row) : col.value(row)}
                  </td>
                ))}
              </tr>
            ))}
            {!visible.length && (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="coal-data-table-footer">
        <span role="status">
          {filtered.length} results
          {selectable ? ` · ${selected.length} selected` : ""}
        </span>
        <Pagination page={current} pageCount={pages} onPageChange={setPage} />
      </div>
    </div>
  );
}
