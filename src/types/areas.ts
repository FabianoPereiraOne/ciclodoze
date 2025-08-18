import type { Roles } from "./auth"

export type AreaType = {
  id: number
  isActive: boolean
  title: string
  access: Roles
  url: string
  icon: string
  pages?: {
    title: string
    url: string
  }[]
}

export type dataType = {
  id: number
  isActive: boolean
  title: string
  access: Roles
}
