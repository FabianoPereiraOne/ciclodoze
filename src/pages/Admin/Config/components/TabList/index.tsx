import { TabsList, TabsTrigger } from "@/components/ui/tabs"

export const TabList = () => {
  return (
    <TabsList className='grid w-full grid-cols-1 h-auto bg-transparent p-0 space-y-1'>
      <TabsTrigger
        value='areas'
        className='w-full justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border-none cursor-pointer'
      >
        Áreas
      </TabsTrigger>
      <TabsTrigger
        value='settings'
        className='w-full justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border-none cursor-pointer'
      >
        Configurações gerais
      </TabsTrigger>
    </TabsList>
  )
}
