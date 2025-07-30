import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useActiveAccount } from "@/hooks/useActiveAccount"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useRef, useState, type KeyboardEvent } from "react"
import { LuUserCheck } from "react-icons/lu"
import { toast } from "sonner"

export const ActiveAccount = () => {
  const [code, setCode] = useState<string[]>(Array(6).fill(""))
  const [error, setError] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const { mutateAsync, isPending } = useActiveAccount()

  const handlerVerifyCode = async () => {
    const fullCode = code.join("")

    if (fullCode?.length < 6) {
      setError(true)
      return toast.error("Preencha todos os campos!")
    }

    try {
      const response = await mutateAsync({ code: fullCode })
      const token = response?.token

      setCode(Array(6).fill(""))
      setError(false)
      localStorage.setItem("token", token)

      toast.success("Conta ativada com sucesso!")
      setTimeout(() => {
        window.location.href = "/dash"
      }, 1000)
    } catch (err: any) {
      setError(true)
      toast.error("Não foi possível ativar sua conta.")
    }
  }

  const handleChange = (index: number, value: string) => {
    const newCode = [...code]
    newCode[index] = value.slice(0, 1)
    setCode(newCode)
    setError(false)

    if (value && index < 5) inputRefs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    setError(false)
    const pastedData = e.clipboardData.getData("text").trim()

    const digits = pastedData.slice(0, 6).split("")
    const newCode = [...code]

    digits.forEach((digit, index) => {
      if (index < 6) {
        newCode[index] = digit
      }
    })

    setCode(newCode)

    const lastIndex = Math.min(digits.length, 5)
    inputRefs.current[lastIndex]?.focus()
  }

  return (
    <Card className='w-full max-w-[450px] py-8'>
      <CardHeader>
        <CardTitle className='text-center text-2xl'>
          Ativação de conta
        </CardTitle>
        <CardDescription className='text-center max-w-[280px] mx-auto'>
          Digite o código enviado no seu email para ativar sua conta:
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex justify-center gap-2'>
          {code.map((digit, index) => (
            <Input
              key={index}
              ref={(el: any) => (inputRefs.current[index] = el)}
              type='text'
              inputMode='numeric'
              maxLength={1}
              value={digit}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={`h-12 w-12 text-center text-lg font-semibold ${
                error ? "border-red-500" : ""
              }`}
              autoFocus={index === 0}
            />
          ))}
        </div>

        <Button
          className='w-full mt-8 mx-auto sm:max-w-[80%] flex justify-center items-center gap-1 hover:bg-blue-500 hover:text-white cursor-pointer'
          type='button'
          onClick={handlerVerifyCode}
        >
          {isPending ? (
            <>
              <Loader2 className={cn("animate-spin", "w-10 h-10")} />
              Ativando
            </>
          ) : (
            <>
              <LuUserCheck />
              Ativar conta
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
