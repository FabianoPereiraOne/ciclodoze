import { Button } from "@/components/ui/button"
import type { WeekType } from "@/types/weeks"
import { ChevronLeft, ChevronRight } from "lucide-react"

export const WeeksSlider = ({
  currentWeek,
  currentWeekIndex,
  weeks,
  onNextWeek,
  onPrevWeek
}: {
  currentWeek: WeekType
  currentWeekIndex: number
  weeks: WeekType[]
  onNextWeek: () => void
  onPrevWeek: () => void
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit"
    })
  }

  return (
    <div className='flex items-center space-x-4 '>
      <Button
        variant='outline'
        size='sm'
        onClick={onPrevWeek}
        disabled={currentWeekIndex === 0}
        className='border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent'
      >
        <ChevronLeft className='w-4 h-4' />
      </Button>

      <div className='text-center'>
        <h1 className='text-2xl font-bold text-white mb-1'>
          Semana {currentWeek?.weekNumber}
        </h1>
        <p className='text-gray-400'>
          {formatDate(currentWeek?.startDate)} -{" "}
          {formatDate(currentWeek?.endDate)}
        </p>
      </div>

      <Button
        variant='outline'
        size='sm'
        onClick={onNextWeek}
        disabled={currentWeekIndex === weeks?.length - 1}
        className='border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent'
      >
        <ChevronRight className='w-4 h-4' />
      </Button>
    </div>
  )
}
