import { cn } from '@/lib/utils.ts'
import { isToday } from 'date-fns'
import { useTaskStore } from '@/components/calendar/calendar.store.ts'

export function CalendarDay({
  date,
  isCurrentMonth,
}: {
  date: Date
  isCurrentMonth: boolean
}) {
  const { openModal, getTasksByDate } = useTaskStore()

  const tasks = getTasksByDate(date)

  return (
    <button
      className={cn(
        'relative py-10 text-xl border-sidebar-border hover:bg-accent/20 not-[:nth-last-child(-n+7)]:border-b not-[:nth-child(7n)]:border-r',
        {
          'bg-muted/30': !isCurrentMonth,
          'bg-gray-600': isToday(date),
        },
      )}
      onClick={() => openModal(date)}
    >
      <time
        dateTime={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
      >
        {date.getDate()}
      </time>
      {tasks && (
        <span className="absolute bottom-3 right-3 rounded-full bg-accent-foreground text-black w-8 h-8 text-[16px] leading-none flex items-center justify-center">
          {tasks.length}
        </span>
      )}
    </button>
  )
}
