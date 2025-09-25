import type { Task } from '@/types/task.types.ts'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx'
import { Button } from '@/components/ui/button.tsx'
import { X } from 'lucide-react'
import { EditTaskForm } from '@/components/edit-task-modal/edit-task-form.tsx'
import { toast } from 'sonner'
import { useTasksStore } from '@/stores/tasks.store.ts'

export function EditTaskModal({
  task,
  closeModal,
  isOpen,
}: {
  task: Task
  closeModal: () => void
  isOpen: boolean
}) {
  const { editTask } = useTasksStore()

  const onFormSubmit = (data: EditTaskForm) => {
    editTask(task.id, {
      name: data.taskName,
      importance: data.taskImportant,
      description: data.taskDescription || undefined,
    })

    toast('Задача успешно изменена!')
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
            Изменение задачи
          </DialogTitle>
          <DialogDescription className="sr-only">
            Окно изменения задачи
          </DialogDescription>
        </DialogHeader>
        <EditTaskForm onSubmit={onFormSubmit} task={task} />
      </DialogContent>
    </Dialog>
  )
}
