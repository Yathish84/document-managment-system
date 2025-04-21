"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { Loader2 } from "lucide-react"

// Define path permissions
const pathPermissions: Record<string, UserRole[]> = {
  "/dashboard": ["admin", "editor", "viewer"],
  "/documents": ["admin", "editor", "viewer"],
  "/documents/upload": ["admin", "editor"],
  "/ingestion": ["admin", "editor"],
  "/qa": ["admin", "editor", "viewer"],
  "/users": ["admin"],
}

export function RoleGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Wait until auth is loaded
    if (isLoading) return

    // If no user, redirect to login
    if (!user) {
      router.push("/login")
      return
    }

    // Check if the current path has permission requirements
    const exactPathPermission = pathPermissions[pathname || ""]

    // If path has permissions defined, check if user has required role
    if (exactPathPermission && !exactPathPermission.includes(user.role)) {
      console.log(`User with role ${user.role} does not have permission to access ${pathname}`)
      // Redirect to dashboard if user doesn't have permission
      router.push("/dashboard")
      return
    }
  }, [user, isLoading, pathname, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
