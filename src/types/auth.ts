export type AuthContextProps = {
  user: User | null
  token: string
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
