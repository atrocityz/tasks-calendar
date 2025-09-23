import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Task } from '@/types/task.types'

interface TaskStore {
  tasks: Task[]
  addTask: (task: Omit<Task, 'id'>) => void
  deleteTask: (taskId: string) => void
}

export const getTasksByDate = (date: string, tasks: Task[]) => {
  return tasks.filter((task) => task.date === date)
}

export const useTasksStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              ...task,
            },
          ],
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
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
