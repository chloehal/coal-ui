"use client";
import { PixelMark, PixelClickFeedback } from "@chlohal/coal-ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { ArrowUpRight, Search, Moon, Sun, Menu, X } from "lucide-react";
import { catalog, categories } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [dark, setDark] = React.useState(false);
  const [mobile, setMobile] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const input = React.useRef<HTMLInputElement>(null);
  const menuButton = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    try {
      const next = localStorage.getItem("coal-theme") === "dark";
      setDark(next);
      document.documentElement.classList.toggle("dark", next);
    } catch {}
    const listener = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setMobile(true);
        input.current?.focus();
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);
  React.useEffect(() => setMobile(false), [path]);
  React.useEffect(() => {
    if (mobile) input.current?.focus();
  }, [mobile]);
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("coal-theme", next ? "dark" : "light");
    } catch {}
  }
  return (
    <>
      <PixelClickFeedback />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <Link href="/" className="wordmark" aria-label="coal.ui home">
          <PixelMark size={32} variant="seed" className="brand-pixels" />
          coal<span className="text-muted-foreground">.ui</span>
        </Link>
        <nav aria-label="Main navigation" className="header-nav">
          <Link className={path === "/" ? "active" : ""} href="/">
            Components
          </Link>
          <Link
            className={path.startsWith("/docs") ? "active" : ""}
            href="/docs/installation"
          >
            Documentation
          </Link>
          <Link href="/docs/coverage">Coverage</Link>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <a
            className="github-link"
            href="https://github.com/chlohal/coal-ui"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ArrowUpRight size={13} />
          </a>
          <span className="header-divider" />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={dark ? "Use light theme" : "Use dark theme"}
          >
            {dark ? <Sun /> : <Moon />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu"
            ref={menuButton}
            aria-controls="component-navigation"
            aria-label={mobile ? "Close navigation" : "Open navigation"}
            aria-expanded={mobile}
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X /> : <Menu />}
          </Button>
        </div>
      </header>
      <div className="site-layout">
        <aside
          id="component-navigation"
          onKeyDown={(e) => {
            if (mobile && e.key === "Escape" && !e.defaultPrevented) {
              e.preventDefault();
              setMobile(false);
              menuButton.current?.focus();
            }
          }}
          onBlurCapture={(e) => {
            if (
              mobile &&
              e.relatedTarget instanceof Node &&
              !e.currentTarget.contains(e.relatedTarget) &&
              e.relatedTarget !== menuButton.current
            )
              setMobile(false);
          }}
          className={"sidebar " + (mobile ? "sidebar-open" : "")}
          aria-label="Component navigation"
        >
          <div className="search-box">
            <Search size={14} />
            <input
              ref={input}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find a component…"
              aria-label="Search navigation"
            />
            <Kbd>⌘ K</Kbd>
          </div>
          <div className="sidebar-scroll">
            <p className="nav-label">THE LIBRARY</p>
            <Link
              className={"side-link " + (path === "/" ? "selected" : "")}
              href="/"
            >
              Overview <span>{catalog.length}</span>
            </Link>
            <Link className="side-link" href="/docs/installation">
              Getting started <ArrowUpRight size={12} />
            </Link>
            <Link
              className={
                "side-link " + (path === "/docs/foundations" ? "selected" : "")
              }
              href="/docs/foundations"
            >
              Foundations <ArrowUpRight size={12} />
            </Link>
            {categories.slice(1).map((category) => {
              const items = catalog.filter(
                (i) =>
                  i.category === category &&
                  i.title.toLowerCase().includes(search.toLowerCase()),
              );
              return items.length ? (
                <section key={category}>
                  <p className="nav-label">{category}</p>
                  {items.map((item) => (
                    <Link
                      key={item.name}
                      className={
                        "side-link " +
                        (path.endsWith("/" + item.name) ? "selected" : "")
                      }
                      aria-current={
                        path === "/docs/components/" + item.name
                          ? "page"
                          : undefined
                      }
                      href={"/docs/components/" + item.name}
                    >
                      {item.title}
                      {["switch", "field", "sheet"].includes(item.name) && (
                        <span className="new-dot" />
                      )}
                    </Link>
                  ))}
                </section>
              ) : null;
            })}
            {search &&
              !catalog.some((i) =>
                i.title.toLowerCase().includes(search.toLowerCase()),
              ) && (
                <p className="p-3 text-xs text-muted-foreground">
                  No components found.
                </p>
              )}
          </div>
          <div className="sidebar-footer">
            <span className="ember-dot" /> A little less. A little better.
            <span className="mt-1 block pl-3 text-[10px]">
              DESIGNED BY CHLOHAL
            </span>
          </div>
        </aside>
        <main id="main-content" className="main-content" tabIndex={-1}>
          {children}
        </main>
      </div>
    </>
  );
}
