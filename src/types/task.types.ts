export type TaskTag = 'Личное' | 'Работа' | 'Другое'

export interface Task {
  id: string
  name: string
  description?: string
  tag: TaskTag
}
