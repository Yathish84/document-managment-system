import { render, screen } from "@testing-library/react"
import { RoleGuard } from "@/components/role-guard"
import * as authContext from "@/lib/auth-context"

// Mock the auth context
jest.mock("@/lib/auth-context")

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/dashboard",
}))

describe("RoleGuard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders children when user is authenticated with correct role", () => {
    // Mock the auth context to return an authenticated admin user
    ;(authContext.useAuth as jest.Mock).mockReturnValue({
      user: { id: "1", name: "Admin", email: "admin@example.com", role: "admin" },
      isLoading: false,
    })

    render(
      <RoleGuard role="admin">
        <div data-testid="protected-content">Protected Content</div>
      </RoleGuard>,
    )

    expect(screen.getByTestId("protected-content")).toBeInTheDocument()
  })

  test("shows loading state when auth is loading", () => {
    // Mock the auth context to return loading state
    ;(authContext.useAuth as jest.Mock).mockReturnValue({
      user: null,
      isLoading: true,
    })

    render(
      <RoleGuard role="admin">
        <div data-testid="protected-content">Protected Content</div>
      </RoleGuard>,
    )

    // Should show loading indicator
    expect(screen.getByRole("status")).toBeInTheDocument()
    expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument()
  })

  test("renders nothing when user is not authenticated", () => {
    // Mock the auth context to return unauthenticated state
    ;(authContext.useAuth as jest.Mock).mockReturnValue({
      user: null,
      isLoading: false,
    })

    render(
      <RoleGuard role="admin">
        <div data-testid="protected-content">Protected Content</div>
      </RoleGuard>,
    )

    // Should not render children
    expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument()
  })

  test("renders nothing when user is authenticated but has the wrong role", () => {
    // Mock the auth context to return an authenticated user with the wrong role
    ;(authContext.useAuth as jest.Mock).mockReturnValue({
      user: { id: "2", name: "User", email: "user@example.com", role: "user" },
      isLoading: false,
    })

    render(
      <RoleGuard role="admin">
        <div data-testid="protected-content">Protected Content</div>
      </RoleGuard>,
    )

    // Should not render children
    expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument()
  })
})
