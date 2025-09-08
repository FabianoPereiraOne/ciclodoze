import { ButtonAction } from "@/components/Button"
import { LayoutDash } from "@/components/LayoutDash"
import { useCreateTask } from "@/hooks/useCreateTask"
import { useGetWeeks } from "@/hooks/useGetWeeks"
import { listDays } from "@/schemas/base/weeks"
import type { CreateTaskSchemaType } from "@/schemas/validations/tasks"
import type { WeekType } from "@/types/weeks"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { DayTask } from "./components/DayTask"
import { ProgressPoint } from "./components/ProgressPoint"
import { TaskModal } from "./components/TaskModal"
import { WeeksSlider } from "./components/WeeksSlider"

export default function Tasks() {
  const { data } = useGetWeeks()
  const { mutateAsync, isPending } = useCreateTask()
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<{
    id: string
    label: string
  }>()
  const [selectedTime, setSelectedTime] = useState("")

  const weeks: WeekType[] = data ?? []
  const currentWeek = weeks[currentWeekIndex]
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const currentDayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1
  const tasks = currentWeek?.tasks ?? []

  const getWeekDates = (startDate: string) => {
    const start = new Date(startDate)
    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(start)
      date.setDate(start.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const weekDates = getWeekDates(currentWeek?.startDate)

  const handleAddTask = (day: string) => {
    const daySelected = listDays.find(item => item?.label === day)
    const today = new Date()
    const hour = today.getHours().toString().padStart(2, "0")
    const min = today.getMinutes().toString().padStart(2, "0")

    setSelectedDay(daySelected)
    setSelectedTime(`${hour}:${min}`)
    setIsModalOpen(true)
  }

  const getTasksForDay = (day: string) => {
    return tasks.filter(task => task?.day?.toString() === day)
  }

  const onNextWeek = () => {
    if (currentWeekIndex < weeks?.length - 1) {
      setCurrentWeekIndex(prev => prev + 1)
    }
  }

  const onPrevWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(prev => prev - 1)
    }
  }

  const handlerCreateTask = async ({
    day,
    title,
    weekId,
    difficulty,
    time,
    actionPlanId
  }: CreateTaskSchemaType) => {
    try {
      const response = await mutateAsync({
        day,
        title,
        weekId,
        difficulty,
        time,
        actionPlanId
      })
      const message = response?.message
      toast.success(message)
    } catch (error: any) {
      console.error(error)
      toast.error(error?.message)
    } finally {
      setIsModalOpen(false)
    }
  }

  const handlerCancelTask = () => {
    setIsModalOpen(false)
  }

  const handlerOpenModal = () => {
    setIsModalOpen(true)
    setSelectedDay({ id: "", label: "" })
    setSelectedTime("")
  }

  useEffect(() => {
    if (weeks.length > 0) {
      const index = weeks.findIndex(week => {
        const start = new Date(week?.startDate)
        const end = new Date(week?.endDate)
        start.setHours(0, 0, 0, 0)
        end.setHours(0, 0, 0, 0)

        return today >= start && today <= end
      })

      if (index !== -1) {
        setCurrentWeekIndex(index)
      }
    }
  }, [weeks])

  return (
    <LayoutDash
      component={
        <ProgressPoint currentWeekIndex={currentWeekIndex} weeks={weeks} />
      }
    >
      <section className='w-full px-[20px] py-[24px] flex flex-col gap-[20px]'>
        <div className='flex items-center justify-center sm:justify-between flex-wrap gap-[20px]'>
          <WeeksSlider
            weeks={weeks}
            currentWeek={currentWeek}
            onNextWeek={onNextWeek}
            onPrevWeek={onPrevWeek}
            currentWeekIndex={currentWeekIndex}
          />

          <ButtonAction onClick={handlerOpenModal}>
            <Plus />
            Adicionar Tarefa
          </ButtonAction>
        </div>

        <div className='w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {listDays.map((day, index) => {
            const dayTasks = getTasksForDay(`${index + 1}`)
            const isToday = index === currentDayIndex
            const dayDate = weekDates[index]

            return (
              <DayTask
                key={index?.toString()}
                day={day?.label}
                dayDate={dayDate}
                isToday={isToday}
                dayTasks={dayTasks}
                onAddTask={handleAddTask}
              />
            )
          })}
        </div>

        {isModalOpen && (
          <TaskModal
            isPending={isPending}
            isOpen={isModalOpen}
            onClose={handlerCancelTask}
            onSave={handlerCreateTask}
            initialDay={selectedDay}
            initialTime={selectedTime}
            weekNumber={currentWeek?.weekNumber}
            weekId={currentWeek?.id}
          />
        )}
      </section>
    </LayoutDash>
  )
}
