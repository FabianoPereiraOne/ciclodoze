import { FloatButton } from "@/components/FloatButton"
import { LayoutDash } from "@/components/LayoutDash"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useState } from "react"
import { DialogAdd } from "./components/DialogAdd"

export default function Planning() {
  const [open, setOpen] = useState(false)

  const toggleDialog = () => setOpen(!open)

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
    </LayoutDash>
  )
}
