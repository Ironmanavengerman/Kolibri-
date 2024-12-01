import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DeedList } from './deed-list'

export function DashboardContent() {
  const stats = [
    { title: "Fullmaktsärenden", value: 12 },
    { title: "Väntande Signaturer", value: 13 },
    { title: "Slutförda denna månad", value: 45 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Ärenden som kräver åtgärd</CardTitle>
        </CardHeader>
        <CardContent>
          <DeedList />
        </CardContent>
      </Card>
    </div>
  )
}

