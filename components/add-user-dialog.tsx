"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { createUser } from "@/lib/services"
import type { UserRole } from "@/lib/auth-context"

interface AddUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUserAdded?: () => void
}

export function AddUserDialog({ open, onOpenChange, onUserAdded }: AddUserDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "viewer" as UserRole,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    // Validate form
    if (!formData.name || !formData.email) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await createUser(formData)

      toast({
        title: "User added",
        description: `${formData.name} has been added as a ${formData.role}.`,
      })

      // Reset form and close dialog
      setFormData({
        name: "",
        email: "",
        role: "viewer",
      })
      onOpenChange(false)

      // Trigger refresh if callback provided
      if (onUserAdded) {
        onUserAdded()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add user.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>Add a new user and assign their role in the system.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              disabled={isSubmitting}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john.doe@example.com"
              disabled={isSubmitting}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value: UserRole) => setFormData({ ...formData, role: value })}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-teal-600 hover:bg-teal-700" disabled={isSubmitting}>
            Add User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
