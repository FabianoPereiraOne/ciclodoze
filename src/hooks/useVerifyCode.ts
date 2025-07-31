import type { GeneralTypeResponse } from "@/types/general"
import { useMutation } from "@tanstack/react-query"

export const useVerifyCode = () => {
  return useMutation({
    mutationFn: async ({ code }: { code: string }) => {
      const result = await fetch("http://localhost:3333/code", {
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

      const response: GeneralTypeResponse = await result.json()
      return response
    }
  })
}
