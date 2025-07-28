import type { RegisterSchemaType } from "@/schemas/validations/register"
import type { RegisterTypeResponse } from "@/types/register"
import { useMutation } from "@tanstack/react-query"

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (data: RegisterSchemaType) => {
      try {
        const result = await fetch("http://localhost:3333/users", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(data)
        })

        if (result?.status !== 201) return

        const response: RegisterTypeResponse = await result.json()
        return response
      } catch (error) {
        console.error(error)
      }
    }
  })
}
