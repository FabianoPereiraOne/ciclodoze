import { useEffect, useState } from "react"
import { useJwt } from "react-jwt"
import { useLocation, useNavigate } from "react-router-dom"
import { LoadingScreen } from "./components/LoadingScreen"
import type { MiddlewareProps, TokenProps } from "./types/general"

export default function Middleware({ element, roles }: MiddlewareProps) {
  const token = localStorage.getItem("token") ?? ""
  const { isExpired, decodedToken } = useJwt<TokenProps>(token)
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const publicPaths = ["/", "/esqueceu-senha", "/criar-conta", "/ativar-conta"]
  const pathname = location.pathname
  const type = decodedToken?.type ?? ""
  const isAuthorized = roles?.includes(type)

  useEffect(() => {
    if (!token || isExpired) {
      localStorage.removeItem("token")

      if (!publicPaths.includes(pathname)) {
        navigate("/")
        return
      }
    } else if (publicPaths.includes(pathname) || !isAuthorized) {
      navigate("/dash")
      return
    }

    setLoading(false)
  }, [token, isExpired, pathname, isAuthorized, navigate])

  if (loading) {
    return <LoadingScreen />
  }

  return element
}
