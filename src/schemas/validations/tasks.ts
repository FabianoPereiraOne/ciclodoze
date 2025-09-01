import z from "zod"

export const CreateTaskSchema = z.object({
  title: z.string().nonempty({ error: "Titulo da tarefa é obrigatório" }),
  difficulty: z.enum(["LOW", "NORMAL", "HIGH"]).default("NORMAL").optional(),
  weekId: z.uuid(),
  day: z.string().nonempty({ error: "Dia da semana é obrigatório" }),
  time: z.string().optional()
})

export const UpdateTaskSchema = z.object({
  id: z.uuid().optional(),
  title: z.string().optional(),
  difficulty: z.enum(["LOW", "NORMAL", "HIGH"]).default("NORMAL").optional(),
  weekId: z.uuid().optional(),
  day: z.string().optional(),
  time: z.string().optional(),
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
  actionPlanId: z.string().optional()
})

export type CreateTaskSchemaType = z.infer<typeof CreateTaskSchema>
export type UpdateTaskSchemaType = z.infer<typeof UpdateTaskSchema>
