import { useEffect, useState } from "react"
import { useJwt } from "react-jwt"
import { useLocation } from "react-router-dom"
import { LoadingScreen } from "./components/LoadingScreen"
import { useAuth } from "./context/AuthContext"
import { useGetDashboard } from "./hooks/useGetDashboard"
import type { MiddlewareProps, TokenProps } from "./types/general"

export default function Middleware({ element, roles }: MiddlewareProps) {
  const { changeToken, token } = useAuth()
  const [loading, setLoading] = useState(true)
  const { isExpired, decodedToken } = useJwt<TokenProps>(token)
  const { changeUser, changeAreas, changeFirstLogin } = useAuth()
  const location = useLocation()
  const publicPaths = ["/", "/esqueceu-senha", "/criar-conta", "/ativar-conta"]
  const pathname = location.pathname
  const isDashboard = pathname.includes("dash")
  const { data } = isDashboard ? useGetDashboard() : { data: null }
  const areas = data?.areas ?? []
  const allowedAreas = data?.allowedAreas ?? []
  const firstLogin = data?.firstLogin

  const handleStorageChange = () => {
    changeToken(localStorage.getItem("token") ?? "")
  }

  useEffect(() => {
    if (isDashboard) {
      changeAreas({
        all: areas,
        allowed: allowedAreas
      })
      changeFirstLogin(!!firstLogin)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [data])

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
        window.location.replace("/")
      }
      setLoading(false)
      return
    }

    if (publicPaths.includes(pathname)) {
      window.location.replace("/dash")
      setLoading(false)
      return
    }

    if (!isAuthorized) {
      window.location.replace("/dash")
      setLoading(false)
      return
    }

    setLoading(false)
  }, [token, isExpired, decodedToken, pathname, roles])

  if (loading) {
    return <LoadingScreen />
  }

  return element
}
