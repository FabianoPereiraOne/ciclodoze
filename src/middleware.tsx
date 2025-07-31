import { useEffect, useState } from "react"
import { useJwt } from "react-jwt"
import { useLocation, useNavigate } from "react-router-dom"
import { LoadingScreen } from "./components/LoadingScreen"
import { useAuth } from "./context/AuthContext"
import type { MiddlewareProps, TokenProps } from "./types/general"

export default function Middleware({ element, roles }: MiddlewareProps) {
  const { changeToken, token } = useAuth()
  const [loading, setLoading] = useState(true)
  const { isExpired, decodedToken } = useJwt<TokenProps>(token)
  const { changeUser } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const publicPaths = ["/", "/esqueceu-senha", "/criar-conta", "/ativar-conta"]
  const pathname = location.pathname

  useEffect(() => {
    const handleStorageChange = () => {
      changeToken(localStorage.getItem("token") ?? "")
    }
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  useEffect(() => {
    if (token && !decodedToken) return

    const type = decodedToken?.type
    const isActive = decodedToken?.isActive
    const isAuthorized = roles?.includes(type ?? "")
    changeUser({
      name: decodedToken?.name,
      email: decodedToken?.email,
      photo: decodedToken?.photo,
      type: decodedToken?.type,
      isActive: decodedToken?.isActive
    })

    if (!token || isExpired || !isActive) {
      localStorage.removeItem("token")
      changeToken("")

      if (!publicPaths.includes(pathname)) {
        navigate("/")
      }
      setLoading(false)
      return
    }

    if (publicPaths.includes(pathname)) {
      navigate("/dash")
      setLoading(false)
      return
    }

    if (!isAuthorized) {
      navigate("/dash")
      setLoading(false)
      return
    }

    setLoading(false)
  }, [token, isExpired, decodedToken, pathname, roles, navigate])

  if (loading) {
    return <LoadingScreen />
  }

  return element
}
