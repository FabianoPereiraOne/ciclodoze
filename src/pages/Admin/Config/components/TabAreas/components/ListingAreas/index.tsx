import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { useDeleteArea } from "@/hooks/useDeleteArea"
import { useGetAreas } from "@/hooks/useGetAreas"
import { availableIcons } from "@/schemas/base/icons"
import type { AreaType, dataType } from "@/types/areas"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import { ChevronDown, Info, MoreHorizontal } from "lucide-react"
import * as React from "react"
import { toast } from "sonner"

export const columns = ({
  fcData,
  toggleDialogUpdate
}: {
  fcData: (value: null | dataType) => void
  toggleDialogUpdate: () => void
}): ColumnDef<AreaType>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <div className='capitalize'>
        {row.getValue("isActive") ? "Ativo" : "Inativo"}
      </div>
    )
  },
  {
    accessorKey: "title",
    header: "Titulo",
    enableHiding: false,
    cell: ({ row }) => {
      const IconString =
        availableIcons.find(icon => icon?.value === row.original.icon)?.icon ??
        Info

      return (
        <div className='flex gap-2 items-center'>
          <IconString />
          {row.getValue("title")}
        </div>
      )
    }
  },
  {
    accessorKey: "access",
    header: "Nível de Acesso",
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue("access")}</div>
    )
  },
  {
    accessorKey: "pages",
    header: "Páginas",
    cell: ({ row }) => {
      const pages: { title: string; url: string }[] = Array.isArray(
        row.getValue("pages")
      )
        ? row.getValue("pages")
        : []

      return <div>{pages?.length}</div>
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { mutateAsync } = useDeleteArea()

      const handlerDeleteArea = async () => {
        try {
          const response = await mutateAsync({ id: row?.getValue("id") })
          const message = response?.message

          toast.success(message)
        } catch (error: any) {
          toast.error(error.message)
        }
      }

      const handlerEditArea = () => {
        fcData({
          ...row?.original
        })

        toggleDialogUpdate()
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Abrir Menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handlerEditArea}
              className='cursor-pointer'
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handlerDeleteArea}
              className='cursor-pointer'
            >
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

export function ListingAreas({
  fcData,
  toggleDialogUpdate
}: {
  fcData: (value: null | dataType) => void
  toggleDialogUpdate: () => void
}) {
  const { data: areas } = useGetAreas()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: areas ?? [],
    columns: columns({
      fcData,
      toggleDialogUpdate
    }),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <div className='w-full mt-4'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Pesquisa aqui...'
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={event =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Colunas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='text-muted-foreground flex-1 text-sm'>
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}
