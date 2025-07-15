import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { AdditionalActions } from "./additional-actions"
import { TemplateCard } from "./template-card"
import { SidebarNavigation } from "./sidebar-navigation"

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

export function LeftSidebar() {
  return (
    <div className="w-64 bg-[#F5F7F6] border-r flex flex-col h-full">
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
              <TemplateCard key={index} {...template} />
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Section - Navigation */}
      <div className="flex-shrink-0 border-t">
        <SidebarNavigation />
      </div>
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
      <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 pl-1 pt-5">ADDITIONAL ACTIONS</h3>
      <div className="space-y-0">
        {actions.map((action, index) => (
          <div key={index} className="px-1 py-2 hover:bg-[#F0F0F0] rounded-sm cursor-pointer">
            <div className="font-medium text-sm">{action.title}</div>
            <div className="text-xs font-medium text-gray-500">{action.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
