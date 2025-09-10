import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { type FormEvent } from 'react'
import type { TaskTag } from '@/types/task.types'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useTasksStore } from '@/stores/use-tasks-store'
import { Layout } from '@/components/create-task-modal/ui/layout'
import { CreateForm } from '@/components/create-task-modal/ui/create-form'
import { Card } from '@/components/create-task-modal/ui/card'

// TODO: Переделать форму под react-hook-form
// TODO: Новая задача должна появляться выше??
// TODO: Возможно перенести список задач как выдвигающуюся панель справа и там уже список задач??
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

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    addTask(date, {
      name: String(formData.get('task-name')),
      tag: String(formData.get('task-tag-select')) as TaskTag,
      description: String(formData.get('task-description')) || undefined,
    })
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
        form={<CreateForm onSubmit={onFormSubmit} />}
        tasks={
          tasks && tasks.length > 0 ? (
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
