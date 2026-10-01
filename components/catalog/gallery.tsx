"use client";
import * as React from "react";
import { useLayoutMotion } from "@/packages/react/src/motion";
import { PixelMark } from "@chlohal/coal-ui";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Search } from "lucide-react";
import { catalog, categories, type Category } from "@/lib/catalog";
import { Demo } from "./demos";
import { Button } from "@/components/ui/button";
export function Gallery() {
  const motion = useLayoutMotion<HTMLDivElement>();
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
          <span className="ember-dot" /> PRECISE PARTS. ORGANIC POSSIBILITIES.{" "}
          <span className="version">v0.5</span>
        </div>
        <div className="intro-heading">
          <h1>
            Built on a grid.
            <br />
            <span className="intro-secondary">Made to feel alive.</span>
          </h1>
          <div className="intro-organic" aria-hidden="true">
            <PixelMark size={208} className="hero-bloom" />
            <span>SMALL SQUARES / SOFT FORMS</span>
          </div>
        </div>
        <div className="intro-bottom">
          <p>
            Thoughtful components for interfaces that feel like you.
            <br className="desktop-break" /> Cool in tone. Soft in motion. Yours
            to build with.
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
            <p>Small squares. A whole new feel.</p>
          </div>
          <div className="gallery-search">
            <Search size={14} />
            <input
              aria-label="Search components"
              placeholder="Search components…"
              value={query}
              onChange={(e) => {
                motion.capture();
                setQuery(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="filter-row" role="group" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={c === category}
              className={c === category ? "filter active" : "filter"}
              onClick={() => {
                motion.capture();
                setCategory(c);
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="component-grid" ref={motion.ref}>
          {filtered.map((item) => (
            <article
              key={item.name}
              data-motion-key={item.name}
              className="component-tile"
            >
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
                motion.capture();
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
          <PixelMark size={22} variant="seed" /> Precise by construction. Alive
          by interaction.
        </span>
        <Link href="/docs/coverage">
          Explore the coverage report <ArrowRight size={14} />
        </Link>
      </footer>
    </>
  );
}
