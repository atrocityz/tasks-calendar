import type { Task } from '@/types/task.types'
import { persist } from 'effector-storage/local'
import { createEvent, createStore } from 'effector'
import { LOCAL_STORAGE_KEYS } from '@/lib/constants'

export const $tasks = createStore<Task[]>([])

export const addTask = createEvent<Omit<Task, 'id'>>()
export const deleteTask = createEvent<string>()
export const editTask = createEvent<{ taskId: string; data: Partial<Task> }>()

$tasks.on(addTask, (tasks, data) => {
  const newTask = {
    id: crypto.randomUUID(),
    ...data,
  } as Task

  return [newTask, ...tasks]
})

$tasks.on(deleteTask, (tasks, taskId) =>
  tasks.filter((task) => task.id !== taskId),
)

$tasks.on(editTask, (tasks, { taskId, data }) =>
  tasks.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        ...data,
      }
    }

    return task
  }),
)

export const getTasksByDate = (date: string, tasks: Task[]) => {
  return tasks.filter((task) => task.date === date)
}

persist({
  store: $tasks,
  key: LOCAL_STORAGE_KEYS.TASKS,
})
