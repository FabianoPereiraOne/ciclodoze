import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { TabsContent } from "@/components/ui/tabs"
import { useState } from "react"
import { LuPlus } from "react-icons/lu"
import { DialogAdd } from "./components/DialogAdd"
import { ListingAreas } from "./components/ListingAreas"

export const TabAreas = () => {
  const [open, setOpen] = useState(false)
  const toggleDialog = () => setOpen(false)

  return (
    <TabsContent value='areas' className='space-y-6'>
      <div className='space-y-4'>
        <div className='w-full flex items-center justify-between'>
          <div>
            <h2 className='text-xl font-semibold mb-2'>Gerenciar Áreas</h2>
            <p className='text-muted-foreground'>
              Configure todas áreas do sistema.
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={toggleDialog}
                className='bg-blue-900 text-white hover:bg-blue-800 cursor-pointer flex items-center justify-center gap-1'
              >
                <LuPlus /> Adicionar
              </Button>
            </DialogTrigger>
            <DialogAdd toggleDialog={toggleDialog} />
          </Dialog>
        </div>
        <ListingAreas />
      </div>
    </TabsContent>
  )
}
