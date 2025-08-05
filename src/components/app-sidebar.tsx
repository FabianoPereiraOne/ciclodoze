import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar"
import useVerifyAdmin from "@/hooks/useVerifyAdmin"
import { pagesAdminSidebar, pagesSidebar } from "@/schemas/base/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isAdmin } = useVerifyAdmin()

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={pagesSidebar} group='Workspace' />
        {isAdmin && <NavMain items={pagesAdminSidebar} group='Gerenciar' />}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
