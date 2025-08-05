import { LayoutDash } from "@/components/LayoutDash"
import { useGetDashboard } from "@/hooks/useGetDashboard"
import { useEffect, useState } from "react"
import { PopupWelcome } from "./components/PopupWelcome"

export const Dash = () => {
  const [open, setOpen] = useState(false)
  const { data } = useGetDashboard()
  const areas = data?.areas ?? []
  const firstLogin = data?.firstLogin

  useEffect(() => {
    setOpen(!!firstLogin)
  }, [firstLogin])

  const onCloseWelcome = () => {
    setOpen(false)
  }

  return (
    <LayoutDash>
      <PopupWelcome onClose={onCloseWelcome} open={open} />
      hello world{firstLogin}
    </LayoutDash>
  )
}
