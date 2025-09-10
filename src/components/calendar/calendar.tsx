import { Layout } from '@/components/calendar/ui/layout'
import { NextButton } from '@/components/calendar/ui/next-button'
import { PrevButton } from '@/components/calendar/ui/prev-button'
import { useCalendar } from '@/components/calendar/use-calendar'
import { MemoizedDay } from '@/components/calendar/ui/day'
import { format, isSameMonth } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useTasksStore } from '@/stores/use-tasks-store'
import { CreateTaskModal } from '@/components/create-task-modal/create-task-modal'
import { useModal } from '@/components/calendar/use-modal'

export function Calendar() {
  const calendarModel = useCalendar()
  const { getTasksByDate } = useTasksStore()
  const { isModalOpen, openModal, closeModal, handleOverlayClick } = useModal()

  const formattedDate = format(calendarModel.currentDate, 'LLLL, yyyy', {
    locale: ru,
  })

  return (
    <>
      <Layout
        header={
          <>
            <PrevButton onClick={calendarModel.handlePrevButtonClick} />
            <h2 className="text-xl capitalize">{formattedDate}</h2>
            <NextButton onClick={calendarModel.handleNextButtonClick} />
          </>
        }
        weekdays={calendarModel.weekdays.map((weekday) => (
          <span
            className="not-[:nth-child(7)]:border-r not-last:border-sidebar-border py-4 font-bold border-b"
            key={weekday}
          >
            {weekday}
          </span>
        ))}
        calendarDays={calendarModel.calendarDays.map((calendarDate) => (
          <MemoizedDay
            onClick={() => {
              openModal()
              calendarModel.setSelectedDate(calendarDate)
            }}
            date={calendarDate}
            tasks={getTasksByDate(calendarDate)}
            isCurrentMonth={isSameMonth(
              calendarDate,
              calendarModel.currentDate,
            )}
            key={`${calendarDate.getFullYear()}-${calendarDate.getMonth()}-${calendarDate.getDate()}`}
          />
        ))}
      />
      {isModalOpen && (
        <CreateTaskModal
          date={calendarModel.selectedDate}
          closeModal={closeModal}
          handleOverlayClick={handleOverlayClick}
        />
      )}
    </>
  )
}
