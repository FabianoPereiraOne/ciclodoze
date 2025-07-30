import { useMutation } from "@tanstack/react-query"

export const useVerifyCode = () => {
  return useMutation({
    mutationFn: async (data: { code: string }) => {
      try {
        const result = await fetch("http://localhost:3333/active-account", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(data)
        })

        if (result?.status !== 201) return

        const response = await result.json()
        return response
      } catch (error) {
        console.error(error)
      }
    }
  })
}
