"use client";
import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Search } from "lucide-react";
import { catalog, categories, type Category } from "@/lib/catalog";
import { Demo } from "./demos";
import { Button } from "@/components/ui/button";
export function Gallery() {
  const [category, setCategory] = React.useState<Category>("All components");
  const [query, setQuery] = React.useState("");
  const filtered = catalog.filter(
    (i) =>
      (category === "All components" || i.category === category) &&
      (i.title + " " + i.description)
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <section className="intro">
        <div className="eyebrow">
          <span className="ember-dot" /> THE COMPONENT COLLECTION{" "}
          <span className="version">v0.5</span>
        </div>
        <h1>
          Less noise.
          <br />
          <span className="intro-secondary">More character.</span>
        </h1>
        <div className="intro-bottom">
          <p>
            Thoughtful components for interfaces that feel like you.
            <br className="desktop-break" /> Warm by nature. Minimal by design.
            Yours to build with.
          </p>
          <Link className="intro-link" href="/docs/installation">
            Start building <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="library-meta">
          <span>
            <span className="meta-check">✓</span> React 19
          </span>
          <span>
            <span className="meta-check">✓</span> CSS included
          </span>
          <span>
            <span className="meta-check">✓</span> Original components
          </span>
          <span className="meta-last">
            Made to be made yours <ArrowUpRight size={12} />
          </span>
        </div>
      </section>
      <section className="collection" aria-label="Component collection">
        <div className="collection-heading">
          <div>
            <h2>
              The essentials
              <span className="component-count">{catalog.length}</span>
            </h2>
            <p>Small pieces. Endless possibilities.</p>
          </div>
          <div className="gallery-search">
            <Search size={14} />
            <input
              aria-label="Search components"
              placeholder="Search components…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="filter-row" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={c === category}
              className={c === category ? "filter active" : "filter"}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="component-grid">
          {filtered.map((item) => (
            <article key={item.name} className="component-tile">
              <div className="tile-preview">
                <Demo name={item.name} />
              </div>
              <Link
                className="tile-caption"
                href={"/docs/components/" + item.name}
              >
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <ArrowUpRight size={15} />
              </Link>
              <span className="tile-index" aria-hidden="true">
                {String(catalog.indexOf(item) + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>
        {!filtered.length && (
          <div className="search-empty">
            <h3>No components found.</h3>
            <p>Try a different name or category.</p>
            <Button
              variant="outline"
              onClick={() => {
                setQuery("");
                setCategory("All components");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </section>
      <footer className="page-footer">
        <span>
          <span className="coal-mark small" /> A little less. A little better.
        </span>
        <Link href="/docs/coverage">
          Explore the coverage report <ArrowRight size={14} />
        </Link>
      </footer>
    </>
  );
}
