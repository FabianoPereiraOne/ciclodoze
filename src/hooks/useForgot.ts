import { envSchema } from "@/env"
import type { GeneralTypeResponse } from "@/types/general"
import { useMutation } from "@tanstack/react-query"

export const useForgot = () => {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const result = await fetch(`${envSchema.API_URL}/forgot`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ email })
      })

      if (!result.ok) {
        const errorData = await result.json()
        throw new Error(errorData?.message)
      }

      const response: GeneralTypeResponse = await result.json()

      return response
    }
  })
}
