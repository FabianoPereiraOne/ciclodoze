import { LayoutDash } from "@/components/LayoutDash"
import { Tabs } from "@/components/ui/tabs"
import { useState } from "react"
import { TabAreas } from "./components/TabAreas"
import { TabList } from "./components/TabList"

export const Config = () => {
  const [activeTab, setActiveTab] = useState("areas")

  return (
    <LayoutDash>
      <div className='flex flex-col sm:flex-row w-full'>
        <div className=' w-full sm:w-64 border-b sm:border-r bg-muted/10 p-4'>
          <div className='mb-6'>
            <h1 className='text-lg sm:text-2xl font-bold'>Configurações</h1>
          </div>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            orientation='vertical'
            className='w-full'
          >
            <TabList />
          </Tabs>
        </div>

        <div className='flex-1 p-6 min-h-[91vh]'>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabAreas />
          </Tabs>
        </div>
      </div>
    </LayoutDash>
  )
}
