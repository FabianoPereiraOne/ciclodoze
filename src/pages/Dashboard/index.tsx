import { LayoutDash } from "@/components/LayoutDash"
import { useAuth } from "@/context/AuthContext"
import { useUpdateUser } from "@/hooks/useUpdateUser"
import { useEffect, useState } from "react"
import { PopupWelcome } from "./components/PopupWelcome"

export const Dashboard = () => {
  const [open, setOpen] = useState(false)
  const { firstLogin, changeFirstLogin } = useAuth()
  const { mutateAsync } = useUpdateUser()

  const loadUpdateUser = async () => {
    try {
      await mutateAsync({ firstLogin: false })
      changeFirstLogin(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setOpen(firstLogin)

    if (!firstLogin) {
      loadUpdateUser()
    }
  }, [firstLogin])

  const onCloseWelcome = () => {
    setOpen(false)
  }

  return (
    <LayoutDash>
      <PopupWelcome onClose={onCloseWelcome} open={open} />
      hello world
    </LayoutDash>
  )
}
