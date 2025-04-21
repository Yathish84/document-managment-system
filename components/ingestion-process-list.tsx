"use client"

import { useState } from "react"
import { FileText, Clock, CheckCircle2, AlertCircle, RotateCw, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useToast } from "@/hooks/use-toast"
import { type IngestionProcess, retryIngestionProcess } from "@/lib/services"

interface IngestionProcessListProps {
  initialProcesses: IngestionProcess[]
}

export function IngestionProcessList({ initialProcesses }: IngestionProcessListProps) {
  const [processes, setProcesses] = useState<IngestionProcess[]>(initialProcesses)
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleRetryProcess = async (id: string) => {
    try {
      const updatedProcess = await retryIngestionProcess(id)

      if (updatedProcess) {
        setProcesses((prev) => prev.map((process) => (process.id === id ? updatedProcess : process)))

        toast({
          title: "Process restarted",
          description: "The ingestion process has been restarted.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to restart the process.",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-teal-600">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Completed
          </Badge>
        )
      case "in_progress":
        return (
          <Badge className="bg-blue-500">
            <Clock className="mr-1 h-3 w-3 animate-spin" /> In Progress
          </Badge>
        )
      case "queued":
        return (
          <Badge variant="outline">
            <Clock className="mr-1 h-3 w-3" /> Queued
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="destructive">
            <AlertCircle className="mr-1 h-3 w-3" /> Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-teal-600" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="grid gap-4">
      {processes.map((process) => (
        <Collapsible
          key={process.id}
          open={openItems[process.id]}
          onOpenChange={() => toggleItem(process.id)}
          className="rounded-lg border"
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-teal-600" />
                <div>
                  <h3 className="font-semibold">{process.documentName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {process.startedAt ? `Started: ${process.startedAt}` : "Queued for processing"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(process.status)}
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {openItems[process.id] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
            <div className="mt-2">
              <Progress value={process.progress} className="h-2" />
            </div>
          </div>
          <CollapsibleContent>
            <div className="border-t p-4">
              <div className="space-y-4">
                <div className="grid gap-2">
                  {process.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {getStepStatusIcon(step.status)}
                      <span className={step.status === "failed" ? "text-destructive" : ""}>{step.name}</span>
                    </div>
                  ))}
                </div>

                {process.status === "failed" && process.error && (
                  <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                    <p className="font-semibold">Error:</p>
                    <p>{process.error}</p>
                  </div>
                )}

                <div className="flex justify-end">
                  {(process.status === "failed" || process.status === "completed") && (
                    <Button
                      variant={process.status === "failed" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleRetryProcess(process.id)}
                      className={process.status === "failed" ? "bg-teal-600 hover:bg-teal-700" : ""}
                    >
                      <RotateCw className="mr-2 h-4 w-4" />
                      {process.status === "failed" ? "Retry" : "Re-process"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}
