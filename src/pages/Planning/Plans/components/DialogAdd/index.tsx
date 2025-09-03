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
import { Switch } from "@/components/ui/switch"
import { useCreateActionPlan } from "@/hooks/useCreateActionPlan"
import { useGetGoals } from "@/hooks/useGetGoals"
import { cn } from "@/lib/utils"
import { listRecurrence } from "@/schemas/base/plans"
import {
  CreateActionPlanSchema,
  type CreateActionPlanSchemaType
} from "@/schemas/validations/plans"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"

import { useForm } from "react-hook-form"
import { LuPlus } from "react-icons/lu"
import { toast } from "sonner"

export const DialogAdd = ({ toggleDialog }: { toggleDialog: () => void }) => {
  const { mutateAsync, isPending } = useCreateActionPlan()
  const { data } = useGetGoals()
  const form = useForm<CreateActionPlanSchemaType>({
    resolver: zodResolver(CreateActionPlanSchema),
    defaultValues: {
      goalId: "",
      name: ""
    }
  })

  const onSubmit = async ({
    goalId,
    name,
    isRecurring,
    recurrence
  }: CreateActionPlanSchemaType) => {
    try {
      const response = await mutateAsync({
        goalId,
        name,
        isRecurring,
        recurrence
      })
      const message = response?.message
      toast.success(message)
      form.reset({
        goalId: "",
        name: "",
        isRecurring: false,
        recurrence: "NONE"
      })
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      toggleDialog()
    }
  }

  const listGoals = (data ?? []).map(goal => {
    return {
      ...goal,
      value: goal?.id,
      label: goal?.name
    }
  })

  const isRecurring = form.watch("isRecurring")

  return (
    <DialogContent className='bg-primary-foreground max-w-2xl max-h-[80vh] overflow-y-auto'>
      <DialogHeader>
        <DialogTitle>Criar Plano de ação</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 mt-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plano *</FormLabel>
                <FormControl>
                  <Input type='text' placeholder='Digite o nome' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='goalId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta *</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Selecione a meta' />
                    </SelectTrigger>
                    <SelectContent>
                      {listGoals.map(goal => {
                        return (
                          <SelectItem key={goal?.id} value={goal?.value}>
                            <div className='flex items-center gap-2'>
                              {goal?.label}
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
            name='isRecurring'
            render={({ field }) => (
              <FormItem className='flex items-center gap-2'>
                <FormLabel>Plano recorrente?</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isRecurring && (
            <FormField
              control={form.control}
              name='recurrence'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Selecione a recorrência' />
                      </SelectTrigger>
                      <SelectContent>
                        {listRecurrence.map(goal => {
                          return (
                            <SelectItem key={goal?.id} value={goal?.value}>
                              <div className='flex items-center gap-2'>
                                {goal?.label}
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

          <div className='flex justify-end'>
            <Button
              type='submit'
              className='bg-blue-900 text-white hover:bg-blue-800 cursor-pointer flex items-center justify-center gap-1 '
            >
              {isPending ? (
                <>
                  <Loader2 className={cn("animate-spin", "w-4 h-4")} />
                  Criando plano
                </>
              ) : (
                <>
                  <LuPlus />
                  Criar plano
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}
