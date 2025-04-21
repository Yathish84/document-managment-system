"use client"

import { useState, useEffect } from "react"
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
import { updateUser } from "@/lib/services"
import type { User, UserRole } from "@/lib/auth-context"

interface EditUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
  onUserUpdated?: () => void
}

export function EditUserDialog({ open, onOpenChange, user, onUserUpdated }: EditUserDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "viewer" as UserRole,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
      })
    }
  }, [user])

  const handleSubmit = async () => {
    if (!user) return

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
      await updateUser(user.id, formData)

      toast({
        title: "User updated",
        description: `${formData.name}'s information has been updated.`,
      })

      onOpenChange(false)

      // Trigger refresh if callback provided
      if (onUserUpdated) {
        onUserUpdated()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user.",
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
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update user information and role.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-name">Full Name</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={isSubmitting}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-email">Email</Label>
            <Input
              id="edit-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={isSubmitting}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-role">Role</Label>
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
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
