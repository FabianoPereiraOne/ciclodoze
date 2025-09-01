import { Button } from "@/components/ui/button"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "@/components/ui/context-menu"
import { Input } from "@/components/ui/input"
import { useCheckTask } from "@/hooks/useCheckTask"
import { useDeleteTask } from "@/hooks/useDeleteTask"
import { useUpdateTask } from "@/hooks/useUpdateTask"
import type { UpdateTaskSchemaType } from "@/schemas/validations/tasks"
import type { GeneralStatus } from "@/types/general"
import type { TaskType } from "@/types/tasks"
import { Check, Clock, Edit, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { UpdateModal } from "../UpdateModal"

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
  const [isOpen, setIsOpen] = useState(false)
  const [updatingTitle, setUpdatingTitle] = useState(false)
  const [task, setTask] = useState<TaskType | null>(null)
  const { mutateAsync, isPending } = useCheckTask()
  const { mutateAsync: deleteTask } = useDeleteTask()
  const { mutateAsync: updateTask, isPending: isUpdating } = useUpdateTask()

  const handlerCheckTask = async (id: string, status: GeneralStatus) => {
    try {
      await mutateAsync({ id, status })
    } catch (error: any) {
      console.error(error)
    }
  }

  const handlerCancelUpdateTask = () => {
    setIsOpen(false)
    setTask(null)
  }

  const handlerEditTask = (task: TaskType) => {
    setIsOpen(true)
    setTask({
      ...task,
      day: task?.day?.toString()
    })
  }

  const handlerSaveTask = async (data: UpdateTaskSchemaType) => {
    try {
      const response = await updateTask(data)
      const message = response?.message
      toast.success(message)
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      handlerCancelUpdateTask()
    }
  }

  const handlerDeleteTask = async (taskId: string) => {
    try {
      const response = await deleteTask({ id: taskId })
      const message = response?.message
      toast.success(message)
    } catch (error: any) {
      toast.error(error?.message)
    }
  }

  const handlerEditTitleTask = (task: TaskType) => {
    setUpdatingTitle(true)
    setTask({
      ...task,
      day: task?.day?.toString()
    })
  }

  const handlerCancelEditTitleTask = () => {
    setUpdatingTitle(false)
    setTask(null)
  }

  const handlerSaveTitleTask = async () => {
    try {
      const response = await updateTask({
        title: task?.title,
        id: task?.id
      })
      const message = response?.message

      toast.success(message)
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      handlerCancelEditTitleTask()
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
              <ContextMenu key={id}>
                <ContextMenuTrigger asChild>
                  <div className='bg-zinc-800 hover:bg-gray-750 p-2 rounded border transition-all cursor-context-menu'>
                    <div className='flex items-center space-x-2'>
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
                      <div className='flex-1 min-w-0 min-h-[1rem] relative'>
                        {updatingTitle ? (
                          <Input
                            defaultValue={task?.title}
                            placeholder='Titulo'
                            onKeyDown={e => {
                              const esc = e?.key === "Escape"
                              const enter = e?.key === "Enter"

                              if (esc) {
                                handlerCancelEditTitleTask()
                                return
                              }

                              if (enter) {
                                e.preventDefault()
                                handlerSaveTitleTask()
                              }
                            }}
                            onChange={event => {
                              const value = event.target.value
                              setTask((prev: any) => ({
                                ...prev,
                                title: value
                              }))
                            }}
                            className={`text-sm leading-[1] h-auto min-h-0 w-full text-white !p-0 m-0 !border-0 !bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0`}
                          />
                        ) : (
                          <p
                            onClick={() => handlerEditTitleTask(task)}
                            className={`text-sm max-w-[80%] ${
                              isCompleted
                                ? "line-through text-zinc-500"
                                : "text-white"
                            }`}
                          >
                            {title}
                          </p>
                        )}
                        {!updatingTitle && (
                          <div className='absolute right-0 top-0 flex items-center space-x-1'>
                            <Clock className='w-3 h-3 text-zinc-500' />
                            <span className='text-xs text-zinc-500'>
                              {time}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ContextMenuTrigger>

                <ContextMenuContent>
                  <ContextMenuItem onClick={() => handlerEditTask(task)}>
                    <Edit className='w-4 h-4 mr-2' /> Editar
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => handlerDeleteTask(id)}>
                    <Trash2 className='w-4 h-4 mr-2' /> Deletar
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            )
          })
        )}
      </div>
      {isOpen && (
        <UpdateModal
          isPending={isUpdating}
          onClose={handlerCancelUpdateTask}
          onSave={handlerSaveTask}
          task={task}
        />
      )}
    </div>
  )
}
