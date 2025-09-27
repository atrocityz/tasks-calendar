import { TaskCard } from '@/components/task-card/task-card.tsx'
import type { Task } from '@/types/task.types.ts'

export function TaskList({
  tasks,
  limitText = false,
  isTaskEditable,
}: {
  tasks: Task[]
  limitText?: boolean
  isTaskEditable?: boolean
}) {
  if (tasks.length < 1) {
    return <div className="text-muted-foreground/70">Список задач пуст...</div>
  }

  return (
    <ul className="grid gap-2 overflow-y-auto">
      {tasks.map((task) => (
        <TaskCard
          limitText={limitText}
          key={task.id}
          item={task}
          editable={isTaskEditable}
        />
      ))}
    </ul>
  )
}
