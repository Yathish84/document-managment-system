# Testing Documentation

## Overview

This document outlines the testing strategy and implementation for the DocuQuery application. The testing approach includes unit tests, integration tests, and end-to-end tests to ensure the application functions correctly and reliably.

## Testing Framework

The application uses the following testing tools:

- **Jest**: JavaScript testing framework
- **React Testing Library**: For testing React components
- **Mock Service Worker**: For mocking API requests

## Test Types

### Unit Tests

Unit tests focus on testing individual components and functions in isolation. These tests verify that each unit of code works as expected.

#### Service Layer Tests

Tests for the service layer verify that:
- Authentication functions work correctly
- User management operations (CRUD) function properly
- Document operations work as expected
- Ingestion processes can be managed

Example:
\`\`\`javascript
describe("Authentication Services", () => {
  test("authenticateUser should return a user for valid credentials", async () => {
    const user = await authenticateUser("admin@example.com", "password")
    expect(user).not.toBeNull()
    expect(user?.role).toBe("admin")
  })
})
\`\`\`

#### Component Tests

Tests for UI components verify that:
- Components render correctly
- User interactions work as expected
- Components respond appropriately to different props and states

Example:
\`\`\`javascript
test("renders documents table with correct data", () => {
  render(<DocumentsUI initialDocuments={mockDocuments} />)
  expect(screen.getByText("Test Document 1.pdf")).toBeInTheDocument()
  expect(screen.getByText("Test Document 2.docx")).toBeInTheDocument()
})
\`\`\`

### Integration Tests

Integration tests verify that different parts of the application work together correctly.

#### Auth Context Integration

Tests for the authentication context verify that:
- Authentication state is managed correctly
- Role-based access control works as expected
- Protected routes are properly guarded

Example:
\`\`\`javascript
test("login should authenticate user", async () => {
  const mockUser = { id: "1", name: "Test User", email: "test@example.com", role: "admin" }
  ;(services.authenticateUser as jest.Mock).mockResolvedValue(mockUser)

  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  )

  await act(async () => {
    userEvent.click(screen.getByTestId("login-button"))
  })

  await waitFor(() => {
    expect(screen.getByTestId("auth-status")).toHaveTextContent("Authenticated")
  })
})
\`\`\`

## Test Coverage

The testing strategy aims to achieve high coverage across the application:

- **Service Layer**: 90%+ coverage
- **Authentication System**: 90%+ coverage
- **UI Components**: 80%+ coverage
- **Utility Functions**: 90%+ coverage

## Running Tests

To run the tests:

\`\`\`bash
# Run all tests
npm test

# Run tests with coverage report
npm test -- --coverage

# Run specific test file
npm test -- __tests__/services.test.ts
\`\`\`

## Mocking Strategy

The tests use mocks to isolate components and services:

- **Service Functions**: Mocked to return predefined data
- **Authentication Context**: Mocked to simulate different auth states
- **Next.js Router**: Mocked to test navigation behavior
- **localStorage**: Mocked to test persistence behavior

Example of mocking:
\`\`\`javascript
// Mock the services
jest.mock("@/lib/services")

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
\`\`\`

## Continuous Integration

Tests are automatically run as part of the CI/CD pipeline to ensure code quality and prevent regressions.
