import type { DifficultyStatus, GeneralStatus } from "./general"

export type GoalType = {
  id: string
  name: string
  icon?: string
  why?: string
  difficulty: DifficultyStatus
  category: string
  status: GeneralStatus
  progress: number
  cycleId: string
  createdAt: string
  update: string
}
