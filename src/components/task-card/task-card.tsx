import { getTaskImportanceColor, type Task } from '@/types/task.types.ts'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Layout } from './ui/layout.tsx'
import { useModal } from '@/hooks/use-modal.ts'
import { EditTaskModal } from '@/components/edit-task-modal/edit-task-modal.tsx'
import { TaskCardActions } from '@/components/task-card/ui/actions.tsx'

export function TaskCard({
  item,
  onDelete,
}: {
  item: Task
  onDelete: () => void
}) {
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <>
      <Layout
        borderColor={getTaskImportanceColor(item.importance)}
        actions={<TaskCardActions onDelete={onDelete} openModal={openModal} />}
      >
        <span className="sr-only">{item.importance} важность задачи</span>
        <div className="grid gap-2">
          <div>
            <h2
              className="truncate text-[16px] md:text-xl md:text-wrap max-w-[135px] sm:max-w-[245px] md:max-w-full"
              title={item.name}
            >
              {item.name}
            </h2>
            {item.date && (
              <span className="text-muted-foreground text-[14px]">
                {format(JSON.parse(item.date), 'd MMMM yyyy', { locale: ru })}
              </span>
            )}
          </div>
          {item.description && (
            <p className="text-[14px]">{item.description}</p>
          )}
        </div>
      </Layout>
      {isOpen && (
        <EditTaskModal task={item} isOpen={isOpen} closeModal={closeModal} />
      )}
    </>
  )
}
