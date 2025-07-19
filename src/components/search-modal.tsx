"use client"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useSearch } from "@/hooks/use-search"
import type { MedicalData } from "@/types/medical"

import { ArrowUpDown, Undo2 } from 'lucide-react';
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  medicalData: MedicalData
  selectedItems: Set<string>
  onItemSelect: (checked: boolean, item: { id: string; title: string; tags: string[]; sectionTitle: string, prescriptionType: string }) => void
}

// Component to highlight matching text
function HighlightedText({ text, searchQuery }: { text: string; searchQuery: string }) {
  if (!searchQuery.trim()) {
    return <span>{text}</span>
  }

  // Create regex for case-insensitive matching
  const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)

  return (
    <span>
      {parts.map((part, index) => {
        // Check if this part matches the search query (case-insensitive)
        const isMatch = regex.test(part)
        // Reset regex lastIndex to avoid issues with global flag
        regex.lastIndex = 0
        
        return isMatch ? (
          <span key={index} className="bg-yellow-200 text-yellow-900 rounded">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      })}
    </span>
  )
}

export function SearchModal({ isOpen, onClose, medicalData, selectedItems, onItemSelect }: SearchModalProps) {
  const { searchQuery, setSearchQuery, groupedResults, hasResults } = useSearch(medicalData)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [lastInputMethod, setLastInputMethod] = useState<"keyboard" | "mouse">("keyboard")
  const inputRef = useRef<HTMLInputElement>(null)

  // Get all items in order for keyboard navigation
  const allItems = [...groupedResults.diagnostics, ...groupedResults.treatment]

  // Focus input when modal opens and reset focused index
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
      setFocusedIndex(0)
    }
  }, [isOpen])

  // Reset focused index when search results change
  useEffect(() => {
    setFocusedIndex(0)
  }, [searchQuery])

  // Handle keyboard shortcuts and navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          e.preventDefault()
          onClose()
          break
        case "ArrowDown":
          e.preventDefault()
          setFocusedIndex((prev) => {
            const newIndex = prev < allItems.length - 1 ? prev + 1 : prev
            return prev === -1 ? 0 : newIndex // If no focus, start from 0
          })
          setLastInputMethod("keyboard")
          break
        case "ArrowUp":
          e.preventDefault()
          setFocusedIndex((prev) => {
            const newIndex = prev > 0 ? prev - 1 : prev
            return prev === -1 ? 0 : newIndex // If no focus, start from 0
          })
          setLastInputMethod("keyboard")
          break
        case "Enter":
          e.preventDefault()
          if (allItems[focusedIndex] && focusedIndex !== -1) {
            handleItemSelect(allItems[focusedIndex])
          }
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, focusedIndex, selectedItems, onClose])

  const handleItemSelect = (item: { id: string; title: string; tags: string[]; sectionTitle: string; prescriptionType: string }) => {
    const isCurrentlySelected = selectedItems.has(item.id)
    onItemSelect(!isCurrentlySelected, item)
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const handleModalClose = (open: boolean) => {
    if (!open) {
      setSearchQuery("")
      onClose()
    }
  }

  // Handle mouse movement to switch to mouse mode
  const handleMouseMove = (globalIndex: number) => {
    setLastInputMethod("mouse")
    setFocusedIndex(globalIndex)
  }

  // Handle mouse leave to clear focus when using mouse
  const handleMouseLeave = () => {
    if (lastInputMethod === "mouse") {
      setFocusedIndex(-1) // Set to -1 to indicate no item is focused
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogOverlay className="!bg-transparent" />
      <DialogContent
          className="min-w-3xl max-h-[80vh] p-0 gap-0 flex flex-col fixed left-1/2 -translate-x-1/2 top-[80px] translate-y-0"
      >
        <VisuallyHidden>
          <DialogTitle className="display-none">Edit profile</DialogTitle>
        </VisuallyHidden>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-3 p-4">
            <Search className="w-5 h-5 text-gray-400" />
            <Input
              ref={inputRef}
              placeholder="Prescribe diagnostics or treatment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 text-base shadow-none"
            />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 max-h-96">
            {!hasResults ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Nothing found</p>
                <Button variant="outline" onClick={clearSearch}>
                  Clear search
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Diagnostics Section */}
                {groupedResults.diagnostics.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-3">Diagnostics</h3>
                    <div className="space-y-0" onMouseLeave={handleMouseLeave}>
                      {groupedResults.diagnostics.map((item, index) => {
                        const globalIndex = index
                        const isFocused = globalIndex === focusedIndex && focusedIndex !== -1 && focusedIndex !== -1
                        const isSelected = selectedItems.has(item.id)

                        // Alternating background: even indices get #FAFAFA, odd indices get white
                        const backgroundColor = index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"

                        // Determine the background class based on focus and input method
                        let backgroundClass = backgroundColor
                        if (isFocused) {
                          backgroundClass = "bg-[#F0F0F0]"
                        } else if (lastInputMethod === "mouse") {
                          // Only apply hover when in mouse mode
                          backgroundClass = `${backgroundColor} hover:bg-[#F0F0F0]`
                        }

                        return (
                          <div
                            key={item.id}
                            className={`relative flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${backgroundClass} ${isFocused ? "pr-12" : ""}`}
                            onClick={() => handleItemSelect(item)}
                            onMouseMove={() => handleMouseMove(globalIndex)}
                          >
                            <div className="flex items-center gap-3 flex-1">
                              <Checkbox checked={isSelected} />
                              <span className="text-sm">
                                <HighlightedText text={item.title} searchQuery={searchQuery} />
                              </span>
                            </div>
                            <div className="flex gap-1">
                              {item.tags.map((tag, tagIndex) => (
                                <div key={tagIndex}>
                                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                                  <HighlightedText text={tag} searchQuery={searchQuery} />
                                </Badge>
                                </div>
                              ))}
                            </div>
                            {isFocused && (
                              <Undo2 className="absolute right-3 top-1/2 
                              -translate-y-1/2 w-[14px] h-[14px] text-[#7A7A7A] pointer-events-none z-10 -scale-y-100" />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Treatment Section */}
                {groupedResults.treatment.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-3">Treatment</h3>
                    <div className="space-y-3" onMouseLeave={handleMouseLeave}>
                      {groupedResults.treatment.map((item, index) => {
                        const globalIndex = groupedResults.diagnostics.length + index
                        const isFocused = globalIndex === focusedIndex
                        const isSelected = selectedItems.has(item.id)

                        // Alternating background: even indices get #FAFAFA, odd indices get white
                        const backgroundColor = index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"

                        // Determine the background class based on focus and input method
                        let backgroundClass = backgroundColor
                        if (isFocused) {
                          backgroundClass = "bg-blue-50 ring-1 ring-blue-200"
                        } else if (lastInputMethod === "mouse") {
                          // Only apply hover when in mouse mode
                          backgroundClass = `${backgroundColor} hover:bg-[#F0F0F0]`
                        }

                        return (
                          <div
                            key={item.id}
                            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors border ${backgroundClass}`}
                            onClick={() => handleItemSelect(item)}
                            onMouseMove={() => handleMouseMove(globalIndex)}
                          >
                            <div className="flex items-center gap-3 flex-1">
                              <Checkbox checked={isSelected} />
                              <span className="text-sm">
                                <HighlightedText text={item.title} searchQuery={searchQuery} />
                              </span>
                            </div>
                            <div className="flex gap-1">
                              {item.tags.map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                                  <HighlightedText text={tag} searchQuery={searchQuery} />
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* footer with hints */}
        <div className="w-full border-t px-6 py-3 flex items-center gap-8 text-gray-400 text-base select-none">
          <span className="flex items-center gap-2 font-medium text-[13px] text-[#666666]">
            <ArrowUpDown className="w-4 h-4 text-[#7A7A7A]"/>
            Select
          </span>
          <span className="flex items-center gap-2 font-medium text-[13px] text-[#666666]">
            <Undo2 className="w-4 h-4 text-[#7A7A7A] -scale-y-100"/>
            Add
          </span>
          <span className="flex items-center gap-2 font-medium text-[13px] text-[#666666]">
            <span className="inline-block text-sx text-[#7A7A7A]">esc</span>
            Close
          </span>
        </div>
      </DialogContent>
      <VisuallyHidden>
      <DialogFooter>
        
          <Button variant="outline">Cancel</Button>
        
      </DialogFooter>
      </VisuallyHidden>
    </Dialog>
  )
}