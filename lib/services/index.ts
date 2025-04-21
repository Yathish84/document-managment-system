// Service layer to handle data fetching and manipulation
// This simulates API calls or database interactions

import type { User } from "@/lib/auth-context"

// Types
export type Document = {
  id: string
  name: string
  type: string
  size: string
  uploadedAt: string
  status: "processed" | "processing" | "queued" | "failed"
}

export type IngestionProcess = {
  id: string
  documentName: string
  status: "completed" | "in_progress" | "queued" | "failed"
  progress: number
  startedAt: string | null
  completedAt: string | null
  error?: string
  steps: {
    name: string
    status: "completed" | "in_progress" | "pending" | "failed"
  }[]
}

export type ActivityItem = {
  id: string
  type: "upload" | "query" | "ingestion"
  title: string
  timestamp: string
  icon: "Upload" | "MessageSquareText" | "BarChart3"
}

// Mock data
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
  {
    id: "4",
    name: "Alice Williams",
    email: "alice.williams@example.com",
    role: "editor",
    status: "inactive",
    lastActive: "2023-07-01",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    role: "viewer",
    status: "active",
    lastActive: "2023-07-10",
  },
]

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Financial Report Q2 2023.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadedAt: "2023-07-15",
    status: "processed",
  },
  {
    id: "2",
    name: "Product Roadmap 2023.docx",
    type: "DOCX",
    size: "1.8 MB",
    uploadedAt: "2023-07-14",
    status: "processed",
  },
  {
    id: "3",
    name: "Marketing Strategy.pptx",
    type: "PPTX",
    size: "4.2 MB",
    uploadedAt: "2023-07-13",
    status: "processing",
  },
  {
    id: "4",
    name: "HR Policies.pdf",
    type: "PDF",
    size: "3.1 MB",
    uploadedAt: "2023-07-12",
    status: "queued",
  },
  {
    id: "5",
    name: "Customer Feedback Q2.xlsx",
    type: "XLSX",
    size: "1.5 MB",
    uploadedAt: "2023-07-11",
    status: "processed",
  },
]

const mockIngestionProcesses: IngestionProcess[] = [
  {
    id: "1",
    documentName: "Financial Report Q2 2023.pdf",
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
    documentName: "Marketing Strategy.pptx",
    status: "in_progress",
    progress: 60,
    startedAt: "2023-07-15 15:10",
    completedAt: null,
    steps: [
      { name: "Document Upload", status: "completed" },
      { name: "Text Extraction", status: "completed" },
      { name: "Chunking", status: "completed" },
      { name: "Embedding Generation", status: "in_progress" },
      { name: "Vector Storage", status: "pending" },
    ],
  },
  {
    id: "3",
    documentName: "HR Policies.pdf",
    status: "queued",
    progress: 0,
    startedAt: null,
    completedAt: null,
    steps: [
      { name: "Document Upload", status: "completed" },
      { name: "Text Extraction", status: "pending" },
      { name: "Chunking", status: "pending" },
      { name: "Embedding Generation", status: "pending" },
      { name: "Vector Storage", status: "pending" },
    ],
  },
  {
    id: "4",
    documentName: "Product Specs.docx",
    status: "failed",
    progress: 30,
    startedAt: "2023-07-15 13:45",
    completedAt: "2023-07-15 13:50",
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

const mockRecentActivity: ActivityItem[] = [
  {
    id: "1",
    type: "upload",
    title: "Financial Report Q2 2023.pdf uploaded",
    timestamp: "2 hours ago",
    icon: "Upload",
  },
  {
    id: "2",
    type: "query",
    title: 'Query: "What were the Q2 revenue figures?"',
    timestamp: "3 hours ago",
    icon: "MessageSquareText",
  },
  {
    id: "3",
    type: "ingestion",
    title: "Completed ingestion: Product Roadmap 2023.docx",
    timestamp: "Yesterday",
    icon: "BarChart3",
  },
]

// Service functions with simulated async behavior

// User services
export async function getUsers(): Promise<User[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...mockUsers]
}

export async function getUserById(id: string): Promise<User | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockUsers.find((user) => user.id === id)
}

export async function createUser(user: Omit<User, "id">): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const newUser = {
    ...user,
    id: (mockUsers.length + 1).toString(),
    status: "active",
    lastActive: new Date().toISOString().split("T")[0],
  }
  mockUsers.push(newUser)
  return newUser
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  const userIndex = mockUsers.findIndex((user) => user.id === id)
  if (userIndex === -1) return undefined

  mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData }
  return mockUsers[userIndex]
}

export async function deleteUser(id: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const userIndex = mockUsers.findIndex((user) => user.id === id)
  if (userIndex === -1) return false

  mockUsers.splice(userIndex, 1)
  return true
}

// Document services
export async function getDocuments(): Promise<Document[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...mockDocuments]
}

export async function getDocumentById(id: string): Promise<Document | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockDocuments.find((doc) => doc.id === id)
}

export async function deleteDocument(id: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const docIndex = mockDocuments.findIndex((doc) => doc.id === id)
  if (docIndex === -1) return false

  mockDocuments.splice(docIndex, 1)
  return true
}

export async function reprocessDocument(id: string): Promise<Document | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  const docIndex = mockDocuments.findIndex((doc) => doc.id === id)
  if (docIndex === -1) return undefined

  mockDocuments[docIndex] = { ...mockDocuments[docIndex], status: "processing" }
  return mockDocuments[docIndex]
}

// Ingestion services
export async function getIngestionProcesses(): Promise<IngestionProcess[]> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return [...mockIngestionProcesses]
}

export async function getIngestionProcessById(id: string): Promise<IngestionProcess | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockIngestionProcesses.find((process) => process.id === id)
}

export async function retryIngestionProcess(id: string): Promise<IngestionProcess | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const processIndex = mockIngestionProcesses.findIndex((process) => process.id === id)
  if (processIndex === -1) return undefined

  mockIngestionProcesses[processIndex] = {
    ...mockIngestionProcesses[processIndex],
    status: "in_progress",
    progress: 10,
    steps: mockIngestionProcesses[processIndex].steps.map((step, index) => ({
      ...step,
      status: index === 0 ? "completed" : index === 1 ? "in_progress" : "pending",
    })),
  }
  return mockIngestionProcesses[processIndex]
}

// Activity services
export async function getRecentActivity(): Promise<ActivityItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return [...mockRecentActivity]
}

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
