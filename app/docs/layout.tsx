import Link from "next/link"

const navItems = [
  {
    label: "Getting Started",
    items: [
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/theming",      label: "Theming" },
    ],
  },
  {
    label: "Components",
    items: [
      { href: "/docs/components/button",  label: "Button" },
      { href: "/docs/components/input",   label: "Input" },
      { href: "/docs/components/card",    label: "Card" },
      { href: "/docs/components/badge",   label: "Badge" },
      { href: "/docs/components/dialog",  label: "Dialog" },
      { href: "/docs/components/select",  label: "Select" },
      { href: "/docs/components/tabs",    label: "Tabs" },
      { href: "/docs/components/tooltip", label: "Tooltip" },
    ],
  },
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 shrink-0 border-r px-4 py-8 overflow-y-auto sticky top-0 h-screen">
        <Link href="/" className="font-semibold text-lg mb-6 block">
          coal.ui
        </Link>
        <nav className="space-y-6">
          {navItems.map((section) => (
            <div key={section.label}>
              <p className="mb-1 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {section.label}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-md px-2 py-1.5 text-sm text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <main className="flex-1 max-w-3xl mx-auto px-8 py-12">
        {children}
      </main>
    </div>
  )
}
