import Link from "next/link"
import { ArrowRight, FileText, Users, MessageSquareText, BarChart3, Shield, Pencil, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <FileText className="h-6 w-6 text-teal-600" />
            <span>DocuQuery</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-teal-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Intelligent Document Management & Q&A
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Upload, manage, and query your documents with AI-powered insights. Role-based access control for
                  seamless team collaboration.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="gap-1 bg-teal-600 hover:bg-teal-700">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-teal-100 to-teal-50 p-4 shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full max-w-md space-y-4 rounded-lg bg-background p-6 shadow-lg">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Ask anything about your documents</h3>
                      <div className="flex items-center gap-2 rounded-lg border bg-muted p-4">
                        <p className="text-sm text-muted-foreground">
                          What are the key findings in the Q3 financial report?
                        </p>
                      </div>
                      <div className="rounded-lg border bg-background p-4">
                        <p className="text-sm">
                          Based on the Q3 financial report, the key findings include a 15% revenue increase
                          year-over-year, expansion into 3 new markets, and cost reduction initiatives that saved $2.4M.
                          The report also highlights...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powerful Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need to manage, process, and query your documents
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="grid gap-6">
              <div className="flex flex-col gap-2">
                <Users className="h-10 w-10 text-teal-600" />
                <h3 className="text-xl font-bold">User Role Management</h3>
                <p className="text-muted-foreground">
                  Assign roles (admin, editor, viewer) to control access and permissions across your organization.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <FileText className="h-10 w-10 text-teal-600" />
                <h3 className="text-xl font-bold">Document Management</h3>
                <p className="text-muted-foreground">
                  Upload, organize, and manage documents with ease. Support for multiple file formats.
                </p>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="flex flex-col gap-2">
                <BarChart3 className="h-10 w-10 text-teal-600" />
                <h3 className="text-xl font-bold">Ingestion Monitoring</h3>
                <p className="text-muted-foreground">
                  Track document processing in real-time with detailed status updates and progress indicators.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <MessageSquareText className="h-10 w-10 text-teal-600" />
                <h3 className="text-xl font-bold">AI-Powered Q&A</h3>
                <p className="text-muted-foreground">
                  Ask questions about your documents and get accurate answers with source references using RAG
                  technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-teal-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Role-Based Access Control</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Customize permissions for different team members based on their responsibilities
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md">
              <div className="rounded-full bg-teal-100 p-3 mb-4">
                <Shield className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Admin</h3>
              <ul className="space-y-2 text-center">
                <li className="text-sm">Manage users and assign roles</li>
                <li className="text-sm">Full access to all documents</li>
                <li className="text-sm">Configure system settings</li>
                <li className="text-sm">View usage analytics</li>
                <li className="text-sm">Manage document processing</li>
              </ul>
            </div>

            <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md">
              <div className="rounded-full bg-teal-100 p-3 mb-4">
                <Pencil className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Editor</h3>
              <ul className="space-y-2 text-center">
                <li className="text-sm">Upload and manage documents</li>
                <li className="text-sm">Trigger document processing</li>
                <li className="text-sm">View processing status</li>
                <li className="text-sm">Use Q&A interface</li>
                <li className="text-sm">Cannot manage users</li>
              </ul>
            </div>

            <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md">
              <div className="rounded-full bg-teal-100 p-3 mb-4">
                <Eye className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Viewer</h3>
              <ul className="space-y-2 text-center">
                <li className="text-sm">View documents</li>
                <li className="text-sm">Use Q&A interface</li>
                <li className="text-sm">Cannot upload documents</li>
                <li className="text-sm">Cannot trigger processing</li>
                <li className="text-sm">Read-only access</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-teal-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to transform your document workflow?
              </h2>
              <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center">
                Join thousands of teams already using DocuQuery to manage and extract insights from their documents.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                  Get Started
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} DocuQuery. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
