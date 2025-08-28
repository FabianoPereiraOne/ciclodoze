import type { WeekType } from "@/types/weeks"

export const ProgressPoint = ({
  weeks,
  currentWeekIndex
}: {
  weeks: WeekType[]
  currentWeekIndex: number
}) => {
  return (
    <div className='flex flex-1 items-center space-x-2  justify-end'>
      <div className='flex space-x-1'>
        {weeks?.map((week, index) => {
          const id = week.id
          const weekNumber = week?.weekNumber

          return (
            <div
              key={id}
              className={`w-3 h-3 rounded-full ${
                index === currentWeekIndex
                  ? "bg-blue-500 ring-2 ring-blue-400 ring-opacity-50"
                  : index < currentWeekIndex
                  ? "bg-green-500"
                  : "bg-gray-700"
              }`}
              title={`Semana ${weekNumber}`}
            />
          )
        })}
      </div>
      <span className='text-sm text-gray-400'>
        {currentWeekIndex + 1}/{weeks?.length}
      </span>
    </div>
  )
}
