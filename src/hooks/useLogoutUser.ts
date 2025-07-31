import { useMutation } from "@tanstack/react-query"

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: async () => {
      const result = await fetch("http://localhost:3333/logout", {
        method: "GET",
        credentials: "include"
      })

      if (!result.ok) {
        const errorData = await result.json()
        throw new Error(errorData?.message)
      }

      const response = await result.json()
      return response
    }
  })
}
