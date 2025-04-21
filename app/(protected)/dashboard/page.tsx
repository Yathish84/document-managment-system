import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, MessageSquareText, BarChart3 } from "lucide-react"
import { getRecentActivity } from "@/lib/services"
import { DashboardStats } from "@/components/dashboard-stats"
import { DashboardActions } from "@/components/dashboard-actions"

export default async function DashboardPage() {
  // Fetch recent activity data
  const recentActivity = await getRecentActivity()

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      {/* Stats Cards */}
      <DashboardStats />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent document and query activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="rounded-full bg-teal-100 p-2">
                    {activity.icon === "Upload" && <Upload className="h-4 w-4 text-teal-600" />}
                    {activity.icon === "MessageSquareText" && <MessageSquareText className="h-4 w-4 text-teal-600" />}
                    {activity.icon === "BarChart3" && <BarChart3 className="h-4 w-4 text-teal-600" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <DashboardActions />
      </div>
    </div>
  )
}
