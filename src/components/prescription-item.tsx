"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import type { PrescriptionItem as PrescriptionItemType } from "@/types/medical"

interface PrescriptionItemProps {
  item: PrescriptionItemType
  onRemove: (id: string) => void
  onCommentChange: (id: string, comment: string) => void
}

export function PrescriptionItem({ item, onRemove, onCommentChange }: PrescriptionItemProps) {
  const [comment, setComment] = useState(item.comment || "")

  const handleCommentChange = (value: string) => {
    setComment(value)
    onCommentChange(item.id, value)
  }

  return (
    <div className="bg-white rounded-lg border p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-sm leading-tight">{item.title}</h4>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <div className="flex gap-1">
            {item.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                {tag}
              </Badge>
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-red-500"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Textarea
        placeholder="Comment..."
        value={comment}
        onChange={(e) => handleCommentChange(e.target.value)}
        className="min-h-[60px] text-sm resize-none border-0 bg-gray-50 placeholder:text-gray-400"
      />
    </div>
  )
}
