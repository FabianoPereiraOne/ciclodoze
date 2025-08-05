import { envSchema } from "@/env"
import { useMutation } from "@tanstack/react-query"

type SignResponseType = {
  message: string
  token: string
  code?: boolean
}

export const useSignUser = () => {
  return useMutation({
    mutationFn: async ({
      email,
      password
    }: {
      email: string
      password: string
    }) => {
      const result = await fetch(`${envSchema.API_URL}/sign`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      if (!result.ok) {
        const errorData = await result.json()
        throw new Error(errorData?.message)
      }

      const response: SignResponseType = await result.json()
      return response
    }
  })
}
