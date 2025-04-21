import {
  authenticateUser,
  registerUser,
  hasRole,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getDocuments,
  getDocumentById,
  deleteDocument,
  reprocessDocument,
  getIngestionProcesses,
  retryIngestionProcess,
} from "@/lib/services"

// Mock the setTimeout to avoid waiting in tests
jest.useFakeTimers()

describe("Authentication Services", () => {
  test("authenticateUser should return a user for valid credentials", async () => {
    const user = await authenticateUser("admin@example.com", "password")
    expect(user).not.toBeNull()
    expect(user?.role).toBe("admin")
  })

  test("authenticateUser should return null for invalid credentials", async () => {
    const user = await authenticateUser("nonexistent@example.com", "password")
    expect(user).toBeNull()
  })

  test("registerUser should create a new user", async () => {
    const newUser = await registerUser("Test User", "test@example.com", "password")
    expect(newUser).not.toBeNull()
    expect(newUser?.name).toBe("Test User")
    expect(newUser?.email).toBe("test@example.com")
    expect(newUser?.role).toBe("viewer") // Default role
  })

  test("hasRole should correctly check user roles", () => {
    const adminUser = { id: "1", name: "Admin", email: "admin@example.com", role: "admin" as const }
    const editorUser = { id: "2", name: "Editor", email: "editor@example.com", role: "editor" as const }

    // Single role check
    expect(hasRole(adminUser, "admin")).toBe(true)
    expect(hasRole(editorUser, "admin")).toBe(false)

    // Multiple roles check
    expect(hasRole(adminUser, ["admin", "editor"])).toBe(true)
    expect(hasRole(editorUser, ["admin", "editor"])).toBe(true)
    expect(hasRole(editorUser, ["admin"])).toBe(false)

    // Null user check
    expect(hasRole(null, "admin")).toBe(false)
  })
})

describe("User Services", () => {
  test("getUsers should return a list of users", async () => {
    const users = await getUsers()
    expect(Array.isArray(users)).toBe(true)
    expect(users.length).toBeGreaterThan(0)
  })

  test("getUserById should return a user for valid ID", async () => {
    const user = await getUserById("1")
    expect(user).not.toBeNull()
    expect(user?.id).toBe("1")
  })

  test("getUserById should return undefined for invalid ID", async () => {
    const user = await getUserById("999")
    expect(user).toBeUndefined()
  })

  test("createUser should add a new user", async () => {
    const newUser = await createUser({
      name: "New User",
      email: "new@example.com",
      role: "viewer",
    })
    expect(newUser).not.toBeNull()
    expect(newUser.name).toBe("New User")
    expect(newUser.email).toBe("new@example.com")
  })

  test("updateUser should modify an existing user", async () => {
    const updatedUser = await updateUser("2", { name: "Updated Name" })
    expect(updatedUser).not.toBeUndefined()
    expect(updatedUser?.name).toBe("Updated Name")
  })

  test("deleteUser should remove a user", async () => {
    const result = await deleteUser("3")
    expect(result).toBe(true)
  })
})

describe("Document Services", () => {
  test("getDocuments should return a list of documents", async () => {
    const documents = await getDocuments()
    expect(Array.isArray(documents)).toBe(true)
    expect(documents.length).toBeGreaterThan(0)
  })

  test("getDocumentById should return a document for valid ID", async () => {
    const document = await getDocumentById("1")
    expect(document).not.toBeUndefined()
    expect(document?.id).toBe("1")
  })

  test("deleteDocument should remove a document", async () => {
    const result = await deleteDocument("2")
    expect(result).toBe(true)
  })

  test("reprocessDocument should update document status", async () => {
    const document = await reprocessDocument("1")
    expect(document).not.toBeUndefined()
    expect(document?.status).toBe("processing")
  })
})

describe("Ingestion Services", () => {
  test("getIngestionProcesses should return a list of processes", async () => {
    const processes = await getIngestionProcesses()
    expect(Array.isArray(processes)).toBe(true)
    expect(processes.length).toBeGreaterThan(0)
  })

  test("retryIngestionProcess should update process status", async () => {
    const process = await retryIngestionProcess("4")
    expect(process).not.toBeUndefined()
    expect(process?.status).toBe("in_progress")
  })
})
