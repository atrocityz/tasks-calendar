import { create } from 'zustand'
import { getMonth, getYear } from 'date-fns'

interface CalendarStore {
  currentDate: Date
  selectedDate: Date
  selectDate: (date: Date) => void
  goToPrevMonth: () => void
  goToNextMonth: () => void
}

export const useCalendarStore = create<CalendarStore>((set) => ({
  currentDate: new Date(),
  selectedDate: new Date(),
  selectDate: (date) => set({ selectedDate: date }),
  goToPrevMonth: () =>
    set((state) => {
      if (getMonth(state.currentDate) === 0) {
        return {
          ...state,
          currentDate: new Date(getYear(state.currentDate) - 1, 11),
        }
      }

      return {
        ...state,
        currentDate: new Date(
          getYear(state.currentDate),
          getMonth(state.currentDate) - 1,
        ),
      }
    }),
  goToNextMonth: () =>
    set((state) => {
      if (getMonth(state.currentDate) === 11) {
        return {
          ...state,
          currentDate: new Date(getYear(state.currentDate) + 1, 0),
        }
      }

      return {
        ...state,
        currentDate: new Date(
          getYear(state.currentDate),
          getMonth(state.currentDate) + 1,
        ),
      }
    }),
}))
