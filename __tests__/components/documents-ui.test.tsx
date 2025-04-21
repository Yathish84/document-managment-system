import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { DocumentsUI } from "@/components/documents-ui"
import * as services from "@/lib/services"
import * as authContext from "@/lib/auth-context"

// Mock the services and hooks
jest.mock("@/lib/services")
jest.mock("@/lib/auth-context")
jest.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))
jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: () => null,
  }),
}))

describe("DocumentsUI Component", () => {
  const mockDocuments = [
    {
      id: "1",
      name: "Test Document 1.pdf",
      type: "PDF",
      size: "1.2 MB",
      uploadedAt: "2023-07-15",
      status: "processed",
    },
    {
      id: "2",
      name: "Test Document 2.docx",
      type: "DOCX",
      size: "0.8 MB",
      uploadedAt: "2023-07-14",
      status: "processing",
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    // Mock the useHasRole hook to return true for editor permissions
    ;(authContext.useHasRole as jest.Mock).mockReturnValue(true)
  })

  test("renders documents table with correct data", () => {
    render(<DocumentsUI initialDocuments={mockDocuments} />)

    // Check if document names are displayed
    expect(screen.getByText("Test Document 1.pdf")).toBeInTheDocument()
    expect(screen.getByText("Test Document 2.docx")).toBeInTheDocument()

    // Check if document types are displayed
    expect(screen.getByText("PDF")).toBeInTheDocument()
    expect(screen.getByText("DOCX")).toBeInTheDocument()

    // Check if document sizes are displayed
    expect(screen.getByText("1.2 MB")).toBeInTheDocument()
    expect(screen.getByText("0.8 MB")).toBeInTheDocument()
  })

  test("filters documents based on search query", () => {
    render(<DocumentsUI initialDocuments={mockDocuments} />)

    // Type in search box
    const searchInput = screen.getByPlaceholderText("Search documents...")
    fireEvent.change(searchInput, { target: { value: "Document 1" } })

    // Check if only the matching document is displayed
    expect(screen.getByText("Test Document 1.pdf")).toBeInTheDocument()
    expect(screen.queryByText("Test Document 2.docx")).not.toBeInTheDocument()
  })

  test("handles document deletion", async () => {
    // Mock the deleteDocument function to return true
    ;(services.deleteDocument as jest.Mock).mockResolvedValue(true)

    render(<DocumentsUI initialDocuments={mockDocuments} />)

    // Open dropdown menu for the first document
    const menuButtons = screen.getAllByRole("button", { name: "Open menu" })
    fireEvent.click(menuButtons[0])

    // Click delete option
    const deleteButton = await screen.findByText("Delete")
    fireEvent.click(deleteButton)

    // Check if deleteDocument was called with the correct ID
    await waitFor(() => {
      expect(services.deleteDocument).toHaveBeenCalledWith("1")
    })

    // Check if the document was removed from the UI
    await waitFor(() => {
      expect(screen.queryByText("Test Document 1.pdf")).not.toBeInTheDocument()
      expect(screen.getByText("Test Document 2.docx")).toBeInTheDocument()
    })
  })

  test("handles document reprocessing", async () => {
    // Mock the reprocessDocument function
    const updatedDoc = {
      id: "1",
      name: "Test Document 1.pdf",
      type: "PDF",
      size: "1.2 MB",
      uploadedAt: "2023-07-15",
      status: "processing",
    }
    ;(services.reprocessDocument as jest.Mock).mockResolvedValue(updatedDoc)

    render(<DocumentsUI initialDocuments={mockDocuments} />)

    // Open dropdown menu for the first document
    const menuButtons = screen.getAllByRole("button", { name: "Open menu" })
    fireEvent.click(menuButtons[0])

    // Click reprocess option
    const reprocessButton = await screen.findByText("Re-process")
    fireEvent.click(reprocessButton)

    // Check if reprocessDocument was called with the correct ID
    await waitFor(() => {
      expect(services.reprocessDocument).toHaveBeenCalledWith("1")
    })
  })

  test("hides editor actions for non-editor users", () => {
    // Mock the useHasRole hook to return false for editor permissions
    ;(authContext.useHasRole as jest.Mock).mockReturnValue(false)

    render(<DocumentsUI initialDocuments={mockDocuments} />)

    // Open dropdown menu for the first document
    const menuButtons = screen.getAllByRole("button", { name: "Open menu" })
    fireEvent.click(menuButtons[0])

    // Check if editor actions are hidden
    expect(screen.queryByText("Re-process")).not.toBeInTheDocument()
    expect(screen.queryByText("Delete")).not.toBeInTheDocument()
  })
})
