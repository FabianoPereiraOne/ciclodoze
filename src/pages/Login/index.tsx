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
import { LoginSchema } from "@/types/login"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

export const Login = () => {
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = () => {}

  return (
    <div className='w-full h-screen flex items-center justify-center flex-col gap-2 p-[20px] relative'>
      <Link
        to='/'
        className='absolute top-8 left-[50%] translate-x-[-50%] md:left-12 md:translate-x-0'
      >
        <img src='/favicon.ico' className='max-w-[48px]' alt='Logo' />
      </Link>

      <Card className='w-full max-w-[400px] py-8'>
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
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
                className='w-full hover:bg-blue-500 hover:text-white cursor-pointer'
                type='submit'
              >
                Entrar
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
    </div>
  )
}
