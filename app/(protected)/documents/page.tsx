import { Suspense } from "react"
import { DocumentsTable } from "@/components/documents-table"
import { DocumentsHeader } from "@/components/documents-header"
import { DocumentsSearch } from "@/components/documents-search"
import { getDocuments } from "@/lib/services"
import { Loader2 } from "lucide-react"

export default async function DocumentsPage() {
  // Fetch documents data
  const documents = await getDocuments()

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <DocumentsHeader />

      <Suspense
        fallback={
          <div className="flex justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin text-teal-600" />
          </div>
        }
      >
        <DocumentsSearch />
        <DocumentsTable initialDocuments={documents} />
      </Suspense>
    </div>
  )
}
