import { TaskCard } from '@/components/ui/task-card.tsx'
import { useTasksStore } from '@/stores/tasks.store.ts'
import { toast } from 'sonner'
import { Layout } from '@/components/tasks/ui/layout.tsx'
import { useMemo, useState } from 'react'
import { SearchField } from '@/components/tasks/ui/search-field.tsx'
import { TaskTags } from '@/components/ui/task-tags.tsx'
import { useModal } from '@/components/calendar/use-modal.ts'
import { CreateTaskModal } from '@/components/create-task-modal/create-task-modal.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Plus } from 'lucide-react'

export function Tasks() {
  const { tasks, deleteTask } = useTasksStore()
  const { isModalOpen, openModal, closeModal, handleOverlayClick } = useModal()
  const [searchValue, setSearchValue] = useState('')

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.name.toLowerCase().includes(searchValue.toLowerCase()),
    )
  }, [searchValue, tasks])

  return (
    <>
      <Layout
        tags={<TaskTags />}
        searchField={
          <SearchField value={searchValue} onChange={setSearchValue} />
        }
        addTaskButton={
          <Button
            variant="outline"
            onClick={openModal}
            className="w-9 h-9"
            aria-label="Добавить задачу"
            title="Добавить задачу"
          >
            <Plus />
          </Button>
        }
        taskList={
          filteredTasks.length > 0 ? (
            <ul className="grid gap-2">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  item={task}
                  onDelete={() => {
                    deleteTask(task.id)
                    toast('Задача успешно удалена!')
                  }}
                />
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground/70">Список задач пуст...</div>
          )
        }
      />
      {isModalOpen && (
        <CreateTaskModal
          closeModal={closeModal}
          handleOverlayClick={handleOverlayClick}
        />
      )}
    </>
  )
}
