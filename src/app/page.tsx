"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { LeftSidebar } from "@/components/left-sidebar"
import { MainContent } from "@/components/main-content"
import { RightSidebar } from "@/components/right-sidebar"
import { SearchModal } from "@/components/search-modal"
import { usePrescriptions } from "@/hooks/use-prescriptions"
import medicalData from "@/data/medical-data.json"

const diagnosticsList = [
  "Decoding, description and interpretation of electrocardiographic data",
  "Ophthalmoscopy",
  "Study of the level of troponins I, t in the blood",
  "Consultation of a neurologist",
]

const treatmentList = [
  "Auscultation of the heart",
  "Measurement of blood pressure",
  "General blood analysis",
  "Biochemical blood test",
  "General urine analysis",
  "ECG",
  "Echocardiography",
  "Ultrasound of the kidneys",
  "Consultation of an ophthalmologist",
  "Consultation of a neurologist",
]

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

  const handleAddToCard = (template: any) => {
    const diagnosticsToAdd = diagnosticsList
      .slice(0, template.diagnostics as number)
      .map((item) => ({ id: item, title: item, tags: [], sectionTitle: "Diagnostics" }))

    const treatmentsToAdd = treatmentList
      .slice(0, template.treatment as number)
      .map((item) => ({ id: item, title: item, tags: [], sectionTitle: "Treatment" }))

    diagnosticsToAdd.forEach((item) => {
      if (!isPrescribed(item.id)) {
        addPrescription(item)
        setCheckedItems((prev) => new Set(prev).add(item.id))
      }
    })

    treatmentsToAdd.forEach((item) => {
      if (!isPrescribed(item.id)) {
        addPrescription(item)
        setCheckedItems((prev) => new Set(prev).add(item.id))
      }
    })
  }

  return (
    <div className="h-screen flex flex-col bg-[#FCFFFE] overflow-hidden">
      {/* Fixed Header */}
      <Header title="The diagnosis of ICB - I10 essential (primary) hypertension" onSearchClick={handleSearchClick} />

      {/* Main Content Area - Takes remaining height */}
      <div className="flex flex-1 min-h-0">
        <LeftSidebar onAddToCard={handleAddToCard} />
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
