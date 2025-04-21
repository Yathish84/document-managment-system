"use client"

import { useState } from "react"
import { UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddUserDialog } from "@/components/add-user-dialog"

export function UsersHeader() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
      <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => setIsAddUserOpen(true)}>
        <UserPlus className="mr-2 h-4 w-4" /> Add User
      </Button>

      <AddUserDialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen} />
    </div>
  )
}
