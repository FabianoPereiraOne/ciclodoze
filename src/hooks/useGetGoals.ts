import { envSchema } from "@/env"
import type { GoalType } from "@/types/goals"
import { useQuery } from "@tanstack/react-query"

export const useGetGoals = () => {
  return useQuery({
    queryKey: ["goals"],
    queryFn: async () => {
      const result = await fetch(`${envSchema.API_URL}/goals`, {
        method: "GET",
        credentials: "include"
      })

      if (!result.ok) {
        const errorData = await result.json()
        throw new Error(errorData?.message)
      }

      const response: GoalType[] = await result.json()
      return response
    }
  })
}
