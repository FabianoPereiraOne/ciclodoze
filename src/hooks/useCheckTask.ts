import { envSchema } from "@/env"
import type { GeneralStatus } from "@/types/general"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCheckTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      status
    }: {
      id: string
      status: GeneralStatus
    }) => {
      const result = await fetch(`${envSchema.API_URL}/check/tasks/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ status })
      })

      if (!result.ok) {
        const errorData = await result.json()
        throw new Error(errorData?.message)
      }

      const response: { message: string } = await result.json()

      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weeks"] })
    }
  })
}
