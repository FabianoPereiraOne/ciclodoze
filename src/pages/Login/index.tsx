import { ActiveAccount } from "@/components/ActiveAccount"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useSignUser } from "@/hooks/useSignUser"
import { cn } from "@/lib/utils"
import { LoginSchema, type LoginSchemaType } from "@/schemas/validations/login"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { LuLogIn } from "react-icons/lu"
import { Link } from "react-router-dom"
import { toast } from "sonner"

export const Login = () => {
  const { mutateAsync, isPending } = useSignUser()
  const [activeCode, setActiveCode] = useState(false)
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const response = await mutateAsync(data)
      const token = response?.token
      const code = response?.code
      const message = response?.message

      if (code) {
        setActiveCode(true)
        return toast.info(message)
      }

      localStorage.setItem("token", token)

      toast.success(message)
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1000)
    } catch (error: any) {
      toast.error(error?.message)
    }
  }

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col gap-2 p-[20px] md:p-[36px] relative'>
      <Link
        to='/'
        className='absolute top-8 left-[50%] translate-x-[-50%] md:left-12 md:translate-x-0'
      >
        <img src='/favicon.ico' className='max-w-[48px]' alt='Logo' />
      </Link>

      {activeCode ? (
        <ActiveAccount />
      ) : (
        <Card className='w-full max-w-[450px] py-8'>
          <CardHeader>
            <CardTitle className='text-center text-2xl'>
              Acesse sua Conta
            </CardTitle>
            <CardDescription className='text-center max-w-[280px] mx-auto'>
              Entre com seu e-mail e senha ou se preferir acesse com outros
              métodos abaixo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder='example@gmail.com'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Digite sua senha'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isPending}
                  className='w-full flex justify-center items-center gap-1 hover:bg-blue-500 hover:text-white cursor-pointer'
                  type='submit'
                >
                  {isPending ? (
                    <>
                      <Loader2 className={cn("animate-spin", "w-10 h-10")} />
                      Entrando
                    </>
                  ) : (
                    <>
                      <LuLogIn />
                      Entrar
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className='flex flex-col gap-2 items-center justify-center'>
            <Link to='/esqueceu-senha' className='hover:underline'>
              Esqueceu sua Senha?
            </Link>
            <Link to='/criar-conta' className='hover:underline'>
              Criar Conta
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
