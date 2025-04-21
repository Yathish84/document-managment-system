"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Upload, Users, MessageSquareText, BarChart3 } from "lucide-react"
import { useHasRole } from "@/lib/auth-context"

export function DashboardActions() {
  const isAdmin = useHasRole("admin")
  const isEditor = useHasRole(["admin", "editor"])

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {isEditor && (
            <Link href="/documents/upload">
              <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted transition-colors">
                <Upload className="h-5 w-5 text-teal-600" />
                <div className="font-medium">Upload Document</div>
              </div>
            </Link>
          )}
          <Link href="/qa">
            <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted transition-colors">
              <MessageSquareText className="h-5 w-5 text-teal-600" />
              <div className="font-medium">Ask Questions</div>
            </div>
          </Link>
          <Link href="/documents">
            <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted transition-colors">
              <FileText className="h-5 w-5 text-teal-600" />
              <div className="font-medium">Manage Documents</div>
            </div>
          </Link>
          {isEditor && (
            <Link href="/ingestion">
              <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted transition-colors">
                <BarChart3 className="h-5 w-5 text-teal-600" />
                <div className="font-medium">View Ingestion Status</div>
              </div>
            </Link>
          )}
          {isAdmin && (
            <Link href="/users">
              <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted transition-colors">
                <Users className="h-5 w-5 text-teal-600" />
                <div className="font-medium">Manage Users</div>
              </div>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
