"use client"

import { useState, useCallback } from "react"
import type { DiagnosticItem, PrescriptionItem } from "@/types/medical"

export function usePrescriptions() {
  const [prescriptions, setPrescriptions] = useState<PrescriptionItem[]>([])

  const addPrescription = useCallback((item: DiagnosticItem) => {
    setPrescriptions((prev) => {
      const exists = prev.find((p) => p.id === item.id)
      if (exists) return prev

      return [...prev, { ...item, comment: "" }]
    })
  }, [])

  const removePrescription = useCallback((id: string) => {
    setPrescriptions((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const updateComment = useCallback((id: string, comment: string) => {
    setPrescriptions((prev) => prev.map((p) => (p.id === id ? { ...p, comment } : p)))
  }, [])

  const isPrescribed = useCallback(
    (id: string) => {
      return prescriptions.some((p) => p.id === id)
    },
    [prescriptions],
  )

  return {
    prescriptions,
    addPrescription,
    removePrescription,
    updateComment,
    isPrescribed,
  }
}
