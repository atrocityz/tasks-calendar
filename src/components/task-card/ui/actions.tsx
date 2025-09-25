import { Button } from '@/components/ui/button.tsx'
import { Edit, X } from 'lucide-react'

export function TaskCardActions({
  onDelete,
  openModal,
}: {
  openModal: () => void
  onDelete: () => void
}) {
  return (
    <div className="flex gap-1">
      <Button
        onClick={openModal}
        aria-label="Изменить задачу"
        title="Изменить задачу"
        variant="default"
        size="icon"
      >
        <Edit />
      </Button>
      <Button
        onClick={onDelete}
        aria-label="Удалить задачу"
        title="Удалить задачу"
        variant="destructive"
        size="icon"
      >
        <X />
      </Button>
    </div>
  )
}
