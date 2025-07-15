interface ConditionSectionProps {
  title: string
  description?: string
  type?: "indication" | "normal"
}

export function ConditionSection({ title, description, type = "normal" }: ConditionSectionProps) {
  const bgColor = type === "indication" ? "bg-blue-50" : "bg-white"

  return (
    <div className={`${bgColor} p-4 rounded-lg`}>
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-sm">{title}</h3>
        {description && <span className="text-sm text-gray-500">{description}</span>}
      </div>
    </div>
  )
}
