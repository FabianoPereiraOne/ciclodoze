import { envSchema } from "@/env"
import type { ActionPlansType } from "@/types/actionPlans"
import { useQuery } from "@tanstack/react-query"

export const useGetActionPlans = () => {
  return useQuery({
    queryKey: ["ActionPlans"],
    queryFn: async () => {
      const result = await fetch(`${envSchema.API_URL}/action-plans`, {
        method: "GET",
        credentials: "include"
      })

      if (!result.ok) {
        const errorData = await result.json()
        throw new Error(errorData?.message)
      }

      const response: ActionPlansType[] = await result.json()
      return response
    }
  })
}
