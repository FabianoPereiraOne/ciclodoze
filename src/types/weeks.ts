import type { GeneralStatus } from "./general"
import type { TaskType } from "./tasks"

export type WeekType = {
  id: string
  status: GeneralStatus
  weekNumber: number
  startDate: string
  endDate: string
  progress: number
  tasks: TaskType[]
}
