import type { Task } from '@/types/task.types.ts'
import { cn } from '@/lib/utils.ts'

export function TaskCardHeader({
  item,
  date,
  limitText,
}: {
  item: Task
  date?: string
  limitText: boolean
}) {
  return (
    <>
      <span className="sr-only">{item.importance} важность задачи</span>
      <div className="grid gap-2">
        <div>
          <h2
            className={cn('text-[16px] md:text-[18px] md:text-wrap', {
              'truncate max-w-[135px] sm:max-w-[245px] md:max-w-full':
                limitText,
            })}
            title={item.name}
          >
            {item.name}
          </h2>
          <span className="text-muted-foreground text-[14px]">{date}</span>
        </div>
      </div>
    </>
  )
}
