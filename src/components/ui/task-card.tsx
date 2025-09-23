import { getTaskImportanceColor, type Task } from '@/types/task.types.ts'
import { Button } from '@/components/ui/button.tsx'
import { X } from 'lucide-react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export function TaskCard({
  item,
  onDelete,
}: {
  item: Task
  onDelete: () => void
}) {
  return (
    <li
      className="flex justify-between bg-transparent border border-sidebar-border p-4 rounded gap-4"
      style={{
        borderColor: getTaskImportanceColor(item.importance),
      }}
    >
      <span className="sr-only">{item.importance} важность задачи</span>
      <div className="grid gap-2">
        <div>
          <h2 className="truncate text-xl md:text-wrap" title={item.name}>
            {item.name}
          </h2>
          {item.date && (
            <span className="text-muted-foreground text-[14px]">
              {format(JSON.parse(item.date), 'd MMMM yyyy', { locale: ru })}
            </span>
          )}
        </div>
        {item.description && <p className="text-[14px]">{item.description}</p>}
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
