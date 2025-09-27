import { Label } from '@/components/ui/label.tsx'
import {
  type Control,
  Controller,
  type FieldErrors,
  type UseFormRegister,
} from 'react-hook-form'
import { Input } from '@/components/ui/input.tsx'
import { Error } from '@/components/ui/error'
import { TASKS_IMPORTANTS } from '@/data/task.data.ts'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import type { ReactNode } from 'react'
import type { CreateTaskForm } from '@/components/task-modals/create-task-modal.tsx'

export function FormLayout({
  actions,
  onSubmit,
  errors,
  control,
  register,
}: {
  onSubmit: () => void
  actions: ReactNode
  errors: FieldErrors<CreateTaskForm>
  register: UseFormRegister<CreateTaskForm>
  control: Control<CreateTaskForm>
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
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
      {actions}
    </form>
  )
}
