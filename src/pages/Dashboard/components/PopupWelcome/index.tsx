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
import { useCreateUserArea } from "@/hooks/useCreateUserArea"
import { availableIcons } from "@/schemas/base/icons"
import { Role } from "@/schemas/validations/settings"
import { Info, Save } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export const PopupWelcome = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => {
  const form = useForm<Record<string, boolean>>()
  const { user, areas } = useAuth()
  const { mutateAsync } = useCreateUserArea()
  const isAdmin = user?.type === Role.ADMIN

  const onSubmit = async (data: Record<string, boolean | undefined>) => {
    const listAreas = Object.keys(data ?? {}).filter(key => data[key])
    const areasFormatted = listAreas?.map(area => parseInt(area))

    try {
      const response = await mutateAsync({ areas: areasFormatted })
      const message = response?.message
      toast.success(message)
      onClose()
    } catch (error: any) {
      toast.error(error?.message)
    }
  }

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4'>
                {areas?.all?.map((area, index) => {
                  const id = area?.id ?? index?.toString()
                  const access = area?.access
                  const isActive = area?.isActive
                  const name = area?.title ?? ""
                  const iconString = area?.icon ?? ""
                  const IconComponent =
                    availableIcons.find(icon => icon?.value === iconString)
                      ?.icon ?? Info

                  return (
                    <FormField
                      key={id}
                      control={form.control}
                      name={`${id}`}
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                          <div className='space-y-0.5'>
                            <FormLabel
                              className={!isActive ? "text-zinc-500" : ""}
                            >
                              <IconComponent /> {name}
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
                  )
                })}
              </div>
              <div className='w-full flex items-center justify-end mt-[36px]'>
                <ButtonAction type='submit'>
                  <Save />
                  Salvar
                </ButtonAction>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
