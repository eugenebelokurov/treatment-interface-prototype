export interface DiagnosticItem {
  id: string
  title: string
  tags: string[]
  sectionTitle: string
}

export interface PrescriptionItem extends DiagnosticItem {
  comment?: string
  prescriptionType: string
}

export interface MedicalData {
  [key: string]: {
    title: string
    type: string
    prescriptionType: string
    description?: string
    sections: {
      [key: string]: {
        title: string
        items: Array<{
          title: string
          tags: string[]
        }>
      }
    }
  }
}
