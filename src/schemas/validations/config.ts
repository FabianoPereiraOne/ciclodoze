import z from "zod"
import { FullAccess } from "./settings"

export const createAreaSchema = z.object({
  title: z.string().min(1, { error: "Nome da área é obrigatório." }),
  access: z.enum(FullAccess, { error: "Acesso é obrigatório." }),
  icon: z.string().min(1, { error: "Ícone é obrigatório." }),
  pages: z.array(z.object({ title: z.string(), url: z.string() })).optional(),
  url: z.string().optional()
})

export const updateAreaSchema = z.object({
  id: z.number({ error: "ID da área é obrigatório." }),
  isActive: z.boolean().optional(),
  title: z.string().optional(),
  access: z.enum(FullAccess).optional(),
  icon: z.string().optional(),
  pages: z.array(z.object({ title: z.string(), url: z.string() })).optional(),
  url: z.string().optional()
})

export type CreateAreaSchemaType = z.infer<typeof createAreaSchema>
export type UpdateAreaSchemaType = z.infer<typeof updateAreaSchema>
