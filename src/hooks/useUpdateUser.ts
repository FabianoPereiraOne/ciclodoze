import { envSchema } from "@/env"
import { useMutation } from "@tanstack/react-query"

export type UserResponseType = {
  message: string
}

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async ({ firstLogin }: { firstLogin: boolean }) => {
      const result = await fetch(`${envSchema.API_URL}/users`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ firstLogin })
      })

      if (!result.ok) {
        const errorData = await result.json()
        throw new Error(errorData?.message)
      }

      const response: UserResponseType = await result.json()

      return response
    }
  })
}
