import { cn } from "@/lib/utils"
import type { ButtonActionProps } from "@/types/components"
import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"

export const FloatButton = ({
  onClick,
  children,
  className,
  disabled,
  loading,
  loadingText
}: ButtonActionProps) => {
  return (
    <Button
      disabled={disabled || loading}
      onClick={onClick}
      className={
        className ??
        " w-auto h-auto fixed bottom-[20px] right-[20px] sm:right-[36px] sm:bottom-[36px] bg-blue-900 text-white hover:bg-blue-800 cursor-pointer flex items-center justify-center gap-1 "
      }
    >
      {loading ? (
        <>
          <Loader2 className={cn("animate-spin", "w-10 h-10")} />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  )
}
