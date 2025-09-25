import { TaskCard } from '@/components/task-card/task-card.tsx'
import { toast } from 'sonner'
import type { Task } from '@/types/task.types.ts'

export function TaskList({
  tasks,
  deleteTask,
}: {
  deleteTask: (taskId: string) => void
  tasks: Task[]
}) {
  if (tasks.length < 1) {
    return <div className="text-muted-foreground/70">Список задач пуст...</div>
  }

  return (
    <ul className="grid gap-2 overflow-y-auto">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          item={task}
          onDelete={() => {
            deleteTask(task.id)
            toast('Задача успешно удалена!')
          }}
        />
      ))}
    </ul>
  )
}
