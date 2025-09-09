import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { type FormEvent } from 'react'
import type { TaskTag } from '@/types/task.types'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useTaskModalStore } from '@/stores/use-task-modal-store'
import { useTasksStore } from '@/stores/use-tasks-store'
import { Layout } from '@/components/create-task-modal/ui/layout'
import { useModal } from '@/components/create-task-modal/use-modal'
import { CreateForm } from '@/components/create-task-modal/ui/create-form'
import { Card } from '@/components/create-task-modal/ui/card'

// Переделать форму под react-hook-form
// Новая задача должна появляться выше??
export function CreateTaskModal() {
  const { getTasksByDate, addTask, deleteTask } = useTasksStore()
  const { closeModal, isOpen, date } = useTaskModalStore()
  const { handleOverlayClick } = useModal(isOpen, closeModal)

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

  if (!isOpen) return null

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
            {format(date, 'd MMMM yyyy', { locale: ru })}
          </p>
        }
        form={<CreateForm onSubmit={onFormSubmit} />}
        tasks={
          tasks &&
          tasks.map((task) => (
            <Card
              key={task.id}
              task={task}
              onDelete={() => deleteTask(date, task.id)}
            />
          ))
        }
      />
    </div>,
    document.body,
  )
}
