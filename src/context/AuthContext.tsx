import type { AuthContextProps, User } from "@/types/auth"
import { createContext, useContext, useState, type ReactNode } from "react"

const AuthContext = createContext({} as AuthContextProps)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<null | User>(null)
  const [token, setToken] = useState<string>(
    () => localStorage.getItem("token") ?? ""
  )

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        changeUser: setUser,
        changeToken: setToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
