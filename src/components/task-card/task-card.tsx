import { getTaskImportanceColor, type Task } from '@/types/task.types.ts'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Layout } from './ui/layout.tsx'
import { useModal } from '@/hooks/use-modal.ts'
import { EditTaskModal } from '@/components/edit-task-modal/edit-task-modal.tsx'
import { TaskCardActions } from '@/components/task-card/ui/actions.tsx'
import { cn } from '@/lib/utils.ts'
import { TaskCardHeader } from '@/components/task-card/ui/header.tsx'

export function TaskCard({
  item,
  onDelete,
  limitText,
}: {
  item: Task
  onDelete: () => void
  limitText: boolean
}) {
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <>
      <Layout
        borderColor={getTaskImportanceColor(item.importance)}
        actions={<TaskCardActions onDelete={onDelete} openModal={openModal} />}
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
        <EditTaskModal task={item} isOpen={isOpen} closeModal={closeModal} />
      )}
    </>
  )
}
