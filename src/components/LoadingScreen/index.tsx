import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export const LoadingScreen = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Loader2
        className={cn("animate-spin text-muted-foreground", "w-8 h-8 mb-2")}
      />
      <p className='text-sm text-muted-foreground'>Carregando...</p>
    </div>
  )
}
