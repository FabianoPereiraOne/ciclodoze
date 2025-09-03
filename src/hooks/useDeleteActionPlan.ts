import { envSchema } from "@/env"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteActionPlan = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const result = await fetch(`${envSchema.API_URL}/action-plans/${id}`, {
        method: "DELETE",
        credentials: "include"
      })

      if (!result.ok) {
        const errorData = await result.json()
        throw new Error(errorData?.message)
      }

      const response: { message: string } = await result.json()

      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ActionPlans"] })
    }
  })
}
