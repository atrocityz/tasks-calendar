import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useTasksStore } from '@/stores/use-tasks-store'
import { Layout } from '@/components/create-task-modal/ui/layout'
import { CreateTaskForm } from '@/components/create-task-modal/create-task-form'
import { Card } from '@/components/create-task-modal/ui/card'
import type { UseFormReset } from 'react-hook-form'

// TODO: Возможно перенести список задач как выдвигающуюся панель справа и там уже список задач?? (drawer)
export function CreateTaskModal({
  date,
  closeModal,
  handleOverlayClick,
}: {
  date: Date
  closeModal: () => void
  handleOverlayClick: (e: React.MouseEvent) => void
}) {
  const { getTasksByDate, addTask, deleteTask } = useTasksStore()
  const tasks = getTasksByDate(date)

  const onFormSubmit = (
    data: CreateTaskForm,
    reset: UseFormReset<CreateTaskForm>,
  ) => {
    addTask(date, {
      name: data.taskName,
      tag: data.taskTagList,
      description: data.taskDescription || undefined,
    })
    reset()
  }

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 overflow-y-auto"
      onClick={handleOverlayClick}
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
            {format(date, 'd MMMM yyyy', { locale: ru })}
          </p>
        }
        form={<CreateTaskForm onSubmit={onFormSubmit} />}
        tasks={
          tasks?.length > 0 ? (
            tasks.map((task) => (
              <Card
                key={task.id}
                task={task}
                onDelete={() => deleteTask(date, task.id)}
              />
            ))
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
