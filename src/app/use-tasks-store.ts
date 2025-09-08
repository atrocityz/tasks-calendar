import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Task } from '@/types/task.types'

// TODO: Не нравится то, что состояние модалки находится в сторе, с другой стороны на этом подвязана логика управлением даты (через openModal)

interface TaskStore {
  isModalOpen: boolean
  date: Date
  tasks: Record<string, Task[]>
  getTasksByDate: (date: Date) => Task[]
  addTask: (task: Omit<Task, 'id'>) => void
  deleteTask: (taskId: string) => void
  openModal: (date: Date) => void
  closeModal: () => void
}

const dateToId = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

export const useTasksStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      isModalOpen: false,
      date: new Date(),
      tasks: {},
      getTasksByDate: (date: Date) => get().tasks[`${dateToId(date)}`],
      addTask: (task) =>
        set((state) => ({
          ...state,
          tasks: {
            ...state.tasks,
            [dateToId(state.date)]: [
              ...(state.tasks[dateToId(state.date)] || []),
              {
                id: crypto.randomUUID(),
                ...task,
              },
            ],
          },
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          ...state,
          tasks: {
            ...state.tasks,
            [dateToId(state.date)]: [
              ...state.tasks[dateToId(state.date)].filter(
                (task) => task.id !== taskId,
              ),
            ],
          },
        })),
      openModal: (date) => set({ isModalOpen: true, date }),
      closeModal: () => set({ isModalOpen: false }),
    }),
    {
      name: 'calendar-store',
      partialize: (state) => ({
        tasks: state.tasks,
      }),
    },
  ),
)
