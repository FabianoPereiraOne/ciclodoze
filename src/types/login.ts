import z from "zod"

export const LoginSchema = z.object({
  email: z.email({ error: "Email não é válido." }),
  password: z
    .string()
    .nonempty({ error: "A senha deve ter no mínimo 8 caracteres." })
})
