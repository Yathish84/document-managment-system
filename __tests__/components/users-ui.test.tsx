import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { UsersUI } from "@/components/users-ui"
import * as services from "@/lib/services"

// Mock the services and hooks
jest.mock("@/lib/services")
jest.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))

describe("UsersUI Component", () => {
  const mockUsers = [
    {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      status: "active",
      lastActive: "2023-07-15",
    },
    {
      id: "2",
      name: "Editor User",
      email: "editor@example.com",
      role: "editor",
      status: "active",
      lastActive: "2023-07-14",
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders users table with correct data", () => {
    render(<UsersUI initialUsers={mockUsers} />)

    // Check if user names are displayed
    expect(screen.getByText("Admin User")).toBeInTheDocument()
    expect(screen.getByText("Editor User")).toBeInTheDocument()

    // Check if emails are displayed
    expect(screen.getByText("admin@example.com")).toBeInTheDocument()
    expect(screen.getByText("editor@example.com")).toBeInTheDocument()

    // Check if roles are displayed
    expect(screen.getByText("Admin")).toBeInTheDocument()
    expect(screen.getByText("Editor")).toBeInTheDocument()
  })

  test("filters users based on search query", () => {
    render(<UsersUI initialUsers={mockUsers} />)

    // Type in search box
    const searchInput = screen.getByPlaceholderText("Search users...")
    fireEvent.change(searchInput, { target: { value: "Admin" } })

    // Check if only the matching user is displayed
    expect(screen.getByText("Admin User")).toBeInTheDocument()
    expect(screen.queryByText("Editor User")).not.toBeInTheDocument()
  })

  test("opens add user dialog when button is clicked", () => {
    render(<UsersUI initialUsers={mockUsers} />)

    // Click add user button
    const addButton = screen.getByText("Add User")
    fireEvent.click(addButton)

    // Check if dialog is opened
    expect(screen.getByText("Add New User")).toBeInTheDocument()
  })

  test("handles user deletion", async () => {
    // Mock the deleteUser function to return true
    ;(services.deleteUser as jest.Mock).mockResolvedValue(true)

    render(<UsersUI initialUsers={mockUsers} />)

    // Open dropdown menu for the first user
    const menuButtons = screen.getAllByRole("button", { name: "Open menu" })
    fireEvent.click(menuButtons[0])

    // Click delete option
    const deleteButton = await screen.findByText("Delete")
    fireEvent.click(deleteButton)

    // Check if deleteUser was called with the correct ID
    await waitFor(() => {
      expect(services.deleteUser).toHaveBeenCalledWith("1")
    })

    // Check if the user was removed from the UI
    await waitFor(() => {
      expect(screen.queryByText("Admin User")).not.toBeInTheDocument()
      expect(screen.getByText("Editor User")).toBeInTheDocument()
    })
  })

  test("opens edit user dialog when edit is clicked", async () => {
    render(<UsersUI initialUsers={mockUsers} />)

    // Open dropdown menu for the first user
    const menuButtons = screen.getAllByRole("button", { name: "Open menu" })
    fireEvent.click(menuButtons[0])

    // Click edit option
    const editButton = await screen.findByText("Edit")
    fireEvent.click(editButton)

    // Check if dialog is opened
    expect(screen.getByText("Edit User")).toBeInTheDocument()
  })
})
