import { toast } from 'sonner'
import type { Task, TaskImportance } from '@/types/task.types.ts'
import { useForm } from 'react-hook-form'
import { ru } from 'date-fns/locale'
import { format } from 'date-fns'
import { ModalLayout } from '@/components/task-modals/ui/modal-layout.tsx'
import { FormLayout } from '@/components/task-modals/ui/form-layout.tsx'
import { SubmitButton } from './ui/submit-button'
import { useUnit } from 'effector-react'
import { tasksStore } from '@/stores'

export type EditTaskForm = {
  taskName: string
  taskDescription?: string
  taskImportant: TaskImportance
}

export function EditTaskModal({
  task,
  closeModal,
  isOpen,
}: {
  task: Task
  closeModal: () => void
  isOpen: boolean
}) {
  const editTask = useUnit(tasksStore.editTask)

  const onFormSubmit = (data: EditTaskForm) => {
    editTask({
      taskId: task.id,
      data: {
        name: data.taskName,
        importance: data.taskImportant,
        description: data.taskDescription || undefined,
      },
    })

    toast('Задача успешно изменена!')
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditTaskForm>({
    defaultValues: {
      taskName: task.name,
      taskDescription: task.description || '',
      taskImportant: task.importance,
    },
  })

  return (
    <ModalLayout
      title="Изменение задачи"
      description="Окно изменения задачи"
      date={format(JSON.parse(task.date), 'd MMMM yyyy', { locale: ru })}
      form={
        <FormLayout
          onSubmit={handleSubmit((data) => onFormSubmit(data))}
          errors={errors}
          register={register}
          control={control}
          actions={<SubmitButton>Изменить</SubmitButton>}
        />
      }
      closeModal={closeModal}
      isOpen={isOpen}
    />
  )
}
