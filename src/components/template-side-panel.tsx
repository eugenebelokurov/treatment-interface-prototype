"use client"

import { motion } from "framer-motion"
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

const panelVariants = {
  open: { x: 288,},
  closed: { x: "-100%",},
}

export function TemplateSidePanel({ template, onClose, onAddToCard }: TemplateSidePanelProps) {
  return (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      variants={panelVariants}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="absolute top-0 w-80 h-full bg-white z-20 shadow-[1px_0px_0px_rgba(0,0,0,0.1)] flex flex-col"
    >
      <div className="flex flex-col gap-0 pt-4 px-3">
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
      <div className="p-3 space-y-4 overflow-y-auto flex-1 scrollbar-hide">
        <style>
          {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
        </style>
        <div>
          <p className="text-sm text-[#7E838F] font-semibold mb-2">Type of management</p>
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
            <p className="text-sm text-[#7E838F] font-semibold mb-2">Stage</p>
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
      <div className="p-3">
        <Button className="w-full p-6 bg-[#2A3B1E] hover:bg-[#2C2C2C] cursor-pointer" onClick={onAddToCard}>
          Add to the card
        </Button>
      </div>
    </motion.div>
  )
}
