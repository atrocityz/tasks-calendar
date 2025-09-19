import { TASKS_IMPORTANTS } from '@/data/task.data.ts'

export type TaskImportance = (typeof TASKS_IMPORTANTS)[number]['label']

export interface Task {
  id: string
  name: string
  description?: string
  importance: TaskImportance
}

export const getTaskImportanceColor = (importance: TaskImportance) => {
  return TASKS_IMPORTANTS.find((el) => el.label === importance)?.color
}
