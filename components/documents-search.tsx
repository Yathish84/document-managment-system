"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function DocumentsSearch() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "")

  const handleSearch = (term: string) => {
    setSearchQuery(term)

    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set("query", term)
    } else {
      params.delete("query")
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search documents..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  )
}
