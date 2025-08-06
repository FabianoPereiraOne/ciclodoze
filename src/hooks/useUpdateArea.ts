import { envSchema } from "@/env"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export type AreaResponseType = {
  message: string
}

type UpdateAreaSchemaType = {
  id: number
  isActive?: boolean
  name?: string
  access?: string
}

export const useUpdateArea = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      name,
      access,
      id,
      isActive
    }: UpdateAreaSchemaType) => {
      const result = await fetch(`${envSchema.API_URL}/areas/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ name, access, isActive })
      })

      if (!result.ok) {
        const errorData = await result.json()
        throw new Error(errorData?.message)
      }

      const response: AreaResponseType = await result.json()

      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["areas"] })
    }
  })
}
