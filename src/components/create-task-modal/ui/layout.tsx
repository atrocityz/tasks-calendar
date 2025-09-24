import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import type { ReactNode } from 'react'
import { TaskTags } from '@/components/task-tags.tsx'

export function Layout({
  tasks,
  form,
  showTaskList,
}: {
  form: ReactNode
  tasks: ReactNode
  showTaskList: boolean
}) {
  return (
    <div className="flex flex-col gap-6">
      {form}
      {showTaskList && (
        <Drawer direction="right">
          <DrawerTrigger className="self-center opacity-70 underline hover:opacity-100 transition-opacity">
            Открыть список задач
          </DrawerTrigger>
          <DrawerContent className="p-3">
            <DrawerHeader className="p-0 pb-2 gap-3 md:gap-4 mb-2">
              <DrawerTitle className="text-xl text-center">
                Список задач
              </DrawerTitle>
              <DrawerDescription className="sr-only">
                Список задач на выбранный день
              </DrawerDescription>
              <TaskTags />
            </DrawerHeader>
            {tasks}
          </DrawerContent>
        </Drawer>
      )}
    </div>
  )
}
