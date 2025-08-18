"use client"

import { ChevronRight } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/AuthContext"
import useVerifyAdmin from "@/hooks/useVerifyAdmin"
import { Link } from "react-router-dom"

export function NavMain({ group }: { group?: string }) {
  const { areas } = useAuth()
  const { isAdmin } = useVerifyAdmin()
  const listAreas = isAdmin ? areas?.all ?? [] : areas?.allowed ?? []
  const hasGroup = group && listAreas?.length > 0

  return (
    <SidebarGroup className='mt-2'>
      {hasGroup && <SidebarGroupLabel>{group}</SidebarGroupLabel>}
      <SidebarMenu>
        {listAreas?.map((item, index) => {
          const pages = item?.pages ?? []
          const hasPages = pages && pages?.length > 0

          if (!hasPages) {
            return (
              <SidebarMenuItem key={index?.toString()}>
                <SidebarMenuButton asChild tooltip={item?.title}>
                  <Link to={item?.url}>
                    {item?.icon && <item.icon />}
                    <span>{item?.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }

          return (
            <Collapsible
              key={index?.toString()}
              asChild
              defaultOpen={item?.isActive}
              className='group/collapsible'
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item?.icon && <item.icon />}
                    <span>{item?.title}</span>
                    <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item?.pages?.map(subItem => (
                      <SidebarMenuSubItem key={subItem?.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem?.url}>
                            <span>{subItem?.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
