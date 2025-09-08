import { cn } from '@/lib/utils.ts'
import { isToday } from 'date-fns'
import type { Task } from '@/types/task.types'

export function Day({
  date,
  isCurrentMonth,
  openModal,
  tasks,
}: {
  date: Date
  isCurrentMonth: boolean
  openModal: () => void
  tasks: Task[]
}) {
  return (
    <button
      className={cn(
        'relative py-5 md:py-10 text-xl border-sidebar-border hover:bg-accent/20 not-[:nth-last-child(-n+7)]:border-b not-[:nth-child(7n)]:border-r',
        {
          'bg-muted/30': !isCurrentMonth,
          'bg-gray-600': isToday(date),
        },
      )}
      onClick={openModal}
    >
      <time
        dateTime={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
      >
        {date.getDate()}
      </time>
      {tasks?.length > 0 && (
        <span className="absolute md:bottom-3 md:right-3 bottom-1 right-0.5 rounded-full bg-accent-foreground text-background md:w-8 md:h-8 w-5 h-5 text-[14px] md:text-[16px] leading-none flex items-center justify-center">
          {tasks.length}
        </span>
      )}
    </button>
  )
}
