import { Fragment, type ReactNode } from "react"
import { AppSidebar } from "../app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "../ui/breadcrumb"
import { Separator } from "../ui/separator"
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar"

export const LayoutDash = ({
  children,
  component
}: {
  children: ReactNode
  component?: ReactNode
}) => {
  const pathname = window.location.pathname
  const breadcrumbs = pathname
    ?.split("/")
    .filter(path => path?.trim()?.length > 0)
  const breadcrumbLinks = breadcrumbs.map((crumb, index) => {
    const url = "/" + breadcrumbs.slice(0, index + 1).join("/")
    return {
      label: crumb,
      url
    }
  })

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full '>
        <header className='bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator
            orientation='vertical'
            className='mr-2 data-[orientation=vertical]:h-4'
          />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbLinks?.map((bread, index) => {
                const label = bread?.label
                const url = bread?.url
                const isLast = index === breadcrumbLinks?.length - 1

                return (
                  <Fragment key={index?.toString()}>
                    <BreadcrumbItem className='hidden md:block'>
                      <BreadcrumbLink href={url} className='capitalize'>
                        {label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {!isLast && (
                      <BreadcrumbSeparator className='hidden md:block' />
                    )}
                  </Fragment>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
          {component}
        </header>
        <div className='w-full'>{children}</div>
      </main>
    </SidebarProvider>
  )
}
