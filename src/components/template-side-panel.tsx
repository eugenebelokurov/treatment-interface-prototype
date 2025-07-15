"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface TemplateSidePanelProps {
  template: {
    title: string
    createdDate: string
    typeOfManagement: string
    stage?: string
    diagnostics: number | string[]
    treatment: number | string[]
  }
  onClose: () => void
  onAddToCard: () => void
  isOpen: boolean
}

const diagnosticsList = [
  "Decoding, description and interpretation of electrocardiographic data",
  "Ophthalmoscopy",
  "Study of the level of troponins I, t in the blood",
  "Consultation of a neurologist",
]

const treatmentList = [
  "Auscultation of the heart",
  "Measurement of blood pressure",
  "General blood analysis",
  "Biochemical blood test",
  "General urine analysis",
  "ECG",
  "Echocardiography",
  "Ultrasound of the kidneys",
  "Consultation of an ophthalmologist",
  "Consultation of a neurologist",
]

export function TemplateSidePanel({ template, onClose, isOpen, onAddToCard }: TemplateSidePanelProps) {
  const panelClasses = isOpen
    ? "translate-x-0 opacity-100"
    : "-translate-x-full opacity-0"

  return (
    <div
      className={`absolute top-0 left-64 w-80 h-full bg-white z-20 shadow-[1px_0px_0px_rgba(0,0,0,0.1)] transform transition-transform duration-300 ease-in-out flex flex-col ${panelClasses}`}
    >
      <div className="flex flex-col gap-0 pt-4 px-4">
        <div className="flex items-center justify-between ">
          <h3 className="text-sm font-semibold">{template.title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div>
          <p className="text-sm text-gray-500">Created: {template.createdDate}</p>
        </div>
      </div>
    <div className="p-4 space-y-4 overflow-y-auto flex-1 scrollbar-hide">
       <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div>
        <span className="text-sm text-[#7E838F] font-semibold mb-2">Type of management:</span>
        <p>
          <Badge
            variant="outline"
            className="bg-[#EEF7E0] border-[#C6CCB3] text-[#38422C] whitespace-normal font-normal text-sm"
          >
            {template.typeOfManagement}
          </Badge>
        </p>
      </div>
      {template.stage && (
        <div>
          <span className="text-sm text-[#7E838F] font-semibold mb-2">Stage:</span>
          <p>
            <Badge
              variant="outline"
              className="bg-[#ECF7EC] border-[#CAD3C7] text-[#375E4D] whitespace-normal font-normal text-sm"
            >
              {template.stage}
            </Badge>
          </p>
        </div>
      )}
      <div>
        <h4 className="text-sm text-[#7E838F] font-semibold mb-2">Diagnostics</h4>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          {diagnosticsList.slice(0, template.diagnostics as number).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>
      <div>
        <h4 className="text-sm text-[#7E838F] font-semibold mb-2">Treatment</h4>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          {treatmentList.slice(0, template.treatment as number).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>
    </div>
    <div className="p-4">
      <Button className="w-full p-6" onClick={onAddToCard}>
        Add to the card
      </Button>
    </div>
  </div>
  )
}
