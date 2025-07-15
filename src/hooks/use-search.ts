"use client"

import { useState, useMemo } from "react"
import type { MedicalData } from "@/types/medical"

interface SearchItem {
  id: string
  title: string
  tags: string[]
  sectionTitle: string
  category: "diagnostics" | "treatment"
}

export function useSearch(medicalData: MedicalData) {
  const [searchQuery, setSearchQuery] = useState("")

  // Flatten all medical data into searchable items
  const allItems = useMemo(() => {
    const items: SearchItem[] = []

    Object.entries(medicalData).forEach(([conditionKey, condition]) => {
      Object.entries(condition.sections).forEach(([sectionKey, section]) => {
        section.items.forEach((item, index) => {
          const id = `${sectionKey.toLowerCase().replace(/\s+/g, "_")}_${index}`
          items.push({
            id,
            title: item.title,
            tags: item.tags,
            sectionTitle: section.title,
            category: "diagnostics", // For now, treating all as diagnostics
          })
        })
      })
    })

    return items
  }, [medicalData])

  // Get top 5 items for initial display
  const topItems = useMemo(() => {
    return allItems.slice(0, 5)
  }, [allItems])

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return topItems
    }

    const query = searchQuery.toLowerCase()
    return allItems.filter((item) => item.title.toLowerCase().includes(query))
  }, [searchQuery, allItems, topItems])

  // Group results by category
  const groupedResults = useMemo(() => {
    const diagnostics = searchResults.filter((item) => item.category === "diagnostics")
    const treatment = searchResults.filter((item) => item.category === "treatment")

    return { diagnostics, treatment }
  }, [searchResults])

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    groupedResults,
    hasResults: searchResults.length > 0,
  }
}
