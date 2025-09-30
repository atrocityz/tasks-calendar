import { getMonth, getYear } from 'date-fns'
import { createEvent, createStore } from 'effector'

export const $currentDate = createStore(new Date())
export const $selectedDate = createStore(new Date())

export const goToPrevMonth = createEvent()
export const goToNextMonth = createEvent()
export const selectDate = createEvent<Date>()

$currentDate.on(goToPrevMonth, (currentDate) => {
  if (getMonth(currentDate) === 0) {
    return new Date(getYear(currentDate) - 1, 11)
  }

  return new Date(getYear(currentDate), getMonth(currentDate) - 1)
})

$currentDate.on(goToNextMonth, (currentDate) => {
  if (getMonth(currentDate) === 11) {
    return new Date(getYear(currentDate) + 1, 0)
  }

  return new Date(getYear(currentDate), getMonth(currentDate) + 1)
})

$selectedDate.on(selectDate, (_, date) => date)
