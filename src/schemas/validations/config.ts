import z from "zod"
import { FullAccess } from "./settings"

export const createAreaSchema = z.object({
  name: z.string().min(1, { error: "Nome da área é obrigatório." }),
  access: z.enum(FullAccess, { error: "Acesso é obrigatório." })
})

export type CreateAreaSchemaType = z.infer<typeof createAreaSchema>
