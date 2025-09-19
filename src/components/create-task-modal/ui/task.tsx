import { getTaskImportanceColor, type Task } from '@/types/task.types'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export function Task({ task, onDelete }: { task: Task; onDelete: () => void }) {
  return (
    <li
      className="flex justify-between bg-transparent border border-sidebar-border p-4 rounded gap-4"
      style={{
        borderColor: getTaskImportanceColor(task.importance),
      }}
    >
      <span className="sr-only">{task.importance} важность задачи</span>
      <div className="grid gap-2">
        <div className="grid gap-2">
          <h2 className="truncate text-xl md:text-wrap" title={task.name}>
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
