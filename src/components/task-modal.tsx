import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { type FormEvent, useCallback, useEffect } from 'react'
import { Input } from '@/components/ui/input.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { Label } from '@/components/ui/label.tsx'
import { useTasksStore } from '@/app/use-tasks-store.ts'
import type { TaskTag } from '@/types/task.types'
import { TaskCard } from '@/components/task-card'

// TODO: Пофиксить цвета для светлой темы (использовать цвета из переменных в index.css)

export function TaskModal() {
  const taskStore = useTasksStore()

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      taskStore.closeModal()
    }
  }

  const tasks = taskStore.getTasksByDate(taskStore.date)

  const onKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      taskStore.closeModal()
    }
  }, [])

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    taskStore.addTask({
      name: String(formData.get('task-name')),
      tag: String(formData.get('task-tag-select')) as TaskTag,
      description: String(formData.get('task-description')) || undefined,
    })
  }

  useEffect(() => {
    document.addEventListener('keyup', onKeyUp)

    return () => {
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [onKeyUp])

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 overflow-y-auto"
      onMouseDown={handleOverlayClick}
    >
      <div className="w-[30%] min-w-[360px] relative top-[5%] left-1/2 -translate-x-1/2 border border-sidebar-border rounded-2xl bg-background p-6 flex flex-col gap-6">
        <Button
          className="self-end"
          onClick={taskStore.closeModal}
          aria-label="Закрыть"
          title="Закрыть"
          size="icon"
        >
          <X size={32} />
        </Button>
        <p className="self-center text-2xl">{`${taskStore.date.getDate()}, ${taskStore.date.getMonth() + 1}, ${taskStore.date.getFullYear()}`}</p>
        <form onSubmit={(e) => onFormSubmit(e)} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="task-name">Название задачи</Label>
            <Input required id="task-name" name="task-name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="task-description">Описание задачи</Label>
            <Input id="task-description" name="task-description" />
          </div>
          <Select required name="task-tag-select">
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Тэг" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Личное">Личное</SelectItem>
              <SelectItem value="Работа">Работа</SelectItem>
              <SelectItem value="Другое">Другое</SelectItem>
            </SelectContent>
          </Select>
          <Button
            type="submit"
            className="self-center mt-auto"
            variant="outline"
          >
            Создать задачу
          </Button>
        </form>
        <ul className="grid gap-2">
          {tasks &&
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={taskStore.deleteTask}
              />
            ))}
        </ul>
      </div>
    </div>,
    document.body,
  )
}
