import { CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface DocumentStatusBadgeProps {
  status: string
}

export function DocumentStatusBadge({ status }: DocumentStatusBadgeProps) {
  switch (status) {
    case "processed":
      return (
        <Badge className="bg-teal-600">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Processed
        </Badge>
      )
    case "processing":
      return (
        <Badge className="bg-blue-500">
          <Clock className="mr-1 h-3 w-3 animate-spin" /> Processing
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
