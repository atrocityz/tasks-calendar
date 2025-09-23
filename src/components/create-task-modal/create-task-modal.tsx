import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Layout } from '@/components/create-task-modal/ui/layout'
import { CreateTaskForm } from '@/components/create-task-modal/create-task-form'
import { TaskCard } from '@/components/ui/task-card.tsx'
import type { UseFormReset } from 'react-hook-form'
import { toast } from 'sonner'
import { getTasksByDate, useTasksStore } from '@/stores/tasks.store.ts'

export function CreateTaskModal({
  date,
  closeModal,
  handleOverlayClick,
}: {
  date?: Date
  closeModal: () => void
  handleOverlayClick: (e: React.MouseEvent) => void
}) {
  const { addTask, deleteTask, tasks } = useTasksStore()
  const currentTasks = date
    ? getTasksByDate(JSON.stringify(date), tasks)
    : tasks

  const onFormSubmit = (
    data: CreateTaskForm,
    reset: UseFormReset<CreateTaskForm>,
  ) => {
    addTask({
      name: data.taskName,
      importance: data.taskImportant,
      description: data.taskDescription || undefined,
      date: JSON.stringify(date),
    })
    reset()

    toast('Задача успешно создана!')
  }

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 overflow-y-auto"
      onMouseDown={handleOverlayClick}
    >
      <Layout
        closeButton={
          <Button
            className="self-end"
            onClick={closeModal}
            aria-label="Закрыть"
            title="Закрыть"
            size="icon"
          >
            <X size={32} />
          </Button>
        }
        header={
          <p className="self-center text-2xl">
            {date
              ? format(date, 'd MMMM yyyy', { locale: ru })
              : 'Создание задачи'}
          </p>
        }
        form={<CreateTaskForm onSubmit={onFormSubmit} />}
        tasks={
          currentTasks.length > 0 ? (
            <ul className="grid gap-2 overflow-y-auto py-2">
              {currentTasks.map((task) => (
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
          ) : (
            <span className="text-muted-foreground/70">
              Список задач пуст...
            </span>
          )
        }
      />
    </div>,
    document.body,
  )
}
