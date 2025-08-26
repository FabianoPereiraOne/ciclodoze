import { envSchema } from "@/env"
import type { GoalSchemaType } from "@/schemas/validations/goals"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateGoal = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      category,
      difficulty,
      name,
      icon,
      why
    }: GoalSchemaType) => {
      const result = await fetch(`${envSchema.API_URL}/goals`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ category, difficulty, name, icon, why })
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
