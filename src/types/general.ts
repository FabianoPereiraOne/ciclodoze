import type { ReactNode } from "react"

export type MiddlewareProps = {
  element: ReactNode
  roles?: string[]
}

export type TokenProps = {
  name: string
  email: string
  photo: string
  type: string
  isActive: boolean
}

export type GeneralTypeResponse = {
  message: string
}

export type GeneralStatus =
  | "IN_PROGRESS"
  | "PENDING"
  | "COMPLETED"
  | "SKIPPED"
  | "FAILED"
  | "POSTPONED"

export type DifficultyStatus = "LOW" | "NORMAL" | "HIGH"
