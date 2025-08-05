import { envSchema } from "@/env"
import type { AreaType } from "@/types/areas"
import { useQuery } from "@tanstack/react-query"

type DashboardResponseType = {
  message: string
  firstLogin: boolean
  areas: AreaType[]
}

export const useGetDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const result = await fetch(`${envSchema.API_URL}/dashboard`, {
        method: "GET",
        credentials: "include"
      })

      if (!result.ok) {
        const errorData = await result.json()
        throw new Error(errorData?.message)
      }

      const response: DashboardResponseType = await result.json()
      return response
    }
  })
}
