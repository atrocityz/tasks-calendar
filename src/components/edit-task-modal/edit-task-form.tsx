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
import { Controller, useForm } from 'react-hook-form'
import type { Task, TaskImportance } from '@/types/task.types'
import { Error } from '@/components/ui/error'
import { TASKS_IMPORTANTS } from '@/data/task.data.ts'

export type EditTaskForm = {
  taskName: string
  taskDescription?: string
  taskImportant: TaskImportance
}

export function EditTaskForm({
  onSubmit,
  task,
}: {
  onSubmit: (data: EditTaskForm) => void
  task: Task
}) {
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
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
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
                className="placeholder:opacity-50"
                value={field.value}
                placeholder="Помыть посуду"
                aria-invalid={errors.taskName ? 'true' : 'false'}
              />
            )}
          />
          {errors.taskName && <Error>{errors.taskName.message}</Error>}
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="task-description">Описание задачи</Label>
        <Input
          id="task-description"
          placeholder="Тщательно помыть всю посуду"
          className="placeholder:opacity-50"
          {...register('taskDescription')}
        />
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
              <SelectTrigger className="w-[180px]">
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
        Изменить
      </Button>
    </form>
  )
}
