import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { useForm } from "react-hook-form"

export const PopupWelcome = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => {
  const form = useForm()

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='w-full bg-zinc-800 max-w-[90%] max-h-[90vh] overflow-y-auto lg:max-w-[900px] p-[16px] md:p-[36px]'>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl md:text-3xl'>
            🎉 Bem-vindo ao Ciclodoze
          </DialogTitle>
          <DialogDescription className='text-center text-md max-w-none md:max-w-[700px] mx-auto'>
            Alcance mais em menos tempo! Com o Ciclodoze, você foca no que
            realmente importa, define metas claras e vê resultados rápidos.
            Comece agora e transforme seu planejamento!
          </DialogDescription>
        </DialogHeader>
        <div className='gap-6 flex flex-col mt-8'>
          <p className='text-center text-md md:text-lg  font-medium'>
            Escolha suas áreas de interesse:
          </p>
          <div className='grid grid-cols-4 gap-4'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(() => {})}>
                <FormField
                  control={form.control}
                  name='marketing_emails'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                      <div className='space-y-0.5'>
                        <FormLabel>Marketing emails</FormLabel>
                        <FormDescription>
                          Receive emails about new products, features, and more.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
