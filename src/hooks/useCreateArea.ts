import { envSchema } from "@/env"
import type { CreateAreaSchemaType } from "@/schemas/validations/config"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export type AreaResponseType = {
  message: string
}

export const useCreateArea = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      access,
      icon,
      title,
      pages,
      url
    }: CreateAreaSchemaType) => {
      const result = await fetch(`${envSchema.API_URL}/areas`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ access, icon, title, pages, url })
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
