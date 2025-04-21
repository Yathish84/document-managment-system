// Create a separate auth service to handle authentication
import type { User, UserRole } from "@/lib/auth-context"

// Mock users for demo
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Editor User",
    email: "editor@example.com",
    role: "editor",
    avatar: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Viewer User",
    email: "viewer@example.com",
    role: "viewer",
    avatar: "/placeholder.svg",
  },
]

// Authentication services
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  // In a real app, you'd validate the password here
  const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())
  return user || null
}

export async function registerUser(name: string, email: string, password: string): Promise<User | null> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if email already exists
  if (mockUsers.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return null
  }

  // Create new user
  const newUser: User = {
    id: (mockUsers.length + 1).toString(),
    name,
    email,
    role: "viewer", // Default role for new users
  }

  mockUsers.push(newUser)
  return newUser
}

// Function to check if a user has a specific role
export function hasRole(user: User | null, roles: UserRole | UserRole[]): boolean {
  if (!user) return false

  if (Array.isArray(roles)) {
    return roles.includes(user.role)
  }

  return user.role === roles
}
