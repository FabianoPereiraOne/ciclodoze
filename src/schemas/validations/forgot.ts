import z from "zod"

export const ForgotSchema = z.object({
  email: z.email({ error: "Email não é válido." })
})

export const ForgotPassSchema = z
  .object({
    password: z
      .string()
      .min(8, { error: "A senha deve ter no mínimo 8 caracteres." }),
    confirmPassword: z
      .string()
      .min(8, { error: "A senha deve ter no mínimo 8 caracteres." })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"]
  })

export type ForgotPassSchemaType = z.infer<typeof ForgotPassSchema>
export type ForgotSchemaType = z.infer<typeof ForgotSchema>
