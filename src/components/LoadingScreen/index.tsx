import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export const LoadingScreen = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Loader2 className={cn("animate-spin", "w-10 h-10")} />
      <p className='text-sm text-muted-foreground'>Carregando...</p>
    </div>
  )
}
