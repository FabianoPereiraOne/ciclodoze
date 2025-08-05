import { envSchema } from "@/env"
import type { ActiveAccountResponse } from "@/types/activeAccount"
import { useMutation } from "@tanstack/react-query"

export const useActiveAccount = () => {
  return useMutation({
    mutationFn: async ({ code }: { code: string }) => {
      const result = await fetch(`${envSchema.API_URL}/active-account`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ code })
      })

      if (!result.ok) {
        const errorData = await result.json()
        throw new Error(errorData?.message)
      }

      const response: ActiveAccountResponse = await result.json()
      return response
    }
  })
}
