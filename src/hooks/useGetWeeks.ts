import { envSchema } from "@/env"
import type { WeekType } from "@/types/weeks"
import { useQuery } from "@tanstack/react-query"

export const useGetWeeks = () => {
  return useQuery({
    queryKey: ["weeks"],
    queryFn: async () => {
      const result = await fetch(`${envSchema.API_URL}/weeks`, {
        method: "GET",
        credentials: "include"
      })

      if (!result.ok) {
        const errorData = await result.json()
        throw new Error(errorData?.message)
      }

      const response: WeekType[] = await result.json()
      return response
    }
  })
}
