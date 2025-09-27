import { TaskList } from '@/components/task-list.tsx'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { getTasksByDate, useTasksStore } from '@/stores/tasks.store.ts'
import { useForm, type UseFormReset } from 'react-hook-form'
import { toast } from 'sonner'
import type { TaskImportance } from '@/types/task.types.ts'
import { ModalLayout } from '@/components/task-modals/ui/modal-layout.tsx'
import { FormLayout } from '@/components/task-modals/ui/form-layout.tsx'
import { SubmitButton } from '@/components/task-modals/ui/submit-button.tsx'
import { TaskTags } from '@/components/task-tags.tsx'
import { TasksDrawer } from '@/components/task-modals/ui/drawer.tsx'

export type CreateTaskForm = {
  taskName: string
  taskDescription?: string
  taskImportant: TaskImportance
}

export function CreateTaskModal({
  date,
  isOpen,
  closeModal,
  showTaskList = true,
}: {
  date?: Date
  isOpen: boolean
  closeModal: () => void
  showTaskList?: boolean
}) {
  const { addTask, deleteTask, tasks } = useTasksStore()

  const currentTasks = date
    ? getTasksByDate(JSON.stringify(date), tasks)
    : tasks
  const currentDate = date
    ? format(date, 'd MMMM yyyy', { locale: ru })
    : format(new Date(), 'd MMMM yyyy', { locale: ru })

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

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateTaskForm>({
    defaultValues: {
      taskName: '',
      taskDescription: '',
      taskImportant: '' as TaskImportance,
    },
  })

  return (
    <ModalLayout
      title="Создание задачи"
      description="Окно создания задачи"
      date={currentDate}
      form={
        <FormLayout
          onSubmit={handleSubmit((data) => onFormSubmit(data, reset))}
          errors={errors}
          register={register}
          control={control}
          actions={<SubmitButton>Создать</SubmitButton>}
        />
      }
      tasks={
        showTaskList && (
          <TasksDrawer tags={<TaskTags />}>
            <TaskList
              tasks={currentTasks}
              deleteTask={(taskId: string) => deleteTask(taskId)}
              isTaskEditable={false}
              limitText
            />
          </TasksDrawer>
        )
      }
      closeModal={closeModal}
      isOpen={isOpen}
    />
  )
}
