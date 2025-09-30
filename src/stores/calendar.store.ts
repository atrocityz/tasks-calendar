import { getMonth, getYear } from 'date-fns'
import { makeAutoObservable } from 'mobx'

class CalendarStore {
  currentDate = new Date()
  selectedDate = new Date()

  constructor() {
    makeAutoObservable(this)
  }

  selectDate = (date: Date) => {
    this.selectedDate = date
  }

  goToPrevMonth = () => {
    if (getMonth(this.currentDate) === 0) {
      this.currentDate = new Date(getYear(this.currentDate) - 1, 11)
    }

    this.currentDate = new Date(
      getYear(this.currentDate),
      getMonth(this.currentDate) - 1,
    )
  }

  goToNextMonth = () => {
    if (getMonth(this.currentDate) === 11) {
      this.currentDate = new Date(getYear(this.currentDate) + 1, 0)
    }

    this.currentDate = new Date(
      getYear(this.currentDate),
      getMonth(this.currentDate) + 1,
    )
  }
}

export const calendarStore = new CalendarStore()
