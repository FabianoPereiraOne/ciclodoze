import z from "zod"

export const RegisterSchema = z
  .object({
    name: z.string().min(3, { error: "O nome informado é invalido" }),
    email: z.email({ error: "Email não é válido." }),
    purpose: z.string().nonempty({ message: "O propósito é obrigatório." }),
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

export type RegisterSchemaType = z.infer<typeof RegisterSchema>
