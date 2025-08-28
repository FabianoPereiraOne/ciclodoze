import { Button } from "@/components/ui/button"
import { useCheckTask } from "@/hooks/useCheckTask"
import type { GeneralStatus } from "@/types/general"
import type { TaskType } from "@/types/tasks"
import { Check, Clock, Plus } from "lucide-react"

export const DayTask = ({
  isToday,
  day,
  dayDate,
  dayTasks,
  onAddTask
}: {
  isToday: boolean
  day: string
  dayDate: Date
  dayTasks: TaskType[]
  onAddTask: (day: string, time?: string) => void
}) => {
  const { mutateAsync, isPending } = useCheckTask()

  const handlerCheckTask = async (id: string, status: GeneralStatus) => {
    try {
      await mutateAsync({ id, status })
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <div
      className={`bg-zinc-900 w-full rounded-lg p-4 border transition-all duration-200 ${
        isToday
          ? "border-blue-500 bg-blue-950/20"
          : "border-zinc-800 hover:border-zinc-700"
      }`}
    >
      <div className='flex items-center justify-between mb-3'>
        <div>
          <h3
            className={`font-medium ${
              isToday ? "text-blue-400" : "text-white"
            }`}
          >
            {day}
          </h3>
          <p className='text-xs text-gray-400'>
            {dayDate.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit"
            })}
          </p>
        </div>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => onAddTask(day)}
          className='text-gray-400 hover:text-white hover:bg-zinc-800 p-1'
        >
          <Plus className='w-4 h-4' />
        </Button>
      </div>

      <div className='space-y-2'>
        {dayTasks.length === 0 ? (
          <p className='text-zinc-500 text-sm italic'>Nenhuma tarefa</p>
        ) : (
          dayTasks.map((task, index) => {
            const id = task?.id ?? index?.toString()
            const status = task?.status
            const time = task?.time
            const title = task?.title
            const isCompleted = status === "COMPLETED"

            return (
              <div
                key={id}
                className='bg-zinc-800 hover:bg-gray-750 p-2 rounded border transition-all'
              >
                <div className='flex items-start space-x-2'>
                  <button
                    disabled={isPending}
                    onClick={() => handlerCheckTask(id, status)}
                    className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center ${
                      isCompleted
                        ? "bg-green-600 border-green-600"
                        : "border-zinc-600 hover:border-zinc-500"
                    }`}
                  >
                    {isCompleted && <Check />}
                  </button>
                  <div className='flex-1 min-w-0 relative'>
                    <p
                      className={`text-sm max-w-[80%] ${
                        isCompleted
                          ? "line-through text-zinc-500"
                          : "text-white"
                      }`}
                    >
                      {title}
                    </p>
                    <div className='absolute right-0 top-0 flex items-center space-x-1 mt-1'>
                      <Clock className='w-3 h-3 text-zinc-500' />
                      <span className='text-xs text-zinc-500'>{time}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
