"use client"

import { render, screen, act, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AuthProvider, useAuth, useHasRole } from "@/lib/auth-context"
import * as services from "@/lib/services"

// Mock the services
jest.mock("@/lib/services")
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/dashboard",
}))

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, "localStorage", { value: localStorageMock })

// Mock toast
jest.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))

// Test component that uses auth context
const TestComponent = () => {
  const { user, login, logout, isAuthenticated } = useAuth()
  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? "Authenticated" : "Not Authenticated"}</div>
      <div data-testid="user-name">{user?.name || "No User"}</div>
      <button onClick={() => login("test@example.com", "password")} data-testid="login-button">
        Login
      </button>
      <button onClick={logout} data-testid="logout-button">
        Logout
      </button>
    </div>
  )
}

// Test component for useHasRole
const RoleTestComponent = ({ role }: { role: string | string[] }) => {
  const hasRole = useHasRole(role as any)
  return <div data-testid="has-role">{hasRole ? "Has Role" : "No Role"}</div>
}

describe("AuthContext", () => {
  beforeEach(() => {
    localStorageMock.clear()
    jest.clearAllMocks()
  })

  test("initial state should be unauthenticated", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    expect(screen.getByTestId("auth-status")).toHaveTextContent("Not Authenticated")
    expect(screen.getByTestId("user-name")).toHaveTextContent("No User")
  })

  test("login should authenticate user", async () => {
    // Mock the authenticateUser function
    const mockUser = { id: "1", name: "Test User", email: "test@example.com", role: "admin" }
    ;(services.authenticateUser as jest.Mock).mockResolvedValue(mockUser)

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    // Click login button
    await act(async () => {
      userEvent.click(screen.getByTestId("login-button"))
    })

    // Wait for state to update
    await waitFor(() => {
      expect(screen.getByTestId("auth-status")).toHaveTextContent("Authenticated")
      expect(screen.getByTestId("user-name")).toHaveTextContent("Test User")
    })

    // Check localStorage
    expect(JSON.parse(localStorageMock.getItem("user") || "{}")).toEqual(mockUser)
  })

  test("logout should clear authentication", async () => {
    // Set initial authenticated state
    const mockUser = { id: "1", name: "Test User", email: "test@example.com", role: "admin" }
    localStorageMock.setItem("user", JSON.stringify(mockUser))

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    // Verify initial authenticated state
    await waitFor(() => {
      expect(screen.getByTestId("auth-status")).toHaveTextContent("Authenticated")
    })

    // Click logout button
    await act(async () => {
      userEvent.click(screen.getByTestId("logout-button"))
    })

    // Verify logged out state
    expect(screen.getByTestId("auth-status")).toHaveTextContent("Not Authenticated")
    expect(screen.getByTestId("user-name")).toHaveTextContent("No User")
    expect(localStorageMock.getItem("user")).toBeNull()
  })

  test("useHasRole should correctly check roles", async () => {
    // Mock the user with admin role
    const mockUser = { id: "1", name: "Admin User", email: "admin@example.com", role: "admin" }
    localStorageMock.setItem("user", JSON.stringify(mockUser))
    ;(services.hasRole as jest.Mock).mockImplementation((user, roles) => {
      if (!user) return false
      if (Array.isArray(roles)) {
        return roles.includes(user.role)
      }
      return user.role === roles
    })

    render(
      <AuthProvider>
        <RoleTestComponent role="admin" />
      </AuthProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId("has-role")).toHaveTextContent("Has Role")
    })

    // Test with array of roles
    render(
      <AuthProvider>
        <RoleTestComponent role={["admin", "editor"]} />
      </AuthProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId("has-role")).toHaveTextContent("Has Role")
    })

    // Test with non-matching role
    render(
      <AuthProvider>
        <RoleTestComponent role="viewer" />
      </AuthProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId("has-role")).toHaveTextContent("No Role")
    })
  })
})
