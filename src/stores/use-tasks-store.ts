import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Task } from '@/types/task.types'

interface TaskStore {
  tasks: Record<string, Task[]>
  getTasksByDate: (date: Date) => Task[]
  addTask: (date: Date, task: Omit<Task, 'id'>) => void
  deleteTask: (date: Date, taskId: string) => void
}

const dateToId = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

export const useTasksStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: {},
      getTasksByDate: (date: Date) => get().tasks[dateToId(date)],
      addTask: (date, task) =>
        set((state) => ({
          ...state,
          tasks: {
            ...state.tasks,
            [dateToId(date)]: [
              ...(state.tasks[dateToId(date)] || []),
              {
                id: crypto.randomUUID(),
                ...task,
              },
            ],
          },
        })),
      deleteTask: (date, taskId) =>
        set((state) => ({
          ...state,
          tasks: {
            ...state.tasks,
            [dateToId(date)]: [
              ...state.tasks[dateToId(date)].filter(
                (task) => task.id !== taskId,
              ),
            ],
          },
        })),
    }),
    {
      name: 'tasks',
      partialize: (state) => ({
        tasks: state.tasks,
      }),
    },
  ),
)
