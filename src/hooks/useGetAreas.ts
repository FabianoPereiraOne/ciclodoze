import { envSchema } from "@/env"
import type { AreaType } from "@/types/areas"
import { useQuery } from "@tanstack/react-query"

export const useGetAreas = () => {
  return useQuery({
    queryKey: ["areas"],
    queryFn: async () => {
      const result = await fetch(`${envSchema.API_URL}/areas`, {
        method: "GET",
        credentials: "include"
      })

      if (!result.ok) {
        const errorData = await result.json()
        throw new Error(errorData?.message)
      }

      const response: AreaType[] = await result.json()
      return response
    }
  })
}
