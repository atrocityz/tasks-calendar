import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Task } from '@/types/task.types'

interface TaskStore {
  tasks: Record<string, Task[]>
  addTask: (date: Date, task: Omit<Task, 'id'>) => void
  deleteTask: (date: Date, taskId: string) => void
}

export const useTasksStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: {},
      addTask: (date, task) =>
        set((state) => ({
          ...state,
          tasks: {
            ...state.tasks,
            [JSON.stringify(date)]: [
              {
                id: crypto.randomUUID(),
                ...task,
              },
              ...(state.tasks[JSON.stringify(date)] || []),
            ],
          },
        })),
      deleteTask: (date, taskId) =>
        set((state) => ({
          ...state,
          tasks: {
            ...state.tasks,
            [JSON.stringify(date)]: [
              ...state.tasks[JSON.stringify(date)].filter(
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
