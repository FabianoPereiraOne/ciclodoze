import type { Roles } from "./auth"

export type AreaType = {
  id: number
  isActive: boolean
  name: string
  access: Roles
}

export type dataType = {
  id: number
  isActive: boolean
  name: string
  access: Roles
}
