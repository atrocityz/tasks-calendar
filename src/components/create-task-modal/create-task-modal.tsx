import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Layout } from '@/components/create-task-modal/ui/layout'
import { CreateTaskForm } from '@/components/create-task-modal/create-task-form'
import type { UseFormReset } from 'react-hook-form'
import { toast } from 'sonner'
import { getTasksByDate, useTasksStore } from '@/stores/tasks.store.ts'
import { TaskList } from '@/components/task-list.tsx'

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
          <TaskList
            tasks={currentTasks}
            deleteTask={(taskId: string) => deleteTask(taskId)}
          />
        }
      />
    </div>,
    document.body,
  )
}
