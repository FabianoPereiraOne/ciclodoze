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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useCreateUser } from "@/hooks/useCreateUser"
import {
  RegisterSchema,
  type RegisterSchemaType
} from "@/schemas/validations/register"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LuUserPlus } from "react-icons/lu"
import { Link } from "react-router-dom"
import { toast } from "sonner"

export const Register = () => {
  const { mutateAsync } = useCreateUser()
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      confirmPassword: "",
      email: "",
      name: "",
      password: "",
      purpose: ""
    }
  })

  const onSubmit = async (data: RegisterSchemaType) => {
    const response = await mutateAsync(data)
    const hasToken = response?.token

    if (hasToken) {
      toast.success("Conta criada com sucesso.")

      return setTimeout(() => (window.location.href = "/dash"), 500)
    } else {
      toast.error("Não foi possível criar sua conta.")
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

      <Card className='w-full max-w-[450px] py-8'>
        <CardHeader>
          <CardTitle className='text-center text-2xl'>Crie sua Conta</CardTitle>
          <CardDescription className='text-center max-w-[280px] mx-auto'>
            Preencha o formulário a seguir ou se preferir acesse com outros
            métodos abaixo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input
                        type='name'
                        placeholder='Digite seu nome'
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

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
                name='purpose'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qual seu propósito?</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Selecione uma opção' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Propósitos</SelectLabel>
                            <SelectItem value='viver-com-proposito'>
                              Viver com propósito
                            </SelectItem>
                            <SelectItem value='buscar-autoconhecimento'>
                              Buscar autoconhecimento
                            </SelectItem>
                            <SelectItem value='crescimento-profissional'>
                              Crescimento profissional
                            </SelectItem>
                            <SelectItem value='equilibrio-emocional'>
                              Equilíbrio emocional
                            </SelectItem>
                            <SelectItem value='liberdade-financeira'>
                              Liberdade financeira
                            </SelectItem>
                            <SelectItem value='espiritualidade'>
                              Desenvolvimento espiritual
                            </SelectItem>
                            <SelectItem value='saude-e-bem-estar'>
                              Saúde e bem-estar
                            </SelectItem>
                            <SelectItem value='outro'>Outro</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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

              <FormField
                control={form.control}
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
                className='w-full flex justify-center items-center gap-1 hover:bg-blue-500 hover:text-white cursor-pointer'
                type='submit'
              >
                <LuUserPlus />
                Criar conta
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex flex-col gap-2 items-center justify-center'>
          <Link to='/' className='hover:underline'>
            Já possui conta?
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
