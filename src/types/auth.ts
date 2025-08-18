import type { AreaType } from "./areas"

export type PropsArea = {
  all: AreaType[]
  allowed: AreaType[]
}

export type AuthContextProps = {
  user: User | null
  token: string
  areas: PropsArea
  firstLogin: boolean
  changeFirstLogin: (value: boolean) => void
  changeAreas: (value: PropsArea) => void
  changeToken: (token: string) => void
  changeUser: (user: User | null) => void
}

export type User = {
  name?: string
  email?: string
  photo?: string
  type?: string
  isActive?: boolean
}

export type Roles = "ADMIN" | "USER" | "TEACHER" | "FINANCE" | "MARKETING"
