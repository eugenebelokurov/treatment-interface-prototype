import { Button } from "@/components/ui/button"
import { HelpCircle, Settings, Sparkles } from "lucide-react"

export function SidebarNavigation() {
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
