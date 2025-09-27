import { calendarStore } from '@/stores/calendar.store..ts'
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { useMemo } from 'react'

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

export function useCalendarModel() {
  const {
    currentDate,
    selectDate,
    selectedDate,
    goToPrevMonth,
    goToNextMonth,
  } = calendarStore
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

  return {
    weekdays,
    calendarDays,
    currentDate,
    selectedDate,
    selectDate,
    goToPrevMonth,
    goToNextMonth,
  }
}
