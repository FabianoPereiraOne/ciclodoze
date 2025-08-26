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
import { Textarea } from "@/components/ui/textarea"
import { useUpdateGoal } from "@/hooks/useUpdateGoal"
import { cn } from "@/lib/utils"
import { availableIcons } from "@/schemas/base/icons"
import {
  GoalUpdateSchema,
  type GoalUpdateSchemaType
} from "@/schemas/validations/goals"
import { Categories, Difficulties } from "@/schemas/validations/settings"
import type { GoalType } from "@/types/goals"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"

import { useForm } from "react-hook-form"
import { LuPlus } from "react-icons/lu"
import { toast } from "sonner"

export const DialogUpdate = ({
  toggleDialog,
  data
}: {
  data: GoalType | null
  toggleDialog: () => void
}) => {
  const { mutateAsync, isPending } = useUpdateGoal()
  const form = useForm<GoalUpdateSchemaType>({
    resolver: zodResolver(GoalUpdateSchema),
    defaultValues: data ?? {
      category: "",
      difficulty: "NORMAL",
      icon: "",
      name: "",
      why: ""
    }
  })

  const onSubmit = async ({
    category,
    difficulty,
    icon,
    name,
    why,
    id,
    progress,
    status
  }: GoalUpdateSchemaType) => {
    try {
      const response = await mutateAsync({
        category,
        difficulty,
        icon,
        name,
        why,
        id,
        progress,
        status
      })
      const message = response?.message
      form.reset({
        category: "",
        difficulty: "NORMAL",
        icon: "",
        name: "",
        why: ""
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
    <DialogContent className='bg-primary-foreground max-w-2xl max-h-[80vh] overflow-y-auto'>
      <DialogHeader>
        <DialogTitle>Atualizar Meta</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 mt-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta *</FormLabel>
                <FormControl>
                  <Input type='text' placeholder='Digite sua meta' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='why'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Por que essa meta é importante?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Digite a justificativa'
                    {...field}
                    className='resize-none'
                  />
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
                <FormLabel>Ícone</FormLabel>
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
            name='difficulty'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dificuldade</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Nível de dificuldade' />
                    </SelectTrigger>
                    <SelectContent>
                      {Difficulties.map((difficulty, index) => {
                        const value = difficulty?.value
                        const label = difficulty?.label
                        const id = difficulty?.id ?? index.toString()

                        return (
                          <SelectItem key={id} value={value}>
                            {label}
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
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Selecione uma categoria' />
                    </SelectTrigger>
                    <SelectContent>
                      {Categories.map((category, index) => {
                        const value = category?.value
                        const label = category?.label
                        const id = category?.id ?? index.toString()

                        return (
                          <SelectItem key={id} value={value}>
                            {label}
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

          <div className='flex justify-end'>
            <Button
              type='submit'
              className='bg-blue-900 text-white hover:bg-blue-800 cursor-pointer flex items-center justify-center gap-1 '
            >
              {isPending ? (
                <>
                  <Loader2 className={cn("animate-spin", "w-4 h-4")} />
                  Atualizando meta
                </>
              ) : (
                <>
                  <LuPlus />
                  Atualizar meta
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}
