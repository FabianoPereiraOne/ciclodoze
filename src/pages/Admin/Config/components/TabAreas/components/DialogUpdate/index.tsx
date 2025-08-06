import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useUpdateArea } from "@/hooks/useUpdateArea"
import { cn } from "@/lib/utils"
import {
  updateAreaSchema,
  type UpdateAreaSchemaType
} from "@/schemas/validations/config"
import { FullAccess } from "@/schemas/validations/settings"
import type { dataType } from "@/types/areas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, LucideEdit2 } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export const DialogUpdate = ({
  update,
  data,
  setUpdate,
  toggleDialog
}: {
  update: boolean
  data: null | dataType
  toggleDialog: () => void
  setUpdate: (value: boolean) => void
}) => {
  const { mutateAsync, isPending } = useUpdateArea()
  const form = useForm<UpdateAreaSchemaType>({
    resolver: zodResolver(updateAreaSchema),
    defaultValues: data ?? {
      id: 0,
      isActive: true,
      name: "",
      access: ""
    }
  })

  const onSubmit = async ({
    name,
    access,
    id,
    isActive
  }: UpdateAreaSchemaType) => {
    try {
      const response = await mutateAsync({ name, access, id, isActive })
      const message = response?.message
      form.reset({
        id: 0,
        isActive: true,
        name: "",
        access: ""
      })
      toast.success(message)
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      toggleDialog()
    }
  }

  useEffect(() => {
    if (data) {
      form.reset(data)
    }
  }, [data])

  return (
    <Dialog open={update} onOpenChange={setUpdate}>
      <DialogContent className='bg-primary-foreground'>
        <DialogHeader>
          <DialogTitle>Atualizar Área</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 mt-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Área</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='Estudos' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='access'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nível de acesso</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Selecione um acesso' />
                      </SelectTrigger>
                      <SelectContent>
                        {FullAccess.map((access, index) => {
                          return (
                            <SelectItem key={index.toString()} value={access}>
                              {access}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='isActive'
              render={({ field }) => (
                <FormItem className='flex gap-2 items-center'>
                  <FormControl>
                    <Switch
                      id='isActive'
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel htmlFor='isActive'>Status</FormLabel>
                </FormItem>
              )}
            />

            <div className='flex justify-end'>
              <Button
                type='submit'
                className='bg-blue-900 text-white hover:bg-blue-800 cursor-pointer flex items-center justify-center gap-1 '
              >
                {isPending ? (
                  <>
                    <Loader2 className={cn("animate-spin", "w-10 h-10")} />
                    Atualizando área
                  </>
                ) : (
                  <>
                    <LucideEdit2 />
                    Atualizar área
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
