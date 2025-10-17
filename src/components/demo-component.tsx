import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function DemoComponent() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-center">Shadcn/UI Demo</h1>
      
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Welcome to Shadcn/UI</CardTitle>
          <CardDescription>
            Your MUI components have been successfully replaced with shadcn/ui components.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This demo showcases the new component system with beautiful, accessible components built on Radix UI and styled with Tailwind CSS.
          </p>
          
          <div className="flex gap-2 flex-wrap">
            <Button>Default Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}