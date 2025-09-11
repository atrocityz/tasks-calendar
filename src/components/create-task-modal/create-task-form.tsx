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
import type { TaskTag } from '@/types/task.types'
import { Error } from '@/components/ui/error'

export type CreateTaskForm = {
  taskName: string
  taskDescription?: string
  taskTagList: TaskTag
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
      taskTagList: '' as TaskTag,
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
            rules={{ required: 'Введите имя для задачи!' }}
            render={({ field }) => (
              <Input
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
          name="taskTagList"
          control={control}
          rules={{ required: 'Выберите тэг для задачи!' }}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={field.value}
              aria-invalid={errors.taskTagList ? 'true' : 'false'}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Выберите тег" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Личное">Личное</SelectItem>
                <SelectItem value="Работа">Работа</SelectItem>
                <SelectItem value="Другое">Другое</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.taskTagList && <Error>{errors.taskTagList.message}</Error>}
      </div>
      <Button type="submit" className="self-center mt-auto" variant="outline">
        Создать задачу
      </Button>
    </form>
  )
}
