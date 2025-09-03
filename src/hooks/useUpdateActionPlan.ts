import { envSchema } from "@/env"
import type { UpdateActionPlanSchemaType } from "@/schemas/validations/plans"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateActionPlan = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      goalId,
      isRecurring,
      name,
      recurrence,
      id
    }: UpdateActionPlanSchemaType) => {
      const result = await fetch(`${envSchema.API_URL}/action-plans/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          goalId,
          isRecurring,
          name,
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
