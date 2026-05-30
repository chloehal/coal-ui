import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-20 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="text-5xl font-bold tracking-tight">coal.ui</div>
        <p className="text-lg text-muted-foreground max-w-md">
          A React component library distributed via the shadcn registry.
          Built with Base UI, Tailwind v4, and a warm OKLCH palette.
        </p>
      </div>
      <div className="flex gap-3">
        <Link
          href="/docs/installation"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Get started
        </Link>
        <a
          href="https://github.com/chlohal/coal-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          GitHub
        </a>
      </div>
    </main>
  )
}
