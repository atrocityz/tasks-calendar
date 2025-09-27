import { getTaskImportanceColor, type Task } from '@/types/task.types.ts'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Layout } from './ui/layout.tsx'
import { useModal } from '@/hooks/use-modal.ts'
import { TaskCardActions } from '@/components/task-card/ui/actions.tsx'
import { cn } from '@/lib/utils.ts'
import { TaskCardHeader } from '@/components/task-card/ui/header.tsx'
import { EditTaskModal } from '@/components/task-modals/edit-task-modal.tsx'
import { tasksStore } from '@/stores/tasks.store.ts'
import { toast } from 'sonner'

export function TaskCard({
  item,
  editable = true,
  limitText,
}: {
  item: Task
  editable?: boolean
  limitText: boolean
}) {
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <>
      <Layout
        borderColor={getTaskImportanceColor(item.importance)}
        actions={
          <TaskCardActions
            onDelete={() => {
              tasksStore.deleteTask(item.id)
              toast('Задача успешно удалена!')
            }}
            openModal={openModal}
            editable={editable}
          />
        }
        header={
          <TaskCardHeader
            item={item}
            date={format(JSON.parse(item.date), 'd MMMM yyyy', {
              locale: ru,
            })}
            limitText={limitText}
          />
        }
        description={
          item.description && (
            <p
              className={cn('text-[14px] md:text-wrap', {
                'truncate max-w-[505px] md:max-w-full': limitText,
              })}
            >
              {item.description}
            </p>
          )
        }
      />
      {isOpen && (
        <EditTaskModal task={item} closeModal={closeModal} isOpen={isOpen} />
      )}
    </>
  )
}
