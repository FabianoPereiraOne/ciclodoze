import { envSchema } from "@/env"
import type { GoalUpdateSchemaType } from "@/schemas/validations/goals"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateGoal = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      category,
      difficulty,
      icon,
      name,
      progress,
      status,
      why
    }: GoalUpdateSchemaType) => {
      const result = await fetch(`${envSchema.API_URL}/goals/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          category,
          difficulty,
          icon,
          name,
          progress,
          status,
          why
        })
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
