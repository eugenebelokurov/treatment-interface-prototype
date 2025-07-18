import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface DiagnosticItemProps {
  id: string
  title: string
  tags: string[]
  sectionTitle: string
  checked?: boolean
  index: number
  onCheckedChange?: (
    checked: boolean,
    item: { id: string; title: string; tags: string[]; sectionTitle: string },
  ) => void
}

export function DiagnosticItem({
  id,
  title,
  tags,
  sectionTitle,
  checked,
  index,
  onCheckedChange,
}: DiagnosticItemProps) {
  const handleCheckedChange = (checkedState: boolean) => {
    onCheckedChange?.(checkedState, { id, title, tags, sectionTitle })
  }

  const backgroundColor = index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-transparent"

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-[#F0F0F0] ${backgroundColor} cursor-pointer`}
    >
      <div className="flex items-center gap-3">
        <Checkbox checked={checked} onCheckedChange={handleCheckedChange} className="border-gray-300"/>
        <span className="text-sm font-normal">{title}</span>
      </div>
      <div className="flex gap-2">
        {tags.map((tag, tagIndex) => (
          <Badge key={tagIndex} variant="secondary" className="text-xs bg-[#D7E4FF] text-[#124BBF]">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}
