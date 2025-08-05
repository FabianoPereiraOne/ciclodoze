import { envSchema } from "@/env"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type DeleteAreaResponseType = {
  message: string
}

export const useDeleteArea = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const result = await fetch(`${envSchema.API_URL}/areas/${id}`, {
        method: "DELETE",
        credentials: "include"
      })

      if (!result.ok) {
        const errorData = await result.json()
        throw new Error(errorData?.message)
      }

      const response: DeleteAreaResponseType = await result.json()

      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["areas"] })
    }
  })
}
