import { envSchema } from "@/env"
import { useMutation } from "@tanstack/react-query"

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: async () => {
      const result = await fetch(`${envSchema.API_URL}/logout`, {
        method: "GET",
        credentials: "include"
      })

      if (!result.ok) {
        const errorData = await result.json()
        throw new Error(errorData?.message)
      }

      const response = await result.json()
      return response
    }
  })
}
