export type GoalType = {
  id: string
  name: string
  icon?: string
  why?: string
  difficulty: "LOW" | "NORMAL" | "HIGH"
  category: string
  status:
    | "IN_PROGRESS"
    | "PENDING"
    | "COMPLETED"
    | "SKIPPED"
    | "FAILED"
    | "POSTPONED"
  progress: number
  cycleId: string
  createdAt: string
  update: string
}
