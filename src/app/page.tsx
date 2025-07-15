"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { LeftSidebar } from "@/components/left-sidebar"
import { MainContent } from "@/components/main-content"
import { RightSidebar } from "@/components/right-sidebar"
import { SearchModal } from "@/components/search-modal"
import { usePrescriptions } from "@/hooks/use-prescriptions"
import medicalData from "@/data/medical-data.json"

export default function MedicalInterface() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { prescriptions, addPrescription, removePrescription, updateComment, isPrescribed } = usePrescriptions()

  const handleItemToggle = (
    checked: boolean,
    item: { id: string; title: string; tags: string[]; sectionTitle: string },
  ) => {
    const newCheckedItems = new Set(checkedItems)

    if (checked) {
      newCheckedItems.add(item.id)
      addPrescription(item)
    } else {
      newCheckedItems.delete(item.id)
      removePrescription(item.id)
    }

    setCheckedItems(newCheckedItems)
  }

  const handleRemovePrescription = (id: string) => {
    const newCheckedItems = new Set(checkedItems)
    newCheckedItems.delete(id)
    setCheckedItems(newCheckedItems)
    removePrescription(id)
  }

  const handleSearchClick = () => {
    setIsSearchOpen(true)
  }

  return (
    <div className="h-screen flex flex-col bg-[#FCFFFE] overflow-hidden">
      {/* Fixed Header */}
      <Header title="The diagnosis of ICB - I10 essential (primary) hypertension" onSearchClick={handleSearchClick} />

      {/* Main Content Area - Takes remaining height */}
      <div className="flex flex-1 min-h-0">
        <LeftSidebar />
        <MainContent medicalData={medicalData} checkedItems={checkedItems} onItemToggle={handleItemToggle} />
        <RightSidebar
          prescriptions={prescriptions}
          onRemovePrescription={handleRemovePrescription}
          onUpdateComment={updateComment}
        />
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        medicalData={medicalData}
        selectedItems={checkedItems}
        onItemSelect={handleItemToggle}
      />
    </div>
  )
}
