import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import type { ReactNode } from 'react'
import { TASKS_IMPORTANTS } from '@/data/task.data.ts'

export function Layout({
  closeButton,
  tasks,
  header,
  form,
}: {
  closeButton: ReactNode
  header: ReactNode
  form: ReactNode
  tasks: ReactNode
}) {
  return (
    <div className="w-[30%] min-w-[360px] relative top-[5%] left-1/2 max-h-[740px] -translate-x-1/2 border border-sidebar-border rounded-2xl bg-background p-6 flex flex-col gap-6">
      {closeButton}
      {header}
      {form}
      <Drawer direction="right">
        <DrawerTrigger className="self-center opacity-70 underline hover:opacity-100 transition-opacity">
          Открыть список задач
        </DrawerTrigger>
        <DrawerContent className="p-3">
          <DrawerHeader className="p-0 pb-2 gap-3 md:gap-4">
            <DrawerTitle className="text-xl text-center">
              Список задач
            </DrawerTitle>
            <DrawerDescription className="sr-only">
              Список задач на выбранный день
            </DrawerDescription>
            <ul className="flex items-center justify-between gap-2 flex-wrap">
              {TASKS_IMPORTANTS.map((importance) => (
                <li key={importance.label} className="flex items-center gap-1">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: importance.color }}
                  ></span>
                  {importance.label} важность
                </li>
              ))}
            </ul>
          </DrawerHeader>
          {tasks}
        </DrawerContent>
      </Drawer>
    </div>
  )
}
