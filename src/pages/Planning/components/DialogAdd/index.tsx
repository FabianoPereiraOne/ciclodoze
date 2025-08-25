import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
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
import { availableIcons } from "@/schemas/base/icons"
import {
  createAreaSchema,
  type CreateAreaSchemaType
} from "@/schemas/validations/config"
import { FullAccess } from "@/schemas/validations/settings"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Plus, Trash2 } from "lucide-react"

import { useFieldArray, useForm } from "react-hook-form"
import { LuPlus } from "react-icons/lu"
import { toast } from "sonner"

export const DialogAdd = ({ toggleDialog }: { toggleDialog: () => void }) => {
  const { mutateAsync, isPending } = useCreateArea()
  const form = useForm<CreateAreaSchemaType>({
    resolver: zodResolver(createAreaSchema),
    defaultValues: {
      title: "",
      access: "",
      icon: "",
      url: "",
      pages: []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "pages"
  })

  const addPage = () => {
    append({ title: "", url: "" })
  }

  const onSubmit = async ({
    access,
    icon,
    title,
    pages,
    url
  }: CreateAreaSchemaType) => {
    try {
      const response = await mutateAsync({ access, icon, title, pages, url })
      const message = response?.message
      form.reset({
        title: "",
        access: "",
        icon: "",
        url: "",
        pages: []
      })
      toast.success(message)
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      toggleDialog()
    }
  }

  return (
    <DialogContent className='bg-primary-foreground max-w-2xl max-h-[80vh] overflow-y-auto'>
      <DialogHeader>
        <DialogTitle>Criar Área</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 mt-4'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titulo da Área *</FormLabel>
                <FormControl>
                  <Input type='text' placeholder='Estudos' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='icon'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ícone da Área *</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Selecione um ícone' />
                    </SelectTrigger>
                    <SelectContent>
                      {availableIcons.map(iconItem => {
                        const IconComponent = iconItem?.icon
                        return (
                          <SelectItem
                            key={iconItem?.value}
                            value={iconItem?.value}
                          >
                            <div className='flex items-center gap-2'>
                              <IconComponent className='w-4 h-4' />
                              {iconItem?.label}
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL da Área (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder='https://exemplo.com/area' {...field} />
                </FormControl>
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <FormLabel>Páginas da Área</FormLabel>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={addPage}
                className='flex items-center gap-1 bg-transparent'
              >
                <Plus className='w-4 h-4' />
                Adicionar Página
              </Button>
            </div>

            {fields.length === 0 && (
              <p className='text-sm text-muted-foreground'>
                Nenhuma página adicionada.
              </p>
            )}

            {fields.map((field, index) => (
              <div key={field.id} className='flex gap-2 items-end'>
                <div className='flex-1 space-y-2'>
                  <FormField
                    control={form.control}
                    name={`pages.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm'>
                          Título da Página
                        </FormLabel>
                        <FormControl>
                          <Input placeholder='Ex: Dashboard' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='flex-1 space-y-2'>
                  <FormField
                    control={form.control}
                    name={`pages.${index}.url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm'>URL da Página</FormLabel>
                        <FormControl>
                          <Input placeholder='Ex: /dashboard' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() => remove(index)}
                  className='text-red-600 hover:text-red-700'
                >
                  <Trash2 className='w-4 h-4' />
                </Button>
              </div>
            ))}
          </div>

          <div className='flex justify-end'>
            <Button
              type='submit'
              className='bg-blue-900 text-white hover:bg-blue-800 cursor-pointer flex items-center justify-center gap-1 '
            >
              {isPending ? (
                <>
                  <Loader2 className={cn("animate-spin", "w-4 h-4")} />
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
