import { Suspense } from "react"
import { getUsers } from "@/lib/services"
import { UsersTable } from "@/components/users-table"
import { UsersHeader } from "@/components/users-header"
import { Loader2 } from "lucide-react"

export default async function UsersPage() {
  console.log("Rendering Users Page")
  // Fetch users data
  const users = await getUsers()

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <UsersHeader />

      <Suspense
        fallback={
          <div className="flex justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin text-teal-600" />
          </div>
        }
      >
        <UsersTable initialUsers={users} />
      </Suspense>
    </div>
  )
}
