"use client"

import { useState } from "react"
import { Search, MoreHorizontal, Edit, Trash2, Shield, Eye, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import type { User } from "@/lib/auth-context"
import { deleteUser } from "@/lib/services"
import { EditUserDialog } from "@/components/edit-user-dialog"

interface UsersTableProps {
  initialUsers: User[]
}

export function UsersTable({ initialUsers }: UsersTableProps) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const { toast } = useToast()

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteUser = async (id: string) => {
    try {
      const success = await deleteUser(id)

      if (success) {
        setUsers(users.filter((user) => user.id !== id))

        toast({
          title: "User deleted",
          description: "The user has been removed from the system.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user.",
        variant: "destructive",
      })
    }
  }

  const openEditDialog = (user: User) => {
    setCurrentUser(user)
    setIsEditUserOpen(true)
  }

  const handleUserUpdated = () => {
    // Refresh user list
    // In a real app, you'd fetch the updated list from the server
    if (currentUser) {
      setUsers(users.map((user) => (user.id === currentUser.id ? { ...user, ...currentUser } : user)))
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-teal-600">
            <Shield className="mr-1 h-3 w-3" /> Admin
          </Badge>
        )
      case "editor":
        return (
          <Badge className="bg-blue-500">
            <Pencil className="mr-1 h-3 w-3" /> Editor
          </Badge>
        )
      case "viewer":
        return (
          <Badge variant="outline">
            <Eye className="mr-1 h-3 w-3" /> Viewer
          </Badge>
        )
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "outline" : "secondary"}>
                      {user.status || "active"}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastActive || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(user)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <EditUserDialog
        open={isEditUserOpen}
        onOpenChange={setIsEditUserOpen}
        user={currentUser}
        onUserUpdated={handleUserUpdated}
      />
    </>
  )
}
