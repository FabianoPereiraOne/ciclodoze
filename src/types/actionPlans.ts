import type { GoalType } from "./goals"

export type ActionPlansType = {
  goal: GoalType
  name: string
  isRecurring: boolean
  recurrence: "NONE" | "WEEKLY" | "MONTHLY" | "QUARTERLY"
  id: string
}
