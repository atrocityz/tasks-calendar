import { CalendarPrevButton } from '@/components/calendar/CalendarPrevButton.tsx'
import { CalendarNextButton } from '@/components/calendar/CalendarNextButton.tsx'
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getMonth,
  getYear,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { ru } from 'date-fns/locale'
import { useState } from 'react'
import { CalendarDay } from '@/components/calendar/CalendarDay.tsx'
import { TaskModal } from '@/components/TaskModal.tsx'
import { useTaskStore } from '@/components/calendar/calendar.store.ts'

// TODO: Сто проц можно как-то без состояния года изменять его относительно месяца
// TODO: Вынести компоненты
// TODO: Вынести бизнес логику и отрисовку
// TODO: Как-то выделить название дня недели
export function Calendar() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    getMonth(new Date()),
  )
  const [currentYear, setCurrentYear] = useState(getYear(new Date()))
  const { isModalOpen } = useTaskStore()

  const getCalendarDays = (date: Date) => {
    const monthStart = startOfMonth(date)
    const monthEnd = endOfMonth(date)

    const calendarStart = startOfWeek(monthStart, {
      weekStartsOn: 1,
    })
    const calendarEnd = endOfWeek(monthEnd, {
      weekStartsOn: 1,
    })

    return eachDayOfInterval({
      start: calendarStart,
      end: calendarEnd,
    })
  }

  const currentMonth = format(
    new Date(currentYear, currentMonthIndex, 1),
    'LLLL',
    { locale: ru },
  )

  const calendarDays = getCalendarDays(new Date(currentYear, currentMonthIndex))
  const weekdays = [...Array(7)].map((_, i) =>
    new Intl.DateTimeFormat('ru', { weekday: 'short' })
      .format(new Date(2023, 0, i + 2))
      .replace(/^./, (c) => c.toUpperCase()),
  )

  const handlePrevButtonClick = () => {
    setCurrentMonthIndex((prevState) => {
      if (prevState === 0) {
        setCurrentYear(currentYear - 1)
        return 11
      } else {
        return prevState - 1
      }
    })
  }

  const handleNextButtonClick = () => {
    setCurrentMonthIndex((prevState) => {
      if (prevState === 11) {
        setCurrentYear(currentYear + 1)
        return 0
      } else {
        return prevState + 1
      }
    })
  }

  return (
    <div className="text-center grid gap-y-8 pt-10 px-8">
      <div className="flex items-center gap-30 justify-between min-w-[600px] mx-auto">
        <CalendarPrevButton onClick={handlePrevButtonClick} />
        <h2 className="text-xl capitalize">
          {currentMonth}, {currentYear}
        </h2>
        <CalendarNextButton onClick={handleNextButtonClick} />
      </div>
      <div className="border border-sidebar-border grid grid-cols-7 rounded-[8px]">
        {weekdays.map((weekday) => (
          <span
            className="not-last:border-r not-last:border-sidebar-border py-4 font-bold border-b"
            key={weekday}
          >
            {weekday}
          </span>
        ))}
        {calendarDays.map((calendarDate) => (
          <CalendarDay
            date={calendarDate}
            isCurrentMonth={calendarDate.getMonth() === currentMonthIndex}
            key={`${calendarDate.getFullYear()}-${calendarDate.getMonth()}-${calendarDate.getDate()}`}
          />
        ))}
        {isModalOpen && <TaskModal />}
      </div>
    </div>
  )
}
