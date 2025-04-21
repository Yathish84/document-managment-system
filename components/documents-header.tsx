"use client"

import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useHasRole } from "@/lib/auth-context"

export function DocumentsHeader() {
  const isEditor = useHasRole(["admin", "editor"])

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
      {isEditor && (
        <Link href="/documents/upload">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="mr-2 h-4 w-4" /> Upload Document
          </Button>
        </Link>
      )}
    </div>
  )
}
