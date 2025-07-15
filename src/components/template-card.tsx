"use client"

import { useState } from "react"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface TemplateCardProps {
  title: string
  createdDate: string
  typeOfManagement: string
  stage?: string
  diagnostics: number
  treatment: number
  onOpen: () => void
  isSelected: boolean
}

export function TemplateCard({
  title,
  createdDate,
  typeOfManagement,
  stage,
  diagnostics,
  treatment,
  onOpen,
  isSelected,
}: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={`group gap-2 shadow-none py-3 relative hover:bg-[#FAFAFA] ${isSelected ? "border border-[#17A117]" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="gap-0 px-4 flex flex-row justify-between items-start">
        <div>
          <CardTitle className="font-semibold text-sm">{title}</CardTitle>
          <CardDescription className="text-xs">Created: {createdDate}</CardDescription>
        </div>
        <div className={`transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onOpen}>Open</DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert("Delete clicked")}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="px-4">
        <div className="space-y-2 text-xs">
          <div>
            <span className="text-[#7E838F] font-semibold">Type of management</span>
            <Badge variant="outline" className="bg-[#EEF7E0] border-[#C6CCB3] text-[#38422C] whitespace-normal font-normal">
              {typeOfManagement}
            </Badge>
          </div>
          {stage && (
            <div>
              <span className="text-[#7E838F] font-semibold">Stage</span>
              <Badge variant="outline" className="bg-[#ECF7EC] border-[#CAD3C7] text-[#375E4D] whitespace-normal font-normal">
                {stage}
              </Badge>
            </div>
          )}
          <div>
            <span className="text-[#7E838F] font-semibold">Diagnostics</span>
            <div className="text-[#292929]">{diagnostics} appointments</div>
          </div>
          <div>
            <span className="text-[#7E838F] font-semibold">Treatment</span>
            <div className="text-[#292929]">{treatment} appointments</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
