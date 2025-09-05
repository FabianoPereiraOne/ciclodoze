import { ButtonAction } from "@/components/Button"
import { Button } from "@/components/ui/button"
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
import { useGetActionPlans } from "@/hooks/useGetActionPlans"
import { listDays, listDifficulties } from "@/schemas/base/weeks"
import {
  CreateTaskSchema,
  type CreateTaskSchemaType
} from "@/schemas/validations/tasks"
import type { TaskModalProps } from "@/types/tasks"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save, X } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export function TaskModal({
  isOpen,
  onClose,
  onSave,
  initialDay,
  initialTime,
  weekId,
  isPending
}: TaskModalProps) {
  const day = initialDay?.id ?? ""
  const time = initialTime ?? ""
  const { data } = useGetActionPlans()
  const listActions = (data ?? []).map(action => {
    return {
      id: action?.id,
      value: action?.id,
      label: action?.name
    }
  })

  const hasListActions = listActions && listActions.length > 0

  const form = useForm<CreateTaskSchemaType>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      day,
      difficulty: "NORMAL",
      time,
      title: "",
      weekId
    }
  })

  const handlerCancelTask = () => {
    form.reset({
      day: "",
      difficulty: "NORMAL",
      time: "",
      title: "",
      weekId
    })
    onClose()
  }

  useEffect(() => {
    form.setValue("day", day)
    form.setValue("time", time)
  }, [isOpen, initialDay, initialTime])

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-zinc-900 rounded-lg border border-zinc-800 w-full max-w-md'>
        <div className='flex items-center justify-between p-6 border-b border-zinc-800'>
          <h2 className='text-lg font-semibold text-white'>Nova Tarefa</h2>
          <Button
            variant='ghost'
            size='sm'
            onClick={handlerCancelTask}
            className='text-zinc-400 hover:text-white'
          >
            <X className='w-4 h-4' />
          </Button>
        </div>
        <div className='p-6'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSave)}
              className='flex flex-col gap-[20px]'
            >
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulo *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Titulo'
                        {...field}
                        onKeyDown={e => {
                          if (e.key === "Enter") {
                            e.preventDefault()

                            form.trigger().then(isValid => {
                              if (isValid) {
                                form.handleSubmit(onSave)()
                              }
                            })
                          }
                        }}
                      />
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
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Selecione uma dificuldade' />
                        </SelectTrigger>
                        <SelectContent>
                          {listDifficulties.map((difficulty, index) => {
                            const id = difficulty?.id ?? index?.toString()
                            const label = difficulty?.label ?? ""
                            const value = difficulty?.value ?? ""

                            return (
                              <SelectItem key={id} value={value}>
                                <div className='flex items-center gap-2'>
                                  {label}
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

              {hasListActions && (
                <FormField
                  control={form.control}
                  name='actionPlanId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plano de ação</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Selecione um plano' />
                          </SelectTrigger>
                          <SelectContent>
                            {listActions.map((action, index) => {
                              const id = action?.id ?? index?.toString()
                              const label = action?.label ?? ""
                              const value = action?.value ?? ""

                              return (
                                <SelectItem key={id} value={value}>
                                  <div className='flex items-center gap-2'>
                                    {label}
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
              )}

              <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-[20px]'>
                <FormField
                  control={form.control}
                  name='day'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dia da semana</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Selecione um dia' />
                          </SelectTrigger>
                          <SelectContent>
                            {listDays.map(day => {
                              const id = day?.id
                              const label = day?.label

                              return (
                                <SelectItem key={id} value={id}>
                                  <div className='flex items-center gap-2'>
                                    {label}
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
                  name='time'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário</FormLabel>
                      <FormControl>
                        <Input
                          className=' text-foreground
    [color-scheme:light] 
    [&::-webkit-calendar-picker-indicator]:invert
    [&::-webkit-calendar-picker-indicator]:opacity-70
    [&::-webkit-calendar-picker-indicator]:cursor-pointer'
                          step='60'
                          placeholder='00:00'
                          type='time'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex justify-end space-x-3 py-4 border-t border-zinc-800'>
                <Button
                  variant='outline'
                  onClick={handlerCancelTask}
                  className='border-zinc-700 text-gray-300 hover:bg-zinc-800 bg-transparent'
                >
                  Cancelar
                </Button>
                <ButtonAction disabled={isPending} type='submit'>
                  <Save />
                  Salvar Tarefa
                </ButtonAction>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
