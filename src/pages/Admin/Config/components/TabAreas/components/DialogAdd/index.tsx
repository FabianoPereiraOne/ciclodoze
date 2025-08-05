import { Button } from "@/components/ui/button"
import { DialogContent } from "@/components/ui/dialog"
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
import { useCreateArea } from "@/hooks/useCreateArea"
import { cn } from "@/lib/utils"
import {
  createAreaSchema,
  type CreateAreaSchemaType
} from "@/schemas/validations/config"
import { FullAccess } from "@/schemas/validations/settings"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { LuPlus } from "react-icons/lu"
import { toast } from "sonner"

export const DialogAdd = ({ toggleDialog }: { toggleDialog: () => void }) => {
  const { mutateAsync, isPending } = useCreateArea()
  const form = useForm<CreateAreaSchemaType>({
    resolver: zodResolver(createAreaSchema),
    defaultValues: {
      name: "",
      access: ""
    }
  })

  const onSubmit = async ({ name, access }: CreateAreaSchemaType) => {
    try {
      const response = await mutateAsync({ name, access })
      const message = response?.message
      form.reset({
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

  return (
    <DialogContent className='bg-primary-foreground'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-4'>
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

          <div className='flex justify-end'>
            <Button
              type='submit'
              className='bg-blue-900 text-white hover:bg-blue-800 cursor-pointer flex items-center justify-center gap-1 '
            >
              {isPending ? (
                <>
                  <Loader2 className={cn("animate-spin", "w-10 h-10")} />
                  Criando área
                </>
              ) : (
                <>
                  <LuPlus />
                  Criar área
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}
