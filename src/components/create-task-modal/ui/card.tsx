import { cn } from '@/lib/utils.ts'
import type { Task } from '@/types/task.types'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export function Card({ task, onDelete }: { task: Task; onDelete: () => void }) {
  return (
    <li className="flex justify-between bg-transparent border border-sidebar-border p-4 rounded gap-4">
      <div className="grid gap-2">
        <div className="grid gap-2">
          <span
            className={cn(
              'py-1 px-2 text-[14px] rounded font-bold w-max text-white',
              {
                'bg-amber-800': task.tag === 'Другое',
                'bg-green-800': task.tag === 'Личное',
                'bg-blue-800': task.tag === 'Работа',
              },
            )}
          >
            {task.tag}
          </span>
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
