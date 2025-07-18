"use client"

import { useState } from "react"
import { ControlPanel } from "./control-panel"
import { ConditionSection } from "./condition-section"
import { DiagnosticSection } from "./diagnostic-section"
import type { MedicalData } from "@/types/medical"

interface MainContentProps {
  medicalData: MedicalData
  checkedItems: Set<string>
  onItemToggle: (checked: boolean, item: { id: string; title: string; tags: string[]; sectionTitle?: string }, sectionTitle: string) => void
}

export function MainContent({ medicalData, checkedItems, onItemToggle }: MainContentProps) {
  const [activeTab, setActiveTab] = useState("diagnostics")
  const [groupMode, setGroupMode] = useState(true)

  return (
    <div className="flex-1 flex flex-col bg-[#FCFFFE] h-full min-h-0">
      {/* Fixed Top Section - Header and Control Panel */}
      <div className="flex-shrink-0 px-3 pt-6 pb-4 bg-[#FCFFFE]">
        <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">DIAGNOSTICS AND TREATMENT</h2>
        <ControlPanel
          activeTab={activeTab}
          groupMode={groupMode}
          onTabChange={setActiveTab}
          onGroupModeChange={setGroupMode}
        />
      </div>

      {/* Scrollable Medical Data Sections */}
      <div className="flex-1 overflow-y-auto p-3 pt-4 bg-[#FCFFFE] scrollbar-hide">
        <style>
          {`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        <div className="space-y-6">
          {Object.entries(medicalData).map(([key, condition]) => (
            <div key={key} className="space-y-0">
              <ConditionSection
                title={condition.title}
                description={condition.description}
                type={condition.type as "indication" | "normal"}
              />

              {Object.entries(condition.sections).map(([sectionKey, section]) => (
                <DiagnosticSection
                  key={sectionKey}
                  title={section.title}
                  items={section.items}
                  checkedItems={checkedItems}
                  onItemToggle={(checked, item) => onItemToggle(checked, item, section.title)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
