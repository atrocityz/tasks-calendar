import type { ReactNode } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx'
import { Button } from '@/components/ui/button.tsx'
import { X } from 'lucide-react'

export function ModalLayout({
  tasks,
  form,
  description,
  title,
  isOpen,
  closeModal,
  date,
}: {
  title: string
  form: ReactNode
  description: string
  tasks?: ReactNode
  closeModal: () => void
  isOpen: boolean
  date?: string
}) {
  return (
    <Dialog onOpenChange={closeModal} open={isOpen}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogClose asChild>
            <Button
              className="self-end"
              onClick={closeModal}
              aria-label="Закрыть окно"
              title="Закрыть окно"
              size="icon"
            >
              <X size={32} />
            </Button>
          </DialogClose>
          <DialogTitle className="self-center text-2xl font-medium text-center grid gap-1">
            {title}
            {date && (
              <span className="block text-[18px] opacity-50 font-normal">
                {date}
              </span>
            )}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {description}
          </DialogDescription>
        </DialogHeader>
        {form}
        {tasks}
      </DialogContent>
    </Dialog>
  )
}
