"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { authenticateUser, registerUser, hasRole } from "@/lib/services/auth-service"

// Define user roles
export type UserRole = "admin" | "editor" | "viewer"

// Define user type
export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  status?: string
  lastActive?: string
}

// Define auth context type
type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // Check if user is authenticated on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Redirect based on auth status
  useEffect(() => {
    if (!isLoading) {
      const isAuthRoute = pathname === "/login" || pathname === "/signup" || pathname === "/"

      if (!user && !isAuthRoute && pathname !== "/") {
        router.push("/login")
      } else if (user && isAuthRoute && pathname !== "/") {
        router.push("/dashboard")
      }
    }
  }, [user, isLoading, pathname, router])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      const authenticatedUser = await authenticateUser(email, password)

      if (authenticatedUser) {
        setUser(authenticatedUser)
        localStorage.setItem("user", JSON.stringify(authenticatedUser))

        toast({
          title: "Login successful",
          description: `Welcome back, ${authenticatedUser.name}!`,
        })

        router.push("/dashboard")
      } else {
        toast({
          title: "Login failed",
          description:
            "Invalid email or password. Try admin@example.com, editor@example.com, or viewer@example.com with any password.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred during login.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Signup function
  const signup = async (name: string, email: string, password: string, confirmPassword: string) => {
    setIsLoading(true)

    try {
      // Validate passwords match
      if (password !== confirmPassword) {
        toast({
          title: "Signup failed",
          description: "Passwords do not match.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      const newUser = await registerUser(name, email, password)

      if (!newUser) {
        toast({
          title: "Signup failed",
          description: "Email already in use.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Set as current user
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))

      toast({
        title: "Signup successful",
        description: "Your account has been created.",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "An error occurred during signup.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")

    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Hook to check if user has a specific role
export function useHasRole(roles: UserRole | UserRole[]) {
  const { user } = useAuth()
  return hasRole(user, roles)
}
