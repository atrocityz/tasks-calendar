import { cn } from '@/lib/utils.ts'
import type { Task } from '@/types/task.types'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export function Task({ task, onDelete }: { task: Task; onDelete: () => void }) {
  return (
    <li
      className={cn(
        'flex justify-between bg-transparent border border-sidebar-border p-4 rounded gap-4',
        {
          'border-red-900': task.important === 'Высокая',
          'border-orange-400': task.important === 'Средняя',
          'border-green-900': task.important === 'Низкая',
        },
      )}
    >
      <span className="sr-only">{task.important} важность задачи</span>
      <div className="grid gap-2">
        <div className="grid gap-2">
          <h2
            className="truncate w-70 md:w-full text-xl md:text-wrap"
            title={task.name}
          >
            {task.name}
          </h2>
        </div>
        {task.description && <p className="text-[14px]">{task.description}</p>}
      </div>
      <Button
        onClick={onDelete}
        aria-label="Удалить задачу"
        title="Удалить задачу"
        variant="destructive"
        size="icon"
      >
        <X />
      </Button>
    </li>
  )
}
