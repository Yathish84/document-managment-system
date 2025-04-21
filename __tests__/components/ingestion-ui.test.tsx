import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { IngestionUI } from "@/components/ingestion-ui"
import * as services from "@/lib/services"

// Mock the services and hooks
jest.mock("@/lib/services")
jest.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))

describe("IngestionUI Component", () => {
  const mockProcesses = [
    {
      id: "1",
      documentName: "Test Document 1.pdf",
      status: "completed",
      progress: 100,
      startedAt: "2023-07-15 14:30",
      completedAt: "2023-07-15 14:35",
      steps: [
        { name: "Document Upload", status: "completed" },
        { name: "Text Extraction", status: "completed" },
        { name: "Chunking", status: "completed" },
        { name: "Embedding Generation", status: "completed" },
        { name: "Vector Storage", status: "completed" },
      ],
    },
    {
      id: "2",
      documentName: "Test Document 2.docx",
      status: "failed",
      progress: 30,
      startedAt: "2023-07-15 15:10",
      completedAt: null,
      error: "Failed to extract text from document",
      steps: [
        { name: "Document Upload", status: "completed" },
        { name: "Text Extraction", status: "failed" },
        { name: "Chunking", status: "pending" },
        { name: "Embedding Generation", status: "pending" },
        { name: "Vector Storage", status: "pending" },
      ],
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders ingestion processes with correct data", () => {
    render(<IngestionUI initialProcesses={mockProcesses} />)

    // Check if document names are displayed
    expect(screen.getByText("Test Document 1.pdf")).toBeInTheDocument()
    expect(screen.getByText("Test Document 2.docx")).toBeInTheDocument()

    // Check if statuses are displayed
    expect(screen.getByText("Completed")).toBeInTheDocument()
    expect(screen.getByText("Failed")).toBeInTheDocument()
  })

  test("expands process details when clicked", async () => {
    render(<IngestionUI initialProcesses={mockProcesses} />)

    // Initially, step details should not be visible
    expect(screen.queryByText("Document Upload")).not.toBeInTheDocument()

    // Click to expand the first process
    const expandButtons = screen.getAllByRole("button")
    fireEvent.click(expandButtons[0])

    // Check if step details are now visible
    await waitFor(() => {
      expect(screen.getByText("Document Upload")).toBeInTheDocument()
      expect(screen.getByText("Text Extraction")).toBeInTheDocument()
      expect(screen.getByText("Chunking")).toBeInTheDocument()
    })
  })

  test("handles retry process", async () => {
    // Mock the retryIngestionProcess function
    const updatedProcess = {
      ...mockProcesses[1],
      status: "in_progress",
      progress: 10,
      steps: mockProcesses[1].steps.map((step, index) => ({
        ...step,
        status: index === 0 ? "completed" : index === 1 ? "in_progress" : "pending",
      })),
    }
    ;(services.retryIngestionProcess as jest.Mock).mockResolvedValue(updatedProcess)

    render(<IngestionUI initialProcesses={mockProcesses} />)

    // Expand the failed process
    const expandButtons = screen.getAllByRole("button")
    fireEvent.click(expandButtons[1])

    // Click retry button
    const retryButton = await screen.findByText("Retry")
    fireEvent.click(retryButton)

    // Check if retryIngestionProcess was called with the correct ID
    await waitFor(() => {
      expect(services.retryIngestionProcess).toHaveBeenCalledWith("2")
    })
  })

  test("displays error message for failed processes", async () => {
    render(<IngestionUI initialProcesses={mockProcesses} />)

    // Expand the failed process
    const expandButtons = screen.getAllByRole("button")
    fireEvent.click(expandButtons[1])

    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText("Error:")).toBeInTheDocument()
      expect(screen.getByText("Failed to extract text from document")).toBeInTheDocument()
    })
  })
})
