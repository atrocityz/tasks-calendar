import { getTaskImportanceColor, type Task } from '@/types/task.types.ts'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Layout } from './ui/layout.tsx'
import { useModal } from '@/hooks/use-modal.ts'
import { EditTaskModal } from '@/components/edit-task-modal/edit-task-modal.tsx'
import { TaskCardActions } from '@/components/task-card/ui/actions.tsx'
import { cn } from '@/lib/utils.ts'

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
          <>
            <span className="sr-only">{item.importance} важность задачи</span>
            <div className="grid gap-2">
              <div>
                <h2
                  className={cn('text-[16px] md:text-[18px] md:text-wrap', {
                    'truncate max-w-[135px] sm:max-w-[245px] md:max-w-full':
                      limitText,
                  })}
                  title={item.name}
                >
                  {item.name}
                </h2>
                {item.date && (
                  <span className="text-muted-foreground text-[14px]">
                    {format(JSON.parse(item.date), 'd MMMM yyyy', {
                      locale: ru,
                    })}
                  </span>
                )}
              </div>
            </div>
          </>
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
