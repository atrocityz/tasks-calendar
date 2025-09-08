import { useTaskStore } from '@/components/calendar/calendar.store.ts'
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
import { TaskCard, type TaskTag } from '@/components/TaskCard.tsx'

export function TaskModal() {
  const taskStore = useTaskStore()

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      document.documentElement.classList.remove('is-lock')
      taskStore.closeModal()
    }
  }

  const tasks = taskStore.getTasksByDate(taskStore.currentDate)

  const onKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        document.documentElement.classList.remove('is-lock')
        taskStore.closeModal()
      }
    },
    [taskStore],
  )

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
    if (!taskStore.isModalOpen) return

    document.documentElement.classList.add('is-lock')
    document.addEventListener('keyup', onKeyUp)

    return () => {
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [onKeyUp, taskStore.isModalOpen])

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div className="w-[30%] min-w-[360px] relative top-[10%] left-1/2 -translate-x-1/2 border border-sidebar-border rounded-2xl bg-black p-6 flex flex-col gap-6">
        <Button
          className="self-end"
          onClick={taskStore.closeModal}
          aria-label="Закрыть"
          title="Закрыть"
        >
          <X size={32} />
        </Button>
        <p className="self-center text-2xl">{`${taskStore.currentDate.getDate()}, ${taskStore.currentDate.getMonth() + 1}, ${taskStore.currentDate.getFullYear()}`}</p>
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
          <Button type="submit" className="self-center mt-auto">
            Создать задачу
          </Button>
        </form>
        <ul className="grid gap-2">
          {tasks && tasks.map((task) => <TaskCard key={task.id} task={task} />)}
        </ul>
      </div>
    </div>,
    document.body,
  )
}
