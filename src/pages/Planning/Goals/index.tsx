import { ButtonAction } from "@/components/Button"
import { FloatButton } from "@/components/FloatButton"
import { LayoutDash } from "@/components/LayoutDash"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { useCreateCycle } from "@/hooks/useCreateCycle"
import type { GoalType } from "@/types/goals"
import { Plus } from "lucide-react"
import { useState } from "react"
import { LuLeaf } from "react-icons/lu"
import { toast } from "sonner"
import { DialogAdd } from "./components/DialogAdd"
import { DialogUpdate } from "./components/DialogUpdate"
import { Listing } from "./components/Listing"

export default function Goals() {
  const [open, setOpen] = useState(false)
  const [start, setStart] = useState(false)
  const [update, setUpdate] = useState(false)
  const [goal, setGoal] = useState<GoalType | null>(null)
  const { mutateAsync } = useCreateCycle()

  const toggleDialog = () => setOpen(!open)
  const toggleDialogUpdate = () => setUpdate(!update)

  const handlerSetData = (goalSelected: GoalType | null) => {
    setGoal(goalSelected)
  }

  const handlerStartNewCycle = async () => {
    try {
      const response = await mutateAsync()
      const message = response?.message
      toast.success(message)
    } catch (error: any) {
      console.error(error)
      toast.error(error?.message)
    }
  }

  return (
    <LayoutDash>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <FloatButton>
            <Plus className='!w-8 !h-8' />
          </FloatButton>
        </DialogTrigger>
        <DialogAdd toggleDialog={toggleDialog} />
      </Dialog>
      <div className='w-full px-[20px] py-[24px] flex flex-col gap-[20px]'>
        <div className='w-full flex items-center justify-between'>
          <div>
            <h2 className='text-xl font-semibold mb-2'>Minhas metas</h2>
            <p className='text-muted-foreground'>Sonhe. Planeje. Realize.</p>
          </div>

          <AlertDialog open={start} onOpenChange={setStart}>
            <AlertDialogTrigger asChild>
              <ButtonAction onClick={() => setStart(true)}>
                <LuLeaf />
                Iniciar novo ciclo
              </ButtonAction>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>⚠️ Atenção</AlertDialogTitle>
                <AlertDialogDescription>
                  Se você iniciar um novo ciclo antes de concluir o atual,{" "}
                  <strong>
                    não será possível restaurar ou continuar o ciclo em
                    andamento.
                  </strong>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handlerStartNewCycle}>
                  Iniciar novo ciclo
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <Listing
          fcData={handlerSetData}
          toggleDialogUpdate={toggleDialogUpdate}
        />
      </div>

      <Dialog open={update} onOpenChange={setUpdate}>
        <DialogUpdate data={goal} toggleDialog={toggleDialogUpdate} />
      </Dialog>
    </LayoutDash>
  )
}
