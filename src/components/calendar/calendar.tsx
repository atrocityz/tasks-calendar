import { Layout } from '@/components/calendar/ui/layout'
import { NextButton } from '@/components/calendar/ui/next-button'
import { PrevButton } from '@/components/calendar/ui/prev-button'
import { MemoizedDay } from '@/components/calendar/ui/day'
import { format, isSameMonth } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useCalendarModel } from '@/components/calendar/use-calendar-model.ts'
import { getTasksByDate, useTasksStore } from '@/stores/tasks.store.ts'
import { useModal } from '@/hooks/use-modal.ts'
import { CreateTaskModal } from '@/components/task-modals/create-task-modal.tsx'

export function Calendar() {
  const { tasks } = useTasksStore()
  const { closeModal, isOpen, openModal } = useModal()
  const calendarModel = useCalendarModel()

  const formattedDate = format(calendarModel.currentDate, 'LLLL, yyyy', {
    locale: ru,
  })

  return (
    <>
      <Layout
        header={
          <>
            <PrevButton onClick={calendarModel.goToPrevMonth} />
            <h2 className="text-xl capitalize">{formattedDate}</h2>
            <NextButton onClick={calendarModel.goToNextMonth} />
          </>
        }
        weekdays={calendarModel.weekdays.map((weekday) => (
          <span
            className="not-[:nth-child(7)]:border-r not-last:border-sidebar-border py-4 font-bold border-b bg-muted"
            key={weekday}
          >
            {weekday}
          </span>
        ))}
        calendarDays={calendarModel.calendarDays.map((calendarDate) => (
          <MemoizedDay
            onClick={() => {
              openModal()
              calendarModel.selectDate(calendarDate)
            }}
            date={calendarDate}
            tasksCount={
              getTasksByDate(JSON.stringify(calendarDate), tasks).length
            }
            isCurrentMonth={isSameMonth(
              calendarDate,
              calendarModel.currentDate,
            )}
            key={JSON.stringify(calendarDate)}
          />
        ))}
      />
      {isOpen && (
        <CreateTaskModal
          date={calendarModel.selectedDate}
          closeModal={closeModal}
          isOpen={isOpen}
        />
      )}
    </>
  )
}
