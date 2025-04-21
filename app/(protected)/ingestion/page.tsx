import { Suspense } from "react"
import { getIngestionProcesses } from "@/lib/services"
import { IngestionProcessList } from "@/components/ingestion-process-list"
import { Loader2 } from "lucide-react"

export default async function IngestionPage() {
  // Fetch ingestion processes
  const processes = await getIngestionProcesses()

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Ingestion Processes</h2>
      </div>

      <Suspense
        fallback={
          <div className="flex justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin text-teal-600" />
          </div>
        }
      >
        <IngestionProcessList initialProcesses={processes} />
      </Suspense>
    </div>
  )
}
