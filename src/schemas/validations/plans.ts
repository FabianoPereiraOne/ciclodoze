import z from "zod"

export const CreateActionPlanSchema = z.object({
  goalId: z.uuid().nonempty({ error: "ID da meta é obrigatório." }),
  name: z.string().nonempty({ error: "Nome do plano de ação é obrigatório." }),
  isRecurring: z.boolean().optional(),
  recurrence: z.enum(["NONE", "WEEKLY", "MONTHLY", "QUARTERLY"]).optional()
})

export const UpdateActionPlanSchema = z.object({
  id: z.uuid().nonempty({ error: "ID do plano de ação é obrigatório." }),
  goalId: z.uuid().optional(),
  name: z.string().optional(),
  isRecurring: z.boolean().optional(),
  recurrence: z.enum(["NONE", "WEEKLY", "MONTHLY", "QUARTERLY"]).optional()
})

export type CreateActionPlanSchemaType = z.infer<typeof CreateActionPlanSchema>
export type UpdateActionPlanSchemaType = z.infer<typeof UpdateActionPlanSchema>
