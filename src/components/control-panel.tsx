"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface ControlPanelProps {
  activeTab: string
  groupMode: boolean
  onTabChange: (tab: string) => void
  onGroupModeChange: (enabled: boolean) => void
}

export function ControlPanel({ activeTab, groupMode, onTabChange, onGroupModeChange }: ControlPanelProps) {
  return (
    <div className="space-y-4">
      {/* Dropdowns */}
      <div className="flex gap-4">
        <Select defaultValue="outpatient">
          <SelectTrigger className="flex-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="outpatient">Outpatient clinic and hospital</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-stages">
          <SelectTrigger className="flex-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-stages">All stages</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-groups">
          <SelectTrigger className="flex-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-groups">All groups</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tab Controls */}
      <div className="flex flex-row items-center gap-4 justify-between">
        <div className="bg-gray-100 rounded-lg p-1 flex items-center gap-1">
          <Button
            variant={activeTab === "diagnostics" ? "default" : "ghost"}
            // size="sm"
            onClick={() => onTabChange("diagnostics")}
            className={activeTab === "diagnostics" 
              ? "text-sm bg-white hover:bg-gray-50 text-gray-800" 
              : "text-sm"
            }
          >
            Diagnostics
          </Button>
          <Button
            variant={activeTab === "treatment" ? "default" : "ghost"}
            // size="sm"
            onClick={() => onTabChange("treatment")}
            className={activeTab === "treatment" 
              ? "text-sm bg-white hover:bg-gray-50 text-gray-800"
              : "text-sm"
            }
          >
            Treatment
          </Button>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <span className="text-sm font-medium">Group</span>
          <Switch checked={groupMode} onCheckedChange={onGroupModeChange} />
        </div>
      </div>
      
    </div>
  )
}
