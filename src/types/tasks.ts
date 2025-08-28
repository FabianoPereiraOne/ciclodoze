import type { CreateTaskSchemaType } from "@/schemas/validations/tasks"
import type { DifficultyStatus, GeneralStatus } from "./general"

export type TaskType = {
  id: string
  title: string
  difficulty: DifficultyStatus | null
  weekId: string
  day: string
  time: string | null
  status: GeneralStatus
  actionPlanId: string | null
}

export type TaskModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (data: CreateTaskSchemaType) => void
  initialDay: { id: string; label: string } | undefined
  initialTime: string
  weekNumber: number
  weekId: string
  isPending: boolean
}
