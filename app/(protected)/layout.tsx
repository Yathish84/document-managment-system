import type { ReactNode } from "react"
import DashboardNav from "@/components/dashboard-nav"
import { RoleGuard } from "@/components/role-guard"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  console.log("Rendering Dashboard Layout")
  return (
    <RoleGuard>
      <div className="flex min-h-screen flex-col">
        <DashboardNav />
        <div className="flex-1">{children}</div>
      </div>
    </RoleGuard>
  )
}
