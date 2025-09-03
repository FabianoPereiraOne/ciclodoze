import { ButtonAction } from "@/components/Button"
import { LayoutDash } from "@/components/LayoutDash"
import { Dialog } from "@/components/ui/dialog"
import type { ActionPlansType } from "@/types/actionPlans"
import { useState } from "react"
import { LuPlus } from "react-icons/lu"
import { DialogAdd } from "./components/DialogAdd"
import { DialogUpdate } from "./components/DialogUpdate"
import { Listing } from "./components/Listing"

export default function Plans() {
  const [open, setOpen] = useState(false)
  const [update, setUpdate] = useState(false)
  const [plan, setPlan] = useState<ActionPlansType | null>(null)

  const toggleDialog = () => {
    setOpen(!open)
  }

  const toggleUpdate = () => setUpdate(!update)

  return (
    <LayoutDash>
      <div className='w-full px-[20px] py-[24px] flex flex-col gap-[20px]'>
        <div className='w-full flex items-center justify-between'>
          <div>
            <h2 className='text-xl font-semibold mb-2'>Planos de ação</h2>
            <p className='text-muted-foreground'>
              Passos práticos para execução eficiente.
            </p>
          </div>

          <ButtonAction onClick={toggleDialog}>
            <LuPlus />
            Criar novo plano
          </ButtonAction>
        </div>
        <Listing fcData={setPlan} toggleDialogUpdate={toggleUpdate} />
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogAdd toggleDialog={toggleDialog} />
      </Dialog>
      <Dialog open={update} onOpenChange={setUpdate}>
        <DialogUpdate toggleDialog={toggleUpdate} plan={plan} />
      </Dialog>
    </LayoutDash>
  )
}
