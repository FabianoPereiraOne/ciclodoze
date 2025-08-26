import { envSchema } from "@/env"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateCycle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const result = await fetch(`${envSchema.API_URL}/cycles`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({})
      })

      if (!result.ok) {
        const errorData = await result.json()
        throw new Error(errorData?.message)
      }

      const response: { message: string } = await result.json()

      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] })
    }
  })
}
