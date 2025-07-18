"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle, Settings, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TemplateCard } from "./template-card"
import { TemplateSidePanel } from "./template-side-panel"

const additionalActions = [
  { title: "Services", description: "Add from the price list" },
  { title: "Drugs", description: "Add from the director" },
  { title: "Direction", description: "To a profile specialist" },
]

const templates = [
  {
    title: "My favorite template 1",
    createdDate: "24 June 2025",
    typeOfManagement: "Outpatient conduct",
    stage: "Primary diagnosis with the diagnosis of AG",
    diagnostics: 4,
    treatment: 10,
  },
  {
    title: "My favorite template 2",
    createdDate: "3 July 2025",
    typeOfManagement: "Outpatient conduct",
    diagnostics: 4,
    treatment: 10,
  },
  {
    title: "My favorite template 3",
    createdDate: "15 July 2025",
    typeOfManagement: "Outpatient conduct",
    diagnostics: 6,
    treatment: 8,
  },
  {
    title: "My favorite template 4",
    createdDate: "20 July 2025",
    typeOfManagement: "Outpatient conduct",
    diagnostics: 3,
    treatment: 12,
  },
  {
    title: "My favorite template 5",
    createdDate: "25 July 2025",
    typeOfManagement: "Outpatient conduct",
    diagnostics: 5,
    treatment: 9,
  },
]

interface LeftSidebarProps {
  onAddToCard: (template: any) => void
}

export function LeftSidebar({ onAddToCard }: LeftSidebarProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof templates)[0] | null>(null)

  const handleOpenPanel = (template: (typeof templates)[0]) => {
    setSelectedTemplate(template)
    setIsPanelOpen(true)
  }

  const handleClosePanel = () => {
    setIsPanelOpen(false)
    setSelectedTemplate(null)
  }

  const handleAddToCard = () => {
    if (selectedTemplate) {
      onAddToCard(selectedTemplate)
    }
    handleClosePanel()
  }

  return (
    <div className="flex h-full relative">
      <div className="w-72 bg-[#F5F7F6] border-r flex flex-col h-full z-30">
        {/* Fixed Top Section - Additional Actions */}
        <div className="flex-shrink-0 p-1 border-b">
          <AdditionalActions actions={additionalActions} />
        </div>

        {/* Scrollable Middle Section - Templates */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Fixed Templates Header */}
          <div className="flex-shrink-0 px-3 pt-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">TEMPLATES (5)</h3>
              <Button variant="ghost" size="sm" className="text-xs">
                Create <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>

          {/* Scrollable Templates Content */}
          <div className="flex-1 overflow-y-auto p-3 scrollbar-hide">
            <style>
              {`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}
            </style>
            <div className="space-y-4">
              {templates.map((template, index) => (
                <TemplateCard
                  key={index}
                  {...template}
                  onOpen={() => handleOpenPanel(template)}
                  isSelected={selectedTemplate?.title === template.title && isPanelOpen}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Bottom Section - Navigation */}
        <div className="flex-shrink-0 border-t">
          <SidebarNavigation />
        </div>
      </div>
      <AnimatePresence>
        {isPanelOpen && selectedTemplate && (
          <TemplateSidePanel
            template={selectedTemplate}
            onClose={handleClosePanel}
            onAddToCard={handleAddToCard}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

interface AdditionalActionsProps {
  actions: Array<{
    title: string
    description: string
  }>
}

function AdditionalActions({ actions }: AdditionalActionsProps) {
  return (
    <div>
      <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 pl-2 pt-5">ADDITIONAL ACTIONS</h3>
      <div className="space-y-0">
        {actions.map((action, index) => (
          <div key={index} className="px-2 py-2 hover:bg-[#F0F0F0] rounded-sm cursor-pointer">
            <div className="font-medium text-sm">{action.title}</div>
            <div className="text-xs font-medium text-gray-500">{action.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SidebarNavigation() {
  return (
    <div className="p-1">
      <div className="space-y-0">
        <Button variant="ghost" className="w-full justify-start text-sm text-[#3D3D3D] cursor-pointer hover:bg-[#F0F0F0]">
          <HelpCircle className="w-4 h-4 mr-1 stroke-[#666666]" />
          Support
        </Button>
        <Button variant="ghost" className="w-full justify-start text-sm text-[#3D3D3D] cursor-pointer hover:bg-[#F0F0F0]">
          <Settings className="w-4 h-4 mr-1 stroke-[#666666]" />
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start text-sm text-[#3D3D3D] cursor-pointer hover:bg-[#F0F0F0]">
          <Sparkles className="w-4 h-4 mr-1 stroke-[#666666]" />
          What's new
        </Button>
      </div>
    </div>
  )
}
