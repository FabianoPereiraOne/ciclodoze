import { ButtonAction } from "@/components/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/context/AuthContext"
import { Role } from "@/schemas/validations/settings"
import type { AreaType } from "@/types/areas"
import { Save } from "lucide-react"
import { useForm } from "react-hook-form"

export const PopupWelcome = ({
  open,
  onClose,
  areas
}: {
  open: boolean
  areas: AreaType[]
  onClose: () => void
}) => {
  const form = useForm()
  const { user } = useAuth()
  const isAdmin = user?.type === Role.ADMIN

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='w-full bg-zinc-800 max-w-[90%] max-h-[90vh] overflow-y-auto lg:max-w-[900px] p-[16px] md:p-[36px]'>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl md:text-3xl'>
            🎉 Bem-vindo ao Ciclodoze
          </DialogTitle>
          <DialogDescription className='text-center text-md max-w-none md:max-w-[700px] mx-auto'>
            Alcance mais em menos tempo! Com o Ciclodoze, você foca no que
            realmente importa, define metas claras e vê resultados rápidos.
            Comece agora e transforme seu planejamento!
          </DialogDescription>
        </DialogHeader>
        <div className='gap-6 flex flex-col mt-8'>
          <p className='text-center text-md md:text-lg  font-medium'>
            Escolha suas áreas de interesse:
          </p>
          <div className='grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4'>
            {areas?.map((area, index) => {
              const id = area?.id ?? index?.toString()
              const access = area?.access
              const isActive = area?.isActive
              const name = area?.name ?? ""

              return (
                <Form {...form} key={id}>
                  <form onSubmit={form.handleSubmit(() => {})}>
                    <FormField
                      control={form.control}
                      name={`${id}`}
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                          <div className='space-y-0.5'>
                            <FormLabel
                              className={!isActive ? "text-zinc-500" : ""}
                            >
                              {name}
                            </FormLabel>
                            {isAdmin && (
                              <FormDescription>{access}</FormDescription>
                            )}
                          </div>
                          <FormControl>
                            <Switch
                              className='data-[state=checked]:bg-blue-500'
                              disabled={!isActive}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              )
            })}
          </div>
          <div className='w-full flex items-center justify-end mt-2'>
            <ButtonAction>
              <Save />
              Salvar
            </ButtonAction>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
