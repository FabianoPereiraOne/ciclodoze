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
import { useChangePassword } from "@/hooks/useChangePassword"
import { useForgot } from "@/hooks/useForgot"
import { cn } from "@/lib/utils"
import {
  ForgotPassSchema,
  ForgotSchema,
  type ForgotPassSchemaType,
  type ForgotSchemaType
} from "@/schemas/validations/forgot"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, LucideEdit2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { LuSend } from "react-icons/lu"
import { Link } from "react-router-dom"
import { toast } from "sonner"

export const Forgot = () => {
  const { mutateAsync, isPending } = useForgot()
  const { mutateAsync: mutateAsyncPass, isPending: isPendingPass } =
    useChangePassword()
  const [activeCode, setActiveCode] = useState(false)
  const [changePass, setChangePass] = useState(false)
  const form = useForm<ForgotSchemaType>({
    resolver: zodResolver(ForgotSchema),
    defaultValues: {
      email: ""
    }
  })

  const formPass = useForm<ForgotPassSchemaType>({
    resolver: zodResolver(ForgotPassSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = async ({ email }: ForgotSchemaType) => {
    try {
      const response = await mutateAsync({ email })
      const message = response?.message ?? ""

      form.reset({
        email: ""
      })
      setActiveCode(true)
      toast.success(message)
    } catch (error: any) {
      toast.error(error?.message ?? "")
    }
  }

  const handlerPopupPassword = async () => {
    setActiveCode(false)
    setChangePass(true)
  }

  const onChangePassword = async ({ password }: ForgotPassSchemaType) => {
    try {
      const response = await mutateAsyncPass({ password })
      const message = response?.message ?? ""

      formPass.reset({
        confirmPassword: "",
        password: ""
      })
      toast.success(message)
      setChangePass(false)

      setTimeout(() => {
        window.location.href = "/"
      }, 1000)
    } catch (error: any) {
      toast.error(error?.message ?? "")
    }
  }

  if (changePass) {
    return (
      <div className='w-full min-h-screen flex items-center justify-center flex-col gap-2 p-[20px] md:p-[36px] relative'>
        <Link
          to='/'
          className='absolute top-8 left-[50%] translate-x-[-50%] md:left-12 md:translate-x-0'
        >
          <img src='/favicon.ico' className='max-w-[48px]' alt='Logo' />
        </Link>
        <Card className='w-full max-w-[450px] py-8'>
          <CardHeader>
            <CardTitle className='text-center text-2xl'>
              Alteração de senha
            </CardTitle>
            <CardDescription className='text-center max-w-[280px] mx-auto'>
              Preencha o formulário a seguir para alterar sua senha.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...formPass}>
              <form
                onSubmit={formPass.handleSubmit(onChangePassword)}
                className='space-y-6'
              >
                <FormField
                  control={formPass.control}
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

                <FormField
                  control={formPass.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirme sua senha</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Digite a senha novamente'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isPendingPass}
                  className='w-full flex justify-center items-center gap-1 hover:bg-blue-500 hover:text-white cursor-pointer'
                  type='submit'
                >
                  {isPendingPass ? (
                    <>
                      <Loader2 className={cn("animate-spin", "w-10 h-10")} />
                      Alterando
                    </>
                  ) : (
                    <>
                      <LucideEdit2 />
                      Alterar senha
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    )
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
        <ActiveAccount onCallback={handlerPopupPassword} />
      ) : (
        <Card className='w-full max-w-[450px] py-8'>
          <CardHeader>
            <CardTitle className='text-center text-2xl'>
              Esqueceu sua senha
            </CardTitle>
            <CardDescription className='text-center max-w-[280px] mx-auto'>
              Entre com seu e-mail para receber código de redefinição de senha.
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

                <Button
                  disabled={isPending}
                  className='w-full flex justify-center items-center gap-1 hover:bg-blue-500 hover:text-white cursor-pointer'
                  type='submit'
                >
                  {isPending ? (
                    <>
                      <Loader2 className={cn("animate-spin", "w-10 h-10")} />
                      Enviando
                    </>
                  ) : (
                    <>
                      <LuSend />
                      Enviar
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className='flex flex-col gap-2 items-center justify-center'>
            <Link to='/' className='hover:underline'>
              Lembrou da Senha?
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
