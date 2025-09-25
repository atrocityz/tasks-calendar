import { useTasksStore } from '@/stores/tasks.store.ts'
import { Layout } from '@/components/tasks/ui/layout.tsx'
import { useMemo, useState } from 'react'
import { SearchField } from '@/components/tasks/ui/search-field.tsx'
import { TaskTags } from '@/components/task-tags.tsx'
import { CreateTaskModal } from '@/components/create-task-modal/create-task-modal.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Plus } from 'lucide-react'
import { TaskList } from '@/components/task-list.tsx'
import { useModal } from '@/hooks/use-modal.ts'

export function Tasks() {
  const { tasks, deleteTask } = useTasksStore()
  const { isOpen, openModal, closeModal } = useModal()
  const [searchValue, setSearchValue] = useState('')

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.name.toLowerCase().includes(searchValue.toLowerCase()),
    )
  }, [searchValue, tasks])

  return (
    <>
      <Layout
        header={
          <>
            <SearchField value={searchValue} onChange={setSearchValue} />
            <TaskTags />
          </>
        }
        actions={
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
      >
        <TaskList
          tasks={filteredTasks}
          deleteTask={(taskId: string) => deleteTask(taskId)}
        />
      </Layout>
      {isOpen && (
        <CreateTaskModal
          showTaskList={false}
          closeModal={closeModal}
          isOpen={isOpen}
        />
      )}
    </>
  )
}
