import type { ReactNode } from "react"

export type ButtonActionProps = {
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  children?: ReactNode
  className?: string
  loadingText?: string
  loading?: boolean
}
