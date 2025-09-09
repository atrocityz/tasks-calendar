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
import type { FormEvent } from 'react'

export function CreateForm({
  onSubmit,
}: {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="task-name">Название задачи</Label>
        <Input required id="task-name" name="task-name" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="task-description">Описание задачи</Label>
        <Input id="task-description" name="task-description" />
      </div>
      <Select required name="task-tag-select">
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Выберите тег" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Личное">Личное</SelectItem>
          <SelectItem value="Работа">Работа</SelectItem>
          <SelectItem value="Другое">Другое</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" className="self-center mt-auto" variant="outline">
        Создать задачу
      </Button>
    </form>
  )
}
