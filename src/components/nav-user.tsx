"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  Loader2,
  LogOut,
  Sparkles
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/AuthContext"
import { useLogoutUser } from "@/hooks/useLogoutUser"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Skeleton } from "./ui/skeleton"

export function NavUser() {
  const { isMobile } = useSidebar()
  const { user } = useAuth()
  const photo = user?.photo
  const name = user?.name
  const email = user?.email
  const nameFallback = name?.charAt(0)
  const { changeUser, changeToken } = useAuth()
  const { mutateAsync, isPending } = useLogoutUser()

  const onLogout = async () => {
    try {
      const response = await mutateAsync()
      const message = response?.message ?? ""

      changeUser(null)
      changeToken("")
      localStorage.removeItem("token")
      toast.success(message)
    } catch (error: any) {
      toast.error(error?.message ?? "")
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage src={photo} alt={name} />
                <AvatarFallback className='rounded-lg'>
                  {nameFallback}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>
                  {name ?? <Skeleton className='h-2 w-full' />}
                </span>
                <span className='truncate text-xs'>
                  {email ?? <Skeleton className='h-2 mt-2 w-full' />}
                </span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side={isMobile ? "bottom" : "right"}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage src={photo} alt={name} />
                  <AvatarFallback className='rounded-lg'>
                    {nameFallback}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>
                    {name ?? <Skeleton className='h-2 w-full' />}
                  </span>
                  <span className='truncate text-xs'>
                    {email ?? <Skeleton className='h-2 mt-2 w-full' />}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Atualizar para o Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Minha Conta
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Cobrança
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notificações
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              {isPending ? (
                <>
                  <Loader2 className={cn("animate-spin", "w-10 h-10")} />
                  Saindo
                </>
              ) : (
                <>
                  <LogOut />
                  Log out
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
