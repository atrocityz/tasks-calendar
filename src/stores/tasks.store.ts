import type { Task } from '@/types/task.types'
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

export const getTasksByDate = (date: string, tasks: Task[]) => {
  return tasks.filter((task) => task.date === date)
}

class TasksStore {
  tasks: Task[] = []

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'TasksStore',
      properties: ['tasks'],
      storage: window.localStorage,
    })
  }

  addTask = (task: Omit<Task, 'id'>) => {
    const newTask = {
      id: crypto.randomUUID(),
      ...task,
    }

    this.tasks.push(newTask)
  }

  deleteTask = (taskId: string) => {
    this.tasks = this.tasks.filter((task) => task.id !== taskId)
  }

  editTask = (taskId: string, data: Partial<Task>) => {
    this.tasks = this.tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, ...data }
      }

      return task
    })
  }
}

export const tasksStore = new TasksStore()
