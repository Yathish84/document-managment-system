"use client"

import type React from "react"

import { useState } from "react"
import { Send, FileText, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  sources?: {
    documentName: string
    excerpt: string
  }[]
}

export default function QAPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(inputValue),
        sources: [
          {
            documentName: "Financial Report Q2 2023.pdf",
            excerpt:
              "The Q2 revenue increased by 15% year-over-year, reaching $24.5M. This growth was primarily driven by the expansion into European markets and the launch of our premium subscription tier.",
          },
          {
            documentName: "Product Roadmap 2023.docx",
            excerpt:
              "The new AI-powered features are scheduled for release in Q3, with beta testing beginning in August. Initial user feedback from internal testing has been overwhelmingly positive.",
          },
        ],
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 2000)
  }

  // Simple mock response generator
  const generateResponse = (query: string) => {
    if (query.toLowerCase().includes("revenue") || query.toLowerCase().includes("financial")) {
      return "Based on the Q2 financial report, revenue increased by 15% year-over-year, reaching $24.5M. This growth was primarily driven by the expansion into European markets and the launch of our premium subscription tier. The profit margin also improved from 22% to 26% due to operational efficiencies."
    } else if (query.toLowerCase().includes("roadmap") || query.toLowerCase().includes("product")) {
      return "According to the product roadmap, the new AI-powered features are scheduled for release in Q3, with beta testing beginning in August. The development team is on track to meet these deadlines, and initial user feedback from internal testing has been overwhelmingly positive."
    } else {
      return "I've analyzed your documents and found that your question relates to several key areas. The most relevant information indicates that your organization is growing steadily with new product features planned for Q3 and positive financial results in the most recent quarter. Would you like more specific information about a particular aspect?"
    }
  }

  return (
    <div className="flex-1 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold tracking-tight">Document Q&A</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col h-[calc(100vh-220px)]">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle>Ask Questions About Your Documents</CardTitle>
              <CardDescription>Use natural language to query information from your processed documents</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <FileText className="h-12 w-12 text-teal-600 mb-4" />
                    <h3 className="font-semibold text-lg">No messages yet</h3>
                    <p className="text-muted-foreground">Ask a question about your documents to get started</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.role === "user" ? "bg-teal-600 text-white" : "bg-muted"
                        }`}
                      >
                        <p>{message.content}</p>

                        {message.sources && (
                          <div className="mt-3 pt-3 border-t border-teal-500/20 text-sm">
                            <p className="font-semibold mb-1">Sources:</p>
                            {message.sources.map((source, index) => (
                              <div key={index} className="mb-2">
                                <p className="font-medium">{source.documentName}</p>
                                <p className="italic text-xs opacity-80">"{source.excerpt}"</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-4 bg-muted">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
                        <p>Analyzing documents...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  placeholder="Ask a question about your documents..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Available Documents</CardTitle>
              <CardDescription>Documents that have been processed and are available for querying</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <FileText className="h-4 w-4 text-teal-600" />
                  <div className="text-sm font-medium">Financial Report Q2 2023.pdf</div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <FileText className="h-4 w-4 text-teal-600" />
                  <div className="text-sm font-medium">Product Roadmap 2023.docx</div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <FileText className="h-4 w-4 text-teal-600" />
                  <div className="text-sm font-medium">Customer Feedback Q2.xlsx</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Example Questions</CardTitle>
              <CardDescription>Try asking these questions to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2 border-teal-200 hover:bg-teal-50"
                  onClick={() => setInputValue("What were the Q2 revenue figures?")}
                >
                  What were the Q2 revenue figures?
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2 border-teal-200 hover:bg-teal-50"
                  onClick={() => setInputValue("When are the new AI features being released?")}
                >
                  When are the new AI features being released?
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2 border-teal-200 hover:bg-teal-50"
                  onClick={() => setInputValue("Summarize the key points from all documents")}
                >
                  Summarize the key points from all documents
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
