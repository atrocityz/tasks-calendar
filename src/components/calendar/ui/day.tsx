import { cn } from '@/lib/utils.ts'
import { isToday } from 'date-fns'
import type { Task } from '@/types/task.types'
import { memo } from 'react'

function Day({
  date,
  isCurrentMonth,
  onClick,
  tasks,
}: {
  date: Date
  isCurrentMonth: boolean
  onClick: () => void
  tasks: Task[]
}) {
  return (
    <button
      className={cn(
        'relative py-5 md:py-10 text-xl border-sidebar-border hover:opacity-70 not-[:nth-last-child(-n+7)]:border-b not-[:nth-child(7n)]:border-r transition-opacity',
        {
          'bg-muted/30': !isCurrentMonth,
          'bg-green-300/20': isToday(date),
        },
      )}
      onClick={onClick}
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

export const MemoizedDay = memo(Day)
