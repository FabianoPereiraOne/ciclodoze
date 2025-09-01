import { envSchema } from "@/env"
import type { UpdateTaskSchemaType } from "@/schemas/validations/tasks"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      actionPlanId,
      day,
      difficulty,
      id,
      status,
      time,
      title,
      weekId
    }: UpdateTaskSchemaType) => {
      const result = await fetch(`${envSchema.API_URL}/tasks/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          actionPlanId,
          day,
          difficulty,
          id,
          status,
          time,
          title,
          weekId
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
      queryClient.invalidateQueries({ queryKey: ["weeks"] })
    }
  })
}
