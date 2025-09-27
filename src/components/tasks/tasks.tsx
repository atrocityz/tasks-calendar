import { tasksStore } from '@/stores/tasks.store.ts'
import { Layout } from '@/components/tasks/ui/layout.tsx'
import { useState } from 'react'
import { SearchField } from '@/components/tasks/ui/search-field.tsx'
import { TaskTags } from '@/components/task-tags.tsx'
import { TaskList } from '@/components/task-list.tsx'
import { useModal } from '@/hooks/use-modal.ts'
import { CreateTaskModal } from '@/components/task-modals/create-task-modal.tsx'
import { observer } from 'mobx-react-lite'
import { Button } from '@/components/ui/button.tsx'
import { Plus } from 'lucide-react'

export const Tasks = observer(() => {
  const { isOpen, openModal, closeModal } = useModal()
  const [searchValue, setSearchValue] = useState('')

  const filteredTasks = tasksStore.tasks.filter((task) =>
    task.name.toLowerCase().includes(searchValue.toLowerCase()),
  )

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
        <TaskList tasks={filteredTasks} />
      </Layout>
      {isOpen && (
        <CreateTaskModal
          closeModal={closeModal}
          isOpen={isOpen}
          showTaskList={false}
        />
      )}
    </>
  )
})
