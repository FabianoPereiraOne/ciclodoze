import { envSchema } from "@/env"
import { useMutation } from "@tanstack/react-query"

export type AreaResponseType = {
  message: string
}

export const useCreateUserArea = () => {
  return useMutation({
    mutationFn: async ({ areas }: { areas: number[] }) => {
      const result = await fetch(`${envSchema.API_URL}/user-areas`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ areas })
      })

      if (!result.ok) {
        const errorData = await result.json()
        throw new Error(errorData?.message)
      }

      const response: AreaResponseType = await result.json()

      return response
    }
  })
}
