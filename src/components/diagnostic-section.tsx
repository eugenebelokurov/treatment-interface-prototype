import { DiagnosticItem } from "./diagnostic-item"

interface DiagnosticSectionProps {
  title: string
  items: Array<{
    title: string
    tags: string[]
  }>
  checkedItems: Set<string>
  onItemToggle: (checked: boolean, item: { id: string; title: string; tags: string[]; sectionTitle: string }) => void
}

export function DiagnosticSection({ title, items, checkedItems, onItemToggle }: DiagnosticSectionProps) {
  return (
    <div>
      <h3 className="font-semibold text-sm text-gray-600 py-3 px-1">{title}</h3>
      <div className="">
        {items.map((item, index) => {
          const id = `${title.toLowerCase().replace(/\s+/g, "_")}_${index}`
          return (
            <DiagnosticItem
              key={id}
              id={id}
              title={item.title}
              tags={item.tags}
              sectionTitle={title}
              checked={checkedItems.has(id)}
              index={index} // Pass the index for alternating colors
              onCheckedChange={onItemToggle}
            />
          )
        })}
      </div>
    </div>
  )
}
