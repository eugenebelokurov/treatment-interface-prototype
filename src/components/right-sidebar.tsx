import { Button } from "@/components/ui/button"
import { PrescriptionItem } from "./prescription-item"
// import { EmptyPrescription } from "./emptyPrescription"
import type { PrescriptionItem as PrescriptionItemType } from "@/types/medical"

interface RightSidebarProps {
  prescriptions: PrescriptionItemType[]
  onRemovePrescription: (id: string) => void
  onUpdateComment: (id: string, comment: string) => void
}

export function RightSidebar({ prescriptions, onRemovePrescription, onUpdateComment }: RightSidebarProps) {
  const diagnosticPrescriptions = prescriptions.filter((p) => p.sectionTitle === "Diagnostics")
  const treatmentPrescriptions = prescriptions.filter((p) => p.sectionTitle === "Treatment")

  return (
    <div className="w-120 bg-[#F5FAF8] border-l flex flex-col h-full">
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-3 scrollbar-hide">
        <style>
          {`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-6 pt-3">PRESCRIPTIONS</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3 text-sm">Diagnostics</h3>
            {diagnosticPrescriptions.length > 0 ? (
              <div className="space-y-3">
                {diagnosticPrescriptions.map((item) => (
                  <PrescriptionItem
                    key={item.id}
                    item={item}
                    onRemove={onRemovePrescription}
                    onCommentChange={onUpdateComment}
                  />
                ))}
              </div>
            ) : (
              <EmptyPrescription value="An example of the prescribed diagnosis" />
            )}
          </div>

          <div>
            <h3 className="font-medium mb-3 text-sm">Treatment</h3>
            {treatmentPrescriptions.length > 0 ? (
              <div className="space-y-3">
                {treatmentPrescriptions.map((item) => (
                  <PrescriptionItem
                    key={item.id}
                    item={item}
                    onRemove={onRemovePrescription}
                    onCommentChange={onUpdateComment}
                  />
                ))}
              </div>
            ) : (
              <EmptyPrescription value="An example of the prescribed treatment" />
            )}
          </div>
        </div>

        {/* Spacer to ensure content doesn't get hidden behind fixed button */}
        <div className="h-20"></div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="p-3">
        <Button className="w-full h-20" disabled={prescriptions.length === 0}>
          Record to the card
        </Button>
      </div>
    </div>
  )
}

interface EmptyPrescriptionProps {
  value: string
}

function EmptyPrescription({ value }: EmptyPrescriptionProps) {
  return (
    <div className="flex flex-row justify-center items-center border-dashed border-2 border-[#CBCBCB] min-h-36 rounded-sm fill-[#FCFFFE]">
      <p className="text-sm font-semibold text-[#B3B3B3]">{value}</p>
    </div>
  )
}
