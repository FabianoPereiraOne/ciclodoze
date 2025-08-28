import { envSchema } from "@/env"
import type { CreateTaskSchemaType } from "@/schemas/validations/tasks"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      day,
      title,
      weekId,
      difficulty,
      time
    }: CreateTaskSchemaType) => {
      const result = await fetch(`${envSchema.API_URL}/tasks`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ day, title, weekId, difficulty, time })
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
