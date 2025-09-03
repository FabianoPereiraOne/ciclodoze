import { envSchema } from "@/env"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export type AreaResponseType = {
  message: string
}

type UpdateAreaSchemaType = {
  id: number
  isActive?: boolean
  title?: string
  access?: string
  icon?: string
  pages: { title: string; url: string }[]
  url?: string
}

export const useUpdateArea = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      title,
      access,
      id,
      isActive,
      icon,
      pages,
      url
    }: UpdateAreaSchemaType) => {
      const result = await fetch(`${envSchema.API_URL}/areas/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          title,
          access,
          id,
          isActive,
          icon,
          pages,
          url
        })
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
      queryClient.invalidateQueries({ queryKey: ["dashboard"] })
    }
  })
}
