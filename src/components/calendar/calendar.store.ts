import { create } from 'zustand'
import type { Task } from '@/components/TaskCard.tsx'
import { persist } from 'zustand/middleware'

interface TaskStore {
  isModalOpen: boolean
  currentDate: Date
  tasks: Record<string, Task[]>
  getTasksByDate: (date: Date) => Task[]
  addTask: (task: Omit<Task, 'id'>) => void
  openModal: (date: Date) => void
  closeModal: () => void
}

const dateToId = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      isModalOpen: false,
      currentDate: new Date(),
      tasks: {},
      getTasksByDate: (date: Date) => get().tasks[`${dateToId(date)}`],
      addTask: (task) =>
        set((state) => ({
          ...state,
          tasks: {
            ...state.tasks,
            [dateToId(state.currentDate)]: [
              ...(state.tasks[`${dateToId(state.currentDate)}`] || []),
              {
                id: crypto.randomUUID(),
                ...task,
              },
            ],
          },
        })),
      openModal: (date) =>
        set((state) => ({
          ...state,
          isModalOpen: true,
          currentDate: date,
        })),
      closeModal: () =>
        set((state) => ({
          ...state,
          isModalOpen: false,
        })),
    }),
    {
      name: 'calendar-store',
      partialize: (state) => ({
        tasks: state.tasks,
      }),
    },
  ),
)
