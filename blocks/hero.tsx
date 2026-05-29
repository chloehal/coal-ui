import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function HeroBlock() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center gap-8 px-6 py-20 text-center">
      <Badge variant="secondary">Open source</Badge>
      <div className="flex max-w-2xl flex-col items-center gap-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Build your next product
          <span className="text-brand"> faster.</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Beautiful, accessible components you can copy into your project.
          Open source. Customizable. Yours.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="lg">Get started</Button>
        <Button size="lg" variant="outline">View on GitHub</Button>
      </div>
    </section>
  )
}
