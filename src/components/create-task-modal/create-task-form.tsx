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
import type { TaskImportant } from '@/types/task.types'
import { Error } from '@/components/ui/error'

export type CreateTaskForm = {
  taskName: string
  taskDescription?: string
  taskImportant: TaskImportant
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
      taskImportant: '' as TaskImportant,
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
                <SelectItem className="flex items-center gap-1" value="Высокая">
                  <span className="w-2 h-2 bg-red-900 rounded-full"></span>
                  Высокая
                </SelectItem>
                <SelectItem value="Средняя">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  Средняя
                </SelectItem>
                <SelectItem value="Низкая">
                  <span className="w-2 h-2 bg-green-900 rounded-full"></span>
                  Низкая
                </SelectItem>
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
