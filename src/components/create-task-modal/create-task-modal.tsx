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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx'
import { useModalStore } from '@/stores/modal.store.ts'

export function CreateTaskModal({
  date,
  showTaskList = true,
}: {
  date?: Date
  showTaskList?: boolean
}) {
  const { addTask, deleteTask, tasks } = useTasksStore()
  const { closeModal, isOpen } = useModalStore()
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
      date: date
        ? JSON.stringify(date)
        : JSON.stringify(new Date(new Date().setHours(0, 0, 0, 0))),
    })
    reset()

    toast('Задача успешно создана!')
  }

  return (
    <Dialog onOpenChange={closeModal} open={isOpen}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogClose asChild>
            <Button
              className="self-end"
              onClick={closeModal}
              aria-label="Закрыть окно"
              title="Закрыть окно"
              size="icon"
            >
              <X size={32} />
            </Button>
          </DialogClose>
          <DialogTitle className="self-center text-2xl font-medium">
            {date
              ? format(date, 'd MMMM yyyy', { locale: ru })
              : 'Создание задачи'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Окно создание задачи
          </DialogDescription>
        </DialogHeader>
        <Layout
          form={<CreateTaskForm onSubmit={onFormSubmit} />}
          tasks={
            showTaskList ? (
              <TaskList
                tasks={currentTasks}
                deleteTask={(taskId: string) => deleteTask(taskId)}
              />
            ) : undefined
          }
        />
      </DialogContent>
    </Dialog>
  )
}
