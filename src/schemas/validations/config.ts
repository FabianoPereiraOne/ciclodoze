import z from "zod"
import { FullAccess } from "./settings"

export const createAreaSchema = z.object({
  name: z.string().min(1, { error: "Nome da área é obrigatório." }),
  access: z.enum(FullAccess, { error: "Acesso é obrigatório." })
})

export const updateAreaSchema = z.object({
  id: z.number({ error: "ID da área é obrigatório." }),
  isActive: z.boolean().optional(),
  name: z.string().optional(),
  access: z.enum(FullAccess).optional()
})

export type CreateAreaSchemaType = z.infer<typeof createAreaSchema>
export type UpdateAreaSchemaType = z.infer<typeof updateAreaSchema>
