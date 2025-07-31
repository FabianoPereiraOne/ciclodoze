import type { ReactNode } from "react"
import { AppSidebar } from "../app-sidebar"
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar"

export const LayoutDash = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
