"use client";
import { Button } from "./button.js";
export type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  label?: string;
};
export function Pagination({
  page,
  pageCount,
  onPageChange,
  label = "Pagination",
}: PaginationProps) {
  const count = Math.max(1, Math.floor(pageCount) || 1);
  const current = Math.max(1, Math.min(count, Math.floor(page) || 1));
  const pages = Array.from(
    new Set([1, current - 1, current, current + 1, count]),
  )
    .filter((n) => n >= 1 && n <= count)
    .sort((a, b) => a - b);
  return (
    <nav aria-label={label} className="coal-pagination">
      <Button
        size="sm"
        variant="ghost"
        disabled={current === 1}
        aria-label="Previous page"
        onClick={() => onPageChange(current - 1)}
      >
        ←
      </Button>
      {pages.map((n, i) => (
        <span className="coal-pagination-item" key={n}>
          {i > 0 && n - pages[i - 1] > 1 && (
            <span aria-hidden="true" className="coal-pagination-ellipsis">
              …
            </span>
          )}
          <Button
            size="sm"
            variant={current === n ? "secondary" : "ghost"}
            aria-current={current === n ? "page" : undefined}
            aria-label={`Page ${n}`}
            onClick={() => onPageChange(n)}
          >
            {n}
          </Button>
        </span>
      ))}
      <Button
        size="sm"
        variant="ghost"
        disabled={current === count}
        aria-label="Next page"
        onClick={() => onPageChange(current + 1)}
      >
        →
      </Button>
    </nav>
  );
}
