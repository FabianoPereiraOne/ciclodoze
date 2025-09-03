import { envSchema } from "@/env"
import type { CreateActionPlanSchemaType } from "@/schemas/validations/plans"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateActionPlan = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      goalId,
      name,
      isRecurring,
      recurrence
    }: CreateActionPlanSchemaType) => {
      const result = await fetch(`${envSchema.API_URL}/action-plans`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          goalId,
          name,
          isRecurring,
          recurrence
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
      queryClient.invalidateQueries({ queryKey: ["ActionPlans"] })
    }
  })
}
