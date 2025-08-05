import { envSchema } from "@/env"
import type { RegisterSchemaType } from "@/schemas/validations/register"
import type { RegisterTypeResponse } from "@/types/register"
import { useMutation } from "@tanstack/react-query"

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (data: RegisterSchemaType) => {
      const result = await fetch(`${envSchema.API_URL}/users`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })

      if (!result.ok) {
        const errorData = await result.json()
        throw new Error(errorData?.message)
      }

      const response: RegisterTypeResponse = await result.json()

      return response
    }
  })
}
