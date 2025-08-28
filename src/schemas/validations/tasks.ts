import z from "zod"

export const CreateTaskSchema = z.object({
  title: z.string().nonempty({ error: "Titulo da tarefa é obrigatório" }),
  difficulty: z.enum(["LOW", "NORMAL", "HIGH"]).default("NORMAL").optional(),
  weekId: z.uuid(),
  day: z.string().nonempty({ error: "Dia da semana é obrigatório" }),
  time: z.string().optional()
})

export type CreateTaskSchemaType = z.infer<typeof CreateTaskSchema>
