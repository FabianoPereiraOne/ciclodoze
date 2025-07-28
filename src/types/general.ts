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
}
