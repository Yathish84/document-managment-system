"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { FileText, MoreHorizontal, FileUp, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useHasRole } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { type Document, deleteDocument, reprocessDocument } from "@/lib/services"
import { DocumentStatusBadge } from "@/components/document-status-badge"

interface DocumentsTableProps {
  initialDocuments: Document[]
}

export function DocumentsTable({ initialDocuments }: DocumentsTableProps) {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments)
  const { toast } = useToast()
  const isEditor = useHasRole(["admin", "editor"])
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""

  // Filter documents based on search query
  useEffect(() => {
    if (query) {
      const filtered = initialDocuments.filter((doc) => doc.name.toLowerCase().includes(query.toLowerCase()))
      setDocuments(filtered)
    } else {
      setDocuments(initialDocuments)
    }
  }, [query, initialDocuments])

  const handleDelete = async (id: string) => {
    try {
      const success = await deleteDocument(id)

      if (success) {
        setDocuments(documents.filter((doc) => doc.id !== id))

        toast({
          title: "Document deleted",
          description: "The document has been removed from the system.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete document.",
        variant: "destructive",
      })
    }
  }

  const handleReprocess = async (id: string) => {
    try {
      const updatedDoc = await reprocessDocument(id)

      if (updatedDoc) {
        setDocuments(documents.map((doc) => (doc.id === id ? updatedDoc : doc)))

        toast({
          title: "Document reprocessing",
          description: "The document has been queued for reprocessing.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reprocess document.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Uploaded</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No documents found.
              </TableCell>
            </TableRow>
          ) : (
            documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-teal-600" />
                    {doc.name}
                  </div>
                </TableCell>
                <TableCell>{doc.type}</TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell>{doc.uploadedAt}</TableCell>
                <TableCell>
                  <DocumentStatusBadge status={doc.status} />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" /> View
                      </DropdownMenuItem>
                      {isEditor && (
                        <>
                          <DropdownMenuItem onClick={() => handleReprocess(doc.id)}>
                            <FileUp className="mr-2 h-4 w-4" /> Re-process
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(doc.id)} className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
