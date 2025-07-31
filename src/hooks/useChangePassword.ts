import type { GeneralTypeResponse } from "@/types/general"
import { useMutation } from "@tanstack/react-query"

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async ({ password }: { password: string }) => {
      const result = await fetch("http://localhost:3333/change-password", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ password })
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
