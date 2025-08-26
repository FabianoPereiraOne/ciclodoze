import { LayoutDash } from "@/components/LayoutDash"
import { useAuth } from "@/context/AuthContext"
import { useCreateCycle } from "@/hooks/useCreateCycle"
import { useUpdateUser } from "@/hooks/useUpdateUser"
import { useEffect, useState } from "react"
import { PopupWelcome } from "./components/PopupWelcome"

export const Dashboard = () => {
  const [open, setOpen] = useState(false)
  const { firstLogin, changeFirstLogin } = useAuth()
  const { mutateAsync } = useUpdateUser()
  const { mutateAsync: createCycle } = useCreateCycle()

  const loadUpdateUser = async () => {
    try {
      await mutateAsync({ firstLogin: false })
      changeFirstLogin(false)
    } catch (error) {
      console.error(error)
    }
  }

  const loadInitializeCycle = async () => {
    try {
      await createCycle()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setOpen(firstLogin)

    if (firstLogin) loadInitializeCycle()

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
