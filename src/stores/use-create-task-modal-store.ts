import { create } from 'zustand'

interface TaskModalStore {
  date: Date
  isOpen: boolean
  openModal: (date: Date) => void
  closeModal: () => void
}

export const useCreateTaskModalStore = create<TaskModalStore>((set) => ({
  date: new Date(),
  isOpen: false,
  openModal: (date) => set({ date, isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}))
