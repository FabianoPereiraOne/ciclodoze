import { useAuth } from "@/context/AuthContext"
import { Role } from "@/schemas/validations/settings"

const useVerifyAdmin = () => {
  const { user } = useAuth()

  const isAdmin = user?.type === Role.ADMIN

  return { isAdmin }
}

export default useVerifyAdmin
