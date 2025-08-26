import z from "zod"

export const GoalSchema = z.object({
  name: z.string().min(1, { error: "A meta é obrigatória." }),
  icon: z.string().default("target").optional(),
  why: z.string().optional(),
  difficulty: z.enum(["LOW", "NORMAL", "HIGH"]),
  category: z.string().min(1, { error: "A categoria é obrigatória." })
})

export const GoalUpdateSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  icon: z.string().optional(),
  why: z.string().optional(),
  difficulty: z.enum(["LOW", "NORMAL", "HIGH"]).optional(),
  category: z.string().optional(),
  status: z
    .enum([
      "IN_PROGRESS",
      "PENDING",
      "COMPLETED",
      "SKIPPED",
      "FAILED",
      "POSTPONED"
    ])
    .optional(),
  progress: z.number().optional()
})

export type GoalSchemaType = z.infer<typeof GoalSchema>
export type GoalUpdateSchemaType = z.infer<typeof GoalUpdateSchema>
