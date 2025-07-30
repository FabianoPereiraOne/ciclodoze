import { useQuery } from "@tanstack/react-query"

export const useGetRooms = () => {
  return useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const result = await fetch("http://localhost:3333/rooms", {
        credentials: "include"
      })
      const response = await result.json()
      return response
    }
  })
}
