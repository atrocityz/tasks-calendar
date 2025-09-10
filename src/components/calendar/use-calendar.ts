import { useMemo, useState } from 'react'
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  getMonth,
  getYear,
  startOfMonth,
  startOfWeek,
} from 'date-fns'

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

// Хук переписать на zustand
export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const calendarDays = getCalendarDays(currentDate)

  const weekdays = useMemo(
    () =>
      [...Array(7)].map((_, i) =>
        new Intl.DateTimeFormat('ru', { weekday: 'short' })
          .format(new Date(2023, 0, i + 2))
          .replace(/^./, (c) => c.toUpperCase()),
      ),
    [],
  )

  const handlePrevButtonClick = () => {
    setCurrentDate((prev) => {
      if (getMonth(prev) === 0) {
        return new Date(getYear(prev) - 1, 11)
      } else {
        return new Date(getYear(prev), getMonth(prev) - 1)
      }
    })
  }

  const handleNextButtonClick = () => {
    setCurrentDate((prev) => {
      if (getMonth(prev) === 11) {
        return new Date(getYear(prev) + 1, 0)
      } else {
        return new Date(getYear(prev), getMonth(prev) + 1)
      }
    })
  }

  return {
    handleNextButtonClick,
    handlePrevButtonClick,
    calendarDays,
    weekdays,
    currentDate,
    selectedDate,
    setSelectedDate,
  }
}
