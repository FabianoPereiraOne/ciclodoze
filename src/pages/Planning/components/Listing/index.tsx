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
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { useDeleteGoal } from "@/hooks/useDeleteGoal"
import { useGetGoals } from "@/hooks/useGetGoals"
import { listStatus } from "@/schemas/base/goals"
import { availableIcons } from "@/schemas/base/icons"
import { Categories, Difficulties } from "@/schemas/validations/settings"
import type { GoalType } from "@/types/goals"
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
  fcData: (value: null | GoalType) => void
  toggleDialogUpdate: () => void
}): ColumnDef<GoalType>[] => [
  {
    accessorKey: "name",
    header: "Meta",
    enableHiding: false,
    cell: ({ row }) => {
      const IconString =
        availableIcons.find(icon => icon?.value === row.original.icon)?.icon ??
        Info

      return (
        <div className='flex gap-2 items-center'>
          <IconString />
          {row.getValue("name")}
        </div>
      )
    }
  },
  {
    accessorKey: "difficulty",
    header: "Dificuldade",
    cell: ({ row }) => {
      const difficulty = row.getValue("difficulty")
      const difficultySelected = Difficulties.find(
        diff => diff?.value === difficulty
      )

      return (
        <div className='flex gap-2 items-center'>
          {difficultySelected?.label}
        </div>
      )
    }
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => {
      const category = row.getValue("category")
      const categorySelected = Categories.find(cat => cat?.value === category)

      return (
        <div className='flex gap-2 items-center'>{categorySelected?.label}</div>
      )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")
      const statusSelected = listStatus.find(st => st?.value === status)

      return (
        <div className='flex gap-2 items-center'>{statusSelected?.label}</div>
      )
    }
  },
  {
    accessorKey: "progress",
    header: "Progresso",
    cell: ({ row }) => {
      const progress: number = row.getValue("progress")

      return (
        <div className='flex gap-2 items-center'>
          <Progress value={progress} className='w-[100%]' />
        </div>
      )
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { mutateAsync } = useDeleteGoal()
      const handlerDeleteArea = async () => {
        try {
          const response = await mutateAsync({ id: row?.original?.id })
          const message = response?.message
          toast.success(message)
        } catch (error: any) {
          console.error(error)
          toast.error(error?.message)
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

export function Listing({
  fcData,
  toggleDialogUpdate
}: {
  fcData: (value: null | GoalType) => void
  toggleDialogUpdate: () => void
}) {
  const { data: goals } = useGetGoals()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: goals ?? [],
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
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={event =>
            table.getColumn("name")?.setFilterValue(event.target.value)
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
