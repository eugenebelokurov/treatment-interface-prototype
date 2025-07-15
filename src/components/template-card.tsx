import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TemplateCardProps {
  title: string
  createdDate: string
  typeOfManagement: string
  stage?: string
  diagnostics: number
  treatment: number
}

export function TemplateCard({
  title,
  createdDate,
  typeOfManagement,
  stage,
  diagnostics,
  treatment,
}: TemplateCardProps) {
  return (
    <Card className="gap-2 shadow-none py-3">
      <CardHeader className="gap-0 px-4">
        <CardTitle className="font-semibold text-sm">{title}</CardTitle>
        <CardDescription className="text-xs">Created: {createdDate}</CardDescription>
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
