"use client"

import { useEffect } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  title: string
  onClose?: () => void
  onSearchClick: () => void
}

export function Header({ title, onClose, onSearchClick }: HeaderProps) {
  // Handle Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        onSearchClick()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onSearchClick])

  return (
    <div className="bg-[#F5F7F6] border-b px-6 py-2 flex items-center justify-between">
      <h1 className="text-sm font-semibold text-gray-900">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="relative bg-gray-200 bg-clip-border rounded-lg mr-120">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-4 h-4" />
          <Input
            placeholder="Prescribe diagnostics or treatment..."
            className="pl-10 pr-16 w-120 cursor-pointer shadow-none border-none file:text-gray-100"
            onClick={onSearchClick}
            readOnly
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">Ctrl+K</div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
