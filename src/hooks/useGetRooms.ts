import type { Room } from "@/types/rooms"
import { useQuery } from "@tanstack/react-query"

export const useGetRooms = () => {
  return useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const result = await fetch("http://localhost:3333/rooms")
      const response: Room[] = await result.json()
      return response
    }
  })
}
