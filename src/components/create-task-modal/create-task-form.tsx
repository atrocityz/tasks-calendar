import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Controller, useForm, type UseFormReset } from 'react-hook-form'
import type { TaskImportance } from '@/types/task.types'
import { Error } from '@/components/ui/error'
import { TASKS_IMPORTANTS } from '@/data/task.data.ts'

export type CreateTaskForm = {
  taskName: string
  taskDescription?: string
  taskImportant: TaskImportance
}

export function CreateTaskForm({
  onSubmit,
}: {
  onSubmit: (data: CreateTaskForm, reset: UseFormReset<CreateTaskForm>) => void
}) {
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
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, reset))}
      className="flex flex-col gap-6"
    >
      <div className="grid gap-2">
        <Label htmlFor="task-name">Название задачи</Label>
        <div className="grid gap-1">
          <Controller
            name="taskName"
            control={control}
            rules={{ required: 'Введите название задачи!' }}
            render={({ field }) => (
              <Input
                id="task-name"
                onChange={field.onChange}
                value={field.value}
                aria-invalid={errors.taskName ? 'true' : 'false'}
              />
            )}
          />
          {errors.taskName && <Error>{errors.taskName.message}</Error>}
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="task-description">Описание задачи</Label>
        <Input id="task-description" {...register('taskDescription')} />
      </div>
      <div className="grid gap-1">
        <Controller
          name="taskImportant"
          control={control}
          rules={{ required: 'Выберите важность задачи!' }}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={field.value}
              aria-invalid={errors.taskImportant ? 'true' : 'false'}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Важность задачи" />
              </SelectTrigger>
              <SelectContent>
                {TASKS_IMPORTANTS.map((importance) => (
                  <SelectItem
                    className="flex items-center gap-1"
                    value={importance.label}
                    key={importance.label}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: importance.color }}
                    ></span>
                    {importance.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.taskImportant && <Error>{errors.taskImportant.message}</Error>}
      </div>
      <Button type="submit" className="self-center mt-auto" variant="outline">
        Создать задачу
      </Button>
    </form>
  )
}
