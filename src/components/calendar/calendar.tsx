import { Layout } from '@/components/calendar/ui/layout'
import { NextButton } from '@/components/calendar/ui/next-button'
import { PrevButton } from '@/components/calendar/ui/prev-button'
import { useCalendar } from '@/components/calendar/use-calendar'
import { Day } from '@/components/calendar/ui/day'
import { format, isSameMonth } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useTasksStore } from '@/stores/use-tasks-store'
import { useTaskModalStore } from '@/stores/use-task-modal-store'

export function Calendar() {
  const {
    handleNextButtonClick,
    handlePrevButtonClick,
    weekdays,
    calendarDays,
    currentDate,
  } = useCalendar()
  const { getTasksByDate } = useTasksStore()
  const { openModal } = useTaskModalStore()

  const formattedDate = format(currentDate, 'LLLL, yyyy', { locale: ru })

  return (
    <Layout
      header={
        <>
          <PrevButton onClick={handlePrevButtonClick} />
          <h2 className="text-xl capitalize">{formattedDate}</h2>
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
          onClick={() => openModal(calendarDate)}
          date={calendarDate}
          tasks={getTasksByDate(calendarDate)}
          isCurrentMonth={isSameMonth(calendarDate, currentDate)}
          key={`${calendarDate.getFullYear()}-${calendarDate.getMonth()}-${calendarDate.getDate()}`}
        />
      ))}
    />
  )
}
