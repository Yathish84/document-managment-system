"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { FileUp, X, File, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { useHasRole } from "@/lib/auth-context"

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const router = useRouter()
  const isEditor = useHasRole(["admin", "editor"])

  // Redirect if not editor
  if (!isEditor) {
    router.push("/dashboard")
    return null
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload.",
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 200)

    // Simulate upload completion
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)

      setTimeout(() => {
        setUploading(false)
        toast({
          title: "Upload successful",
          description: `${files.length} file(s) uploaded successfully.`,
        })
        router.push("/ingestion")
      }, 500)
    }, 3000)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Upload Documents</h2>
      </div>

      <div className="grid gap-6">
        <div
          className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="rounded-full bg-teal-100 p-3">
              <FileUp className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-lg font-semibold">Drag & drop files here</h3>
            <p className="text-sm text-muted-foreground">or click to browse files (PDF, DOCX, TXT, PPTX, XLSX)</p>
            <Input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.docx,.txt,.pptx,.xlsx"
            />
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
              Browse Files
            </Button>
          </div>
        </div>

        {files.length > 0 && (
          <div className="space-y-4">
            <div className="rounded-lg border">
              <div className="p-4">
                <h3 className="font-semibold">Selected Files ({files.length})</h3>
              </div>
              <div className="divide-y">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <File className="h-8 w-8 text-teal-600" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeFile(index)} disabled={uploading}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setFiles([])} disabled={uploading}>
                Clear All
              </Button>
              <Button onClick={handleUpload} disabled={uploading} className="bg-teal-600 hover:bg-teal-700">
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading
                  </>
                ) : (
                  <>Upload & Process</>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
