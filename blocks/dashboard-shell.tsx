import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function DashboardShellBlock() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex h-14 items-center gap-4 px-6">
          <span className="font-semibold">coal.ui</span>
          <nav className="flex items-center gap-1 ml-4">
            {["Dashboard", "Projects", "Settings"].map((item) => (
              <Button key={item} variant="ghost" size="sm">{item}</Button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Input className="w-48 h-8" placeholder="Search..." />
            <Button size="sm">New project</Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground text-sm">Welcome back.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          {[
            { label: "Total revenue", value: "$45,231", delta: "+20.1%" },
            { label: "Active users", value: "+2,350",  delta: "+180.1%" },
            { label: "Sales",        value: "+12,234", delta: "+19%" },
            { label: "Active now",   value: "+573",    delta: "+201" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="pb-2">
                <CardDescription>{stat.label}</CardDescription>
                <CardTitle className="text-2xl">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="success" className="text-xs">{stat.delta}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Recent activity</CardTitle>
                <CardDescription>You had 265 new users this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Activity chart placeholder.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics">
            <Card><CardContent className="pt-6">Analytics placeholder.</CardContent></Card>
          </TabsContent>
          <TabsContent value="reports">
            <Card><CardContent className="pt-6">Reports placeholder.</CardContent></Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
