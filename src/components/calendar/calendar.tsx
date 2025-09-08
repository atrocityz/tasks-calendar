import { Layout } from '@/components/calendar/ui/layout'
import { NextButton } from '@/components/calendar/ui/next-button'
import { PrevButton } from '@/components/calendar/ui/prev-button'
import { useCalendar } from '@/components/calendar/use-calendar'
import { Day } from '@/components/calendar/ui/day'
import { format, getMonth, getYear, isSameMonth } from 'date-fns'
import { ru } from 'date-fns/locale'
import type { Task } from '@/types/task.types'

export function Calendar({
  openModal,
  getTasksByDate,
}: {
  openModal: (date: Date) => void
  getTasksByDate: (date: Date) => Task[]
}) {
  const {
    handleNextButtonClick,
    handlePrevButtonClick,
    weekdays,
    calendarDays,
    currentDate,
  } = useCalendar()

  const currentMonth = format(
    new Date(getYear(currentDate), getMonth(currentDate), 1),
    'LLLL',
    { locale: ru },
  )
  const currentYear = getYear(currentDate)

  return (
    <Layout
      header={
        <>
          <PrevButton onClick={handlePrevButtonClick} />
          <h2 className="text-xl capitalize">
            {currentMonth}, {currentYear}
          </h2>
          <NextButton onClick={handleNextButtonClick} />
        </>
      }
      weekdays={weekdays.map((weekday) => (
        <span
          className="not-[:nth-child(7)]:border-r not-last:border-sidebar-border py-4 font-bold border-b"
          key={weekday}
        >
          {weekday}
        </span>
      ))}
      calendarDays={calendarDays.map((calendarDate) => (
        <Day
          openModal={() => openModal(calendarDate)}
          tasks={getTasksByDate(calendarDate)}
          date={calendarDate}
          isCurrentMonth={isSameMonth(calendarDate, currentDate)}
          key={`${calendarDate.getFullYear()}-${calendarDate.getMonth()}-${calendarDate.getDate()}`}
        />
      ))}
    />
  )
}
