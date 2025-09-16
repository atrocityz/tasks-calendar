export type TaskImportant = 'Высокая' | 'Средняя' | 'Низкая'

export interface Task {
  id: string
  name: string
  description?: string
  important: TaskImportant
}
